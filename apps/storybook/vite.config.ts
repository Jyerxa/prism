import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  publicDir: false,
  css: { postcss: { plugins: [tailwindcss()] } },
});
