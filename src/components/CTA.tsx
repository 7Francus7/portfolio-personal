import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="bg-black px-6 py-32 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent px-8 py-20 text-center md:px-16 md:py-28">
          <div className="ambient-glow pointer-events-none absolute inset-0" />

          <div className="relative">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                Disponible para nuevos proyectos
              </span>
            </div>

            <h2 className="mx-auto max-w-3xl text-4xl md:text-7xl font-normal tracking-tighter leading-[0.95] text-white">
              ¿Tenés una operación <br />
              <span className="text-white/40 italic">que ordenar?</span>
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-lg font-light leading-relaxed text-white/50">
              Contame el problema y te respondo con un plan concreto: alcance,
              tiempos y cómo se vería el sistema funcionando.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/contacto"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 font-semibold text-black shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                Empezar un proyecto
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="https://wa.me/5493524421497"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-10 py-4 font-medium text-white transition-all hover:bg-white hover:text-black"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
