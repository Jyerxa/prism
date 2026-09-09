export type ComponentGuide = {
  id: string;
  name: string;
  category: 'Actions' | 'Surfaces' | 'Inputs' | 'Navigation' | 'Feedback';
  summary: string;
  rules: string[];
  avoid: string;
  code: string;
};
export const componentGuides: ComponentGuide[] = [
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
export function guideFor(id: string) {
  return componentGuides.find((guide) => guide.id === id)!;
}
export function storyDescription(id: string) {
  const g = guideFor(id);
  return `${g.summary}\n\n### Usage rules\n${g.rules.map((r) => `- ${r}`).join('\n')}\n\n**Avoid:** ${g.avoid}`;
}
