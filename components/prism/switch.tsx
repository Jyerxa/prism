'use client';
import { useId, type ComponentProps } from 'react';
import { Switch } from '@/components/ui/switch';
/** Switches apply immediately. Use a checkbox for a choice submitted later. */
export function GlassSwitch({
  label,
  description,
  id,
  ...props
}: ComponentProps<typeof Switch> & { label: string; description?: string }) {
  const generated = useId();
  const controlId = id ?? generated;
  return (
    <div className="prism-switch-row">
      <div>
        <label htmlFor={controlId}>{label}</label>
        {description && <p id={`${controlId}-hint`}>{description}</p>}
      </div>
      <Switch
        {...props}
        id={controlId}
        className="prism-switch"
        aria-describedby={description ? `${controlId}-hint` : undefined}
      />
    </div>
  );
}
