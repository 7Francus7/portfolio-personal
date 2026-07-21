import type { EstadoProducto, MaterialPendiente } from '@/content/types';
import { ESTADO_LABEL } from '@/content/types';

/** Badge de estado honesto. `uso-real` es el único con acento. */
export function EstadoBadge({ estado }: { estado: EstadoProducto }) {
  const esUsoReal = estado === 'uso-real';
  return (
    <span
      className={`label-mono inline-block border px-2 py-1 ${
        esUsoReal ? 'border-clay !text-clay' : 'border-line-strong'
      }`}
    >
      {ESTADO_LABEL[estado]}
    </span>
  );
}

/**
 * Marcador de material pendiente. SOLO visible en desarrollo: en cualquier
 * build de producción (incluida una preview) no renderiza nada.
 */
export function NotaInterna({ pendiente }: { pendiente: MaterialPendiente }) {
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <p className="label-mono border border-dashed border-clay p-3 !text-clay">
      [interno] {pendiente.notaInterna}
    </p>
  );
}

/** Kicker de sección: etiqueta mono con hairline. */
export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="label-mono mb-6">/ {children}</p>;
}
