'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
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

const ARROW_WIDTH = 16
const ARROW_HEIGHT = 32
const ARROW_TOP = 48.5

function Arrow() {
  return (
    <svg
      width={ARROW_WIDTH}
      height={ARROW_HEIGHT}
      viewBox="0 0 16 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 0L16 16L0 32V0Z" fill="var(--brown,#462C05)" />
    </svg>
  )
}

export default function SpectatorPlayerRow({
  players,
  reactions,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [arrowPositions, setArrowPositions] = useState<
    Array<{ left: number; key: string }>
  >([])

  useLayoutEffect(() => {
    const updatePositions = () => {
      const container = containerRef.current
      if (!container) return

      const parentLeft = container.getBoundingClientRect().left
      const next: Array<{ left: number; key: string }> = []

      for (let i = 0; i < players.length - 1; i += 1) {
        const current = itemRefs.current[i]
        const nextItem = itemRefs.current[i + 1]
        if (!current || !nextItem) continue

        const currentRect = current.getBoundingClientRect()
        const nextRect = nextItem.getBoundingClientRect()
        const currentRight = currentRect.left - parentLeft + currentRect.width
        const gap = nextRect.left - currentRect.left - currentRect.width
        const left = currentRight + (gap - ARROW_WIDTH) / 2
        next.push({ left, key: `arrow-${i}` })
      }

      setArrowPositions(next)
    }

    updatePositions()
    window.addEventListener('resize', updatePositions)
    return () => window.removeEventListener('resize', updatePositions)
  }, [players.length])

  return (
    <div
      ref={containerRef}
      className={clsx(
        'flex h-[129px] w-[719px] items-end gap-[121px] border border-[#D3C9C1] px-[17px] pt-[16px]',
        className,
      )}
      style={{ position: 'relative' }}
    >
      {players.map((player, index) => {
        const reaction = reactions[player.id]

        return (
          <div
            key={player.id}
            ref={(node) => {
              itemRefs.current[index] = node
            }}
            className="flex h-full w-[80px] flex-col items-center justify-end"
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

      {arrowPositions.map(({ left, key }) => (
        <div
          key={key}
          className="pointer-events-none absolute flex h-[32px] w-[16px] items-center justify-center"
          style={{ left, top: ARROW_TOP }}
        >
          <Arrow />
        </div>
      ))}
    </div>
  )
}
