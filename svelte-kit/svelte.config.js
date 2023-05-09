import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
      scss: true,
      typescript: true,
    }),
  ],
  kit: {
    adapter: adapter(),
    alias: {
      $src: 'src',
      $components: 'src/lib/components',
      $server: 'src/lib/server',
      $stores: 'src/lib/stores',
      $types: 'src/lib/types',
      $utils: 'src/lib/utils',
      $schemas: 'src/lib/schemas',
    },
  },
};

export default config;
