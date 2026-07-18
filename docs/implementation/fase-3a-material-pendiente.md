# Fase 3A — Material pendiente

> Derivado de `docs/strategy/08-material-faltante.md` (rama `strategy/portfolio-phase-2`).
> Estado al cierre de Fase 3A. Los marcadores internos (`NotaInterna`) solo se ven en `next dev`; en cualquier build de producción/preview no renderizan nada.

## Cómo espera el material cada componente

| Material | Dónde aparecerá | Componente que lo espera | Contenido temporal honesto | Bloquea preview | Bloquea producción |
|---|---|---|---|---|---|
| 6 capturas internas Sodería (reparto, POS, cuenta corriente, ledger, cierre, mobile) | `/casos/soderia-nico` bloque "Decisiones de interfaz" | `CasoCompleto.tsx` → `pantallas[].imagen` | El bloque se renderiza como pieza tipográfica: la decisión es el contenido; sin cajas grises | No | **Sí** — sin capturas el caso completo no cumple "extraordinaria" (doc 09) |
| Foto de campo Sodería | `/casos/soderia-nico` bloque Contexto | `CasoCompleto.tsx` → `fotoCampo` | Bloque de foto oculto; el contexto vive en texto | No | Sí (deseable, no letal si hay capturas) |
| Testimonio de Nico | `/casos/soderia-nico` bloque 10 | `CasoCompleto.tsx` → `testimonio` | Bloque oculto por completo | No | No (V1.1) |
| Confirmación datos financieros Sodería (ledger inmutable, FIFO, fecha de uso, "0 planillas") | Bloques "Problema técnico" y "Resultados" | `problemaTecnico` (escrito en versión conservadora) y `resultados` (vacío = oculto) | El bloque técnico describe solo el modelo débitos/créditos/reversas afirmado en el brief; sin números | No | **Sí** para publicar resultados; el texto técnico requiere OK de Franco |
| Estado real Trackium (módulos hechos vs plan, ¿tenants reales?) | `/casos/trackium` | `content/cases/trackium.ts` (`construido`, `situacion`) | Lista basada en el brief de Fase 2; estado "En desarrollo" (el más conservador) | No | **Sí** — confirmar antes de publicar |
| Capturas Trackium (2) | `/casos/trackium` bloque "El producto" | `CasoReducido.tsx` → `imagenes` | Bloque oculto (el reducido vive de texto) | No | No (V1.1) |
| Zentro: párrafo de visión aprobado + estado real + capturas del estado actual | `/casos/zentro` | `content/cases/zentro.ts` | Texto conservador marcado "En desarrollo"; sin imágenes | No | Confirmar texto antes de publicar |
| Capturas CourtOps (panel + portal mobile) | `/casos/courtops` | `CasoReducido.tsx` → `imagenes` | Bloque oculto; enlace a demo pública viva (verificada 2026-07-17) | No | No (V1.1) |
| Capturas Doleth (6 superficies) + estado real | `/casos/doleth` | `CasoReducido.tsx` → `imagenes` | Bloque oculto; caso vive del texto de diseño | No | No (V1.1) |
| Bio 4 líneas aprobada + confirmación "años de experiencia" | `/sobre-mi` | `app/sobre-mi/page.tsx` | Bio escrita sin cifras de años; nada que confirmar para que sea verdadera | No | Solo si Franco quiere sumar años/cifras |
| Dominio definitivo + email profesional | Canonical/OG/robots y `/contacto` | `content/site.ts` (`SITE_URL`, `INDEXABLE`) y `contacto.email` | `SITE_URL` configurable; preview noindex; contacto centralizado en Gmail real | No | **Sí** — sin dominio no hay lanzamiento indexable (doc 10 §6) |
| Material colección secundaria (MiGym, Carnify, Ursula, Enzo, Prode, n8n: 2 líneas + 1 captura c/u) | Home §7 y `/proyectos` | `content/projects.ts` | Omitidos por completo (regla: sin material no aparecen) | No | No — entran cuando lleguen |

## Resumen de bloqueos

- **Nada bloquea la preview de Fase 3A**: toda superficie renderiza contenido honesto sin material faltante visible.
- **Bloquean producción (V1 pública)**: capturas internas de Sodería Nico, confirmación de datos financieros del caso, confirmación de estado real de Trackium/Zentro, y dominio definitivo.
- **Pueden completarse después (V1.1)**: video de uso real, testimonio, capturas de casos reducidos, OG por caso, secundarios nuevos.
