import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DefaultPrismLink, type PrismLinkComponent } from './link';

export type PrevNextTarget = {
  href: string;
  title: string;
};

export type PrevNextProps = {
  previous?: PrevNextTarget | null;
  next?: PrevNextTarget | null;
  linkComponent?: PrismLinkComponent;
  className?: string;
  previousLabel?: string;
  nextLabel?: string;
};

/** Article pager for ordered series — previous / next only. */
export function PrevNext({
  previous,
  next,
  linkComponent: Link = DefaultPrismLink,
  className,
  previousLabel = 'Previous',
  nextLabel = 'Next',
}: PrevNextProps) {
  if (!previous && !next) return null;
  return (
    <nav aria-label="Article pager" className={cn('prism-prev-next', className)}>
      {previous ? (
        <Link
          href={previous.href}
          className="prism-prev-next__link prism-prev-next__link--prev"
          aria-label={`${previousLabel}: ${previous.title}`}
        >
          <span className="prism-prev-next__dir">
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
            {previousLabel}
          </span>
          <span className="prism-prev-next__title">{previous.title}</span>
        </Link>
      ) : (
        <span className="prism-prev-next__placeholder" aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="prism-prev-next__link prism-prev-next__link--next"
          aria-label={`${nextLabel}: ${next.title}`}
        >
          <span className="prism-prev-next__dir">
            {nextLabel}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="prism-prev-next__title">{next.title}</span>
        </Link>
      ) : (
        <span className="prism-prev-next__placeholder" aria-hidden="true" />
      )}
    </nav>
  );
}
