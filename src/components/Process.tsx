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
    <section className="bg-black px-6 py-32 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-6">
            Cómo trabajo
          </h2>
          <h3 className="text-4xl md:text-6xl font-normal tracking-tighter leading-none text-white">
            Un proceso claro, <br />
            <span className="text-white/40 italic">sin sorpresas.</span>
          </h3>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col bg-black p-8 transition-colors duration-500 hover:bg-white/[0.03]"
            >
              <span className="text-sm font-display font-bold text-white/30 transition-colors group-hover:text-white">
                {step.number}
              </span>
              <h4 className="mt-10 text-xl font-medium tracking-tight text-white">
                {step.title}
              </h4>
              <p className="mt-4 text-sm font-light leading-relaxed text-white/40">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
