import { FeaturedProjects } from '../components/FeaturedProjects';
import { AllProjects } from '../components/AllProjects';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { projects } from '../data/projects';

export function ProyectosPage() {
  const featuredOnPage = projects.filter(p => p.featured);

  return (
    <div className="surface-page">
      <div className="relative border-b border-[var(--color-line-strong)] px-6 pb-20 pt-40 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="reveal max-w-4xl">
            <p className="label-mono mb-8">/ Proyectos</p>
            <h1 className="mb-10 font-serif-display text-5xl leading-[1.0] tracking-[-0.02em] text-ink sm:text-6xl md:text-8xl">
              Sistemas hechos <br />
              <span className="italic text-accent">para operar.</span>
            </h1>
            <p className="max-w-xl text-xl font-light leading-relaxed text-ink-mute">
              Reservas, caja, logística, paneles internos y herramientas que tienen que funcionar cuando hay gente usándolas.
            </p>
          </div>
        </div>
      </div>

      <FeaturedProjects projects={featuredOnPage} />
      <AllProjects initialProjects={projects} />
      <CTA />
      <Footer />
    </div>
  );
}
