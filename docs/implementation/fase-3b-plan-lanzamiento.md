# Fase 3B — Plan de lanzamiento

> Rama `feat/portfolio-v1-foundation`. Fecha: 2026-07-21.
> Este plan NO se ejecuta ahora: producción (`main`) queda intacta y el preview
> permanece **noindex**. Es la secuencia exacta para el switch cuando el usuario
> apruebe y el material/dominio estén resueltos.

## Estado actual (seguro)

- `NEXT_PUBLIC_SITE_URL` sin fijar ⇒ fallback `http://localhost:3000`.
- `NEXT_PUBLIC_INDEXABLE` sin fijar ⇒ `robots.txt` bloquea todo y cada página
  emite `robots: noindex, nofollow`. **Ninguna preview es indexable.**
- Canonical y OG usan `SITE_URL`; hasta que haya dominio, no se fija canonical
  "real" falso (apunta al fallback, no a un dominio productivo inventado).

## Bloqueadores de producción (deuda)

1. **Material de Sodería** — 6 capturas internas + foto de campo + confirmación
   de afirmaciones factuales (ver `fase-3b-auditoria-material.md` y
   `fase-3b-afirmaciones-verificadas.md`). Sin esto el caso completo no alcanza
   el estándar "extraordinario".
2. **Dominio definitivo + email profesional** — no existe aún.
3. **Confirmación de estado real de Trackium/Zentro** — texto conservador OK,
   pero reforzar afirmaciones requiere confirmación del usuario.

## Preview (Paso 1 — no verificable desde este entorno)

No hay acceso al dashboard/CLI/API de Vercel desde el contenedor. **No se finge
verificación.** Lo que se dejó preparado y lo que queda pendiente:

- **Riesgo detectado**: el proyecto Vercel venía configurado para el stack
  **Vite** (síntoma: error "No Output Directory named `dist`"). La migración a
  Next.js (Fase 3A) eliminó `vercel.json`. Si el *Framework Preset* del proyecto
  sigue pinneado a Vite, el preview de Next fallaría igual.
- **Mitigación aplicada**: se agregó `vercel.json` con `{"framework": "nextjs"}`.
  Ese campo **sobreescribe** el preset del dashboard, forzando build/deploy como
  Next.js (build `next build`, output `.next`, sin `outputDirectory` manual).
- **Pendiente de verificar manualmente** en Vercel:
  1. Project → Settings → Framework Preset = **Next.js** (o confiar en el
     override de `vercel.json`).
  2. Que no queden overrides heredados de Vite (Output Directory `dist`,
     Build Command custom).
  3. Que la preview del branch buildee verde y que **NO** sea indexable
     (dejar `NEXT_PUBLIC_INDEXABLE` sin setear o en `false` en Preview).
  4. Abrir la URL de preview y correr el smoke contra ella
     (`BASE` apuntando a la URL pública).

## Secuencia de switch a producción (cuando se apruebe)

1. Resolver los 3 bloqueadores anteriores.
2. Registrar dominio definitivo y configurarlo en Vercel (Production).
3. Configurar **variables de entorno de Production**:
   - `NEXT_PUBLIC_SITE_URL = https://<dominio>` (sin barra final).
   - `NEXT_PUBLIC_INDEXABLE = true` (solo en Production, nunca en Preview).
4. DNS: apuntar `A`/`CNAME` a Vercel; verificar propagación y HTTPS automático.
5. Elegir canonical **www vs no-www** y configurar el redirect 301 en Vercel
   hacia la variante canónica (coherente con `SITE_URL`).
6. Email profesional (`hola@<dominio>` o similar) y actualizar `contacto.email`
   en `content/site.ts` si se decide reemplazar el Gmail actual.
7. Verificar en Production:
   - `robots.txt` ahora permite indexar y expone `sitemap.xml`.
   - `sitemap.xml` con las 9 rutas y URLs absolutas correctas.
   - OG absolutos resolviendo al dominio real (probar en validadores sociales).
   - JSON-LD `Person` con `url` = dominio real.
8. Correr Lighthouse contra Production (objetivos en `fase-3b-qa.md`).
9. Recién entonces: merge de `feat/portfolio-v1-foundation` a `main`
   (**fuera del alcance de esta fase** — requiere aprobación explícita).

## Lo que NO se hace en esta fase

- No merge a `main`. No se promociona el preview a producción.
- No se fija dominio ni canonical productivo.
- No se toca `wip/studio-redesign`.
- No se habilita indexación.
