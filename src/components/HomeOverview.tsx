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
    <section className="surface-band px-6 py-28 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-6">
            Criterio
          </p>
          <h2 className="text-4xl md:text-6xl font-normal tracking-tighter leading-none text-white">
            Construir menos cosas. <br />
            <span className="text-white/40 italic">Mejor pensadas.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-3">
          {notes.map((note) => (
            <article key={note.title} className="surface-card p-8">
              <h3 className="text-xl font-medium text-white">{note.title}</h3>
              <p className="mt-5 text-sm font-light leading-relaxed text-white/40">
                {note.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
