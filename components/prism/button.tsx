'use client';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
/** Use one primary action per region. Icon-only controls require aria-label. */
export function GlassButton({
  tone = 'glass',
  className,
  ...props
}: ComponentProps<typeof Button> & {
  tone?: 'glass' | 'primary' | 'quiet' | 'danger';
}) {
  return (
    <Button
      {...props}
      className={cn('prism-button', `prism-button--${tone}`, className)}
    />
  );
}
