// ─────────────────────────────────────────────────────────────────────────────
// Analítica respetuosa de la privacidad.
//
// Elección: **Plausible self-hostable / cloud** vía script liviano.
//   · Sin cookies ⇒ sin banner de consentimiento (no hay dato personal que
//     consentir), lo que además evita el CLS y la fricción de un modal.
//   · ~1 KB contra ~45 KB de GA4.
//   · No hace fingerprinting ni perfila entre sitios.
//   · Los datos quedan en la UE / en infraestructura propia.
//
// Se activa solo con NEXT_PUBLIC_ANALYTICS_DOMAIN definido. Sin esa variable
// no se inyecta ningún script — local y CI quedan limpios.
//
// El catálogo de eventos es cerrado y tipado a propósito: un evento que no
// esté acá no se puede emitir, así el panel no se llena de nombres sueltos.
// ─────────────────────────────────────────────────────────────────────────────

/** Catálogo cerrado de eventos de conversión. */
export const EVENTOS = {
  /** Click en cualquier CTA que lleva al formulario. Prop: `origen`. */
  ctaContacto: 'cta_contacto',
  /** Click en un CTA del recorrido de empleo. Prop: `origen`. */
  ctaRecruiter: 'cta_recruiter',
  /** Envío del formulario aceptado por el servidor. Prop: `tipo`. */
  formularioEnviado: 'formulario_enviado',
  /** El formulario falló. Prop: `motivo`. */
  formularioError: 'formulario_error',
  /** Click en email, WhatsApp o LinkedIn. Prop: `medio`. */
  contactoDirecto: 'contacto_directo',
  /** Apertura de una demo pública externa. Prop: `proyecto`. */
  demoAbierta: 'demo_abierta',
  /** Intento de descargar el CV. Prop: `estado` (disponible | bloqueado). */
  cvDescarga: 'cv_descarga',
} as const;

export type Evento = (typeof EVENTOS)[keyof typeof EVENTOS];

/** Propiedades permitidas: strings cortos, nunca datos personales. */
export type PropsEvento = Record<string, string>;

declare global {
  interface Window {
    plausible?: (evento: string, opciones?: { props?: PropsEvento }) => void;
  }
}

/** Dominio configurado para analítica. `undefined` ⇒ analítica apagada. */
export function dominioAnalitica(): string | undefined {
  return process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN?.trim() || undefined;
}

/**
 * Emite un evento. Silencioso y seguro si la analítica está apagada,
 * si el script no cargó (bloqueador) o si corre en el servidor.
 */
export function registrar(evento: Evento, props?: PropsEvento): void {
  if (typeof window === 'undefined') return;
  window.plausible?.(evento, props ? { props } : undefined);
}
