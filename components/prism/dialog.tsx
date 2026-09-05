'use client';
import type { ReactElement, ReactNode } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
/** One focused task. Always provide a title, dismissal, and a legible reading surface. */
export function GlassDialog({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
}: {
  trigger: ReactElement;
  title: string;
  description: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent className="prism-dialog">
        <DialogTitle className="prism-dialog-title">{title}</DialogTitle>
        <DialogDescription className="prism-dialog-description">
          {description}
        </DialogDescription>
        <div className="prism-dialog-body">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
