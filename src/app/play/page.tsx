'use client'

import Sample from '@/components/demo/sample'
import Timer from '@/components/play/Timer'

export default function Page() {
  return (
    <div className="h-screen flex flex-row gap-2 w-full py-[8px] px-[16px]">
      <div className="flex flex-col gap-2 flex-[453] min-w-[453px]">
        <div className="bg-neutral-200 flex-1 flex">
          <Sample title="過去絵セクション" />
        </div>
        <div className="bg-neutral-200 flex-1 flex">
          <Sample title="キャンバス" />
        </div>
        <div className="bg-neutral-200 flex-1 flex">
          <Sample title="下のボタン群" />
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-[183] min-w-[183px]">
        <div className="bg-neutral-200 flex-1 flex flex-col items-center justify-center">
          <Sample title="タイム、退室" />
          <Timer initialTime={60} isRunning={true} />
        </div>
        <div className="bg-neutral-200 flex-1 flex">
          <Sample title="プレイヤーアイコン" />
        </div>
        <div className="bg-neutral-200 flex-1 flex">
          <Sample title="回答するボタン、音楽" />
        </div>
      </div>
    </div>
  )
}
