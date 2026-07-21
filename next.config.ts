import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  // Sin dominios remotos: todas las imágenes son locales y curadas (sin mShots
  // ni capturas automáticas — decisión doc 10 §4).
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
