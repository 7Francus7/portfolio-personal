import { Link } from 'react-router-dom';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.287-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.771v20.451C0 23.227.792 24 1.771 24h20.451C23.227 24 24 23.227 24 22.228V1.771C24 .774 23.226 0 22.225 0h.003z"/>
  </svg>
);

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/7Francus7', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/franco-dellorsi/', icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="bg-black py-20 px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <Link to="/" className="text-2xl font-semibold tracking-tight text-white mb-6 block">
              Franco<span className="text-white/40">.</span>
            </Link>
            <p className="text-white/40 max-w-sm font-light leading-relaxed">
              Dedicado a la ingeniería de productos digitales que combinan 
              rendimiento extremo con diseño minimalista.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end justify-between gap-8">
            <div className="flex gap-10">
              <Link to="/proyectos" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Archive</Link>
              <Link to="/sobre-mi" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Story</Link>
              <Link to="/contacto" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Contact</Link>
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all"
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">
            © {new Date().getFullYear()} Handcrafted by Franco
          </p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">
            Built with React & Precision
          </p>
        </div>
      </div>
    </footer>
  );
}