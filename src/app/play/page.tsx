import DrawingBoard from '@/components/play/DrawingBoard'

export default function Page() {
  return (
    <div className="h-screen flex w-full flex-row gap-2 py-[8px] px-[16px]">
      <div className="flex flex-col gap-2 flex-[453] min-w-[453px]">
        <div className="flex flex-1 items-center justify-center">
          <DrawingBoard />
        </div>
        <div className="bg-neutral-200 flex-1 flex rounded-2xl" />
        <div className="bg-neutral-200 flex-1 flex rounded-2xl" />
      </div>

      <div className="flex flex-col gap-2 flex-[183] min-w-[183px]">
        <div className="bg-neutral-200 flex-1 flex rounded-2xl" />
        <div className="bg-neutral-200 flex-1 flex rounded-2xl" />
      </div>
    </div>
  )
}
