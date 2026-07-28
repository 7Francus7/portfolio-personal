import type { Metadata } from 'next';
import { tiersConCasos } from '@/content/cases';
import { coleccionSecundaria } from '@/content/projects';
import { metadataRuta } from '@/lib/seo';
import { Kicker } from '@/components/ui';
import { FilaCaso } from '@/components/FilaCaso';
import { ESTADO_LABEL, TIER_SECCION } from '@/content/types';

export const metadata: Metadata = metadataRuta({
  titulo: 'Proyectos',
  descripcion:
    'Sistemas de gestión y SaaS verticales organizados por nivel: trabajo comprobable, sistemas en evolución y exploraciones de producto.',
  ruta: '/proyectos',
  og: 'proyectos',
  alterna: { es: '/proyectos', en: '/en' },
});

/**
 * Índice de proyectos en tres niveles (decisión Franco, 2026-07-28).
 * El nivel gobierna el peso visual; el estado real sigue visible en cada fila
 * pero deja de ser el titular por acumulación.
 */
export default function ProyectosPage() {
  const grupos = tiersConCasos();

  return (
    <>
      <section className="container-editorial pt-16 pb-12 md:pt-24">
        <h1 className="max-w-4xl font-serif-display text-(length:--text-display) leading-[1.02]">
          Proyectos
        </h1>
        <p className="mt-6 max-w-(--container-prose) text-lg leading-relaxed text-ink-soft">
          Están ordenados por lo que cada uno puede probar hoy: primero lo verificable por
          cualquiera, después los sistemas en evolución, y al final las exploraciones donde lo que
          se muestra es criterio de producto. El estado de cada uno se dice sin maquillaje.
        </p>
      </section>

      {grupos.map(({ tier, casos: delTier }, i) => (
        <section
          key={tier}
          aria-labelledby={`tier-${tier}`}
          className={`hairline-t ${i % 2 === 1 ? 'bg-paper-dim' : ''}`}
        >
          <div className="container-editorial py-14">
            <Kicker>{TIER_SECCION[tier].titulo}</Kicker>
            <h2 id={`tier-${tier}`} className="sr-only">
              {TIER_SECCION[tier].titulo}
            </h2>
            <p className="mb-8 max-w-(--container-prose) text-ink-mute">
              {TIER_SECCION[tier].bajada}
            </p>
            <ul>
              {delTier.map((caso, j) => (
                <FilaCaso key={caso.slug} caso={caso} primera={j === 0} />
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section aria-labelledby="secundarios" className="hairline-t">
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
                  <a
                    href={p.url.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial"
                  >
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
