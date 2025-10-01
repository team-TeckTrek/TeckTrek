'use client'

import React, { useEffect, useState } from 'react'
import { startCountdown } from './helper'
import { cn } from '@/lib/utils'

interface Props {
  time: number
  className?: string
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

  return (
    <div className="flex justify-center items-center">
      <div className={cn(className)}>{count}</div>
    </div>
  )
}
