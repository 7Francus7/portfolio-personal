// ─────────────────────────────────────────────────────────────────────────────
// Contenido en inglés — reposicionamiento, no traducción (decisión Franco,
// 2026-07-28).
//
// El español le habla al dueño de PyME: "te ordeno la operación".
// El inglés le habla a recruiters, CTOs, founders y clientes de plataformas
// internacionales: ownership, product thinking, engineering judgment y
// capacidad de llevar software de relevamiento a producción.
//
// Reglas de lenguaje (explícitas en el brief):
//   · Prohibido: "junior developer", "passionate developer",
//     "looking for opportunities", y cualquier fórmula que pida permiso.
//   · Posicionamiento: Product Engineer / Full-Stack Product Builder
//     especializado en operational software.
//
// Regla de honestidad (igual que en español): nada que no esté confirmado.
// Nivel de inglés y años de experiencia NO figuran porque no están
// confirmados. Ver `perfilProfesional` en content/site.ts.
// ─────────────────────────────────────────────────────────────────────────────

export const en = {
  rol: 'Product Engineer · Full-stack',
  titulo: 'I turn messy operations into software people actually use.',

  intro:
    'I build operational software for businesses that run on paper, spreadsheets and WhatsApp — delivery routes, customer accounts, cash reconciliation, bookings. I own the whole path: field research, product scope, interface design, data modeling, and shipping to production.',

  /**
   * Las ocho preguntas que un recruiter necesita responderse en 40 segundos.
   * El orden es deliberado: primero prueba, después disponibilidad.
   */
  preguntas: [
    {
      pregunta: 'What did he build?',
      respuesta:
        'A management system running a real water-and-soda distribution business — delivery routes, current accounts, returnable container tracking and daily cash close. Plus a booking SaaS for padel clubs with a public demo, and a multi-tenant operations system for trucking companies.',
    },
    {
      pregunta: 'Was it used by real people?',
      respuesta:
        'Yes — one of them. Sodería Nico runs on it daily. The others are in development and labeled as such: I do not present work-in-progress as shipped product.',
    },
    {
      pregunta: 'What decisions did he own?',
      respuesta:
        'All of them. Scope, data model, interface, stack and deployment. On the delivery system I decided what not to build — no full ERP — because every feature is a feature someone has to fill in every single day.',
    },
    {
      pregunta: 'Can he work independently?',
      respuesta:
        'These systems were specified, designed, built and deployed without a team, a designer or a product manager. The hard part was never the code: it was deciding what deserved to exist.',
    },
    {
      pregunta: 'What technical complexity did he handle?',
      respuesta:
        'Modeling money and physical assets that move at the same time. A customer can owe cash and containers simultaneously, pay in parts, and return bottles on any delivery — so account state is a ledger of movements, not a stored number, with reversing entries instead of edits to the past.',
    },
    {
      pregunta: 'Is he available for remote work?',
      respuesta:
        'Yes, currently open to remote roles and contract work.',
    },
    {
      pregunta: 'What timezone does he work in?',
      respuesta:
        'Argentina, UTC-3. Full overlap with US Eastern, most of the working day with US Pacific, and mornings with Central Europe.',
    },
  ],

  /** Stack escaneable. Un recruiter filtra por keywords, no lee prosa. */
  stack: [
    { grupo: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL'] },
    { grupo: 'Frontend', items: ['React', 'Next.js (App Router)', 'Tailwind CSS', 'PWA'] },
    { grupo: 'Backend', items: ['Node.js', 'PostgreSQL', 'Prisma', 'REST'] },
    { grupo: 'Product', items: ['Field research', 'Scoping', 'Information architecture', 'UI design'] },
    { grupo: 'Delivery', items: ['Vercel', 'Static-first', 'Accessibility', 'Core Web Vitals'] },
  ],

  /** Capacidades en términos de producto y ownership, no de tareas. */
  capacidades: [
    {
      titulo: 'Ownership end to end',
      cuerpo:
        'I take a vague operational problem and return a system in production. That includes saying no to features, choosing the data model before the screens, and being the one who fixes it when it breaks.',
    },
    {
      titulo: 'Product judgment',
      cuerpo:
        'I research operations on site — not over a call. What gets built comes from watching how a business actually sells, charges and delivers, and finding the two or three moments where control is lost.',
    },
    {
      titulo: 'Engineering for reality',
      cuerpo:
        'The people using these systems work one-handed, outdoors, in a hurry. That constraint drives the interface, the offline behaviour and the error handling — not a demo-friendly happy path.',
    },
  ],

  /**
   * Trabajo seleccionado, resumido en inglés.
   *
   * Los casos completos están en español: enlazarlos sin avisar sería un
   * callejón sin salida para un recruiter. Se avisa, y el resumen en inglés
   * alcanza para decidir si vale la pena traducir con el navegador.
   */
  trabajo: [
    {
      slug: 'soderia-nico',
      nombre: 'Sodería Nico',
      estado: 'In daily production use',
      resumen:
        'Operations system for a water-and-soda distributor: delivery routes, cash and credit sales, customer current accounts, returnable container tracking and daily cash close. Built mobile-first because it is used from the street.',
      complejidad:
        'Current accounts modeled as a ledger of debits and credits, with reversing entries instead of edits — so the system never lies about who owes what.',
    },
    {
      slug: 'courtops',
      nombre: 'CourtOps',
      estado: 'In development · public demo',
      resumen:
        'Vertical SaaS for padel clubs: public booking portal for players and an operational calendar, pricing and collections panel for the club.',
      complejidad:
        'Two audiences that share nothing but the data: designed as two distinct surfaces over one model instead of a single panel that serves neither well.',
    },
    {
      slug: 'trackium',
      nombre: 'Trackium',
      estado: 'In development',
      resumen:
        'Multi-tenant operations system for trucking companies: clients, drivers, trucks, trips, invoicing, payments, tax withholdings, cheques, driver settlements and fleet maintenance.',
      complejidad:
        'The full money circuit — from invoice to cleared cheque — because a system that only records "invoiced/paid" sends you back to spreadsheets exactly where it hurts.',
    },
  ],

  /** CTA del recorrido de empleo. */
  cta: {
    trabajo: 'View selected work',
    cv: 'Download résumé',
    contacto: 'Contact me',
  },

  meta: {
    titulo: 'Product Engineer — operational software',
    descripcion:
      'Franco Dell’Orsi — product engineer building operational software: delivery routes, customer accounts, bookings and cash reconciliation. Remote, UTC-3, available.',
  },
} as const;
