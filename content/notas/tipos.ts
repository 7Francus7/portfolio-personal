// ─────────────────────────────────────────────────────────────────────────────
// Arquitectura editorial de /notas (FASE E).
//
// Regla madre, heredada del régimen de contenido de los casos: una nota no se
// publica mientras contenga afirmaciones sin respaldo. Por eso el tipo obliga
// a clasificar cada bloque en una de cinco categorías, y las métricas
// pendientes son un campo aparte que NUNCA se renderiza como resultado.
//
// `estado: 'borrador'` excluye la nota del build, del índice y del sitemap.
// Publicar es un acto deliberado: cambiar el estado a 'publicada' después de
// que los datos pendientes estén relevados.
// ─────────────────────────────────────────────────────────────────────────────

export type EstadoNota = 'borrador' | 'publicada';

/**
 * Tipo de bloque. La distinción no es decorativa: gobierna cómo se renderiza
 * y qué lenguaje se permite dentro.
 */
export type TipoBloque =
  /** Comprobable hoy: en el repositorio, en el sistema o por observación. */
  | 'hecho-verificado'
  /** Una decisión tomada y su razón. Es opinión fundada, no dato. */
  | 'decision-tecnica'
  /** Contexto narrativo: cómo era la operación, quién trabaja ahí. */
  | 'contexto'
  /** Conclusión personal. Se afirma en primera persona, sin generalizar. */
  | 'aprendizaje';

export const BLOQUE_LABEL: Record<TipoBloque, string> = {
  'hecho-verificado': 'Hecho verificado',
  'decision-tecnica': 'Decisión técnica',
  contexto: 'Contexto',
  aprendizaje: 'Aprendizaje',
};

export interface Bloque {
  tipo: TipoBloque;
  /** Título del bloque. Corto, afirmativo. */
  titulo: string;
  /** Uno o más párrafos. */
  cuerpo: string[];
  /**
   * Solo para 'hecho-verificado': dónde se comprueba.
   * Sin fuente, el bloque no puede declararse verificado.
   */
  fuente?: string;
}

/**
 * Dato que la nota necesita y todavía no fue relevado.
 *
 * Se lista aparte y se renderiza —cuando la nota se publique— como una
 * declaración honesta de lo que falta, jamás como un resultado. Mientras haya
 * pendientes marcados `bloqueaPublicacion`, la nota no puede publicarse.
 */
export interface MetricaPendiente {
  dato: string;
  /** Quién o qué lo provee. */
  origen: string;
  /** Si es true, la nota no se publica hasta tenerlo. */
  bloqueaPublicacion: boolean;
}

export interface Nota {
  slug: string;
  titulo: string;
  /** Bajada de una o dos frases. Alimenta el índice y la meta description. */
  resumen: string;
  estado: EstadoNota;
  /** ISO. Solo se muestra en notas publicadas. */
  fecha?: string;
  /** Caso relacionado, si lo hay. */
  caso?: string;
  bloques: Bloque[];
  metricasPendientes: MetricaPendiente[];
}

/** Una nota es publicable solo si nada pendiente la bloquea. */
export function esPublicable(nota: Nota): boolean {
  return !nota.metricasPendientes.some((m) => m.bloqueaPublicacion);
}
