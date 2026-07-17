type StackGroup = {
  label: string;
  items: string[];
};

const stackGroups: StackGroup[] = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Python', 'REST APIs', 'Server Actions'],
  },
  {
    label: 'Datos',
    items: ['PostgreSQL', 'Prisma', 'Modelado de datos'],
  },
  {
    label: 'Infra & Tooling',
    items: ['Vercel', 'Docker', 'Git', 'Figma'],
  },
];

export function TechStack() {
  return (
    <section className="surface-page border-t border-[var(--color-line-strong)] px-6 py-28 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="label-mono mb-6">/ Stack</p>
            <h2 className="font-serif-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink md:text-5xl">
              Herramientas<br />
              <span className="italic text-accent">que ya domino.</span>
            </h2>
            <p className="mt-8 max-w-sm font-light leading-relaxed text-ink-mute">
              Un stack moderno y probado en producción, elegido por velocidad de
              entrega y mantenibilidad a largo plazo.
            </p>
          </div>

          <div className="grid border-t border-[var(--color-line-strong)] sm:grid-cols-2">
            {stackGroups.map((group) => (
              <div
                key={group.label}
                className="border-b border-[var(--color-line-strong)] py-8 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"
              >
                <p className="label-mono mb-6">{group.label}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="font-serif-display text-xl text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
