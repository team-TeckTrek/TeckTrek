import DemoContent from '@/components/demo/demo-content'
import { fetchDemo } from '@/feature/demo/request'

export default async function Page() {
  const demoPromise = fetchDemo()

  return <DemoContent demoDataPromise={demoPromise} />
}
