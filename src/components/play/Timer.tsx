'use client'

import { useEffect, useState } from 'react'

interface Props {
  initialTime: number
  isRunning: boolean
  onComplete?: () => void
}

export default function Timer({ initialTime, isRunning, onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const time = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(time)
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(time)
  }, [isRunning, timeLeft, onComplete])

  const RemainingLabel = () => (
    <span className="text-[40px] -translate-y-[100px] text-timer-label">
      残り
    </span>
  )

  const TimerNumber = () => (
    <span className="text-[160px] text-timer-number">{timeLeft}</span>
  )

  const SecondsLabel = () => (
    <span className="text-[40px] -translate-y-[30px] text-timer-label">秒</span>
  )

  return (
    <div className="flex items-end justify-center gap-3 leading-none">
      <RemainingLabel />
      <TimerNumber />
      <SecondsLabel />
    </div>
  )
}
