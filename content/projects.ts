import type { ProyectoSecundario } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Colección secundaria (doc 04 §3 y doc 09).
// Regla de entrada: solo proyectos aprobados en estrategia con material real.
// Luminous y Landing Consultoría quedan excluidos por decisión documental.
// MiGym, Carnify, Ursula Coffee, Enzo Viajes, Prode 2026 y las automatizaciones
// n8n entran recién cuando exista su material mínimo (doc 08).
// URLs verificadas vivas el 2026-07-17.
// ─────────────────────────────────────────────────────────────────────────────

export const coleccionSecundaria: ProyectoSecundario[] = [
  {
    nombre: 'SaaS Negocios',
    descripcion:
      'MVP de administración para pequeños comercios: punto de venta, inventario y caja. El acceso requiere crear una cuenta.',
    estado: 'mvp',
    url: { href: 'https://saa-s-negocios.vercel.app/register', etiqueta: 'Probar MVP' },
  },
  {
    nombre: 'ELEEME Catálogo',
    descripcion: 'Migración de un catálogo estático a Next.js con panel de administración autogestionable para el cliente.',
    estado: 'trabajo-cliente',
    url: { href: 'https://eleeme-catalogo.vercel.app', etiqueta: 'Ver sitio' },
  },
];
