import svg from '@poppanator/sveltekit-svg';
import { sveltekit } from '@sveltejs/kit/vite';
import { type UserConfig, loadEnv } from 'vite';

const config = (mode: string): UserConfig => {
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
  };
};

export default config;
