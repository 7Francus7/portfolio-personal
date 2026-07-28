import type { MetadataRoute } from 'next';
import { casos } from '@/content/cases';
import { urlConfigurada } from '@/lib/entorno';

/**
 * Sin dominio confirmado el sitemap sale **vacío**, no con URLs de localhost.
 * Un sitemap vacío es inerte; uno con localhost le enseña basura a los
 * crawlers y contamina Search Console apenas se conecte el dominio.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = urlConfigurada();
  if (!base) return [];

  const lastModified = new Date();

  const estaticas: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1, lastModified },
    { url: `${base}/proyectos`, changeFrequency: 'monthly', priority: 0.8, lastModified },
    { url: `${base}/en`, changeFrequency: 'monthly', priority: 0.8, lastModified },
    { url: `${base}/sobre-mi`, changeFrequency: 'yearly', priority: 0.6, lastModified },
    { url: `${base}/contacto`, changeFrequency: 'yearly', priority: 0.7, lastModified },
  ];

  const rutasCasos: MetadataRoute.Sitemap = casos.map((caso) => ({
    url: `${base}/casos/${caso.slug}`,
    changeFrequency: 'monthly',
    priority: caso.tier === 'principal' ? 0.9 : caso.tier === 'evolucion' ? 0.7 : 0.5,
    lastModified,
  }));

  return [...estaticas, ...rutasCasos];
}
