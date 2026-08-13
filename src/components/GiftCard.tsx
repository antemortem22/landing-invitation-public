import type { GiftItem } from '../types'

type GiftCardProps = {
  gift: GiftItem
  onReserve: (gift: GiftItem) => void
  onImageClick: (gift: GiftItem) => void
}

function ArrowRightMini() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h13" strokeLinecap="round" />
      <path d="m13 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GiftCard({ gift, onReserve, onImageClick }: GiftCardProps) {
  const primaryLink = gift.referenceUrl
  const isReserved = gift.status === 'reserved'
  const isOpen = gift.status === 'open'

  if (isReserved) {
    return (
      <article className="card-surface relative flex h-full flex-col overflow-hidden rounded-[28px] border-[rgba(232,160,180,0.4)] bg-[rgba(254,246,240,0.92)] p-0 shadow-[0_14px_32px_rgba(180,126,120,0.12)]">
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[var(--color-sage)] px-3 py-1 text-[0.74rem] font-semibold text-[var(--color-warm-white)]">
          Ya elegido
        </span>

        <button
          type="button"
          aria-label={`Abrir imagen de ${gift.name}`}
          className="overflow-hidden rounded-t-[28px] bg-[rgba(255,255,255,0.18)] text-left"
          onClick={() => onImageClick(gift)}
        >
          <img
            src={gift.image}
            alt={`Referencia visual para ${gift.name}`}
            className="h-[200px] w-full object-cover object-center grayscale opacity-60 sm:h-[215px]"
          />
        </button>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <h3 className="font-serif text-[1.12rem] font-bold leading-tight text-[rgba(47,42,42,0.45)] sm:text-[1.2rem]">
            {gift.name}
          </h3>

          <p className="mt-2 text-[0.95rem] leading-7 text-[rgba(111,102,102,0.55)]">
            {gift.description}
          </p>

          <div className="mt-auto pt-5">
            <button
              type="button"
              disabled
              className="min-h-[38px] w-full cursor-not-allowed rounded-full bg-[rgba(235,231,228,0.92)] px-5 py-2 text-[0.78rem] font-semibold text-[rgba(111,102,102,0.55)]"
            >
              Reservado
            </button>
          </div>
        </div>
      </article>
    )
  }

  if (isOpen) {
    return (
      <article className="card-surface group relative flex h-full flex-col overflow-hidden rounded-[28px] border-[rgba(232,160,180,0.5)] bg-[rgba(254,246,240,0.98)] p-0 shadow-[0_14px_32px_rgba(180,126,120,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(232,160,180,0.95)] hover:shadow-[0_24px_46px_rgba(180,126,120,0.2),0_0_0_1px_rgba(232,160,180,0.3)]">
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[rgba(249,213,229,0.96)] px-3 py-1 text-[0.74rem] font-semibold text-[var(--color-strawberry)]">
          Siempre viene bien
        </span>

        <button
          type="button"
          aria-label={`Abrir imagen de ${gift.name}`}
          className="overflow-hidden rounded-t-[28px] text-left"
          onClick={() => onImageClick(gift)}
        >
          <img
            src={gift.image}
            alt={`Referencia visual para ${gift.name}`}
            className="h-[200px] w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.025] sm:h-[215px]"
          />
        </button>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <h3 className="font-serif text-[1.12rem] font-bold leading-tight text-[var(--color-text)] transition-colors duration-200 group-hover:text-[rgba(47,42,42,0.98)] sm:text-[1.2rem]">
            {gift.name}
          </h3>

          <p className="mt-2 text-[0.95rem] leading-7 text-[var(--color-text-muted)]">
            {gift.description}
          </p>

          {primaryLink ? (
            <div className="mt-auto pt-5">
              <a
                href={primaryLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.84rem] font-medium text-[var(--color-pink-medium)] no-underline transition-colors duration-200 group-hover:text-[var(--color-strawberry)] sm:text-[0.92rem]"
              >
                Ver producto
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRightMini />
                </span>
              </a>
            </div>
          ) : null}
        </div>
      </article>
    )
  }

  return (
    <article className="card-surface group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] border-[rgba(232,160,180,0.5)] bg-[rgba(254,246,240,0.98)] p-0 shadow-[0_14px_32px_rgba(180,126,120,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(232,160,180,0.95)] hover:shadow-[0_24px_46px_rgba(180,126,120,0.2),0_0_0_1px_rgba(232,160,180,0.3)]">
      <button
        type="button"
        aria-label={`Abrir imagen de ${gift.name}`}
        className="overflow-hidden rounded-t-[28px] text-left"
        onClick={() => onImageClick(gift)}
      >
        <img
          src={gift.image}
          alt={`Referencia visual para ${gift.name}`}
          className="h-[200px] w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.025] sm:h-[215px]"
        />
      </button>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="font-serif text-[1.12rem] font-bold leading-tight text-[var(--color-text)] transition-colors duration-200 group-hover:text-[rgba(47,42,42,0.98)] sm:text-[1.2rem]">
          {gift.name}
        </h3>

        <p className="mt-2 text-[0.95rem] leading-7 text-[var(--color-text-muted)]">
          {gift.description}
        </p>

        <div className="mt-auto flex flex-nowrap items-center justify-between gap-2 pt-5 sm:gap-3">
          {primaryLink ? (
            <a
              href={primaryLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.84rem] font-medium text-[var(--color-pink-medium)] no-underline transition-colors duration-200 group-hover:text-[var(--color-strawberry)] sm:text-[0.92rem]"
            >
              Ver producto
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRightMini />
              </span>
            </a>
          ) : (
            <span />
          )}

          <button
            type="button"
            className="min-h-[38px] shrink-0 rounded-full bg-[rgba(249,213,229,0.9)] px-4 py-2 text-[0.68rem] font-semibold whitespace-nowrap text-[var(--color-text)] shadow-[inset_0_0_0_1px_rgba(232,160,180,0.18)] transition-all duration-200 group-hover:bg-[rgba(220,120,154,0.92)] group-hover:text-[var(--color-warm-white)] group-hover:shadow-[0_10px_22px_rgba(200,85,120,0.18)] sm:px-5 sm:text-[0.72rem]"
            onClick={() => onReserve(gift)}
          >
            Elegir este regalo
          </button>
        </div>
      </div>
    </article>
  )
}
