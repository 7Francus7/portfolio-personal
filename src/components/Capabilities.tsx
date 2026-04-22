import { motion } from 'framer-motion';
import { Layers, Zap, BarChart3, Database } from 'lucide-react';

const capabilities = [
  {
    title: 'Product Architecture',
    description: 'Diseño integral de productos digitales desde la idea hasta el despliegue a gran escala.',
    icon: Layers,
  },
  {
    title: 'Full-stack Engineering',
    description: 'Desarrollo robusto con React, Next.js, Python y Node.js centrado en el rendimiento.',
    icon: Zap,
  },
  {
    title: 'Business Systems',
    description: 'Automatización de flujos operativos y creación de herramientas de gestión de negocio.',
    icon: BarChart3,
  },
  {
    title: 'Infrastructure & DB',
    description: 'Bases de datos optimizadas y despliegues en la nube con escalabilidad garantizada.',
    icon: Database,
  },
];

export function Capabilities() {
  return (
    <section className="py-32 bg-black px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-6">Expertise</h2>
          <h3 className="text-4xl md:text-6xl font-normal tracking-tighter text-white">
            Capacidades técnicas <br />
            <span className="text-white/40 italic">de alto rendimiento.</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 border border-white/5 hover:bg-white/5 transition-all duration-500"
            >
              <div className="mb-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <cap.icon size={20} />
              </div>
              <h4 className="text-xl font-medium text-white mb-4 tracking-tight">{cap.title}</h4>
              <p className="text-sm text-white/40 font-light leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}