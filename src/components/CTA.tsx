import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="surface-page border-t border-[var(--color-line-strong)] px-6 py-32 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="label-mono">Disponible para nuevos proyectos</span>
        </div>

        <h2 className="mt-10 max-w-4xl font-serif-display text-5xl leading-[1.0] tracking-[-0.02em] text-ink md:text-8xl">
          ¿Tenés una operación{' '}
          <span className="italic text-accent">que ordenar?</span>
        </h2>

        <p className="mt-10 max-w-xl text-lg font-light leading-relaxed text-ink-mute">
          Contame el problema y te respondo con un plan concreto: alcance,
          tiempos y cómo se vería el sistema funcionando.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
          <Link
            to="/contacto"
            className="group inline-flex items-center gap-2 bg-ink px-9 py-4 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            Empezar un proyecto
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a
            href="https://wa.me/5493524421497"
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono link-underline !text-ink-mute hover:!text-ink"
          >
            Escribir por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
