import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import NoticeDialog from './NoticeDialog'
import type { Notice } from './types'

const meta: Meta<typeof NoticeDialog> = {
  title: 'Notification/NoticeDialog',
  id: 'notification-noticedialog',
  component: NoticeDialog,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const SAMPLE_NOTICE: Notice = {
  id: 'sample',
  title: 'メンテナンスのお知らせ',
  date: '2025.08.22',
  content:
    'いつもご利用いただきありがとうございます。\n下記の日程でシステムメンテナンスを実施いたします。\n\n2025年8月30日(土) 01:00〜03:00\n※メンテナンス中はサービスをご利用いただけません。',
}

type Story = StoryObj<typeof NoticeDialog>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6]">
        <NoticeDialog
          open={open}
          notice={SAMPLE_NOTICE}
          onClose={() => setOpen(false)}
        />
      </div>
    )
  },
}
