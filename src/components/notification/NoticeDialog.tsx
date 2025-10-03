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

  const title = notice?.title ?? 'メンテナンスのお知らせ';
  const content = notice?.content ?? '';
  const date = notice?.date ?? '';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#F3F4F6] p-[10px]">
        <DialogHeader className="gap-2">
          <div className="flex items-start justify-between gap-2">
            <DialogTitle className="text-sm font-semibold text-[#5B3A18]">
              {title}
            </DialogTitle>
            {date ? (
              <span className="text-xs text-[#5B3A18]/90" aria-label="通知日付">
                {date}
              </span>
            ) : null}
          </div>

          <DialogDescription className="whitespace-pre-line text-xs text-[#5B3A18] leading-relaxed">
            {content || 'お知らせの内容がここに表示されます。'}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-auto">
          <Button
            type="button"
            onClick={onClose}
            className="h-9 w-28 rounded-full border border-[#93C5FD] bg-white text-xs text-[#2563EB] hover:bg-[#F1F5FF]"
            variant="outline"
          >
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
