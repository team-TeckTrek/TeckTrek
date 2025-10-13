'use client'

import React from 'react'
import { Notice, DEFAULT_TITLE_MAX } from './types'

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
      <button
        type="button"
        onClick={handleClick}
        className="flex-1 text-left focus:outline-none focus-visible:underline"
      >
        <span className="block border-b border-[#5B3A18] pb-px whitespace-nowrap">
          {shortTitle}
        </span>
      </button>
    </li>
  )
}
