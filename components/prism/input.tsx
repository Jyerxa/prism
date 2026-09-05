'use client';
import { useId, type ComponentProps } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
/** Keep a visible label. Connect help and errors; never use placeholder as label. */
export function GlassInput({
  label,
  hint,
  error,
  id,
  className,
  ...props
}: ComponentProps<typeof Input> & {
  label: string;
  hint?: string;
  error?: string;
}) {
  const generated = useId();
  const inputId = id ?? generated;
  const description =
    [props['aria-describedby'], error || hint ? `${inputId}-help` : null]
      .filter(Boolean)
      .join(' ') || undefined;
  return (
    <div className={cn('prism-field', className)}>
      <label htmlFor={inputId}>{label}</label>
      <Input
        {...props}
        id={inputId}
        className="prism-input"
        aria-invalid={!!error || props['aria-invalid']}
        aria-describedby={description}
      />
      {(error || hint) && (
        <p
          id={`${inputId}-help`}
          className={error ? 'field-error' : 'field-hint'}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}
