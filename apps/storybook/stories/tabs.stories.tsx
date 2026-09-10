import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { GlassTabs } from '@prism/ui';
import { storyDescription } from '@prism/ui/guidance';
const meta = {
  title: 'Prism/Tabs',
  component: GlassTabs,
  parameters: {
    docs: { description: { component: storyDescription('tabs') } },
  },
  args: {
    label: 'Listening mood',
    items: [
      {
        value: 'focus',
        label: 'Focus',
        content: <p>Room for a deeper thought.</p>,
      },
      {
        value: 'unwind',
        label: 'Unwind',
        content: <p>Let the day fall away.</p>,
      },
      {
        value: 'sleep',
        label: 'Sleep',
        content: <p>Drift a little further.</p>,
      },
    ],
  },
} satisfies Meta<typeof GlassTabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: 'Unwind' }));
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent(
      'Let the day fall away.',
    );
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', { name: 'Sleep' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  },
};
export const DisabledPanel: Story = {
  args: {
    items: [
      { value: 'focus', label: 'Focus', content: <p>Available now.</p> },
      {
        value: 'sleep',
        label: 'Sleep',
        disabled: true,
        content: <p>Unavailable.</p>,
      },
    ],
  },
};
