'use client'

import Sample from '@/components/demo/sample'
import GameHeader from '@/components/play/GameHeader'

export default function Page() {
  return (
    <div className="h-screen flex flex-row gap-2 w-full py-[8px] px-[16px]">
      {/* 左カラム */}
      <div className="flex flex-col gap-2 flex-[453] min-w-[453px]">
        <div className="bg-neutral-200 flex-1 flex items-center justify-center">
          <Sample title="過去絵セクション" />
        </div>
        <div className="bg-neutral-200 flex-1 flex items-center justify-center">
          <Sample title="キャンバス" />
        </div>
        <div className="bg-neutral-200 flex-1 flex items-center justify-center">
          <Sample title="下のボタン群" />
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-[183] min-w-[183px]">
        <div className="bg-neutral-200 flex-1 flex flex-col items-center justify-center">
          <GameHeader />
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
