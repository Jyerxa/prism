import { useId } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
/** Bounded choices need a visible label and a meaningful default. */
export function GlassSelect({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  disabled,
}: {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="prism-field">
      <label id={id}>{label}</label>
      <Select
        items={options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(v) => {
          if (v !== null) onValueChange?.(v);
        }}
        disabled={disabled}
      >
        <SelectTrigger className="prism-select" aria-labelledby={id}>
          <SelectValue placeholder="Choose an option" />
        </SelectTrigger>
        <SelectContent
          className="prism-select-popup"
          alignItemWithTrigger={false}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="prism-select-item"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
