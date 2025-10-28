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

const ICON_CONTAINER_WIDTH = 114
const ARROW_WIDTH = 16
const ARROW_HEIGHT = 32
const FALLBACK_ARROW_TOP = 48.5

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
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const [arrowPositions, setArrowPositions] = useState<
    Array<{ left: number; top: number; key: string }>
  >([])

  useLayoutEffect(() => {
    const update = () => {
      const container = containerRef.current
      if (!container) return

      const parentRect = container.getBoundingClientRect()
      const parentLeft = parentRect.left
      const parentTop = parentRect.top
      const placements: Array<{ left: number; top: number; key: string }> = []

      for (let i = 0; i < players.length - 1; i += 1) {
        const current = itemRefs.current[i]
        const nextItem = itemRefs.current[i + 1]
        const icon = iconRefs.current[i]
        if (!current || !nextItem) continue

        const currentRect = current.getBoundingClientRect()
        const nextRect = nextItem.getBoundingClientRect()
        const currentRight =
          currentRect.left - parentLeft + ICON_CONTAINER_WIDTH
        const gap = nextRect.left - currentRect.left - ICON_CONTAINER_WIDTH
        const left = currentRight + (gap - ARROW_WIDTH) / 2

        let top = FALLBACK_ARROW_TOP
        if (icon) {
          const iconRect = icon.getBoundingClientRect()
          top =
            iconRect.top - parentTop + iconRect.height / 2 - ARROW_HEIGHT / 2
        }

        placements.push({ left, top, key: `arrow-${i}` })
      }

      setArrowPositions(placements)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [players.length])

  return (
    <div
      className={clsx(
        'flex h-[129px] w-[719px] items-end gap-[121px] border border-[#D3C9C1] px-[17px] pt-[16px]',
        className,
      )}
    >
      <div
        ref={containerRef}
        className="relative flex h-full w-full items-end justify-between gap-[121px]"
      >
        {players.map((player, index) => {
          const reaction = reactions[player.id]

          return (
            <div
              key={player.id}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              className="relative flex h-full w-[114px] flex-col items-start justify-end"
            >
              {reaction ? (
                <div className="absolute -top-16 flex min-w-[96px] max-w-[128px] justify-center rounded-full border border-[#6E4A2B] bg-[#FFFFFFE0] px-4 py-1 text-xs font-semibold text-[#6E4A2B] shadow-sm">
                  {reaction}
                </div>
              ) : null}
              <div
                ref={(node) => {
                  iconRefs.current[index] = node
                }}
                className="flex size-[80px] items-center justify-center"
              >
                <CatIcon className="size-full" />
              </div>
              <span className="mt-[8px] inline-flex h-[25px] w-[82px] items-center justify-center rounded-full border-[3px] border-[var(--green,#60BD00)] bg-[var(--green_light,#EFFFDF)] px-4 text-[14px] font-bold leading-none text-[var(--green,#60BD00)]">
                {player.name}
              </span>
            </div>
          )
        })}

        {arrowPositions.map(({ left, top, key }) => (
          <div
            key={key}
            className="pointer-events-none absolute flex h-[32px] w-[16px] items-center justify-center"
            style={{ left, top }}
          >
            <Arrow />
          </div>
        ))}
      </div>
    </div>
  )
}
