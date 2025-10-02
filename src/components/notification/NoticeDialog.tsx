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
import type { Notice } from './types';

interface NoticeDialogProps {
  open: boolean;
  notice: Notice | null;
  onClose: () => void;
}

export default function NoticeDialog({
  open,
  notice,
  onClose,
}: NoticeDialogProps) {
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
        <DialogHeader className="gap-3">
          <div className="flex items-start justify-between gap-3">
            <DialogTitle className="text-base font-semibold text-[#5B3A18]">
              {title}
            </DialogTitle>
            {date ? (
              <span className="pt-0.5 text-sm text-[#5B3A18]">
                {date}
              </span>
            ) : null}
          </div>
          <DialogDescription className="whitespace-pre-line text-sm text-[#5B3A18]">
            {content || 'お知らせの内容がここに表示されます。'}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
