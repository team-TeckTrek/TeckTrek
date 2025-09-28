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
    title.length > DEFAULT_TITLE_MAX
      ? title.slice(0, DEFAULT_TITLE_MAX) + '…'
      : title

  return (
    <li className="flex items-start py-2 border-b last:border-b-0">
      <span className="w-24 text-gray-500 shrink-0">{notice.date}</span>
      <div className="ml-2">
        <Button variant="ghost" size="default" onClick={() => onOpen(notice)}>
          <span className="whitespace-nowrap">{shortTitle}</span>
        </Button>
      </div>
    </li>
  )
}
