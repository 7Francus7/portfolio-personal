import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full surface-page text-ink">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pb-16 pt-32 md:px-12 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:pt-40">
        {/* Left — editorial column */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <Reveal>
            <div className="mb-10 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="label-mono">Disponible · Full-stack Developer · Argentina</span>
            </div>
          </Reveal>

          <h1 className="font-serif-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] tracking-[-0.02em] text-ink">
            <Reveal delay={0.05}>
              <span className="block">Construyo software</span>
            </Reveal>
            <Reveal delay={0.12}>
              <span className="block italic text-accent">que ordena</span>
            </Reveal>
            <Reveal delay={0.19}>
              <span className="block">negocios reales.</span>
            </Reveal>
          </h1>

          <Reveal delay={0.3}>
            <p className="mt-10 max-w-md text-lg font-light leading-relaxed text-ink-soft">
              Diseño y desarrollo SaaS, sistemas de gestión, POS y backoffice para
              ordenar reservas, ventas, caja y la operación de todos los días.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
              <Link
                to="/proyectos"
                className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink"
              >
                Ver proyectos
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
              <Link
                to="/contacto"
                className="label-mono link-underline !text-ink-mute hover:!text-ink"
              >
                Hablemos →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-[var(--color-line-strong)] pt-6">
              {[
                { v: '4+', l: 'años' },
                { v: '15+', l: 'sistemas en producción' },
                { v: '100%', l: 'remoto' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-serif-display text-3xl text-ink">{s.v}</p>
                  <p className="label-mono mt-1 leading-tight">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — gallery plate */}
        <div className="flex items-center lg:col-span-5">
          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
            className="w-full"
          >
            <div className="overflow-hidden border border-[var(--color-line-strong)] bg-paper-dim">
              <img
                src={profileImg}
                alt="Franco Dellorsi — Full-stack Developer"
                className="gallery-img aspect-[4/5] w-full object-cover object-[center_20%]"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200';
                }}
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between">
              <span className="label-mono">Franco Dellorsi</span>
              <span className="label-mono">— 2026</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
