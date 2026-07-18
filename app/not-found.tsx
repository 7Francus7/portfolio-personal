import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-editorial py-24 md:py-36">
      <p className="label-mono mb-6">Error 404</p>
      <h1 className="max-w-3xl font-serif-display text-(length:--text-display) leading-[1.02]">
        Esta página no existe.
      </h1>
      <p className="mt-6 max-w-(--container-prose) text-lg leading-relaxed text-ink-soft">
        Puede que el enlace esté vencido o mal escrito. Lo importante sigue estando acá:
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/"
          className="border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper"
        >
          Ir al inicio
        </Link>
        <Link href="/proyectos" className="link-editorial text-sm">
          Ver proyectos →
        </Link>
      </div>
    </section>
  );
}
