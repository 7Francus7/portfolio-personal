import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <h1 className={className} style={{ letterSpacing: '-0.05em' }}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden">
          {line.split('').map((char, charIndex) => {
            const delay = (lineIndex * line.length * charDelay) + (charIndex * charDelay);
            return (
              <span
                key={charIndex}
                className="inline-block transition-all duration-700 ease-out"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateY(0)' : 'translateY(40px)',
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
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black text-white flex items-center">
      {/* Visual Background Layer */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] z-0">
        <div className="relative h-full w-full">
          <img 
            src="/src/assets/profile.jpg" 
            alt="Franco - Product Architect"
            className="h-full w-full object-cover object-[center_25%] opacity-70 grayscale-[0.3] contrast-125 brightness-75"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2000";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      </div>

      {/* Main UI Layer */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row lg:items-end justify-between pb-16 lg:pb-24">
        
        <div className="max-w-4xl pt-32 lg:pt-0">
          <FadeIn delay={0} duration={600}>
            <div className="mb-6 inline-flex items-center gap-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">Independent Product Builder</span>
            </div>
          </FadeIn>

          <AnimatedHeading 
            text={"Evolving ideas\ninto digital assets."} 
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-normal mb-8 leading-[0.85] tracking-tighter"
          />
          
          <div className="max-w-xl">
            <FadeIn delay={600} duration={1000}>
              <p className="text-lg md:text-xl text-white/50 mb-10 font-light leading-relaxed">
                Full-stack Developer especializado en la creación de <span className="text-white">SaaS, sistemas operativos de negocio</span> y experiencias digitales que combinan estética radical con funcionalidad absoluta.
              </p>
            </FadeIn>

            <FadeIn delay={1000} duration={1000} className="flex flex-wrap gap-5">
              <Link to="/contacto" className="bg-white text-black px-10 py-4 rounded-xl font-semibold transition-all hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)]">
                Start a Project
              </Link>
              <Link to="/proyectos" className="liquid-glass border border-white/20 text-white px-10 py-4 rounded-xl font-medium transition-all hover:bg-white hover:text-black">
                View Archive
              </Link>
            </FadeIn>
          </div>
        </div>

        <div className="mt-20 lg:mt-0">
          <FadeIn delay={1400} duration={1200}>
            <div className="liquid-glass border border-white/10 p-8 rounded-3xl max-w-xs">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Focus</span>
                  <div className="w-8 h-[1px] bg-white/20 mt-2" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-light text-white/60 leading-snug">
                    Actualmente diseñando arquitecturas escalables para la <span className="text-white font-medium">próxima generación</span> de herramientas de gestión.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] uppercase tracking-widest text-white font-bold">Live Status: Available</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}