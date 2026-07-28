import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNota, notasVisibles } from '@/content/notas';
import { BLOQUE_LABEL, esPublicable } from '@/content/notas/tipos';
import { metadataRuta } from '@/lib/seo';
import { Kicker } from '@/components/ui';

export const dynamicParams = false;

export function generateStaticParams() {
  return notasVisibles().map((n) => ({ slug: n.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const nota = getNota(slug);
  if (!nota) return {};
  return metadataRuta({
    titulo: nota.titulo,
    descripcion: nota.resumen,
    ruta: `/notas/${nota.slug}`,
  });
}

/**
 * Nota individual.
 *
 * Cada bloque declara su naturaleza —hecho verificado, decisión técnica,
 * contexto o aprendizaje— y se renderiza con esa etiqueta a la vista. No es
 * decoración: es lo que le permite al lector saber qué está leyendo, y lo que
 * impide que una opinión bien escrita pase por dato.
 *
 * Las métricas pendientes se muestran como lo que son —lo que falta relevar—
 * y nunca en el lugar de un resultado.
 */
export default async function NotaPage({ params }: Props) {
  const { slug } = await params;
  const nota = getNota(slug);
  if (!nota) notFound();

  const bloqueantes = nota.metricasPendientes.filter((m) => m.bloqueaPublicacion);

  return (
    <article>
      <header className="container-editorial pt-16 pb-12 md:pt-24">
        <nav aria-label="Ruta" className="label-mono mb-8">
          <Link href="/notas" className="link-editorial">
            Notas
          </Link>{' '}
          / {nota.titulo}
        </nav>

        {nota.estado === 'borrador' ? (
          <p className="label-mono mb-6 inline-block border border-dashed border-clay px-3 py-2 label-clay">
            Borrador · no publicado
          </p>
        ) : null}

        <h1 className="max-w-4xl font-serif-display text-(length:--text-title) leading-[1.05]">
          {nota.titulo}
        </h1>
        <p className="mt-6 max-w-(--container-prose) text-lg leading-relaxed text-ink-soft">
          {nota.resumen}
        </p>
        {nota.fecha && nota.estado === 'publicada' ? (
          <p className="label-mono mt-6">
            <time dateTime={nota.fecha}>{nota.fecha}</time>
          </p>
        ) : null}
      </header>

      {nota.bloques.map((bloque, i) => (
        <section
          key={`${bloque.tipo}-${i}`}
          aria-labelledby={`bloque-${i}`}
          className={`hairline-t ${i % 2 === 1 ? 'bg-paper-dim' : ''}`}
        >
          <div className="container-editorial grid gap-10 py-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="label-mono label-clay">{BLOQUE_LABEL[bloque.tipo]}</p>
              <h2 id={`bloque-${i}`} className="mt-3 font-serif-display text-2xl leading-snug">
                {bloque.titulo}
              </h2>
            </div>
            <div className="max-w-(--container-prose)">
              {bloque.cuerpo.map((parrafo) => (
                <p key={parrafo} className="mb-4 leading-relaxed text-ink-soft last:mb-0">
                  {parrafo}
                </p>
              ))}
              {bloque.fuente ? (
                <p className="label-mono mt-5 border-l border-line-strong pl-4">
                  Se comprueba en: {bloque.fuente}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {nota.metricasPendientes.length > 0 ? (
        <section aria-labelledby="pendientes" className="hairline-t">
          <div className="container-editorial py-14">
            <Kicker>Lo que todavía no puedo afirmar</Kicker>
            <h2
              id="pendientes"
              className="max-w-3xl font-serif-display text-(length:--text-heading) leading-snug"
            >
              Estos datos no están relevados, así que no figuran como resultados.
            </h2>
            <ul className="mt-8 max-w-4xl">
              {nota.metricasPendientes.map((m, i) => (
                <li
                  key={m.dato}
                  className={`grid gap-2 py-4 md:grid-cols-[2fr_1fr_auto] md:gap-8 ${
                    i > 0 ? 'hairline-t' : ''
                  }`}
                >
                  <span className="text-ink-soft">{m.dato}</span>
                  <span className="label-mono">{m.origen}</span>
                  {m.bloqueaPublicacion ? (
                    <span className="label-mono label-clay md:justify-self-end">
                      Bloquea publicación
                    </span>
                  ) : (
                    <span className="label-mono md:justify-self-end">Deseable</span>
                  )}
                </li>
              ))}
            </ul>
            {bloqueantes.length > 0 ? (
              <p className="mt-8 max-w-(--container-prose) text-sm text-ink-mute">
                {esPublicable(nota)
                  ? 'Esta nota puede publicarse.'
                  : `Faltan ${bloqueantes.length} dato(s) que bloquean la publicación.`}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {nota.caso ? (
        <section className="hairline-t bg-paper-dim">
          <div className="container-editorial py-14">
            <Kicker>Caso relacionado</Kicker>
            <Link href={`/casos/${nota.caso}`} className="group block max-w-3xl">
              <p className="font-serif-display text-(length:--text-title) leading-tight group-hover:text-clay">
                Ver el caso{' '}
                <span aria-hidden="true" className="nudge inline-block">
                  →
                </span>
              </p>
            </Link>
          </div>
        </section>
      ) : null}
    </article>
  );
}
