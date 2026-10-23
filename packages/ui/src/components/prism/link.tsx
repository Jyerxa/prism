import type { ComponentType, ReactNode } from 'react';

/** Minimal link contract so blog routers can pass their own Link. */
export type PrismLinkProps = {
  href: string;
  className?: string;
  children?: ReactNode;
  'aria-current'?: 'page' | undefined;
  'aria-label'?: string;
  'aria-disabled'?: boolean | 'true' | 'false';
  tabIndex?: number;
};

export type PrismLinkComponent = ComponentType<PrismLinkProps>;

export function DefaultPrismLink({
  href,
  className,
  children,
  ...rest
}: PrismLinkProps) {
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}
