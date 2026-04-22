import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { projects as defaultProjects, categories, type Project, type ProjectCategory } from '../data/projects';

const statusColors: Record<string, string> = {
  live: 'bg-white/10 text-white border border-white/20',
  mvp: 'bg-white/10 text-white/70 border border-white/20',
  'in-development': 'bg-white/10 text-white/50 border border-white/20',
  client: 'bg-white/10 text-white/40 border border-white/20',
  private: 'bg-white/5 text-white/20 border border-white/5',
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
    <section id="all-projects" className="py-32 bg-black px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-6">Archive</h2>
          <h3 className="text-4xl md:text-5xl font-normal tracking-tighter text-white mb-4">
            Explora el ecosistema <br />
            <span className="text-white/40 italic">de soluciones técnicas.</span>
          </h3>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              type="text"
              placeholder="Buscar por tecnología, nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent border-b border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors font-light"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase transition-all ${
                selectedCategory === 'all'
                  ? 'bg-white text-black'
                  : 'bg-transparent border border-white/10 text-white/40 hover:text-white hover:border-white'
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-white text-black'
                    : 'bg-transparent border border-white/10 text-white/40 hover:text-white hover:border-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-black p-8 cursor-pointer hover:bg-white/5 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <span className={`px-2 py-1 text-[8px] uppercase tracking-widest font-bold rounded ${statusColors[project.status]}`}>
                  {project.status}
                </span>
                <span className="text-white/20 text-[10px] font-medium">{project.year}</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-3 group-hover:translate-x-1 transition-transform">
                {project.title}
              </h3>
              <p className="text-sm text-white/40 font-light mb-8 line-clamp-2 leading-relaxed">
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] text-white/30 uppercase tracking-widest"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-32 rounded-3xl border border-white/5 border-dashed">
            <p className="text-white/20 font-light tracking-widest uppercase text-xs">No matching digital assets found.</p>
          </div>
        )}
      </div>

      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl shadow-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md">
              <h3 className="text-2xl font-normal tracking-tight text-white">{selectedProject.title}</h3>
              <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <X size={20} className="text-white" />
              </button>
            </div>
            <div className="p-10 space-y-10">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Description</h4>
                <p className="text-white/60 font-light leading-relaxed">{selectedProject.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map(s => (
                      <span key={s} className="text-xs text-white/40">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Year</h4>
                  <p className="text-sm text-white/80">{selectedProject.year}</p>
                </div>
              </div>

              <div className="flex gap-6 pt-6">
                {selectedProject.demo && (
                  <a 
                    href={selectedProject.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-white/60 transition-colors"
                  >
                    Live Demo <ArrowUpRight size={16} />
                  </a>
                )}
                {selectedProject.github && !selectedProject.private && (
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors"
                  >
                    Repository <ArrowUpRight size={16} />
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