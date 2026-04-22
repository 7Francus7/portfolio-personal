import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Project } from '../data/projects';

const GithubIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.287-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-32 bg-black px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-6">Selected Works</h2>
            <h3 className="text-4xl md:text-6xl font-normal tracking-tighter leading-none text-white">
              Sistemas que impulsan <br /> 
              <span className="text-white/40 italic">la eficiencia digital.</span>
            </h3>
          </div>
          <Link 
            to="/proyectos" 
            className="group flex items-center gap-2 text-sm font-medium text-white hover:text-white/60 transition-colors"
          >
            Archive
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 bg-[#111]">
                <img
                  src={project.images[0] || '/src/assets/hero.png'}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-6 left-6 flex gap-2">
                  {project.category.slice(0, 2).map((cat) => (
                    <span key={cat} className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-white/70">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-light text-white mb-2">{project.title}</h4>
                  <p className="text-sm text-white/40 font-light max-w-sm">{project.tagline}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Detail View */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="fixed inset-x-6 inset-y-12 md:inset-24 lg:inset-32 z-[101] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white text-black transition-transform hover:scale-110 active:scale-95"
              >
                <X size={20} />
              </button>

              <div className="h-full overflow-y-auto custom-scrollbar">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={selectedProject.images[0] || '/src/assets/hero.png'}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 md:p-16">
                  <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                      <h3 className="text-4xl md:text-6xl font-normal tracking-tighter text-white mb-8">
                        {selectedProject.title}
                      </h3>
                      <p className="text-lg text-white/50 font-light leading-relaxed mb-12">
                        {selectedProject.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-16">
                        {selectedProject.demo && (
                          <a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-all"
                          >
                            Live Demo <ExternalLink size={16} />
                          </a>
                        )}
                        {selectedProject.github && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-black border border-white/10 text-white rounded-xl font-medium hover:bg-white hover:text-black transition-all"
                          >
                            Source Code <GithubIcon size={16} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="space-y-12">
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Technologies</h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.stack.map((tech) => (
                            <span key={tech} className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-sm font-light text-white/80">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Key Features</h4>
                        <ul className="grid gap-3">
                          {selectedProject.features?.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-white/50 font-light">
                              <Check className="w-4 h-4 text-white mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
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