import { DemoData } from '@/feature/demo/types'

interface Props {
  demoData: DemoData
}

export default function Demo({ demoData }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {demoData.demo.map((demo) => (
        <div
          key={demo.id}
          className="flex-1 flex items-center justify-center ring-2 ring-offset-2"
        >
          <h2 className="text-lg font-bold">{demo.label}</h2>
        </div>
      ))}
    </div>
  )
}
