# Prism

A glass design system built with React 19, TypeScript, shadcn/ui (the **base-nova** registry style), and **Base UI**, organized as npm workspaces: a Vite demo app, a separate Storybook app, and a shared UI package. The demo includes a live component explorer, foundations guide, and original ambient listening room.

## Start

Requires Node 22.13+ and npm.

```sh
npm ci
npm run dev          # Vite demo: localhost:3000 (terminal 1)
npm run storybook    # Storybook: localhost:6006 (terminal 2)
npm run test         # Component contracts and demo navigation
npm run typecheck
npm run lint
npm run build        # Demo only: apps/demo/dist
npm run build-storybook # Storybook only: apps/storybook/dist
npm run build:all    # Build both apps independently
npm run preview      # Preview the built demo: localhost:3000
```

Both apps have their own package manifest, TypeScript configuration, development command, and build output. Root scripts delegate to the appropriate workspace. You can also run commands directly, for example `npm run dev --workspace @prism/demo` or `npm run build --workspace @prism/storybook`.

During development, demo links open Storybook at `http://localhost:6006`. Start Storybook in a second terminal to use them; no Storybook build is required. To point the demo at a deployed workshop, copy `apps/demo/.env.example` to `apps/demo/.env.local` and set `VITE_STORYBOOK_URL` to its URL. Vite reads this value at build time. Production builds hide Storybook links when it is unset.

### Deploy the apps

Publish `apps/demo/dist` and `apps/storybook/dist` as separate static sites. The demo uses React Router with browser history; configure its static host to serve `index.html` for navigation requests to `/foundations`, `/listening-room`, and other client routes. Vite development and preview servers already provide this fallback. Storybook uses its own index and iframe assets and needs no demo fallback.

The existing `.openai/hosting.json` points Sites at the demo's static output. Neither app needs vinext, Next.js, React Server Components, Wrangler, or a Cloudflare development runtime.

## What is included

- **11 exported components:** GlassButton, GlassCard, GlassBadge, GlassInput, GlassSwitch, GlassCheckbox, GlassSlider, GlassTabs, GlassSelect, GlassDialog, GlassTooltip.
- Component-specific usage rules, avoid guidance, and copyable examples in the explorer and Storybook.
- Storybook controls, 38 example states, accessibility addon, and interaction play functions.
- Three materials: clear, frosted, and solid. Shared design tokens, accessible focus states, reduced motion, reduced transparency, forced colors, and no-blur fallbacks.
- Desktop compositions that reorganize for tablet and phone. Minimum 44px primary control targets and 16px text entry.
- Original generated landscape artwork and three original procedural soundscapes. Audio begins only on an explicit play action. Volume, atmosphere, stereo width, scene changes, pause, and sleep timer work. Favorites and created preview collections last for the current visit; there is no account or backend storage.

## Use a component

```tsx
import { GlassButton, GlassCard, GlassInput } from '@prism/ui';

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

`@prism/ui` is a private source package, not a published npm package. Both apps consume its public exports directly, so changes appear through Vite without building the library first.

- `@prism/ui`: the 11 Glass components and their types.
- `@prism/ui/styles.css`: Tailwind setup, shared tokens, component styles, and bundled Geist fonts.
- `@prism/ui/guidance`: usage rules and code examples.

Add `"@prism/ui": "*"` to another workspace's dependencies and run `npm install`. Import the shared stylesheet once in the app's CSS entry, and explicitly register that app's source directory for Tailwind:

```css
@import '@prism/ui/styles.css';
@source './'; /* Relative to this stylesheet; point at your app's source. */
```

The app needs React 19, TypeScript, and Tailwind CSS 4 processing (see either app's Vite config). Apply the `dark` class at the document or app root. Prism v1 is a dark design system. The demo's layout styles stay in `apps/demo`; Storybook loads only shared component styles.

To adopt outside this repository, copy `packages/ui` into your own workspace and install its declared dependencies. Its source uses relative internal imports, so consumers do not need an `@/` alias. The package-local alias and `components.json` are provided for shadcn authoring.

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
- Tokens live in `packages/ui/src/components/prism/prism.css`. Website layouts use a 4px spacing rhythm and fluid breakpoints at 600, 850, and 1100px.

## Source map

| Location                                    | Purpose                                                                 |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `apps/demo`                                 | Vite entry, React routes, compositions, audio engine, and public assets |
| `apps/storybook/.storybook`                 | Storybook configuration, docs, controls, and accessibility addon        |
| `apps/storybook/stories`                    | Component stories importing the shared package                          |
| `packages/ui/src/components/prism`          | Public Glass wrappers and design tokens                                 |
| `packages/ui/src/components/ui`             | Source-owned shadcn Base UI primitives                                  |
| `packages/ui/src/styles.css`                | Shared Tailwind theme and fonts                                         |
| `packages/ui/src/lib/component-guidance.ts` | Shared usage rules and code examples                                    |
| `tests`                                     | Component behavior and accessibility contract tests (jsdom)             |
| `apps/demo/src/app.test.tsx`                | Routes, navigation, history, and separate Storybook links               |

## Verification and limits

`npm run test` checks keyboard activation, labels, errors, switch/checkbox behavior, controlled sliders, tabs, select labeling, dialog dismissal/return focus, documentation coverage, direct route rendering, history navigation, and external Storybook links. Storybook has reusable interaction scenarios and an accessibility addon for further review. Static type checks and production builds are part of the delivery checks. Lint covers the authored application, Prism components, stories, tests, and the extended Slider; untouched starter catalog files retain upstream lint findings.

Automated component tests do not replace manual browser, screen-reader, audio, or visual review. No browser-based visual QA or WCAG conformance audit is claimed. Glass contrast depends on the background used in your own product. The listening room is an original functional demo, not a streaming service.

## Upstream references

- [shadcn CLI and Base UI styles](https://ui.shadcn.com/docs/cli)
- [Base UI quick start](https://base-ui.com/react/overview/quick-start)
- [Vite](https://vite.dev/guide/)
- [npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/)
- [React Router declarative mode](https://reactrouter.com/7.18.3/start/declarative/installation)
- [Storybook React + Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite)

The npm lockfile is shared across all workspaces. Framework and worker-runtime dependencies have been removed; the existing component catalog and its dependencies are retained.
