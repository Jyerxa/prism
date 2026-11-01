import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import {
  ArticleCard,
  BlogFrame,
  Breadcrumbs,
  PrevNext,
  SectionNav,
  SiteFooter,
  SiteHeader,
  SkipLink,
  SubjectTag,
  ThemeToggle,
  type PrismThemeName,
  type SubjectId,
} from '@prism/ui';
import { storyDescription } from '@prism/ui/guidance';

const subjects: SubjectId[] = [
  'patterns',
  'distributed',
  'ai',
  'certification',
];

const seriesItems = [
  { href: '/distributed/circuit-breaker', title: 'Circuit Breaker' },
  {
    href: '/distributed/retry-backoff-jitter',
    title: 'Retry with Backoff and Jitter',
  },
  { href: '/distributed/bulkhead', title: 'Bulkhead' },
  {
    href: '/distributed/timeout-deadline',
    title: 'Timeout & Deadline Propagation',
    current: true,
  },
  { href: '/distributed/saga', title: 'Saga' },
];

function ThemeShell({
  theme: initial,
  children,
}: {
  theme: PrismThemeName;
  children: (
    theme: PrismThemeName,
    setTheme: (t: PrismThemeName) => void,
  ) => ReactNode;
}) {
  const [theme, setTheme] = useState<PrismThemeName>(initial);
  return (
    <div className={theme} data-theme={theme} style={{ colorScheme: theme }}>
      {children(theme, setTheme)}
    </div>
  );
}

const meta = {
  title: 'Prism/Site shell',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Quiet Glass editorial shell for the blog: glass chrome, solid reading surfaces, spectral active states, subject hues.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj;

export const SiteHeaderStory: Story = {
  name: 'SiteHeader',
  globals: { theme: 'dark' },
  parameters: {
    docs: { description: { story: storyDescription('site-header') } },
  },
  render: () => (
    <ThemeShell theme="dark">
      {(theme, setTheme) => (
        <SiteHeader
          brand={{ href: '/', label: 'jy.', ariaLabel: 'Home' }}
          navItems={[
            { href: '/', label: 'Writing', current: true },
            { href: '/patterns', label: 'Patterns' },
            { href: '/distributed', label: 'Distributed' },
            { href: '/ai', label: 'AI' },
          ]}
          theme={theme}
          onThemeChange={setTheme}
        />
      )}
    </ThemeShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: 'Writing' }),
    ).toHaveAttribute('aria-current', 'page');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Switch to light theme' }),
    );
    await expect(
      canvas.getByRole('button', { name: 'Switch to dark theme' }),
    ).toBeInTheDocument();
  },
};

export const SiteHeaderLight: Story = {
  name: 'SiteHeader · Light',
  globals: { theme: 'light' },
  render: () => (
    <ThemeShell theme="light">
      {(theme, setTheme) => (
        <SiteHeader
          brand={{ href: '/', label: 'jy.', ariaLabel: 'Home' }}
          navItems={[
            { href: '/', label: 'Writing' },
            { href: '/patterns', label: 'Patterns', current: true },
          ]}
          theme={theme}
          onThemeChange={setTheme}
        />
      )}
    </ThemeShell>
  ),
};

export const SiteFooterStory: Story = {
  name: 'SiteFooter',
  parameters: {
    docs: { description: { story: storyDescription('site-footer') } },
  },
  render: () => (
    <SiteFooter
      brand={<span>Quiet craft.</span>}
      links={[
        { href: '/about', label: 'About' },
        { href: '/colophon', label: 'Colophon' },
      ]}
      meta={<span>Vite · MDX · Prism</span>}
    />
  ),
};

export const BreadcrumbsStory: Story = {
  name: 'Breadcrumbs',
  parameters: {
    docs: { description: { story: storyDescription('breadcrumbs') } },
  },
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Distributed', href: '/distributed' },
        { label: 'Timeout & Deadline' },
      ]}
    />
  ),
};

export const SectionNavStory: Story = {
  name: 'SectionNav',
  parameters: {
    docs: { description: { story: storyDescription('section-nav') } },
  },
  render: () => (
    <div style={{ maxWidth: 280, margin: '24px' }}>
      <SectionNav
        label="In this series"
        subject="distributed"
        items={seriesItems}
      />
    </div>
  ),
};

export const ArticleCardStory: Story = {
  name: 'ArticleCard',
  parameters: {
    docs: { description: { story: storyDescription('article-card') } },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 14,
        maxWidth: 520,
        margin: 24,
        width: 'min(520px, calc(100vw - 48px))',
      }}
    >
      {subjects.map((subject) => (
        <ArticleCard
          key={subject}
          href={`/${subject}/example`}
          subject={subject}
          title={`${subject[0]!.toUpperCase()}${subject.slice(1)} essay`}
          description="Solid reading surface with a subject hue accent."
          readingTime="8 min"
        />
      ))}
    </div>
  ),
};

export const SubjectTagStory: Story = {
  name: 'SubjectTag',
  parameters: {
    docs: { description: { story: storyDescription('subject-tag') } },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 16 }}>
      {subjects.map((subject) => (
        <SubjectTag key={subject} subject={subject} />
      ))}
    </div>
  ),
};

export const PrevNextStory: Story = {
  name: 'PrevNext',
  parameters: {
    docs: { description: { story: storyDescription('prev-next') } },
  },
  render: () => (
    <div style={{ maxWidth: 640, margin: 24, width: 'min(640px, calc(100vw - 48px))' }}>
      <PrevNext
        previous={{ href: '/distributed/bulkhead', title: 'Bulkhead' }}
        next={{ href: '/distributed/saga', title: 'Saga' }}
      />
    </div>
  ),
};

export const SkipLinkStory: Story = {
  name: 'SkipLink',
  parameters: {
    docs: { description: { story: storyDescription('skip-link') } },
  },
  render: () => (
    <div style={{ padding: 24 }}>
      <SkipLink />
      <p style={{ color: 'var(--text-muted)' }}>
        Tab once to reveal the skip link, then activate to reach main.
      </p>
      <main id="main" tabIndex={-1}>
        <h2 style={{ margin: 0 }}>Main content</h2>
      </main>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(
      canvas.getByRole('link', { name: 'Skip to content' }),
    ).toHaveFocus();
  },
};

export const ThemeToggleStory: Story = {
  name: 'ThemeToggle',
  render: () => (
    <ThemeShell theme="dark">
      {(theme, setTheme) => <ThemeToggle theme={theme} onThemeChange={setTheme} />}
    </ThemeShell>
  ),
};

function BlogPageFrameRender({ theme: initial }: { theme: PrismThemeName }) {
  return (
    <ThemeShell theme={initial}>
      {(theme, setTheme) => (
        <BlogFrame
          theme={theme}
          onThemeChange={setTheme}
          brand={{ href: '/', label: 'jy.', ariaLabel: 'Home' }}
          navItems={[
            { href: '/', label: 'Writing' },
            { href: '/patterns', label: 'Patterns' },
            { href: '/distributed', label: 'Distributed', current: true },
            { href: '/ai', label: 'AI' },
            { href: '/certification', label: 'Certification' },
          ]}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Distributed', href: '/distributed' },
            { label: 'Timeout & Deadline' },
          ]}
          subject="distributed"
          title="Timeout & Deadline Propagation"
          lede="Carry remaining time across the wire. Distinguish caller cancel from deadline exceeded."
          body={
            <>
              <p>
                Quiet Glass keeps chrome translucent and the article solid. Spectral
                energy marks the active nav item and the current series entry.
              </p>
              <p>
                Subject hues stay on tags and accent bars — never as the only way to
                tell topics apart.
              </p>
            </>
          }
          seriesLabel="Reliability band"
          seriesItems={seriesItems}
          previous={{
            href: '/distributed/bulkhead',
            title: 'Bulkhead',
          }}
          next={{
            href: '/distributed/saga',
            title: 'Saga',
          }}
          related={[
            {
              href: '/distributed/circuit-breaker',
              title: 'Circuit Breaker',
              description: 'Fail fast when a dependency is unhealthy.',
              readingTime: '10 min',
              subject: 'distributed',
            },
            {
              href: '/patterns/strategy',
              title: 'Strategy',
              description: 'Swap algorithms without changing callers.',
              readingTime: '7 min',
              subject: 'patterns',
            },
          ]}
          footerBrand={<span>Quiet craft.</span>}
          footerMeta={<span>Vite · MDX · Prism</span>}
        />
      )}
    </ThemeShell>
  );
}

export const BlogPageFrameDark: Story = {
  name: 'Blog page frame · Dark',
  globals: { theme: 'dark' },
  render: () => <BlogPageFrameRender theme="dark" />,
};

export const BlogPageFrameLight: Story = {
  name: 'Blog page frame · Light',
  globals: { theme: 'light' },
  render: () => <BlogPageFrameRender theme="light" />,
};
