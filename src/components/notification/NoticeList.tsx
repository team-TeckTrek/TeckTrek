'use client'

import React, { useCallback, useState } from 'react'
import NoticeItem from './NoticeItem'
import NoticeDialog from './NoticeDialog'
import { Notice } from './types'

interface Props {
  notices?: Notice[]
}

const MAX_DISPLAY_COUNT = 3

export default function NoticeList({ notices }: Props) {
  const [modalData, setModalData] = useState<Notice | null>(null)

  const availableNotices = Array.isArray(notices) ? notices : []
  const list = availableNotices.slice(0, MAX_DISPLAY_COUNT)
  const hasNotices = list.length > 0

  const handleOpen = useCallback((notice: Notice) => {
    setModalData(notice)
  }, [])

  const handleClose = useCallback(() => {
    setModalData(null)
  }, [])

  return (
    <section className="w-[1000px] py-8">
      <div className="scale-140 origin-top text-[#5B3A18] bg-white/70 p-6">
        <h2 className="mb-4 text-lg font-bold">お知らせ</h2>

        {hasNotices ? (
          <ul>
            {list.map((notice) => (
              <NoticeItem key={notice.id} notice={notice} onOpen={handleOpen} />
            ))}
          </ul>
        ) : (
          <div className="text-sm text-[#5B3A18]">お知らせはありません</div>
        )}

        <NoticeDialog
          open={modalData !== null}
          notice={modalData}
          onClose={handleClose}
        />
      </div>
    </section>
  )
}
