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
        'flex h-[466px] w-[225px] flex-col rounded-2xl border border-[#D3C9C1] px-6 py-4 shadow-md',
        className,
      )}
      style={{ background: '#FFFFFFB2' }}
    >
      <div className="flex h-full flex-col justify-between">
        {messages.map((message, index) => (
          <button
            key={`${message}-${index}`}
            type="button"
            className="rounded-full bg-[#55C500] py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2556EB]"
            onClick={() => onSelect(message)}
          >
            {message}
          </button>
        ))}
      </div>
    </div>
  )
}
