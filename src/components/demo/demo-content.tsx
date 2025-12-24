import { DemoData } from '@/feature/demo/types'
import { Suspense, use } from 'react'
import { isError, SerializedError } from '@/feature/fetcher/errors'
import { handleFetchErrors } from '@/utils'
import Demo from './demo'

interface Props {
  demoDataPromise: Promise<DemoData | SerializedError>
}

export default function DemoContent({ demoDataPromise }: Props) {
  // 受け取ったpromiseをuseで解決
  const demoData = use(demoDataPromise)

  // エラーハンドリング
  if (isError(demoData)) {
    handleFetchErrors('system', [demoData])
    return null
  }

  return (
    // Suspenseでラップして表示
    // fallbackでローディングUIを指定
    <Suspense fallback={<div>Loading...</div>}>
      <Demo demoData={demoData} />
    </Suspense>
  )
}
