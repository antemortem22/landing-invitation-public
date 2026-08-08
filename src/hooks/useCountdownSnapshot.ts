import { useMemo, useSyncExternalStore } from 'react'
import { eventConfig } from '../config/event'
import { getCountdownSnapshot } from '../utils/countdown'

type CountdownListener = () => void

const countdownListeners = new Set<CountdownListener>()
let countdownNow = new Date()
let countdownTimerId: number | null = null

function emitCountdownTick() {
  countdownNow = new Date()
  countdownListeners.forEach((listener) => listener())
}

function startCountdownTimer() {
  if (typeof window === 'undefined' || countdownTimerId !== null) {
    return
  }

  countdownTimerId = window.setInterval(emitCountdownTick, 1000)
}

function stopCountdownTimer() {
  if (typeof window === 'undefined' || countdownTimerId === null) {
    return
  }

  window.clearInterval(countdownTimerId)
  countdownTimerId = null
}

function subscribeToCountdown(listener: CountdownListener) {
  countdownListeners.add(listener)
  startCountdownTimer()

  return () => {
    countdownListeners.delete(listener)

    if (countdownListeners.size === 0) {
      stopCountdownTimer()
    }
  }
}

function getCountdownNow() {
  return countdownNow
}

function getCountdownServerSnapshot() {
  return new Date()
}

export function useCountdownSnapshot() {
  const now = useSyncExternalStore(
    subscribeToCountdown,
    getCountdownNow,
    getCountdownServerSnapshot,
  )

  return useMemo(() => getCountdownSnapshot(eventConfig.eventDateTimeIso, now), [now])
}
