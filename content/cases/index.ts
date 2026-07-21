import type { Caso, CasoSlug } from '../types';
import { soderiaNico } from './soderia-nico';
import { trackium } from './trackium';
import { zentro } from './zentro';
import { courtops } from './courtops';
import { doleth } from './doleth';

/**
 * Orden = jerarquía definitiva de proyectos (doc 04, Alternativa C).
 * Este orden gobierna toda superficie: home, /proyectos, navegación entre
 * casos y sitemap. No reordenar.
 */
export const casos: Caso[] = [soderiaNico, trackium, zentro, courtops, doleth];

export const casosPorSlug: Record<CasoSlug, Caso> = {
  'soderia-nico': soderiaNico,
  trackium,
  zentro,
  courtops,
  doleth,
};

export function getCaso(slug: string): Caso | undefined {
  return (casosPorSlug as Record<string, Caso>)[slug];
}

/** Caso siguiente según la jerarquía, circular (doc 05 §3). */
export function casoSiguiente(slug: CasoSlug): Caso {
  const i = casos.findIndex((c) => c.slug === slug);
  const next = casos[(i + 1) % casos.length];
  if (!next) throw new Error(`Caso no encontrado: ${slug}`);
  return next;
}
