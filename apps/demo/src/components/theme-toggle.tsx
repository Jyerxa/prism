import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { GlassButton } from '@prism/ui';
import {
  applyTheme,
  getStoredTheme,
  resolveTheme,
  toggleTheme,
  type DemoTheme,
} from '../lib/theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<DemoTheme>(() => resolveTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (getStoredTheme() || typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => setTheme(resolveTheme(null));
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <GlassButton
      type="button"
      tone="glass"
      className="theme-toggle icon-button"
      aria-label={
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      }
      title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
      onClick={() => setTheme((current) => toggleTheme(current))}
    >
      {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
    </GlassButton>
  );
}
