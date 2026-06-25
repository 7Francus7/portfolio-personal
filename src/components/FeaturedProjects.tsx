import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Check, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Project } from '../data/projects';
import { getProjectLink, hasRealScreenshot } from '../utils/projects';

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

/** Visual column: a real screenshot when one exists, otherwise an honest spec plate. */
function ProjectVisual({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const link = getProjectLink(project);

  if (hasRealScreenshot(project)) {
    return (
      <button
        onClick={onOpen}
        className="group relative block w-full cursor-pointer overflow-hidden border border-[var(--color-line-strong)] bg-paper-deep text-left"
      >
        <img
          src={project.images[0]}
          alt={`Captura de ${project.title}`}
          className="gallery-img aspect-[16/11] w-full object-cover group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </button>
    );
  }

  const Wrapper = link.kind === 'private' ? 'div' : 'a';
  const wrapperProps =
    link.kind === 'private'
      ? {}
      : { href: link.href, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <Wrapper
      {...(wrapperProps as object)}
      className={`group flex aspect-[16/11] flex-col justify-between border border-[var(--color-line-strong)] bg-paper-dim p-8 ${
        link.kind === 'private' ? '' : 'cursor-pointer transition-colors hover:bg-paper-deep'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="label-mono !text-accent">{statusLabels[project.status]}</span>
        <span className="label-mono">{project.year}</span>
      </div>

      <div>
        {link.kind === 'private' ? (
          <div className="flex items-center gap-3 text-ink-mute">
            <Lock className="h-5 w-5" strokeWidth={1.5} />
            <span className="font-serif-display text-3xl text-ink-soft md:text-4xl">{link.display}</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {link.kind === 'code' && <GithubIcon size={22} className="text-ink" />}
            <span className="font-serif-display text-3xl text-ink transition-transform group-hover:translate-x-1 md:text-5xl">
              {link.display}
            </span>
            <ArrowUpRight className="h-7 w-7 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        )}
        <p className="label-mono mt-3">{link.label}</p>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-[var(--color-line-strong)] pt-5">
        {project.stack.slice(0, 5).map((tech) => (
          <span key={tech} className="label-mono">{tech}</span>
        ))}
      </div>
    </Wrapper>
  );
}

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="surface-page border-t border-[var(--color-line-strong)] px-6 pb-32 pt-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="label-mono mb-5">/ Destacados</p>
            <h3 className="font-serif-display text-3xl leading-[1.04] tracking-[-0.02em] text-ink md:text-5xl">
              Sistemas con foco <span className="italic text-accent">en operación.</span>
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
            const link = getProjectLink(project);
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={flip ? 'lg:order-2' : ''}>
                  <ProjectVisual project={project} onOpen={() => setSelectedProject(project)} />
                </div>

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
                    {link.kind === 'live' && (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
                      >
                        {link.label} · {link.display}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                    {link.kind === 'code' && (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink"
                      >
                        Ver código <GithubIcon size={14} />
                      </a>
                    )}
                    {project.github && project.demo && !project.private && (
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
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const link = getProjectLink(project);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        className="fixed inset-x-4 inset-y-8 z-[101] mx-auto max-w-3xl overflow-y-auto border border-[var(--color-line-strong)] bg-paper shadow-2xl md:inset-y-16"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full bg-ink p-3 text-paper transition-transform hover:scale-105 active:scale-95"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="p-8 md:p-12 lg:p-14">
          <p className="label-mono mb-5 !text-accent">
            {statusLabels[project.status]} / {project.year}
          </p>
          <h3 className="font-serif-display text-4xl text-ink md:text-6xl">{project.title}</h3>
          <p className="mt-6 text-lg font-light leading-relaxed text-ink-mute">{project.description}</p>

          {hasRealScreenshot(project) && (
            <div className="mt-10 overflow-hidden border border-[var(--color-line-strong)] bg-paper-deep">
              <img src={project.images[0]} alt={`Captura de ${project.title}`} className="aspect-video w-full object-cover" />
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            {link.kind === 'live' && (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
              >
                {link.label} · {link.display}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            {link.kind === 'private' && (
              <span className="inline-flex items-center gap-2 label-mono">
                <Lock className="h-4 w-4" strokeWidth={1.5} /> {link.display}
              </span>
            )}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="label-mono mb-4">Problema</h4>
              <p className="text-sm font-light leading-relaxed text-ink-soft">{project.problem}</p>
            </div>
            <div>
              <h4 className="label-mono mb-4">Solución</h4>
              <p className="text-sm font-light leading-relaxed text-ink-soft">{project.solution}</p>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="label-mono mb-5">Funciones</h4>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm font-light text-ink-soft">
                  <Check className="mt-0.5 h-4 w-4 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-12">
              <h4 className="label-mono mb-5">Impacto</h4>
              <div className="grid grid-cols-2 gap-px border border-[var(--color-line-strong)] bg-[var(--color-line-strong)]">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-paper p-5">
                    <p className="font-serif-display text-3xl text-ink">{m.value}</p>
                    <p className="label-mono mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
              {project.impact && (
                <p className="mt-5 text-sm font-light leading-relaxed text-ink-mute">{project.impact}</p>
              )}
            </div>
          )}

          <div className="mt-12">
            <h4 className="label-mono mb-5">Stack</h4>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {project.stack.map((tech) => (
                <span key={tech} className="font-serif-display text-lg text-ink-soft">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
