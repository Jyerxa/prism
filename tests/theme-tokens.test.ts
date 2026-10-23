import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  contrastRatio,
  semanticTokenNames,
  spectralStops,
  subjectHues,
  subjectHuesLight,
  themeContrastPairs,
  typographyTokens,
} from '../packages/ui/src/theme/tokens';

const prismCss = readFileSync(
  resolve(__dirname, '../packages/ui/src/components/prism/prism.css'),
  'utf8',
);

describe('Quiet Glass + Spectral theme tokens', () => {
  it('defines semantic tokens in prism.css', () => {
    for (const name of semanticTokenNames) {
      expect(prismCss).toContain(`${name}:`);
    }
  });

  it('exposes dark, light, and prefers-color-scheme selectors', () => {
    expect(prismCss).toMatch(/\[data-theme=['"]dark['"]\]/);
    expect(prismCss).toMatch(/\[data-theme=['"]light['"]\]/);
    expect(prismCss).toContain('.light');
    expect(prismCss).toContain('.dark');
    expect(prismCss).toContain('prefers-color-scheme: light');
  });

  it('keeps typography measure and configurable font hooks', () => {
    expect(prismCss).toContain(`--measure: ${typographyTokens.measure}`);
    expect(prismCss).toContain(`${typographyTokens.fontSansVar}:`);
    expect(prismCss).toContain(`${typographyTokens.fontMonoVar}:`);
    expect(prismCss).toContain(`${typographyTokens.fontHeadingVar}:`);
    for (const token of typographyTokens.scale) {
      expect(prismCss).toContain(`${token}:`);
    }
  });

  it('defines spectral gradient stops and subject hues', () => {
    expect(prismCss).toContain(spectralStops.from);
    expect(prismCss).toContain(spectralStops.mid);
    expect(prismCss).toContain(spectralStops.to);
    expect(prismCss).toContain('--spectral:');
    expect(prismCss).toContain(`--hue-patterns: ${subjectHues.patterns}`);
    expect(prismCss).toContain(`--hue-distributed: ${subjectHues.distributed}`);
    expect(prismCss).toContain(`--hue-ai: ${subjectHues.ai}`);
    expect(prismCss).toContain(
      `--hue-certification: ${subjectHues.certification}`,
    );
    expect(prismCss).toContain('--subject-patterns:');
    expect(prismCss).toContain(
      `--subject-patterns-fg: ${subjectHuesLight.patterns}`,
    );
    expect(prismCss).toContain(
      `--subject-ai-fg: ${subjectHuesLight.ai}`,
    );
    expect(prismCss).toContain(
      `--subject-certification-fg: ${subjectHuesLight.certification}`,
    );
  });

  it('preserves Obsidian dark surface/text/accent values', () => {
    expect(prismCss).toMatch(/--surface:\s*#0b1018/);
    expect(prismCss).toMatch(/--text:\s*#f2f5fa/);
    expect(prismCss).toMatch(/--text-muted:\s*#a5b1c2/);
    expect(prismCss).toMatch(/--accent:\s*#74d1c4/);
    expect(prismCss).toMatch(/--glass-solid:\s*#1b2737/);
  });

  it('defines warm parchment Gallery light values', () => {
    expect(prismCss).toMatch(/--surface:\s*#f4efe6/);
    expect(prismCss).toMatch(/--text:\s*#1c232e/);
    expect(prismCss).toMatch(/--accent:\s*#1f6b5f/);
  });

  it('meets WCAG AA contrast for critical theme pairs', () => {
    for (const [theme, pairs] of Object.entries(themeContrastPairs)) {
      for (const pair of pairs) {
        const ratio = contrastRatio(pair.foreground, pair.background);
        expect(
          ratio,
          `${theme} ${pair.name}: ${pair.foreground} on ${pair.background} = ${ratio.toFixed(2)}`,
        ).toBeGreaterThanOrEqual(pair.minRatio);
      }
    }
  });

  it('avoids hard-coded hex colors in Glass component rules', () => {
    const componentStart = prismCss.indexOf('/* ── Components');
    expect(componentStart).toBeGreaterThan(0);
    const componentCss = prismCss.slice(componentStart);
    const hexInRules = componentCss.match(
      /(?:color|background|border(?:-color)?|outline|box-shadow)\s*:[^;]*#[0-9a-fA-F]{3,8}/g,
    );
    // Primary inset highlight is a shared glass specular (#ffffff80) — allow that single exception pattern via tokens only.
    expect(hexInRules ?? []).toEqual([]);
  });
});
