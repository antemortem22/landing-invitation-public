import { useState } from 'react'
import pinkBow from '../assets/pinkbow.png'
import { eventConfig } from '../config/event'
import { RsvpModal } from './RsvpModal'
import { RsvpCountdownMessage } from './Countdown'

function ClockMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8.5v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WhatsappMiniIcon() {
  return (
    <span
      className="block h-6 w-6 shrink-0 bg-[var(--color-warm-white)]"
      style={{
        maskImage: "url('/whatsapp-mini.svg')",
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskImage: "url('/whatsapp-mini.svg')",
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
      }}
    />
  )
}

export function RsvpSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="confirmar" className="px-4 pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="page-shell">
        <div className="mx-auto max-w-[980px] rounded-[32px] border border-[rgba(232,160,180,0.42)] bg-[rgba(254,246,240,0.96)] px-5 py-7 text-center shadow-[0_18px_44px_rgba(180,126,120,0.2)] backdrop-blur-md sm:px-10 sm:py-9">
          <div className="mb-2.5 flex justify-center sm:mb-3">
            <img src={pinkBow} alt="" aria-hidden="true" className="h-auto w-16 sm:w-20" />
          </div>

          <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[var(--color-strawberry)] sm:text-[0.66rem] sm:tracking-[0.33em]">
            Confirma tu asistencia
          </p>

          <h2 className="mt-3 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-none text-[var(--color-text)]">
            Venis al baby shower?
          </h2>

          <p className="mx-auto mt-4 max-w-[36rem] text-[0.95rem] leading-7 text-[var(--color-text-muted)] sm:text-base">
            {eventConfig.rsvpSectionDescription}
          </p>

          <div className="mx-auto mt-5 h-[2px] w-40 bg-[linear-gradient(90deg,rgba(232,160,180,0),rgba(232,160,180,0.9),rgba(232,160,180,0))]" />

          <RsvpCountdownMessage />

          <button
            type="button"
            className="mt-6 inline-flex min-h-[56px] w-full max-w-[660px] items-center justify-center gap-3 rounded-full bg-[linear-gradient(90deg,#cd4e73,#cb476a)] px-6 py-4 text-[1rem] font-semibold text-[var(--color-warm-white)] shadow-[0_16px_34px_rgba(180,83,113,0.2)] transition-transform duration-200 hover:-translate-y-0.5 sm:text-[1.05rem]"
            onClick={() => setIsOpen(true)}
          >
            <WhatsappMiniIcon />
            <span>Responder invitacion</span>
          </button>

          <div className="mt-5 flex items-center justify-center gap-2 text-[var(--color-text-muted)]">
            <span className="text-[rgba(141,171,141,0.9)]">
              <ClockMiniIcon />
            </span>
            <p className="text-[0.94rem] leading-6 sm:text-[0.98rem]">
              {eventConfig.rsvpRedirectHint}
            </p>
          </div>
        </div>
      </div>

      {isOpen ? <RsvpModal onClose={() => setIsOpen(false)} /> : null}
    </section>
  )
}
