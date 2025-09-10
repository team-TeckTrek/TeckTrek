import { Badge } from '../ui/badge'

interface Props {
  text: string
}

export default function AppBadge({ text }: Props) {
  return (
    <Badge
      variant="outline"
      className="bg-indigo-500 flex text-white font-bold text-[14px] border-none py-1"
    >
      {text}
    </Badge>
  )
}
