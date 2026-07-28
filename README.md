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
npm run dev         # servidor de desarrollo
npm run build       # build de producción (incluye type-check)
npm run start       # servir el build
npm run lint
npm run typecheck
npm run smoke       # smoke Playwright (BASE=<url> para apuntar a un deploy)
```

## Variables de entorno

| Variable | Efecto |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base para canonical, OG y sitemap. Sin definir cae a `http://localhost:3000`. |
| `NEXT_PUBLIC_INDEXABLE` | Solo `'true'` habilita indexación. Con cualquier otro valor, `robots.txt` bloquea todo y cada página emite `noindex`. |
| `NEXT_PUBLIC_SHOW_INTERNAL_NOTES` | `'true'` muestra los marcadores de material pendiente. Nunca en producción. |

> ⚠️ **El sitio no es indexable hasta que `NEXT_PUBLIC_INDEXABLE=true` esté
> configurada en Production.** Es intencional mientras no haya dominio
> definitivo, pero significa que hoy no llega tráfico orgánico. Ver
> `docs/strategy/v2-auditoria-y-plan.md` §1.

## Documentación

- `docs/strategy/v2-auditoria-y-plan.md` — auditoría crítica y plan por fases
- `docs/implementation/` — migración, identidad, QA y plan de lanzamiento V1

---

© Franco Dell'Orsi
