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
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image/Video */}
      {/* 
        He puesto un video de código de alta calidad en blanco y negro para mantener la estética VEX, 
        pero podés reemplazar el <img> de abajo con tu foto local.
      */}
      <div className="absolute inset-0 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-60 grayscale"
        >
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        {/* Overlay para suavizar la transición al negro del fondo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col px-6 md:px-12 lg:px-16 pb-12 lg:pb-16">
        <div className="flex-1" />

        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          {/* Left Column */}
          <div className="max-w-3xl">
            <AnimatedHeading 
              text={"Construyendo software\nque genera valor real."} 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 leading-tight"
            />
            
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-lg font-light">
                Desarrollador Full-stack especializado en SaaS, sistemas de gestión 
                y productos digitales que resuelven problemas de negocio.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000} className="flex flex-wrap gap-4">
              <Link to="/contacto" className="bg-white text-black px-8 py-3 rounded-lg font-medium transition-all hover:bg-gray-100 hover:scale-105 active:scale-95">
                Hablemos
              </Link>
              <Link to="/proyectos" className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium transition-all hover:bg-white hover:text-black">
                Ver Proyectos
              </Link>
            </FadeIn>
          </div>

          {/* Right Column */}
          <div className="mt-12 lg:mt-0 flex items-end justify-start lg:justify-end">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light tracking-widest uppercase text-white/70">
                  SaaS. Web Apps. Systems.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}