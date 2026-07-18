// ─────────────────────────────────────────────────────────────────────────────
// Tipos del sistema de contenido curado.
// Fuente de verdad editorial: docs/strategy/ (Fase 2, rama strategy/portfolio-phase-2).
// Regla madre: nada se muestra si no está respaldado; los campos opcionales
// ocultan su bloque, nunca se rellenan con placeholders que aparenten producto.
// ─────────────────────────────────────────────────────────────────────────────

/** Estado honesto del producto. Gobierna badges y lenguaje permitido. */
export type EstadoProducto =
  | 'uso-real' // sistema usado a diario en una operación real
  | 'en-desarrollo' // producto en construcción; prohibido lenguaje de consolidado
  | 'mvp' // funcional pero sin uso real comprobado
  | 'trabajo-cliente' // entregado a un cliente
  | 'experimento';

export const ESTADO_LABEL: Record<EstadoProducto, string> = {
  'uso-real': 'En uso real',
  'en-desarrollo': 'En desarrollo',
  mvp: 'MVP funcional',
  'trabajo-cliente': 'Trabajo para cliente',
  experimento: 'Experimento',
};

/**
 * Acceso externo a un producto. Una demo solo se enlaza si `verificada` es
 * true (URL comprobada viva). Un proyecto privado nunca muestra botón de
 * "abrir": muestra su motivo como texto.
 */
export interface Acceso {
  demo?: { url: string; etiqueta: string; verificada: boolean };
  repo?: { url: string };
  privado?: { motivo: string };
}

export interface Imagen {
  src: string;
  alt: string;
  ancho: number;
  alto: number;
}

/**
 * Material que todavía no existe. Se registra en el contenido para que el
 * componente que lo espera pueda mostrar un estado editorial digno.
 * `notaInterna` solo se renderiza en desarrollo (nunca en preview/producción).
 */
export interface MaterialPendiente {
  notaInterna: string;
}

/** Papel estratégico del proyecto dentro del portfolio (doc 04). */
export type RolPortfolio =
  | 'evidencia-real'
  | 'escala'
  | 'vision'
  | 'saas-vertical'
  | 'diseno';

export const ROL_LABEL: Record<RolPortfolio, string> = {
  'evidencia-real': 'Evidencia real',
  escala: 'Sistemas a escala',
  vision: 'Visión de producto',
  'saas-vertical': 'SaaS vertical',
  diseno: 'Diseño de información',
};

export type CasoSlug = 'soderia-nico' | 'trackium' | 'zentro' | 'courtops' | 'doleth';

/** Datos comunes a todo caso (completo o reducido). */
export interface CasoBase {
  slug: CasoSlug;
  nombre: string;
  /** Titular del caso formulado como resultado, no como descripción. */
  titulo: string;
  sector: string;
  rol: string;
  estado: EstadoProducto;
  rolPortfolio: RolPortfolio;
  acceso: Acceso;
  stack: string[];
  /** Resumen honesto: alimenta meta description y tarjetas. */
  resumen: string;
}

export interface DolorConCosto {
  dolor: string;
  costo: string;
}

/** Caso completo — plantilla de 12 bloques (doc 07 §1). */
export interface CasoCompleto extends CasoBase {
  tipo: 'completo';
  contexto: string;
  fotoCampo?: Imagen;
  fotoCampoPendiente?: MaterialPendiente;
  problema: { intro: string; dolores: DolorConCosto[] };
  investigacion: string;
  decision: { cita: string; racional?: string };
  problemaTecnico: { titulo: string; cuerpo: string };
  diagrama: { antes: string[]; despues: string[] };
  /**
   * Decisiones de interfaz. Si `imagen` falta, el bloque se renderiza como
   * pieza tipográfica (la decisión ES el contenido) — nunca caja gris.
   */
  pantallas: { decision: string; imagen?: Imagen; pendiente?: MaterialPendiente }[];
  /** Solo afirmaciones verificadas. Vacío ⇒ el bloque no se renderiza. */
  resultados: { valor: string; etiqueta: string; verificado: true }[];
  testimonio?: { cita: string; autor: string; origen: string };
  aprendizajes: string[];
}

/** Caso reducido — valor real sin inventar (doc 07 §2). */
export interface CasoReducido extends CasoBase {
  tipo: 'reducido';
  problema: string;
  /** Lo que existe hoy. Verbos en presente solo para lo hecho. */
  construido: string[];
  /** Lo declarado como pendiente o en construcción. */
  enConstruccion?: string[];
  decision: { titulo: string; cuerpo: string };
  /** Estado y próximo paso, en una frase honesta. */
  situacion: string;
  imagenes?: Imagen[];
}

export type Caso = CasoCompleto | CasoReducido;

/** Proyecto de la colección secundaria: una línea, sin ruta propia (doc 05 §2). */
export interface ProyectoSecundario {
  nombre: string;
  descripcion: string;
  estado: EstadoProducto;
  url?: { href: string; etiqueta: string };
}
