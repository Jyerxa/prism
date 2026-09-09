# Prism

A glass design system built with React 19, TypeScript, shadcn/ui (the **base-nova** registry style), and **Base UI**, with a live component explorer, foundations guide, original ambient listening room, and Storybook.

## Start

Requires Node 22.13+ and npm.

```sh
npm ci
npm run dev          # Website: localhost:3000
npm run storybook    # Workshop: localhost:6006
npm run test         # Component contract tests
npm run typecheck
npm run lint
npm run build:all    # Builds Storybook into public/storybook, then the site
```

The website links to the built Storybook at `/storybook/index.html`. Run `npm run build-storybook` once to make that link available during local website development. The Storybook development server remains separate at port 6006.

## What is included

- **11 exported components:** GlassButton, GlassCard, GlassBadge, GlassInput, GlassSwitch, GlassCheckbox, GlassSlider, GlassTabs, GlassSelect, GlassDialog, GlassTooltip.
- Component-specific usage rules, avoid guidance, and copyable examples in the explorer and Storybook.
- Storybook controls, 38 example states, accessibility addon, and interaction play functions.
- Three materials: clear, frosted, and solid. Shared design tokens, accessible focus states, reduced motion, reduced transparency, forced colors, and no-blur fallbacks.
- Desktop compositions that reorganize for tablet and phone. Minimum 44px primary control targets and 16px text entry.
- Original generated landscape artwork and three original procedural soundscapes. Audio begins only on an explicit play action. Volume, atmosphere, stereo width, scene changes, pause, and sleep timer work. Favorites and created preview collections last for the current visit; there is no account or backend storage.

## Use a component

```tsx
import { GlassButton, GlassCard, GlassInput } from '@/components/prism';

export function CollectionForm() {
  return (
    <GlassCard material="frosted">
      <h2>Your next quiet moment</h2>
      <GlassInput label="Collection name" placeholder="Sunday, slowly" />
      <GlassButton
        tone="primary"
        onClick={() => {
          /* save your data */
        }}
      >
        Save collection
      </GlassButton>
    </GlassCard>
  );
}
```

### Adopt in another project

This is a source-owned component system, not a published npm package. Use a React + TypeScript + Tailwind CSS 4 application with the `@/` alias.

1. Copy `components/prism` (excluding stories if unnecessary), `components/ui/{button,card,badge,input,switch,checkbox,slider,tabs,select,dialog,tooltip}.tsx`, and `lib/utils.ts`.
2. Install `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `tailwindcss`, `tw-animate-css`, and `shadcn`. Preserve versions from this lockfile if reproducibility is important.
3. Use `app/globals.css` as the Tailwind/token mapping reference, importing `components/prism/prism.css` after the Tailwind/shadcn imports and **before CSS rules**. Omit the `site.css` and `experience.css` imports; these style only the showcase. Set your fonts for `--font-geist-sans` and `--font-geist-mono`, or use the fallbacks.
4. Apply the `dark` class at the document or app root. Prism v1 is a dark design system; there is no untested light theme.
5. Copy `lib/component-guidance.ts` for colocated team guidance. Each component source also has a short usage comment, and its adjacent `.stories.tsx` imports the complete rules.

The vendored shadcn Slider has one small functional extension: `thumbProps`, so the wrapper can pass unit-bearing `aria-valuetext` to the actual range input. All interactive wrappers compose the installed shadcn components; those components use Base UI rather than Radix.

## Materials and composition

| Material | Surface           | Blur | Intended use                                                |
| -------- | ----------------- | ---- | ----------------------------------------------------------- |
| Clear    | 5% pale fill      | 12px | Simple decorative content over a controlled dark background |
| Frosted  | 62% ink-blue fill | 24px | Compact cards and grouped controls                          |
| Solid    | Opaque ink-blue   | None | Dense reading and strict contrast environments              |

- Use one primary verdigris action per section.
- Put a dark scrim behind image-backed text. Verify contrast against the final composited background, not the alpha color token alone.
- Do not nest blurred containers. Prefer borders and highlights for additional grouping.
- Give every input a visible label, every icon button an accessible name, and every error an actionable message.
- Use switches for immediate settings and checkboxes for choices submitted later.
- Use links for page navigation and tabs for related panels.
- Tooltip text is supplementary; required instructions must remain visible on mobile.
- Tokens live in `components/prism/prism.css`. Website layouts use a 4px spacing rhythm and fluid breakpoints at 600, 850, and 1100px.

## Source map

| Location                    | Purpose                                                     |
| --------------------------- | ----------------------------------------------------------- |
| `components/prism`          | Public component wrappers, styles, and colocated stories    |
| `components/ui`             | Source-owned shadcn Base UI primitives                      |
| `lib/component-guidance.ts` | Shared usage rules and code examples                        |
| `components/site`           | Explorer and listening room compositions                    |
| `lib/ambient-engine.ts`     | Client-only Web Audio synthesis and cleanup                 |
| `app/foundations`           | Design foundations and adoption examples                    |
| `.storybook`                | Isolated Vite build, docs, controls, accessibility addon    |
| `tests`                     | Component behavior and accessibility contract tests (jsdom) |

## Verification and limits

`npm run test` checks keyboard activation, labels, errors, switch/checkbox behavior, controlled sliders, tabs, select labeling, dialog dismissal/return focus, and documentation coverage. Storybook has reusable interaction scenarios and an accessibility addon for further review. Static type checks and production builds are part of the delivery checks. Lint covers the authored application, Prism components, stories, tests, and the extended Slider; untouched starter catalog files retain upstream lint findings.

Automated component tests do not replace manual browser, screen-reader, audio, or visual review. No browser-based visual QA or WCAG conformance audit is claimed. Glass contrast depends on the background used in your own product. The listening room is an original functional demo, not a streaming service.

## Upstream references

- [shadcn CLI and Base UI styles](https://ui.shadcn.com/docs/cli)
- [Base UI quick start](https://base-ui.com/react/overview/quick-start)
- [Storybook React + Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite)

The repository retains the starter dependency set and lockfile. See `npm audit` for current upstream dependency advisories before adding third-party features or exposing a modified deployment.

