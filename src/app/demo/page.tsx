import SampleContent from '@/components/demo/sample-content'
import { fetchDemo } from '@/feature/demo/request'

export default async function Page() {
  const samplePromise = fetchDemo()

  return <SampleContent demoDataPromise={samplePromise} />
}
