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
    <section className="surface-band px-6 py-24 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-6">
              Criterio
            </p>
            <h2 className="text-4xl md:text-6xl font-normal tracking-tighter leading-none text-white">
              Construir menos cosas. <br />
              <span className="text-white/40 italic">Mejor pensadas.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base font-light leading-relaxed text-white/45 lg:text-right">
            Cada decisión de producto baja a tres principios. Sin humo, sin
            pantallas de relleno.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-3">
          {notes.map((note, i) => (
            <article
              key={note.title}
              className="group surface-card p-8 transition-colors duration-500 hover:bg-white/[0.04]"
            >
              <span className="font-display text-sm font-bold text-white/25 transition-colors group-hover:text-white">
                0{i + 1}
              </span>
              <h3 className="mt-8 text-xl font-medium text-white">{note.title}</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-white/45">
                {note.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
