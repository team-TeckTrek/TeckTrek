import React, { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import type { Notice } from './types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

interface Props {
  open: boolean
  notice: Notice | null
  onClose: () => void
}

export default function NoticeDialog({ open, notice, onClose }: Props) {
  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        onClose()
      }
    },
    [onClose],
  )

  const title = notice?.title ?? 'メンテナンスのお知らせ'
  const content = notice?.content ?? ''
  const date = notice?.date ?? ''

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#F3F4F6] p-[24px] text-[14px]">
        <DialogHeader className="gap-6">
          <div className="flex items-start justify-between gap-2">
            <DialogTitle className="text-[14px] font-bold text-[#5B3A18]">
              {title}
            </DialogTitle>
            {date ? (
              <span
                className="text-[14px] text-[#5B3A18]/90"
                aria-label="通知日付"
              >
                {date}
              </span>
            ) : null}
          </div>

          <DialogDescription className="h-[85px] w-[327px] max-w-full overflow-hidden whitespace-pre-line text-[14px] font-normal text-[#5B3A18] leading-[100%] tracking-[0]">
            {content || 'お知らせの内容がここに表示されます。'}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-auto">
          <Button
            type="button"
            onClick={onClose}
            className="w-[134px] h-[41px] rounded-[100px] border-2 border-[#2563EB] bg-white text-[14px] text-[#2563EB] px-6 py-3 hover:bg-[#F1F5FF] "
            variant="outline"
          >
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
