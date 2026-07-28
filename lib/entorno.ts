// ─────────────────────────────────────────────────────────────────────────────
// Política de publicación por entorno.
//
// Regla madre (decisión Franco, 2026-07-28): el sitio solo es indexable cuando
// corre en producción CON un dominio real confirmado. Cualquier otro entorno
// —preview, localhost, CI, o producción mal configurada— es noindex y nunca
// emite canonical ni Open Graph hacia localhost.
//
// Este módulo es la única fuente de verdad sobre esas tres preguntas:
//   1. ¿Cuál es la URL pública? (o ninguna)
//   2. ¿Es indexable?
//   3. ¿Se puede emitir metadata absoluta?
// ─────────────────────────────────────────────────────────────────────────────

/** URL de fallback para desarrollo. Nunca debe llegar a metadata pública. */
const FALLBACK_LOCAL = 'http://localhost:3000';

/**
 * Fase del despliegue. `VERCEL_ENV` la provee Vercel automáticamente
 * ('production' | 'preview' | 'development'); fuera de Vercel se infiere
 * de NODE_ENV.
 */
export type Fase = 'production' | 'preview' | 'development';

export function fase(): Fase {
  const vercel = process.env.VERCEL_ENV;
  if (vercel === 'production' || vercel === 'preview' || vercel === 'development') {
    return vercel;
  }
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

/**
 * Valida que una URL sirva como base pública real.
 * Rechaza: vacío, no-URL, http en producción, localhost/127.0.0.1/.local,
 * y hosts sin punto (no son dominios registrables).
 */
export function urlPublicaValida(valor: string | undefined): valor is string {
  if (!valor) return false;
  let u: URL;
  try {
    u = new URL(valor);
  } catch {
    return false;
  }
  if (u.protocol !== 'https:') return false;
  const host = u.hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1' || host === '::1') return false;
  if (host.endsWith('.local') || host.endsWith('.localhost')) return false;
  if (!host.includes('.')) return false;
  return true;
}

/** URL configurada, sin barra final. `undefined` si no es válida. */
export function urlConfigurada(): string | undefined {
  const bruto = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '');
  return urlPublicaValida(bruto) ? bruto : undefined;
}

/**
 * ¿Hay dominio real confirmado? Es la precondición de todo lo demás:
 * sin esto no hay indexación, ni canonical, ni OG absolutos, ni sitemap.
 */
export function tieneDominio(): boolean {
  return urlConfigurada() !== undefined;
}

/**
 * Indexable solo si: fase producción + dominio válido + opt-in explícito.
 * Las tres condiciones son necesarias. Un preview con el flag prendido por
 * error sigue siendo noindex porque su fase no es producción.
 */
export function esIndexable(): boolean {
  return (
    fase() === 'production' &&
    tieneDominio() &&
    process.env.NEXT_PUBLIC_INDEXABLE === 'true'
  );
}

/**
 * Base para `metadataBase`. En entornos sin dominio devuelve localhost —
 * pero como `esIndexable()` es false, Next no emite canonical y las páginas
 * salen `noindex`. Ver `emiteMetadataAbsoluta()`.
 */
export function baseMetadata(): string {
  return urlConfigurada() ?? FALLBACK_LOCAL;
}

/**
 * ¿Se pueden emitir canonical y OG absolutos? Solo con dominio real.
 * Sin esto, `lib/seo.ts` omite `alternates.canonical` y `openGraph.url`
 * en lugar de apuntarlos a localhost.
 */
export function emiteMetadataAbsoluta(): boolean {
  return tieneDominio();
}

/**
 * Diagnóstico legible para el chequeo de build y para la documentación.
 */
export function diagnostico() {
  const url = urlConfigurada();
  return {
    fase: fase(),
    urlConfigurada: url ?? null,
    valorCrudo: process.env.NEXT_PUBLIC_SITE_URL?.trim() || null,
    tieneDominio: tieneDominio(),
    flagIndexable: process.env.NEXT_PUBLIC_INDEXABLE === 'true',
    esIndexable: esIndexable(),
    emiteMetadataAbsoluta: emiteMetadataAbsoluta(),
  };
}
