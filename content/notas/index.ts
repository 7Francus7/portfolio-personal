import type { Nota } from './tipos';
import { soderiaPapelASoftware } from './soderia-papel-a-software';
import { cuentasComoMovimientos } from './cuentas-como-movimientos';
import { softwareParaOperaciones } from './software-para-operaciones';

/** Todas las notas, publicadas y borradores. */
export const notas: Nota[] = [
  soderiaPapelASoftware,
  cuentasComoMovimientos,
  softwareParaOperaciones,
];

/**
 * Los borradores solo se renderizan con NEXT_PUBLIC_SHOW_DRAFTS=true, que
 * jamás debe estar activo en producción. En cualquier otro entorno /notas no
 * expone nada: la arquitectura queda lista y el contenido espera a que los
 * datos pendientes estén relevados.
 */
export function mostrarBorradores(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true';
}

export function notasVisibles(): Nota[] {
  return notas.filter((n) => n.estado === 'publicada' || mostrarBorradores());
}

export function notasPublicadas(): Nota[] {
  return notas.filter((n) => n.estado === 'publicada');
}

export function getNota(slug: string): Nota | undefined {
  return notasVisibles().find((n) => n.slug === slug);
}
