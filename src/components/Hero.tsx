import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  const charDelay = 30;
  const initialDelay = 200;

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), initialDelay);
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\n');

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden">
          {line.split('').map((char, charIndex) => {
            const delay = (lineIndex * line.length * charDelay) + (charIndex * charDelay);
            return (
              <span
                key={charIndex}
                className="inline-block transition-all duration-500"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateX(0)' : 'translateX(-18px)',
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
    <section className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center">
      {/* Photo Background with Cinematic Gradient */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-2/3 z-0">
        <div className="relative h-full w-full">
          {/* La Imagen - Se asume que está en src/assets/profile.jpg */}
          {/* He puesto una imagen de respaldo por si no está el archivo, pero usará tu foto */}
          <img 
            src="/src/assets/profile.jpg" 
            alt="Franco"
            className="h-full w-full object-cover object-center opacity-80 grayscale-[0.2] brightness-90"
            onError={(e) => {
              // Fallback en caso de que no encuentre la imagen local
              e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2000";
            }}
          />
          
          {/* Máscaras de degradado para fundir con el negro */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row lg:items-end justify-between pb-12 lg:pb-20">
        
        {/* Left Column: Content */}
        <div className="max-w-3xl pt-24 lg:pt-0">
          <AnimatedHeading 
            text={"Construyendo software\nque genera valor real."} 
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-normal mb-6 leading-[0.9] tracking-tighter"
          />
          
          <FadeIn delay={800} duration={1000}>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg font-light leading-relaxed">
              Desarrollador Full-stack y Product Builder. 
              Transformo ideas complejas en sistemas eficientes y escalables.
            </p>
          </FadeIn>

          <FadeIn delay={1200} duration={1000} className="flex flex-wrap gap-4">
            <Link to="/contacto" className="bg-white text-black px-10 py-4 rounded-lg font-medium transition-all hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Iniciar Proyecto
            </Link>
            <Link to="/proyectos" className="liquid-glass border border-white/20 text-white px-10 py-4 rounded-lg font-medium transition-all hover:bg-white hover:text-black">
              Explorar Portfolio
            </Link>
          </FadeIn>
        </div>

        {/* Right Column: Dynamic Status Tag */}
        <div className="mt-16 lg:mt-0">
          <FadeIn delay={1500} duration={1200}>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="liquid-glass border border-white/20 px-8 py-5 rounded-2xl flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">Status</span>
              </div>
              <span className="text-xl md:text-2xl font-light text-white/90">
                Disponible para <br />
                <span className="font-medium text-white">nuevos desafíos</span>
              </span>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}