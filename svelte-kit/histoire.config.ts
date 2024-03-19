import { defaultColors, defineConfig } from 'histoire';
import { HstSvelte } from '@histoire/plugin-svelte';

export default defineConfig({
  plugins: [HstSvelte()],
  setupFile: '/histoire.setup.ts',
  theme: {
    title: 'RankyList',
    darkClass: 'dark',
    logo: {
      square: './static/logo.png',
      light: './static/logo.png',
      dark: './static/logo.png',
    },
    favicon: './static/favicon.ico',
    colors: {
      gray: defaultColors.slate,
      primary: defaultColors.orange,
    },
  },
  vite: {
    server: {
      host: true,
    },
  },
});
