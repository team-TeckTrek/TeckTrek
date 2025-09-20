'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button, type ButtonProps } from '@/components/ui/button'

type OpenModalButtonProps = ButtonProps & {
  renderContent: (close: () => void) => React.ReactNode
  label?: React.ReactNode
  contentClassName?: string
  onOpenChange?: (open: boolean) => void
}

export default function OpenModalButton({
  renderContent,
  label,
  children,
  contentClassName,
  onOpenChange,
  ...btnProps
}: OpenModalButtonProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        onOpenChange?.(v)
      }}
    >
      <DialogTrigger asChild>
        <Button {...btnProps}>{label ?? children}</Button>
      </DialogTrigger>
      <DialogContent className={contentClassName}>
        {renderContent(close)}
      </DialogContent>
    </Dialog>
  )
}
