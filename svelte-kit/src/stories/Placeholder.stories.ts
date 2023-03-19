import Placeholder from '$component/util/Placeholder.svelte';

import type { Meta, StoryObj } from '@storybook/svelte';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/svelte/writing-stories/introduction
const meta = {
  title: 'Util/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
  argTypes: {
    height: { name: 'Height', description: 'The height of the skeleton placeholder (width will scale automatically).', type: 'number' },
    animate: { name: 'Animate', description: 'Wether to animate the placeholder or not.', type: 'boolean' },
  },
} satisfies Meta<Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
export const PlaceholderExample: Story = {
  args: {
    height: 150,
    animate: true,
  },
};
