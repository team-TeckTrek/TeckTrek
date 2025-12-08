interface Props {
  current: number
  total: number
}

export default function CardCounter({ current, total }: Props) {
  return (
    <div className="text-[#352107] ">
      <span className="text-3xl font-normal">{current}</span>
      <span className="text-3xl font-normal">/{total}</span>
      <span className="text-sm font-semibold ml-1">枚目</span>
    </div>
  )
}
