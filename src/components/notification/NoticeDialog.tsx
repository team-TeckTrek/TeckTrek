'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export default function NoticeDialog({
  open,
  title,
  content,
  onClose,
}: {
  open: boolean
  title: string
  content: string
  onClose: () => void
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{title || 'お知らせ'}</h3>
            <DialogPrimitive.Close asChild>
              <button aria-label="閉じる" className="ml-4 text-gray-500">
                ×
              </button>
            </DialogPrimitive.Close>
          </div>
          <div className="mt-4 text-sm text-gray-700">{content}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
