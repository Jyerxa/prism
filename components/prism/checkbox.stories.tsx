import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassCheckbox } from './checkbox';
import { storyDescription } from '@/lib/component-guidance';
const meta = {
  title: 'Prism/Checkbox',
  component: GlassCheckbox,
  parameters: {
    docs: { description: { component: storyDescription('checkbox') } },
  },
  args: { label: 'Include in my weekly mix' },
} satisfies Meta<typeof GlassCheckbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Select all collections' },
};
