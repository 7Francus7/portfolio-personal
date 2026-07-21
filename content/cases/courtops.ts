import type { CasoReducido } from '../types';

export const courtops: CasoReducido = {
  tipo: 'reducido',
  slug: 'courtops',
  nombre: 'CourtOps',
  titulo: 'Reservas y operación para clubes de pádel.',
  sector: 'Clubes deportivos',
  rol: 'Producto, diseño y desarrollo full-stack',
  estado: 'en-desarrollo',
  rolPortfolio: 'saas-vertical',
  acceso: {
    demo: { url: 'https://www.courtops.net', etiqueta: 'Demo pública', verificada: true },
    repo: { url: 'https://github.com/7Francus7/CourtOps' },
  },
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
  resumen:
    'SaaS vertical en desarrollo para clubes de pádel: reservas online, disponibilidad, precios, socios y administración, con experiencia pública mobile para el jugador.',

  problema:
    'Los clubes gestionan turnos, clientes y pagos por WhatsApp y planillas. Cada no-show es una cancha vacía que nadie facturó, y el dueño no tiene un número claro de cómo viene el mes.',

  construido: [
    'Portal público de reservas, pensado mobile-first para el jugador',
    'Calendario operativo de canchas para la administración',
    'Gestión de clientes y socios',
    'Precios y disponibilidad configurables',
    'Panel de administración con control de cobranzas',
  ],

  enConstruccion: [
    'Torneos, ligas y planes de socios',
    'Puesta en marcha con un club real',
  ],

  decision: {
    titulo: 'Dos experiencias, un solo sistema.',
    cuerpo:
      'CourtOps tiene dos usuarios que no se parecen en nada: el jugador que reserva desde el teléfono en veinte segundos y el club que administra canchas, precios y cobranzas. El producto se diseñó como dos superficies distintas sobre los mismos datos, en lugar de un panel único que no sirve bien a ninguno.',
  },

  situacion:
    'Producto en desarrollo con demo pública navegable. El siguiente paso es operar un club real de punta a punta.',
};
