import type { ReactNode } from 'react'
import pinkBow from '../assets/pinkbow.png'
import { eventConfig } from '../config/event'
import { CalendarButton } from './CalendarButton'
import { HeroCountdown, SoftPinkDivider } from './Countdown'

type DetailItem = {
  icon: ReactNode
  value: string
  helper?: string
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4.5" y="5.5" width="15" height="14" rx="3" />
      <path d="M8 3.5v4M16 3.5v4M4.5 9.5h15" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8.5v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20.5s6-5.3 6-10.3a6 6 0 1 0-12 0c0 5 6 10.3 6 10.3Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </svg>
  )
}

function StrawberryDot() {
  return <span className="text-[0.9rem] leading-none">🍓</span>
}

function FlowerDot() {
  return <span className="text-[0.9rem] leading-none">🌸</span>
}

function ArrowRightMini() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h13" strokeLinecap="round" />
      <path d="m13 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const detailItems: DetailItem[] = [
  {
    icon: <CalendarIcon />,
    value: `${eventConfig.eventDayLabel}, ${eventConfig.dateLabel}`,
  },
  {
    icon: <ClockIcon />,
    value: eventConfig.timeLabel,
  },
  {
    icon: <PinIcon />,
    value: eventConfig.venue,
    helper: eventConfig.address,
  },
]

export function InvitationHero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-0 items-center px-4 py-4 sm:min-h-[calc(100svh-58px)] sm:py-5"
    >
      <div className="page-shell">
        <div className="mx-auto max-w-[880px] rounded-[32px] border border-[rgba(232,160,180,0.42)] bg-[rgba(254,246,240,0.96)] px-4 py-5 shadow-[0_18px_44px_rgba(180,126,120,0.2)] backdrop-blur-md sm:px-8 sm:py-7 lg:px-12 lg:py-7">
          <div className="mb-2.5 flex justify-center sm:mb-3">
            <img src={pinkBow} alt="" aria-hidden="true" className="h-auto w-16 sm:w-20" />
          </div>

          <div className="mx-auto flex max-w-[560px] flex-col items-center text-center">
            <p className="mb-2 text-[0.62rem] uppercase tracking-[0.28em] text-[var(--color-strawberry)] sm:text-[0.66rem] sm:tracking-[0.33em]">
              {eventConfig.eyebrow}
            </p>

            <h1 className="font-serif text-[clamp(2.35rem,10vw,4.3rem)] font-bold leading-[0.9] text-[var(--color-text)]">
              {eventConfig.title}
            </h1>

            <p className="mt-1 font-serif text-[clamp(1.55rem,3vw,2.35rem)] italic text-[var(--color-pink-medium)]">
              {eventConfig.subtitle}
            </p>

            <p className="mt-3 max-w-[27rem] text-[0.92rem] leading-6 text-[var(--color-text-muted)] sm:text-[0.96rem]">
              {eventConfig.description}
            </p>

            <SoftPinkDivider className="mt-4" />

            <ul className="mt-4 flex w-full max-w-[320px] flex-col gap-2.5 text-left sm:max-w-[340px]">
              {detailItems.map((item) => (
                <li key={item.value} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(249,213,229,0.6)] text-[var(--color-strawberry)]">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-[0.92rem] font-semibold text-[var(--color-text)]">{item.value}</p>
                    {item.helper ? (
                      <p className="mt-0.5 text-[0.8rem] text-[var(--color-text-muted)]">
                        {item.helper}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>

            <HeroCountdown />

            <div className="mt-5 flex w-full flex-col gap-2.5 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-3 lg:flex-nowrap">
              <a
                href="#confirmar"
                className="pill-button w-full border border-transparent bg-[linear-gradient(90deg,#e88d9d,#df798b)] px-6 text-[var(--color-warm-white)] shadow-[var(--shadow-soft)] md:min-w-[198px] md:w-auto"
              >
                Confirmar asistencia
              </a>
              <CalendarButton className="w-full shrink-0 md:min-w-[198px] md:w-auto" />
              <a
                href={eventConfig.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="pill-button w-full shrink-0 justify-center bg-transparent px-2 text-[var(--color-pink-medium)] md:min-h-[44px] md:w-auto"
              >
                Como llegar
                <ArrowRightMini />
              </a>
            </div>

            <div className="mt-5 flex w-full items-center justify-center gap-4 text-[var(--color-pink-medium)]">
              <div className="h-[2px] w-16 bg-[linear-gradient(90deg,rgba(232,160,180,0),rgba(232,160,180,0.9))]" />
              <div className="flex items-center gap-2">
                <StrawberryDot />
                <FlowerDot />
                <StrawberryDot />
              </div>
              <div className="h-[2px] w-16 bg-[linear-gradient(90deg,rgba(232,160,180,0.9),rgba(232,160,180,0))]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
