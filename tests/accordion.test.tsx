import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { GlassAccordion } from '@prism/ui';

const items = [
  { value: 'first', label: 'First section', content: 'First details' },
  { value: 'second', label: 'Second section', content: 'Second details' },
  { value: 'third', label: 'Third section', content: 'Third details' },
];

describe('GlassAccordion', () => {
  it('connects headings to panels and allows keyboard opening and closing', async () => {
    const user = userEvent.setup();
    render(<GlassAccordion label="Details" items={items} />);
    expect(screen.getByRole('region', { name: 'Details' })).toBeInTheDocument();
    const first = screen.getByRole('button', { name: 'First section' });
    first.focus();
    await user.keyboard('{Enter}');
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(
      document.getElementById(first.getAttribute('aria-controls')!),
    ).toHaveTextContent('First details');
    await user.keyboard(' ');
    expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  it('moves focus between headings with Tab and Shift+Tab', async () => {
    const user = userEvent.setup();
    render(<GlassAccordion label="Details" items={items} />);
    const first = screen.getByRole('button', { name: 'First section' });
    const second = screen.getByRole('button', { name: 'Second section' });
    first.focus();
    await user.tab();
    expect(second).toHaveFocus();
    await user.tab({ shift: true });
    expect(first).toHaveFocus();
  });

  it('opens one item by default and supports multiple expansion', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <GlassAccordion label="Details" items={items} defaultValue={['first']} />,
    );
    const first = screen.getByRole('button', { name: 'First section' });
    const second = screen.getByRole('button', { name: 'Second section' });
    await user.click(second);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
    rerender(<GlassAccordion label="Details" items={items} multiple />);
    await user.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps controlled expansion owned by the caller', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <GlassAccordion
        label="Details"
        items={items}
        value={[]}
        onValueChange={onValueChange}
      />,
    );
    const first = screen.getByRole('button', { name: 'First section' });
    await user.click(first);
    expect(onValueChange).toHaveBeenCalledWith(['first']);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    rerender(
      <GlassAccordion
        label="Details"
        items={items}
        value={['first']}
        onValueChange={onValueChange}
      />,
    );
    expect(first).toHaveAttribute('aria-expanded', 'true');
  });

  it('prevents expansion for disabled items and disabled groups', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <GlassAccordion
        label="Details"
        items={[{ ...items[0], disabled: true }]}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'First section' }));
    expect(onValueChange).not.toHaveBeenCalled();
    rerender(
      <GlassAccordion
        label="Details"
        items={items}
        disabled
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Second section' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
