import type { Nota } from './tipos';

/**
 * BORRADOR — no se publica.
 *
 * Bloqueado por métricas de campo que todavía no fueron relevadas
 * (ver docs/strategy/checklist-campo-soderia.md). Todo lo que está acá es
 * comprobable en el repositorio o en la documentación de Fase 2/3B; lo que
 * falta está declarado en `metricasPendientes` y NO se escribió como si
 * existiera.
 */
export const soderiaPapelASoftware: Nota = {
  slug: 'soderia-de-papel-a-software',
  titulo: 'Cómo transformé el reparto de una sodería desde papel a software',
  resumen:
    'Una operación de reparto de agua y soda que vivía en papel, memoria y anotaciones sueltas. Qué se relevó, qué se decidió no construir y qué cambió cuando el sistema empezó a usarse.',
  estado: 'borrador',
  caso: 'soderia-nico',

  bloques: [
    {
      tipo: 'contexto',
      titulo: 'Una operación física, no un software de escritorio',
      cuerpo: [
        'Una sodería de reparto reparte agua y soda con rutas diarias, clientes fijos con cuenta corriente y envases —sifones y dispensers— que salen y vuelven todos los días.',
        'Nada de eso es abstracto: son objetos que se mueven, se rompen y se pierden, y plata que se cobra en la puerta. El sistema que la ordene tiene que modelar el mundo físico, no un catálogo.',
      ],
    },
    {
      tipo: 'contexto',
      titulo: 'Dónde se perdía el control',
      cuerpo: [
        'Tres puntos concretos, y los tres costaban plata real: envases prestados sin rastro, morosidad invisible en clientes recurrentes, y un cierre de caja que dependía de la memoria y de planillas sueltas.',
        'Ninguno era un problema de software. Eran problemas de registro que el software podía resolver si —y solo si— se modelaban bien.',
      ],
    },
    {
      tipo: 'decision-tecnica',
      titulo: 'Mapear el día completo antes de listar funciones',
      cuerpo: [
        'El sistema no salió de un listado de features. Salió de recorrer el día de la operación: cómo se arma una ruta, dónde se anota una venta, cómo vuelve un envase y en qué momento exacto se pierde el control.',
        'Recién con ese mapa se decidió qué construir. La diferencia práctica es que las funciones que sobreviven a ese ejercicio son las que alguien va a cargar todos los días.',
      ],
    },
    {
      tipo: 'decision-tecnica',
      titulo: 'No construir un ERP',
      cuerpo: [
        'La sodería necesitaba cerrar el día rápido, no aprender un sistema. Cada función que se agrega es una función que alguien tiene que completar en cada reparto.',
        'Se priorizó velocidad de carga sobre completitud: menos módulos, menos campos por pantalla, y ningún flujo que exigiera volver a la computadora del local.',
      ],
    },
    {
      tipo: 'hecho-verificado',
      titulo: 'Qué se construyó',
      cuerpo: [
        'Gestión de rutas de reparto, ventas de contado y a cuenta, cuentas corrientes por cliente, seguimiento de envases prestados, cierres de caja y operación mobile pensada para usarse desde la calle.',
      ],
      fuente:
        'content/cases/soderia-nico.ts y el repositorio github.com/7Francus7/Soderia-Nico.',
    },
    {
      tipo: 'hecho-verificado',
      titulo: 'El sistema está en uso diario',
      cuerpo: [
        'La sodería opera con él. Es privado: no hay demo pública, y por eso el caso se muestra por sus decisiones y no por una URL que cualquiera pueda abrir.',
      ],
      fuente: 'Estado declarado `uso-real` en el contenido del caso, confirmado por Franco.',
    },
    {
      tipo: 'aprendizaje',
      titulo: 'El modelo de datos importa más que la interfaz',
      cuerpo: [
        'En operaciones físicas, si los envases y la deuda no están bien modelados, ninguna pantalla los salva. La UI puede maquillar un flujo confuso; no puede maquillar un saldo que miente.',
      ],
    },
    {
      tipo: 'aprendizaje',
      titulo: 'La función más valiosa fue la más aburrida',
      cuerpo: [
        'Que el cierre de caja diera siempre el mismo número. No es demostrable en una demo ni luce en un portfolio, y es lo que hizo que el sistema se adoptara.',
      ],
    },
  ],

  metricasPendientes: [
    {
      dato: 'Mes y año en que el sistema empezó a usarse',
      origen: 'Dueño de la sodería',
      bloqueaPublicacion: true,
    },
    {
      dato: 'Cantidad aproximada de clientes con cuenta corriente',
      origen: 'Dueño / consulta al sistema',
      bloqueaPublicacion: true,
    },
    {
      dato: 'Repartos por día o por semana',
      origen: 'Dueño / consulta al sistema',
      bloqueaPublicacion: true,
    },
    {
      dato: 'Tiempo del cierre de caja antes y después',
      origen: 'Dueño (estimación declarada como tal)',
      bloqueaPublicacion: true,
    },
    {
      dato: 'Envases recuperados desde que hay seguimiento',
      origen: 'Consulta al sistema',
      bloqueaPublicacion: false,
    },
    {
      dato: 'Qué tareas siguen siendo manuales',
      origen: 'Observación en el local',
      bloqueaPublicacion: false,
    },
    {
      dato: 'Autorización escrita para nombrar el negocio y publicar testimonio',
      origen: 'Dueño',
      bloqueaPublicacion: true,
    },
  ],
};
