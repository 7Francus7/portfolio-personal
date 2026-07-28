import Link from 'next/link';
import type { Caso } from '@/content/types';
import { ROL_LABEL } from '@/content/types';
import { EstadoBadge } from '@/components/ui';

/**
 * Fila de proyecto en superficies de listado.
 *
 * El peso visual lo fija el tier, no el estado: el `principal` recibe título
 * grande y su prueba de verificabilidad; los demás bajan de escala. El estado
 * real sigue presente en todos, pero en modo quieto para que no se convierta
 * en el titular por acumulación.
 */
export function FilaCaso({ caso, primera }: { caso: Caso; primera: boolean }) {
  const esPrincipal = caso.tier === 'principal';

  return (
    <li className={primera ? undefined : 'hairline-t'}>
      <Link
        href={`/casos/${caso.slug}`}
        className={`group grid gap-3 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_auto] md:gap-10 ${
          esPrincipal ? 'py-10' : 'py-7'
        }`}
      >
        <div>
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span
              className={`font-serif-display leading-tight group-hover:text-clay ${
                esPrincipal ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
              }`}
            >
              {caso.nombre}
            </span>
            <EstadoBadge estado={caso.estado} enfasis={esPrincipal ? 'pleno' : 'quieto'} />
          </span>
          <p className="label-mono mt-3">
            {ROL_LABEL[caso.rolPortfolio]} · {caso.sector}
          </p>
        </div>

        <div className="text-sm leading-relaxed text-ink-mute">
          <p>{caso.resumen}</p>
          {caso.verificablePor ? (
            <p className="mt-2 text-ink-soft">{caso.verificablePor}</p>
          ) : null}
        </div>

        <p className="label-mono md:justify-self-end md:self-center">
          {caso.acceso.demo?.verificada
            ? 'Demo + caso'
            : caso.tipo === 'completo'
              ? 'Caso completo'
              : 'Ver decisiones'}{' '}
          <span aria-hidden="true" className="nudge inline-block">
            →
          </span>
        </p>
      </Link>
    </li>
  );
}
