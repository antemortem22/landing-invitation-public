import { useEffect, useRef, useState } from 'react'
import type { GiftItem } from '../types'

type GiftImageLightboxProps = {
  gift: GiftItem
  onClose: () => void
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

export function GiftImageLightbox({ gift, onClose }: GiftImageLightboxProps) {
  const [failedImage, setFailedImage] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
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
  }, [onClose])

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
        aria-label={`Vista ampliada de ${gift.name}`}
        className="mx-auto flex h-full w-full max-w-[1100px] flex-col justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex justify-end">
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Cerrar imagen del regalo"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,253,252,0.28)] bg-[rgba(254,246,240,0.14)] text-[var(--color-warm-white)] backdrop-blur-sm"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          {failedImage ? (
            <div className="flex aspect-[4/5] max-h-[72vh] w-full max-w-[820px] items-center justify-center rounded-[28px] border border-[rgba(255,253,252,0.18)] bg-[rgba(254,246,240,0.08)] px-6 text-center text-[var(--color-warm-white)]">
              No pudimos cargar esta imagen.
            </div>
          ) : (
            <img
              src={gift.image}
              alt={`Referencia visual para ${gift.name}`}
              className="max-h-[72vh] w-auto max-w-full rounded-[28px] object-contain shadow-[0_24px_46px_rgba(0,0,0,0.22)]"
              onError={() => setFailedImage(true)}
            />
          )}
        </div>

        <div className="mt-5 flex flex-col items-center text-center text-[var(--color-warm-white)]">
          <h3 className="font-serif text-[2rem] font-bold leading-none sm:text-[2.2rem]">
            {gift.name}
          </h3>
        </div>
      </div>
    </div>
  )
}
