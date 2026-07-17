import profileImg from '../assets/profile.jpg';

export function About() {
  return (
    <section className="surface-band overflow-hidden px-6 py-32 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div>
            <p className="label-mono mb-8">/ Enfoque</p>
            <h3 className="mb-10 font-serif-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl">
              Menos ruido, <br />
              <span className="italic text-accent">más sistema útil.</span>
            </h3>

            <div className="space-y-6 text-lg font-light leading-relaxed text-ink-mute">
              <p>
                No me interesa hacer pantallas para decorar. Me interesa construir
                <span className="font-normal text-ink"> herramientas que ordenan trabajo</span>: menos pasos manuales,
                menos confusión y más control sobre lo que pasa.
              </p>
              <p>
                Mezclo criterio de producto con desarrollo full-stack. Diseño el flujo,
                escribo el código y cuido que el sistema quede claro para quien lo usa todos los días.
              </p>
            </div>

            <div className="mt-12 grid max-w-sm grid-cols-2 gap-8 border-t border-[var(--color-line-strong)] pt-8">
              <div>
                <span className="font-serif-display text-4xl text-ink">04+</span>
                <p className="label-mono mt-2">Años construyendo</p>
              </div>
              <div>
                <span className="font-serif-display text-4xl text-ink">6</span>
                <p className="label-mono mt-2">Sistemas publicados</p>
              </div>
            </div>
          </div>

          <figure className="relative">
            <div className="overflow-hidden border border-[var(--color-line-strong)] bg-paper-dim">
              <img
                src={profileImg}
                alt="Franco Dellorsi"
                width={900}
                height={900}
                className="gallery-img aspect-[4/5] w-full object-cover object-[center_20%]"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between">
              <span className="label-mono">Código claro, sin vueltas</span>
              <span className="label-mono">— AR</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
