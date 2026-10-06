import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { GlassTextarea } from '@prism/ui';
import { storyDescription } from '@prism/ui/guidance';
const meta = {
  title: 'Prism/Textarea',
  component: GlassTextarea,
  parameters: {
    docs: { description: { component: storyDescription('textarea') } },
  },
  args: {
    label: 'Collection notes',
    hint: 'Describe the mood in a few sentences.',
    placeholder: 'A quiet evening by the sea…',
  },
} satisfies Meta<typeof GlassTextarea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const field = within(canvasElement).getByRole('textbox', {
      name: 'Collection notes',
    });
    await userEvent.type(field, 'Gentle waves');
    await expect(field).toHaveValue('Gentle waves');
  },
};
export const Error: Story = {
  args: { error: 'Add a description before sharing.' },
};
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Archived notes' },
};
export const Controlled: Story = {
  render: function ControlledTextarea(args) {
    const [value, setValue] = useState('Evening light');
    return (
      <GlassTextarea
        {...args}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};
