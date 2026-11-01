import { Moon, Sun } from 'lucide-react';
import type { PrismThemeName } from '../../theme/tokens';
import { cn } from '../../lib/utils';

export type ThemeToggleProps = {
  theme: PrismThemeName;
  onThemeChange: (theme: PrismThemeName) => void;
  className?: string;
};

/** Controlled theme switcher for Quiet Glass shells. Persistence is the host's job. */
export function ThemeToggle({
  theme,
  onThemeChange,
  className,
}: ThemeToggleProps) {
  const next = theme === 'dark' ? 'light' : 'dark';
  const label =
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  return (
    <button
      type="button"
      className={cn(
        'prism-theme-toggle prism-button prism-button--glass icon-button',
        className,
      )}
      aria-label={label}
      title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
      onClick={() => onThemeChange(next)}
    >
      {theme === 'dark' ? (
        <Sun size={18} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Moon size={18} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}
