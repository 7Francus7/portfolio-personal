import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { comoTrabajo, contacto, site } from '@/content/site';
import { metadataRuta } from '@/lib/seo';
import { Kicker } from '@/components/ui';

export const metadata: Metadata = metadataRuta({
  titulo: 'Sobre mí',
  descripcion:
    'Franco Dell’Orsi, desarrollador de producto y full-stack de Argentina. Trabajo el recorrido completo: de la operación real al sistema en producción.',
  ruta: '/sobre-mi',
  og: 'sobre-mi',
});

export default function SobreMiPage() {
  return (
    <>
      <section className="container-editorial grid items-start gap-12 pt-16 pb-14 md:grid-cols-[3fr_2fr] md:pt-24">
        <div>
          <h1 className="max-w-3xl font-serif-display text-(length:--text-display) leading-[1.02]">
            Sobre mí
          </h1>
          <div className="mt-8 max-w-(--container-prose) space-y-6 text-lg leading-relaxed text-ink-soft">
            <p>
              Soy Franco Dell’Orsi, desarrollador de producto y full-stack de Argentina. Una parte
              importante de mi trabajo nace en negocios que todavía funcionan con papel, planillas,
              WhatsApp y memoria: soderías, transportes, clubes, comercios.
            </p>
            <p>
              Lo que más me interesa no es el código en sí, sino el momento anterior: entender cómo
              trabaja un negocio de verdad — cómo vende, cómo cobra, dónde pierde el control — y
              decidir qué sistema merece existir. Después sí: diseño la experiencia, modelo los
              datos y construyo el producto completo hasta producción.
            </p>
          </div>
        </div>
        <figure className="max-w-sm md:justify-self-end">
          <Image
            src="/images/profile.jpg"
            alt="Franco Dell’Orsi"
            width={640}
            height={800}
            priority
            className="w-full border border-line object-cover"
          />
          <figcaption className="label-mono mt-3">{site.ubicacion}</figcaption>
        </figure>
      </section>

      <section aria-labelledby="forma-trabajo" className="hairline-t">
        <div className="container-editorial py-14">
          <Kicker>Cómo trabajo</Kicker>
          <h2 id="forma-trabajo" className="sr-only">
            Cómo trabajo
          </h2>
          <ol className="grid gap-x-14 gap-y-10 md:grid-cols-2">
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

      <section aria-labelledby="experiencia" className="hairline-t bg-paper-dim">
        <div className="container-editorial grid gap-10 py-14 md:grid-cols-[1fr_2fr]">
          <h2 id="experiencia" className="label-mono">
            Construyendo productos
          </h2>
          <div className="max-w-(--container-prose) space-y-6 leading-relaxed text-ink-soft">
            <p>
              Construí y mantengo sistemas de gestión con dominio financiero real — cuentas
              corrientes, pagos parciales, cierres de caja, envases y stock físico — como el de{' '}
              <Link href="/casos/soderia-nico" className="link-editorial">
                Sodería Nico
              </Link>
              , en uso diario en una operación de reparto.
            </p>
            <p>
              En paralelo desarrollo productos propios:{' '}
              <Link href="/casos/trackium" className="link-editorial">
                Trackium
              </Link>{' '}
              (gestión integral para transporte),{' '}
              <Link href="/casos/zentro" className="link-editorial">
                Zentro
              </Link>{' '}
              (delegar WhatsApp sin perder control),{' '}
              <Link href="/casos/courtops" className="link-editorial">
                CourtOps
              </Link>{' '}
              (reservas para clubes de pádel) y{' '}
              <Link href="/casos/doleth" className="link-editorial">
                Doleth
              </Link>{' '}
              (finanzas personales).
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="capacidades" className="hairline-t">
        <div className="container-editorial grid gap-10 py-14 md:grid-cols-[1fr_2fr]">
          <h2 id="capacidades" className="label-mono">
            Capacidades
          </h2>
          <div className="max-w-(--container-prose) space-y-4 leading-relaxed text-ink-soft">
            <p>
              <strong className="font-medium text-ink">Producto y UX:</strong> relevamiento de
              operaciones, definición de alcance, diseño de flujos e interfaces para gente que
              trabaja apurada.
            </p>
            <p>
              <strong className="font-medium text-ink">Desarrollo:</strong> TypeScript, React y
              Next.js en el frente; Node.js, PostgreSQL y Prisma detrás. Modelado de dominio antes
              que pantallas.
            </p>
            <p>
              <strong className="font-medium text-ink">Operación:</strong> deploys en Vercel,
              aplicaciones instalables (PWA) y sistemas pensados para usarse desde el teléfono, en
              la calle.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="cierre" className="hairline-t bg-paper-dim">
        <div className="container-editorial py-14">
          <h2 id="cierre" className="max-w-3xl font-serif-display text-(length:--text-title) leading-[1.05]">
            ¿Hablamos?
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/proyectos"
              className="border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper"
            >
              Ver mis proyectos
            </Link>
            <a href={`mailto:${contacto.email}`} className="link-editorial text-sm">
              {contacto.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
