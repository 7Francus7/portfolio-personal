import Link from 'next/link';
import Image from 'next/image';
import { casos, casosPorSlug } from '@/content/cases';
import { coleccionSecundaria } from '@/content/projects';
import { comoTrabajo, contacto, site } from '@/content/site';
import { EstadoBadge, Kicker } from '@/components/ui';
import { ESTADO_LABEL, ROL_LABEL } from '@/content/types';

// ─────────────────────────────────────────────────────────────────────────────
// Home — orden congelado (doc 06 / brief Fase 3A):
// Hero (con prueba integrada) → Caso Sodería Nico → Proyectos seleccionados →
// Cómo trabajo → Sobre mí → Colección secundaria → Contacto.
// Todo Server Component. Sin JS cliente en esta página.
// ─────────────────────────────────────────────────────────────────────────────

const soderia = casosPorSlug['soderia-nico'];
const seleccionados = casos.filter((c) => c.slug !== 'soderia-nico');

export default function HomePage() {
  return (
    <>
      {/* 2 — Hero con prueba integrada */}
      <section aria-labelledby="hero-titulo" className="container-editorial pt-20 pb-16 md:pt-32 md:pb-24">
        {site.disponible ? (
          <p className="label-mono mb-8 flex items-center gap-2">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-clay" />
            Disponible · {site.rol} · Argentina
          </p>
        ) : (
          <p className="label-mono mb-8">{site.rol} · Argentina</p>
        )}

        <h1
          id="hero-titulo"
          className="max-w-5xl font-serif-display text-(length:--text-display) leading-[1.02]"
        >
          Convierto operaciones reales en <em className="text-clay">software claro</em>.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">{site.subtitulo}</p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/proyectos"
            className="border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-clay-deep hover:border-clay-deep"
          >
            Ver proyectos
          </Link>
          <Link href="/contacto" className="link-editorial text-sm">
            Contame tu operación →
          </Link>
        </div>

        {/* Prueba integrada: solo hechos respaldados por la documentación */}
        <ul className="hairline-t mt-14 flex max-w-3xl flex-col gap-2 pt-6 md:flex-row md:gap-8">
          <li className="label-mono">Sodería Nico — sistema en uso real diario</li>
          <li className="label-mono">Trackium — gestión integral de transporte</li>
          <li className="label-mono">CourtOps — reservas para clubes de pádel</li>
        </ul>
      </section>

      {/* 3 — Caso destacado profundo: Sodería Nico */}
      <section aria-labelledby="caso-destacado" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-16 md:py-24">
          <Kicker>Caso destacado · Sistema en uso real</Kicker>
          <h2
            id="caso-destacado"
            className="max-w-3xl font-serif-display text-(length:--text-title) leading-[1.05]"
          >
            {soderia.titulo}
          </h2>
          <p className="mt-6 max-w-(--container-prose) text-lg leading-relaxed text-ink-soft">
            Una sodería con rutas de reparto diarias, clientes con cuenta corriente y envases que
            salen y vuelven todos los días. Toda la operación vivía en papel.
          </p>

          {soderia.tipo === 'completo' ? (
            <dl className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
              {soderia.problema.dolores.map((d) => (
                <div key={d.dolor} className="bg-paper p-6">
                  <dt className="font-medium">{d.dolor}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-mute">{d.costo}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <p className="mt-10">
            <Link
              href="/casos/soderia-nico"
              className="border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper inline-block"
            >
              Leer el caso completo →
            </Link>
          </p>
        </div>
      </section>

      {/* 4 — Proyectos seleccionados: filas editoriales, no tarjetas idénticas */}
      <section aria-labelledby="seleccionados" className="hairline-t">
        <div className="container-editorial py-16 md:py-24">
          <Kicker>Proyectos seleccionados</Kicker>
          <h2 id="seleccionados" className="sr-only">
            Proyectos seleccionados
          </h2>
          <ul>
            {seleccionados.map((caso, i) => (
              <li key={caso.slug} className={i > 0 ? 'hairline-t' : undefined}>
                <Link
                  href={`/casos/${caso.slug}`}
                  className="group grid gap-4 py-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_auto] md:items-baseline md:gap-10"
                >
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="font-serif-display text-3xl leading-tight group-hover:text-clay md:text-4xl">
                      {caso.nombre}
                    </span>
                    <EstadoBadge estado={caso.estado} />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-mute">{caso.resumen}</span>
                  <span className="label-mono md:justify-self-end">
                    {ROL_LABEL[caso.rolPortfolio]}{' '}
                    <span aria-hidden="true" className="nudge inline-block">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — Cómo trabajo */}
      <section aria-labelledby="como-trabajo" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-16 md:py-24">
          <Kicker>Cómo trabajo</Kicker>
          <h2
            id="como-trabajo"
            className="max-w-3xl font-serif-display text-(length:--text-title) leading-[1.05]"
          >
            El código llega último, <em className="text-clay">a propósito</em>.
          </h2>
          <ol className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {comoTrabajo.map((etapa, i) => (
              <li key={etapa.paso} className="grid grid-cols-[auto_1fr] gap-5">
                <span aria-hidden="true" className="label-mono pt-1.5 !text-clay">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif-display text-2xl">{etapa.paso}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-mute">{etapa.detalle}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 — Sobre mí (breve) */}
      <section aria-labelledby="sobre-mi" className="hairline-t">
        <div className="container-editorial grid items-center gap-12 py-16 md:grid-cols-[2fr_1fr] md:py-24">
          <div>
            <Kicker>Sobre mí</Kicker>
            <h2 id="sobre-mi" className="max-w-2xl font-serif-display text-(length:--text-title) leading-[1.05]">
              Entiendo cómo funciona un negocio antes de escribir código.
            </h2>
            <p className="mt-6 max-w-(--container-prose) leading-relaxed text-ink-soft">
              Soy Franco, de Argentina. Trabajo el recorrido completo de un producto: investigo la
              operación en el terreno, defino qué se construye, diseño la experiencia y desarrollo el
              sistema — frontend, backend y datos — hasta que alguien lo usa todos los días.
            </p>
            <p className="mt-8">
              <Link href="/sobre-mi" className="link-editorial text-sm">
                Más sobre mí →
              </Link>
            </p>
          </div>
          <figure className="max-w-xs justify-self-start md:justify-self-end">
            <Image
              src="/images/profile.jpg"
              alt="Franco Dell’Orsi"
              width={640}
              height={800}
              className="w-full border border-line object-cover"
            />
            <figcaption className="label-mono mt-3">Franco Dell’Orsi — AR</figcaption>
          </figure>
        </div>
      </section>

      {/* 7 — Colección secundaria */}
      {coleccionSecundaria.length > 0 ? (
        <section aria-labelledby="tambien" className="hairline-t">
          <div className="container-editorial py-14">
            <Kicker>También construí</Kicker>
            <h2 id="tambien" className="sr-only">
              Otros proyectos
            </h2>
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
            <p className="mt-6">
              <Link href="/proyectos" className="link-editorial text-sm">
                Ver todos los proyectos →
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      {/* 8 — Contacto */}
      <section aria-labelledby="contacto" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-16 md:py-24">
          <Kicker>Contacto</Kicker>
          <h2
            id="contacto"
            className="max-w-3xl font-serif-display text-(length:--text-title) leading-[1.05]"
          >
            ¿Tu negocio todavía depende de papel, planillas o WhatsApp?
          </h2>
          <p className="mt-6 max-w-(--container-prose) text-lg leading-relaxed text-ink-soft">
            Contame cómo funciona hoy — cómo vendés, cómo cobrás, dónde anotás — y vemos juntos qué
            sistema lo ordena. Si buscás a alguien de producto y full-stack para tu equipo, también
            podemos hablar.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={`mailto:${contacto.email}`}
              className="border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-clay-deep hover:border-clay-deep"
            >
              Contame cómo funciona
            </a>
            <a
              href={contacto.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="link-editorial text-sm"
            >
              Escribir por WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
