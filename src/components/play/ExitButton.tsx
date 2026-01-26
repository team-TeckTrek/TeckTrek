'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from '@/components/ui/alert-dialog'
import ExitModal from '@/components/play/ExitModal'

export default function ExitButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleExit = () => {
    router.push('/')
    setOpen(false)
  }

  const handleCancel = () => setOpen(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="
            text-[#4B2B07]
            border-[3px] border-[#4B2B07]
            bg-white
            rounded-2xl
            px-6 py-5
            font-bold text-[22px]
            shadow-[2px_3px_0_#4B2B07]/30
            hover:bg-[#fdf9f6]
            active:scale-95
            transition-all duration-150 ease-in-out transform
            focus-visible:ring-2 focus-visible:ring-[#4B2B07]/40 focus-visible:border-transparent
          "
        >
          退出
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[92vw] sm:max-w-[520px]">
        <ExitModal onCancel={handleCancel} onConfirm={handleExit} />
      </AlertDialogContent>
    </AlertDialog>
  )
}
