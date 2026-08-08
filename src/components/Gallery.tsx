import { useEffect, useMemo, useRef, useState } from 'react'
import { galleryItems } from '../data/gallery'
import { GalleryCard } from './GalleryCard'
import { GalleryLightbox } from './GalleryLightbox'

function getVisibleCount(width: number) {
  if (width >= 1280) {
    return 3
  }

  if (width >= 768) {
    return 2
  }

  return 1
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window === 'undefined' ? 1 : getVisibleCount(window.innerWidth),
  )
  const [isDocumentHidden, setIsDocumentHidden] = useState(() =>
    typeof document === 'undefined' ? false : document.hidden,
  )
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isManualPauseActive, setIsManualPauseActive] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const autoplayTimeoutRef = useRef<number | null>(null)
  const manualPauseTimeoutRef = useRef<number | null>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    function handleResize() {
      setVisibleCount(getVisibleCount(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => {
      setIsReducedMotion(mediaQuery.matches)
    }

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => {
      mediaQuery.removeEventListener('change', updatePreference)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const visibleItems = useMemo(() => {
    return Array.from({ length: Math.min(visibleCount, galleryItems.length) }, (_, offset) => {
      const itemIndex = (currentIndex + offset) % galleryItems.length
      return {
        item: galleryItems[itemIndex],
        itemIndex,
      }
    })
  }, [currentIndex, visibleCount])

  function resetAutoplay() {
    if (autoplayTimeoutRef.current !== null) {
      window.clearTimeout(autoplayTimeoutRef.current)
      autoplayTimeoutRef.current = null
    }
  }

  function clearManualPauseTimeout() {
    if (manualPauseTimeoutRef.current !== null) {
      window.clearTimeout(manualPauseTimeoutRef.current)
      manualPauseTimeoutRef.current = null
    }
  }

  function goToIndex(nextIndex: number) {
    setCurrentIndex((nextIndex + galleryItems.length) % galleryItems.length)
  }

  function handleManualNavigation(nextIndex: number) {
    resetAutoplay()
    clearManualPauseTimeout()
    setIsManualPauseActive(true)
    manualPauseTimeoutRef.current = window.setTimeout(() => {
      setIsManualPauseActive(false)
      manualPauseTimeoutRef.current = null
    }, 5000)
    goToIndex(nextIndex)
  }

  useEffect(() => {
    resetAutoplay()

    const shouldPauseAutoplay =
      isReducedMotion ||
      lightboxIndex !== null ||
      isDocumentHidden ||
      isManualPauseActive ||
      galleryItems.length <= 1

    if (shouldPauseAutoplay) {
      return
    }

    autoplayTimeoutRef.current = window.setTimeout(() => {
      setCurrentIndex((value) => (value + 1) % galleryItems.length)
    }, 5000)

    return resetAutoplay
  }, [currentIndex, isDocumentHidden, isManualPauseActive, isReducedMotion, lightboxIndex])

  useEffect(() => {
    return () => {
      clearManualPauseTimeout()
    }
  }, [])

  function openLightbox(itemIndex: number, element: HTMLElement | null) {
    lastTriggerRef.current = element
    setLightboxIndex(itemIndex)
    goToIndex(itemIndex)
  }

  function closeLightbox() {
    setLightboxIndex(null)
    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus()
    })
  }

  return (
    <section
      id="fotos"
      ref={sectionRef}
      className="px-4 py-10 sm:py-14"
    >
      <div className="page-shell">
        <div className="section-heading">
          <p className="section-eyebrow">GALERIA</p>
          <h2 className="section-title">✨ Momentos ✨</h2>
        </div>

        <div className="mt-7 sm:mt-8">
          <div className="relative">
            <button
              type="button"
              aria-label="Ver fotos anteriores"
              className="absolute -left-2 top-[35%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(255,253,252,0.98)] text-[var(--color-text)] shadow-[0_10px_26px_rgba(180,126,120,0.18)] sm:-left-4 sm:top-[38%] sm:h-11 sm:w-11 lg:-left-5"
              onClick={() => handleManualNavigation(currentIndex - 1)}
            >
              <ChevronLeft />
            </button>

            <div
              className={`mx-auto grid gap-4 sm:gap-5 ${
                visibleCount === 1
                  ? 'max-w-[320px] grid-cols-1 px-8 sm:max-w-[360px] sm:px-10'
                  : visibleCount === 2
                    ? 'max-w-[760px] grid-cols-2 px-8 sm:px-8'
                    : 'max-w-[1040px] grid-cols-3 px-10 sm:px-8'
              }`}
            >
              {visibleItems.map(({ item, itemIndex }, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  isPrimary={visibleCount === 3 ? index === 1 : itemIndex === currentIndex}
                  isSecondary={visibleCount === 3 ? index !== 1 : false}
                  onImageClick={(element) => openLightbox(itemIndex, element)}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Ver fotos siguientes"
              className="absolute -right-2 top-[35%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(255,253,252,0.98)] text-[var(--color-text)] shadow-[0_10px_26px_rgba(180,126,120,0.18)] sm:-right-4 sm:top-[38%] sm:h-11 sm:w-11 lg:-right-5"
              onClick={() => handleManualNavigation(currentIndex + 1)}
            >
              <ChevronRight />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {galleryItems.map((item, index) => {
              const isActive = index === currentIndex

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Ir a la foto ${index + 1}`}
                  aria-pressed={isActive}
                  className={`rounded-full transition-all ${
                    isActive
                      ? 'h-2.5 w-5 bg-[var(--color-strawberry)]'
                      : 'h-2.5 w-2.5 bg-[rgba(232,160,180,0.6)]'
                  }`}
                  onClick={() => handleManualNavigation(index)}
                />
              )
            })}
          </div>
        </div>
      </div>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          activeIndex={lightboxIndex}
          items={galleryItems}
          onClose={closeLightbox}
          onNavigate={(nextIndex) => {
            setLightboxIndex(nextIndex)
            goToIndex(nextIndex)
          }}
        />
      ) : null}
    </section>
  )
}
