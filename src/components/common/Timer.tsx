'use client'

import React, { useEffect, useRef, useState } from 'react'
import { startCountdown } from './helper'
import { cn } from '@/lib/utils'
import { useOnTimeUp } from '../../hooks/useNotifyTimeUp'

interface Props {
  time: number
  className?: string
  onTimeUp?: (timeUp: boolean) => void
}

export default function Timer({ time, className, onTimeUp }: Props) {
  const [count, setCount] = useState(time)
  const calledRef = useRef(false)

  useEffect(() => {
    setCount(time)
    calledRef.current = false
  }, [time])

  useEffect(() => {
    const timer = startCountdown(count, setCount)
    return () => timer && clearInterval(timer)
  }, [count])

  const timeUp = count <= 0
  const { reset } = useOnTimeUp(timeUp, onTimeUp)

  useEffect(() => {
    reset()
  }, [time, reset])

  return (
    <div className="flex justify-center items-center">
      <div className={cn(className)}>{count}</div>
    </div>
  )
}
