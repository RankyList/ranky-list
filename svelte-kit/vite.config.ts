import svg from '@poppanator/sveltekit-svg';
import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [sveltekit(), svg({
      includePaths: ['src/lib/components/icons'],
      svgoOptions: {
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false } },
          },
        ],
      },
    })],
    server: {
      watch: {
        usePolling: process.env.VITE_USE_POLLING === 'true',
        ignored: ['coverage/**', '.vscode/**', '.idea/**', 'test-results/**', '.svelte-kit/**'],
      },
    },
    test: {
      include: ['src/**/*.{test,spec}.{js,ts}'],
    },
  };
});
