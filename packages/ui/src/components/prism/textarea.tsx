import { useId, type ComponentProps } from 'react';
import { Textarea } from '../ui/textarea';
import { cn } from '../../lib/utils';

/** Keep a visible label and connect guidance and validation to the field. */
export function GlassTextarea({
  label,
  hint,
  error,
  id,
  className,
  ...props
}: ComponentProps<typeof Textarea> & {
  label: string;
  hint?: string;
  error?: string;
}) {
  const generated = useId();
  const controlId = id ?? generated;
  const description =
    [props['aria-describedby'], error || hint ? `${controlId}-help` : null]
      .filter(Boolean)
      .join(' ') || undefined;
  return (
    <div className={cn('prism-field', className)}>
      <label htmlFor={controlId}>{label}</label>
      <Textarea
        {...props}
        id={controlId}
        className="prism-textarea"
        aria-invalid={!!error || props['aria-invalid']}
        aria-describedby={description}
      />
      {(error || hint) && (
        <p
          id={`${controlId}-help`}
          className={error ? 'field-error' : 'field-hint'}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}
