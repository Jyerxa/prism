import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { ThemeToggle } from '../apps/demo/src/components/theme-toggle';
import { applyTheme } from '../apps/demo/src/lib/theme';

describe('demo theme toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    applyTheme('dark');
  });

  it('switches document theme between dark and light', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const toggle = screen.getByRole('button', {
      name: 'Switch to light theme',
    });
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

    await user.click(toggle);
    expect(document.documentElement).toHaveClass('light');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(localStorage.getItem('prism-theme')).toBe('light');
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Switch to dark theme' }),
    );
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('prism-theme')).toBe('dark');
  });
});
