import Link from 'next/link';
import Image from 'next/image';
import type { CasoCompleto as CasoCompletoTipo } from '@/content/types';
import { casoSiguiente } from '@/content/cases';
import { EstadoBadge, Kicker, NotaInterna, TierBadge } from '@/components/ui';
import { EnlaceMedido } from '@/components/EnlaceMedido';
import { EVENTOS } from '@/lib/analitica';
import { Diagrama } from './Diagrama';

/**
 * Plantilla de caso completo — 12 bloques (doc 07 §1).
 * Los bloques sin material se ocultan; nunca se rellenan.
 */
export function CasoCompletoVista({ caso }: { caso: CasoCompletoTipo }) {
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
          <TierBadge tier={caso.tier} />
          <span className="label-mono">{caso.sector}</span>
        </div>
        <h1 className="max-w-4xl font-serif-display text-(length:--text-title) leading-[1.05]">
          {caso.titulo}
        </h1>
        {caso.verificablePor ? (
          <p className="mt-6 max-w-(--container-prose) border-l-2 border-clay pl-5 text-ink-soft">
            {caso.verificablePor}
          </p>
        ) : null}
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
              {caso.acceso.privado ? (
                <>
                  <span className="block">{caso.acceso.privado.motivo}</span>
                  <Link href="/contacto" className="tap-target link-editorial mt-2">
                    Pedir recorrido privado
                  </Link>
                </>
              ) : null}
              {caso.acceso.demo?.verificada ? (
                <a
                  href={caso.acceso.demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-target link-editorial"
                >
                  {caso.acceso.demo.etiqueta}
                </a>
              ) : null}
            </dd>
          </div>
        </dl>
      </header>

      {/* 1 — Contexto */}
      <section aria-labelledby="contexto" className="hairline-t">
        <div className="container-editorial grid gap-10 py-16 md:grid-cols-[1fr_2fr]">
          <h2 id="contexto" className="label-mono">
            Contexto
          </h2>
          <div className="max-w-(--container-prose) space-y-6">
            <p className="text-lg leading-relaxed text-ink-soft">{caso.contexto}</p>
            {caso.fotoCampo ? (
              <figure>
                <Image
                  src={caso.fotoCampo.src}
                  alt={caso.fotoCampo.alt}
                  width={caso.fotoCampo.ancho}
                  height={caso.fotoCampo.alto}
                  className="w-full border border-line"
                />
              </figure>
            ) : caso.fotoCampoPendiente ? (
              <NotaInterna pendiente={caso.fotoCampoPendiente} />
            ) : null}
          </div>
        </div>
      </section>

      {/* 2 — Problema operativo */}
      <section aria-labelledby="problema" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-16">
          <h2 id="problema" className="label-mono mb-4">
            El problema operativo
          </h2>
          <p className="mb-10 max-w-(--container-prose) font-serif-display text-(length:--text-heading) leading-snug">
            {caso.problema.intro}
          </p>
          <dl className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {caso.problema.dolores.map((d) => (
              <div key={d.dolor} className="bg-paper p-6">
                <dt className="font-medium text-ink">{d.dolor}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-mute">{d.costo}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 — Investigación */}
      <section aria-labelledby="investigacion" className="hairline-t">
        <div className="container-editorial grid gap-10 py-16 md:grid-cols-[1fr_2fr]">
          <h2 id="investigacion" className="label-mono">
            Cómo lo entendí
          </h2>
          <p className="max-w-(--container-prose) text-lg leading-relaxed text-ink-soft">
            {caso.investigacion}
          </p>
        </div>
      </section>

      {/* 4 — Decisión de alcance */}
      <section aria-labelledby="decision" className="hairline-t">
        <div className="container-editorial py-16">
          <h2 id="decision" className="label-mono mb-8">
            Qué decidí no construir
          </h2>
          <blockquote className="max-w-3xl border-l-2 border-clay pl-6 md:pl-10">
            <p className="font-serif-display text-(length:--text-heading) leading-snug">
              “{caso.decision.cita}”
            </p>
            {caso.decision.racional ? (
              <p className="mt-4 max-w-(--container-prose) text-ink-mute">{caso.decision.racional}</p>
            ) : null}
          </blockquote>
        </div>
      </section>

      {/* 5 — Problema técnico */}
      <section aria-labelledby="tecnico" className="hairline-t bg-paper-dim">
        <div className="container-editorial grid gap-10 py-16 md:grid-cols-[1fr_2fr]">
          <h2 id="tecnico" className="label-mono">
            El problema técnico más difícil
          </h2>
          <div className="max-w-(--container-prose)">
            <p className="font-serif-display text-(length:--text-heading) leading-snug">
              {caso.problemaTecnico.titulo}
            </p>
            <p className="mt-6 leading-relaxed text-ink-soft">{caso.problemaTecnico.cuerpo}</p>
          </div>
        </div>
      </section>

      {/* 6 — Diagrama antes → después */}
      <section aria-labelledby="diagrama" className="hairline-t">
        <div className="container-editorial py-16">
          <h2 id="diagrama" className="label-mono mb-10">
            La operación, antes y después
          </h2>
          <Diagrama antes={caso.diagrama.antes} despues={caso.diagrama.despues} />
        </div>
      </section>

      {/* 7 — Pantallas / decisiones de interfaz */}
      <section aria-labelledby="pantallas" className="hairline-t">
        <div className="container-editorial py-16">
          <h2 id="pantallas" className="label-mono mb-4">
            Decisiones de interfaz
          </h2>
          <p className="mb-10 max-w-(--container-prose) text-ink-mute">
            Cada pantalla del sistema responde a una decisión, no a una lista de funciones.
          </p>
          <ol className="grid gap-px border border-line bg-line md:grid-cols-2">
            {caso.pantallas.map((p, i) => (
              <li
                key={p.decision}
                className={`space-y-4 bg-paper p-6 md:p-8 ${
                  caso.pantallas.length % 2 === 1 && i === caso.pantallas.length - 1
                    ? 'md:col-span-2'
                    : ''
                }`}
              >
                <p className="label-mono">{String(i + 1).padStart(2, '0')}</p>
                {p.imagen ? (
                  <Image
                    src={p.imagen.src}
                    alt={p.imagen.alt}
                    width={p.imagen.ancho}
                    height={p.imagen.alto}
                    className="w-full border border-line"
                  />
                ) : null}
                <p className="font-serif-display text-xl leading-snug md:text-2xl">{p.decision}</p>
                {!p.imagen && p.pendiente ? <NotaInterna pendiente={p.pendiente} /> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9 — Resultados (solo verificados; vacío ⇒ no se renderiza) */}
      {caso.resultados.length > 0 ? (
        <section aria-labelledby="resultados" className="hairline-t">
          <div className="container-editorial py-16">
            <h2 id="resultados" className="label-mono mb-10">
              Resultados
            </h2>
            <dl className="grid gap-10 md:grid-cols-3">
              {caso.resultados.map((r) => (
                <div key={r.etiqueta}>
                  <dd className="font-serif-display text-5xl">{r.valor}</dd>
                  <dt className="label-mono mt-2">{r.etiqueta}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {/* 10 — Testimonio (solo real) */}
      {caso.testimonio ? (
        <section aria-labelledby="testimonio" className="hairline-t bg-paper-dim">
          <div className="container-editorial py-16">
            <h2 id="testimonio" className="label-mono mb-8">
              En palabras del cliente
            </h2>
            <blockquote className="max-w-3xl">
              <p className="font-serif-display text-(length:--text-heading) leading-snug">
                “{caso.testimonio.cita}”
              </p>
              <footer className="label-mono mt-4">
                {caso.testimonio.autor} — {caso.testimonio.origen}
              </footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      {/* 11 — Aprendizajes */}
      <section aria-labelledby="aprendizajes" className="hairline-t">
        <div className="container-editorial grid gap-10 py-16 md:grid-cols-[1fr_2fr]">
          <h2 id="aprendizajes" className="label-mono">
            Lo que aprendí
          </h2>
          <ul className="max-w-(--container-prose) space-y-5">
            {caso.aprendizajes.map((a) => (
              <li key={a} className="border-l border-line-strong pl-5 leading-relaxed text-ink-soft">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="caso-contacto" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-16 md:py-20">
          <Kicker>¿Una operación parecida?</Kicker>
          <h2
            id="caso-contacto"
            className="max-w-3xl font-serif-display text-(length:--text-title) leading-tight"
          >
            Mostrame dónde se pierde el control. Definimos qué conviene resolver primero.
          </h2>
          <p className="mt-8">
            <EnlaceMedido
              href="/contacto"
              evento={EVENTOS.ctaContacto}
              props={{ origen: `caso-${caso.slug}` }}
              className="inline-flex min-h-11 items-center border border-ink bg-ink px-6 text-sm font-medium text-paper hover:border-clay-deep hover:bg-clay-deep"
            >
              Contame tu operación
            </EnlaceMedido>
          </p>
        </div>
      </section>

      {/* 12 — Siguiente caso */}
      <section className="hairline-t">
        <div className="container-editorial py-16">
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
