interface Props {
  title: string
}

export default function Sample({ title }: Props) {
  return (
    <div className="flex-1 flex">
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  )
}
