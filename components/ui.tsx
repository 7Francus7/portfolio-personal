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
 * Marcador editorial opt-in. No aparece en una revisión local salvo que se
 * habilite explícitamente con NEXT_PUBLIC_SHOW_INTERNAL_NOTES=true.
 */
export function NotaInterna({ pendiente }: { pendiente: MaterialPendiente }) {
  if (process.env.NEXT_PUBLIC_SHOW_INTERNAL_NOTES !== 'true') return null;
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
