// ─────────────────────────────────────────────────────────────────────────────
// Datos generales del sitio. Todo dato aquí está confirmado en el repositorio
// o en la documentación de estrategia. Nada inventado.
// ─────────────────────────────────────────────────────────────────────────────

// La URL pública y la política de indexación viven en `lib/entorno.ts`.
// No se declaran acá para que exista una sola fuente de verdad.

export const site = {
  nombre: 'Franco Dell’Orsi',
  rol: 'Desarrollador de producto y full-stack',
  ubicacion: 'Argentina · remoto',
  disponible: true,

  // Posicionamiento congelado (doc 03).
  propuesta: 'Convierto operaciones reales en software claro.',
  subtitulo:
    'Negocios que hoy funcionan con papel, planillas y WhatsApp: los transformo en sistemas que ordenan ventas, cuentas, reparto y caja — del relevamiento a producción.',
  propuestaSecundaria:
    'Entiendo cómo funciona un negocio antes de escribir código. Investigo la operación en el terreno, defino el producto, diseño la experiencia y construyo el sistema completo — frontend, backend y datos — hasta que alguien lo usa todos los días.',

  descripcionMeta:
    'Franco Dell’Orsi — desarrollador de producto y full-stack. Convierto operaciones que funcionan con papel, planillas y WhatsApp en sistemas claros: ventas, cuentas, reparto y caja.',
} as const;

/** Medios de contacto reales, presentes en el repositorio. No inventar otros. */
export const contacto = {
  email: 'dellorsif@gmail.com',
  whatsapp: 'https://wa.me/5493524421497',
  linkedin: 'https://www.linkedin.com/in/franco-dellorsi/',
  github: 'https://github.com/7Francus7',
} as const;

/**
 * Enlace de agenda. Preparado, no inventado: mientras sea `null` la UI ofrece
 * el formulario y el email en lugar de un botón que no lleva a ningún lado.
 * Para activarlo: pegar la URL real de Cal.com / Calendly.
 */
export const agenda: { url: string; etiqueta: string } | null = null;

/**
 * Perfil profesional. **Solo datos confirmados por Franco (2026-07-28).**
 *
 * Los campos `null` están deliberadamente vacíos porque el dato no está
 * confirmado: la UI los omite o muestra un estado explícito de "a confirmar".
 * Nunca rellenar con estimaciones — la regla de honestidad del repositorio
 * aplica igual al perfil que a los casos.
 */
export const perfilProfesional = {
  ubicacion: 'Argentina',
  zonaHoraria: 'UTC-3',
  /** Solapamiento real con husos donde se contrata remoto. Derivado de UTC-3. */
  solapamiento: [
    { zona: 'US Eastern (UTC-5)', detalle: 'Overlap completo — 2 h de diferencia' },
    { zona: 'US Pacific (UTC-8)', detalle: 'Overlap de mañana a media tarde' },
    { zona: 'Europa central (UTC+1)', detalle: 'Overlap de mañana europea' },
  ],
  modalidad: 'Remoto',
  disponible: true,

  // ── Pendientes de confirmación ────────────────────────────────────────────
  /** Sin confirmar. No inventar. */
  nivelIngles: null,
  /** Sin confirmar. No inventar. */
  aniosExperiencia: null,
  /** Ruta al PDF en /public cuando exista. `null` ⇒ la UI bloquea la descarga. */
  cvPdf: null,
} as const;

export const navegacion = [
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/contacto', label: 'Contacto' },
] as const;

/** Oferta concreta para negocios que necesitan ordenar una operación. */
export const oferta = [
  {
    nombre: 'Diagnóstico y alcance',
    detalle:
      'Mapeamos cómo trabaja hoy el negocio, dónde se pierde control y qué conviene resolver primero.',
  },
  {
    nombre: 'MVP operativo',
    detalle:
      'Diseño y construyo el flujo central completo: interfaz, backend, datos y puesta en producción.',
  },
  {
    nombre: 'Evolución del sistema',
    detalle:
      'Después del primer uso, ajustamos lo que frena y sumamos módulos solo cuando la operación los necesita.',
  },
] as const;

export const primerPaso = [
  {
    paso: 'Conversamos 30 minutos',
    detalle: 'Me mostrás cómo vendés, cobrás, repartís o administrás hoy. Sin presentación preparada.',
  },
  {
    paso: 'Definimos el cuello de botella',
    detalle: 'Separamos el problema urgente de las funciones que pueden esperar.',
  },
  {
    paso: 'Recibís un próximo paso claro',
    detalle: 'Te digo si conviene construir, qué alcance tendría y cómo empezar sin rehacer todo después.',
  },
] as const;

/** Cómo trabajo — proceso congelado por el brief de Fase 3A. */
export const comoTrabajo = [
  {
    paso: 'Entender la operación',
    detalle:
      'Antes de pensar en pantallas: cómo se vende, cómo se cobra, cómo se reparte, dónde se anota. En el terreno, no por videollamada.',
  },
  {
    paso: 'Encontrar el flujo crítico',
    detalle:
      'Toda operación tiene dos o tres momentos donde se pierde el control: una cuenta que no cierra, un envase sin rastro, una deuda de la que nadie se acuerda.',
  },
  {
    paso: 'Reducir complejidad',
    detalle:
      'Decidir qué no se construye. Cada función que se agrega es una función que alguien tiene que cargar todos los días.',
  },
  {
    paso: 'Diseñar la experiencia',
    detalle:
      'El sistema lo usa gente trabajando: con una mano, al sol, apurada. La interfaz se diseña para ese contexto, no para una demo.',
  },
  {
    paso: 'Construir una base confiable',
    detalle:
      'Modelar bien los datos — cuentas, movimientos, stock — para que el sistema nunca mienta. La UI se apoya en eso, no al revés.',
  },
  {
    paso: 'Probar e iterar',
    detalle:
      'Poner el sistema en manos reales, mirar dónde se traba y ajustar. Producción es el principio, no el final.',
  },
] as const;
