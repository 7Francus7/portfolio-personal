import type { Metadata } from 'next';
import { site } from '@/content/site';
import { baseMetadata, emiteMetadataAbsoluta, esIndexable } from '@/lib/entorno';

/**
 * Metadata compartida.
 *
 * Regla dura: sin dominio público confirmado NO se emite canonical ni
 * `openGraph.url`. Antes esos campos apuntaban a `http://localhost:3000`,
 * que es peor que omitirlos — le enseña a validadores sociales y crawlers
 * una URL que no existe.
 *
 * La indexación la gobierna `lib/entorno.ts`: producción + dominio + opt-in.
 */

export type Idioma = 'es' | 'en';

const LOCALE: Record<Idioma, string> = { es: 'es_AR', en: 'en_US' };

export function metadataBase(): Metadata {
  const absoluta = emiteMetadataAbsoluta();

  return {
    metadataBase: new URL(baseMetadata()),
    title: {
      default: `${site.nombre} — ${site.propuesta}`,
      template: `%s — ${site.nombre}`,
    },
    description: site.descripcionMeta,
    robots: esIndexable()
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    ...(absoluta ? { alternates: { canonical: '/' } } : {}),
    openGraph: {
      type: 'website',
      siteName: site.nombre,
      locale: LOCALE.es,
      title: `${site.nombre} — ${site.propuesta}`,
      description: site.descripcionMeta,
      ...(absoluta ? { url: '/' } : {}),
      images: [{ url: '/og.png', width: 1200, height: 630, alt: site.nombre }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.nombre} — ${site.propuesta}`,
      description: site.descripcionMeta,
      images: ['/og.png'],
    },
  };
}

export function metadataRuta(opts: {
  titulo: string;
  descripcion: string;
  ruta: string;
  /** Nombre del OG por ruta en /public/og (sin extensión). Omitir usa el base. */
  og?: string;
  /** Idioma del documento. Gobierna el locale de Open Graph. */
  idioma?: Idioma;
  /** Rutas equivalentes por idioma. Emite hreflang solo si hay dominio. */
  alterna?: { es?: string; en?: string };
}): Metadata {
  const absoluta = emiteMetadataAbsoluta();
  const idioma = opts.idioma ?? 'es';

  const imagen = opts.og
    ? [
        {
          url: `/og/${opts.og}.png`,
          width: 1200,
          height: 630,
          alt: `${opts.titulo} — ${site.nombre}`,
        },
      ]
    : undefined;

  // hreflang solo tiene sentido con URLs absolutas resolubles.
  const alternates = absoluta
    ? {
        canonical: opts.ruta,
        ...(opts.alterna
          ? {
              languages: {
                ...(opts.alterna.es ? { es: opts.alterna.es } : {}),
                ...(opts.alterna.en ? { en: opts.alterna.en } : {}),
                'x-default': opts.alterna.es ?? opts.ruta,
              },
            }
          : {}),
      }
    : undefined;

  return {
    title: opts.titulo,
    description: opts.descripcion,
    ...(alternates ? { alternates } : {}),
    openGraph: {
      title: `${opts.titulo} — ${site.nombre}`,
      description: opts.descripcion,
      locale: LOCALE[idioma],
      ...(absoluta ? { url: opts.ruta } : {}),
      ...(imagen ? { images: imagen } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${opts.titulo} — ${site.nombre}`,
      description: opts.descripcion,
      ...(imagen ? { images: imagen.map((i) => i.url) } : {}),
    },
  };
}
