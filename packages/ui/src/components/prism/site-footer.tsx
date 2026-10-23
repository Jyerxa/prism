import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { DefaultPrismLink, type PrismLinkComponent } from './link';

export type SiteFooterLink = {
  href: string;
  label: string;
};

export type SiteFooterProps = {
  brand?: ReactNode;
  meta?: ReactNode;
  links?: SiteFooterLink[];
  linkComponent?: PrismLinkComponent;
  className?: string;
  navLabel?: string;
};

/** Quiet footer for editorial shells — solid, not glass. */
export function SiteFooter({
  brand,
  meta,
  links,
  linkComponent: Link = DefaultPrismLink,
  className,
  navLabel = 'Footer',
}: SiteFooterProps) {
  return (
    <footer className={cn('prism-site-footer', className)}>
      {brand ? <div className="prism-site-footer__brand">{brand}</div> : null}
      {links && links.length > 0 ? (
        <nav aria-label={navLabel} className="prism-site-footer__nav">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="prism-site-footer__link"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
      {meta ? <div className="prism-site-footer__meta">{meta}</div> : null}
    </footer>
  );
}
