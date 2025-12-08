'use client'

import Timer from './Timer'
import CardCounter from './CardCounter'
import ExitButton from './ExitButton'

export default function GameHeader() {
  return (
    <div className="relative w-full h-[160px] bg-transparent">
      <div className="absolute top-4 left-40 scale-150">
        <CardCounter current={1} total={12} />
      </div>
      <div className="absolute top-2 left-74 scale-125">
        <ExitButton />
      </div>
      <div className="absolute top-[65px] left-1/2 scale-80 -translate-x-1/2">
        <Timer initialTime={60} isRunning={true} />
      </div>
    </div>
  )
}
