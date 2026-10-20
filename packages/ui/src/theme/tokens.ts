/**
 * Theme token contracts for Quiet Glass + Spectral.
 * Values mirror packages/ui/src/components/prism/prism.css — keep in sync for contrast tests.
 */

export type PrismThemeName = 'dark' | 'light';

export type ThemeContrastPair = {
  name: string;
  foreground: string;
  background: string;
  /** WCAG AA normal text requires 4.5; UI / large text may use 3 */
  minRatio: number;
};

export const spectralStops = {
  from: '#74d1c4',
  mid: '#aad8ff',
  to: '#b8a4ff',
} as const;

export const subjectHues = {
  patterns: '#74d1c4',
  distributed: '#7eb8e8',
  ai: '#c4a5e8',
  certification: '#c4a15a',
} as const;

export const typographyTokens = {
  measure: '65ch',
  fontSansVar: '--prism-font-sans',
  fontMonoVar: '--prism-font-mono',
  fontHeadingVar: '--prism-font-heading',
  scale: [
    '--text-xs',
    '--text-sm',
    '--text-base',
    '--text-lg',
    '--text-xl',
    '--text-2xl',
    '--text-3xl',
    '--text-4xl',
  ],
} as const;

export const semanticTokenNames = [
  '--surface',
  '--surface-raised',
  '--text',
  '--text-muted',
  '--border',
  '--accent',
  '--focus',
  '--glass-clear',
  '--glass-frosted',
  '--glass-solid',
  '--glass-border',
  '--glass-highlight',
  '--glass-shadow',
  '--glass-chrome',
] as const;

/** Critical AA pairs for each theme (hex only — no alpha composites). */
export const themeContrastPairs: Record<PrismThemeName, ThemeContrastPair[]> = {
  dark: [
    {
      name: 'text on surface',
      foreground: '#f2f5fa',
      background: '#0b1018',
      minRatio: 4.5,
    },
    {
      name: 'text-muted on surface',
      foreground: '#a5b1c2',
      background: '#0b1018',
      minRatio: 4.5,
    },
    {
      name: 'accent on surface',
      foreground: '#74d1c4',
      background: '#0b1018',
      minRatio: 4.5,
    },
    {
      name: 'primary button label',
      foreground: '#082521',
      background: '#74d1c4',
      minRatio: 4.5,
    },
    {
      name: 'text on glass-solid',
      foreground: '#f2f5fa',
      background: '#1b2737',
      minRatio: 4.5,
    },
    {
      name: 'destructive on surface',
      foreground: '#ffa7ae',
      background: '#0b1018',
      minRatio: 4.5,
    },
  ],
  light: [
    {
      name: 'text on surface',
      foreground: '#1c232e',
      background: '#f4efe6',
      minRatio: 4.5,
    },
    {
      name: 'text-muted on surface',
      foreground: '#556070',
      background: '#f4efe6',
      minRatio: 4.5,
    },
    {
      name: 'accent on surface',
      foreground: '#1f6b5f',
      background: '#f4efe6',
      minRatio: 4.5,
    },
    {
      name: 'primary button label',
      foreground: '#04201c',
      background: '#2a9d8f',
      minRatio: 4.5,
    },
    {
      name: 'text on glass-solid / raised',
      foreground: '#1c232e',
      background: '#fffaf2',
      minRatio: 4.5,
    },
    {
      name: 'destructive on surface',
      foreground: '#c23b4a',
      background: '#f4efe6',
      minRatio: 4.5,
    },
    {
      name: 'badge-blue on surface',
      foreground: '#2a6f9e',
      background: '#f4efe6',
      minRatio: 4.5,
    },
  ],
};

export function relativeLuminance(hex: string): number {
  const raw = hex.replace('#', '');
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;
  const n = Number.parseInt(full, 16);
  const channels = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}
