import React, { useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface NoticeDialogProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export default function NoticeDialog({
  open,
  title,
  content,
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-[32px] border border-[#E9D9C7] bg-[#FFF6EB] px-8 py-7 text-[#5E3E2E] shadow-[0_16px_0_#D6B99E]">
        <DialogHeader className="gap-3 text-center">
          <DialogTitle className="text-xl font-semibold tracking-[0.1em] text-[#5E3E2E]">
            {title || 'お知らせ'}
          </DialogTitle>
          <DialogDescription className="text-sm leading-7 text-[#5E3E2E]">
            {content}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
