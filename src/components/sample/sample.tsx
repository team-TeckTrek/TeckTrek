import { SampleTypes } from './type'

interface Props {
  title: SampleTypes[]
}

export function Sample({ title }: Props) {
  return (
    <div>
      {title.map((item) => (
        <div key={item.id}>{item.description}</div>
      ))}
    </div>
  )
}
