import Link from 'next/link';
import { casos } from '@/content/cases';
import { contacto, navegacion, site } from '@/content/site';

export function Footer() {
  return (
    <footer className="hairline-t bg-paper-dim">
      <div className="container-editorial grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif-display text-2xl">{site.nombre}</p>
          <p className="mt-3 max-w-xs text-sm text-ink-mute">
            Entiendo cómo funciona un negocio antes de escribir código.
          </p>
          <p className="label-mono mt-4">{site.ubicacion}</p>
        </div>

        <nav aria-label="Mapa del sitio" className="grid grid-cols-2 gap-8 text-sm">
          <ul className="space-y-2">
            <li>
              <Link href="/" className="link-editorial">
                Inicio
              </Link>
            </li>
            {navegacion.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-editorial">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {casos.map((caso) => (
              <li key={caso.slug}>
                <Link href={`/casos/${caso.slug}`} className="link-editorial">
                  {caso.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-2 text-sm">
          <li>
            <a href={`mailto:${contacto.email}`} className="link-editorial">
              {contacto.email}
            </a>
          </li>
          <li>
            <a href={contacto.whatsapp} target="_blank" rel="noopener noreferrer" className="link-editorial">
              WhatsApp
            </a>
          </li>
          <li>
            <a href={contacto.linkedin} target="_blank" rel="noopener noreferrer" className="link-editorial">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={contacto.github} target="_blank" rel="noopener noreferrer" className="link-editorial">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className="hairline-t">
        <div className="container-editorial flex items-center justify-between py-5">
          <p className="label-mono">© {new Date().getFullYear()} {site.nombre}</p>
          <p className="label-mono">Hecho en Argentina</p>
        </div>
      </div>
    </footer>
  );
}
