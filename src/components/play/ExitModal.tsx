'use client'

import { Button } from '@/components/ui/button'

export interface ExitModalProps {
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export default function ExitModal({
  message = '退出しますか？',
  confirmLabel = '退出',
  cancelLabel = 'キャンセル',
  onConfirm,
  onCancel,
  loading,
}: ExitModalProps) {
  return (
    <div className="px-4 py-3">
      <p className="text-[16px] text-[#4B3D1E] mb-6">{message}</p>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          disabled={loading}
          variant="outline"
          className="rounded-full w-36 h-12 text-[16px] font-bold
                     text-[#4F7EDF] bg-white
                     ring-[3px] ring-[#4F7EDF] hover:bg-white
                     shadow-[0_6px_0_#D1D5DB]"
        >
          {cancelLabel}
        </Button>

        <Button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="rounded-full w-36 h-12 text-[16px] font-bold
                     text-white bg-[#4F7EDF] hover:bg-[#4F7EDF]
                     ring-[3px] ring-[#4F7EDF]
                     shadow-[0_5px_0_#1E3A8A]"
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  )
}
