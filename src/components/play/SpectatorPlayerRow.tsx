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
  return (
    <div
      className={clsx(
        'flex h-[129px] w-[719px] items-end justify-between rounded-2xl border border-[#D3C9C1] bg-[rgba(255,238,221,0.6)] px-[17px] pt-[16px]',
        className,
      )}
    >
      {players.map((player) => {
        const reaction = reactions[player.id]

        return (
          <div
            key={player.id}
            className="relative flex h-full w-[114px] flex-col items-start justify-end"
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
