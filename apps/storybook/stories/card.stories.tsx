import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassCard } from '@prism/ui';
import { storyDescription } from '@prism/ui/guidance';
const meta = {
  title: 'Prism/Card',
  component: GlassCard,
  parameters: {
    docs: { description: { component: storyDescription('card') } },
  },
  args: {
    children: (
      <>
        <h2 style={{ fontSize: 24, margin: 0 }}>A quieter kind of space.</h2>
        <p style={{ lineHeight: 1.7, margin: 0, color: '#bccadb' }}>
          Room for a thought, a sound, a small collection of good things.
        </p>
      </>
    ),
  },
  argTypes: {
    material: { control: 'select', options: ['clear', 'frosted', 'solid'] },
  },
} satisfies Meta<typeof GlassCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Frosted: Story = {};
export const Clear: Story = { args: { material: 'clear' } };
export const Solid: Story = { args: { material: 'solid' } };
