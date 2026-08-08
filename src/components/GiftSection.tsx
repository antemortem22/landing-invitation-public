import { useEffect, useMemo, useState } from 'react'
import giftPlaceholderImage from '../assets/gifts/gift-nursery.svg'
import { supabase } from '../assets/lib/supabase'
import { eventConfig } from '../config/event'
import { initialGifts } from '../data/gifts'
import type { GiftFilter, GiftItem } from '../types'
import { GiftAliasCard } from './GiftAliasCard'
import { GiftCard } from './GiftCard'
import { GiftFilters } from './GiftFilters'
import { ReserveGiftModal } from './ReserveGiftModal'

const COLLAPSED_GIFTS_COUNT = 6

type GiftRow = {
  id: number
  name: string
  description: string | null
  image_url: string | null
  reference_url: string | null
  reserved: boolean
  created_at: string
}

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
      return gifts.filter((gift) => !gift.reserved)
    case 'reserved':
      return gifts.filter((gift) => gift.reserved)
    default:
      return gifts
  }
}

function mapGiftRowToItem(row: GiftRow): GiftItem {
  return {
    id: row.id,
    image: row.image_url?.trim() ? row.image_url : giftPlaceholderImage,
    name: row.name,
    description: row.description?.trim() || 'Sin descripcion disponible por ahora.',
    referenceUrl: row.reference_url?.trim() || undefined,
    reserved: row.reserved,
  }
}

export function GiftSection() {
  const [filter, setFilter] = useState<GiftFilter>('all')
  const [gifts, setGifts] = useState<GiftItem[]>(initialGifts)
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadGifts() {
      setIsLoading(true)
      setLoadError(null)

      const { data, error } = await supabase
        .from('gifts')
        .select('id, name, description, image_url, reference_url, reserved, created_at')
        .order('created_at', { ascending: true })

      if (!isMounted) {
        return
      }

      if (error) {
        setLoadError(eventConfig.giftSectionLoadError)
        setGifts(initialGifts)
        setIsLoading(false)
        return
      }

      setGifts((data as GiftRow[]).map(mapGiftRowToItem))
      setIsLoading(false)
    }

    void loadGifts()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredGifts = useMemo(() => filterGifts(gifts, filter), [filter, gifts])
  const visibleGifts = useMemo(() => {
    if (isExpanded) {
      return filteredGifts
    }

    return filteredGifts.slice(0, COLLAPSED_GIFTS_COUNT)
  }, [filteredGifts, isExpanded])
  const hasVisibleResults = visibleGifts.length > 0
  const shouldShowExpandToggle =
    !isLoading && hasVisibleResults && filteredGifts.length > COLLAPSED_GIFTS_COUNT

  async function handleConfirmGift(gift: GiftItem) {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 850)
    })

    if (typeof gift.id === 'number') {
      const { data, error } = await supabase
        .from('gifts')
        .update({ reserved: true })
        .eq('id', gift.id)
        .eq('reserved', false)
        .select('id')
        .maybeSingle()

      if (error) {
        throw error
      }

      if (!data) {
        throw new Error('Gift already reserved')
      }
    }

    setGifts((currentGifts) =>
      currentGifts.map((currentGift) =>
        currentGift.id === gift.id ? { ...currentGift, reserved: true } : currentGift,
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
          <p className="section-eyebrow">Para Olivia</p>
          <h2 className="section-title">Ideas de Regalos</h2>
          <p className="section-copy">{eventConfig.giftSectionIntro}</p>
        </div>

        <GiftFilters activeFilter={filter} onChange={handleFilterChange} />

        {loadError ? (
          <p className="mx-auto mt-6 max-w-[760px] rounded-[22px] border border-[rgba(200,55,74,0.18)] bg-[rgba(255,253,252,0.82)] px-4 py-3 text-center text-sm text-[var(--color-text-muted)]">
            {loadError}
          </p>
        ) : null}

        {isLoading ? (
          <div className="mx-auto mt-8 grid max-w-[1040px] gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={`gift-skeleton-${index}`}
                className="card-surface overflow-hidden rounded-[28px] border-[rgba(232,160,180,0.4)] bg-[rgba(254,246,240,0.92)]"
              >
                <div className="h-[200px] animate-pulse bg-[rgba(249,213,229,0.34)] sm:h-[215px]" />
                <div className="space-y-3 px-5 pb-5 pt-4">
                  <div className="h-6 w-2/3 animate-pulse rounded-full bg-[rgba(249,213,229,0.34)]" />
                  <div className="h-4 w-full animate-pulse rounded-full bg-[rgba(249,213,229,0.26)]" />
                  <div className="h-4 w-4/5 animate-pulse rounded-full bg-[rgba(249,213,229,0.26)]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-8 grid max-w-[1040px] gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleGifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} onReserve={setSelectedGift} />
            ))}
          </div>
        )}

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

        {!isLoading && hasVisibleResults ? <GiftAliasCard /> : null}

        {!isLoading && !hasVisibleResults ? (
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
      </div>
    </section>
  )
}
