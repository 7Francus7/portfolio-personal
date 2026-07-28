# Franco Dell'Orsi — Portfolio

Portafolio personal de **Franco Dell'Orsi**. Posicionamiento: convierto
operaciones reales —negocios que funcionan con papel, planillas y WhatsApp— en
software claro, del relevamiento a producción.

🔗 **GitHub:** [7Francus7](https://github.com/7Francus7) · **LinkedIn:** [franco-dellorsi](https://www.linkedin.com/in/franco-dellorsi/)

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, TypeScript estricto, Tailwind CSS v4
- **Tipografía:** Instrument Serif · Inter · JetBrains Mono (vía `next/font`)
- **Calidad:** ESLint + `tsc --noEmit` + smoke con Playwright
- **Deploy:** Vercel — las 9 rutas se prerenderizan como estáticas

Sin librería de animación: el motion es CSS y se neutraliza bajo
`prefers-reduced-motion`. El único componente cliente es el header.

## Estructura

```
app/                 # rutas (App Router)
  page.tsx           # home
  proyectos/         # índice de proyectos
  sobre-mi/
  contacto/
  casos/[slug]/      # casos, prerenderizados con generateStaticParams
  robots.ts          # indexación gobernada por entorno (ver abajo)
  sitemap.ts
  globals.css        # design tokens + utilidades editoriales
components/
  Header.tsx         # único componente cliente
  Footer.tsx
  ui.tsx             # EstadoBadge, Kicker, NotaInterna
  caso/              # plantillas: CasoCompleto, CasoReducido, Diagrama
content/             # fuente única de contenido, tipada
  types.ts           # tipos + reglas del régimen de contenido
  site.ts            # datos del sitio, oferta, proceso, contacto
  cases/             # un archivo por caso
  projects.ts        # colección secundaria
lib/seo.ts           # metadata base y por ruta
docs/                # estrategia e implementación
```

El contenido se edita en `content/`. Los componentes no llevan texto de negocio.

## Régimen de contenido

El sitio tiene una regla de honestidad codificada en los tipos: **nada se
muestra si no está respaldado.** Los campos opcionales ocultan su bloque en
lugar de rellenarse con placeholders — un caso sin métricas verificadas no
renderiza la sección de resultados, y un proyecto sin demo viva nunca muestra
botón de "abrir". `EstadoProducto` gobierna qué lenguaje se permite por
proyecto.

Ver `docs/implementation/fase-3b-afirmaciones-verificadas.md` para el registro
de qué está confirmado y qué no.

## Desarrollo

```bash
npm install
npm run dev                # servidor de desarrollo
npm run build              # prebuild (guard) + build + postbuild (guard)
npm run start              # servir el build
npm run lint
npm run typecheck
npm run smoke              # smoke Playwright (194 checks)
npm run verify             # lint + typecheck + build + smoke
npm run check:demos        # revalida que las demos públicas sigan vivas
npm run check:publicacion  # muestra la política de publicación del entorno
```

## Política de publicación

`lib/entorno.ts` es la única fuente de verdad. **El sitio solo es indexable
cuando se cumplen las tres condiciones a la vez**: fase producción, dominio
`https` real y opt-in explícito. En cualquier otro caso es `noindex` y no
emite canonical, hreflang, `og:image` ni sitemap — porque apuntarlos a
`localhost` es peor que omitirlos.

Dos guards lo hacen cumplir automáticamente:

- **`prebuild`** — falla el build si un deploy de producción no tiene dominio
  válido, con instrucciones concretas.
- **`postbuild`** — inspecciona el HTML generado y falla si quedó cualquier URL
  local o si el `robots.txt` no coincide con la política.

## Variables de entorno

| Variable | Efecto |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública. Debe ser `https`, con host real y sin barra final. Sin ella el sitio es noindex y omite toda metadata absoluta. |
| `NEXT_PUBLIC_INDEXABLE` | Solo `'true'` habilita indexación, **y solo si además hay dominio y la fase es producción**. |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Dominio en Plausible. Sin ella no se inyecta ningún script de analítica. |
| `RESEND_API_KEY` | Entrega del formulario de contacto. Sin ella el formulario avisa que no está configurado en vez de fingir el envío. |
| `CONTACTO_EMAIL_REMITENTE` | Remitente verificado en Resend. Requerido junto con la API key. |
| `CONTACTO_EMAIL_DESTINO` | Destino de las consultas. Por defecto, el email de contacto del sitio. |
| `NEXT_PUBLIC_SHOW_DRAFTS` | `'true'` muestra los borradores de `/notas`. Nunca en producción: sin ella la ruta devuelve 404. |
| `NEXT_PUBLIC_SHOW_INTERNAL_NOTES` | `'true'` muestra los marcadores de material pendiente. Nunca en producción. |

> ⚠️ **Hoy el sitio no es indexable: falta el dominio.** Es intencional, pero
> significa que no llega tráfico orgánico. Ver
> `docs/strategy/v2-auditoria-y-plan.md` §1.

## Documentación

- `docs/strategy/v2-auditoria-y-plan.md` — auditoría crítica y plan por fases
- `docs/strategy/checklist-campo-soderia.md` — material a relevar en el campo
- `docs/strategy/analitica-y-conversion.md` — eventos medidos y cómo leerlos
- `docs/implementation/` — migración, identidad, QA y plan de lanzamiento V1

---

© Franco Dell'Orsi
