'use client'

import Sample from '@/components/demo/sample'
import Timer from '@/components/common/Timer'

export default function Page() {
  return (
    <div className="h-screen flex w-full flex-row gap-2 py-[8px] px-[16px]">
      <div className="flex min-w-[453px] flex-[453] flex-col gap-2">
        <div className="flex flex-1 items-center justify-center rounded-2xl bg-neutral-200">
          <Sample title="過去絵セクション" />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-2xl bg-neutral-200">
          <Sample title="キャンバス" />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-2xl bg-neutral-200">
          <Sample title="下のボタン群" />
        </div>
      </div>

      <div className="flex min-w-[183px] flex-[183] flex-col gap-2">
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-neutral-200">
          <Sample title="タイム、退室" />
          <Timer time={60} />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-2xl bg-neutral-200">
          <Sample title="プレイヤーアイコン" />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-2xl bg-neutral-200">
          <Sample title="回答するボタン、音楽" />
        </div>
      </div>
    </div>
  )
}
