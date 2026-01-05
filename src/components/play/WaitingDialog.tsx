'use client'

import React, { useCallback } from 'react'
import Image from 'next/image'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export type WaitingPlayer = {
  id: string
  name: string
  iconUrl?: string
}

type Props = {
  open: boolean
  remainingSeconds: number
  players: WaitingPlayer[]
  rulesText: string
  onExit: () => void
  onReady: () => void
  dismissible?: boolean
  exitLabel?: string
  readyLabel?: string
}

export default function WaitingDialog({
  open,
  remainingSeconds,
  players,
  rulesText,
  onExit,
  onReady,
  dismissible = false,
  exitLabel = '退出',
  readyLabel = '準備完了',
}: Props) {
  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (open && !nextOpen) {
        if (!dismissible) return
        onExit()
      }
    },
    [dismissible, onExit, open],
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col h-[555px] w-[631px] max-w-[631px] sm:max-w-[631px] rounded-[24px] border-0 bg-[#FAF7F4] p-[56px] text-[#462C05] gap-6 overflow-hidden shadow-[0_2px_6px_4px_rgba(0,0,0,0.25)]"
        onInteractOutside={(e) => {
          if (!dismissible) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (!dismissible) e.preventDefault()
        }}
      >
        <DialogHeader className="items-center text-center shrink-0">
          <DialogTitle className="sr-only">待機モーダル</DialogTitle>
          <div className="flex items-baseline justify-center gap-1 leading-none">
            <span className="text-[20px] font-normal text-[var(--red,#F85D5D)] leading-[100%] tracking-[0%]">
              残り
            </span>
            <span className="text-[48px] font-bold text-[var(--red,#F85D5D)] leading-[100%] tracking-[0%]">
              {remainingSeconds}
            </span>
            <span className="text-[20px] font-normal text-[var(--red,#F85D5D)] leading-[100%] tracking-[0%]">
              秒
            </span>
          </div>
        </DialogHeader>

        <div className="flex items-center justify-start gap-10 shrink-0 -mx-[56px] px-[82.37px]">
          {players.map((player) => (
            <div key={player.id} className="flex flex-col items-center gap-2">
              <div className="size-[80px] rounded-[100px] border-[3px] border-[var(--green,#60BD00)] bg-[#D6FFFD] p-1">
                <div className="relative size-full overflow-hidden rounded-full">
                  <Image
                    src={player.iconUrl ?? '/image/cat.png'}
                    alt={`${player.name} icon`}
                    fill
                    sizes="80px"
                    className="origin-center object-contain object-center -translate-x-[10%] translate-y-[32%] scale-[1.2]"
                  />
                </div>
              </div>
              <span className="inline-flex h-[25px] w-[84px] items-center justify-center rounded-[100px] border-[3px] border-[var(--green,#60BD00)] bg-[var(--green_light,#EFFFDF)] px-4 py-1 text-[14px] font-bold leading-none text-[var(--green,#60BD00)]">
                {player.name}
              </span>
            </div>
          ))}
        </div>

        <DialogDescription className="min-h-0 flex-1 overflow-auto whitespace-pre-line text-[20px] font-normal leading-[100%] tracking-[0%] text-[var(--brown,#462C05)] -mx-[56px] px-[66px]">
          {rulesText}
        </DialogDescription>

        <DialogFooter className="mt-auto shrink-0 flex w-full items-center justify-center gap-[10px]">
          <Button
            type="button"
            onClick={onExit}
            variant="outline"
            className="h-[56px] w-[164px] rounded-[100px] border-[3px] border-[var(--btn_color,#4F7EDE)] bg-white px-8 py-4 text-[20px] font-bold text-[var(--btn_color,#4F7EDE)] shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:bg-[#F5F7FF] transition-colors"
          >
            {exitLabel}
          </Button>
          <Button
            type="button"
            onClick={onReady}
            className="h-[56px] w-[164px] rounded-[100px] bg-[var(--btn_color,#4F7EDE)] px-8 py-4 text-[20px] font-bold text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:bg-[#3F6FD6] transition-colors"
          >
            {readyLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
