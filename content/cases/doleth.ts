import type { CasoReducido } from '../types';

export const doleth: CasoReducido = {
  tipo: 'reducido',
  slug: 'doleth',
  nombre: 'Doleth',
  titulo: 'Finanzas personales sin humo.',
  sector: 'Producto personal de finanzas',
  rol: 'Producto, lenguaje y diseño de información',
  estado: 'en-desarrollo',
  tier: 'exploracion',
  rolPortfolio: 'diseno',
  acceso: {
    privado: { motivo: 'Producto en desarrollo — sin demo pública.' },
  },
  stack: ['TypeScript', 'React'],
  resumen:
    'Producto de finanzas personales organizado en seis superficies — Ahora, Actuar, Próximo, Cambios, Mi realidad y Progreso — centrado en lenguaje, jerarquía y diseño de información. Sin inteligencia artificial.',

  problema:
    'Las apps de finanzas personales suelen mostrar todo: gráficos, categorías, porcentajes. El usuario ve datos pero no sabe qué hacer. El problema no es de información sino de lenguaje y jerarquía: qué merece atención ahora y qué puede esperar.',

  construido: [
    'Arquitectura de seis superficies con un propósito cada una: Ahora, Actuar, Próximo, Cambios, Mi realidad, Progreso',
    'Lenguaje propio: cada pantalla responde una pregunta concreta en castellano llano',
    'Jerarquía de información que prioriza la próxima decisión sobre el histórico',
  ],

  decision: {
    titulo: 'Sin IA, a propósito.',
    cuerpo:
      'Doleth no usa inteligencia artificial. La apuesta es que el criterio — qué mostrar, qué callar, cómo nombrar las cosas — resuelve más que un modelo prediciendo gastos. Es un ejercicio de diseño de producto en estado puro: si la jerarquía es correcta, la app aconseja sin algoritmos.',
  },

  situacion:
    'Producto personal en desarrollo. Se muestra como evidencia de criterio de producto y diseño de información.',
};
