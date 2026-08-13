import { useEffect, useState } from 'react'
import { eventConfig } from '../config/event'

type CopyState = 'idle' | 'success' | 'error'

function StrawberryDot() {
  return <span className="block h-2.5 w-2.5 rounded-full bg-[var(--color-strawberry)]" />
}

function BowDot() {
  return <span className="block h-2.5 w-2.5 rounded-full bg-[var(--color-pink-medium)]" />
}

export function GiftAliasCard() {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  useEffect(() => {
    if (copyState === 'idle') {
      return
    }

    const timer = window.setTimeout(() => {
      setCopyState('idle')
    }, 2200)

    return () => {
      window.clearTimeout(timer)
    }
  }, [copyState])

  async function handleCopyAlias() {
    try {
      await navigator.clipboard.writeText(eventConfig.paymentAlias)
      setCopyState('success')
    } catch {
      setCopyState('error')
    }
  }

  return (
    <div className="mt-10">
      <div className="mx-auto h-px w-28 bg-[linear-gradient(90deg,rgba(232,160,180,0),rgba(232,160,180,0.75),rgba(232,160,180,0))]" />

      <div className="card-surface mx-auto mt-7 flex max-w-[820px] flex-col items-center rounded-[30px] px-5 py-6 text-center shadow-[0_16px_38px_rgba(180,126,120,0.14)] sm:px-8 sm:py-6">
        <div className="flex items-center gap-2 text-[var(--color-pink-medium)]">
          <StrawberryDot />
          <BowDot />
          <StrawberryDot />
        </div>

        <h3 className="mt-2.5 font-serif text-[2rem] font-bold leading-none text-[var(--color-text)] sm:text-[2.2rem]">
          Otra forma de acompañarnos.
        </h3>

        <p className="mt-2.5 max-w-[38rem] text-[0.95rem] leading-7 text-[var(--color-text-muted)] sm:text-base">
          {eventConfig.giftAliasDescription}
        </p>

        <div className="mt-4 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <div className="w-full max-w-[360px] rounded-full border border-[rgba(232,160,180,0.45)] bg-[rgba(255,253,252,0.88)] px-6 py-3 text-center text-[0.98rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-strawberry)] shadow-[0_10px_24px_rgba(180,126,120,0.08)] sm:w-auto sm:min-w-[260px]">
            {eventConfig.paymentAlias}
          </div>

          <button
            type="button"
            aria-label={`Copiar alias ${eventConfig.paymentAlias}`}
            className="pill-button w-full border border-[rgba(232,160,180,0.45)] bg-[rgba(249,213,229,0.72)] text-[var(--color-text)] shadow-none hover:bg-[rgba(249,213,229,0.88)] sm:w-auto"
            onClick={handleCopyAlias}
          >
            {copyState === 'success'
              ? eventConfig.giftAliasCopySuccess
              : eventConfig.giftAliasCopyAction}
          </button>
        </div>

        <p className="mt-2 text-[0.85rem] leading-6 text-[var(--color-text-muted)]">
          {eventConfig.giftAliasAccountHolderNote}
        </p>

        <p aria-live="polite" className="mt-2.5 min-h-[1.5rem] text-[0.9rem] text-[var(--color-text-muted)]">
          {copyState === 'error'
            ? eventConfig.giftAliasCopyError
            : copyState === 'success'
              ? eventConfig.giftAliasCopySuccess
              : ''}
        </p>
      </div>
    </div>
  )
}
