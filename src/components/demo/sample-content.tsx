import { DemoData } from '@/feature/demo/types'
import { Suspense, use } from 'react'
import Sample from './sample'
import { isError, SerializedError } from '@/feature/fetcher/errors'
import { handleFetchErrors } from '@/utils'

interface Props {
  demoDataPromise: Promise<DemoData | SerializedError>
}

export default function SampleContent({ demoDataPromise }: Props) {
  const demoData = use(demoDataPromise)

  if (isError(demoData)) {
    handleFetchErrors('system', [demoData])
    return null
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Sample items={demoData} />
    </Suspense>
  )
}
