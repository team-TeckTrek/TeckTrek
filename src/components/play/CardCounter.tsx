// カードの枚数を表示するコンポーネント
type Props = {
  current: number
  total: number
}

export default function CardCounter({ current, total }: Props) {
  return (
    <div className="text-2xl font-normal text-[#352107]">
      {current}/{total}枚目
    </div>
  )
}
