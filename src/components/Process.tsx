import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Entender la operación',
    description:
      'Mapeo cómo trabajás hoy: dónde se pierde tiempo, qué se hace a mano y qué decisiones cuestan plata.',
  },
  {
    number: '02',
    title: 'Diseñar el flujo',
    description:
      'Defino pantallas, datos y arquitectura antes de escribir código. Acordamos alcance y prioridades.',
  },
  {
    number: '03',
    title: 'Construir y validar',
    description:
      'Desarrollo en iteraciones cortas con entregas visibles. Probás funciones reales, no maquetas.',
  },
  {
    number: '04',
    title: 'Desplegar y acompañar',
    description:
      'Dejo el sistema en producción, documentado y listo para crecer. Seguimiento post-lanzamiento.',
  },
];

export function Process() {
  return (
    <section className="surface-band border-t border-[var(--color-line-strong)] px-6 py-28 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 max-w-2xl">
          <p className="label-mono mb-6">/ Cómo trabajo</p>
          <h2 className="font-serif-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl">
            Un proceso claro,<br />
            <span className="italic text-accent">sin sorpresas.</span>
          </h2>
        </div>

        <div className="grid border-t border-[var(--color-line-strong)] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group flex flex-col border-b border-[var(--color-line-strong)] py-10 lg:border-b-0 lg:border-r lg:px-8 lg:py-12 lg:last:border-r-0 lg:[&:first-child]:pl-0"
            >
              <span className="font-mono text-sm text-ink-faint transition-colors group-hover:text-accent">
                {step.number}
              </span>
              <h3 className="mt-10 font-serif-display text-2xl text-ink">{step.title}</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-ink-mute">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
