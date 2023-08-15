import svg from '@poppanator/sveltekit-svg';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      sveltekit(),
      svg({
        includePaths: ['src/lib/components/icon'],
        svgoOptions: {
          plugins: [
            {
              name: 'preset-default',
              params: { overrides: { removeViewBox: false } },
            },
          ],
        },
      }),
    ],
    server: {
      watch: {
        usePolling: process.env.VITE_USE_POLLING === 'true',
        ignored: ['coverage/**', '.vscode/**', '.idea/**', 'test-results/**', '.svelte-kit/**'],
      },
    },
  };
});
