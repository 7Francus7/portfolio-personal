import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Project } from '../data/projects';
import heroFallback from '../assets/hero.png';
import { getProjectLinkLabel } from '../utils/projects';

const statusLabels: Record<string, string> = {
  live: 'online',
  mvp: 'mvp',
  'in-development': 'en curso',
  client: 'cliente',
  private: 'privado',
};

const GithubIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.287-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="surface-page border-t border-[var(--color-line-strong)] px-6 py-32 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-24 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="label-mono mb-6">/ Destacados</p>
            <h3 className="font-serif-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl">
              Sistemas con foco <br />
              <span className="italic text-accent">en operación.</span>
            </h3>
          </div>
          <Link
            to="/proyectos"
            className="group label-mono inline-flex items-center gap-2 hover:!text-ink"
          >
            Ver archivo
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-28">
          {projects.map((project, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Image plate */}
                <motion.div
                  layoutId={`project-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative cursor-pointer overflow-hidden border border-[var(--color-line-strong)] bg-paper-deep ${flip ? 'lg:order-2' : ''}`}
                >
                  <img
                    src={project.images[0] || heroFallback}
                    alt={project.title}
                    className="gallery-img aspect-[16/11] w-full object-cover group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <span className="bg-paper/80 px-3 py-1 label-mono !text-accent backdrop-blur-sm">
                      {statusLabels[project.status]}
                    </span>
                    <span className="bg-paper/80 px-3 py-1 label-mono backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                  <div className="pointer-events-none absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </motion.div>

                {/* Case-study text */}
                <div className={flip ? 'lg:order-1' : ''}>
                  <p className="label-mono mb-5">{project.role}</p>
                  <h4 className="font-serif-display text-3xl text-ink md:text-5xl">{project.title}</h4>
                  <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-ink-mute">
                    {project.tagline}
                  </p>

                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    <div>
                      <p className="label-mono mb-3">Problema</p>
                      <p className="text-sm font-light leading-relaxed text-ink-soft">{project.problem}</p>
                    </div>
                    <div>
                      <p className="label-mono mb-3">Solución</p>
                      <p className="text-sm font-light leading-relaxed text-ink-soft">{project.solution}</p>
                    </div>
                  </div>

                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-[var(--color-line-strong)] pt-6">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="font-serif-display text-3xl text-ink">{m.value}</p>
                          <p className="label-mono mt-1">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink"
                      >
                        {getProjectLinkLabel(project)}
                        <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                    {project.github && !project.private && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 label-mono hover:!text-ink"
                      >
                        Código <GithubIcon size={14} />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="label-mono link-underline hover:!text-ink"
                    >
                      Ver caso →
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="fixed inset-x-4 inset-y-8 z-[101] overflow-hidden border border-[var(--color-line-strong)] bg-paper shadow-2xl md:inset-16 lg:inset-24"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-5 top-5 z-10 rounded-full bg-ink p-3 text-paper transition-transform hover:scale-105 active:scale-95"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>

              <div className="h-full overflow-y-auto">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative min-h-[320px] bg-paper-deep lg:min-h-screen">
                    <img
                      src={selectedProject.images[0] || heroFallback}
                      alt={`Captura de ${selectedProject.title}`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-8 md:p-12 lg:p-14">
                    <p className="label-mono mb-5 !text-accent">
                      {statusLabels[selectedProject.status]} / {selectedProject.year}
                    </p>
                    <h3 className="font-serif-display text-4xl text-ink md:text-6xl">
                      {selectedProject.title}
                    </h3>
                    <p className="mt-6 text-lg font-light leading-relaxed text-ink-mute">
                      {selectedProject.description}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                      {selectedProject.demo && (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink"
                        >
                          {getProjectLinkLabel(selectedProject)} <ExternalLink size={14} />
                        </a>
                      )}
                      {selectedProject.github && !selectedProject.private && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 label-mono hover:!text-ink"
                        >
                          Código <GithubIcon size={14} />
                        </a>
                      )}
                    </div>

                    <div className="mt-12 grid gap-8">
                      <div>
                        <h4 className="label-mono mb-4">Problema</h4>
                        <p className="text-sm font-light leading-relaxed text-ink-soft">
                          {selectedProject.problem}
                        </p>
                      </div>
                      <div>
                        <h4 className="label-mono mb-4">Solución</h4>
                        <p className="text-sm font-light leading-relaxed text-ink-soft">
                          {selectedProject.solution}
                        </p>
                      </div>
                    </div>

                    <div className="mt-12">
                      <h4 className="label-mono mb-5">Funciones</h4>
                      <ul className="grid gap-3">
                        {selectedProject.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm font-light text-ink-soft">
                            <Check className="mt-0.5 h-4 w-4 text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                      <div className="mt-12">
                        <h4 className="label-mono mb-5">Impacto</h4>
                        <div className="grid grid-cols-2 gap-px border border-[var(--color-line-strong)] bg-[var(--color-line-strong)]">
                          {selectedProject.metrics.map((m) => (
                            <div key={m.label} className="bg-paper p-5">
                              <p className="font-serif-display text-3xl text-ink">{m.value}</p>
                              <p className="label-mono mt-1">{m.label}</p>
                            </div>
                          ))}
                        </div>
                        {selectedProject.impact && (
                          <p className="mt-5 text-sm font-light leading-relaxed text-ink-mute">
                            {selectedProject.impact}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="mt-12">
                      <h4 className="label-mono mb-4">Stack</h4>
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {selectedProject.stack.map((tech) => (
                          <span key={tech} className="font-serif-display text-lg text-ink-soft">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
