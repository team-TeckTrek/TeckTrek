'use client'

import { Button } from '@/components/ui/button'

type Props =
  | { variant: 'loading'; onBack: () => void }
  | { variant: 'error'; onRetry: () => void; onBack: () => void }

export default function MatchStatusView(props: Props) {
  if (props.variant === 'loading') {
    return (
      <div className="mx-auto my-10 w-full text-center space-y-6">
        <p className="text-[22px] font-thin">マッチング中…</p>
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-black/20 border-t-black" />
        <div className="pt-4">
          <Button variant="outline" onClick={props.onBack}>
            戻る
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto my-10 w-full text-center space-y-6">
      <p className="text-[22px] font-thin">通信に失敗しました</p>
      <div className="flex justify-center gap-4 pt-2">
        <Button onClick={props.onRetry}>リトライ</Button>
        <Button variant="outline" onClick={props.onBack}>
          戻る
        </Button>
      </div>
    </div>
  )
}
