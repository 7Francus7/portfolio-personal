import type { Metadata } from 'next';
import { agenda, contacto, primerPaso } from '@/content/site';
import { metadataRuta } from '@/lib/seo';
import { Kicker } from '@/components/ui';
import { FormularioContacto } from '@/components/FormularioContacto';
import { EnlaceMedido } from '@/components/EnlaceMedido';
import { EVENTOS } from '@/lib/analitica';

export const metadata: Metadata = metadataRuta({
  titulo: 'Contacto',
  descripcion:
    'Contame cómo funciona tu negocio hoy — papel, planillas, WhatsApp — y vemos qué sistema lo ordena. Formulario, email, WhatsApp y LinkedIn.',
  ruta: '/contacto',
  og: 'contacto',
  alterna: { es: '/contacto', en: '/en' },
});

const medios = [
  {
    etiqueta: 'Email',
    valor: contacto.email,
    href: `mailto:${contacto.email}`,
    externo: false,
    medio: 'email',
  },
  {
    etiqueta: 'WhatsApp',
    valor: 'Escribime directo',
    href: contacto.whatsapp,
    externo: true,
    medio: 'whatsapp',
  },
  {
    etiqueta: 'LinkedIn',
    valor: 'franco-dellorsi',
    href: contacto.linkedin,
    externo: true,
    medio: 'linkedin',
  },
  {
    etiqueta: 'GitHub',
    valor: '7Francus7',
    href: contacto.github,
    externo: true,
    medio: 'github',
  },
] as const;

export default function ContactoPage() {
  return (
    <>
      <section className="container-editorial pt-16 pb-14 md:pt-24">
        <h1 className="max-w-4xl font-serif-display text-(length:--text-display) leading-[1.02]">
          ¿Tu negocio todavía depende de papel, planillas o WhatsApp?
        </h1>
        <p className="mt-8 max-w-(--container-prose) text-lg leading-relaxed text-ink-soft">
          Contame cómo funciona hoy: cómo vendés, cómo cobrás, dónde anotás, qué se pierde. Con eso
          alcanza para empezar. La primera conversación dura 30 minutos y la tenés directamente
          conmigo.
        </p>
      </section>

      {/* El formulario va primero: es el destino de todos los CTA del sitio.
          Antes había que bajar hasta un mailto, que en desktop es un callejón
          sin salida para quien no tiene cliente de correo configurado. */}
      <section aria-labelledby="formulario" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-14 md:py-20">
          <Kicker>Escribime</Kicker>
          <h2
            id="formulario"
            className="mb-10 max-w-3xl font-serif-display text-(length:--text-title) leading-[1.05]"
          >
            Contame qué necesitás ordenar.
          </h2>
          <FormularioContacto />
        </div>
      </section>

      <section aria-labelledby="primer-paso" className="hairline-t">
        <div className="container-editorial py-14 md:py-20">
          <Kicker>Cómo empezamos</Kicker>
          <h2
            id="primer-paso"
            className="max-w-3xl font-serif-display text-(length:--text-title) leading-[1.05]"
          >
            Una charla concreta, sin venderte software antes de entender el problema.
          </h2>
          <ol className="mt-10 max-w-4xl">
            {primerPaso.map((item, i) => (
              <li
                key={item.paso}
                className={`grid gap-3 py-7 md:grid-cols-[auto_1fr_2fr] md:gap-8 ${i > 0 ? 'hairline-t' : ''}`}
              >
                <span aria-hidden="true" className="label-mono pt-1 label-clay">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif-display text-2xl">{item.paso}</h3>
                <p className="leading-relaxed text-ink-mute">{item.detalle}</p>
              </li>
            ))}
          </ol>

          {/* Agenda: se muestra solo si hay URL real configurada. Un botón
              "Agendar" que no lleva a ningún lado cuesta más que no tenerlo. */}
          {agenda ? (
            <p className="mt-10">
              <EnlaceMedido
                href={agenda.url}
                externo
                evento={EVENTOS.ctaContacto}
                props={{ origen: 'agenda' }}
                className="inline-flex min-h-11 items-center border border-ink bg-ink px-6 text-sm font-medium text-paper hover:border-clay-deep hover:bg-clay-deep"
              >
                {agenda.etiqueta}
              </EnlaceMedido>
            </p>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="medios" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-14">
          <Kicker>O por donde prefieras</Kicker>
          <h2 id="medios" className="sr-only">
            Medios de contacto directo
          </h2>
          <ul>
            {medios.map((m, i) => (
              <li key={m.etiqueta} className={i > 0 ? 'hairline-t' : undefined}>
                <EnlaceMedido
                  href={m.href}
                  externo={m.externo}
                  evento={EVENTOS.contactoDirecto}
                  props={{ medio: m.medio }}
                  className="group flex flex-wrap items-baseline justify-between gap-4 py-8"
                >
                  <span className="font-serif-display text-3xl group-hover:text-clay md:text-4xl">
                    {m.etiqueta}
                  </span>
                  <span className="label-mono">
                    {m.valor}{' '}
                    <span aria-hidden="true" className="nudge inline-block">
                      →
                    </span>
                  </span>
                </EnlaceMedido>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="recruiters" className="hairline-t">
        <div className="container-editorial py-14">
          <h2 id="recruiters" className="label-mono mb-4">
            ¿Reclutás para un equipo?
          </h2>
          <p className="max-w-(--container-prose) leading-relaxed text-ink-soft">
            Hay una página en inglés con disponibilidad, zona horaria, stack y trabajo
            seleccionado:{' '}
            <EnlaceMedido
              href="/en"
              evento={EVENTOS.ctaRecruiter}
              props={{ origen: 'contacto' }}
              className="link-editorial"
              lang="en"
            >
              Hiring / working together
            </EnlaceMedido>
            .
          </p>
        </div>
      </section>
    </>
  );
}
