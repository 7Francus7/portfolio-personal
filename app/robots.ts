import type { MetadataRoute } from 'next';
import { esIndexable, urlConfigurada } from '@/lib/entorno';

/**
 * Indexación gobernada por entorno (`lib/entorno.ts`): hacen falta las tres
 * condiciones —fase producción, dominio real y opt-in explícito— para permitir
 * crawling. Preview, localhost y producción mal configurada quedan bloqueados.
 *
 * El sitemap solo se anuncia si existe una URL absoluta real que anunciar.
 */
export default function robots(): MetadataRoute.Robots {
  const base = urlConfigurada();

  if (!esIndexable() || !base) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
