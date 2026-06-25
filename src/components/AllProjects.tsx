import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { projects as defaultProjects, categories, type Project, type ProjectCategory } from '../data/projects';
import { getProjectLinkLabel, hasProjectImage } from '../utils/projects';

const statusLabels: Record<string, string> = {
  live: 'online',
  mvp: 'mvp',
  'in-development': 'en curso',
  client: 'cliente',
  private: 'privado',
};

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="label-mono mb-6">/ Archivo</p>
          <h3 className="font-serif-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink md:text-5xl">
            Otras piezas <span className="italic text-accent">del archivo.</span>
          </h3>
        </motion.div>

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
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group surface-card cursor-pointer border-b border-r border-[var(--color-line-strong)] transition-colors hover:bg-paper-dim"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-line-strong)] bg-paper-deep">
                {hasProjectImage(project) ? (
                  <img
                    src={project.images[0]}
                    alt={`Captura real de ${project.title}`}
                    className="gallery-img h-full w-full object-cover group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-8 text-center">
                    <p className="label-mono">Captura no pública</p>
                  </div>
                )}
              </div>

              <div className="p-8">
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
                <div className="flex flex-wrap gap-4 border-t border-[var(--color-line-strong)] pt-5">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="flex items-center gap-2 text-xs font-medium text-ink hover:text-accent"
                    >
                      {getProjectLinkLabel(project)}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.github && !project.private && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="flex items-center gap-2 text-xs font-medium text-ink-mute hover:text-ink"
                    >
                      Repositorio
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
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
              <div className="overflow-hidden border border-[var(--color-line-strong)] bg-paper-deep">
                {hasProjectImage(selectedProject) ? (
                  <img
                    src={selectedProject.images[0]}
                    alt={`Captura real de ${selectedProject.title}`}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center p-8 text-center">
                    <p className="label-mono">Captura no pública</p>
                  </div>
                )}
              </div>

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

              <div className="flex gap-6 border-t border-[var(--color-line-strong)] pt-6">
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-ink hover:text-accent"
                  >
                    {getProjectLinkLabel(selectedProject)} <ArrowUpRight size={16} />
                  </a>
                )}
                {selectedProject.github && !selectedProject.private && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-ink-mute hover:text-ink"
                  >
                    Repositorio <ArrowUpRight size={16} />
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
