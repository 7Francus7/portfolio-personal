'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navegacion, site } from '@/content/site';

/**
 * Header liviano: marca + tres enlaces. En mobile, menú overlay accesible
 * (Escape cierra, foco vuelve al botón, scroll de fondo bloqueado).
 * Único componente cliente estructural del sitio.
 */
export function Header() {
  const [abierto, setAbierto] = useState(false);
  const botonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAbierto(false);
        botonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    panelRef.current?.querySelector('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [abierto]);

  const esActiva = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="hairline-b sticky top-0 z-(--z-header) bg-paper/95 backdrop-blur-sm">
      <div className="container-editorial flex h-16 items-center justify-between">
        <Link href="/" className="tap-target font-serif-display text-xl leading-none">
          {site.nombre}
        </Link>

        {/* Desktop */}
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {navegacion.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={esActiva(item.href) ? 'page' : undefined}
              className={`tap-target text-sm ${
                esActiva(item.href)
                  ? 'font-medium text-ink underline decoration-clay underline-offset-8'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile */}
        <button
          ref={botonRef}
          type="button"
          className="tap-target label-mono min-w-11 justify-end label-ink md:hidden"
          aria-expanded={abierto}
          aria-controls={menuId}
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? 'Cerrar' : 'Menú'}
        </button>
      </div>

      {abierto && (
        <div
          ref={panelRef}
          id={menuId}
          className="hairline-t absolute inset-x-0 top-full z-(--z-menu) h-[calc(100dvh-4rem)] overflow-y-auto bg-paper md:hidden"
        >
          <nav aria-label="Principal (móvil)" className="container-editorial flex flex-col py-8">
            {navegacion.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={esActiva(item.href) ? 'page' : undefined}
                onClick={() => setAbierto(false)}
                className="hairline-b py-5 font-serif-display text-3xl text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
