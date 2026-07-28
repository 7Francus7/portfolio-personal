import type { CasoReducido } from '../types';

export const zentro: CasoReducido = {
  tipo: 'reducido',
  slug: 'zentro',
  nombre: 'Zentro',
  titulo: 'Soltar sin perder el control.',
  sector: 'Negocios pequeños que operan por WhatsApp',
  rol: 'Visión de producto, diseño y desarrollo',
  estado: 'en-desarrollo',
  tier: 'exploracion',
  rolPortfolio: 'vision',
  acceso: {
    privado: { motivo: 'Producto en desarrollo — sin demo pública.' },
  },
  stack: ['Next.js', 'TypeScript', 'IA aplicada', 'WhatsApp'],
  resumen:
    'SaaS en desarrollo para negocios pequeños que necesitan delegar conversaciones y operaciones por WhatsApp sin perder el control: un empleado digital prepara acciones y el dueño autoriza las decisiones sensibles.',

  problema:
    'En un negocio chico, WhatsApp es el mostrador: por ahí entran pedidos, consultas y reclamos. El dueño no puede soltarlo porque cada mensaje puede costar plata — pero atenderlo todo el día también cuesta. Delegar hoy significa perder control.',

  construido: [
    'Concepto y diseño de producto: un empleado digital que atiende y prepara acciones',
    'Sistema de autorización: las decisiones sensibles siempre pasan por el dueño',
    'Diseño de las interacciones de aprobación y supervisión',
  ],

  enConstruccion: [
    'Desarrollo del producto hacia una primera operación real',
  ],

  decision: {
    titulo: 'La IA propone; el dueño decide.',
    cuerpo:
      'Zentro no automatiza todo por diseño. La frontera entre lo que el empleado digital resuelve solo y lo que requiere autorización es el producto: un descuento, una promesa de entrega o un reembolso nunca salen sin que el dueño lo apruebe. Esa restricción — incómoda de construir — es lo que hace posible confiar.',
  },

  situacion:
    'Producto en desarrollo. Se muestra acá como visión de producto propia, no como sistema consolidado.',
};
