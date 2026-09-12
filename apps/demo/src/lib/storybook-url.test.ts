import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('Storybook deployment links', () => {
  it('omits workshop links from an unconfigured production build', async () => {
    vi.stubEnv('DEV', false);
    vi.stubEnv('VITE_STORYBOOK_URL', '');
    const { storybookUrl, storybookDocsUrl } = await import('./storybook-url');
    expect(storybookUrl).toBeUndefined();
    expect(storybookDocsUrl('button')).toBeUndefined();
  });

  it('preserves a deployed subpath and query while selecting component docs', async () => {
    vi.stubEnv('DEV', false);
    vi.stubEnv(
      'VITE_STORYBOOK_URL',
      'https://docs.example.com/prism/?theme=dark',
    );
    const { storybookUrl, storybookDocsUrl } = await import('./storybook-url');
    expect(storybookUrl).toBe('https://docs.example.com/prism/?theme=dark');
    const url = new URL(storybookDocsUrl('button')!);
    expect(url.origin).toBe('https://docs.example.com');
    expect(url.pathname).toBe('/prism/');
    expect(url.searchParams.get('theme')).toBe('dark');
    expect(url.searchParams.get('path')).toBe('/docs/prism-button--docs');
  });
});
