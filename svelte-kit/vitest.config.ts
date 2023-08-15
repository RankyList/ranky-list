import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig<Record<string, any>, Record<string, any>>(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/**/*.{test,spec}.{js,ts}'],
      css: false,
      api: {
        host: '0.0.0.0',
        port: 5174,
        strictPort: true,
      },
    },
  }),
);
