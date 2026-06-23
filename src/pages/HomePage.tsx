import { Hero } from '../components/Hero';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { HomeOverview } from '../components/HomeOverview';
import { Footer } from '../components/Footer';
import { projects } from '../data/projects';

export function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <Hero />
      <HomeOverview />
      <FeaturedProjects projects={featuredProjects} />
      <Footer />
    </>
  );
}
