import type { Metadata } from 'next';
import { SITE_URL, INDEXABLE, site } from '@/content/site';

/**
 * Metadata base compartida. La URL pública se centraliza en SITE_URL
 * (configurable por entorno); mientras el dominio definitivo no esté
 * confirmado, las previews no son indexables (robots noindex + robots.txt).
 */
export function metadataBase(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${site.nombre} — ${site.propuesta}`,
      template: `%s — ${site.nombre}`,
    },
    description: site.descripcionMeta,
    robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      siteName: site.nombre,
      locale: 'es_AR',
      title: `${site.nombre} — ${site.propuesta}`,
      description: site.descripcionMeta,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: site.nombre }],
    },
  };
}

export function metadataRuta(opts: { titulo: string; descripcion: string; ruta: string }): Metadata {
  return {
    title: opts.titulo,
    description: opts.descripcion,
    alternates: { canonical: opts.ruta },
    openGraph: {
      title: `${opts.titulo} — ${site.nombre}`,
      description: opts.descripcion,
      url: opts.ruta,
    },
  };
}
