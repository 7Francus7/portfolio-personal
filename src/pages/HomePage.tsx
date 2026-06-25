import { lazy, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { HomeOverview } from '../components/HomeOverview';
import { TechStack } from '../components/TechStack';
import { Process } from '../components/Process';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { projects } from '../data/projects';

const Scene3D = lazy(() =>
  import('../components/Scene3D').then((m) => ({ default: m.Scene3D }))
);

function Scene3DFallback() {
  return (
    <div
      style={{
        height: '100vh',
        background: '#0c0b08',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(154,151,139,0.4)',
        }}
      >
        Cargando escena 3D...
      </span>
    </div>
  );
}

export function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <Hero />
      <Suspense fallback={<Scene3DFallback />}>
        <Scene3D />
      </Suspense>
      <HomeOverview />
      <FeaturedProjects projects={featuredProjects} />
      <TechStack />
      <Process />
      <CTA />
      <Footer />
    </>
  );
}
