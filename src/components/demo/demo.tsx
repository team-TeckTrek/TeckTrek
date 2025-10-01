'use client'

import { useCallback, useState } from 'react'
import Timer from '../common/Timer'

export default function Demo() {
  const [timeUp, setTimeUp] = useState(false)

  const onTimeUp = useCallback((flag: boolean) => {
    if (flag) setTimeUp(true)
  }, [])

  return (
    <div>
      <Timer
        time={3}
        className="text-2xl font-bold text-center text-red-500 text-[48px]"
        onTimeUp={onTimeUp}
      />
      {timeUp && <div className="mt-2 text-center">time up</div>}
    </div>
  )
}
