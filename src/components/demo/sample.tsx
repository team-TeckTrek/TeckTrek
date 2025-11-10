import { DemoData } from '@/feature/demo/types'

interface Props {
  items: DemoData
}

export default function Sample({ items }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {items.demo.map((item) => (
        <div
          key={item.id}
          className="flex-1 flex items-center justify-center ring-2 ring-offset-2"
        >
          <h2 className="text-lg font-bold">{item.label}</h2>
        </div>
      ))}
    </div>
  )
}
