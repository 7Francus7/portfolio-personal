// ─────────────────────────────────────────────────────────────────────────────
// Verificación POST-build: ninguna URL de desarrollo puede haber quedado
// embebida en el HTML prerenderizado.
//
// Esto no confía en la lógica de `lib/entorno.ts`: inspecciona la salida real.
// Es la garantía de la regla "nunca generar canonical u OG hacia localhost".
//
// Uso: node scripts/check-build-limpio.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const RAIZ = new URL('..', import.meta.url).pathname;
const DIR_BUILD = join(RAIZ, '.next', 'server', 'app');

/** Patrones prohibidos en cualquier HTML/metadata generada. */
const PROHIBIDO = [
  { patron: /localhost:\d+/gi, motivo: 'URL localhost' },
  { patron: /127\.0\.0\.1/g, motivo: 'IP de loopback' },
  { patron: /https?:\/\/[^"'\s]*\.local\b/gi, motivo: 'host .local' },
];

async function archivos(dir) {
  const salida = [];
  let entradas;
  try {
    entradas = await readdir(dir, { withFileTypes: true });
  } catch {
    return salida;
  }
  for (const e of entradas) {
    const ruta = join(dir, e.name);
    if (e.isDirectory()) salida.push(...(await archivos(ruta)));
    else if (/\.(html|rsc|body|meta)$/.test(e.name) || !e.name.includes('.')) salida.push(ruta);
  }
  return salida;
}

const lista = await archivos(DIR_BUILD);

if (lista.length === 0) {
  console.error('✖ No se encontró salida de build en .next/server/app. Corré `npm run build` primero.');
  process.exit(1);
}

const hallazgos = [];

for (const ruta of lista) {
  let contenido;
  try {
    contenido = await readFile(ruta, 'utf8');
  } catch {
    continue; // binario
  }
  for (const { patron, motivo } of PROHIBIDO) {
    const m = contenido.match(patron);
    if (m) {
      hallazgos.push({ ruta: ruta.replace(RAIZ, ''), motivo, ejemplo: m[0], veces: m.length });
    }
  }
}

const indexable = process.env.NEXT_PUBLIC_INDEXABLE === 'true';
const conDominio = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

console.log(`Revisados ${lista.length} archivos de build.`);

if (hallazgos.length > 0) {
  // Sin dominio configurado, `metadataBase` cae a localhost por diseño de Next,
  // pero canonical y OG se omiten. Solo es un error si había dominio real.
  const nivel = conDominio ? 'ERROR' : 'AVISO';
  console.log(`\n${nivel}: se encontraron referencias a entorno local:\n`);
  for (const h of hallazgos.slice(0, 20)) {
    console.log(`  ${h.ruta}\n    ${h.motivo} — "${h.ejemplo}" ×${h.veces}`);
  }
  if (hallazgos.length > 20) console.log(`  … y ${hallazgos.length - 20} más`);

  if (conDominio) {
    console.error('\n✖ Había NEXT_PUBLIC_SITE_URL configurada y aun así quedaron URLs locales.');
    process.exit(1);
  }
  console.warn(
    '\n⚠ Aceptable: no hay dominio configurado, así que este build es noindex\n' +
      '  y no se publica. Con dominio real, estas referencias deben desaparecer.\n',
  );
} else {
  console.log('✓ Sin URLs de entorno local en la salida de build.');
}

// El robots generado debe coincidir con la política.
try {
  const robots = await readFile(join(DIR_BUILD, 'robots.txt.body'), 'utf8');
  const bloquea = /Disallow:\s*\/\s*$/m.test(robots);
  if (indexable && conDominio) {
    if (bloquea) {
      console.error('✖ Build indexable pero robots.txt bloquea todo.');
      process.exit(1);
    }
    console.log('✓ robots.txt permite indexación (build de producción).');
  } else {
    if (!bloquea) {
      console.error('✖ Build NO indexable pero robots.txt no bloquea. Riesgo de indexar preview.');
      process.exit(1);
    }
    console.log('✓ robots.txt bloquea todo (build no indexable).');
  }
} catch {
  console.warn('⚠ No se pudo leer el robots.txt generado.');
}
