import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { GlassInput } from './input';
import { storyDescription } from '@/lib/component-guidance';
const meta = {
  title: 'Prism/Input',
  component: GlassInput,
  parameters: {
    docs: { description: { component: storyDescription('input') } },
  },
  args: {
    label: 'Collection name',
    placeholder: 'Sunday, slowly',
    hint: 'Something that feels like you.',
  },
} satisfies Meta<typeof GlassInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', {
      name: 'Collection name',
    });
    await userEvent.type(input, 'Evening light');
    await expect(input).toHaveValue('Evening light');
  },
};
export const Error: Story = {
  args: { error: 'Enter a collection name before saving.' },
};
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Archived collection' },
};
export const Email: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'you@example.com',
    hint: 'Only used for your invitation.',
  },
};
