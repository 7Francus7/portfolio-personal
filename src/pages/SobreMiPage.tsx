import { About } from '../components/About';
import { Capabilities } from '../components/Capabilities';
import { TechStack } from '../components/TechStack';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export function SobreMiPage() {
  return (
    <>
      <div className="surface-page relative border-b border-[var(--color-line-strong)] px-6 pb-20 pt-40 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="reveal max-w-4xl">
            <p className="label-mono mb-8">/ Sobre mí</p>
            <h1 className="mb-10 font-serif-display text-5xl leading-[1.0] tracking-[-0.02em] text-ink sm:text-6xl md:text-8xl">
              Producto, código <br />
              <span className="italic text-accent">y oficio.</span>
            </h1>
            <p className="max-w-xl text-xl font-light leading-relaxed text-ink-mute">
              Trabajo cerca del problema: entender la operación, diseñar la herramienta y dejarla lista para uso real.
            </p>
          </div>
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
