'use server';

import { contacto } from '@/content/site';

// ─────────────────────────────────────────────────────────────────────────────
// Server Action del formulario de contacto.
//
// La página sigue siendo estática: Next expone la acción como endpoint POST
// aparte, sin convertir la ruta en dinámica.
//
// Entrega: Resend. Si RESEND_API_KEY no está configurada, la acción **no
// finge** haber enviado nada — devuelve un estado explícito que la UI usa para
// ofrecer email y WhatsApp. Un formulario que dice "gracias" y tira el mensaje
// a la basura es peor que no tener formulario.
// ─────────────────────────────────────────────────────────────────────────────

export type EstadoFormulario = {
  estado: 'inicial' | 'ok' | 'error' | 'sin-configurar';
  mensaje?: string;
  /** Errores por campo, para describirlos con aria-describedby. */
  campos?: Partial<Record<'nombre' | 'email' | 'mensaje', string>>;
  /** Valores devueltos para no perder lo escrito cuando hay error. */
  valores?: Record<string, string>;
};

/** Perfil del visitante. Separa los dos recorridos desde el primer dato. */
const PERFILES = ['negocio', 'empleo', 'otro'] as const;
type Perfil = (typeof PERFILES)[number];

const ASUNTO: Record<Perfil, string> = {
  negocio: 'Consulta de negocio',
  empleo: 'Oportunidad laboral',
  otro: 'Consulta',
};

/** Tiempo mínimo plausible entre que se pinta el formulario y se envía. */
const MS_MINIMO_HUMANO = 3000;

const LIMITES = { nombre: 120, email: 200, mensaje: 5000, contexto: 2000 } as const;

function limpio(valor: FormDataEntryValue | null, max: number): string {
  return typeof valor === 'string' ? valor.trim().slice(0, max) : '';
}

/** Validación de email deliberadamente laxa: rechaza basura, no gente. */
function emailPlausible(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
}

export async function enviarConsulta(
  _previo: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  // ── Anti-spam sin captcha ────────────────────────────────────────────────
  // Sin servicio externo: no suma dependencia, no filtra datos del visitante
  // a un tercero y no rompe la promesa de analítica sin cookies.

  // 1. Honeypot: campo invisible que un humano nunca completa.
  if (limpio(datos.get('empresa_web'), 200) !== '') {
    // Se responde "ok" a propósito: un bot que sabe que falló, reintenta.
    return { estado: 'ok' };
  }

  // 2. Tiempo mínimo: los bots completan y envían de inmediato.
  const pintadoEn = Number(datos.get('pintado_en'));
  if (Number.isFinite(pintadoEn) && Date.now() - pintadoEn < MS_MINIMO_HUMANO) {
    return { estado: 'ok' };
  }

  // ── Validación ───────────────────────────────────────────────────────────
  const nombre = limpio(datos.get('nombre'), LIMITES.nombre);
  const email = limpio(datos.get('email'), LIMITES.email);
  const mensaje = limpio(datos.get('mensaje'), LIMITES.mensaje);
  const contexto = limpio(datos.get('contexto'), LIMITES.contexto);
  const perfilCrudo = limpio(datos.get('perfil'), 20);
  const perfil: Perfil = (PERFILES as readonly string[]).includes(perfilCrudo)
    ? (perfilCrudo as Perfil)
    : 'otro';

  const valores = { nombre, email, mensaje, contexto, perfil };
  const campos: EstadoFormulario['campos'] = {};

  if (nombre.length < 2) campos.nombre = 'Escribí tu nombre.';
  if (!emailPlausible(email)) campos.email = 'Revisá el email: no parece una dirección válida.';
  if (mensaje.length < 20) {
    campos.mensaje = 'Contame un poco más — con dos o tres frases alcanza.';
  }

  if (Object.keys(campos).length > 0) {
    return {
      estado: 'error',
      mensaje: 'Faltan datos para poder responderte.',
      campos,
      valores,
    };
  }

  // ── Entrega ──────────────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_EMAIL_DESTINO ?? contacto.email;
  const remitente = process.env.CONTACTO_EMAIL_REMITENTE;

  if (!apiKey || !remitente) {
    // Configuración incompleta: se dice, no se simula.
    console.warn(
      '[contacto] Formulario recibido pero sin transporte configurado. ' +
        'Faltan RESEND_API_KEY y/o CONTACTO_EMAIL_REMITENTE.',
    );
    return {
      estado: 'sin-configurar',
      mensaje:
        'El formulario todavía no tiene entrega configurada, así que tu mensaje no se envió.',
      valores,
    };
  }

  const cuerpo = [
    `Perfil: ${ASUNTO[perfil]}`,
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    contexto ? `Cómo trabaja hoy: ${contexto}` : null,
    '',
    mensaje,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: remitente,
        to: [destino],
        reply_to: email,
        subject: `${ASUNTO[perfil]} — ${nombre}`,
        text: cuerpo,
      }),
    });

    if (!res.ok) {
      console.error('[contacto] Resend respondió', res.status, await res.text());
      return {
        estado: 'error',
        mensaje: 'No pude enviar el mensaje. Probá por email o WhatsApp.',
        valores,
      };
    }
  } catch (e) {
    console.error('[contacto] Fallo de red al enviar', e);
    return {
      estado: 'error',
      mensaje: 'No pude enviar el mensaje. Probá por email o WhatsApp.',
      valores,
    };
  }

  return {
    estado: 'ok',
    mensaje: 'Listo, me llegó. Te respondo dentro de las próximas 24 horas hábiles.',
  };
}
