import { useId, type ComponentProps } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { cn } from '../../lib/utils';

export type GlassRadioOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

/** Use radio choices for one selection from a short, visible list. */
export function GlassRadioGroup({
  label,
  options,
  hint,
  error,
  id,
  className,
  ...props
}: Omit<ComponentProps<typeof RadioGroup>, 'children'> & {
  label: string;
  options: GlassRadioOption[];
  hint?: string;
  error?: string;
}) {
  const generated = useId();
  const groupId = id ?? generated;
  const description =
    [props['aria-describedby'], error || hint ? `${groupId}-help` : null]
      .filter(Boolean)
      .join(' ') || undefined;
  return (
    <div className={cn('prism-field', className)}>
      <span id={`${groupId}-label`}>{label}</span>
      <RadioGroup
        {...props}
        id={groupId}
        className="prism-radio-group"
        aria-labelledby={`${groupId}-label`}
        aria-describedby={description}
        aria-invalid={!!error || props['aria-invalid']}
      >
        {options.map((option, index) => {
          const optionId = `${groupId}-option-${index}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className="prism-radio-row"
              data-disabled={props.disabled || option.disabled || undefined}
            >
              <RadioGroupItem
                id={optionId}
                value={option.value}
                disabled={props.disabled || option.disabled}
                className="prism-radio"
                aria-labelledby={`${optionId}-label`}
                aria-invalid={!!error || props['aria-invalid']}
                aria-describedby={
                  option.description ? `${optionId}-description` : undefined
                }
              />
              <span>
                <span id={`${optionId}-label`} className="prism-radio-label">
                  {option.label}
                </span>
                {option.description && (
                  <span
                    id={`${optionId}-description`}
                    className="prism-radio-description"
                  >
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </RadioGroup>
      {(error || hint) && (
        <p
          id={`${groupId}-help`}
          className={error ? 'field-error' : 'field-hint'}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}
