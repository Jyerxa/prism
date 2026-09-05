import type { ComponentProps } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
/** Clear is decorative; frosted is for compact content; solid is for dense reading. Avoid nested blur. */
export function GlassCard({
  material = 'frosted',
  className,
  ...props
}: ComponentProps<typeof Card> & { material?: 'clear' | 'frosted' | 'solid' }) {
  return (
    <Card
      {...props}
      className={cn('prism-card', `prism-card--${material}`, className)}
    />
  );
}
