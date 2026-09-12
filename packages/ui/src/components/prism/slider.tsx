import { useId, useState } from 'react';
import { Slider } from '../ui/slider';
export type GlassSliderProps = {
  label: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
};
/** Approximate values only. Expose the value and unit. Use an input for precision. */
export function GlassSlider({
  label,
  value,
  defaultValue = 50,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '%',
  disabled,
}: GlassSliderProps) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  return (
    <div className="prism-slider-field">
      <div className="prism-slider-label">
        <span id={id}>{label}</span>
        <output>
          {current}
          {unit}
        </output>
      </div>
      <Slider
        className="prism-slider"
        aria-labelledby={id}
        value={[current]}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        thumbProps={{ 'aria-valuetext': `${current}${unit}` }}
        onValueChange={(next) => {
          const n = Array.isArray(next) ? next[0] : next;
          setInternal(n);
          onValueChange?.(n);
        }}
      />
    </div>
  );
}
