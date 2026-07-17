import { Layers, Zap, BarChart3, Database } from 'lucide-react';

const capabilities = [
  {
    title: 'Arquitectura de producto',
    description: 'Definición de flujos, pantallas y estructura técnica antes de escribir código.',
    icon: Layers,
  },
  {
    title: 'Full-stack engineering',
    description: 'React, Next.js, Node, Python y bases de datos trabajando como una sola pieza.',
    icon: Zap,
  },
  {
    title: 'Sistemas de negocio',
    description: 'Reservas, POS, clientes, caja, inventario y procesos internos sin planillas sueltas.',
    icon: BarChart3,
  },
  {
    title: 'Infraestructura y datos',
    description: 'Modelos de datos claros, deploys simples y bases preparadas para crecer.',
    icon: Database,
  },
];

export function Capabilities() {
  return (
    <section className="surface-page border-t border-[var(--color-line-strong)] px-6 py-32 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20">
          <p className="label-mono mb-6">/ Capacidades</p>
          <h3 className="font-serif-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl">
            Lo que suelo <span className="italic text-accent">resolver.</span>
          </h3>
        </div>

        <div className="grid border-t border-l border-[var(--color-line-strong)] md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group border-b border-r border-[var(--color-line-strong)] p-8 transition-colors duration-500 hover:bg-paper-dim"
            >
              <div className="mb-10 flex h-12 w-12 items-center justify-center border border-[var(--color-line-strong)] text-ink transition-all group-hover:bg-ink group-hover:text-paper">
                <cap.icon size={20} strokeWidth={1.5} />
              </div>
              <h4 className="mb-4 font-serif-display text-2xl text-ink">{cap.title}</h4>
              <p className="text-sm font-light leading-relaxed text-ink-mute">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
