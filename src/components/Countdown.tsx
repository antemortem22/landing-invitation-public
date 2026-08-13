import { useMemo } from 'react'
import { useCountdownSnapshot } from '../hooks/useCountdownSnapshot'
import {
  formatHeroCountdownUnits,
  getHeroCountdownStatusMessage,
  getRsvpCountdownMessage,
} from '../utils/countdown'

export function SoftPinkDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`block h-[2px] w-40 min-w-40 max-w-40 bg-[linear-gradient(90deg,rgba(232,160,180,0),rgba(232,160,180,0.9),rgba(232,160,180,0))] ${className}`.trim()}
    />
  )
}

export function HeroCountdown() {
  const snapshot = useCountdownSnapshot()
  const units = useMemo(() => formatHeroCountdownUnits(snapshot), [snapshot])
  const statusMessage = getHeroCountdownStatusMessage(snapshot)
  const shouldShowNumericCountdown = snapshot.state === 'before' || snapshot.state === 'today'
  const liveMessage = snapshot.state === 'today' ? '¡Es hoy!' : statusMessage
  const statusClassName =
    snapshot.state === 'today'
      ? 'mb-4 inline-flex items-center rounded-full border border-[rgba(141,171,141,0.32)] bg-[rgba(141,171,141,0.14)] px-5 py-2 font-serif text-[1.35rem] font-semibold tracking-[0.04em] text-[var(--color-sage)] shadow-[0_10px_24px_rgba(141,171,141,0.12)] sm:text-[1.55rem]'
      : 'mb-3 text-[0.86rem] font-medium uppercase tracking-[0.18em] text-[var(--color-sage)]'

  return (
    <div className="mt-5 w-full max-w-[540px] text-center">
      {liveMessage ? <p className="sr-only" aria-live="polite">{liveMessage}</p> : null}

      {statusMessage && snapshot.state !== 'before' ? (
        <p className={statusClassName}>
          {snapshot.state === 'today' ? '¡Es hoy!' : statusMessage}
        </p>
      ) : null}

      {shouldShowNumericCountdown ? (
        <>
          <SoftPinkDivider className="mx-auto mb-4" />
          <div className="grid grid-cols-4 gap-2 text-center sm:gap-4">
            {units.map((unit) => (
              <div key={unit.label} className="min-w-0">
                <p className="font-serif text-[clamp(1.8rem,6vw,3rem)] font-medium leading-none text-[rgba(47,42,42,0.88)]">
                  {unit.value}
                </p>
                <p className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[rgba(111,102,102,0.78)] sm:text-[0.66rem]">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

export function RsvpCountdownMessage() {
  const snapshot = useCountdownSnapshot()
  const message = getRsvpCountdownMessage(snapshot)
  const liveMessage =
    snapshot.state === 'today' || snapshot.state === 'started' || snapshot.state === 'ended'
      ? message
      : null

  return (
    <div className="mx-auto mt-5 flex w-full max-w-[660px] items-center justify-center gap-3 rounded-full border border-[rgba(232,160,180,0.45)] bg-[rgba(255,253,252,0.86)] px-5 py-3 text-center shadow-[0_10px_24px_rgba(180,126,120,0.08)]">
      {liveMessage ? <p className="sr-only" aria-live="polite">{liveMessage}</p> : null}
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(249,213,229,0.42)] text-[var(--color-pink-medium)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 8.5v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="text-[0.96rem] font-semibold leading-7 text-[var(--color-strawberry)] sm:text-[1rem]">
        {message}
      </p>
    </div>
  )
}
