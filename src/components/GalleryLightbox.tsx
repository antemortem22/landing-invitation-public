import { useEffect, useRef, useState } from 'react'
import type { GalleryItem } from '../types'

type GalleryLightboxProps = {
  activeIndex: number
  items: GalleryItem[]
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

export function GalleryLightbox({
  activeIndex,
  items,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchCurrentX = useRef<number | null>(null)
  const total = items.length
  const activeItem = items[activeIndex]
  const hasMultipleItems = total > 1

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'ArrowLeft' && hasMultipleItems) {
        event.preventDefault()
        onNavigate((activeIndex - 1 + total) % total)
        return
      }

      if (event.key === 'ArrowRight' && hasMultipleItems) {
        event.preventDefault()
        onNavigate((activeIndex + 1) % total)
        return
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusableElements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        )

        if (focusableElements.length <= 1) {
          return
        }

        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]
        const activeElement = document.activeElement

        if (event.shiftKey && activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, hasMultipleItems, onClose, onNavigate, total])

  function handlePrevious() {
    if (!hasMultipleItems) return
    onNavigate((activeIndex - 1 + total) % total)
  }

  function handleNext() {
    if (!hasMultipleItems) return
    onNavigate((activeIndex + 1) % total)
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
    touchCurrentX.current = touchStartX.current
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    touchCurrentX.current = event.changedTouches[0]?.clientX ?? null
  }

  function handleTouchEnd() {
    if (!hasMultipleItems || touchStartX.current === null || touchCurrentX.current === null) {
      touchStartX.current = null
      touchCurrentX.current = null
      return
    }

    const deltaX = touchCurrentX.current - touchStartX.current

    if (Math.abs(deltaX) > 48) {
      if (deltaX > 0) {
        handlePrevious()
      } else {
        handleNext()
      }
    }

    touchStartX.current = null
    touchCurrentX.current = null
  }

  return (
    <div
      className="fixed inset-0 z-[70] bg-[rgba(24,20,20,0.82)] px-4 py-5 sm:px-6 sm:py-7"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Vista ampliada de ${activeItem.title}`}
        className="mx-auto flex h-full w-full max-w-[1200px] flex-col justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex justify-end">
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Cerrar lightbox"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,253,252,0.28)] bg-[rgba(254,246,240,0.14)] text-[var(--color-warm-white)] backdrop-blur-sm"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          {hasMultipleItems ? (
            <button
              type="button"
              aria-label="Imagen anterior"
              className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,253,252,0.26)] bg-[rgba(254,246,240,0.16)] text-[var(--color-warm-white)] backdrop-blur-sm md:flex"
              onClick={handlePrevious}
            >
              <ChevronLeft />
            </button>
          ) : null}

          <div
            className="flex h-full w-full items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {failedImages[activeItem.id] ? (
              <div className="flex aspect-[4/5] max-h-[72vh] w-full max-w-[860px] items-center justify-center rounded-[28px] border border-[rgba(255,253,252,0.18)] bg-[rgba(254,246,240,0.08)] px-6 text-center text-[var(--color-warm-white)]">
                No pudimos cargar esta imagen.
              </div>
            ) : (
              <img
                src={activeItem.image}
                alt={activeItem.alt}
                className="max-h-[72vh] w-auto max-w-full rounded-[28px] object-contain shadow-[0_24px_46px_rgba(0,0,0,0.22)]"
                onError={() =>
                  setFailedImages((current) => ({
                    ...current,
                    [activeItem.id]: true,
                  }))
                }
              />
            )}
          </div>

          {hasMultipleItems ? (
            <button
              type="button"
              aria-label="Imagen siguiente"
              className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,253,252,0.26)] bg-[rgba(254,246,240,0.16)] text-[var(--color-warm-white)] backdrop-blur-sm md:flex"
              onClick={handleNext}
            >
              <ChevronRight />
            </button>
          ) : null}
        </div>

        <div className="mt-5 flex flex-col items-center text-center text-[var(--color-warm-white)]">
          <p className="text-[0.85rem] text-[rgba(255,253,252,0.74)]">
            {activeIndex + 1} / {total}
          </p>
          <h3 className="mt-2 font-serif text-[2rem] font-bold italic leading-none sm:text-[2.2rem]">
            {activeItem.title}
          </h3>
        </div>

        {hasMultipleItems ? (
          <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
            <button
              type="button"
              aria-label="Imagen anterior"
              className="flex h-11 min-w-11 items-center justify-center rounded-full border border-[rgba(255,253,252,0.26)] bg-[rgba(254,246,240,0.16)] px-3 text-[var(--color-warm-white)] backdrop-blur-sm"
              onClick={handlePrevious}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Imagen siguiente"
              className="flex h-11 min-w-11 items-center justify-center rounded-full border border-[rgba(255,253,252,0.26)] bg-[rgba(254,246,240,0.16)] px-3 text-[var(--color-warm-white)] backdrop-blur-sm"
              onClick={handleNext}
            >
              <ChevronRight />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
