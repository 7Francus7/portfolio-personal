# Analítica y eventos de conversión

> Implementado en FASE A/C. Fuente de verdad del código: `lib/analitica.ts`.

## Por qué Plausible y no Google Analytics

| Criterio | Plausible | GA4 |
|---|---|---|
| Cookies | Ninguna | Sí |
| Banner de consentimiento | No hace falta | Obligatorio en la UE |
| Peso del script | ~1 KB | ~45 KB |
| Fingerprinting / perfilado entre sitios | No | Sí |
| Dónde viven los datos | UE o infraestructura propia | Google |

El banner de consentimiento no es solo una cuestión legal: es un modal que
tapa el contenido en el primer segundo de visita, empeora el CLS y agrega
fricción justo donde el sitio tiene que convencer. Evitarlo es una decisión de
conversión además de una de privacidad.

**No se recoge ningún dato personal.** Los eventos llevan propiedades que son
strings cortos de un catálogo cerrado — nunca contenido escrito por el
visitante, ni su email, ni identificadores.

## Activación

La analítica **no se inyecta** salvo que exista `NEXT_PUBLIC_ANALYTICS_DOMAIN`.
Local, CI y preview quedan limpios sin configuración adicional.

```
NEXT_PUBLIC_ANALYTICS_DOMAIN = tu-dominio.com
```

## Catálogo de eventos

Cerrado y tipado a propósito (`EVENTOS` en `lib/analitica.ts`): un evento que
no esté en el catálogo no se puede emitir, así el panel no se llena de nombres
sueltos que nadie sabe interpretar seis meses después.

| Evento | Propiedad | Valores | Dónde se dispara |
|---|---|---|---|
| `cta_contacto` | `origen` | `hero`, `header`, `menu-movil`, `home-cierre`, `caso-<slug>`, `agenda` | Todo CTA que lleva al formulario |
| `cta_recruiter` | `origen` | `en-hero`, `en-availability`, `contacto` | Recorrido de empleo |
| `formulario_enviado` | `tipo` | `contacto` | Envío aceptado por el servidor |
| `formulario_error` | `motivo` | `error`, `sin-configurar` | Fallo de validación o de entrega |
| `contacto_directo` | `medio` | `email`, `whatsapp`, `linkedin`, `github` | Contacto por fuera del formulario |
| `demo_abierta` | `proyecto` | slug del caso | Apertura de una demo pública |
| `cv_descarga` | `estado` | `disponible`, `bloqueado` | Intento de descargar el CV |

## Qué mirar, y en qué orden

El error más común es mirar visitas. Las visitas no son el problema de este
sitio: la conversión sí.

1. **`cta_contacto` ÷ visitantes únicos** — la tasa que importa. Si es baja, el
   problema está arriba del CTA (propuesta, evidencia), no en el botón.
2. **`cta_contacto` por `origen`** — dice qué superficie convence. Si el hero
   convierte y los casos no, los casos no están cerrando; si pasa al revés, la
   home no está calificando.
3. **`formulario_enviado` ÷ `cta_contacto`** — mide la fricción del formulario.
   Una caída fuerte acá es un problema de formulario, no de posicionamiento.
4. **`formulario_error` con motivo `sin-configurar`** — debería ser **cero**. Si
   aparece en producción, hay consultas reales perdiéndose: falta
   `RESEND_API_KEY`. Revisar esto primero, siempre.
5. **`cv_descarga` con estado `bloqueado`** — cuántos recruiters piden el CV que
   todavía no existe. Es la señal directa de cuánto cuesta no tenerlo.
6. **`cta_recruiter` vs `cta_contacto`** — la proporción real entre los dos
   recorridos, contra el 60/40 previsto. Si no coincide, el reparto editorial
   está mal calibrado.

## Lo que todavía no se mide

Deuda consciente, para no inventar instrumentación antes de tener tráfico:

- Scroll depth por sección (diría dónde se abandona la home).
- Tiempo hasta el primer CTA.
- Origen de tráfico por campaña (falta definir UTMs para LinkedIn y Upwork).
- Apertura de demos externas: el evento existe pero todavía no está cableado en
  los enlaces de demo de los casos.
