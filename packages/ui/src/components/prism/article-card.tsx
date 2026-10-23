import type { ReactNode } from 'react';
import { subjectLabels, type SubjectId } from '../../theme/tokens';
import { cn } from '../../lib/utils';
import { DefaultPrismLink, type PrismLinkComponent } from './link';
import { SubjectTag } from './subject-tag';

export type ArticleCardProps = {
  href: string;
  title: string;
  description?: ReactNode;
  readingTime?: string;
  subject: SubjectId;
  linkComponent?: PrismLinkComponent;
  className?: string;
  /** Optional override for the subject tag label. */
  subjectLabel?: ReactNode;
};

/**
 * Solid reading-surface card for article indexes.
 * Subject hue marks the leading accent only — body text stays semantic.
 */
export function ArticleCard({
  href,
  title,
  description,
  readingTime,
  subject,
  linkComponent: Link = DefaultPrismLink,
  className,
  subjectLabel,
}: ArticleCardProps) {
  return (
    <article
      data-subject={subject}
      className={cn(
        'prism-article-card',
        `prism-article-card--${subject}`,
        className,
      )}
    >
      <div className="prism-article-card__accent" aria-hidden="true" />
      <div className="prism-article-card__body">
        <div className="prism-article-card__meta">
          <SubjectTag subject={subject}>{subjectLabel ?? subjectLabels[subject]}</SubjectTag>
          {readingTime ? (
            <span className="prism-article-card__reading-time">{readingTime}</span>
          ) : null}
        </div>
        <h3 className="prism-article-card__title">
          <Link href={href} className="prism-article-card__link">
            {title}
          </Link>
        </h3>
        {description ? (
          <p className="prism-article-card__description">{description}</p>
        ) : null}
      </div>
    </article>
  );
}
