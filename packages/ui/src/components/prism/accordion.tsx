import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion';

export type GlassAccordionItem = {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
};

export type GlassAccordionProps = {
  items: GlassAccordionItem[];
  label: string;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
};

/** Reveal optional details under descriptive headings. Values identify open items. */
export function GlassAccordion({
  items,
  label,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  disabled = false,
}: GlassAccordionProps) {
  return (
    <section aria-label={label}>
      <Accordion
        className="prism-accordion"
        value={value}
        defaultValue={defaultValue}
        onValueChange={(values) => onValueChange?.(values.map(String))}
        multiple={multiple}
        disabled={disabled}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className="prism-accordion-item"
          >
            <AccordionTrigger className="prism-accordion-trigger">
              {item.label}
            </AccordionTrigger>
            <AccordionContent className="prism-accordion-content">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
