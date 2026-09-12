import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heart } from 'lucide-react';
import { GlassTooltip } from '@prism/ui';
import { GlassButton } from '@prism/ui';
import { storyDescription } from '@prism/ui/guidance';
const meta = {
  title: 'Prism/Tooltip',
  component: GlassTooltip,
  parameters: {
    docs: { description: { component: storyDescription('tooltip') } },
  },
  args: {
    content: 'Save this moment',
    children: (
      <GlassButton className="icon-button" aria-label="Save track">
        <Heart />
      </GlassButton>
    ),
  },
} satisfies Meta<typeof GlassTooltip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const TextTrigger: Story = {
  args: {
    content: 'Start an original, continuous ambient soundscape.',
    children: <GlassButton>Start listening</GlassButton>,
  },
};
