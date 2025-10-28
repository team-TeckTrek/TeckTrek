'use client'

import React from 'react'
import clsx from 'clsx'

interface Props {
  messages: string[]
  onSelect: (message: string) => void
  className?: string
}

export default function SpectatorMessageList({
  messages,
  onSelect,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        'flex h-[466px] w-[225px] flex-col gap-[10px] border border-[#D3C9C1] px-2 py-1.5',
        className,
      )}
      style={{ background: '#FFFFFFB2' }}
    >
      <div className="flex h-full flex-col items-center justify-center gap-[33.43px]">
        {messages.map((message, index) => (
          <button
            key={`${message}-${index}`}
            type="button"
            className="h-[25px] w-[177px] rounded-full bg-[#55C500] px-2 text-[14px] font-bold leading-none text-white transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2556EB]"
            onClick={() => onSelect(message)}
            style={{ boxShadow: '1px 1px 2px 0px #00000080' }}
          >
            {message}
          </button>
        ))}
      </div>
    </div>
  )
}
