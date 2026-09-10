import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassBadge } from '@prism/ui';
import { storyDescription } from '@prism/ui/guidance';
const meta = {
  title: 'Prism/Badge',
  component: GlassBadge,
  parameters: {
    docs: { description: { component: storyDescription('badge') } },
  },
  args: { children: 'Ambient' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'verdigris', 'blue'] },
  },
} satisfies Meta<typeof GlassBadge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Neutral: Story = {};
export const Positive: Story = {
  args: { tone: 'verdigris', children: 'Available now' },
};
export const Information: Story = {
  args: { tone: 'blue', children: 'Spatial audio' },
};
