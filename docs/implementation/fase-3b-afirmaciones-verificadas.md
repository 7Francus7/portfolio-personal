# Fase 3B — Afirmaciones verificadas

> Rama `feat/portfolio-v1-foundation`. Fecha: 2026-07-21.
> Regla: una afirmación técnica solo aparece en el sitio si (1) el usuario la
> confirmó, (2) puede verificarse en el repositorio, o (3) está respaldada por
> documentación confiable. En esta sesión **no se recibieron confirmaciones
> nuevas del usuario**, de modo que la verificación se limita a lo comprobable
> en el repositorio y en la documentación de Fase 3A.

## Clasificación de las afirmaciones de Sodería Nico

| Afirmación | Estado | Base | ¿Aparece hoy en el sitio? |
|---|---|---|---|
| Sistema en uso real diario | **Parcialmente confirmado** | Declarado en brief Fase 2 y `soderia-nico.ts` (`estado: 'uso-real'`); sin evidencia visual en repo | Sí — badge "En uso real" |
| Modelo de cuentas corrientes como débitos/créditos | **Confirmado (repo/doc)** | Descrito en `problemaTecnico`, coherente con brief; texto conservador sin números | Sí — bloque "problema técnico" |
| Correcciones por reversa (no editar el pasado) | **Confirmado (doc)** | Afirmado en Fase 2 y modelado en el texto | Sí |
| Ledger inmutable (término explícito) | **No confirmado** | No verificable en repo; requiere OK del usuario | No — se evita el término |
| FIFO en asignación de pagos | **No confirmado** | Sin respaldo verificable | No — se omite (regla Fase 3A) |
| Fecha aproximada de inicio de uso | **No confirmado** | Sin dato respaldado | No — no se publica fecha |
| Personas/roles que lo usan | **No confirmado** | Sin dato respaldado | No |
| Seguimiento de envases prestados | **Parcialmente confirmado** | Descrito como dolor y decisión; sin captura | Sí — como decisión de interfaz (texto) |
| Cierre de caja calculado por el sistema | **Parcialmente confirmado** | Descrito en `pantallas` y `aprendizajes` | Sí — como decisión (texto) |
| Operación mobile desde la calle | **Parcialmente confirmado** | Declarado en `resumen` | Sí — en resumen |
| "Cero planillas" / "automatizó todo" | **Descartado** | Prohibido sin confirmación de que no queda proceso en papel | No — nunca se usa ese lenguaje |
| Métricas de resultado (números) | **No confirmado** | `resultados: []` ⇒ el bloque no se renderiza | No |

## Otros proyectos

| Proyecto | Afirmación sensible | Estado | Tratamiento |
|---|---|---|---|
| Trackium | Módulos operativos/financieros existen; multi-tenant | **No confirmado externamente** | Estado "En desarrollo"; se listan como construidos según brief, con foco declarado en cerrar circuito con empresa real |
| Trackium | Tenants/clientes reales en producción | **No confirmado** | No se afirma uso real |
| Zentro | Producto consolidado / resultados de clientes | **Descartado** | Estado "En desarrollo"; presentado como visión de producto propia |
| CourtOps | Demo pública navegable | **Confirmado** | Verificada viva 2026-07-17; enlazada |
| CourtOps | Club real operando de punta a punta | **No confirmado** | Declarado como próximo paso, no como hecho |
| Doleth | Producto publicado | **No confirmado** | Estado "En desarrollo"; presentado como ejercicio de diseño |
| Doleth | Sin IA, a propósito | **Confirmado (doc/repo)** | Coherente con contenido; se afirma |

## Conclusión

El contenido publicado hoy es **consistente con lo verificable**. Las
afirmaciones "No confirmado" que serían más potentes (ledger inmutable, FIFO,
uso real con métricas, fecha de inicio, tenants reales de Trackium) **siguen
requiriendo confirmación explícita del usuario** antes de reforzarse en el sitio.

Ninguna de ellas se agregó en esta sesión. El sitio no miente; simplemente aún
no puede afirmar todo lo que el caso podría llegar a afirmar con material.
