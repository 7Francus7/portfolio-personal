import type { Metadata } from 'next';
import Link from 'next/link';
import { casos } from '@/content/cases';
import { coleccionSecundaria } from '@/content/projects';
import { metadataRuta } from '@/lib/seo';
import { EstadoBadge, Kicker } from '@/components/ui';
import { ESTADO_LABEL, ROL_LABEL } from '@/content/types';

export const metadata: Metadata = metadataRuta({
  titulo: 'Proyectos',
  descripcion:
    'Sistemas de gestión, SaaS verticales y productos en desarrollo: Sodería Nico, Trackium, Zentro, CourtOps y Doleth, más la colección secundaria.',
  ruta: '/proyectos',
  og: 'proyectos',
});

/**
 * Índice de proyectos. No repite la home: acá se explicita el papel de cada
 * proyecto, su estado y la profundidad disponible (caso completo vs reducido).
 */
export default function ProyectosPage() {
  return (
    <>
      <section className="container-editorial pt-16 pb-12 md:pt-24">
        <h1 className="max-w-4xl font-serif-display text-(length:--text-display) leading-[1.02]">
          Proyectos
        </h1>
        <p className="mt-6 max-w-(--container-prose) text-lg leading-relaxed text-ink-soft">
          Cada proyecto cumple un papel distinto: evidencia de uso real, escala técnica, visión de
          producto, vertical con experiencia pública o diseño de información. El estado de cada uno
          se dice sin maquillaje.
        </p>
      </section>

      <section aria-labelledby="destacados" className="hairline-t">
        <div className="container-editorial py-14">
          <Kicker>Proyectos con caso</Kicker>
          <h2 id="destacados" className="sr-only">
            Proyectos con caso
          </h2>
          <ul>
            {casos.map((caso, i) => (
              <li key={caso.slug} className={i > 0 ? 'hairline-t' : undefined}>
                <Link
                  href={`/casos/${caso.slug}`}
                  className="group grid gap-3 py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_auto] md:gap-10"
                >
                  <div>
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <span className="font-serif-display text-3xl leading-tight group-hover:text-clay md:text-4xl">
                        {caso.nombre}
                      </span>
                      <EstadoBadge estado={caso.estado} />
                    </span>
                    <p className="label-mono mt-3">
                      {ROL_LABEL[caso.rolPortfolio]} · {caso.sector}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-mute">{caso.resumen}</p>
                  <p className="label-mono md:justify-self-end md:self-center">
                    {caso.tipo === 'completo' ? 'Caso completo' : 'Caso reducido'}{' '}
                    <span aria-hidden="true" className="nudge inline-block">→</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="secundarios" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-14">
          <Kicker>Colección secundaria</Kicker>
          <h2 id="secundarios" className="sr-only">
            Colección secundaria
          </h2>
          <p className="mb-8 max-w-(--container-prose) text-sm text-ink-mute">
            Trabajos y productos menores, sin caso propio. Se listan solo los que tienen material
            real detrás.
          </p>
          <ul className="max-w-3xl">
            {coleccionSecundaria.map((p, i) => (
              <li
                key={p.nombre}
                className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 py-4 text-sm ${i > 0 ? 'hairline-t' : ''}`}
              >
                <span className="font-medium">{p.nombre}</span>
                <span className="label-mono">{ESTADO_LABEL[p.estado]}</span>
                <span className="text-ink-mute">{p.descripcion}</span>
                {p.url ? (
                  <a href={p.url.href} target="_blank" rel="noopener noreferrer" className="link-editorial">
                    {p.url.etiqueta}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
