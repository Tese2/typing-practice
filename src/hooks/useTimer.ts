import { useEffect, useRef, useState } from 'react'

export function useTimer(running: boolean, durationSeconds: number, onExpire: (elapsedSeconds: number) => void) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const elapsedRef = useRef(0)
  const expireRef = useRef(onExpire)
  expireRef.current = onExpire

  useEffect(() => {
    if (!running) return
    const startedAt = Date.now() - elapsedRef.current * 1000
    const interval = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000)
      elapsedRef.current = elapsed
      setElapsedSeconds((previous) => previous === elapsed ? previous : elapsed)
      if (durationSeconds > 0 && elapsed >= durationSeconds) expireRef.current(elapsed)
    }, 200)
    return () => window.clearInterval(interval)
  }, [durationSeconds, running])

  const reset = () => {
    elapsedRef.current = 0
    setElapsedSeconds(0)
  }
  return { elapsedSeconds, reset }
}