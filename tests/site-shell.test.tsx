import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
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
} from '@prism/ui';
import { shellComponentGuides } from '@prism/ui/guidance';

const shellGuideIds = [
  'site-header',
  'site-footer',
  'breadcrumbs',
  'section-nav',
  'article-card',
  'subject-tag',
  'prev-next',
  'skip-link',
];

describe('Quiet Glass site shell', () => {
  it('documents each shell component in guidance', () => {
    expect(shellComponentGuides).toHaveLength(shellGuideIds.length);
    for (const id of shellGuideIds) {
      const guide = shellComponentGuides.find((g) => g.id === id);
      expect(guide).toBeTruthy();
      expect(guide!.rules.length).toBeGreaterThanOrEqual(3);
      expect(guide!.avoid.length).toBeGreaterThan(20);
      expect(guide!.code.length).toBeGreaterThan(10);
    }
  });

  it('exposes header landmarks, spectral current page, and theme toggle', async () => {
    const onThemeChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SiteHeader
        brand={{ href: '/', label: 'jy.', ariaLabel: 'Home' }}
        navItems={[
          { href: '/', label: 'Writing', current: true },
          { href: '/ai', label: 'AI' },
        ]}
        theme="dark"
        onThemeChange={onThemeChange}
      />,
    );

    expect(
      screen.getByRole('banner'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'AI' })).not.toHaveAttribute(
      'aria-current',
    );

    await user.click(
      screen.getByRole('button', { name: 'Switch to light theme' }),
    );
    expect(onThemeChange).toHaveBeenCalledWith('light');
  });

  it('renders a solid footer with optional landmark links', () => {
    render(
      <SiteFooter
        brand="Quiet craft."
        links={[{ href: '/about', label: 'About' }]}
        meta="Prism"
      />,
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Footer' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
  });

  it('marks the current breadcrumb and keeps ancestors linked', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Distributed', href: '/distributed' },
          { label: 'Saga' },
        ]}
      />,
    );
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(within(nav).getByText('Saga')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('highlights the current article in an ordered section nav', () => {
    render(
      <SectionNav
        label="Reliability band"
        subject="distributed"
        items={[
          { href: '/bulkhead', title: 'Bulkhead' },
          { href: '/saga', title: 'Saga', current: true },
        ]}
      />,
    );
    const nav = screen.getByRole('navigation', { name: 'Reliability band' });
    expect(within(nav).getByRole('link', { name: /Saga/ })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(nav).toHaveAttribute('data-subject', 'distributed');
  });

  it('renders a solid article card with subject tag and reading time', () => {
    render(
      <ArticleCard
        href="/distributed/saga"
        subject="distributed"
        title="Saga"
        description="Compensating transactions across services."
        readingTime="12 min"
      />,
    );
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('data-subject', 'distributed');
    expect(screen.getByRole('link', { name: 'Saga' })).toHaveAttribute(
      'href',
      '/distributed/saga',
    );
    expect(screen.getByText('Distributed')).toBeInTheDocument();
    expect(screen.getByText('12 min')).toBeInTheDocument();
    expect(
      screen.getByText('Compensating transactions across services.'),
    ).toBeInTheDocument();
  });

  it('labels subject tags for each hue', () => {
    const { rerender } = render(<SubjectTag subject="patterns" />);
    expect(screen.getByText('Patterns')).toBeInTheDocument();
    rerender(<SubjectTag subject="ai">AI era</SubjectTag>);
    expect(screen.getByText('AI era')).toBeInTheDocument();
  });

  it('names previous and next controls with article titles', () => {
    render(
      <PrevNext
        previous={{ href: '/a', title: 'Bulkhead' }}
        next={{ href: '/b', title: 'Saga' }}
      />,
    );
    expect(
      screen.getByRole('navigation', { name: 'Article pager' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Previous: Bulkhead' }),
    ).toHaveAttribute('href', '/a');
    expect(screen.getByRole('link', { name: 'Next: Saga' })).toHaveAttribute(
      'href',
      '/b',
    );
  });

  it('provides a skip link targeting main content', async () => {
    const user = userEvent.setup();
    render(
      <>
        <SkipLink />
        <main id="main" tabIndex={-1}>
          Content
        </main>
      </>,
    );
    await user.tab();
    const skip = screen.getByRole('link', { name: 'Skip to content' });
    expect(skip).toHaveFocus();
    expect(skip).toHaveAttribute('href', '#main');
  });

  it('toggles theme through the controlled ThemeToggle', async () => {
    const onThemeChange = vi.fn();
    const user = userEvent.setup();
    render(<ThemeToggle theme="light" onThemeChange={onThemeChange} />);
    await user.click(
      screen.getByRole('button', { name: 'Switch to dark theme' }),
    );
    expect(onThemeChange).toHaveBeenCalledWith('dark');
  });

  it('composes the blog page frame with landmarks', () => {
    render(
      <BlogFrame
        theme="dark"
        onThemeChange={() => {}}
        brand={{ href: '/', label: 'jy.', ariaLabel: 'Home' }}
        navItems={[{ href: '/distributed', label: 'Distributed', current: true }]}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Saga' },
        ]}
        subject="distributed"
        title="Saga"
        lede="Compensating work."
        seriesLabel="Messaging"
        seriesItems={[
          { href: '/outbox', title: 'Outbox' },
          { href: '/saga', title: 'Saga', current: true },
        ]}
        previous={{ href: '/outbox', title: 'Outbox' }}
        next={null}
        related={[
          {
            href: '/patterns/strategy',
            title: 'Strategy',
            subject: 'patterns',
            readingTime: '6 min',
          },
        ]}
        footerBrand="Quiet craft."
      />,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
    expect(screen.getByRole('heading', { level: 1, name: 'Saga' })).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Messaging' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Skip to content' }),
    ).toBeInTheDocument();
  });
});
