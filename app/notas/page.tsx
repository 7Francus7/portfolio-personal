import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { notasVisibles, notasPublicadas } from '@/content/notas';
import { metadataRuta } from '@/lib/seo';
import { Kicker } from '@/components/ui';

export const metadata: Metadata = metadataRuta({
  titulo: 'Notas',
  descripcion:
    'Textos sobre software para operaciones reales: modelado de dominio, decisiones de alcance y lo que separa un sistema adoptado de uno abandonado.',
  ruta: '/notas',
});

/**
 * Índice de notas (FASE E).
 *
 * Si no hay ninguna nota publicada, la ruta devuelve 404 en lugar de mostrar
 * un índice vacío: una sección de escritura sin escritura resta credibilidad
 * en vez de sumarla. La arquitectura queda lista; el índice aparece con la
 * primera nota publicada.
 */
export default function NotasPage() {
  const visibles = notasVisibles();
  if (visibles.length === 0) notFound();

  const hayPublicadas = notasPublicadas().length > 0;

  return (
    <>
      <section className="container-editorial pt-16 pb-12 md:pt-24">
        <h1 className="max-w-4xl font-serif-display text-(length:--text-display) leading-[1.02]">
          Notas
        </h1>
        <p className="mt-6 max-w-(--container-prose) text-lg leading-relaxed text-ink-soft">
          Textos sobre construir software para operaciones que existen: modelado de dominio,
          decisiones de alcance y lo que separa un sistema que se usa de uno que se abandona.
        </p>
        {!hayPublicadas ? (
          <p className="label-mono mt-8 border border-dashed border-clay p-4 label-clay">
            Vista de borradores — no publicada. Habilitada por NEXT_PUBLIC_SHOW_DRAFTS.
          </p>
        ) : null}
      </section>

      <section aria-labelledby="listado" className="hairline-t">
        <div className="container-editorial py-14">
          <Kicker>Escritos</Kicker>
          <h2 id="listado" className="sr-only">
            Listado de notas
          </h2>
          <ul>
            {visibles.map((nota, i) => (
              <li key={nota.slug} className={i > 0 ? 'hairline-t' : undefined}>
                <Link href={`/notas/${nota.slug}`} className="group block py-9">
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="max-w-3xl font-serif-display text-2xl leading-snug group-hover:text-clay md:text-3xl">
                      {nota.titulo}
                    </span>
                    {nota.estado === 'borrador' ? (
                      <span className="label-mono label-clay">Borrador</span>
                    ) : null}
                  </span>
                  <span className="mt-3 block max-w-(--container-prose) leading-relaxed text-ink-mute">
                    {nota.resumen}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
