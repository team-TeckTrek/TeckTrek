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
        className="h-[555px] w-[631px] max-w-[calc(100vw-48px)] rounded-[24px] bg-white p-[56px] text-[#462C05] gap-[24px] overflow-hidden shadow-[0_2px_6px_4px_rgba(0,0,0,0.25)]"
        onInteractOutside={(e) => {
          if (!dismissible) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (!dismissible) e.preventDefault()
        }}
      >
        <div className="flex h-full min-h-0 flex-col gap-[24px]">
          <DialogHeader className="items-center text-center shrink-0">
            <DialogTitle className="sr-only">待機モーダル</DialogTitle>
            <div className="flex items-end justify-center gap-3 leading-none">
              <span className="text-[40px] font-bold text-[#FF6B6B]">残り</span>
              <span className="text-[96px] font-extrabold text-[#FF6B6B]">
                {remainingSeconds}
              </span>
              <span className="text-[40px] font-bold text-[#FF6B6B]">秒</span>
            </div>
          </DialogHeader>

          <div className="flex items-start justify-center gap-[72px] shrink-0">
            {players.map((player) => (
              <div key={player.id} className="flex flex-col items-center">
                <div className="size-[120px] rounded-full border-[6px] border-[var(--green,#60BD00)] bg-[#D6FFFD] p-2">
                  <div className="relative size-full overflow-hidden rounded-full">
                    <Image
                      src={player.iconUrl ?? '/image/cat.png'}
                      alt={`${player.name} icon`}
                      fill
                      sizes="120px"
                      className="origin-center object-contain object-center -translate-x-[9%] translate-y-[32%] scale-[1.2]"
                    />
                  </div>
                </div>
                <span className="mt-4 inline-flex h-[44px] min-w-[150px] items-center justify-center rounded-full border-[6px] border-[var(--green,#60BD00)] bg-[var(--green_light,#EFFFDF)] px-6 text-[24px] font-bold leading-none text-[var(--green,#60BD00)]">
                  {player.name}
                </span>
              </div>
            ))}
          </div>

          <DialogDescription className="min-h-0 flex-1 overflow-auto whitespace-pre-line text-[24px] leading-[1.6] text-[#462C05] pr-1">
            {rulesText}
          </DialogDescription>

          <DialogFooter className="shrink-0 flex w-full flex-row items-center justify-center gap-[40px]">
            <Button
              type="button"
              onClick={onExit}
              variant="outline"
              className="h-[72px] w-[260px] rounded-[999px] border-[6px] border-[#4F7EE0] bg-white text-[28px] font-bold text-[#4F7EE0] shadow-[0_8px_0_0_rgba(0,0,0,0.18)] hover:bg-[#F1F5FF]"
            >
              {exitLabel}
            </Button>
            <Button
              type="button"
              onClick={onReady}
              className="h-[72px] w-[260px] rounded-[999px] bg-[#4F7EE0] text-[28px] font-bold text-white shadow-[0_8px_0_0_rgba(0,0,0,0.18)] hover:bg-[#3F6FD6]"
            >
              {readyLabel}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
