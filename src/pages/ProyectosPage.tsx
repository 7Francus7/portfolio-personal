import { FeaturedProjects } from '../components/FeaturedProjects';
import { AllProjects } from '../components/AllProjects';
import { Footer } from '../components/Footer';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';

export function ProyectosPage() {
  const featuredOnPage = projects.filter(p => p.featured);

  return (
    <main className="bg-black">
      <div className="pt-40 pb-20 relative px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-8">Selected Works</h2>
            <h1 className="text-5xl md:text-8xl font-normal tracking-tighter leading-[0.85] text-white mb-10">
              Soluciones para <br />
              <span className="text-white/40 italic">negocios reales.</span>
            </h1>
            <p className="text-xl text-white/50 font-light max-w-xl leading-relaxed">
              Cada proyecto es una respuesta técnica a un desafío operativo, diseñado para escalar y generar impacto inmediato.
            </p>
          </motion.div>
        </div>
      </div>

      <FeaturedProjects projects={featuredOnPage} />
      <AllProjects initialProjects={projects} />
      <Footer />
    </main>
  );
}
