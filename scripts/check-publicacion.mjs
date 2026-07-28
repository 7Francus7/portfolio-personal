// ─────────────────────────────────────────────────────────────────────────────
// Guard de publicación. Corre ANTES del build (`prebuild`).
//
// Importa la política real desde `lib/entorno.ts` — no duplica la lógica.
// (Node ≥22.18 hace type-stripping de TS de forma nativa.)
//
// Comportamiento:
//   · Deploy de producción real (VERCEL_ENV=production, o REQUIRE_PUBLIC_URL=true)
//     sin dominio válido  ⇒  FALLA el build con instrucciones concretas.
//   · Cualquier otro entorno sin dominio  ⇒  ADVIERTE y sigue (noindex garantizado).
//
// Uso directo: node scripts/check-publicacion.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { diagnostico, esIndexable, fase, tieneDominio } from '../lib/entorno.ts';

const d = diagnostico();

/** ¿Es un intento de publicar producción de verdad? */
const esDeployProduccion =
  process.env.VERCEL_ENV === 'production' || process.env.REQUIRE_PUBLIC_URL === 'true';

const linea = '─'.repeat(72);

console.log(linea);
console.log('Política de publicación');
console.log(linea);
console.log(`  fase                    ${d.fase}`);
console.log(`  NEXT_PUBLIC_SITE_URL    ${d.valorCrudo ?? '(sin definir)'}`);
console.log(`  dominio válido          ${d.tieneDominio ? 'sí' : 'NO'}`);
console.log(`  NEXT_PUBLIC_INDEXABLE   ${d.flagIndexable ? 'true' : '(no es "true")'}`);
console.log(`  → indexable             ${d.esIndexable ? 'SÍ' : 'no'}`);
console.log(`  → canonical y OG        ${d.emiteMetadataAbsoluta ? 'absolutos' : 'omitidos (sin dominio)'}`);
console.log(linea);

if (esDeployProduccion && !tieneDominio()) {
  console.error(`
✖ BUILD DETENIDO — producción sin dominio público válido.

  Se detectó un deploy de producción (VERCEL_ENV=production) pero
  NEXT_PUBLIC_SITE_URL no contiene una URL utilizable.

  Valor recibido: ${d.valorCrudo ?? '(vacío)'}

  Requisitos de la URL:
    · esquema https
    · host real con punto (no localhost, 127.0.0.1 ni *.local)
    · sin barra final

  Configurá en Vercel → Settings → Environment Variables (scope Production):
    NEXT_PUBLIC_SITE_URL = https://tu-dominio.com
    NEXT_PUBLIC_INDEXABLE = true

  Publicar sin esto generaría canonical y Open Graph apuntando a localhost.
`);
  process.exit(1);
}

if (!tieneDominio()) {
  console.warn(
    `⚠ Sin dominio público configurado.\n` +
      `  El build sigue, pero el sitio será noindex/nofollow y no emitirá\n` +
      `  canonical ni Open Graph absolutos. Correcto para preview y local.\n`,
  );
} else if (fase() === 'production' && !esIndexable()) {
  console.warn(
    `⚠ Hay dominio válido pero el sitio NO es indexable.\n` +
      `  Falta NEXT_PUBLIC_INDEXABLE=true en el scope Production.\n`,
  );
} else if (esIndexable()) {
  console.log('✓ Sitio indexable con dominio real. Verificá el sitemap tras el deploy.\n');
}
