import type { Nota } from './tipos';

/**
 * BORRADOR — no se publica.
 *
 * Esta es la nota más cercana a publicable: casi todo su contenido es
 * decisión técnica verificable en el repositorio, no dato de campo. Lo que la
 * bloquea es confirmar la terminología exacta del modelo antes de afirmarla
 * (ver docs/implementation/fase-3b-afirmaciones-verificadas.md: "ledger
 * inmutable" y "FIFO" figuran como NO confirmados y por eso no se usan acá).
 */
export const cuentasComoMovimientos: Nota = {
  slug: 'cuentas-corrientes-como-movimientos-auditables',
  titulo: 'Por qué modelé cuentas corrientes y envases como movimientos auditables',
  resumen:
    'Un cliente puede deber plata y envases al mismo tiempo, pagar de a partes y devolver sifones en cualquier reparto. Guardar un saldo no alcanza: hay que guardar la historia.',
  estado: 'borrador',
  caso: 'soderia-nico',

  bloques: [
    {
      tipo: 'contexto',
      titulo: 'Dos deudas simultáneas y de distinta naturaleza',
      cuerpo: [
        'En una sodería, un mismo cliente puede deber dinero y envases al mismo tiempo. Son deudas distintas: una se salda con plata, la otra con objetos que vuelven físicamente.',
        'Y ninguna se comporta como una transacción cerrada: se paga de a partes, se devuelven tres sifones de cinco, y todo eso ocurre en repartos distintos.',
      ],
    },
    {
      tipo: 'decision-tecnica',
      titulo: 'El saldo no es un campo, es un resultado',
      cuerpo: [
        'La tentación es guardar `saldo` en la ficha del cliente y actualizarlo con cada operación. Es más simple de escribir y más rápido de leer.',
        'También es la forma más segura de que el sistema mienta. Cualquier error de concurrencia, cualquier operación a medias, cualquier corrección manual deja el número desincronizado de los hechos, y nadie se entera hasta que un cliente reclama.',
        'Por eso el estado de una cuenta es la suma de una historia de movimientos: débitos cuando se vende, créditos cuando se paga. El saldo se calcula, no se almacena como verdad.',
      ],
    },
    {
      tipo: 'decision-tecnica',
      titulo: 'Las correcciones se hacen hacia adelante',
      cuerpo: [
        'Cuando algo se carga mal, la corrección no edita el pasado: se registra un movimiento de reversa que lo compensa.',
        'Cuesta más de construir y es más confuso de explicar la primera vez. A cambio, la historia de la cuenta siempre reconstruye el saldo actual, y una discusión con un cliente se resuelve mirando movimientos en vez de confiando en la palabra de alguien.',
      ],
    },
    {
      tipo: 'decision-tecnica',
      titulo: 'Los envases siguen la misma lógica',
      cuerpo: [
        'Un envase prestado es una deuda con la misma forma que una deuda de dinero: sale, puede volver parcialmente y necesita saber de quién es.',
        'Modelarlo como movimientos —y no como un contador por cliente— es lo que permite responder "¿dónde están mis dispensers?" en lugar de "el cliente debe tres".',
      ],
    },
    {
      tipo: 'hecho-verificado',
      titulo: 'Así está implementado',
      cuerpo: [
        'El sistema modela las cuentas corrientes como un libro de débitos y créditos donde los pagos se aplican contra la deuda, y las correcciones se hacen con movimientos de reversa en lugar de editar registros anteriores.',
      ],
      fuente: 'content/cases/soderia-nico.ts, bloque `problemaTecnico`.',
    },
    {
      tipo: 'aprendizaje',
      titulo: 'Un sistema que miente es peor que el papel',
      cuerpo: [
        'En papel, todos saben que puede haber un error y lo verifican. Un sistema proyecta autoridad: si muestra un número, se le cree.',
        'Esa confianza es prestada, y se pierde entera la primera vez que el número está mal. Modelar bien no es rigor académico: es lo que evita que el sistema gaste la confianza que necesita para ser adoptado.',
      ],
    },
  ],

  metricasPendientes: [
    {
      dato: 'Confirmar si el modelo admite el término "ledger inmutable" o si hay operaciones que editan registros',
      origen: 'Revisión del repositorio Soderia-Nico por Franco',
      bloqueaPublicacion: true,
    },
    {
      dato: 'Confirmar el criterio real de imputación de pagos parciales (FIFO u otro)',
      origen: 'Revisión del repositorio por Franco',
      bloqueaPublicacion: true,
    },
    {
      dato: 'Ejemplo concreto y anonimizado de una discrepancia resuelta mirando movimientos',
      origen: 'Dueño de la sodería',
      bloqueaPublicacion: false,
    },
  ],
};
