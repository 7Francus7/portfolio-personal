# Fase 3B — QA

> Rama `feat/portfolio-v1-foundation`. Fecha: 2026-07-21.
> Entorno: contenedor de ejecución remota (Node 22, Chromium preinstalado de
> Playwright vía `PLAYWRIGHT_CHROMIUM_EXECUTABLE`).

## Resultados de la batería

| Verificación | Comando | Resultado |
|---|---|---|
| Instalación por lockfile | `npm ci` | ✅ 373 paquetes, sin errores |
| Typecheck | `npm run typecheck` (`tsc --noEmit`) | ✅ 0 errores |
| Lint | `npm run lint` (`eslint .`) | ✅ 0 errores |
| Build producción | `npm run build` (`next build`) | ✅ 13 rutas, todas Static/SSG |
| Smoke Playwright | `npm run smoke` | ✅ **159/159** |
| `git diff --check` | — | ✅ sin conflict markers ni whitespace roto |

### Detalle del smoke (159 checks)

Cubre las 9 rutas + 404, en desktop 1440 y mobile 320/390:
títulos `<h1>` únicos, skip link, landmarks (`header/main/nav/footer`),
jerarquía de headings sin saltos, sin texto `undefined`, zoom permitido,
sin scroll horizontal, menú mobile accesible (abre, `aria-expanded`, Escape
cierra, foco vuelve al botón), reduced-motion (h1 visible con `opacity=1`),
SEO técnico (robots bloquea preview no indexable, sitemap con los 5 casos),
estados honestos (Zentro "En desarrollo"), y **consola sin errores**.

> El único check que fallaba al inicio de la fase — "consola sin errores"
> por un `404` de favicon no cableado — quedó resuelto al conectar los iconos
> vía convenciones de Next (`app/icon.svg` / `app/icon.png` / `app/apple-icon.png`).
> Antes: 158/159. Ahora: 159/159.

## Verificación de identidad y OG

- `<head>` emite `<link rel="icon">` (svg + png 512), `<link rel="apple-touch-icon">`
  (180) y `og:image` absoluto por ruta. Verificado con `next start` + `curl`.
- OG por ruta: base + `proyectos`, `sobre-mi`, `contacto` y `caso-<slug>` (×5).
  Todas 1200×630, contraste correcto, texto legible, sin desbordes.
- Revisión visual (capturas Playwright) de home desktop 1440, home mobile 390 y
  caso desktop 1440: composición correcta, sin colisiones, sin scroll horizontal.

## Accesibilidad

Cubierto por el smoke y por el diseño de Fase 3A (heredado y preservado):
skip link, landmarks, foco visible (`:focus-visible` clay), jerarquía de
headings, `aria-current` en navegación, menú mobile con manejo de foco y Escape,
`prefers-reduced-motion` que neutraliza toda transición. El micro-motion añadido
es solo CSS y no introduce contenido oculto ni dependencia de JS.

## Performance (estructural)

No se ejecutó una corrida Lighthouse completa en este entorno (sin la
herramienta instalada y con red saliente por proxy); se documentan en cambio
las características estructurales medibles del build:

- **Todas las rutas son estáticas (SSG/Static)** — HTML prerenderizado, sin SSR
  en runtime.
- **Un único componente cliente**: `Header` (menú mobile). El resto es Server
  Components sin JS de interacción.
- **Fuentes self-hosted** por `next/font` (Instrument Serif, Inter, JetBrains
  Mono) con `display: swap` — sin request a Google en runtime.
- **Imágenes locales y curadas** vía `next/image`; sin dominios remotos
  (`next.config.ts` con `remotePatterns: []`). `profile.jpg` 900×900 (~54 KB).
- **JS estático total ~664 KB sin comprimir** (todos los chunks sumados; gzip
  reduce sustancialmente). First Load por ruta bajo, dominado por el runtime de
  React/Next compartido.
- OG por ruta ~44–52 KB c/u; favicon PNG < 2 KB.

> Deuda de QA: ejecutar Lighthouse real (Performance/A11y/Best Practices/SEO)
> contra la preview desplegada, con dominio y `NEXT_PUBLIC_INDEXABLE` definitivos,
> antes de la publicación. Objetivos: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95,
> CLS ≈ 0. La estructura del sitio (estático, JS mínimo, sin layout shift de
> fuentes por `swap` + fallbacks, imágenes dimensionadas) está alineada con esos
> objetivos, pero **no se declaran puntajes sin medición confiable**.

## Preview de Vercel

No verificable desde este entorno (sin acceso al dashboard/CLI/API de Vercel).
Riesgo y plan en `fase-3b-plan-lanzamiento.md` (§Preview y §Vercel).
