import type { Metadata } from 'next';
import { contacto } from '@/content/site';
import { metadataRuta } from '@/lib/seo';

export const metadata: Metadata = metadataRuta({
  titulo: 'Contacto',
  descripcion:
    'Contame cómo funciona tu negocio hoy — papel, planillas, WhatsApp — y vemos qué sistema lo ordena. Email, WhatsApp y LinkedIn.',
  ruta: '/contacto',
  og: 'contacto',
});

// Sin formulario en V1 (doc 09): contacto directo por medios reales.
// Email profesional propio: pendiente de dominio definitivo (doc 10 §6);
// mientras tanto se centraliza en los medios confirmados del repositorio.
const medios = [
  { etiqueta: 'Email', valor: contacto.email, href: `mailto:${contacto.email}`, externo: false },
  { etiqueta: 'WhatsApp', valor: 'Escribime directo', href: contacto.whatsapp, externo: true },
  { etiqueta: 'LinkedIn', valor: 'franco-dellorsi', href: contacto.linkedin, externo: true },
  { etiqueta: 'GitHub', valor: '7Francus7', href: contacto.github, externo: true },
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
          alcanza para empezar. Leo y contesto yo.
        </p>
        <p className="mt-4 max-w-(--container-prose) leading-relaxed text-ink-mute">
          Si sos recruiter o parte de un equipo de producto, escribime por el medio que te quede más
          cómodo.
        </p>
      </section>

      <section aria-label="Medios de contacto" className="hairline-t">
        <div className="container-editorial py-4">
          <ul>
            {medios.map((m, i) => (
              <li key={m.etiqueta} className={i > 0 ? 'hairline-t' : undefined}>
                <a
                  href={m.href}
                  {...(m.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex flex-wrap items-baseline justify-between gap-4 py-8"
                >
                  <span className="font-serif-display text-3xl group-hover:text-clay md:text-4xl">
                    {m.etiqueta}
                  </span>
                  <span className="label-mono">
                    {m.valor} <span aria-hidden="true" className="nudge inline-block">→</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
