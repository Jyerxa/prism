export const storybookUrl =
  import.meta.env.VITE_STORYBOOK_URL?.trim() ||
  (import.meta.env.DEV ? 'http://localhost:6006' : undefined);

export function storybookDocsUrl(component: string) {
  if (!storybookUrl) return undefined;
  const url = new URL(storybookUrl, window.location.origin);
  url.searchParams.set('path', `/docs/prism-${component}--docs`);
  return url.href;
}
