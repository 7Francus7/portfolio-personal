'use client';

import Link from 'next/link';
import type { Evento, PropsEvento } from '@/lib/analitica';
import { registrar } from '@/lib/analitica';

/**
 * Enlace que registra un evento de conversión al hacer click.
 *
 * Es el único punto donde se instrumenta la navegación: mantiene los eventos
 * fuera de los Server Components (que no pueden tener handlers) sin convertir
 * páginas enteras en componentes cliente por un solo onClick.
 */
export function EnlaceMedido({
  href,
  evento,
  props,
  externo,
  children,
  ...resto
}: {
  href: string;
  evento: Evento;
  props?: PropsEvento;
  externo?: boolean;
  children: React.ReactNode;
  className?: string;
  lang?: string;
}) {
  const onClick = () => registrar(evento, props);

  if (externo || href.startsWith('mailto:') || href.startsWith('http')) {
    return (
      <a
        href={href}
        onClick={onClick}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...resto}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} {...resto}>
      {children}
    </Link>
  );
}
