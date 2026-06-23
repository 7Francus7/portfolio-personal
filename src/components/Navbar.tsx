import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Sobre mí', to: '/sobre-mi' },
  // Removido 'Contacto' de aquí porque ya está el botón 'Hablemos' a la derecha
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 pt-6">
        <div className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="text-2xl font-semibold tracking-tight text-white flex items-center gap-1 group">
            Franco<span className="text-white/40">.</span>
          </Link>

          {/* Center: Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-white/70 hover:text-white transition-colors font-light tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              to="/contacto"
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_-5px_rgba(255,255,255,0.2)]"
            >
              Hablemos
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-2xl text-white font-light hover:text-gray-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="mt-4 bg-white text-black px-8 py-3 rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              Hablemos
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
