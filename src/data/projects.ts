export type ProjectStatus = 'live' | 'mvp' | 'in-development' | 'client' | 'private';

export type ProjectCategory = 
  | 'saas' 
  | 'pos' 
  | 'automation' 
  | 'dashboard' 
  | 'web-app' 
  | 'internal-tool' 
  | 'mobile-friendly'
  | 'api' 
  | 'ecommerce'
  | 'game';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory[];
  featured: boolean;
  status: ProjectStatus;
  year: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  role: string;
  github?: string;
  demo?: string;
  images: string[];
  /** Set true only when images[0] is a genuine product screenshot (not a mockup). */
  realScreenshot?: boolean;
  impact?: string;
  private: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
}

// Projects are generated from GitHub by scripts/sync-projects.mjs (curated list +
// overrides in projects.config.json). Edit those, not this array. Run `npm run
// sync:projects` to refresh; it also runs automatically on every build (prebuild).
import generatedProjects from './projects.generated.json';

export const projects: Project[] = generatedProjects as Project[];

export const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'saas', label: 'SaaS' },
  { value: 'pos', label: 'POS' },
  { value: 'automation', label: 'Automatización' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'web-app', label: 'Web / Landing' },
  { value: 'game', label: 'Videojuego' },
  { value: 'internal-tool', label: 'Software Interno' },
  { value: 'mobile-friendly', label: 'Mobile App' },
  { value: 'ecommerce', label: 'E-commerce' }
];

export const stackItems = [
  'React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion',
  'Node.js', 'PostgreSQL', 'Docker',
  'AWS', 'Vercel', 'Figma'
];

export const capabilities = [
  { title: 'Sistemas SaaS & ERPs', description: 'Plataformas B2B complejas, control de stock, gestión logística y administración contable' },
  { title: 'Interfaces Fluidas', description: 'Uso de Framer Motion y React para lograr aplicaciones y juegos que se sienten vivos y rápidos' },
  { title: 'Next.js & App Router', description: 'Arquitecturas front-end y full-stack modernas, listas de servidor y escalables' },
  { title: 'Dashboards Analíticos', description: 'UI orientada al análisis de métricas en tiempo real con visualización gráfica' },
  { title: 'Comercio & POS', description: 'Sistemas de punto de venta (rutas de entrega, facturación) y soluciones e-commerce' },
  { title: 'Portafolios & Landings', description: 'Estética "Apple-Style", Glassmorphism e identidades corporativas de alto nivel' }
];
