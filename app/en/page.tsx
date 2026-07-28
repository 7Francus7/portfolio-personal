import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { en } from '@/content/en';
import { contacto, perfilProfesional, site } from '@/content/site';
import { metadataRuta } from '@/lib/seo';
import { EnlaceMedido } from '@/components/EnlaceMedido';
import { EVENTOS } from '@/lib/analitica';

export const metadata: Metadata = metadataRuta({
  titulo: en.meta.titulo,
  descripcion: en.meta.descripcion,
  ruta: '/en',
  idioma: 'en',
  alterna: { es: '/', en: '/en' },
});

/**
 * Superficie profesional en inglés (FASE D).
 *
 * No es una traducción de la home: es el otro recorrido. Responde en orden
 * las ocho preguntas de un proceso remoto y prioriza prueba antes que
 * disponibilidad.
 *
 * Nota de accesibilidad: el `lang="en"` va en el contenedor porque el root
 * layout declara `lang="es"` para todo el sitio. Es válido y los lectores de
 * pantalla lo respetan para la pronunciación. Cuando el sitio sea bilingüe
 * completo, esto pasa a root layouts separados por route group.
 */
export default function EnglishPage() {
  const cvDisponible = perfilProfesional.cvPdf !== null;

  return (
    <div lang="en">
      {/* ── Hero: posición, prueba y disponibilidad de un vistazo ─────────── */}
      <section
        aria-labelledby="en-title"
        className="container-editorial pt-20 pb-16 md:pt-28 md:pb-20"
      >
        <p className="label-mono mb-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          {perfilProfesional.disponible ? (
            <>
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-clay" />
              <span>Available for remote work</span>
              <span aria-hidden="true">·</span>
            </>
          ) : null}
          <span>{perfilProfesional.ubicacion}</span>
          <span aria-hidden="true">·</span>
          <span>{perfilProfesional.zonaHoraria}</span>
          <span aria-hidden="true">·</span>
          <span>{en.rol}</span>
        </p>

        <h1
          id="en-title"
          className="max-w-5xl font-serif-display text-(length:--text-display) leading-[1.02]"
        >
          {en.titulo}
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">{en.intro}</p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#selected-work"
            className="inline-flex min-h-11 items-center border border-ink bg-ink px-6 text-sm font-medium text-paper hover:border-clay-deep hover:bg-clay-deep"
          >
            {en.cta.trabajo}
          </a>
          <EnlaceMedido
            href={`mailto:${contacto.email}`}
            evento={EVENTOS.ctaRecruiter}
            props={{ origen: 'en-hero' }}
            className="tap-target link-editorial text-sm"
          >
            {en.cta.contacto} →
          </EnlaceMedido>
        </div>
      </section>

      {/* ── Las ocho preguntas ────────────────────────────────────────────── */}
      <section aria-labelledby="en-faq" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-16 md:py-20">
          <p className="label-mono mb-6">/ What you probably want to know</p>
          <h2 id="en-faq" className="sr-only">
            Frequently asked by recruiters
          </h2>
          <dl className="max-w-4xl">
            {en.preguntas.map((q, i) => (
              <div
                key={q.pregunta}
                className={`grid gap-3 py-7 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10 ${
                  i > 0 ? 'hairline-t' : ''
                }`}
              >
                <dt className="font-serif-display text-2xl leading-snug">{q.pregunta}</dt>
                <dd className="leading-relaxed text-ink-soft">{q.respuesta}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Trabajo seleccionado ──────────────────────────────────────────── */}
      <section aria-labelledby="selected-work-title" className="hairline-t">
        <div id="selected-work" className="container-editorial py-16 md:py-20">
          <p className="label-mono mb-6">/ Selected work</p>
          <h2 id="selected-work-title" className="sr-only">
            Selected work
          </h2>
          <ul>
            {en.trabajo.map((t, i) => (
              <li key={t.slug} className={i > 0 ? 'hairline-t' : undefined}>
                <Link
                  href={`/casos/${t.slug}`}
                  className="group grid gap-4 py-9 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10"
                >
                  <div>
                    <span className="font-serif-display text-3xl leading-tight group-hover:text-clay">
                      {t.nombre}
                    </span>
                    <p className="label-mono mt-3">{t.estado}</p>
                  </div>
                  <div className="leading-relaxed text-ink-soft">
                    <p>{t.resumen}</p>
                    <p className="mt-3 border-l-2 border-clay pl-4 text-sm text-ink-mute">
                      <span className="label-mono">Hard part · </span>
                      {t.complejidad}
                    </p>
                    <p className="label-mono mt-4">
                      Read the case study{' '}
                      <span aria-hidden="true" className="nudge inline-block">
                        →
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-mute">
            Case studies are written in Spanish — they were built for the businesses that use
            them. The summaries above cover the decisions that matter.
          </p>
        </div>
      </section>

      {/* ── Stack escaneable ──────────────────────────────────────────────── */}
      <section aria-labelledby="en-stack" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-16">
          <p className="label-mono mb-6">/ Stack</p>
          <h2 id="en-stack" className="sr-only">
            Stack
          </h2>
          <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {en.stack.map((g) => (
              <div key={g.grupo}>
                <dt className="label-mono label-clay">{g.grupo}</dt>
                <dd className="mt-3 leading-relaxed text-ink-soft">{g.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-(--container-prose) text-sm text-ink-mute">
            Everything listed here is used in the projects above. No badges for tools tried once.
          </p>
        </div>
      </section>

      {/* ── Capacidades ───────────────────────────────────────────────────── */}
      <section aria-labelledby="en-capabilities" className="hairline-t">
        <div className="container-editorial py-16">
          <p className="label-mono mb-6">/ How I work</p>
          <h2 id="en-capabilities" className="sr-only">
            Capabilities
          </h2>
          <ul className="grid gap-x-12 gap-y-10 md:grid-cols-3">
            {en.capacidades.map((c) => (
              <li key={c.titulo}>
                <h3 className="font-serif-display text-2xl leading-snug">{c.titulo}</h3>
                <p className="mt-3 leading-relaxed text-ink-mute">{c.cuerpo}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Disponibilidad y contacto ─────────────────────────────────────── */}
      <section aria-labelledby="en-availability" className="hairline-t bg-paper-dim">
        <div className="container-editorial grid items-start gap-12 py-16 md:grid-cols-[2fr_1fr] md:py-20">
          <div>
            <p className="label-mono mb-6">/ Availability</p>
            <h2
              id="en-availability"
              className="max-w-2xl font-serif-display text-(length:--text-title) leading-[1.05]"
            >
              Remote, UTC-3, and easy to overlap with.
            </h2>

            <dl className="mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
              <div>
                <dt className="label-mono">Location</dt>
                <dd className="mt-1 text-ink-soft">{perfilProfesional.ubicacion}</dd>
              </div>
              <div>
                <dt className="label-mono">Timezone</dt>
                <dd className="mt-1 text-ink-soft">{perfilProfesional.zonaHoraria}</dd>
              </div>
              <div>
                <dt className="label-mono">Setup</dt>
                <dd className="mt-1 text-ink-soft">{perfilProfesional.modalidad}</dd>
              </div>
              <div>
                <dt className="label-mono">Status</dt>
                <dd className="mt-1 text-ink-soft">
                  {perfilProfesional.disponible ? 'Open to roles and contract work' : 'Not available'}
                </dd>
              </div>
            </dl>

            <ul className="mt-10 max-w-2xl">
              {perfilProfesional.solapamiento.map((s, i) => (
                <li
                  key={s.zona}
                  className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3 text-sm ${
                    i > 0 ? 'hairline-t' : ''
                  }`}
                >
                  <span className="font-medium">{s.zona}</span>
                  <span className="text-ink-mute">{s.detalle}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <EnlaceMedido
                href={`mailto:${contacto.email}`}
                evento={EVENTOS.ctaRecruiter}
                props={{ origen: 'en-availability' }}
                className="inline-flex min-h-11 items-center border border-ink bg-ink px-6 text-sm font-medium text-paper hover:border-clay-deep hover:bg-clay-deep"
              >
                {en.cta.contacto}
              </EnlaceMedido>

              {/* Descarga de CV: bloqueada de forma explícita mientras no exista
                  el archivo. No se muestra un botón que descarga nada. */}
              {cvDisponible ? (
                <EnlaceMedido
                  href={perfilProfesional.cvPdf!}
                  evento={EVENTOS.cvDescarga}
                  props={{ estado: 'disponible' }}
                  className="tap-target link-editorial text-sm"
                >
                  {en.cta.cv} (PDF)
                </EnlaceMedido>
              ) : (
                <p className="text-sm text-ink-mute">
                  Résumé PDF isn’t published yet —{' '}
                  <EnlaceMedido
                    href={`mailto:${contacto.email}?subject=R%C3%A9sum%C3%A9%20request`}
                    evento={EVENTOS.cvDescarga}
                    props={{ estado: 'bloqueado' }}
                    className="link-editorial"
                  >
                    ask me for it
                  </EnlaceMedido>{' '}
                  and I’ll send it over.
                </p>
              )}
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <li>
                <a
                  href={contacto.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={contacto.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/" lang="es" hrefLang="es" className="link-editorial">
                  Versión en español
                </Link>
              </li>
            </ul>
          </div>

          <figure className="max-w-xs justify-self-start md:justify-self-end">
            <Image
              src="/images/profile.jpg"
              alt="Franco Dell’Orsi"
              width={640}
              height={800}
              sizes="(min-width: 768px) 20rem, 60vw"
              className="w-full border border-line object-cover"
            />
            <figcaption className="label-mono mt-3">
              {site.nombre} — {perfilProfesional.ubicacion}
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
