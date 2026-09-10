import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassSelect } from '@prism/ui';
import { storyDescription } from '@prism/ui/guidance';
const meta = {
  title: 'Prism/Select',
  component: GlassSelect,
  parameters: {
    docs: { description: { component: storyDescription('select') } },
  },
  args: {
    label: 'Your sound environment',
    options: [
      { value: 'coast', label: 'Coastal dusk' },
      { value: 'rain', label: 'Rain on glass' },
      { value: 'sky', label: 'Open atmosphere' },
    ],
  },
} satisfies Meta<typeof GlassSelect>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
export const Selected: Story = { args: { defaultValue: 'coast' } };
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'coast' },
};
