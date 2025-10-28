'use client'

import React from 'react'
import clsx from 'clsx'
import CatIcon from './icons/CatIcon'

export type SpectatorPlayer = {
  id: string
  name: string
  isCurrent?: boolean
}

interface Props {
  players: SpectatorPlayer[]
  reactions: Record<string, string | undefined>
  className?: string
}

export default function SpectatorPlayerRow({
  players,
  reactions,
  className,
}: Props) {
  const iconSize = 80
  const gap = 121
  const baseLeft = 17

  return (
    <div
      className={clsx(
        'relative h-[129px] w-[719px] rounded-2xl border border-[#D3C9C1] bg-transparent',
        className,
      )}
    >
      {players.map((player, index) => {
        const reaction = reactions[player.id]
        const left = baseLeft + index * (iconSize + gap)

        return (
          <div
            key={player.id}
            className="absolute flex h-full w-[80px] flex-col items-center"
            style={{ left, bottom: 23 }}
          >
            {reaction ? (
              <div className="absolute -top-16 flex min-w-[96px] max-w-[128px] justify-center rounded-full border border-[#6E4A2B] bg-[#FFFFFFE0] px-4 py-1 text-xs font-semibold text-[#6E4A2B] shadow-sm">
                {reaction}
              </div>
            ) : null}
            <div className="flex size-[80px] items-center justify-center">
              <CatIcon className="size-full" />
            </div>
            <span className="mt-[8px] inline-flex h-[25px] w-[82px] items-center justify-center rounded-full border-[3px] border-[var(--green,#60BD00)] bg-[var(--green_light,#EFFFDF)] px-4 text-[14px] font-bold leading-none text-[var(--green,#60BD00)]">
              {player.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
