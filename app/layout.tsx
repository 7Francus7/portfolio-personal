import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { metadataBase } from '@/lib/seo';
import { site, contacto, perfilProfesional } from '@/content/site';
import { urlConfigurada } from '@/lib/entorno';
import { dominioAnalitica } from '@/lib/analitica';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = metadataBase();

/**
 * JSON-LD honesto: persona, rol y perfiles reales. Sin ratings ni empresas.
 * `url` solo se incluye si hay dominio real — nunca localhost.
 */
function jsonLd() {
  const base = urlConfigurada();
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Franco Dell’Orsi',
    jobTitle: 'Desarrollador de producto y full-stack',
    ...(base ? { url: base } : {}),
    email: `mailto:${contacto.email}`,
    sameAs: [contacto.github, contacto.linkedin],
    address: { '@type': 'PostalAddress', addressCountry: 'AR' },
    knowsAbout: [
      'Software operativo para PyMEs',
      'Sistemas de gestión y cuentas corrientes',
      'Diseño de producto',
      'TypeScript',
      'React',
      'Next.js',
      'PostgreSQL',
    ],
    workLocation: {
      '@type': 'Place',
      name: `${perfilProfesional.ubicacion} · ${perfilProfesional.modalidad} (${perfilProfesional.zonaHoraria})`,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const analytics = dominioAnalitica();

  return (
    <html
      lang="es"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Analítica sin cookies. Solo se inyecta si hay dominio configurado. */}
        {analytics ? (
          <script
            defer
            data-domain={analytics}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
      </head>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
      </body>
    </html>
  );
}
