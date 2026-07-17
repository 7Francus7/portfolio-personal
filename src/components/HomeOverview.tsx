const notes = [
  {
    title: 'Producto antes que pantalla',
    text: 'Primero entiendo cómo trabaja el negocio. Después diseño el flujo.',
  },
  {
    title: 'Interfaz sin teatro',
    text: 'Menos ornamento. Más lectura rápida, menos pasos, estados claros.',
  },
  {
    title: 'Código que se puede tocar',
    text: 'Estructura simple, componentes mantenibles y deploy sin misterio.',
  },
];

export function HomeOverview() {
  return (
    <section className="surface-band border-t border-[var(--color-line-strong)] px-6 py-28 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="label-mono mb-6">/ Criterio</p>
            <h2 className="font-serif-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl">
              Construir menos cosas.<br />
              <span className="italic text-accent">Mejor pensadas.</span>
            </h2>
          </div>
          <p className="max-w-sm font-light leading-relaxed text-ink-mute lg:text-right">
            Cada decisión de producto baja a tres principios. Sin humo, sin
            pantallas de relleno.
          </p>
        </div>

        <div className="mt-16 grid border-t border-[var(--color-line-strong)] md:grid-cols-3">
          {notes.map((note, i) => (
            <article
              key={note.title}
              className="border-b border-[var(--color-line-strong)] py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:last:border-r-0 md:[&:first-child]:pl-0"
            >
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-8 font-serif-display text-2xl text-ink">{note.title}</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-ink-mute">
                {note.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
