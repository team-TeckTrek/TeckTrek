'use client'

import DrawingBoard from '@/components/play/DrawingBoard'

export default function Page() {
  return (
    <div className="h-screen flex w-full flex-row gap-2 py-[8px] px-[16px]">
      <div className="flex min-w-[453px] flex-[453] flex-col gap-2">
        <div className="flex flex-1 items-center justify-center">
          <DrawingBoard />
        </div>
        <div className="flex flex-1 rounded-2xl bg-neutral-200" />
        <div className="flex flex-1 rounded-2xl bg-neutral-200" />
      </div>

      <div className="flex min-w-[183px] flex-[183] flex-col gap-2">
        <div className="flex flex-1 rounded-2xl bg-neutral-200" />
        <div className="flex flex-1 rounded-2xl bg-neutral-200" />
      </div>
    </div>
  )
}
