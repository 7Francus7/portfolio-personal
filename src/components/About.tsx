import { motion } from 'framer-motion';

export function About() {
  return (
    <section className="py-32 bg-black px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-8">Philosophy</h2>
            <h3 className="text-4xl md:text-6xl font-normal tracking-tighter leading-none text-white mb-10">
              Menos ruido, <br />
              <span className="text-white/40 italic">más impacto funcional.</span>
            </h3>
            
            <div className="space-y-6 text-lg text-white/50 font-light leading-relaxed">
              <p>
                No creo en el software como un fin, sino como una herramienta de 
                <span className="text-white font-medium"> apalancamiento</span>. Cada línea de código 
                debe estar justificada por un valor de negocio o una mejora operativa.
              </p>
              <p>
                Mi enfoque combina el pragmatismo de un 
                <span className="text-white font-medium"> Product Builder</span> con el rigor técnico 
                de un Ingeniero Full-stack, logrando soluciones que no solo se ven premium, 
                sino que operan sin fricciones.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <span className="text-3xl font-light text-white">04+</span>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-2">Años de Experiencia</p>
              </div>
              <div>
                <span className="text-3xl font-light text-white">15+</span>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-2">Sistemas Desplegados</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/5">
              <img
                src="/src/assets/profile.jpg"
                alt="Franco Working"
                className="w-full h-full object-cover grayscale opacity-60"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            
            {/* Decorative glass elements */}
            <div className="absolute -bottom-8 -left-8 liquid-glass p-8 rounded-2xl border border-white/10 hidden md:block">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-display font-bold text-white tracking-tighter">Pure Code.</span>
                <span className="text-sm text-white/40 font-light italic">No shortcuts.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}