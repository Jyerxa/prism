import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ArrowRight, Heart } from 'lucide-react';
import { GlassButton } from './button';
import { storyDescription } from '@/lib/component-guidance';
const meta = {
  title: 'Prism/Button',
  component: GlassButton,
  parameters: {
    docs: { description: { component: storyDescription('button') } },
  },
  args: { children: 'Create collection', onClick: fn() },
  argTypes: {
    tone: {
      control: 'select',
      options: ['glass', 'primary', 'quiet', 'danger'],
    },
  },
} satisfies Meta<typeof GlassButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Glass: Story = {};
export const Primary: Story = {
  args: { tone: 'primary' },
  play: async ({ canvasElement, args }) => {
    await userEvent.click(
      within(canvasElement).getByRole('button', { name: 'Create collection' }),
    );
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
export const Quiet: Story = {
  args: { tone: 'quiet', children: 'Maybe later' },
};
export const Danger: Story = {
  args: { tone: 'danger', children: 'Delete collection' },
};
export const Disabled: Story = { args: { disabled: true } };
export const WithIcon: Story = {
  args: {
    children: (
      <>
        Start listening <ArrowRight />
      </>
    ),
  },
};
export const IconOnly: Story = {
  args: {
    children: <Heart />,
    className: 'icon-button',
    'aria-label': 'Save track',
  },
};
