import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/postcss';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  publicDir: false,
  resolve: { alias: { '@': fileURLToPath(new URL('../', import.meta.url)) } },
  css: { postcss: { plugins: [tailwindcss()] } },
});
