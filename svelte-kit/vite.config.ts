import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv, type UserConfig } from 'vite';

const config = (mode: string): UserConfig => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [sveltekit()],
    server: {
      watch: {
        usePolling: process.env.VITE_USE_POLLING === 'true',
        interval: 100
      }
    }
  };
};

export default config;
