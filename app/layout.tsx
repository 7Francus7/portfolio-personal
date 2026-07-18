import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { metadataBase } from '@/lib/seo';
import { site, contacto, SITE_URL } from '@/content/site';
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

// JSON-LD honesto: persona, rol y perfiles reales. Sin ratings ni empresas.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Franco Dell’Orsi',
  jobTitle: 'Desarrollador de producto y full-stack',
  url: SITE_URL,
  email: `mailto:${contacto.email}`,
  sameAs: [contacto.github, contacto.linkedin],
  address: { '@type': 'PostalAddress', addressCountry: 'AR' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
