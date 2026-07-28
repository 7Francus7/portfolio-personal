'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navegacion, site } from '@/content/site';
import { EVENTOS, registrar } from '@/lib/analitica';

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

    const panel = panelRef.current;
    const foco = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).filter((el) => el.offsetParent !== null);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAbierto(false);
        botonRef.current?.focus();
        return;
      }
      // Focus trap: sin esto, Tab se escapaba del panel hacia el contenido de
      // atrás, que sigue visible para el lector de pantalla.
      if (e.key !== 'Tab') return;
      const items = foco();
      if (items.length === 0) return;
      const primero = items[0]!;
      const ultimo = items[items.length - 1]!;
      const activo = document.activeElement;
      if (e.shiftKey && (activo === primero || activo === botonRef.current)) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && activo === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    foco()[0]?.focus();

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
          <Link
            href="/en"
            lang="en"
            hrefLang="en"
            aria-current={esActiva('/en') ? 'page' : undefined}
            className="tap-target label-mono hover:label-ink"
          >
            EN
          </Link>
          {/* CTA persistente: el elemento más visto del sitio no puede ser
              solo tres links de texto. Único destino de conversión del header. */}
          <Link
            href="/contacto"
            onClick={() => registrar(EVENTOS.ctaContacto, { origen: 'header' })}
            className="inline-flex min-h-9 items-center border border-ink px-4 text-sm font-medium hover:bg-ink hover:text-paper"
          >
            Trabajemos juntos
          </Link>
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
            <Link
              href="/en"
              lang="en"
              onClick={() => setAbierto(false)}
              className="hairline-b py-5 font-serif-display text-3xl text-ink"
            >
              English
            </Link>
            <Link
              href="/contacto"
              onClick={() => {
                registrar(EVENTOS.ctaContacto, { origen: 'menu-movil' });
                setAbierto(false);
              }}
              className="mt-8 inline-flex min-h-12 items-center justify-center border border-ink bg-ink px-6 text-sm font-medium text-paper"
            >
              Trabajemos juntos
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
