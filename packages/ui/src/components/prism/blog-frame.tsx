import type { ReactNode } from 'react';
import type { PrismThemeName, SubjectId } from '../../theme/tokens';
import { cn } from '../../lib/utils';
import { ArticleCard } from './article-card';
import { Breadcrumbs } from './breadcrumbs';
import type { PrismLinkComponent } from './link';
import { PrevNext } from './prev-next';
import { SectionNav } from './section-nav';
import { SiteFooter } from './site-footer';
import {
  SiteHeader,
  type SiteHeaderNavItem,
  type SiteHeaderProps,
} from './site-header';
import { SkipLink } from './skip-link';
import { SubjectTag } from './subject-tag';

export type BlogFrameProps = {
  theme: PrismThemeName;
  onThemeChange: (theme: PrismThemeName) => void;
  brand: SiteHeaderProps['brand'];
  navItems: SiteHeaderNavItem[];
  breadcrumbs: { label: string; href?: string }[];
  subject: SubjectId;
  title: string;
  lede?: string;
  body?: ReactNode;
  seriesLabel: string;
  seriesItems: { href: string; title: string; current?: boolean }[];
  previous?: { href: string; title: string } | null;
  next?: { href: string; title: string } | null;
  related?: {
    href: string;
    title: string;
    description?: string;
    readingTime?: string;
    subject: SubjectId;
  }[];
  footerBrand?: ReactNode;
  footerMeta?: ReactNode;
  linkComponent?: PrismLinkComponent;
  className?: string;
};

/** Composed editorial frame for Storybook and migration dry-runs. */
export function BlogFrame({
  theme,
  onThemeChange,
  brand,
  navItems,
  breadcrumbs,
  subject,
  title,
  lede,
  body,
  seriesLabel,
  seriesItems,
  previous,
  next,
  related,
  footerBrand,
  footerMeta,
  linkComponent,
  className,
}: BlogFrameProps) {
  return (
    <div className={cn('prism-blog-frame', className)} data-theme={theme}>
      <SkipLink linkComponent={linkComponent} />
      <SiteHeader
        brand={brand}
        navItems={navItems}
        theme={theme}
        onThemeChange={onThemeChange}
        linkComponent={linkComponent}
      />
      <div className="prism-blog-frame__main">
        <main id="main" className="prism-blog-frame__content" tabIndex={-1}>
          <Breadcrumbs items={breadcrumbs} linkComponent={linkComponent} />
          <article className="prism-blog-frame__article">
            <SubjectTag subject={subject} />
            <h1>{title}</h1>
            {lede ? <p className="prism-blog-frame__lede">{lede}</p> : null}
            {body}
            <PrevNext
              previous={previous}
              next={next}
              linkComponent={linkComponent}
            />
          </article>
          {related && related.length > 0 ? (
            <section className="prism-blog-frame__cards" aria-label="Related articles">
              {related.map((card) => (
                <ArticleCard
                  key={card.href}
                  {...card}
                  linkComponent={linkComponent}
                />
              ))}
            </section>
          ) : null}
        </main>
        <aside className="prism-blog-frame__aside">
          <SectionNav
            label={seriesLabel}
            items={seriesItems}
            subject={subject}
            linkComponent={linkComponent}
          />
        </aside>
      </div>
      <SiteFooter
        brand={footerBrand}
        meta={footerMeta}
        linkComponent={linkComponent}
      />
    </div>
  );
}
