import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ArrowUpRight, Lock } from 'lucide-react';
import { projects as defaultProjects, categories, type Project, type ProjectCategory } from '../data/projects';
import { getProjectLink, hasRealScreenshot } from '../utils/projects';

const statusLabels: Record<string, string> = {
  live: 'online',
  mvp: 'mvp',
  'in-development': 'en curso',
  client: 'cliente',
  private: 'privado',
};

const GithubIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.287-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

interface AllProjectsProps {
  initialProjects?: Project[];
}

export function AllProjects({ initialProjects }: AllProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectList = initialProjects || defaultProjects;

  const filteredProjects = useMemo(() => {
    return projectList.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category.includes(selectedCategory);
      const matchesSearch = searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, projectList]);

  return (
    <section id="all-projects" className="surface-band border-t border-[var(--color-line-strong)] px-6 py-32 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16">
          <p className="label-mono mb-6">/ Archivo</p>
          <h3 className="font-serif-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink md:text-5xl">
            Otras piezas <span className="italic text-accent">del archivo.</span>
          </h3>
        </div>

        <div className="mb-12 flex flex-col gap-8 md:flex-row">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              placeholder="Buscar por tecnología, nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-b border-[var(--color-line-strong)] bg-transparent py-4 pl-8 pr-4 font-light text-ink transition-colors placeholder:text-ink-faint focus:border-ink focus:outline-none"
            />
          </div>
          <div className="-mx-6 flex items-center gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`label-mono shrink-0 border px-4 py-2 transition-all ${
                selectedCategory === 'all'
                  ? 'border-ink bg-ink !text-paper'
                  : 'border-[var(--color-line-strong)] hover:!text-ink'
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`label-mono shrink-0 border px-4 py-2 transition-all ${
                  selectedCategory === cat.value
                    ? 'border-ink bg-ink !text-paper'
                    : 'border-[var(--color-line-strong)] hover:!text-ink'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid border-t border-l border-[var(--color-line-strong)] sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const link = getProjectLink(project);
            return (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group surface-card flex cursor-pointer flex-col border-b border-r border-[var(--color-line-strong)] p-8 transition-colors hover:bg-paper-dim"
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="label-mono !text-accent">{statusLabels[project.status]}</span>
                  <span className="label-mono">{project.year}</span>
                </div>
                <h3 className="mb-3 font-serif-display text-2xl text-ink transition-transform group-hover:translate-x-1">
                  {project.title}
                </h3>
                <p className="mb-8 line-clamp-2 text-sm font-light leading-relaxed text-ink-mute">
                  {project.tagline}
                </p>

                <div className="mb-8 flex flex-wrap gap-x-4 gap-y-1">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span key={tech} className="label-mono">{tech}</span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 border-t border-[var(--color-line-strong)] pt-5">
                  {link.kind === 'private' ? (
                    <span className="inline-flex items-center gap-2 label-mono">
                      <Lock size={13} strokeWidth={1.5} /> {link.display}
                    </span>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent"
                    >
                      {link.kind === 'code' && <GithubIcon size={14} />}
                      {link.display}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="border border-dashed border-[var(--color-line-strong)] py-32 text-center">
            <p className="label-mono">No hay proyectos con ese filtro.</p>
          </div>
        )}
      </div>

      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-[var(--color-line-strong)] bg-paper shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[var(--color-line-strong)] bg-paper/90 p-8 backdrop-blur-md">
              <h3 className="font-serif-display text-2xl text-ink">{selectedProject.title}</h3>
              <button onClick={() => setSelectedProject(null)} aria-label="Cerrar" className="rounded-full p-2 transition-colors hover:bg-paper-dim">
                <X size={20} className="text-ink" />
              </button>
            </div>
            <div className="space-y-10 p-10">
              {hasRealScreenshot(selectedProject) && (
                <div className="overflow-hidden border border-[var(--color-line-strong)] bg-paper-deep">
                  <img
                    src={selectedProject.images[0]}
                    alt={`Captura de ${selectedProject.title}`}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}

              <div>
                <h4 className="label-mono mb-4">Descripción</h4>
                <p className="font-light leading-relaxed text-ink-soft">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="label-mono mb-4">Tecnologías</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {selectedProject.stack.map(s => (
                      <span key={s} className="label-mono">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="label-mono mb-4">Año</h4>
                  <p className="font-serif-display text-xl text-ink">{selectedProject.year}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--color-line-strong)] pt-6">
                {(() => {
                  const link = getProjectLink(selectedProject);
                  if (link.kind === 'private') {
                    return (
                      <span className="inline-flex items-center gap-2 label-mono">
                        <Lock size={14} strokeWidth={1.5} /> {link.display}
                      </span>
                    );
                  }
                  return (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent"
                    >
                      {link.kind === 'code' && <GithubIcon size={14} />}
                      {link.kind === 'live' ? `${link.label} · ${link.display}` : link.display}
                      <ArrowUpRight size={16} />
                    </a>
                  );
                })()}
                {selectedProject.github && selectedProject.demo && !selectedProject.private && (
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
