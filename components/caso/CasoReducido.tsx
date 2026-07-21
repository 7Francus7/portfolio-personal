import Link from 'next/link';
import Image from 'next/image';
import type { CasoReducido as CasoReducidoTipo } from '@/content/types';
import { casoSiguiente } from '@/content/cases';
import { EstadoBadge, Kicker } from '@/components/ui';

/**
 * Plantilla de caso reducido (doc 07 §2): scroll corto, cero relleno.
 * Sin resultados, sin testimonios, sin diagramas decorativos.
 */
export function CasoReducidoVista({ caso }: { caso: CasoReducidoTipo }) {
  const siguiente = casoSiguiente(caso.slug);

  return (
    <article>
      {/* 0 — Hero del caso */}
      <header className="container-editorial pt-16 pb-14 md:pt-24">
        <nav aria-label="Ruta" className="label-mono mb-8">
          <Link href="/proyectos" className="link-editorial">
            Proyectos
          </Link>{' '}
          / {caso.nombre}
        </nav>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <EstadoBadge estado={caso.estado} />
          <span className="label-mono">{caso.sector}</span>
        </div>
        <h1 className="max-w-4xl font-serif-display text-(length:--text-title) leading-[1.05]">
          {caso.titulo}
        </h1>
        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 text-sm md:grid-cols-3">
          <div>
            <dt className="label-mono">Rol</dt>
            <dd className="mt-1 text-ink-soft">{caso.rol}</dd>
          </div>
          <div>
            <dt className="label-mono">Stack</dt>
            <dd className="mt-1 text-ink-soft">{caso.stack.join(' · ')}</dd>
          </div>
          <div>
            <dt className="label-mono">Acceso</dt>
            <dd className="mt-1 text-ink-soft">
              {caso.acceso.privado ? caso.acceso.privado.motivo : null}
              {caso.acceso.demo?.verificada ? (
                <a
                  href={caso.acceso.demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial"
                >
                  {caso.acceso.demo.etiqueta}
                </a>
              ) : null}
            </dd>
          </div>
        </dl>
      </header>

      {/* 1 — El problema */}
      <section aria-labelledby="problema" className="hairline-t">
        <div className="container-editorial grid gap-10 py-14 md:grid-cols-[1fr_2fr]">
          <h2 id="problema" className="label-mono">
            El problema
          </h2>
          <p className="max-w-(--container-prose) text-lg leading-relaxed text-ink-soft">
            {caso.problema}
          </p>
        </div>
      </section>

      {/* 2 — Qué existe hoy */}
      <section aria-labelledby="construido" className="hairline-t bg-paper-dim">
        <div className="container-editorial grid gap-10 py-14 md:grid-cols-[1fr_2fr]">
          <h2 id="construido" className="label-mono">
            Qué está construido
          </h2>
          <div className="max-w-(--container-prose)">
            <ul className="space-y-3">
              {caso.construido.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className="mt-0.5 text-clay">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            {caso.enConstruccion && caso.enConstruccion.length > 0 ? (
              <>
                <h3 className="label-mono mt-10 mb-4">En construcción</h3>
                <ul className="space-y-3">
                  {caso.enConstruccion.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-ink-mute">
                      <span aria-hidden="true" className="mt-0.5">
                        …
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* 3 — Una decisión */}
      <section aria-labelledby="decision" className="hairline-t">
        <div className="container-editorial py-14">
          <h2 id="decision" className="label-mono mb-8">
            Una decisión de producto
          </h2>
          <div className="max-w-3xl border-l-2 border-clay pl-6 md:pl-10">
            <p className="font-serif-display text-(length:--text-heading) leading-snug">
              {caso.decision.titulo}
            </p>
            <p className="mt-4 max-w-(--container-prose) leading-relaxed text-ink-soft">
              {caso.decision.cuerpo}
            </p>
          </div>
        </div>
      </section>

      {/* 4 — Material visual (solo si existe) */}
      {caso.imagenes && caso.imagenes.length > 0 ? (
        <section aria-labelledby="imagenes" className="hairline-t">
          <div className="container-editorial py-14">
            <h2 id="imagenes" className="label-mono mb-8">
              El producto
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {caso.imagenes.map((img) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  width={img.ancho}
                  height={img.alto}
                  className="w-full border border-line"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 5 — Situación actual */}
      <section aria-labelledby="situacion" className="hairline-t bg-paper-dim">
        <div className="container-editorial grid gap-10 py-14 md:grid-cols-[1fr_2fr]">
          <h2 id="situacion" className="label-mono">
            Situación actual
          </h2>
          <p className="max-w-(--container-prose) leading-relaxed text-ink-soft">{caso.situacion}</p>
        </div>
      </section>

      {/* 6 — Siguiente caso */}
      <section className="hairline-t">
        <div className="container-editorial py-14">
          <Kicker>Siguiente caso</Kicker>
          <Link href={`/casos/${siguiente.slug}`} className="group block max-w-3xl">
            <p className="font-serif-display text-(length:--text-title) leading-tight group-hover:text-clay">
              {siguiente.nombre}{' '}
              <span aria-hidden="true" className="nudge inline-block">→</span>
            </p>
            <p className="mt-2 text-ink-mute">{siguiente.titulo}</p>
          </Link>
          <p className="mt-8">
            <Link href="/proyectos" className="link-editorial text-sm">
              Todos los proyectos
            </Link>
          </p>
        </div>
      </section>
    </article>
  );
}
