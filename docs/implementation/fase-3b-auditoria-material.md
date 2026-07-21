# Fase 3B — Auditoría del material recibido

> Rama `feat/portfolio-v1-foundation`. Fecha: 2026-07-21.
> Alcance ejecutado: **subset honesto** (decisión del usuario). Los pasos que
> dependen de material nuevo quedan como deuda explícita, sin fabricar nada.

## Hallazgo principal

La Fase 3B pedía auditar e integrar material entregado (capturas de Sodería,
foto de campo, testimonio, confirmaciones factuales). **En esta sesión no se
recibió ningún material nuevo**, y no existe en ninguna rama del repositorio:

- `public/images/` contiene únicamente `profile.jpg` (la foto de perfil ya
  migrada en Fase 3A). No hay capturas de sistemas, ni foto de campo, ni
  imágenes de casos.
- Los documentos de estrategia `docs/strategy/01…10` citados como fuente de
  verdad **no están** en el repo (vivían en la rama `strategy/portfolio-phase-2`,
  ausente de origin). Las únicas fuentes documentales presentes son los dos
  archivos de `docs/implementation/fase-3a-*`.

En consecuencia, **no se integró ninguna captura, foto ni testimonio**: hacerlo
habría requerido inventarlos, algo que el brief prohíbe explícitamente y que la
regla madre del proyecto (`content/types.ts`) también veta.

## Inventario de material disponible y decisión

| Elemento | Origen | Autenticidad | Decisión | Motivo |
|---|---|---|---|---|
| `public/images/profile.jpg` (900×900) | Migrado en Fase 3A | Real | **Usar** | Única foto real; ya servida vía `next/image` en home y `/sobre-mi` |
| Medios de contacto (email, WhatsApp, LinkedIn, GitHub) | `content/site.ts` | Real, verificado en repo | **Usar** | Confirmados como los únicos reales |
| Demo pública CourtOps (`courtops.net`) | `content/cases/courtops.ts` | Verificada viva 2026-07-17 | **Usar** | Único acceso externo verificado; se enlaza como demo |
| Demo SaaS Negocios / ELEEME (colección secundaria) | `content/projects.ts` | URLs verificadas 2026-07-17 | **Usar** | Ya listadas con material real |
| 6 capturas internas Sodería | — | **No entregadas** | **Volver a solicitar** | Bloquean el caso completo "extraordinario" |
| Foto de campo Sodería | — | **No entregada** | **Volver a solicitar** | Evidencia de contexto (papel↔software) |
| Testimonio de Nico | — | **No entregado** | **Excluir (V1.1)** | Sin autorización no se muestra |
| Capturas Trackium / CourtOps / Doleth | — | **No entregadas** | **Volver a solicitar** | Los casos reducidos viven del texto; entran en V1.1 |

## Material generado en esta fase (no fotográfico)

Todo generado a partir del sistema editorial, sin representar interfaces
inexistentes (ver `fase-3b-identidad.md`):

- Favicon editorial y set de iconos (reemplazan el rayo violeta heredado).
- Open Graph base + un OG por ruta principal (9 imágenes), compuestos con
  tipografía y color del sistema — nunca con capturas falsas de producto.

## Reglas respetadas

- No se alteró ninguna imagen para representar funcionalidad inexistente
  (no había imágenes de producto que alterar).
- No se inventaron datos, botones, estados ni métricas.
- Los bloques que esperan capturas siguen renderizando como pieza tipográfica
  (la decisión de interfaz ES el contenido), tal como se diseñó en Fase 3A.

## Deuda explícita (bloquea producción)

1. 6 capturas internas de Sodería Nico (reparto, POS, cuenta corriente, ledger,
   cierre, mobile).
2. Foto de campo de Sodería.
3. Confirmación de afirmaciones factuales (ver `fase-3b-afirmaciones-verificadas.md`).

Hasta que ese material exista, el caso Sodería se publica en su forma honesta
actual (texto + decisiones), pero **no alcanza el estándar "extraordinario"**
que la estrategia exige para justificar publicación indexable completa.
