'use client';

import { useActionState, useEffect, useId, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { enviarConsulta, type EstadoFormulario } from '@/app/contacto/acciones';
import { contacto } from '@/content/site';
import { EVENTOS, registrar } from '@/lib/analitica';

const INICIAL: EstadoFormulario = { estado: 'inicial' };

/** Botón separado para poder leer `useFormStatus` del form padre. */
function Enviar() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center border border-ink bg-ink px-6 text-sm font-medium text-paper hover:border-clay-deep hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Enviando…' : 'Enviar consulta'}
    </button>
  );
}

/**
 * Formulario de contacto.
 *
 * Accesibilidad: cada error se asocia al campo con aria-describedby y
 * aria-invalid; el resultado vive en una región aria-live para que un lector
 * de pantalla lo anuncie sin mover el foco de golpe; el estado de envío
 * deshabilita el botón y cambia su texto (no solo un spinner).
 *
 * Anti-spam: honeypot + marca de tiempo. Ver app/contacto/acciones.ts.
 */
export function FormularioContacto() {
  const [estado, accion] = useActionState(enviarConsulta, INICIAL);
  const resultadoRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (estado.estado === 'inicial') return;
    if (estado.estado === 'ok') {
      registrar(EVENTOS.formularioEnviado, { tipo: 'contacto' });
    } else {
      registrar(EVENTOS.formularioError, { motivo: estado.estado });
    }
    resultadoRef.current?.focus();
  }, [estado]);

  const v = estado.valores ?? {};
  const err = estado.campos ?? {};
  const campoId = (n: string) => `${id}-${n}`;
  const errorId = (n: string) => `${id}-${n}-error`;

  if (estado.estado === 'ok') {
    return (
      <div
        ref={resultadoRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="border-l-2 border-clay pl-6"
      >
        <p className="font-serif-display text-(length:--text-heading) leading-snug">
          Gracias. Me llegó.
        </p>
        <p className="mt-4 max-w-(--container-prose) leading-relaxed text-ink-soft">
          {estado.mensaje}
        </p>
      </div>
    );
  }

  return (
    <form action={accion} className="max-w-2xl" noValidate>
      {/* Honeypot: fuera de pantalla, sin tabindex y oculto a lectores. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={campoId('empresa_web')}>No completar este campo</label>
        <input
          id={campoId('empresa_web')}
          type="text"
          name="empresa_web"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {/* Marca de tiempo del montaje. Se escribe por ref y no por estado:
          en el HTML prerenderizado sería la hora del build, y un setState en
          effect provocaría un render en cascada al hidratar. */}
      <input
        type="hidden"
        name="pintado_en"
        ref={(el) => {
          if (el && !el.value) el.value = String(Date.now());
        }}
      />

      <fieldset className="mb-8">
        <legend className="label-mono mb-4">¿Desde dónde escribís?</legend>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {[
            { valor: 'negocio', etiqueta: 'Tengo un negocio para ordenar' },
            { valor: 'empleo', etiqueta: 'Busco sumar a alguien a un equipo' },
            { valor: 'otro', etiqueta: 'Otra cosa' },
          ].map((o) => (
            <label key={o.valor} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="perfil"
                value={o.valor}
                defaultChecked={(v.perfil ?? 'negocio') === o.valor}
                className="accent-clay"
              />
              {o.etiqueta}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 md:grid-cols-2">
        <Campo
          id={campoId('nombre')}
          errorId={errorId('nombre')}
          name="nombre"
          label="Nombre"
          autoComplete="name"
          defaultValue={v.nombre}
          error={err.nombre}
        />
        <Campo
          id={campoId('email')}
          errorId={errorId('email')}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          defaultValue={v.email}
          error={err.email}
        />
      </div>

      <div className="mt-6">
        <Campo
          id={campoId('contexto')}
          errorId={errorId('contexto')}
          name="contexto"
          label="¿Cómo trabajan hoy?"
          ayuda="Papel, planillas, WhatsApp, algún sistema. Opcional, pero ayuda mucho."
          defaultValue={v.contexto}
          opcional
        />
      </div>

      <div className="mt-6">
        <Campo
          id={campoId('mensaje')}
          errorId={errorId('mensaje')}
          name="mensaje"
          label="¿Qué necesitás resolver?"
          textarea
          defaultValue={v.mensaje}
          error={err.mensaje}
        />
      </div>

      {/* Región de resultado: anunciada sin robar el foco de golpe. */}
      <div
        ref={resultadoRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="mt-6 empty:mt-0"
      >
        {estado.estado === 'error' && estado.mensaje ? (
          <p className="border-l-2 border-clay pl-4 text-sm text-ink-soft">{estado.mensaje}</p>
        ) : null}
        {estado.estado === 'sin-configurar' ? (
          <div className="border-l-2 border-clay pl-4 text-sm text-ink-soft">
            <p>{estado.mensaje}</p>
            <p className="mt-2">
              Escribime directo a{' '}
              <a href={`mailto:${contacto.email}`} className="link-editorial">
                {contacto.email}
              </a>{' '}
              o{' '}
              <a
                href={contacto.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="link-editorial"
              >
                por WhatsApp
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Enviar />
        <a
          href={`mailto:${contacto.email}`}
          onClick={() => registrar(EVENTOS.contactoDirecto, { medio: 'email' })}
          className="tap-target link-editorial text-sm"
        >
          O escribime a {contacto.email}
        </a>
      </div>
    </form>
  );
}

function Campo({
  id,
  errorId,
  name,
  label,
  ayuda,
  error,
  textarea,
  opcional,
  ...resto
}: {
  id: string;
  errorId: string;
  name: string;
  label: string;
  ayuda?: string;
  error?: string;
  textarea?: boolean;
  opcional?: boolean;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  const ayudaId = `${id}-ayuda`;
  const describedBy = [error ? errorId : null, ayuda ? ayudaId : null].filter(Boolean).join(' ');

  const clases = `mt-2 w-full border bg-paper px-3 py-2.5 text-base ${
    error ? 'border-clay' : 'border-line-strong'
  }`;

  return (
    <div>
      <label htmlFor={id} className="label-mono">
        {label}
        {opcional ? ' · opcional' : ''}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={6}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={clases}
          {...resto}
        />
      ) : (
        <input
          id={id}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={clases}
          {...resto}
        />
      )}
      {ayuda ? (
        <p id={ayudaId} className="mt-2 text-sm text-ink-mute">
          {ayuda}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-clay">
          {error}
        </p>
      ) : null}
    </div>
  );
}
