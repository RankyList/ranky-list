import svg from '@poppanator/sveltekit-svg';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig(async () => {
  return {
    plugins: [
      sveltekit(),
      Icons({
        compiler: 'svelte',
      }),
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
  };
});
