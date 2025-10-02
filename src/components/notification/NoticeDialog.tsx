import React, { useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Notice } from './types';

interface NoticeDialogProps {
  open: boolean;
  notice: Notice | null;
  onClose: () => void;
}

export default function NoticeDialog({ open, notice, onClose }: NoticeDialogProps) {
  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        onClose();
      }
    },
    [onClose],
  );

  const title = notice?.title ?? 'お知らせ';
  const content = notice?.content ?? '';
  const date = notice?.date ?? '';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader className="gap-6">
          <div className="flex items-start justify-between">
            <DialogTitle>{title}</DialogTitle>
            {date ? (
              <span className="text-base font-medium text-[#5B3A18]">{date}</span>
            ) : null}
          </div>
          <DialogDescription className="whitespace-pre-line">
            {content || 'お知らせの内容がここに表示されます。'}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-10">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className={cn(
              'rounded-full border-2 border-[#3E72FF] bg-white px-12 py-3 text-base font-semibold text-[#3E72FF]',
              'shadow-[0_10px_0_rgba(62,114,255,0.3)] transition-transform hover:-translate-y-0.5 hover:bg-white',
            )}
          >
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
