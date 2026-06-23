import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const highlights = [
  { value: '15+', label: 'sistemas desplegados' },
  { value: '04+', label: 'años construyendo producto' },
  { value: '2026', label: 'foco en SaaS operativo' },
];

const focusAreas = [
  'Reservas y turnos',
  'Backoffice interno',
  'POS y caja',
  'Dashboards de operación',
];

export function HomeOverview() {
  return (
    <section className="bg-black px-6 py-28 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-6">
            Trabajo actual
          </p>
          <h2 className="text-4xl md:text-6xl font-normal tracking-tighter leading-none text-white max-w-3xl">
            Software sobrio para negocios que necesitan ordenar operación.
          </h2>
          <p className="mt-8 max-w-2xl text-lg text-white/45 font-light leading-relaxed">
            Diseño y desarrollo herramientas web para tareas concretas: vender, reservar,
            cobrar, medir y administrar sin depender de planillas sueltas.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-white/50"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5">
          {highlights.map((item) => (
            <div key={item.label} className="bg-black p-8">
              <p className="text-4xl font-light tracking-tighter text-white">{item.value}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/35 font-bold">
                {item.label}
              </p>
            </div>
          ))}
          <Link
            to="/sobre-mi"
            className="group flex items-center justify-between bg-white px-8 py-6 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            Ver enfoque
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
