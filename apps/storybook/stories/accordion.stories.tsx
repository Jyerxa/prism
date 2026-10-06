import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { GlassAccordion } from '@prism/ui';

const meta = {
  title: 'Prism/Accordion',
  component: GlassAccordion,
  parameters: {
    docs: {
      description: {
        component:
          'Reveal optional details with clear headings. Use single expansion for focused reading or multiple expansion for comparison. Keep essential actions outside collapsed panels.',
      },
    },
  },
  args: {
    label: 'Listening questions',
    items: [
      {
        value: 'offline',
        label: 'Can I listen offline?',
        content: <p>Download a collection before you head out.</p>,
      },
      {
        value: 'quality',
        label: 'How does audio quality work?',
        content: <p>Choose the quality that suits your connection.</p>,
      },
      {
        value: 'sharing',
        label: 'Can I share a collection?',
        content: <p>Send a collection link to someone you know.</p>,
      },
    ],
  },
} satisfies Meta<typeof GlassAccordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('button', { name: 'Can I listen offline?' });
    await userEvent.click(first);
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    await expect(
      canvas.getByRole('button', { name: 'How does audio quality work?' }),
    ).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveAttribute('aria-expanded', 'false');
  },
};
export const Multiple: Story = {
  args: { multiple: true, defaultValue: ['offline', 'quality'] },
};
export const DisabledItem: Story = {
  args: {
    items: meta.args.items.map((item) => ({
      ...item,
      disabled: item.value === 'quality',
    })),
  },
};
export const Disabled: Story = { args: { disabled: true } };
export const Controlled: Story = {
  render: function ControlledAccordion(args) {
    const [value, setValue] = useState<string[]>(['offline']);
    return <GlassAccordion {...args} value={value} onValueChange={setValue} />;
  },
};
