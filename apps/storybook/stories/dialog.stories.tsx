import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { GlassDialog } from '@prism/ui';
import { GlassButton } from '@prism/ui';
import { GlassInput } from '@prism/ui';
import { storyDescription } from '@prism/ui/guidance';
const meta = {
  title: 'Prism/Dialog',
  component: GlassDialog,
  parameters: {
    docs: { description: { component: storyDescription('dialog') } },
  },
  args: {
    title: 'A new collection',
    description: 'Give your next listening moment a name.',
    trigger: <GlassButton>New collection</GlassButton>,
    children: (
      <GlassInput label="Collection name" placeholder="Sunday, slowly" />
    ),
  },
} satisfies Meta<typeof GlassDialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', {
      name: 'New collection',
    });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await expect(
      await body.findByRole('dialog', { name: 'A new collection' }),
    ).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(body.queryByRole('dialog')).not.toBeInTheDocument(),
    );
    await expect(trigger).toHaveFocus();
  },
};
export const LongContent: Story = {
  args: {
    children: (
      <div style={{ display: 'grid', gap: 20 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <p key={i}>
            A readable surface with enough opacity to keep a longer passage
            comfortable, even when the world behind it gets busy.
          </p>
        ))}
      </div>
    ),
  },
};
