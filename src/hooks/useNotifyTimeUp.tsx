import { useEffect, useRef } from 'react'

export function useOnTimeUp(
  timeUp: boolean,
  onTimeUp?: (timeUp: boolean) => void,
) {
  const calledRef = useRef(false)

  useEffect(() => {
    if (timeUp && !calledRef.current) {
      calledRef.current = true
      onTimeUp?.(true)
    }
  }, [timeUp, onTimeUp])

  return {
    reset: () => {
      calledRef.current = false
    },
  }
}
