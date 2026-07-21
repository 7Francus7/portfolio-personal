import { ArrowUpRight, Blocks, Rocket, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    number: '01',
    title: 'Sistema interno a medida',
    description:
      'Para reemplazar planillas, mensajes sueltos y tareas manuales por una operación centralizada.',
    items: ['Reservas, ventas, caja o inventario', 'Paneles, permisos y automatizaciones', 'Deploy y acompañamiento inicial'],
    icon: Blocks,
  },
  {
    number: '02',
    title: 'MVP de producto',
    description:
      'Para convertir una idea de SaaS o plataforma en una primera versión usable y lista para validar.',
    items: ['Definición del alcance mínimo', 'Diseño y desarrollo full-stack', 'Versión publicada para usuarios reales'],
    icon: Rocket,
  },
  {
    number: '03',
    title: 'Mejora de sistema existente',
    description:
      'Para ordenar un producto que ya funciona, pero quedó lento, confuso o difícil de mantener.',
    items: ['Diagnóstico técnico y de experiencia', 'Prioridades con impacto visible', 'Implementación por etapas'],
    icon: Wrench,
  },
];

export function Services() {
  return (
    <section className="surface-band border-t border-[var(--color-line-strong)] px-6 py-28 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="label-mono mb-6">/ Formas de trabajar</p>
            <h2 className="font-serif-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl">
              Elegí un punto de partida.<br />
              <span className="italic text-accent">El plan lo armamos juntos.</span>
            </h2>
          </div>
          <p className="max-w-sm font-light leading-relaxed text-ink-mute lg:text-right">
            No necesitás llegar con una especificación técnica. Alcanza con entender qué problema querés resolver.
          </p>
        </div>

        <div className="mt-16 grid border-l border-t border-[var(--color-line-strong)] lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="group flex h-full flex-col border-b border-r border-[var(--color-line-strong)] p-8 transition-colors duration-500 hover:bg-paper-deep md:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-accent">{service.number}</span>
                <service.icon className="h-5 w-5 text-ink-mute transition-colors group-hover:text-ink" strokeWidth={1.5} />
              </div>

              <h3 className="mt-10 font-serif-display text-3xl leading-tight text-ink">{service.title}</h3>
              <p className="mt-5 font-light leading-relaxed text-ink-mute">{service.description}</p>

              <ul className="mt-8 space-y-3 border-t border-[var(--color-line-strong)] pt-6">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-light leading-relaxed text-ink-soft">
                    <span aria-hidden="true" className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/contacto"
                className="group/link mt-10 inline-flex items-center gap-2 self-start border-b border-ink pb-1 text-sm font-medium text-ink"
              >
                Consultar
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
