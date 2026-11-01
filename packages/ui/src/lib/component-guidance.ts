export type ComponentGuide = {
  id: string;
  name: string;
  category: 'Actions' | 'Surfaces' | 'Inputs' | 'Navigation' | 'Feedback';
  summary: string;
  rules: string[];
  avoid: string;
  code: string;
};
export const glassComponentGuides: ComponentGuide[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'Actions',
    summary: 'A tactile invitation to take the next step.',
    rules: [
      'Use a single verdigris primary action in each section.',
      'Start labels with a verb. Give icon-only buttons an aria-label.',
      'Keep a minimum 44px touch target and preserve visible keyboard focus.',
    ],
    avoid: 'Several equally loud primary actions competing in one group.',
    code: '<GlassButton tone="primary" onClick={handleSave}>\n  Save collection\n</GlassButton>',
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Surfaces',
    summary: 'A quiet layer between content and atmosphere.',
    rules: [
      'Use frosted for compact content and solid for dense reading.',
      'Keep clear glass over a controlled, dark background.',
      'Use one blur layer per region; do not nest blurred cards.',
    ],
    avoid: 'Small text directly over a busy image without a dark scrim.',
    code: '<GlassCard material="frosted">\n  <h2>Evening collection</h2>\n  <p>A little room to unwind.</p>\n</GlassCard>',
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Inputs',
    summary: 'Small decisions. Immediate feedback.',
    rules: [
      'Apply the setting as soon as the switch changes.',
      'Use a persistent label that names the setting.',
      'Use description for the consequence, not the current on/off state.',
    ],
    avoid: 'A switch for consent that must be submitted with a form.',
    code: '<GlassSwitch label="Spatial audio"\n  description="A wider stereo soundstage"\n  checked={spatial} onCheckedChange={setSpatial} />',
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'Inputs',
    summary: 'Fluid control, with just enough precision.',
    rules: [
      'Show the current value and its unit.',
      'Set useful min, max, and step values for the task.',
      'Use arrow keys for small changes; Home and End reach the bounds.',
    ],
    avoid: 'Sliders for exact dates, account numbers, or other precise entry.',
    code: '<GlassSlider label="Volume" value={volume}\n  onValueChange={setVolume} unit="%" />',
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    summary: 'Related views, held in one place.',
    rules: [
      'Use tabs for panels within a page; use links for new pages.',
      'Keep labels short and order them by frequency of use.',
      'Preserve arrow-key navigation and a clear selected state.',
    ],
    avoid: 'More tabs than the available width can comfortably hold.',
    code: '<GlassTabs label="Collection view" items={[\n  { value: "all", label: "All", content: <AllTracks /> },\n  { value: "saved", label: "Saved", content: <SavedTracks /> },\n]} />',
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'Feedback',
    summary: 'A small signal that says just enough.',
    rules: [
      'Pair color with a clear text label.',
      'Use verdigris for a positive or current state; blue for information.',
      'Keep badges short and secondary to the content title.',
    ],
    avoid: 'Making a badge behave like an unlabeled action button.',
    code: '<GlassBadge tone="verdigris">Available</GlassBadge>\n<GlassBadge tone="blue">Spatial audio</GlassBadge>',
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Inputs',
    summary: 'A familiar place to put a thought.',
    rules: [
      'Always supply a visible label. Placeholder text is only an example.',
      'Give specific, actionable error messages through the error prop.',
      'Use type, autoComplete, and inputMode appropriate to the content.',
    ],
    avoid:
      'Using placeholder text as the only label or relying on red alone for errors.',
    code: '<GlassInput label="Collection name"\n  placeholder="Sunday, slowly"\n  hint="Give your collection a memorable name." />',
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Inputs',
    summary: 'A little more room for a thought.',
    rules: [
      'Use for multi-line responses and keep a visible label.',
      'Give enough rows for the expected answer and allow resizing.',
      'Use hint for context and error for a specific way to recover.',
    ],
    avoid:
      'Long-form entry squeezed into a single-line input or placeholder-only labels.',
    code: '<GlassTextarea label="Collection notes" rows={4}\n  placeholder="What makes this moment yours?"\n  hint="A few words to return to later." />',
  },
  {
    id: 'radio-group',
    name: 'Radio group',
    category: 'Inputs',
    summary: 'One choice, with every possibility in view.',
    rules: [
      'Use for one selection from a short list of visible choices.',
      'Give the group a label and each option a distinct, stable value.',
      'Keep arrow-key navigation and explain unavailable options nearby.',
    ],
    avoid:
      'Independent preferences that could all be selected; use checkboxes for those.',
    code: '<GlassRadioGroup label="Listening intention" defaultValue="focus"\n  options={[{ value: "focus", label: "Focus" },\n    { value: "unwind", label: "Unwind" }]} />',
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Inputs',
    summary: 'The right choice, without the noise.',
    rules: [
      'Use for a bounded list of known choices.',
      'Choose a meaningful default when one exists.',
      'Give each option a distinct label and stable value.',
    ],
    avoid: 'Long searchable catalogs; use a combobox for those.',
    code: '<GlassSelect label="Sound quality" defaultValue="high"\n  options={[{ value: "high", label: "High · 256 kbps" },\n    { value: "lossless", label: "Lossless" }]} />',
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Inputs',
    summary: 'A considered choice, ready when you are.',
    rules: [
      'Use for independent choices or form selections.',
      'Describe the choice as a statement.',
      'Keep the whole label clickable and choices at least 44px tall.',
    ],
    avoid: 'Forcing mutually exclusive choices into multiple checkboxes.',
    code: '<GlassCheckbox label="Include in my weekly mix"\n  checked={include} onCheckedChange={setInclude} />',
  },
  {
    id: 'dialog',
    name: 'Dialog',
    category: 'Surfaces',
    summary: 'Bring one thing into focus.',
    rules: [
      'Give every dialog a title and a short purpose.',
      'Keep one focused task and preserve Escape, focus trapping, and return focus.',
      'Use dense frosted glass so text stays readable over any page.',
    ],
    avoid:
      'Stacked dialogs or essential content that only appears in a tooltip.',
    code: '<GlassDialog title="New collection"\n  description="Make a little space for your favorites."\n  trigger={<GlassButton>Create collection</GlassButton>}>\n  <GlassInput label="Name" />\n</GlassDialog>',
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Surfaces',
    summary: 'A little detail, opened at your own pace.',
    rules: [
      'Use for related supporting details with clear section labels.',
      'Keep essential instructions visible outside collapsed panels.',
      'Use multiple when readers need to compare several open sections.',
    ],
    avoid:
      'Hiding the main task, required errors, or unrelated navigation inside panels.',
    code: '<GlassAccordion label="Listening questions" items={[\n  { value: "offline", label: "Can I listen offline?",\n    content: "Download a collection first." },\n]} />',
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Feedback',
    summary: 'A helpful aside, right when it belongs.',
    rules: [
      'Use for brief, optional clarification.',
      'Make the trigger understandable without the tooltip.',
      'Support hover and keyboard focus; essential help stays visible on mobile.',
    ],
    avoid:
      'Interactive content, error messages, or instructions required to finish a task.',
    code: '<GlassTooltip content="Add to your favorites">\n  <GlassButton aria-label="Save track" className="icon-button">\n    <Heart />\n  </GlassButton>\n</GlassTooltip>',
  },
];

/** Quiet Glass editorial shell — separate from the Glass control catalog. */
export const shellComponentGuides: ComponentGuide[] = [
  {
    id: 'site-header',
    name: 'Site header',
    category: 'Navigation',
    summary: 'Quiet Glass chrome with a spectral current-page underline.',
    rules: [
      'Keep glass on the header only; reading surfaces stay solid.',
      'Mark the current route with aria-current="page" for the spectral underline.',
      'Pass a router Link via linkComponent when the host is not plain anchors.',
    ],
    avoid: 'Frosted article bodies or competing primary actions in the chrome.',
    code: '<SiteHeader brand={{ href: "/", label: "jy." }}\n  navItems={[{ href: "/gof", label: "Patterns", current: true }]}\n  theme={theme} onThemeChange={setTheme} />',
  },
  {
    id: 'site-footer',
    name: 'Site footer',
    category: 'Navigation',
    summary: 'A solid closing band for editorial shells.',
    rules: [
      'Keep the footer solid — no glass blur on the page bottom.',
      'Use short secondary links; landmark the nav when links are present.',
      'Pair brand and meta without stacking promotional cards.',
    ],
    avoid: 'Glass chrome or dense marketing blocks in the footer.',
    code: '<SiteFooter brand="Made of light."\n  links={[{ href: "/about", label: "About" }]} />',
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    category: 'Navigation',
    summary: 'Subject → series → article, spoken as a landmark.',
    rules: [
      'Omit href on the current crumb and set aria-current="page".',
      'Keep labels short; prefer subject and series names over full titles.',
      'Expose a nav landmark with an accessible name.',
    ],
    avoid: 'Duplicating the full article title when the H1 already says it.',
    code: '<Breadcrumbs items={[\n  { label: "Home", href: "/" },\n  { label: "Distributed", href: "/distributed" },\n  { label: "Saga" },\n]} />',
  },
  {
    id: 'section-nav',
    name: 'Section nav',
    category: 'Navigation',
    summary: 'Ordered series sidebar with a clear current article.',
    rules: [
      'Use for ordered series only; leave unordered catalogs as lists of cards.',
      'Set aria-current="page" on the reading article.',
      'Pass subject so the current row can pick up the subject accent.',
    ],
    avoid: 'Using section nav for site-wide primary navigation.',
    code: '<SectionNav label="In this series" subject="distributed"\n  items={[{ href: "/saga", title: "Saga", current: true }]} />',
  },
  {
    id: 'article-card',
    name: 'Article card',
    category: 'Surfaces',
    summary: 'A solid index card with a subject hue accent.',
    rules: [
      'Keep the surface solid; subject hue is a leading accent only.',
      'Always show a SubjectTag text label with the hue.',
      'Put reading time in muted mono; never opacity-dim body text.',
    ],
    avoid: 'Frosted glass cards for long-form indexes.',
    code: '<ArticleCard href="/saga" subject="distributed"\n  title="Saga" description="Compensating transactions."\n  readingTime="12 min" />',
  },
  {
    id: 'subject-tag',
    name: 'Subject tag',
    category: 'Feedback',
    summary: 'Subject hue with a readable text label.',
    rules: [
      'Pair every hue with a text label — never color alone.',
      'Use the four subjects: patterns, distributed, ai, certification.',
      'Rely on theme tokens so light tags stay AA on parchment.',
    ],
    avoid: 'Using bright spectral hex as body text on the light theme.',
    code: '<SubjectTag subject="ai" />\n<SubjectTag subject="patterns">GoF</SubjectTag>',
  },
  {
    id: 'prev-next',
    name: 'Prev / next',
    category: 'Navigation',
    summary: 'A quiet pager for ordered articles.',
    rules: [
      'Only render when the section is ordered.',
      'Name each control with direction plus article title.',
      'Keep the surface solid with a spectral-adjacent hover border.',
    ],
    avoid: 'Showing a pager on unordered essay collections.',
    code: '<PrevNext\n  previous={{ href: "/bulkhead", title: "Bulkhead" }}\n  next={{ href: "/saga", title: "Saga" }} />',
  },
  {
    id: 'skip-link',
    name: 'Skip link',
    category: 'Navigation',
    summary: 'Keyboard path past chrome to main content.',
    rules: [
      'Place as the first focusable element in the shell.',
      'Target the main landmark id (default #main).',
      'Keep it visually hidden until focused.',
    ],
    avoid: 'Skipping essential theme or language controls that belong before main.',
    code: '<SkipLink />\n<main id="main" tabIndex={-1}>…</main>',
  },
];

/** Demo explorer catalog — Glass controls only. */
export const componentGuides = glassComponentGuides;

export function guideFor(id: string) {
  return (
    glassComponentGuides.find((guide) => guide.id === id) ??
    shellComponentGuides.find((guide) => guide.id === id)!
  );
}
export function storyDescription(id: string) {
  const g = guideFor(id);
  return `${g.summary}\n\n### Usage rules\n${g.rules.map((r) => `- ${r}`).join('\n')}\n\n**Avoid:** ${g.avoid}`;
}
