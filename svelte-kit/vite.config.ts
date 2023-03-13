import svg from '@poppanator/sveltekit-svg';
import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [sveltekit(), svg({
      includePaths: ['src/lib/component/icon/svg'],
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
      },
    },
    test: {
      include: ['src/**/*.{test,spec}.{js,ts}'],
    },
  };
});
