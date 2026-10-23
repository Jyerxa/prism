import type { ComponentProps, ReactNode } from 'react';
import {
  subjectLabels,
  type SubjectId,
} from '../../theme/tokens';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';

export type SubjectTagProps = Omit<ComponentProps<typeof Badge>, 'children'> & {
  subject: SubjectId;
  children?: ReactNode;
};

/** Subject hue badge — pairs color with a text label for AA. */
export function SubjectTag({
  subject,
  children,
  className,
  ...props
}: SubjectTagProps) {
  return (
    <Badge
      {...props}
      data-subject={subject}
      className={cn('prism-subject-tag', `prism-subject-tag--${subject}`, className)}
    >
      {children ?? subjectLabels[subject]}
    </Badge>
  );
}
