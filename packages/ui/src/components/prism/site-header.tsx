import type { ReactNode } from 'react';
import type { PrismThemeName } from '../../theme/tokens';
import { cn } from '../../lib/utils';
import { DefaultPrismLink, type PrismLinkComponent } from './link';
import { ThemeToggle } from './theme-toggle';

export type SiteHeaderNavItem = {
  href: string;
  label: string;
  current?: boolean;
};

export type SiteHeaderProps = {
  brand: {
    href: string;
    label: ReactNode;
    /** Accessible name when the visible label is decorative. */
    ariaLabel?: string;
    mark?: ReactNode;
  };
  navItems: SiteHeaderNavItem[];
  theme: PrismThemeName;
  onThemeChange: (theme: PrismThemeName) => void;
  actions?: ReactNode;
  linkComponent?: PrismLinkComponent;
  className?: string;
  navLabel?: string;
};

/** Glass chrome navigation with spectral underline on the current page. */
export function SiteHeader({
  brand,
  navItems,
  theme,
  onThemeChange,
  actions,
  linkComponent: Link = DefaultPrismLink,
  className,
  navLabel = 'Main navigation',
}: SiteHeaderProps) {
  return (
    <header className={cn('prism-site-header', className)}>
      <Link
        href={brand.href}
        className="prism-site-header__brand"
        aria-label={brand.ariaLabel}
      >
        {brand.mark}
        <span className="prism-site-header__brand-label">{brand.label}</span>
      </Link>
      <nav aria-label={navLabel} className="prism-site-header__nav">
        {navItems.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="prism-site-header__link"
            aria-current={item.current ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="prism-site-header__actions">
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        {actions}
      </div>
    </header>
  );
}
