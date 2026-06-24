import { motion } from 'framer-motion';

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
    <section className="bg-black px-6 py-28 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-6">
              Stack
            </h2>
            <h3 className="text-4xl md:text-5xl font-normal tracking-tighter leading-none text-white">
              Herramientas <br />
              <span className="text-white/40 italic">que ya domino.</span>
            </h3>
            <p className="mt-8 max-w-sm text-base text-white/45 font-light leading-relaxed">
              Un stack moderno y probado en producción, elegido por velocidad de
              entrega y mantenibilidad a largo plazo.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 sm:grid-cols-2">
            {stackGroups.map((group, i) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-black p-8"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-bold mb-6">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-light text-white/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
