'use client'

import React from 'react'
import { Notice, DEFAULT_TITLE_MAX } from './types'
import { Button } from '@/components/ui/button'

interface Props {
  notice: Notice
  onOpen: (notice: Notice) => void
}

export default function NoticeItem({ notice, onOpen }: Props) {
  const title = notice.title || ''
  const shortTitle =
    title.length > DEFAULT_TITLE_MAX ? title.slice(0, DEFAULT_TITLE_MAX) : title

  const handleClick = () => {
    onOpen(notice)
  }

  return (
    <li className="group flex items-baseline gap-6 py-2 text-base text-[#5B3A18]">
      <span className="w-32 shrink-0">{notice.date}</span>
      <Button
        type="button"
        onClick={handleClick}
        variant="ghost"
        className="h-auto flex-1 justify-start p-0 text-left text-[#5B3A18] hover:bg-transparent focus-visible:underline"
      >
        <span className="block border-b border-[#5B3A18] pb-px whitespace-nowrap">
          {shortTitle}
        </span>
      </Button>
    </li>
  )
}
