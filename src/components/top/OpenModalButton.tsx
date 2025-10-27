'use client'

import { useState, type ComponentProps } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type OpenModalButtonProps = ComponentProps<typeof Button> & {
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
  className,
  variant,
  ...rest
}: OpenModalButtonProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const defaultBtnClass =
    'bg-[#4F7EDF] hover:bg-[#4F7EDF] text-white font-bold ' +
    'rounded-full w-85 h-15 ring-[3px] ring-[#4F7EDF] shadow-[0_10px_0_#1E3A8A] text-2xl'

  const defaultContentClass = 'w-[92vw] sm:max-w-[680px]'

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        onOpenChange?.(v)
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={variant ?? 'default'}
          className={cn(defaultBtnClass, className)}
          {...rest}
        >
          {label ?? children}
        </Button>
      </DialogTrigger>

      <DialogContent className={cn(defaultContentClass, contentClassName)}>
        {renderContent(close)}
      </DialogContent>
    </Dialog>
  )
}
