# Fase 3B — Identidad visual

> Rama `feat/portfolio-v1-foundation`. Fecha: 2026-07-21.
> Reemplaza el favicon heredado (rayo violeta, estética Vercel `#863bff`) por
> una identidad derivada del sistema editorial del sitio.

## Lógica visual

La identidad no es un logo nuevo: es la **destilación del sistema editorial**
ya definido (tinta, papel, clay, serif de display). Un solo símbolo, coherente
con cada superficie del sitio.

### Paleta (idéntica a `app/globals.css`)

| Rol | Token | Hex |
|---|---|---|
| Fondo del símbolo | `--color-ink` | `#16150f` |
| Trazo principal | `--color-paper` | `#faf9f6` |
| Acento | `--color-clay` | `#a63d27` |
| Hairlines (OG) | `--color-line` | `#e5e2d8` |

### El monograma

Una **F** construida geométricamente (rectángulos, no tipografía embebida) para
ser nítida a 16×16 px. La particularidad editorial: el **travesaño medio en
clay**, el mismo acento que en el sitio marca lo que importa (el `<em>` clay del
hero, el badge "En uso real"). Fondo tinta, trazo papel.

Decisiones deliberadas, alineadas al brief:

- **Sin gradientes, sin neón, sin rayo, sin brackets de código.**
- Esquinas rectas (lenguaje editorial: "esquinas rectas, radio solo utilitario").
- Geometría propia embebida en el SVG ⇒ cero dependencia de fuentes externas,
  legible y reproducible.

## Assets producidos

Fuente única: `app/icon.svg`. Todo lo demás se deriva de él.

| Archivo | Tamaño | Uso | Cableado |
|---|---|---|---|
| `app/icon.svg` | 32×32 vector | Favicon moderno | Next inyecta `<link rel="icon" type="image/svg+xml">` |
| `app/icon.png` | 512×512 | Favicon PNG de respaldo | Next inyecta `<link rel="icon" type="image/png">` |
| `app/apple-icon.png` | 180×180 | Apple touch icon | Next inyecta `<link rel="apple-touch-icon">` |
| `public/og.png` | 1200×630 | Open Graph base (home/layout) | `lib/seo.ts` → `metadataBase()` |
| `public/og/<ruta>.png` | 1200×630 | OG por ruta (9 imágenes) | `lib/seo.ts` → `metadataRuta({ og })` |

> Las convenciones de archivo de Next (`app/icon.*`, `app/apple-icon.*`)
> generan y cablean los `<link>` automáticamente: no hay `metadata.icons`
> manual que mantener. Verificado en el `<head>` del build.

## Open Graph — plantilla editorial

Una sola plantilla, variada por contenido (`scripts/generate-identity.mjs`):

- Marco hairline, kicker mono, titular serif con acento clay en `<em>`, pie con
  monograma + nombre + contexto, y badge de estado cuando corresponde.
- Tipografía: Instrument Serif + JetBrains Mono (las del sitio) cuando hay red;
  degradación determinista a Georgia si no.
- El texto sale del **contenido real** de cada ruta (títulos, sectores, estados
  honestos). **Ninguna captura de producto** se usa como fondo — se evita
  cualquier OG engañoso o ilegible.
- Tamaño de titular auto-ajustado por longitud para no desbordar ni colisionar
  con el pie; zonas seguras respetadas (contenido dentro de un inset de 96 px).

## Reproducibilidad

```
# En entornos con Chromium preinstalado (CI, sandboxes):
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/ruta/al/chrome node scripts/generate-identity.mjs
```

El generador es idempotente: reescribe iconos y OG desde `app/icon.svg` y las
variantes declaradas. Cambiar el símbolo o un titular y re-ejecutar regenera
todo el set de forma consistente.

## Eliminado

- `public/favicon.svg` (rayo violeta), `public/favicon.png`,
  `public/apple-touch-icon.png` (placeholders heredados).
- `public/logo.png` e `public/icons.svg` (sprites sin referencia en el código).
