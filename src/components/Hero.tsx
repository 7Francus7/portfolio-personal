import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImg from '../assets/profile.jpg';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, duration = 1000, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ text, className = "" }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const charDelay = 25;
  const initialDelay = 100;

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), initialDelay);
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\n');

  return (
    <h1 className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden whitespace-nowrap">
          {line.split('').map((char, charIndex) => {
            const delay = (lineIndex * line.length * charDelay) + (charIndex * charDelay);
            return (
              <span
                key={charIndex}
                className="inline-block transition-all duration-700 ease-out"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateY(0)' : 'translateY(100%)',
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};

export function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], ['0%', '16%']);
  const imageScale = useTransform(scrollY, [0, 800], [1, 1.07]);
  const contentY = useTransform(scrollY, [0, 800], ['0%', '-10%']);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white flex items-center">
      {/* Visual Background Layer */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[68%] z-0">
        <motion.div style={{ y: imageY, scale: imageScale }} className="relative h-[120%] w-full will-change-transform">
          <img
            src={profileImg}
            alt="Franco Dellorsi - Full-stack Developer"
            className="h-full w-full object-cover object-[center_22%] opacity-80 grayscale-[0.12] contrast-110 brightness-95"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
        </motion.div>
      </div>

      {/* Main UI Layer */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row lg:items-end justify-between pb-16 lg:pb-24">
        
        <div className="max-w-5xl pt-32 lg:pt-0">
          <FadeIn delay={0} duration={600}>
            <div className="mb-6 inline-flex items-center gap-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">Full-stack Developer · Product Builder</span>
            </div>
          </FadeIn>

          <AnimatedHeading
            text={"Software útil.\nNegocios reales."}
            className="text-[clamp(1.75rem,8vw,8rem)] font-normal mb-8 leading-[0.9]"
          />
          
          <div className="max-w-xl">
            <FadeIn delay={600} duration={1000}>
              <p className="text-lg md:text-xl text-white/50 mb-10 font-light leading-relaxed">
                Full-stack Developer enfocado en <span className="text-white font-medium">SaaS, backoffice y sistemas de gestión</span> para ordenar reservas, ventas, caja y operación diaria.
              </p>
            </FadeIn>

            <FadeIn delay={1000} duration={1000} className="flex flex-wrap gap-5">
              <Link to="/contacto" className="bg-white text-black px-10 py-4 rounded-xl font-semibold transition-all hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)]">
                Empezar Proyecto
              </Link>
              <Link to="/proyectos" className="liquid-glass border border-white/20 text-white px-10 py-4 rounded-xl font-medium transition-all hover:bg-white hover:text-black">
                Ver Proyectos
              </Link>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-white/40">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-medium text-white">4+</span>
                  <span className="text-[11px] uppercase tracking-widest">años de experiencia</span>
                </div>
                <div className="hidden h-3 w-px bg-white/15 sm:block" />
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-medium text-white">15+</span>
                  <span className="text-[11px] uppercase tracking-widest">sistemas en producción</span>
                </div>
                <div className="hidden h-3 w-px bg-white/15 sm:block" />
                <span className="text-[11px] uppercase tracking-widest">Argentina · Remoto</span>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="mt-12 lg:mt-0 w-full lg:w-auto">
          <FadeIn delay={1400} duration={1200}>
            <div className="liquid-glass border border-white/10 p-8 rounded-3xl w-full max-w-xs">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Foco</span>
                  <div className="w-8 h-[1px] bg-white/20 mt-2" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-light text-white/60 leading-snug">
                    Diseño interfaces y arquitectura para herramientas que se usan todos los días.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] uppercase tracking-widest text-white font-bold">Status: Disponible</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </motion.div>
    </section>
  );
}
