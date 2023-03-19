import { loadEnv, mergeConfig } from 'vite';

import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    process.env = { ...process.env, ...loadEnv(config.mode ?? 'dev', process.cwd()) };

    // Merge custom configuration into the default config
    return mergeConfig(config, {
      server: {
        watch: {
          usePolling: process.env.VITE_USE_POLLING === 'true',
          ignored: ['coverage/**', '.vscode/**', '.idea/**', 'test-results/**', '.svelte-kit/**'],
        },
      },
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    });
  },
};

export default config;
