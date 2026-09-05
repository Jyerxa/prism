'use client';
import type { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
export type GlassTabItem = {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
};
/** Tabs switch related panels. Use links for page navigation. */
export function GlassTabs({
  items,
  label,
  value,
  defaultValue,
  onValueChange,
}: {
  items: GlassTabItem[];
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Tabs
      className="prism-tabs"
      value={value}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={(v) => onValueChange?.(String(v))}
    >
      <TabsList activateOnFocus className="prism-tab-list" aria-label={label}>
        {items.map((item) => (
          <TabsTrigger
            className="prism-tab"
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent
          key={item.value}
          value={item.value}
          className="prism-tab-panel"
        >
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
