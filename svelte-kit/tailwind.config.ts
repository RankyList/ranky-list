import { join } from 'node:path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import formsPlugin from '@tailwindcss/forms';
import { rankyListTheme } from './ranky-list.theme';

import type { Config } from 'tailwindcss';

const config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
  theme: {
    extend: {},
  },
  plugins: [
    formsPlugin,
    skeleton({
      themes: { custom: [rankyListTheme] },
    }),
  ],
} satisfies Config;

export default config;
