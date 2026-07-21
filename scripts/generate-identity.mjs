// ─────────────────────────────────────────────────────────────────────────────
// Generador de identidad visual (Fase 3B).
//
// Deriva todos los assets del sistema editorial — tinta (#16150f), papel
// (#faf9f6), clay (#a63d27) — desde una sola fuente:
//   · app/icon.svg  → icono maestro (monograma F con travesaño clay)
//
// Produce, de forma reproducible y sin dependencias externas de red:
//   · app/icon.png         (512×512)  favicon PNG de respaldo
//   · app/apple-icon.png   (180×180)  apple touch icon
//   · public/og.png        (1200×630) Open Graph base
//   · public/og/<ruta>.png (1200×630) Open Graph por ruta
//
// Rasteriza con el Chromium de Playwright. En entornos con el binario
// preinstalado, exportar PLAYWRIGHT_CHROMIUM_EXECUTABLE apuntando al ejecutable.
//
// Uso: node scripts/generate-identity.mjs
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const p = (...s) => resolve(ROOT, ...s);

const INK = '#16150f';
const INK_SOFT = '#403d33';
const INK_MUTE = '#5f5b4e';
const PAPER = '#faf9f6';
const PAPER_DIM = '#f2f0e9';
const CLAY = '#a63d27';
const LINE = '#e5e2d8';

const iconSvg = readFileSync(p('app/icon.svg'), 'utf8');

// ── Open Graph: una plantilla editorial, variantes por contenido ─────────────
// Serif del sistema si está disponible por red; si no, degrada a Georgia
// (misma familia visual: editorial, no tech). Determinista en cualquier caso.
const ogHtml = ({ kicker, titulo, pie, estado }) => {
  // La longitud del titular (sin las etiquetas <em>) gobierna el cuerpo para
  // que nunca desborde ni colisione con el pie.
  const plano = titulo.replace(/<[^>]+>/g, '');
  const fs = plano.length > 58 ? 76 : plano.length > 42 ? 88 : 100;
  return `<!doctype html><html><head><meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: ${PAPER};
    color: ${INK};
    font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
    position: relative;
    overflow: hidden;
  }
  .frame { position: absolute; inset: 44px; border: 1px solid ${LINE}; pointer-events: none; }
  .pad { position: absolute; inset: 96px; display: flex; flex-direction: column;
    justify-content: space-between; }
  .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 19px;
    letter-spacing: 0.16em; text-transform: uppercase; color: ${INK_MUTE}; }
  .top { display: flex; align-items: center; gap: 20px; }
  .badge { border: 1px solid ${CLAY}; color: ${CLAY}; padding: 5px 12px; font-size: 17px; }
  .titulo { font-size: ${fs}px; line-height: 1.04; letter-spacing: -0.02em;
    max-width: 1000px; font-weight: 400; color: ${INK}; }
  .titulo em { color: ${CLAY}; font-style: italic; }
  .foot { border-top: 1px solid ${LINE}; padding-top: 28px; display: flex;
    align-items: center; justify-content: space-between; }
  .mark { display: flex; align-items: center; gap: 16px; }
  .mark .glyph { width: 44px; height: 44px; display: block; }
  .mark .name { font-size: 30px; color: ${INK_SOFT}; }
</style></head><body>
  <div class="frame"></div>
  <div class="pad">
    <div class="top">
      <span class="mono">${kicker}</span>
      ${estado ? `<span class="badge mono">${estado}</span>` : ''}
    </div>
    <h1 class="titulo">${titulo}</h1>
    <div class="foot">
      <span class="mark">
        <span class="glyph">${iconSvg}</span>
        <span class="name">Franco Dell’Orsi</span>
      </span>
      <span class="mono">${pie}</span>
    </div>
  </div>
</body></html>`;
};

const NAME = 'Franco Dell’Orsi';
const ROL = 'Desarrollador de producto';

// Variantes de OG. El texto sale del contenido real del sitio; nada inventado.
const variantes = {
  'og': {
    kicker: `${NAME} · ${ROL}`,
    titulo: 'Convierto operaciones reales en <em>software claro</em>.',
    pie: 'Portfolio',
  },
  'home': {
    kicker: `${NAME} · ${ROL}`,
    titulo: 'Convierto operaciones reales en <em>software claro</em>.',
    pie: 'Portfolio',
  },
  'proyectos': {
    kicker: 'Proyectos',
    titulo: 'Sistemas que ordenan <em>operaciones reales</em>.',
    pie: `${NAME}`,
  },
  'sobre-mi': {
    kicker: 'Sobre mí',
    titulo: 'Entiendo el negocio antes de escribir <em>código</em>.',
    pie: `${NAME} · Argentina`,
  },
  'contacto': {
    kicker: 'Contacto',
    titulo: '¿Tu negocio depende de papel, planillas o <em>WhatsApp</em>?',
    pie: `${NAME}`,
  },
  'caso-soderia-nico': {
    kicker: 'Caso · Sodería Nico',
    estado: 'En uso real',
    titulo: 'Saqué el reparto del papel y lo convertí en un <em>sistema</em>.',
    pie: 'Distribución de agua y soda',
  },
  'caso-trackium': {
    kicker: 'Caso · Trackium',
    estado: 'En desarrollo',
    titulo: 'Un sistema operativo para empresas de <em>transporte</em>.',
    pie: 'Transporte y logística',
  },
  'caso-zentro': {
    kicker: 'Caso · Zentro',
    estado: 'En desarrollo',
    titulo: 'Soltar <em>sin perder el control</em>.',
    pie: 'Negocios que operan por WhatsApp',
  },
  'caso-courtops': {
    kicker: 'Caso · CourtOps',
    estado: 'En desarrollo',
    titulo: 'Reservas y operación para clubes de <em>pádel</em>.',
    pie: 'Clubes deportivos',
  },
  'caso-doleth': {
    kicker: 'Caso · Doleth',
    estado: 'En desarrollo',
    titulo: 'Finanzas personales <em>sin humo</em>.',
    pie: 'Diseño de información',
  },
};

async function rasterizeIcon(page, size, out) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<!doctype html><html><head><style>*{margin:0;padding:0}html,body{width:${size}px;height:${size}px}svg{width:${size}px;height:${size}px;display:block}</style></head><body>${iconSvg}</body></html>`,
    { waitUntil: 'load' },
  );
  const buf = await page.screenshot({ omitBackground: false, type: 'png' });
  writeFileSync(out, buf);
  console.log(`  ✓ ${out.replace(ROOT + '/', '')} (${size}×${size})`);
}

async function renderOg(page, name, data) {
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(ogHtml(data), { waitUntil: 'load' });
  // Espera acotada a que carguen las fuentes (si hay red); si no, degrada.
  await page.evaluate(() =>
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 4000))]),
  );
  const dir = name === 'og' ? p('public') : p('public/og');
  mkdirSync(dir, { recursive: true });
  const out = name === 'og' ? p('public/og.png') : p('public/og', `${name}.png`);
  const buf = await page.screenshot({ type: 'png' });
  writeFileSync(out, buf);
  console.log(`  ✓ ${out.replace(ROOT + '/', '')} (1200×630)`);
}

async function main() {
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined;
  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({ deviceScaleFactor: 1 });

  console.log('Iconos:');
  await rasterizeIcon(page, 512, p('app/icon.png'));
  await rasterizeIcon(page, 180, p('app/apple-icon.png'));

  console.log('Open Graph:');
  for (const [name, data] of Object.entries(variantes)) {
    await renderOg(page, name, data);
  }

  await browser.close();
  console.log('Identidad generada.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
