import { Hero } from '../components/Hero';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { HomeOverview } from '../components/HomeOverview';
import { TechStack } from '../components/TechStack';
import { Process } from '../components/Process';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { projects } from '../data/projects';

// Corte 0: la escena 3D decorativa (Scene3D) queda fuera de producción.
// El componente y sus assets siguen en el repo para el rediseño.

export function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <Hero />
      <HomeOverview />
      <FeaturedProjects projects={featuredProjects} />
      <TechStack />
      <Process />
      <CTA />
      <Footer />
    </>
  );
}
