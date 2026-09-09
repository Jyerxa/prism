'use client';
import type { ComponentProps } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
/** Status needs a text label. Badges are metadata, not buttons. */
export function GlassBadge({
  tone = 'neutral',
  className,
  ...props
}: ComponentProps<typeof Badge> & { tone?: 'neutral' | 'verdigris' | 'blue' }) {
  return (
    <Badge
      {...props}
      className={cn('prism-badge', `prism-badge--${tone}`, className)}
    />
  );
}
