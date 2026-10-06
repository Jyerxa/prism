import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { GlassRadioGroup } from '@prism/ui';
import { storyDescription } from '@prism/ui/guidance';
const meta = {
  title: 'Prism/Radio group',
  component: GlassRadioGroup,
  parameters: {
    docs: { description: { component: storyDescription('radio-group') } },
  },
  args: {
    label: 'Playback quality',
    defaultValue: 'balanced',
    hint: 'Choose one quality level.',
    options: [
      {
        value: 'balanced',
        label: 'Balanced',
        description: 'A smaller download for everyday listening.',
      },
      {
        value: 'lossless',
        label: 'Lossless',
        description: 'Full detail for a stable connection.',
      },
      {
        value: 'studio',
        label: 'Studio',
        disabled: true,
        description: 'Available with a studio plan.',
      },
    ],
  },
} satisfies Meta<typeof GlassRadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: 'Lossless' }));
    await expect(canvas.getByRole('radio', { name: 'Lossless' })).toBeChecked();
  },
};
export const Error: Story = { args: { error: 'Choose a playback quality.' } };
export const Disabled: Story = { args: { disabled: true } };
export const Controlled: Story = {
  render: function ControlledRadioGroup(args) {
    const [value, setValue] = useState('balanced');
    return (
      <GlassRadioGroup
        {...args}
        value={value}
        onValueChange={(next) => setValue(next)}
      />
    );
  },
};
