import DrawingBoard from '@/components/play/DrawingBoard'

export default function Page() {
  return (
    <div className="h-screen flex flex-row gap-2 w-full py-[8px] px-[16px]">
      <div className="flex flex-col gap-2 flex-[453] min-w-[453px]">
        <div className="bg-neutral-200 flex-1 flex items-center justify-center p-4">
          <DrawingBoard />
        </div>
      </div>
    </div>
  )
}
