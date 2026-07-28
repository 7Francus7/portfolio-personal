import type { EstadoProducto, MaterialPendiente, Tier } from '@/content/types';
import { ESTADO_LABEL, TIER_LABEL } from '@/content/types';

/**
 * Badge de estado honesto.
 *
 * `enfasis` gobierna el peso visual, no el contenido: el estado real siempre
 * se dice. En listados con varios proyectos va en modo `quieto`, porque cuatro
 * badges "En desarrollo" apilados se convertían en el titular de la página y
 * comunicaban algo que ninguna ficha individual afirma. En la página del caso,
 * donde no compite con nada, va en modo `pleno`.
 */
export function EstadoBadge({
  estado,
  enfasis = 'pleno',
}: {
  estado: EstadoProducto;
  enfasis?: 'pleno' | 'quieto';
}) {
  const esUsoReal = estado === 'uso-real';

  if (enfasis === 'quieto') {
    return (
      <span className={`label-mono ${esUsoReal ? 'label-clay' : ''}`}>{ESTADO_LABEL[estado]}</span>
    );
  }

  return (
    <span
      className={`label-mono inline-block border px-2 py-1 ${
        esUsoReal ? 'border-clay label-clay' : 'border-line-strong'
      }`}
    >
      {ESTADO_LABEL[estado]}
    </span>
  );
}

/** Etiqueta de nivel del proyecto dentro del portfolio. */
export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className={`label-mono ${tier === 'principal' ? 'label-clay' : ''}`}>
      {TIER_LABEL[tier]}
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
    <p className="label-mono border border-dashed border-clay p-3 label-clay">
      [interno] {pendiente.notaInterna}
    </p>
  );
}

/** Kicker de sección: etiqueta mono con hairline. */
export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="label-mono mb-6">/ {children}</p>;
}
