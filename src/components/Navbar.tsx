import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Sobre mí', to: '/sobre-mi' },
  { label: 'Contacto', to: '/contacto' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-paper/80 backdrop-blur-md border-b border-[var(--color-line-strong)]' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12 lg:px-16">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3" aria-label="Franco Dellorsi — Inicio">
            <img src="/logo.png" alt="" className="h-7 w-auto transition-transform group-hover:-translate-y-0.5" />
            <span className="font-serif-display text-2xl text-ink">Franco Dellorsi</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.to;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={`label-mono transition-colors ${
                    active ? '!text-ink' : 'hover:!text-ink'
                  }`}
                >
                  <span className={active ? 'text-accent' : 'text-ink-faint'}>/</span> {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="p-1 text-ink md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-paper md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                aria-current={pathname === link.to ? 'page' : undefined}
                className={`font-serif-display text-4xl transition-colors ${
                  pathname === link.to ? 'text-accent' : 'text-ink hover:text-accent'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
