import type { Caso, CasoSlug, Tier } from '../types';
import { soderiaNico } from './soderia-nico';
import { trackium } from './trackium';
import { zentro } from './zentro';
import { courtops } from './courtops';
import { doleth } from './doleth';

/**
 * Orden canónico: primero por tier, después por peso dentro del tier.
 * Gobierna toda superficie —home, /proyectos, navegación entre casos y
 * sitemap— para que la jerarquía sea una sola y no se contradiga entre
 * páginas.
 */
export const casos: Caso[] = [soderiaNico, courtops, trackium, zentro, doleth];

/** Casos de un tier, en el orden canónico. */
export function casosPorTier(tier: Tier): Caso[] {
  return casos.filter((c) => c.tier === tier);
}

/** Los tres tiers en orden de presentación, sin los que quedaron vacíos. */
export const TIERS_ORDEN: Tier[] = ['principal', 'evolucion', 'exploracion'];

export function tiersConCasos(): { tier: Tier; casos: Caso[] }[] {
  return TIERS_ORDEN.map((tier) => ({ tier, casos: casosPorTier(tier) })).filter(
    (g) => g.casos.length > 0,
  );
}

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
