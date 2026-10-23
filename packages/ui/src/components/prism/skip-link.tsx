import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { DefaultPrismLink, type PrismLinkComponent } from './link';

/** First focusable control in the shell — jumps past chrome to main content. */
export function SkipLink({
  href = '#main',
  children = 'Skip to content',
  className,
  linkComponent: Link = DefaultPrismLink,
}: {
  href?: string;
  children?: ReactNode;
  className?: string;
  linkComponent?: PrismLinkComponent;
}) {
  return (
    <Link href={href} className={cn('prism-skip-link', className)}>
      {children}
    </Link>
  );
}
