import type { Nota } from './tipos';

/**
 * BORRADOR — no se publica.
 *
 * Es la nota más ensayística de las tres y la que menos depende de datos de
 * campo. Lo que la bloquea es que su tesis se apoya en el contraste "sistema
 * adoptado vs. no adoptado", y ese contraste necesita al menos un dato real
 * de adopción para no ser una opinión bien escrita y nada más.
 */
export const softwareParaOperaciones: Nota = {
  slug: 'software-para-operaciones-reales',
  titulo: 'Qué aprendí construyendo software para operaciones reales y no para portfolios',
  resumen:
    'Un sistema que se usa todos los días se parece poco a uno que se ve bien en una captura. Las diferencias no son estéticas.',
  estado: 'borrador',

  bloques: [
    {
      tipo: 'contexto',
      titulo: 'Dos públicos que premian cosas distintas',
      cuerpo: [
        'Un proyecto de portfolio se juzga en treinta segundos, sin usarlo, casi siempre en una pantalla grande y con buena conexión.',
        'Un sistema operativo se juzga a los tres meses, por alguien apurado, en un teléfono, muchas veces con una mano ocupada. Optimizar para el primero produce software que falla en el segundo.',
      ],
    },
    {
      tipo: 'aprendizaje',
      titulo: 'La pantalla más importante es la más fea',
      cuerpo: [
        'En casi toda operación hay una pantalla que se usa cincuenta veces por día y otras diez que se usan una vez por mes. La tentación de portfolio es diseñar el dashboard; la necesidad real es que cargar una venta tarde menos que anotarla en papel.',
        'Si el sistema es más lento que el papel en el momento de máxima presión, no se adopta. No importa lo demás.',
      ],
    },
    {
      tipo: 'aprendizaje',
      titulo: 'Decidir qué no construir es la mitad del trabajo',
      cuerpo: [
        'Cada función que se agrega es una función que alguien tiene que completar. En un producto con miles de usuarios, una función poco usada es ruido; en una operación de tres personas, es una tarea diaria que alguien va a resentir hasta abandonarla.',
        'El alcance chico no es una limitación de recursos: es una decisión de producto que hace la diferencia entre un sistema usado y uno abandonado.',
      ],
    },
    {
      tipo: 'aprendizaje',
      titulo: 'El contexto de uso es un requisito, no un detalle',
      cuerpo: [
        'Al sol, con una mano, apurado, con señal intermitente y a veces con guantes. Eso define el tamaño de los botones, la cantidad de campos por pantalla, qué pasa cuando se corta la conexión y cuántos pasos tiene una operación frecuente.',
        'Ninguna de esas decisiones se ve en una captura. Todas deciden si el sistema sobrevive.',
      ],
    },
    {
      tipo: 'aprendizaje',
      titulo: 'Producción es el principio, no el final',
      cuerpo: [
        'En un proyecto de portfolio, el deploy es la línea de llegada. En una operación real es donde empieza a aprenderse: dónde se traba la carga, qué campo nadie completa, qué reporte se pide y no existe.',
        'Ese período es la fuente de información más valiosa del proyecto, y es exactamente el que un portfolio nunca muestra.',
      ],
    },
    {
      tipo: 'decision-tecnica',
      titulo: 'Cómo cambia esto la forma de trabajar',
      cuerpo: [
        'Relevamiento en el lugar antes que por videollamada. Modelado de datos antes que pantallas. Alcance recortado a propósito. Y una definición de terminado que incluye "alguien lo usa todos los días", no "está deployado".',
      ],
    },
  ],

  metricasPendientes: [
    {
      dato: 'Al menos un dato de adopción real que sostenga el contraste central del texto',
      origen: 'Sodería Nico — dueño / sistema',
      bloqueaPublicacion: true,
    },
    {
      dato: 'Un ejemplo concreto de función construida y luego retirada por falta de uso',
      origen: 'Revisión del historial del repositorio por Franco',
      bloqueaPublicacion: false,
    },
  ],
};
