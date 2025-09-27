import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/notification/dialog';

interface NoticeDialogProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export default function NoticeDialog({ open, title, content, onClose }: NoticeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title || 'お知らせ'}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
