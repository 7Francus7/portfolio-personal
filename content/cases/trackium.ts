import type { CasoReducido } from '../types';

export const trackium: CasoReducido = {
  tipo: 'reducido',
  slug: 'trackium',
  nombre: 'Trackium',
  titulo: 'Un sistema operativo para empresas de transporte.',
  sector: 'Transporte y logística',
  rol: 'Producto, arquitectura y desarrollo full-stack',
  estado: 'en-desarrollo',
  rolPortfolio: 'escala',
  acceso: {
    privado: { motivo: 'Producto en desarrollo — sin demo pública por ahora.' },
  },
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
  resumen:
    'SaaS multi-tenant para empresas de transporte: clientes, choferes, camiones, viajes, facturación, pagos, cheques, liquidaciones y mantenimiento en un solo sistema, con operación mobile.',

  problema:
    'Una empresa de transporte mueve más papeles que camiones: viajes, facturas, retenciones, cheques, liquidaciones a choferes, vencimientos de documentación y mantenimiento de la flota. Cuando todo eso vive en planillas separadas, nadie sabe cuánto dejó realmente un viaje.',

  construido: [
    'Gestión de clientes, choferes, camiones y viajes',
    'Facturación con pagos, retenciones y cheques',
    'Liquidaciones a choferes',
    'Vencimientos de documentación y mantenimiento de flota',
    'Reportes de rentabilidad por viaje',
    'Arquitectura multi-tenant con permisos y aislamiento por empresa',
    'PWA con operación mobile',
  ],

  decision: {
    titulo: 'El dinero se modela completo o no sirve.',
    cuerpo:
      'En transporte, una factura no es un número: son pagos parciales, retenciones que descuentan impuestos y cheques que cobran a fecha. Trackium modela ese circuito completo — de la factura al cheque acreditado — porque un sistema que solo registra "facturado/cobrado" obliga a volver a las planillas justo donde más duele.',
  },

  situacion:
    'Producto en desarrollo activo. Los módulos operativos y financieros listados existen; el foco actual es cerrar el circuito completo con una empresa real.',
};
