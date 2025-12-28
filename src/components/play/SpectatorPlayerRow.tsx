'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import CatIcon from './icons/CatIcon'

export type SpectatorPlayer = {
  id: string
  name: string
  isCurrent?: boolean
  iconUrl?: string
}

interface Props {
  players: SpectatorPlayer[]
  reactions: Record<string, string | undefined>
  className?: string
}

const ARROW_WIDTH = 16
const ARROW_HEIGHT = 32
const FALLBACK_ARROW_TOP = 48.5
const FALLBACK_ICON_TOP = 16
const REACTION_OFFSET_FROM_ICON = -16

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
  const [reactionPositions, setReactionPositions] = useState<number[]>([])

  useLayoutEffect(() => {
    const update = () => {
      const container = containerRef.current
      if (!container) return

      const parentRect = container.getBoundingClientRect()
      const parentLeft = parentRect.left
      const parentTop = parentRect.top
      const placements: Array<{ left: number; top: number; key: string }> = []
      const reactionTops: number[] = []

      const iconMetrics = iconRefs.current.map((icon) => {
        if (!icon) return null
        const rect = icon.getBoundingClientRect()
        return {
          top: rect.top - parentTop,
          left: rect.left - parentLeft,
          width: rect.width,
          height: rect.height,
        }
      })

      for (let i = 0; i < players.length - 1; i += 1) {
        const current = itemRefs.current[i]
        const nextItem = itemRefs.current[i + 1]
        const icon = iconMetrics[i]
        if (!current || !nextItem) continue

        const currentRect = current.getBoundingClientRect()
        const nextRect = nextItem.getBoundingClientRect()
        const currentRight = currentRect.left - parentLeft + currentRect.width
        const nextLeft = nextRect.left - parentLeft
        const left = (currentRight + nextLeft) / 2 - ARROW_WIDTH / 2

        let top = FALLBACK_ARROW_TOP
        if (icon) {
          top = icon.top + icon.height / 2 - ARROW_HEIGHT / 2
        }

        placements.push({ left, top, key: `arrow-${i}` })
      }

      for (let i = 0; i < players.length; i += 1) {
        const icon = iconMetrics[i]
        const iconTop = icon?.top ?? FALLBACK_ICON_TOP
        reactionTops[i] = iconTop + REACTION_OFFSET_FROM_ICON
      }

      setArrowPositions(placements)
      setReactionPositions(reactionTops)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [players.length])

  return (
    <div
      className={clsx(
        'flex h-[129px] w-[719px] items-end gap-[121px]  px-[17px] pt-[16px]',
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
                <div
                  className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-t-full rounded-bl-full rounded-br-none bg-[var(--green,#60BD00)] px-[20px] py-[6px] text-[14px] font-bold leading-none text-white shadow-sm"
                  style={{
                    top:
                      reactionPositions[index] ??
                      FALLBACK_ICON_TOP + REACTION_OFFSET_FROM_ICON,
                  }}
                >
                  {reaction}
                </div>
              ) : null}
              <div
                ref={(node) => {
                  iconRefs.current[index] = node
                }}
                className="flex size-[80px] items-center justify-center"
              >
                {player.iconUrl ? (
                  <div className="relative size-full overflow-hidden rounded-full border-[3px] border-[var(--green,#60BD00)] bg-[#D6FFFD] p-1 sm:p-1.5">
                    <Image
                      src={player.iconUrl}
                      alt={`${player.name} icon`}
                      fill
                      sizes="80px"
                      className="origin-center h-full w-full object-contain object-center -translate-x-[9%] translate-y-[32%] scale-[1.2]"
                    />
                  </div>
                ) : (
                  <CatIcon className="size-full" />
                )}
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
