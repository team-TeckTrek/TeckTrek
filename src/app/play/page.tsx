import Sample from '@/components/demo/sample'
import CardCounter from '@/components/play/CardCounter'
import ExitButton from '@/components/play/ExitButton'

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
        <div className="bg-neutral-200 flex-1 flex items-center justify-center">
          <CardCounter current={1} total={12} />
          <div className="bg-neutral-200 flex-1 flex items-center justify-center">
            <ExitButton />
          </div>
          <div className="bg-neutral-200 flex-1 flex">
            <Sample title="プレイヤーアイコン" />
          </div>
          <div className="bg-neutral-200 flex-1 flex">
            <Sample title="回答するボタン、音楽" />
          </div>
        </div>
      </div>
    </div>
  )
}
