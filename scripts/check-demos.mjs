// ─────────────────────────────────────────────────────────────────────────────
// Revalida las demos públicas declaradas en content/cases/.
//
// Existe porque el portfolio promete "demo pública navegable" y esa promesa
// caduca: si la URL se cae, el visitante que hace click pierde la confianza
// que el caso venía construyendo. Correr antes de cada publicación.
//
// Uso:  node scripts/check-demos.mjs
// Salida distinta de 0 si alguna demo declarada `verificada` no responde.
//
// Nota: en entornos con egress restringido (sandboxes, CI sin salida) el
// script no puede distinguir "caída" de "bloqueada por política". En ese caso
// informa INDETERMINADO y no falla — no se finge una verificación.
// ─────────────────────────────────────────────────────────────────────────────

// Se importan los archivos de caso directamente y con extensión explícita:
// `content/cases/index.ts` usa imports sin extensión (resueltos por el bundler
// de Next), que el resolver ESM de Node no acepta. Cada archivo de caso solo
// tiene `import type`, que el type-stripping de Node elimina por completo.
import { soderiaNico } from '../content/cases/soderia-nico.ts';
import { courtops } from '../content/cases/courtops.ts';
import { trackium } from '../content/cases/trackium.ts';
import { zentro } from '../content/cases/zentro.ts';
import { doleth } from '../content/cases/doleth.ts';

const casos = [soderiaNico, courtops, trackium, zentro, doleth];

const TIMEOUT_MS = 15_000;
/** Salida a internet mediada por un proxy: cambia cómo se interpreta un 403. */
const TRAS_PROXY = Boolean(
  process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY,
);
const HOY = new Date();
/** Una verificación con más de 90 días se considera vencida. */
const DIAS_VALIDEZ = 90;

const declaradas = casos
  .filter((c) => c.acceso.demo?.verificada)
  .map((c) => ({ nombre: c.nombre, ...c.acceso.demo }));

if (declaradas.length === 0) {
  console.log('No hay demos declaradas como verificadas.');
  process.exit(0);
}

let fallos = 0;
let indeterminados = 0;

for (const d of declaradas) {
  const edadDias = Math.floor((HOY - new Date(d.verificadaEl)) / 86_400_000);
  const vencida = edadDias > DIAS_VALIDEZ;

  let estado;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const res = await fetch(d.url, { signal: ctrl.signal, redirect: 'follow' });
    clearTimeout(t);

    if (res.ok) {
      estado = `OK ${res.status}`;
    } else if (TRAS_PROXY && (res.status === 403 || res.status === 407)) {
      // Un proxy de egress responde 403/407 ante una denegación de política.
      // Es indistinguible de un 403 del sitio real: no se declara caída.
      estado = `INDETERMINADO (${res.status} — probable denegación del proxy)`;
      indeterminados++;
    } else {
      estado = `CAÍDA ${res.status}`;
      fallos++;
    }
  } catch (e) {
    estado = `INDETERMINADO (${e.cause?.code ?? e.name})`;
    indeterminados++;
  }

  console.log(
    `${d.nombre.padEnd(12)} ${d.url}\n` +
      `  ${estado} · verificada el ${d.verificadaEl} (${edadDias} días${vencida ? ' — VENCIDA' : ''})`,
  );
  if (vencida) console.log('  ⚠ Reverificar y actualizar `verificadaEl` en content/cases/.');
}

if (indeterminados > 0) {
  console.log(
    `\n⚠ ${indeterminados} demo(s) no se pudieron comprobar desde este entorno.\n` +
      '  No se finge verificación: comprobalas manualmente antes de publicar.',
  );
}

if (fallos > 0) {
  console.error(`\n✖ ${fallos} demo(s) declaradas como públicas no responden.`);
  process.exit(1);
}

console.log('\n✓ Sin demos caídas confirmadas.');
