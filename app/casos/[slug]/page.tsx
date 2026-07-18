import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { casos, getCaso } from '@/content/cases';
import { metadataRuta } from '@/lib/seo';
import { CasoCompletoVista } from '@/components/caso/CasoCompleto';
import { CasoReducidoVista } from '@/components/caso/CasoReducido';

export const dynamicParams = false;

export function generateStaticParams() {
  return casos.map((caso) => ({ slug: caso.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caso = getCaso(slug);
  if (!caso) return {};
  return metadataRuta({
    titulo: `${caso.nombre} — ${caso.titulo}`,
    descripcion: caso.resumen,
    ruta: `/casos/${caso.slug}`,
  });
}

export default async function CasoPage({ params }: Props) {
  const { slug } = await params;
  const caso = getCaso(slug);
  if (!caso) notFound();

  return caso.tipo === 'completo' ? (
    <CasoCompletoVista caso={caso} />
  ) : (
    <CasoReducidoVista caso={caso} />
  );
}
