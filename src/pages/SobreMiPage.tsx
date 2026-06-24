import { About } from '../components/About';
import { Capabilities } from '../components/Capabilities';
import { TechStack } from '../components/TechStack';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';

export function SobreMiPage() {
  return (
    <>
      <div className="pt-40 pb-20 relative px-6 md:px-12 lg:px-20 border-b border-white/5 surface-page">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-8">Sobre mí</h2>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-normal leading-[0.9] text-white mb-10">
              Producto, código <br />
              <span className="text-white/40 italic">y oficio.</span>
            </h1>
            <p className="text-xl text-white/50 font-light max-w-xl leading-relaxed">
              Trabajo cerca del problema: entender la operación, diseñar la herramienta y dejarla lista para uso real.
            </p>
          </motion.div>
        </div>
      </div>

      <About />
      <Capabilities />
      <TechStack />
      <CTA />
      <Footer />
    </>
  );
}
