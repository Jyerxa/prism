export type DemoTheme = 'dark' | 'light';

const STORAGE_KEY = 'prism-theme';

export function getStoredTheme(): DemoTheme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'dark' || value === 'light') return value;
  } catch {
    /* private mode */
  }
  return null;
}

export function getSystemTheme(): DemoTheme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

export function resolveTheme(stored: DemoTheme | null = getStoredTheme()): DemoTheme {
  return stored ?? getSystemTheme();
}

export function applyTheme(theme: DemoTheme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'light' ? '#f4efe6' : '#0b1018');
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode */
  }
}

export function toggleTheme(current: DemoTheme): DemoTheme {
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}
