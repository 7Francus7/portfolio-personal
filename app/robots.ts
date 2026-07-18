import type { MetadataRoute } from 'next';
import { INDEXABLE, SITE_URL } from '@/content/site';

/**
 * Mientras el dominio definitivo no esté confirmado (doc 10 §6), ninguna
 * preview es indexable: se bloquea todo salvo que NEXT_PUBLIC_INDEXABLE=true.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
