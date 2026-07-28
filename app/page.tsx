import Link from 'next/link';
import Image from 'next/image';
import { casos, casosPorSlug } from '@/content/cases';
import { coleccionSecundaria } from '@/content/projects';
import { comoTrabajo, contacto, oferta, site } from '@/content/site';
import { Kicker } from '@/components/ui';
import { FilaCaso } from '@/components/FilaCaso';
import { EnlaceMedido } from '@/components/EnlaceMedido';
import { EVENTOS } from '@/lib/analitica';
import { ESTADO_LABEL } from '@/content/types';

// ─────────────────────────────────────────────────────────────────────────────
// Home — orden congelado (doc 06 / brief Fase 3A):
// Hero (con prueba integrada) → Caso Sodería Nico → Proyectos seleccionados →
// Cómo trabajo → Sobre mí → Colección secundaria → Contacto.
// Todo Server Component. Sin JS cliente en esta página.
// ─────────────────────────────────────────────────────────────────────────────

const soderia = casosPorSlug['soderia-nico'];
/**
 * La home muestra el otro caso principal y los sistemas en evolución.
 * Las exploraciones (Zentro, Doleth) viven en /proyectos: acá compiten con
 * la evidencia y bajan el promedio de lo que se ve en los primeros scrolls.
 */
const seleccionados = casos.filter(
  (c) => c.slug !== 'soderia-nico' && (c.tier === 'principal' || c.tier === 'evolucion'),
);

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
          <EnlaceMedido
            href="/contacto"
            evento={EVENTOS.ctaContacto}
            props={{ origen: 'hero' }}
            className="inline-flex min-h-11 items-center border border-ink bg-ink px-6 text-sm font-medium text-paper hover:border-clay-deep hover:bg-clay-deep"
          >
            Contame tu operación
          </EnlaceMedido>
          <Link href="/casos/soderia-nico" className="tap-target link-editorial text-sm">
            Ver caso en uso real →
          </Link>
        </div>

        {/* Prueba integrada: solo hechos respaldados por la documentación.
            Se prioriza lo verificable por un desconocido. ELEEME salió de acá
            —es una migración de catálogo— y quedó en la colección secundaria:
            la prueba de arriba tiene que ser la más fuerte, no la más disponible. */}
        <ul className="hairline-t mt-14 flex max-w-3xl flex-col gap-2 pt-6 md:flex-row md:gap-8">
          <li className="label-mono">Sodería Nico — en uso diario</li>
          <li className="label-mono">CourtOps — demo pública</li>
          <li className="label-mono">Trackium — sistema en evolución</li>
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
              <FilaCaso key={caso.slug} caso={caso} primera={i === 0} />
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/proyectos" className="tap-target link-editorial text-sm">
              Ver todos los proyectos, por nivel →
            </Link>
          </p>
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
                <span aria-hidden="true" className="label-mono pt-1.5 label-clay">
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

      <section aria-labelledby="oferta" className="hairline-t">
        <div className="container-editorial py-16 md:py-24">
          <Kicker>Qué podés contratar</Kicker>
          <h2
            id="oferta"
            className="max-w-3xl font-serif-display text-(length:--text-title) leading-[1.05]"
          >
            Del problema operativo a un sistema que se pueda usar.
          </h2>
          <ol className="mt-12 max-w-4xl">
            {oferta.map((servicio, i) => (
              <li
                key={servicio.nombre}
                className={`grid gap-3 py-7 md:grid-cols-[auto_1fr_2fr] md:gap-8 ${i > 0 ? 'hairline-t' : ''}`}
              >
                <span aria-hidden="true" className="label-mono pt-1 label-clay">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif-display text-2xl">{servicio.nombre}</h3>
                <p className="leading-relaxed text-ink-mute">{servicio.detalle}</p>
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
            La primera conversación dura 30 minutos. Me contás cómo vendés, cobrás y administrás
            hoy; separamos el cuello de botella de las funciones que pueden esperar y definimos un
            próximo paso concreto.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <EnlaceMedido
              href="/contacto"
              evento={EVENTOS.ctaContacto}
              props={{ origen: 'home-cierre' }}
              className="inline-flex min-h-11 items-center border border-ink bg-ink px-6 text-sm font-medium text-paper hover:border-clay-deep hover:bg-clay-deep"
            >
              Contame cómo funciona
            </EnlaceMedido>
            <EnlaceMedido
              href={contacto.whatsapp}
              externo
              evento={EVENTOS.contactoDirecto}
              props={{ medio: 'whatsapp' }}
              className="tap-target link-editorial text-sm"
            >
              Escribir por WhatsApp →
            </EnlaceMedido>
          </div>
        </div>
      </section>
    </>
  );
}
