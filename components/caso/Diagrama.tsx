/**
 * Diagrama antes → después. Tipográfico y semántico: dos listas y una flecha.
 * Sin librerías, sin SVG decorativo — funciona en cualquier viewport y lector
 * de pantalla.
 */
export function Diagrama({ antes, despues }: { antes: string[]; despues: string[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <div className="border border-line p-6">
        <p className="label-mono mb-4">Antes</p>
        <ul className="flex flex-wrap gap-2">
          {antes.map((nodo) => (
            <li
              key={nodo}
              className="border border-dashed border-line-strong px-3 py-1.5 text-sm text-ink-mute"
            >
              {nodo}
            </li>
          ))}
        </ul>
      </div>
      <p aria-hidden="true" className="text-center font-serif-display text-3xl text-clay">
        →
      </p>
      <span className="sr-only">se convierte en</span>
      <div className="border border-ink p-6">
        <p className="label-mono mb-4 label-ink">Después</p>
        <ul className="flex flex-wrap gap-2">
          {despues.map((nodo) => (
            <li key={nodo} className="border border-ink px-3 py-1.5 text-sm text-ink">
              {nodo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
