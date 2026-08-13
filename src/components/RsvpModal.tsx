import { useEffect, useMemo, useState } from 'react'
import type { RsvpFormState } from '../types'
import { eventConfig } from '../config/event'
import { buildRsvpMessage, buildWhatsappUrl } from '../utils/whatsapp'
import { CalendarButton } from './CalendarButton'

type RsvpModalProps = {
  onClose: () => void
}

type Step = 'form' | 'review'

const initialForm: RsvpFormState = {
  fullName: '',
  attendance: 'yes',
  attendees: 1,
  message: '',
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.3 2.3 4.7-4.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8" />
      <path d="m9.5 9.5 5 5m0-5-5 5" strokeLinecap="round" />
    </svg>
  )
}


function CalendarSoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="4.5" y="5.5" width="15" height="14" rx="3" />
      <path d="M8 3.5v4M16 3.5v4M4.5 9.5h15" />
    </svg>
  )
}

function InputListIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 7h14M5 12h14M5 17h14" strokeLinecap="round" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <span
      className="block h-5 w-5 shrink-0 bg-[var(--color-warm-white)]"
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

function ModalTitleHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="sticky top-0 z-20 -mx-5 mb-5 border-b border-[rgba(232,160,180,0.28)] bg-[rgba(254,246,240,0.98)] px-5 pb-4 pt-3 shadow-[0_1px_0_rgba(232,160,180,0.12)] sm:-mx-7 sm:mb-6 sm:px-7 sm:pt-4 lg:-mx-8 lg:px-8">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div
          className="flex min-w-0 items-center gap-2 text-[var(--color-text)]"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(1.35rem, 4.7vw, 2.2rem)',
            fontStyle: 'italic',
            fontWeight: 600,
            lineHeight: 1.05,
          }}
        >
          <span className="shrink-0 text-[1.05em]">🍓</span>
          <span className="truncate">Responder invitacion</span>
          <span className="shrink-0 text-[0.88em]">💌</span>
        </div>

        <button
          type="button"
          aria-label="Cerrar modal"
          className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--color-strawberry)] sm:h-9 sm:w-9"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export function RsvpModal({ onClose }: RsvpModalProps) {
  const [step, setStep] = useState<Step>('form')
  const [form, setForm] = useState<RsvpFormState>(initialForm)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const whatsappUrl = useMemo(
    () => buildWhatsappUrl(eventConfig.whatsappNumber, buildRsvpMessage(form, eventConfig)),
    [form],
  )

  const nameHasError = Boolean(error) && !form.fullName.trim()

  function handleReview() {
    if (!form.fullName.trim()) {
      setError('Ingresa tu nombre y apellido.')
      return
    }

    if (form.attendance === 'yes' && form.attendees < 1) {
      setError('Indica la cantidad de asistentes.')
      return
    }

    setError(null)
    setStep('review')
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-frame" onClick={(event) => event.stopPropagation()}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rsvp-modal-title"
          className="mx-auto w-full max-w-[46rem] overflow-hidden rounded-[28px] border border-[rgba(232,160,180,0.42)] bg-[rgba(254,246,240,0.98)] shadow-[0_20px_44px_rgba(180,126,120,0.18)] sm:rounded-[32px] lg:max-w-[50rem]"
        >
          <div className="max-h-[calc(100vh-5rem)] overflow-y-auto px-5 pb-6 pt-0 sm:max-h-[calc(100vh-10rem)] sm:px-7 sm:pb-7 lg:max-h-[calc(100vh-12.5rem)] lg:px-8">
            <ModalTitleHeader onClose={onClose} />

            {step === 'form' ? (
              <div className="mx-auto flex max-w-[36rem] flex-col items-center text-center">
              <h3 id="rsvp-modal-title" className="sr-only">
                Responder invitacion
              </h3>

              <div className="mt-1 flex w-full flex-col gap-3.5 text-left">
                <label className="block space-y-2">
                  <span className="text-[0.84rem] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
                    Nombre y apellido *
                  </span>
                  <div
                    className={`flex items-center gap-3 rounded-[20px] border bg-[rgba(255,253,252,0.92)] px-4 py-3 shadow-[0_10px_24px_rgba(180,126,120,0.08)] transition-[border-color,box-shadow] ${
                      nameHasError
                        ? 'border-[rgba(200,55,74,0.9)] shadow-[0_0_0_3px_rgba(200,55,74,0.08)]'
                        : 'border-[rgba(232,160,180,0.65)] focus-within:border-[rgba(232,160,180,0.95)] focus-within:shadow-[0_0_0_4px_rgba(249,213,229,0.75),0_10px_24px_rgba(180,126,120,0.1)]'
                    }`}
                  >
                    <span className="shrink-0 text-[rgba(111,102,102,0.82)]">
                      <InputListIcon />
                    </span>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, fullName: event.target.value }))
                      }
                      placeholder="Tu nombre completo"
                      className="w-full border-0 bg-transparent p-0 text-[1rem] text-[var(--color-text)] shadow-none !outline-none !ring-0 focus:!outline-none focus:!ring-0 focus:!shadow-none focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!shadow-none placeholder:text-[rgba(111,102,102,0.58)]"
                      style={{ outline: 'none', boxShadow: 'none' }}
                    />
                  </div>
                  {nameHasError ? (
                    <p className="text-[0.84rem] font-semibold text-[var(--color-strawberry)]">
                      Este campo es obligatorio
                    </p>
                  ) : null}
                </label>

                <fieldset className="space-y-3">
                  <legend className="text-[1rem] font-semibold text-[var(--color-text)]">
                    ¿Vas a asistir? <span className="text-[var(--color-strawberry)]">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      className={`flex min-h-[48px] items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-[0.95rem] font-semibold transition-colors ${
                        form.attendance === 'yes'
                          ? 'border-[rgba(205,78,115,0.95)] bg-[rgba(205,78,115,0.98)] text-[var(--color-warm-white)]'
                          : 'border-[rgba(232,160,180,0.45)] bg-[rgba(245,246,248,0.92)] text-[rgba(111,102,102,0.7)]'
                      }`}
                      onClick={() => setForm((current) => ({ ...current, attendance: 'yes' }))}
                    >
                      <CheckIcon />
                      <span>Si, voy a asistir</span>
                    </button>
                    <button
                      type="button"
                      className={`flex min-h-[48px] items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-[0.95rem] font-semibold transition-colors ${
                        form.attendance === 'no'
                          ? 'border-[rgba(205,78,115,0.95)] bg-[rgba(205,78,115,0.98)] text-[var(--color-warm-white)]'
                          : 'border-[rgba(232,160,180,0.45)] bg-[rgba(245,246,248,0.92)] text-[rgba(111,102,102,0.7)]'
                      }`}
                      onClick={() => setForm((current) => ({ ...current, attendance: 'no' }))}
                    >
                      <CrossCircleIcon />
                      <span>No voy a poder</span>
                    </button>
                  </div>
                </fieldset>

                {form.attendance === 'yes' ? (
                  <div className="rounded-[24px] border border-[rgba(232,160,180,0.55)] bg-[rgba(255,253,252,0.76)] p-4 shadow-[0_10px_24px_rgba(180,126,120,0.08)]">
                    <p className="text-[1rem] font-semibold text-[var(--color-text)]">
                      ¿Cuantos asistentes? <span className="text-[var(--color-strawberry)]">*</span>
                    </p>
                    <div className="mt-4 flex flex-col items-center gap-4">
                      <div className="flex items-center justify-center gap-4 sm:gap-5">
                        <button
                          type="button"
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(232,160,180,0.45)] bg-[rgba(249,213,229,0.84)] text-[1.8rem] leading-none text-[var(--color-strawberry)] shadow-[0_8px_18px_rgba(180,126,120,0.12)]"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              attendees: Math.max(1, current.attendees - 1),
                            }))
                          }
                        >
                          -
                        </button>
                        <div className="min-w-[5rem] text-center">
                          <p className="font-serif text-[2.6rem] font-bold leading-none text-[var(--color-text)]">
                            {form.attendees}
                          </p>
                          <p className="mt-1 text-[0.92rem] text-[var(--color-text-muted)]">
                            persona/s
                          </p>
                        </div>
                        <button
                          type="button"
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(205,78,115,0.45)] bg-[rgba(205,78,115,0.98)] text-[1.8rem] leading-none text-[var(--color-warm-white)] shadow-[0_8px_18px_rgba(180,83,113,0.18)]"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              attendees: current.attendees + 1,
                            }))
                          }
                        >
                          +
                        </button>
                      </div>

                      <p className="text-center text-[0.86rem] leading-6 text-[rgba(111,102,102,0.72)]">
                        Incluí a los niños si van a asistir
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[24px] border border-[rgba(232,160,180,0.55)] bg-[rgba(255,253,252,0.76)] p-4 shadow-[0_10px_24px_rgba(180,126,120,0.08)]">
                    <p className="text-[1rem] leading-7 text-[var(--color-text-muted)]">
                      🌸 ¡Gracias por avisarnos! Te vamos a extrañar 💕
                    </p>
                  </div>
                )}

                <label className="block space-y-2">
                  <span className="text-[1rem] font-semibold text-[var(--color-text)]">
                    Mensaje adicional{' '}
                    <span className="font-normal text-[var(--color-text-muted)]">(opcional)</span>
                  </span>
                  <textarea
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, message: event.target.value }))
                    }
                    rows={3}
                    placeholder="Podes dejarnos un mensaje..."
                    className="w-full rounded-[20px] border border-[rgba(232,160,180,0.65)] bg-[rgba(255,253,252,0.85)] px-5 py-3 text-[var(--color-text)] shadow-[0_10px_24px_rgba(180,126,120,0.08)] !outline-none !ring-0 focus:!outline-none focus:!ring-0 focus:!shadow-[0_10px_24px_rgba(180,126,120,0.08)] focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!shadow-[0_10px_24px_rgba(180,126,120,0.08)] placeholder:text-[rgba(111,102,102,0.58)]"
                    style={{ outline: 'none', boxShadow: '0 10px 24px rgba(180,126,120,0.08)' }}
                  />
                </label>

                {form.attendance === 'no' ? (
                  <div className="rounded-[24px] border border-[rgba(232,160,180,0.55)] bg-[rgba(249,213,229,0.22)] px-5 py-4 shadow-[0_10px_24px_rgba(180,126,120,0.08)]">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-[var(--color-pink-medium)]">
                        <CalendarSoftIcon />
                      </span>
                      <p className="text-[0.98rem] leading-8 text-[var(--color-text-muted)]">
                        Si cambiás de opinión, podés escribirnos antes del{' '}
                        <span className="font-semibold text-[var(--color-strawberry)]">
                          1 de septiembre.
                        </span>
                      </p>
                    </div>
                  </div>
                ) : null}

                {error ? (
                  <p className="rounded-2xl border border-[rgba(200,55,74,0.25)] bg-[rgba(200,55,74,0.08)] px-4 py-3 text-sm text-[var(--color-strawberry)]">
                    {error}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                className="mt-5 inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-[linear-gradient(90deg,#cd4e73,#cb476a)] px-6 py-3.5 text-[1rem] font-semibold text-[var(--color-warm-white)] shadow-[0_16px_34px_rgba(180,83,113,0.2)] transition-transform duration-200 hover:-translate-y-0.5"
                onClick={handleReview}
              >
                <WhatsappIcon />
                <span>
                  {form.attendance === 'yes' ? 'Confirmar por WhatsApp' : 'Avisar por WhatsApp'}
                </span>
              </button>

              <p className="mt-4 text-center text-[0.84rem] leading-5 text-[var(--color-text-muted)] sm:text-[0.98rem]">
                Te redirigiremos a WhatsApp con tu respuesta
              </p>
              </div>
            ) : (
              <div className="mx-auto flex max-w-[36rem] flex-col items-center text-center">
              <h3 id="rsvp-modal-title" className="sr-only">
                Revisa tu respuesta
              </h3>

              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[var(--color-strawberry)] sm:text-[0.66rem] sm:tracking-[0.33em]">
                CONFIRMACION
              </p>

              <h4 className="mt-3 font-serif text-[clamp(1.95rem,4vw,2.9rem)] leading-none text-[var(--color-text)]">
                {eventConfig.rsvpReviewTitle}
              </h4>

              <p className="mt-3 text-[0.95rem] leading-6 text-[var(--color-text-muted)]">
                {eventConfig.rsvpReviewHint}
              </p>

              <div className="mt-6 w-full rounded-[22px] border border-[var(--color-border)] bg-[rgba(249,213,229,0.18)] p-4 text-left sm:p-5">
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-pink-medium)]">
                  Resumen 
                </p>

                <div className="mt-4 space-y-0">
                  <div className="flex items-center justify-between gap-4 border-b border-dashed border-[rgba(232,160,180,0.45)] py-3">
                    <span className="text-sm text-[var(--color-text-muted)]">Nombre</span>
                    <span className="text-right font-semibold text-[var(--color-text)]">
                      {form.fullName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-dashed border-[rgba(232,160,180,0.45)] py-3">
                    <span className="text-sm text-[var(--color-text-muted)]">Respuesta</span>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        form.attendance === 'yes'
                          ? 'bg-[rgba(141,171,141,0.18)] text-[var(--color-sage)]'
                          : 'bg-[rgba(232,160,180,0.22)] text-[var(--color-strawberry)]'
                      }`}
                    >
                      {form.attendance === 'yes' ? 'Si, voy a asistir' : 'No voy a poder'}
                    </span>
                  </div>

                  {form.attendance === 'yes' ? (
                    <div className="flex items-center justify-between gap-4 border-b border-dashed border-[rgba(232,160,180,0.45)] py-3">
                      <span className="text-sm text-[var(--color-text-muted)]">Asistentes</span>
                      <span className="text-right text-[var(--color-text)]">
                        {form.attendees} persona/s
                      </span>
                    </div>
                  ) : null}

                  {form.message ? (
                    <div className="flex items-start justify-between gap-4 py-3">
                      <span className="text-sm text-[var(--color-text-muted)]">Mensaje</span>
                      <span className="max-w-[14rem] text-right italic text-[var(--color-text)]">
                        {form.message}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>

              {form.attendance === 'yes' ? (
                <div className="mt-5 w-full rounded-[22px] border border-[var(--color-border)] bg-[rgba(249,213,229,0.22)] p-5 text-left">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-pink-medium)]">
                    Guarda la fecha
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                    {eventConfig.rsvpCalendarHint}
                  </p>
                  <CalendarButton className="mt-4 w-full sm:w-auto" />
                </div>
              ) : (
                <div className="mt-5 w-full rounded-[24px] border border-[rgba(232,160,180,0.55)] bg-[rgba(249,213,229,0.22)] px-5 py-4 text-left shadow-[0_10px_24px_rgba(180,126,120,0.08)]">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-[var(--color-pink-medium)]">
                      <CalendarSoftIcon />
                    </span>
                    <p className="text-[0.98rem] leading-8 text-[var(--color-text-muted)]">
                      Si cambiás de opinión, podés escribirnos antes del{' '}
                      <span className="font-semibold text-[var(--color-strawberry)]">
                        1 de septiembre.
                      </span>
                    </p>
                  </div>
                </div>
              )}

              <p className="mt-5 text-center text-[0.84rem] leading-5 text-[var(--color-text-muted)] sm:text-sm sm:leading-6">
                {eventConfig.rsvpReviewRedirectHint}
              </p>

              <div className="mt-5 flex w-full flex-col items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pill-button pill-button-primary w-full"
                >
                  {form.attendance === 'yes' ? 'Continuar a WhatsApp' : 'Avisar por WhatsApp'}
                </a>
                <button
                  type="button"
                  className="text-[0.95rem] font-semibold text-[var(--color-strawberry)]"
                  onClick={() => setStep('form')}
                >
                  {eventConfig.rsvpEditAction}
                </button>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
