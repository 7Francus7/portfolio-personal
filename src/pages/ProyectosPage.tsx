import { FeaturedProjects } from '../components/FeaturedProjects';
import { AllProjects } from '../components/AllProjects';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';

export function ProyectosPage() {
  const featuredOnPage = projects.filter(p => p.featured);

  return (
    <main className="bg-black">
      <div className="pt-40 pb-20 relative px-6 md:px-12 lg:px-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-8">Proyectos</h2>
            <h1 className="text-5xl md:text-8xl font-normal leading-[0.9] text-white mb-10">
              Sistemas hechos <br />
              <span className="text-white/40 italic">para operar.</span>
            </h1>
            <p className="text-xl text-white/50 font-light max-w-xl leading-relaxed">
              Reservas, caja, logística, paneles internos y herramientas que tienen que funcionar cuando hay gente usándolas.
            </p>
          </motion.div>
        </div>
      </div>

      <FeaturedProjects projects={featuredOnPage} />
      <AllProjects initialProjects={projects} />
      <CTA />
      <Footer />
    </main>
  );
}
