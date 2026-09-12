import type { ReactElement } from 'react';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '../ui/tooltip';
/** Supplemental help only. Triggers still need an accessible name. */
export function GlassTooltip({
  content,
  children,
}: {
  content: string;
  children: ReactElement;
}) {
  return (
    <TooltipProvider delay={350}>
      <Tooltip>
        <TooltipTrigger render={children} />
        <TooltipContent className="prism-tooltip">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
