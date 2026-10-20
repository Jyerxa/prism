import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  GlassAccordion,
  GlassBadge,
  GlassButton,
  GlassCard,
  GlassCheckbox,
  GlassInput,
  GlassRadioGroup,
  GlassSlider,
  GlassSwitch,
  GlassTabs,
  GlassTextarea,
} from '@prism/ui';

function ThemeSpecimen({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <div
      className={theme}
      data-theme={theme}
      style={{
        display: 'grid',
        gap: 16,
        padding: 20,
        borderRadius: 20,
        background: theme === 'light' ? '#f4efe6' : '#0b1018',
        color: theme === 'light' ? '#1c232e' : '#f2f5fa',
        colorScheme: theme,
        minWidth: 280,
      }}
    >
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <GlassBadge>{theme}</GlassBadge>
        <GlassBadge tone="verdigris">accent</GlassBadge>
        <GlassBadge tone="blue">sky</GlassBadge>
      </div>
      <GlassCard material="frosted">
        <strong style={{ fontWeight: 400, letterSpacing: '-0.04em' }}>
          Quiet Glass chrome
        </strong>
        <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: '65ch' }}>
          Solid reading surfaces; spectral accent only on interaction.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <GlassButton>Glass</GlassButton>
          <GlassButton tone="primary">Primary</GlassButton>
          <GlassButton tone="quiet">Quiet</GlassButton>
        </div>
        <GlassInput label="Collection name" placeholder="Evening study" />
        <GlassSwitch label="Reduce transparency" description="Solid fallback" />
        <GlassCheckbox label="Remember preference" />
        <GlassSlider label="Blur" defaultValue={24} max={40} unit="px" />
        <GlassTabs
          label="Theme ideas"
          items={[
            { value: 'a', label: 'Tone', content: 'Monochrome at rest.' },
            { value: 'b', label: 'Focus', content: 'Spectral on focus.' },
          ]}
        />
        <GlassTextarea label="Notes" placeholder="Reading measure 65ch" />
        <GlassRadioGroup
          label="Material"
          defaultValue="frosted"
          options={[
            { value: 'frosted', label: 'Frosted' },
            { value: 'solid', label: 'Solid' },
          ]}
        />
        <GlassAccordion
          label="Quiet Glass"
          defaultValue={['one']}
          items={[
            {
              value: 'one',
              label: 'Why glass on chrome only?',
              content:
                'Header, palette, TOC, and tab bars keep depth; reading content stays solid.',
            },
          ]}
        />
      </GlassCard>
      <div
        aria-hidden
        style={{
          height: 8,
          borderRadius: 999,
          background: 'var(--spectral)',
        }}
      />
    </div>
  );
}

const meta = {
  title: 'Prism/Themes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Quiet Glass + Spectral themes. Use the toolbar Theme control, or compare Obsidian and Gallery side by side.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj;

export const DarkObsidian: Story = {
  globals: { theme: 'dark' },
  render: () => <ThemeSpecimen theme="dark" />,
};

export const LightGallery: Story = {
  globals: { theme: 'light' },
  render: () => <ThemeSpecimen theme="light" />,
};

export const BothThemes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 16,
        padding: 24,
        background: '#121820',
      }}
    >
      <ThemeSpecimen theme="dark" />
      <ThemeSpecimen theme="light" />
    </div>
  ),
};
