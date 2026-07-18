import type { MetadataRoute } from 'next';
import { casos } from '@/content/cases';
import { SITE_URL } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas = ['', '/proyectos', '/sobre-mi', '/contacto'].map((ruta) => ({
    url: `${SITE_URL}${ruta}`,
    changeFrequency: 'monthly' as const,
    priority: ruta === '' ? 1 : 0.7,
  }));

  const rutasCasos = casos.map((caso) => ({
    url: `${SITE_URL}/casos/${caso.slug}`,
    changeFrequency: 'monthly' as const,
    priority: caso.tipo === 'completo' ? 0.9 : 0.6,
  }));

  return [...estaticas, ...rutasCasos];
}
