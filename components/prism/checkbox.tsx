'use client';
import { useId, type ComponentProps } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
/** Label the choice as a statement and keep independent choices independent. */
export function GlassCheckbox({
  label,
  id,
  ...props
}: ComponentProps<typeof Checkbox> & { label: string }) {
  const generated = useId();
  const controlId = id ?? generated;
  return (
    <label className="prism-checkbox-row" htmlFor={controlId}>
      <Checkbox {...props} id={controlId} className="prism-checkbox" />
      <span>{label}</span>
    </label>
  );
}
