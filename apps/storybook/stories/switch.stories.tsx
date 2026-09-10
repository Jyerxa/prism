import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { GlassSwitch } from '@prism/ui';
import { storyDescription } from '@prism/ui/guidance';
const meta = {
  title: 'Prism/Switch',
  component: GlassSwitch,
  parameters: {
    docs: { description: { component: storyDescription('switch') } },
  },
  args: { label: 'Spatial audio', description: 'A wider stereo soundstage' },
} satisfies Meta<typeof GlassSwitch>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Off: Story = {
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByRole('switch', {
      name: 'Spatial audio',
    });
    await expect(control).not.toBeChecked();
    await userEvent.click(control);
    await expect(control).toBeChecked();
    await userEvent.keyboard(' ');
    await expect(control).not.toBeChecked();
  },
};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
