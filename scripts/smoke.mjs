// Suite smoke de Fase 3A. Requiere build previo (`npm run build`).
// Levanta `next start`, verifica rutas, SEO técnico, accesibilidad básica,
// desktop (1440), mobile (320/390), menú accesible y reduced motion.
// Uso: node scripts/smoke.mjs

import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const PORT = 4321;
const BASE = `http://localhost:${PORT}`;

const RUTAS = [
  '/',
  '/proyectos',
  '/casos/soderia-nico',
  '/casos/trackium',
  '/casos/zentro',
  '/casos/courtops',
  '/casos/doleth',
  '/sobre-mi',
  '/contacto',
];

const resultados = [];
function check(nombre, ok, detalle = '') {
  resultados.push({ nombre, ok, detalle });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${nombre}${detalle && !ok ? ` — ${detalle}` : ''}`);
}

async function esperarServidor() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return;
    } catch {
      /* aún no levanta */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('El servidor no levantó en 30s');
}

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
  stdio: 'ignore',
});

try {
  await esperarServidor();

  // ── HTML y SEO técnico por ruta ─────────────────────────────────────────────
  for (const ruta of RUTAS) {
    const res = await fetch(`${BASE}${ruta}`);
    const html = await res.text();
    check(`${ruta} responde 200`, res.status === 200, `status ${res.status}`);
    check(`${ruta} lang=es`, html.includes('<html lang="es"'));
    check(`${ruta} tiene <title>`, /<title>[^<]{5,}<\/title>/.test(html));
    check(`${ruta} tiene meta description`, /name="description" content="[^"]{20,}"/.test(html));
    check(`${ruta} tiene canonical`, html.includes('rel="canonical"'));
    const mains = html.match(/<main/g) ?? [];
    check(`${ruta} un solo <main>`, mains.length === 1, `${mains.length} <main>`);
    check(`${ruta} tiene <h1>`, /<h1[\s>]/.test(html));
    check(`${ruta} tiene skip link`, html.includes('skip-link'));
    check(`${ruta} sin texto "undefined"`, !/>\s*undefined\s*</.test(html));
    check(
      `${ruta} zoom permitido`,
      !html.includes('user-scalable=no') && !html.includes('maximum-scale=1'),
    );
  }

  // 404 real
  const res404 = await fetch(`${BASE}/ruta-inexistente-xyz`);
  check('404 devuelve status 404', res404.status === 404, `status ${res404.status}`);
  const html404 = await res404.text();
  check('404 tiene contenido propio', html404.includes('Esta página no existe'));

  // robots y sitemap
  const robots = await fetch(`${BASE}/robots.txt`);
  const robotsTxt = await robots.text();
  check('robots.txt responde', robots.status === 200);
  check('robots.txt bloquea preview no indexable', robotsTxt.includes('Disallow: /'));
  const sitemap = await fetch(`${BASE}/sitemap.xml`);
  const sitemapXml = await sitemap.text();
  check('sitemap.xml responde', sitemap.status === 200);
  check('sitemap incluye los 5 casos', RUTAS.filter((r) => r.startsWith('/casos/')).every((r) => sitemapXml.includes(r)));

  // Zentro: nunca presentado como consolidado
  const zentroHtml = await (await fetch(`${BASE}/casos/zentro`)).text();
  check('Zentro figura "En desarrollo"', zentroHtml.includes('En desarrollo'));

  // ── Navegador ───────────────────────────────────────────────────────────────
  // En entornos con Chromium preinstalado (CI, sandboxes) el binario de la
  // versión exacta puede no estar descargado: PLAYWRIGHT_CHROMIUM_EXECUTABLE
  // permite apuntar al ejecutable disponible sin bajar nada.
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined;
  const browser = await chromium.launch({ executablePath });

  // Desktop 1440
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const erroresConsola = [];
    page.on('console', (m) => m.type() === 'error' && erroresConsola.push(m.text()));
    page.on('pageerror', (e) => erroresConsola.push(String(e)));
    for (const ruta of RUTAS) {
      await page.goto(`${BASE}${ruta}`, { waitUntil: 'networkidle' });
      const h1Visible = await page.locator('h1').first().isVisible();
      check(`desktop ${ruta} h1 visible`, h1Visible);
      const sinScrollH = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      );
      check(`desktop ${ruta} sin scroll horizontal`, sinScrollH);
    }
    check('desktop consola sin errores', erroresConsola.length === 0, erroresConsola.join(' | '));

    // Navegación y CTAs de la home
    await page.goto(BASE, { waitUntil: 'networkidle' });
    check('desktop nav Proyectos', await page.locator('header a[href="/proyectos"]').isVisible());
    check('desktop CTA proyectos', await page.locator('a:has-text("Ver proyectos")').first().isVisible());
    check('desktop CTA contacto', await page.locator('a:has-text("Contame tu operación")').first().isVisible());

    // Skip link primero en el orden de tabulación
    await page.goto(BASE);
    await page.keyboard.press('Tab');
    const focoSkip = await page.evaluate(() => document.activeElement?.classList.contains('skip-link'));
    check('skip link recibe el primer foco', focoSkip === true);

    // Navegación real por teclado hasta un enlace del header
    await page.keyboard.press('Tab');
    const focoMarca = await page.evaluate(() => document.activeElement?.tagName === 'A');
    check('teclado alcanza la marca', focoMarca === true);
    await page.close();
  }

  // Mobile 320 y 390
  for (const width of [320, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    for (const ruta of RUTAS) {
      await page.goto(`${BASE}${ruta}`, { waitUntil: 'networkidle' });
      const sinScrollH = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      );
      check(`mobile ${width} ${ruta} sin scroll horizontal`, sinScrollH);
    }
    // Menú accesible
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const boton = page.getByRole('button', { name: 'Menú' });
    check(`mobile ${width} botón menú visible`, await boton.isVisible());
    await boton.click();
    check(
      `mobile ${width} menú abre con enlaces`,
      await page.locator('nav[aria-label="Principal (móvil)"] a[href="/contacto"]').isVisible(),
    );
    const expandido = await page.getByRole('button', { name: 'Cerrar' }).getAttribute('aria-expanded');
    check(`mobile ${width} aria-expanded=true`, expandido === 'true');
    await page.keyboard.press('Escape');
    const cerrado = await page.getByRole('button', { name: 'Menú' }).getAttribute('aria-expanded');
    check(`mobile ${width} Escape cierra`, cerrado === 'false');
    const focoVuelve = await page.evaluate(() => document.activeElement?.tagName === 'BUTTON');
    check(`mobile ${width} foco vuelve al botón`, focoVuelve === true);
    // Contacto accesible
    await page.goto(`${BASE}/contacto`, { waitUntil: 'networkidle' });
    check(`mobile ${width} email visible en contacto`, await page.locator('a[href^="mailto:"]').first().isVisible());
    await page.close();
  }

  // Reduced motion: todo el contenido visible
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    check('reduced-motion h1 visible', await page.locator('h1').isVisible());
    const opacidad = await page
      .locator('h1')
      .evaluate((el) => getComputedStyle(el).opacity);
    check('reduced-motion h1 opacity=1', opacidad === '1');
    await page.close();
  }

  // Landmarks + jerarquía de headings en la home
  {
    const page = await browser.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    for (const landmark of ['header', 'main', 'footer', 'nav']) {
      check(`landmark <${landmark}>`, (await page.locator(landmark).count()) >= 1);
    }
    const h1s = await page.locator('h1').count();
    check('home un solo h1', h1s === 1, `${h1s} h1`);
    const saltos = await page.evaluate(() => {
      const hs = [...document.querySelectorAll('h1,h2,h3')].map((h) => Number(h.tagName[1]));
      let prev = 0;
      return hs.some((n) => {
        const salta = n - prev > 1;
        prev = n;
        return salta;
      });
    });
    check('home sin saltos de heading', saltos === false);
    await page.close();
  }

  await browser.close();
} finally {
  server.kill();
}

const fallas = resultados.filter((r) => !r.ok);
console.log(`\n${resultados.length - fallas.length}/${resultados.length} checks OK`);
if (fallas.length > 0) {
  console.log('FALLAS:');
  for (const f of fallas) console.log(` - ${f.nombre} ${f.detalle}`);
  process.exit(1);
}
