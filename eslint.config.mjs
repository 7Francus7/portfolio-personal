import { defineConfig, globalIgnores } from 'eslint/config';
import nextConfig from 'eslint-config-next';

export default defineConfig([
  globalIgnores(['.next/**', 'node_modules/**', 'out/**', 'scripts/**', 'next-env.d.ts']),
  nextConfig,
]);
