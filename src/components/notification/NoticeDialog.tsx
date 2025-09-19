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
  body: string | null;
  onClose: () => void;
}

const NoticeDialog: React.FC<NoticeDialogProps> = ({ open, body, onClose }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>お知らせ全文</DialogTitle>
        <DialogDescription>{body}</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export default NoticeDialog;
