import DemoContent from '@/components/demo/demo-content'
import { fetchDemo } from '@/feature/demo/request'

export default async function Page() {
  // サーバーコンポーネントでfetchを実行
  // そのまま渡す
  const demoPromise = fetchDemo()

  return <DemoContent demoDataPromise={demoPromise} />
}
