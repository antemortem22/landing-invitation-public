import { useMemo, useState } from 'react'
import { eventConfig } from '../config/event'
import { initialGifts } from '../data/gifts'
import type { GiftFilter, GiftItem } from '../types'
import { GiftAliasCard } from './GiftAliasCard'
import { GiftCard } from './GiftCard'
import { GiftFilters } from './GiftFilters'
import { GiftImageLightbox } from './GiftImageLightbox'
import { ReserveGiftModal } from './ReserveGiftModal'

const COLLAPSED_GIFTS_COUNT = 6

function ChevronDownMini() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function filterGifts(gifts: GiftItem[], filter: GiftFilter) {
  switch (filter) {
    case 'available':
      return gifts.filter((gift) => gift.status === 'available' || gift.status === 'open')
    case 'open':
      return gifts.filter((gift) => gift.status === 'open')
    case 'reserved':
      return gifts.filter((gift) => gift.status === 'reserved')
    default:
      return gifts
  }
}

export function GiftSection() {
  const [filter, setFilter] = useState<GiftFilter>('all')
  const [gifts, setGifts] = useState<GiftItem[]>(initialGifts)
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null)
  const [previewGift, setPreviewGift] = useState<GiftItem | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const filteredGifts = useMemo(() => filterGifts(gifts, filter), [filter, gifts])
  const visibleGifts = useMemo(() => {
    if (isExpanded) {
      return filteredGifts
    }

    return filteredGifts.slice(0, COLLAPSED_GIFTS_COUNT)
  }, [filteredGifts, isExpanded])
  const hasVisibleResults = visibleGifts.length > 0
  const shouldShowExpandToggle = hasVisibleResults && filteredGifts.length > COLLAPSED_GIFTS_COUNT

  async function handleConfirmGift(gift: GiftItem) {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 450)
    })

    setGifts((currentGifts) =>
      currentGifts.map((currentGift) =>
        currentGift.id === gift.id ? { ...currentGift, status: 'reserved' } : currentGift,
      ),
    )
  }

  function handleFilterChange(nextFilter: GiftFilter) {
    setFilter(nextFilter)
    setIsExpanded(false)
  }

  return (
    <section id="regalos" className="px-4 py-10 sm:py-16">
      <div className="page-shell">
        <div className="section-heading">
          <p className="section-eyebrow">Para Luna</p>
          <h2 className="section-title">Ideas de Regalos</h2>
          <p className="section-copy">{eventConfig.giftSectionIntro}</p>
        </div>

        <GiftFilters activeFilter={filter} onChange={handleFilterChange} />

        <div className="mx-auto mt-8 grid max-w-[1040px] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onReserve={setSelectedGift}
              onImageClick={setPreviewGift}
            />
          ))}
        </div>

        {shouldShowExpandToggle ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.98rem] font-medium text-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--color-strawberry)] hover:underline"
              onClick={() => setIsExpanded((value) => !value)}
            >
              {isExpanded ? 'Ver menos' : 'Ver la lista completa'}
              <span className={isExpanded ? 'rotate-180 transition-transform' : 'transition-transform'}>
                <ChevronDownMini />
              </span>
            </button>
          </div>
        ) : null}

        {hasVisibleResults ? <GiftAliasCard /> : null}

        {!hasVisibleResults ? (
          <p className="mx-auto mt-8 max-w-[680px] rounded-[22px] border border-[var(--color-border)] bg-[rgba(255,253,252,0.82)] px-5 py-6 text-center text-[0.96rem] text-[var(--color-text-muted)]">
            {eventConfig.giftSectionEmptyState}
          </p>
        ) : null}

        {selectedGift ? (
          <ReserveGiftModal
            gift={selectedGift}
            onClose={() => setSelectedGift(null)}
            onConfirm={handleConfirmGift}
          />
        ) : null}

        {previewGift ? (
          <GiftImageLightbox gift={previewGift} onClose={() => setPreviewGift(null)} />
        ) : null}
      </div>
    </section>
  )
}
