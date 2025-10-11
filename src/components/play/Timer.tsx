'use client'

import { useEffect, useState } from 'react'

type TimerProps = {
  initialTime: number
  isRunning: boolean
  onComplete?: () => void
}

export default function Timer({
  initialTime,
  isRunning,
  onComplete,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t)
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(t)
  }, [isRunning, timeLeft, onComplete])

  const labelStyle: React.CSSProperties = {
    color: '#3A1F05',
    fontWeight: 950,
    WebkitTextStroke: '1.5px white',
    textShadow: '2px 2px 6px rgba(0,0,0,0.25)',
  }

  const RemainingLabel = () => (
    <span className="text-[40px] -translate-y-[100px]" style={labelStyle}>
      残り
    </span>
  )

  const TimerNumber = () => (
    <span
      className="text-[160px]"
      style={{
        color: '#3A1F05',
        fontWeight: 500,
        fontVariantNumeric: 'tabular-nums',
        textShadow: [
          '-9px -9px 0 #fff',
          '9px -9px 0 #fff',
          '-9px 9px 0 #fff',
          '9px 9px 0 #fff',
          '0 9px 0 #fff',
          '0 -9px 0 #fff',
          '9px 0 0 #fff',
          '-9px 0 0 #fff',
        ].join(', '),
      }}
    >
      {timeLeft}
    </span>
  )

  const SecondsLabel = () => (
    <span className="text-[40px] -translate-y-[30px]" style={labelStyle}>
      秒
    </span>
  )

  return (
    <div className="flex items-end justify-center gap-3 leading-none">
      <RemainingLabel />
      <TimerNumber />
      <SecondsLabel />
    </div>
  )
}
