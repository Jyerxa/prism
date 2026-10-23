import { useId } from 'react';
import type { SubjectId } from '../../theme/tokens';
import { cn } from '../../lib/utils';
import { DefaultPrismLink, type PrismLinkComponent } from './link';

export type SectionNavItem = {
  href: string;
  title: string;
  current?: boolean;
};

export type SectionNavProps = {
  label: string;
  items: SectionNavItem[];
  subject?: SubjectId;
  linkComponent?: PrismLinkComponent;
  className?: string;
};

/**
 * Ordered series sidebar. Current article uses spectral energy + subject hue.
 * Maps to personal-page ordered sections (pager only when `order` is present).
 */
export function SectionNav({
  label,
  items,
  subject,
  linkComponent: Link = DefaultPrismLink,
  className,
}: SectionNavProps) {
  const labelId = useId();
  return (
    <nav
      aria-label={label}
      data-subject={subject}
      className={cn(
        'prism-section-nav',
        subject && `prism-section-nav--${subject}`,
        className,
      )}
    >
      <p className="prism-section-nav__label" id={labelId}>
        {label}
      </p>
      <ol className="prism-section-nav__list" aria-labelledby={labelId}>
        {items.map((item, index) => (
          <li key={item.href + item.title} className="prism-section-nav__item">
            <Link
              href={item.href}
              className="prism-section-nav__link"
              aria-current={item.current ? 'page' : undefined}
            >
              <span className="prism-section-nav__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="prism-section-nav__title">{item.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
