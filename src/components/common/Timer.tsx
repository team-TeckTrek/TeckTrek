'use client'

import React, { useEffect, useState } from 'react'
import { startCountdown } from './helper'

interface Props {
  time: number
  className?: React.CSSProperties
}

export default function Timer({ time, className }: Props) {
  const [count, setCount] = useState(time)

  useEffect(() => {
    setCount(time)
  }, [time])

  useEffect(() => {
    const timer = startCountdown(count, setCount)
    return () => timer && clearInterval(timer)
  }, [count])

  return <div className={`${className}`}>{count}</div>
}
