import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassSlider } from './slider';
import { storyDescription } from '@/lib/component-guidance';
const meta = {
  title: 'Prism/Slider',
  component: GlassSlider,
  parameters: {
    docs: { description: { component: storyDescription('slider') } },
  },
  args: { label: 'Volume', defaultValue: 48 },
} satisfies Meta<typeof GlassSlider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CustomRange: Story = {
  args: {
    label: 'Blur',
    min: 0,
    max: 40,
    unit: 'px',
    step: 2,
    defaultValue: 24,
  },
};
export const Disabled: Story = { args: { disabled: true } };
export const Minimum: Story = { args: { defaultValue: 0 } };
export const Maximum: Story = { args: { defaultValue: 100 } };
