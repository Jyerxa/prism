import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DefaultPrismLink, type PrismLinkComponent } from './link';

export type BreadcrumbItem = {
  label: string;
  /** Omit href on the current page crumb. */
  href?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  linkComponent?: PrismLinkComponent;
  className?: string;
  label?: string;
};

/** Landmark breadcrumb trail for subject → series → article. */
export function Breadcrumbs({
  items,
  linkComponent: Link = DefaultPrismLink,
  className,
  label = 'Breadcrumb',
}: BreadcrumbsProps) {
  if (items.length === 0) return null;
  return (
    <nav aria-label={label} className={cn('prism-breadcrumbs', className)}>
      <ol className="prism-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${index}-${item.label}`} className="prism-breadcrumbs__item">
              {index > 0 ? (
                <ChevronRight
                  className="prism-breadcrumbs__sep"
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="prism-breadcrumbs__link">
                  {item.label}
                </Link>
              ) : (
                <span
                  className="prism-breadcrumbs__current"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
