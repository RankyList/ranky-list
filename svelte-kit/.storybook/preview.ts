import type { Preview } from '@storybook/svelte';

import '../src/theme.postcss';
import '@skeletonlabs/skeleton/styles/all.css';
import '../src/global.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
