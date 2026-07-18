import type { CasoCompleto } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Sodería Nico — único caso completo de V1 (doc 07 §3).
// Contenido basado en el material heredado válido (wip: cases.ts) y el brief
// de Fase 2. Material visual pendiente: ver docs/implementation/
// fase-3a-material-pendiente.md. Sin capturas no se inventa nada: las
// decisiones de interfaz se muestran como pieza tipográfica.
// ─────────────────────────────────────────────────────────────────────────────

export const soderiaNico: CasoCompleto = {
  tipo: 'completo',
  slug: 'soderia-nico',
  nombre: 'Sodería Nico',
  titulo: 'Saqué el reparto del papel y lo convertí en un sistema.',
  sector: 'Distribución de agua y soda',
  rol: 'Arquitectura, producto y desarrollo full-stack',
  estado: 'uso-real',
  rolPortfolio: 'evidencia-real',
  acceso: {
    privado: { motivo: 'Sistema privado en uso real — sin demo pública.' },
    repo: { url: 'https://github.com/7Francus7/Soderia-Nico' },
  },
  stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  resumen:
    'Sistema de gestión para una sodería real: rutas de reparto, ventas de contado y a cuenta, cuentas corrientes, envases prestados, cierres de caja y operación mobile desde la calle.',

  contexto:
    'Una sodería de reparto de agua y soda. Rutas de entrega diarias, clientes fijos con cuenta corriente y envases —sifones y dispensers— que salen y vuelven todos los días. Una operación física que se gestionaba con papel, memoria y anotaciones de reparto.',
  fotoCampoPendiente: {
    notaInterna: 'PENDIENTE: foto de campo real (camión, sifones o local). Doc 08 §Sodería 7.',
  },

  problema: {
    intro: 'Todo vivía en papel. Tres cosas, en concreto, costaban plata real.',
    dolores: [
      {
        dolor: 'Envases prestados sin rastro',
        costo: 'Pérdida directa de activo: sifones y dispensers que nadie sabía dónde estaban.',
      },
      {
        dolor: 'Morosidad invisible',
        costo: 'Plata en la calle: clientes recurrentes con deuda que no figuraba en ningún lado.',
      },
      {
        dolor: 'Caja sin número real',
        costo: 'El cierre del día dependía de la memoria y de planillas sueltas.',
      },
    ],
  },

  investigacion:
    'El sistema no salió de un listado de features: salió de mapear el día completo de la operación — cómo se arma una ruta, dónde se anota una venta, cómo vuelve un envase y en qué momento exacto se pierde el control. Recién con ese mapa se decidió qué construir.',

  decision: {
    cita: 'No construí un ERP completo con módulos que nunca iban a usar. La sodería necesitaba cerrar el día rápido, no aprender un sistema.',
    racional:
      'Cada función que agregás es una función que alguien tiene que cargar todos los días. Prioricé velocidad de carga sobre completitud.',
  },

  problemaTecnico: {
    titulo: 'Las cuentas corrientes no eran un CRUD.',
    cuerpo:
      'Un cliente puede deber plata y envases al mismo tiempo, pagar de a partes y devolver sifones en cualquier reparto. Por eso el estado de una cuenta no es un número guardado: es la suma de una historia de movimientos. El sistema lo modela como un libro de débitos y créditos donde los pagos se aplican contra la deuda y las correcciones se hacen con movimientos de reversa, no editando el pasado. Modelar eso bien fue lo que evitó que el sistema mintiera sobre quién debe qué.',
  },

  diagrama: {
    antes: ['Papel', 'Planilla', 'WhatsApp', 'Memoria', 'Caja (?)'],
    despues: ['Cliente', 'Venta', 'Cuenta corriente', 'Envases', 'Caja', 'Reporte'],
  },

  pantallas: [
    {
      decision: 'El reparto del día en una pantalla, no en tres planillas.',
      pendiente: { notaInterna: 'PENDIENTE: captura panel de reparto con ruta cargada. Doc 08 §Sodería 1.' },
    },
    {
      decision: 'Cargar una venta tarda menos que anotarla en papel.',
      pendiente: { notaInterna: 'PENDIENTE: captura POS a mitad de una venta a cuenta. Doc 08 §Sodería 2.' },
    },
    {
      decision: 'Deuda en plata y envases adeudados en la misma vista: una sola verdad por cliente.',
      pendiente: { notaInterna: 'PENDIENTE: captura ficha de cliente con cuenta corriente. Doc 08 §Sodería 3.' },
    },
    {
      decision: 'Cada envase prestado tiene dueño y ubicación. Nada se pierde por defecto.',
      pendiente: { notaInterna: 'PENDIENTE: captura tracking de dispensers. Doc 08 §Sodería 4 (o ledger, §4).' },
    },
    {
      decision: 'El cierre del día es un número que el sistema calcula, no que alguien recuerda.',
      pendiente: { notaInterna: 'PENDIENTE: captura cierre de caja / reporte diario. Doc 08 §Sodería 5.' },
    },
  ],

  // Sin métricas confirmadas todavía (doc 08 §Sodería 9-11): el bloque de
  // resultados queda vacío y por lo tanto no se renderiza. No inventar.
  resultados: [],

  // Testimonio: solo cuando exista el real (doc 08 §Sodería 8).

  aprendizajes: [
    'En operaciones físicas, el modelo de datos importa más que la UI: si los envases y la deuda no están bien modelados, ninguna pantalla los salva.',
    'La función más valiosa fue la más aburrida: que el cierre de caja diera siempre el mismo número.',
  ],
};
