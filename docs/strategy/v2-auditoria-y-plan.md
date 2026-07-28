# Portfolio V2 — Auditoría crítica y plan por fases

> Fecha: 2026-07-28. Rama: `claude/franco-portfolio-international-ewylq8`.
> Alcance: auditoría completa del sitio actual (Next.js 16, App Router, 9 rutas
> estáticas) contra seis objetivos declarados, y plan de ejecución en 11 fases.
>
> **Limitación de esta auditoría:** el entorno no tiene salida de red hacia
> hosts arbitrarios (el proxy devolvió 403 a `courtops.net`,
> `eleeme-catalogo.vercel.app` y `saa-s-negocios.vercel.app`). No se pudo
> verificar que las demos sigan vivas ni si existe un dominio de producción.
> Todo lo demás está verificado leyendo el repositorio y corriendo el build.

---

## 0. Veredicto

El sitio **no es amateur**. Es lo contrario: tiene un sistema visual editorial
coherente, un régimen de contenido con gobierno de honestidad poco común, 9
rutas 100 % estáticas, cero JS de cliente salvo el header, foco visible,
skip-link, `prefers-reduced-motion`, tipos estrictos y build verde en 4,3 s.
Está por encima del 85–90 % de los portfolios de desarrollador.

Y aun así **falla en cuatro de los seis objetivos declarados** — por razones
estructurales, no estéticas.

El diagnóstico central en una frase:

> Es un portfolio excelente construido para un mercado de uno —
> el dueño de PyME argentino que lee español— y cuatro de los seis
> objetivos requieren una audiencia que literalmente no puede leerlo.

Contra los objetivos:

| # | Objetivo | Estado hoy | Bloqueante principal |
|---|---|---|---|
| 1 | Trabajo remoto internacional | ❌ | Idioma + cero superficie para reclutador |
| 2 | Clientes en Upwork | ❌ | Idioma + cero capturas de producto |
| 3 | Clientes en Contra | ❌ | Idioma + cero capturas de producto |
| 4 | Clientes desde LinkedIn | ⚠️ | Funciona solo para audiencia hispana |
| 5 | Clientes desde Google | ❌ **0 %** | `robots.txt` = `Disallow: /`. Sin dominio. |
| 6 | Posicionar como "resuelve negocio, no solo programa" | ⚠️ | El copy lo afirma; la evidencia no lo demuestra |

El objetivo 6 es el más interesante, porque ahí está la contradicción más cara
del sitio: **es un portfolio que reclama impacto de negocio y no muestra un
solo número de negocio.**

---

## 1. Los cinco bloqueantes críticos

### CRÍTICO 1 — El sitio es invisible para Google. Literalmente.

`app/robots.ts` devuelve `Disallow: /` salvo que `NEXT_PUBLIC_INDEXABLE === 'true'`.
Verificado en el build de esta sesión — el `robots.txt` generado dice:

```
User-Agent: *
Disallow: /
```

Además `lib/seo.ts` emite `robots: { index: false, follow: false }` en **cada
página**, y `SITE_URL` cae a `http://localhost:3000`, con lo cual los canonical
y las URLs absolutas de OG apuntan a localhost.

Esto fue una decisión correcta y deliberada (doc `fase-3b-plan-lanzamiento.md`:
"ninguna preview es indexable"). El problema es que **la salvaguarda temporal se
volvió permanente**, y está atada a un dominio que no existe.

El objetivo 5 no está "poco optimizado". Está en cero por construcción.

Efecto colateral del mismo nudo: `dellorsif@gmail.com` como email de contacto en
una propuesta de USD 20.000. No es fatal, pero es un impuesto de credibilidad
gratuito de pagar.

**Costo de arreglarlo: un dominio + dos variables de entorno.** Es la mejor
relación esfuerzo/impacto de todo el documento.

---

### CRÍTICO 2 — 100 % en español. Cuatro objetivos son internacionales.

`<html lang="es">`. No existe `/en`. Todo `content/` está en castellano
rioplatense — y muy bien escrito, con modismos que funcionan ("plata en la
calle", "cómo vendés, cómo cobrás").

Pero Upwork, Contra, el trabajo remoto y buena parte de LinkedIn son mercados
de habla inglesa. Un recruiter de Stripe, un founder estadounidense en Upwork,
un cliente de Contra: ninguno puede leer este sitio. Todo el set de comparación
que pediste —Brittany Chiang, Lee Robinson, Ram Maheshwari— es English-first.

**La corrección obvia sería "traducirlo". Es la corrección equivocada.**

Las dos audiencias no quieren lo mismo:

| | Español (AR/LATAM) | Inglés (internacional) |
|---|---|---|
| Quién | Dueño de PyME, sodería, transporte, club | Recruiter, CTO, founder, cliente Upwork/Contra |
| Compra | "Ordename la operación" | "Ship product without hand-holding" |
| Prueba que pide | Sistema andando en un negocio como el suyo | Craft, arquitectura, autonomía, comunicación |
| CTA | WhatsApp, llamada de 30 min | Booking link, CV, GitHub |

Una traducción literal del pitch de sodería a inglés no le vende nada a un
recruiter de Vercel. Lo que hace falta es **arquitectura bilingüe con
posicionamiento diferenciado por idioma** sobre el mismo cuerpo de casos.

Eso es una decisión de producto, y es la palanca más grande del plan.

---

### CRÍTICO 3 — Cero capturas de producto. Cero.

Todo el sitio contiene **una sola imagen de contenido**: `public/images/profile.jpg`.

Los cinco `pantallas[]` del caso Sodería tienen `pendiente`, ninguno tiene
`imagen`. Los cuatro casos reducidos no tienen `imagenes`. El caso insignia —
el único marcado "evidencia real", el que carga todo el peso de credibilidad —
**no le muestra al visitante un solo píxel del software**.

El sistema justifica esto con disciplina (`types.ts`: *"los campos opcionales
ocultan su bloque, nunca se rellenan con placeholders que aparenten producto"*)
y las decisiones de interfaz se renderizan como pieza tipográfica en lugar de
caja gris. Respeto la coherencia. **Pero es el trade equivocado.**

Un cliente que evalúa USD 20.000 está comprando confianza en que sabés entregar
una interfaz. Un recruiter escanea craft visual en seis segundos. "Confiá en que
la decisión fue buena", sin un solo artefacto al lado, le llega a un comprador
escéptico como *"no tiene nada para mostrar"*.

> Una honestidad que produce exactamente la misma impresión que el vaporware
> fracasó en ser honesta.

Ésta es la barrera de conversión #1 después del idioma. Y está 100 % bloqueada
en Franco: no hay forma de generarla desde el repositorio.

---

### CRÍTICO 4 — Cero números. Cero testimonios. Cero nombres propios.

`resultados: []` en el único caso completo — con lo cual el bloque no se
renderiza. Sin testimonio. El cliente es "una sodería", sin nombre. **No hay una
sola cifra de negocio en todo el sitio.**

Para alguien cuyo posicionamiento entero es "resuelvo problemas de negocio, no
solo programo", la ausencia total de métricas de negocio no es un detalle: es
una contradicción de posicionamiento. El sitio *afirma* impacto y *demuestra*
cero.

La solución no es inventar métricas — la regla de `fase-3b-afirmaciones-verificadas.md`
es correcta y hay que mantenerla. La solución es **ir a buscarlas**. Una tarde con
el dueño de la sodería produce: cuántos clientes en cuenta corriente, cuántas
entregas por día, cuánto tardaba el cierre de caja antes y cuánto ahora, cuántos
sifones se recuperaron el primer trimestre, desde qué mes está en uso.

Es la hora de mayor retorno que Franco puede invertir en este portfolio.

---

### CRÍTICO 5 — Fricción de conversión + cero instrumentación.

Problemas concretos, en orden de costo:

1. **El CTA principal no convierte a nada.** Home → `/contacto` → `mailto:`.
   Son dos clics para llegar a un `mailto:` que en desktop abre un cliente de
   correo que mucha gente no tiene configurado. Para ese visitante es un
   callejón sin salida.
2. **No hay formulario.** Ni uno.
3. **No hay forma de agendar.** El copy promete "la primera conversación dura 30
   minutos" en tres lugares distintos (home, `/contacto`, `primerPaso`) y no da
   un botón para reservarla. Es una promesa sin puerta.
4. **Cero analítica.** No hay Vercel Analytics, ni Plausible, ni nada. No se
   puede optimizar una conversión que no se mide — y pediste específicamente
   trabajo de CRO. Hoy el CRO sería adivinación.
5. **El header no tiene CTA.** La navegación son tres links de texto plano.
   Linear, Stripe, Vercel y Framer tienen todos un afordance de conversión
   persistente arriba a la derecha. Es el elemento más visto de cualquier sitio.

---

## 2. Problemas mayores

### MAYOR 6 — MiGym no existe en el sitio

Lo nombraste como proyecto principal. No está en `content/cases/` ni en
`coleccionSecundaria` — `content/projects.ts` lo excluye explícitamente por
falta de material (doc 08). O consigue material y entra, o deja de ser un
proyecto principal. Es una decisión pendiente, no un olvido del código.

### MAYOR 7 — No hay ninguna superficie para reclutadores

Para el objetivo 1 (trabajo remoto), un recruiter necesita responderse cinco
cosas en 40 segundos. El sitio no responde ninguna:

- ¿CV descargable? No existe.
- ¿Años de experiencia? No figura en ningún lado.
- ¿Formato buscado — full-time, contract, horas/semana? No figura.
- ¿Zona horaria? Dice "Argentina · remoto". Un recruiter necesita "UTC-3,
  solapamiento de 6 h con EST". Es la primera pregunta de todo proceso remoto.
- ¿Nivel de inglés? No figura — y es la pregunta que decide el 80 % de los
  procesos remotos desde LATAM.

El sitio hoy le da a ese recruiter prosa hermosa sobre soderías y ninguna
respuesta a "¿puede esta persona trabajar con mi equipo el mes que viene?".

### MAYOR 8 — Cuatro de cinco casos dicen "en desarrollo"

Sodería (uso real) + Trackium, Zentro, CourtOps, Doleth — los cuatro "En
desarrollo", ninguno con usuario real declarado. Cada uno, por separado, está
descrito con honestidad ejemplar.

**El problema es el efecto acumulado.** El visitante que baja por `/proyectos`
recibe una impresión que ningún caso individual pretende dar:

> "Este tipo empieza muchas cosas y terminó una."

Es una lectura peligrosa para un cliente de USD 20.000, y es un daño
autoinfligido por el propio sistema de honestidad. La honestidad no está mal;
la **jerarquía plana** sí.

Corrección, sin tocar una sola afirmación: no mostrar cuatro productos en curso
con el mismo peso visual. Promover CourtOps (tiene demo pública — es la única
otra cosa verificable del portfolio) al nivel de Sodería, y bajar Zentro y
Doleth a un tier explícito de **"Exploraciones de producto"**. Con esa etiqueta
dejan de leerse como *productos sin terminar* y pasan a leerse como *ejercicios
deliberados de criterio* — que es exactamente lo que son y lo que el copy ya
dice ("se muestra como visión de producto propia", "ejercicio de diseño de
producto en estado puro").

El reencuadre es gratis y cambia la impresión completa.

### MAYOR 9 — El README contradice al código

`README.md` describe React Router, Vite, `src/components/`, `src/pages/`,
`src/data/projects.ts`, `npm run preview` y "el build genera estáticos en
`dist/`". **Nada de eso existe.** El proyecto es Next.js 16 App Router con
`app/`, `content/` y `components/`.

El link a GitHub está en el footer de todas las páginas. Un CTO lo abre — lo
hacen — y lo primero que ve es documentación que no coincide con el repositorio.
Es una señal de prolijidad directa y se arregla en diez minutos.

*(Corregido en esta rama — ver §5.)*

---

## 3. Problemas moderados

### SEO más allá de la indexabilidad

- **Solo hay JSON-LD de `Person`.** Faltan: `ProfessionalService` (es el que te
  hace aparecer para búsquedas comerciales), `SoftwareApplication`/`CreativeWork`
  por caso, `FAQPage` (alto valor para snippets y para búsqueda con IA) y
  `BreadcrumbList` — el breadcrumb existe visualmente en los casos pero no está
  marcado.
- `app/sitemap.ts` no emite `lastModified`.
- **No hay contenido que apunte a intención de búsqueda.** Nadie googlea "Franco
  Dell'Orsi". Googlean *"sistema de gestión para sodería"*, *"software para
  reparto de agua"*, *"sistema de reservas para club de pádel"*, *"programa para
  empresa de transporte"*. Franco tiene experiencia vivida en cuatro verticales
  y cero páginas que apunten a esas queries. **Ésa es la estrategia real de
  clientes desde Google, y hoy no existe.** Es la oportunidad orgánica más
  grande del sitio.
- Sin `hreflang` (lo va a necesitar apenas exista `/en`).
- Sin bloque `twitter` en metadata → la card de X/Twitter degrada a `summary`
  chico. OG está bien resuelto (9 imágenes 1200×630 por ruta, ~50 KB cada una),
  así que LinkedIn —que es lo que importa para el objetivo 4— comparte bien.

### Performance

El sitio es estructuralmente excelente: 100 % estático, sin SSR, sin JS de
cliente salvo el header, imágenes dimensionadas, `display: swap`. Nada urgente.

Dos desperdicios reales:

- **Tres familias de Google Fonts.** Inter (latin completo), Instrument Serif
  (normal + italic) y JetBrains Mono (latin completo). JetBrains Mono se usa
  *exclusivamente* en `label-mono`: kickers y metadatos en mayúsculas de
  11 px. Es una familia entera para ~60 glifos distintos. Subsetear o
  reemplazar por stack mono del sistema.
- Ninguna fuente se precarga, y la serif es la que dibuja el `<h1>` del hero —
  es decir, el elemento LCP. `preload` en esa sola familia.

### Accesibilidad

Muy por encima del promedio: skip-link, `:focus-visible` global, `aria-labelledby`
en todas las secciones, `aria-current` en navegación, `sr-only` donde
corresponde, `prefers-reduced-motion`, targets táctiles de 44 px.

Un defecto real: **el menú mobile no atrapa el foco.** `Header.tsx` enfoca el
primer link y cierra con Escape, pero `Tab` se escapa del panel hacia el
contenido de atrás, que sigue visible para el lector de pantalla. Falta focus
trap y `aria-hidden`/`inert` en el fondo.

Menor: `document.documentElement.style.overflow = 'hidden'` provoca salto de
posición de scroll en algunas versiones de iOS.

### Motion

Pediste analizar motion, animaciones y microinteracciones. Estado actual:
transiciones CSS de color/borde en elementos interactivos, y un desplazamiento
de 0,35 rem de la flecha al hover. Eso es todo.

Contra el set de comparación (Linear, Vercel, Framer, Ram Maheshwari) esto lee
como estático. **Pero voy a defender parcialmente la decisión:** la dirección
editorial genuinamente no quiere fuegos artificiales, y la contención es
coherente. Hay diferencia, eso sí, entre *contenido* y *nada*. Revelado al
entrar en viewport, conteo animado en los resultados (cuando existan) y un
estado de hover real en las filas de caso —hoy solo cambian de color— suman
calidad percibida sin traicionar el lenguaje.

Dicho con franqueza: **es prioridad baja frente a todo lo anterior.** Motion no
va a conseguir un cliente que hoy no puede leer el sitio ni ver el producto.

### Orden y longitud de la home

Ocho secciones: Hero → Sodería → Seleccionados → Cómo trabajo → Qué podés
contratar → Sobre mí → Colección → Contacto.

"Cómo trabajo" (6 items) y "Qué podés contratar" (3 items) van pegadas: son dos
bloques de proceso seguidos, mucho "cómo trabajo" antes de suficiente "qué
hice". Además, la tira de prueba del hero usa **"ELEEME — trabajo para cliente"**
como prueba social superior, y ELEEME es el activo más débil del portfolio (una
migración de catálogo). La prueba más fuerte arriba, no la más disponible.

### Detalles

- `app/contacto/page.tsx` usa `py-4` en la sección de medios mientras todas las
  demás usan `py-14`/`py-16` — quiebre de ritmo visible.
- Header sticky de 4 rem + `scroll-behavior: smooth` sin `scroll-margin-top`:
  cualquier ancla futura va a caer debajo del header.
- `EstadoBadge` y varios kickers usan `!text-clay`. `!important` dentro de un
  design system es un olor: debería ser una variante del token.
- El `<figcaption>` del hero de home dice "Franco Dell'Orsi — AR" y el de
  `/sobre-mi` dice "Argentina · remoto". Misma foto, dos etiquetas.

---

## 4. Comparación contra el set de referencia

No para copiar — para calibrar el estándar.

| Referencia | Qué hace mejor | Qué le gana Franco | Lección aplicable |
|---|---|---|---|
| **Brittany Chiang** | Escaneabilidad brutal, inglés, una línea por proyecto + tags | Profundidad narrativa, dominio real | Necesita una capa escaneable *arriba* de la narrativa |
| **Lee Robinson / Rauch** | Autoridad por escritura publicada y audiencia, no por diseño | — | **Franco no tiene ni un ensayo.** Seis textos sobre software operativo harían más por el objetivo 6 que cualquier rediseño |
| **Ram Maheshwari** | Densidad visual y motion como señal de craft | Sustancia de negocio | Ram convierte por craft; Franco necesita convertir por evidencia — y hoy no tiene ninguna de las dos en forma visual |
| **Linear / Stripe / Vercel** | **Cada afirmación tiene un artefacto de prueba al lado** (captura, número, logo, snippet) | — | Ésta es *la* diferencia estructural. Franco afirma sin artefacto adyacente |
| **Notion / Framer / Webflow** | Muestran el producto en uso en los primeros 400 px | — | La home debería mostrar software funcionando antes del primer scroll |

**La ventaja real de Franco sobre todos ellos:** historias operativas de dominio
que nadie más tiene. Ninguno de esa lista puede escribir "saqué el reparto de
agua del papel y modelé la deuda de sifones como un libro de débitos y
créditos". Eso es diferenciado, concreto y memorable.

El sitio ya tiene la historia. Le falta la prueba.

---

## 5. Cambios aplicados en esta rama

Deliberadamente **no** toqué arquitectura, copy ni diseño: cada uno de esos
cambios depende de decisiones estratégicas que son tuyas (§7). Sí corregí lo que
es un defecto factual objetivo y sin trade-offs:

- **`README.md` reescrito.** Describía Vite, React Router, `src/` y `dist/` —
  un stack que no existe hace tres commits. Ahora describe el proyecto real
  (Next.js 16 App Router, `app/`/`content/`/`components/`, el régimen de
  contenido honesto y las variables de entorno que gobiernan la indexabilidad).

---

## 6. Plan por fases

Reordené las fases que propusiste. Tu orden era razonable, pero pone Copy en la
fase 3 y Casos de estudio en la 6 — y el copy ya es bueno mientras que la
evidencia no existe. Reescribir texto excelente antes de conseguir la primera
captura sería trabajo desperdiciado.

El orden real de prioridad es: **desbloquear → publicar → probar → convertir →
internacionalizar → todo lo demás.**

Leyenda de prioridad: **P0** bloquea objetivos · **P1** alto impacto ·
**P2** mejora clara · **P3** refinamiento.

---

### FASE 0 — Desbloqueo de material *(no es código)*

- **Objetivo:** conseguir los insumos que ninguna cantidad de trabajo de
  ingeniería puede fabricar.
- **Cambios:**
  1. 6 capturas de Sodería Nico: panel de reparto, POS a mitad de venta a
     cuenta, ficha de cliente con cuenta corriente, tracking de envases, cierre
     de caja, vista mobile. Con datos reales o realistas — nunca "Lorem".
  2. 1 foto de campo (camión, sifones, el local).
  3. Métricas reales del dueño: clientes en cuenta corriente, entregas/día,
     tiempo de cierre antes vs. ahora, envases recuperados, mes de inicio.
  4. Testimonio del dueño, 2–3 frases, con nombre y negocio.
  5. Permiso para nombrar la sodería.
  6. 3–4 capturas de CourtOps y de Trackium.
  7. Decisión sobre MiGym: material o baja.
- **Justificación:** las fases 2, 6 y 8 están todas bloqueadas acá. Es la única
  fase que no puedo ejecutar yo.
- **Impacto esperado:** desbloquea el 60 % del valor del plan. Sin esto, el
  techo del portfolio es el que ya tiene.
- **Prioridad:** **P0** · **Tiempo:** 1 tarde en la sodería + 2 h de capturas.

---

### FASE 1 — Volverlo publicable

- **Objetivo:** que el sitio exista para Google y sea compartible sin costo de
  credibilidad.
- **Cambios:**
  1. Registrar dominio (recomiendo `francodellorsi.com`; `.dev` es señal
     correcta para el objetivo 1 pero peor para el dueño de PyME).
  2. `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_INDEXABLE=true` solo en Production.
  3. Redirect 301 www ↔ no-www coherente con `SITE_URL`.
  4. Email profesional en el dominio; reemplazar el Gmail en `content/site.ts`.
  5. Vercel Analytics + Speed Insights (una línea cada uno).
  6. Google Search Console + envío del sitemap.
  7. `lastModified` en `sitemap.ts`; bloque `twitter: summary_large_image`.
  8. ~~README~~ *(hecho, §5)*.
- **Justificación:** el objetivo 5 está en 0 % hasta que esto pase, y sin
  analítica toda la optimización posterior es opinión.
- **Impacto:** de invisible a indexable. Habilita medir todo lo que sigue.
- **Prioridad:** **P0** · **Tiempo:** 2–3 h + propagación DNS.

---

### FASE 2 — Evidencia

- **Objetivo:** que cada afirmación tenga un artefacto al lado.
- **Cambios:**
  1. Poblar `pantallas[].imagen` en Sodería con las 6 capturas. El componente ya
     las soporta — es solo contenido.
  2. `fotoCampo` en el contexto del caso.
  3. `resultados[]` con las métricas verificadas (el bloque ya existe y se
     autooculta si está vacío).
  4. `testimonio` con nombre y negocio.
  5. `imagenes[]` en CourtOps y Trackium.
  6. Reemplazar la tira de prueba del hero: hoy usa ELEEME —el activo más
     débil— como prueba superior.
  7. Una captura real del producto arriba del pliegue en la home.
- **Justificación:** es la diferencia estructural con Linear/Stripe/Vercel, y la
  respuesta a los críticos 3 y 4. También resuelve la contradicción del objetivo
  6: el sitio deja de *afirmar* impacto y pasa a *mostrarlo*.
- **Impacto:** el mayor salto individual de conversión de todo el plan.
  Cliente de USD 20.000 y recruiter comparten el mismo reflejo — "mostrame".
- **Prioridad:** **P0** *(bloqueado por Fase 0)* · **Tiempo:** 6–8 h.

---

### FASE 3 — Conversión

- **Objetivo:** que la intención se convierta en conversación.
- **Cambios:**
  1. Formulario real en `/contacto` (Server Action + Resend), con campos que
     califican: tipo de negocio, cómo operan hoy, urgencia, presupuesto
     aproximado. Calificar filtra y también posiciona.
  2. Link de agenda (Cal.com) — hay una promesa de 30 minutos en tres lugares
     sin puerta.
  3. CTA persistente en el header.
  4. Arreglar la cadena `mailto:`: el CTA del hero debería ir a un destino que
     convierta, no a un cliente de correo.
  5. Estados de éxito/error del formulario dentro del lenguaje editorial.
  6. Eventos de analítica en cada CTA.
  7. `py-4` → `py-14` en la sección de medios de `/contacto`.
- **Justificación:** hoy el camino más corto de "me interesó" a "hablamos" son
  dos clics y un `mailto:` que en desktop es un callejón sin salida.
- **Impacto:** captura la demanda que el sitio ya genera y hoy pierde.
- **Prioridad:** **P1** · **Tiempo:** 5–7 h.

---

### FASE 4 — Arquitectura bilingüe

- **Objetivo:** habilitar los objetivos 1, 2 y 3.
- **Cambios:**
  1. `app/[lang]/` con `es` (default) e `en`.
  2. `content/` externalizado por idioma — el contenido ya está bien tipado y
     centralizado, así que el refactor es mecánico, no arquitectónico.
  3. **Posicionamiento diferenciado, no traducción literal.** ES vende
     "ordeno tu operación". EN vende "product-minded full-stack engineer who
     ships operational software end to end".
  4. `hreflang` + `alternates.languages`; `lang` correcto por ruta.
  5. Selector de idioma en el header.
  6. OG y JSON-LD por idioma.
- **Justificación:** cuatro de los seis objetivos requieren inglés. Traducir sin
  reposicionar produciría un sitio que no le vende bien a ninguna de las dos
  audiencias.
- **Impacto:** de 0 a viable en Upwork, Contra y búsquedas de remoto.
- **Prioridad:** **P1** · **Tiempo:** 12–16 h.

---

### FASE 5 — Superficie para reclutadores

- **Objetivo:** responder en 40 segundos las cinco preguntas de un proceso remoto.
- **Cambios:**
  1. `/en/hire` (o `/trabajemos`): formato buscado, disponibilidad, **zona
     horaria con solapamiento explícito** (UTC-3 / 6 h con EST), nivel de
     inglés, stack escaneable, links a GitHub y LinkedIn.
  2. CV en PDF descargable, generado desde el mismo contenido para que no se
     desincronice.
  3. Bloque de stack escaneable — hoy las capacidades están en prosa; un
     recruiter no lee prosa, filtra por keywords.
  4. Un highlight de código o de arquitectura: un CTO quiere ver cómo pensás,
     y el modelo de cuentas corrientes de Sodería es material excelente para eso.
- **Justificación:** el objetivo 1 no tiene hoy ninguna superficie propia.
  Zona horaria e inglés son las dos primeras preguntas de todo proceso remoto
  desde LATAM y el sitio no contesta ninguna.
- **Impacto:** habilita el objetivo 1, que hoy es una aspiración sin página.
- **Prioridad:** **P1** · **Tiempo:** 6–8 h.

---

### FASE 6 — Jerarquía de casos

- **Objetivo:** eliminar la lectura de "empieza muchas cosas y terminó una".
- **Cambios:**
  1. Tres tiers explícitos: **Sistemas en producción** (Sodería) · **Productos
     en desarrollo** (Trackium, CourtOps) · **Exploraciones de producto**
     (Zentro, Doleth).
  2. Promover CourtOps: es lo único, además de Sodería, verificable por un
     desconocido.
  3. Convertir Trackium en caso completo cuando haya material.
  4. Resolver MiGym.
  5. Capa escaneable arriba de la narrativa (la lección de Brittany Chiang):
     que se pueda barrer el portfolio en 15 segundos *y* profundizar.
- **Justificación:** ningún caso individual miente, pero el efecto acumulado de
  cuatro "en desarrollo" con igual peso visual comunica algo que ninguno
  pretende. Se corrige con jerarquía, sin tocar una sola afirmación.
- **Impacto:** cambia la impresión global sin costo de honestidad.
- **Prioridad:** **P2** · **Tiempo:** 4–6 h.

---

### FASE 7 — SEO de intención

- **Objetivo:** capturar demanda comercial existente (objetivo 5).
- **Cambios:**
  1. **Landings por vertical** — la pieza grande: `/sistemas/soderias`,
     `/sistemas/transporte`, `/sistemas/clubes-padel`, `/sistemas/comercios`.
     Cada una: el problema del rubro, cómo lo resolvió Franco, el caso enlazado,
     CTA. Franco tiene experiencia vivida en los cuatro rubros — es contenido
     honesto y defendible, no relleno de SEO.
  2. Schema: `ProfessionalService`, `SoftwareApplication` por caso, `FAQPage`,
     `BreadcrumbList`.
  3. FAQ real: cuánto sale, cuánto tarda, cómo se trabaja a distancia, qué pasa
     si el negocio ya tiene un sistema.
  4. `lastModified` real por ruta.
- **Justificación:** nadie googlea "Franco Dell'Orsi". Googlean el problema.
  Cuatro páginas de vertical valen más para el objetivo 5 que cualquier ajuste
  técnico de SEO — y la ventaja competitiva es real: casi nadie escribe sobre
  software para soderías.
- **Impacto:** es *el* motor del objetivo 5 en el mediano plazo. Tarda 2–4 meses
  en madurar, así que conviene empezarlo temprano.
- **Prioridad:** **P2** · **Tiempo:** 10–14 h.

---

### FASE 8 — Autoridad

- **Objetivo:** objetivo 6 — que "entiende de negocios" se demuestre, no se
  afirme.
- **Cambios:** `/notas` con 5–6 ensayos cortos. Temas que Franco ya se ganó el
  derecho a escribir: por qué las cuentas corrientes no son un CRUD; qué no
  construir en un ERP para PyME; diseñar para alguien que carga datos con una
  mano bajo el sol; por qué un sistema que miente es peor que el papel.
- **Justificación:** es de donde sale la autoridad de Lee Robinson y Rauch —
  escritura publicada, no diseño de portfolio. También alimenta LinkedIn
  (objetivo 4) con material propio en vez de posteos genéricos, y alimenta
  Google con long-tail.
- **Impacto:** compuesto y lento, pero es lo que separa "buen dev" de "referente
  de un nicho". Empezar temprano, capitalizar tarde.
- **Prioridad:** **P2** · **Tiempo:** 3–4 h por ensayo, sostenido.

---

### FASE 9 — Diseño y motion

- **Objetivo:** subir calidad percibida sin traicionar la dirección editorial.
- **Cambios:**
  1. Revelado al entrar en viewport (`IntersectionObserver`, respetando
     `prefers-reduced-motion`).
  2. Conteo animado en `resultados` — una vez que existan.
  3. Estado de hover real en filas de caso (hoy solo cambian de color).
  4. Transiciones de vista entre casos (la View Transitions API encaja bien con
     un sitio estático).
  5. Presentación de capturas: marco de dispositivo o mockup consistente.
  6. Limpiar los `!important` del design system → variantes de token.
  7. Modo oscuro *solo si* se hace bien; a medias es peor que no tenerlo.
- **Justificación:** el set de referencia usa motion como señal de craft. La
  contención actual es una decisión defendible — pero hay diferencia entre
  contenido y nada.
- **Impacto:** real pero secundario. Motion no consigue un cliente que no puede
  leer el sitio ni ver el producto.
- **Prioridad:** **P3** · **Tiempo:** 8–10 h.

---

### FASE 10 — Excelencia

- **Objetivo:** el último 5 %, el que se nota sin poder nombrarse.
- **Cambios:**
  1. Lighthouse real contra producción; objetivos Perf ≥ 95, A11y 100, SEO 100.
  2. Subsetear o eliminar JetBrains Mono; `preload` de la serif del LCP.
  3. Focus trap + `inert` de fondo en el menú mobile.
  4. `scroll-margin-top` para el header sticky.
  5. Unificar los dos textos distintos del pie de la misma foto.
  6. Página 404 con personalidad.
  7. Auditoría con lector de pantalla (VoiceOver/NVDA), no solo axe.
  8. Presupuesto de performance en CI para que no se degrade.
  9. OG dinámico por caso vía `next/og` (hoy son 9 PNG estáticos que hay que
     mantener a mano).
- **Justificación:** es lo que distingue el 1 % del 10 %. No mueve la aguja
  solo, pero su ausencia se percibe.
- **Prioridad:** **P3** · **Tiempo:** 8–12 h.

---

## 7. Decisiones que dependen de Franco

Ninguna de estas se puede resolver desde el repositorio:

1. **Dominio.** Sin esto, el objetivo 5 sigue en cero. ¿`.com`, `.dev`, `.com.ar`?
2. **¿Bilingüe?** Si la respuesta es no, los objetivos 1, 2 y 3 salen del plan y
   hay que decirlo explícitamente en vez de dejarlos como aspiración.
3. **Material de Sodería** (Fase 0). Es el bloqueante más grande del plan.
4. **Permiso para nombrar al cliente** y publicar testimonio.
5. **MiGym**: ¿entra o sale?
6. **¿Se busca empleo remoto en serio, o clientes?** Cambia cuánto peso lleva la
   Fase 5 y si conviene una superficie separada o una home dual.
7. **Confirmación de las afirmaciones "No confirmado"** de
   `fase-3b-afirmaciones-verificadas.md` — hay varias que serían potentes
   (ledger inmutable, FIFO, fecha de inicio de uso, tenants de Trackium) y hoy
   se omiten por prudencia.

---

## 8. Resumen de secuencia

| Orden | Fase | Prioridad | Tiempo | Bloqueada por |
|---|---|---|---|---|
| 1 | 0 — Material | P0 | 1 tarde | — |
| 2 | 1 — Publicable | P0 | 2–3 h | dominio |
| 3 | 2 — Evidencia | P0 | 6–8 h | Fase 0 |
| 4 | 3 — Conversión | P1 | 5–7 h | — |
| 5 | 4 — Bilingüe | P1 | 12–16 h | decisión |
| 6 | 5 — Reclutadores | P1 | 6–8 h | Fase 4 |
| 7 | 6 — Jerarquía | P2 | 4–6 h | — |
| 8 | 7 — SEO intención | P2 | 10–14 h | Fase 1 |
| 9 | 8 — Autoridad | P2 | continuo | — |
| 10 | 9 — Motion | P3 | 8–10 h | Fase 2 |
| 11 | 10 — Excelencia | P3 | 8–12 h | — |

**Total estimado: 70–95 h de ejecución**, más la tarde de campo.

Las fases 3, 6 y 8 no dependen de nada y pueden arrancar hoy en paralelo.

---

## 9. La conclusión incómoda

Este portfolio tiene un problema de producto, no de diseño.

Está construido con criterio, disciplina y buen gusto — mejor que la mayoría de
lo que hay dando vueltas. Pero optimiza para una virtud (honestidad absoluta) a
costa de la función (vender), y desemboca en un sitio que **le pide al visitante
que le crea sin darle con qué**.

Las tres cosas que más lo mejoran no son de diseño ni de código:

1. Una tarde en la sodería con un teléfono, sacando capturas y anotando números.
2. Un dominio.
3. La decisión de si esto le habla al mundo o solo a Argentina.

Resueltas esas tres, este portfolio entra al 1 % sin dificultad — porque la
parte difícil, la que casi nadie tiene, ya está: **historias reales de dominio,
contadas con criterio de producto.**
