'use client'

import clsx from 'clsx'
import React from 'react'

import { Button } from '@/components/ui/button'

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
          <Button
            key={`${message}-${index}`}
            type="button"
            variant="ghost"
            className="h-[25px] w-[177px] rounded-t-full rounded-bl-full rounded-br-none bg-[#55C500] px-2 py-0 text-[14px] font-bold leading-none text-white shadow-none transition-transform hover:scale-[1.02] hover:bg-[#55C500] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2556EB]"
            onClick={() => onSelect(message)}
            style={{ boxShadow: '1px 1px 2px 0px #00000080' }}
          >
            {message}
          </Button>
        ))}
      </div>
    </div>
  )
}
