# Fase 3A — Plan de migración ejecutado

> Rama `feat/portfolio-v1-foundation` (base: `main` 655d0dc). Fecha: 2026-07-18.
> Estrategia: **reemplazo controlado del scaffold** — la app Vite se retira de la rama y se construye Next.js App Router desde cero, preservando assets válidos y usando el código anterior solo como referencia. Producción (`main`) queda intacta.

## Clasificación de cada pieza existente

### Migrar (se conservan tal cual)
| Pieza | Destino | Nota |
|---|---|---|
| `src/assets/profile.jpg` | `public/images/profile.jpg` | Única foto real; servida vía `next/image` |
| `public/favicon.svg/png`, `apple-touch-icon.png`, `logo.png`, `og.png` | `public/` sin cambios | `og.png` se renueva en Fase 3B con la identidad final |
| Medios de contacto (email, WhatsApp, LinkedIn, GitHub) | `content/site.ts` | Extraídos de `Contact.tsx`/`Footer.tsx`; verificados como los únicos reales |

### Usar únicamente como referencia (no se copia código)
| Pieza | Qué se rescató |
|---|---|
| `src/index.css` | Tokens editoriales (papel/tinta/clay, serif+mono) → reescritos como `@theme` en `app/globals.css` |
| `wip/studio-redesign:src/data/cases.ts` | Modelo de caso de 12 bloques → reescrito tipado en `content/types.ts` + `content/cases/` (sin tocar la rama WIP) |
| `Hero.tsx`, `About.tsx`, `Contact.tsx` | Tono del copy; el texto final sale de docs/strategy/03 y 06 |
| `projects.config.json` | Descripciones de CourtOps/SaaS Negocios/ELEEME como base factual |

### Reescribir (existía el concepto; el código es nuevo)
Navbar → `components/Header.tsx` (menú accesible, Escape, foco) · Footer → `components/Footer.tsx` · páginas Home/Proyectos/SobreMi/Contacto → `app/*` como Server Components · ScrollToTop → innecesario (comportamiento nativo de navegación en App Router).

### Eliminar (decisión consciente, con motivo)
| Pieza | Motivo |
|---|---|
| `scripts/sync-projects.mjs`, `repos.json`, `repos_node.json`, `src/data/projects.generated.json`, `projects.config.json` | Datos 100 % curados (doc 10 §4); el sync automático queda descartado |
| `public/images/*.webp` (courtops, eleeme, landing-diego, luminous, saas, soderia) | Capturas mShots/mockups — prohibidas (doc 09); las capturas reales llegan con el material del doc 08 |
| `Scene3D.tsx`, deps `three`/`@react-three/*` | 3D descartado (doc 10 §3) |
| `framer-motion`, `canvas-confetti`, `lucide-react`, `react-router-dom`, Vite y toda su config | V1 sin motion de librería (CSS solo); routing y build los da Next; iconografía no necesaria en V1 |
| `vercel.json` (rewrites SPA + catch-all) | Next.js sirve rutas reales; el workaround SPA deja de existir |
| `TechStack.tsx`, `Capabilities.tsx`, `ProjectImporter.tsx`, `HomeOverview.tsx`, `FeaturedProjects.tsx`, `AllProjects.tsx`, `Process.tsx`, `CTA.tsx` | Secciones del sitio anterior que la narrativa nueva (doc 06) reemplaza o prohíbe (skills/stack como protagonista) |

### Archivar
`wip/studio-redesign` permanece intacta como archivo del rediseño dark (StudioHero, visual-bible, renders). No se recupera nada de su código en esta fase.

## Contradicción detectada y resuelta

- **CTA principal del hero**: doc 06 decía "Ver el caso Sodería Nico →"; el brief de Fase 3A (más reciente y explícito) fija "CTA principal a proyectos". Se implementó **CTA principal → `/proyectos`** y el caso destacado conserva su propio CTA "Leer el caso completo →" una sección más abajo. La evidencia Sodería sigue apareciendo en los primeros 15 segundos (línea de prueba integrada del hero).
- **Métricas del hero anterior** ("4+ años", "6 sistemas publicados", "100% remoto"): no confirmadas → no aparecen (regla del brief). La prueba integrada usa solo hechos respaldados por la documentación.

## Decisiones técnicas de la fase

- Next.js 16.2.10 (App Router, Turbopack), React 19, TypeScript 5.9 estricto (`noUncheckedIndexedAccess`). TS 7 se probó y se revirtió: incompatible con `next build` y typescript-eslint.
- ESLint 9 + `eslint-config-next` flat config (ESLint 10 aún incompatible con los plugins de React).
- Tailwind CSS 4 vía `@tailwindcss/postcss`; tokens en `@theme` (`app/globals.css`).
- Tipografías con `next/font/google`: Instrument Serif (display), Inter (lectura), JetBrains Mono (labels) — self-hosted por Next, `display: swap`.
- Todas las rutas prerenderizadas (Static/SSG); único componente cliente: `Header` (menú mobile).
- `NEXT_PUBLIC_SITE_URL` centraliza la URL pública; `NEXT_PUBLIC_INDEXABLE` gobierna robots/meta robots (preview = noindex por defecto).
- Playwright ya estaba en el lockfile del proyecto (Corte 0); se reutiliza para la suite smoke (`scripts/smoke.mjs`, 159 checks).
