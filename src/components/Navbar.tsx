import { useEffect, useState } from 'react'
import pinkBow from '../assets/pinkbow.png'
import { eventConfig } from '../config/event'
import { CalendarButton } from './CalendarButton'

const navItems = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#fotos', label: 'Fotos' },
  { href: '#regalos', label: 'Regalos' },
  { href: '#detalles', label: 'Detalles' },
  { href: '#confirmar', label: 'Confirmar' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#inicio')

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleScrollClose = () => {
      setIsOpen(false)
    }

    window.addEventListener('scroll', handleScrollClose, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScrollClose)
    }
  }, [isOpen])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    const sections = navItems
      .map((item) => ({
        href: item.href,
        element: document.getElementById(item.href.slice(1)),
      }))
      .filter(
        (entry): entry is { href: string; element: HTMLElement } => Boolean(entry.element),
      )

    if (!sections.length) {
      return
    }

    const getClosestSection = () => {
      if (window.scrollY <= 32) {
        return sections[0]?.href ?? '#inicio'
      }

      const viewportAnchor = window.innerHeight * 0.35
      let closestHref = sections[0]?.href ?? '#inicio'
      let closestDistance = Number.POSITIVE_INFINITY

      for (const section of sections) {
        const distance = Math.abs(section.element.getBoundingClientRect().top - viewportAnchor)

        if (distance < closestDistance) {
          closestDistance = distance
          closestHref = section.href
        }
      }

      return closestHref
    }

    const updateActiveSection = () => {
      setActiveHref(getClosestSection())
    }

    let observer: IntersectionObserver | null = null

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

          if (visibleEntries.length > 0) {
            setActiveHref(`#${visibleEntries[0].target.id}`)
            return
          }

          updateActiveSection()
        },
        {
          root: null,
          rootMargin: '-18% 0px -52% 0px',
          threshold: [0.1, 0.2, 0.35, 0.5, 0.7],
        },
      )

      sections.forEach((section) => observer?.observe(section.element))
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-cream)]">
      <div className="mx-auto flex min-h-[58px] w-[min(1420px,calc(100%-12px))] items-center justify-between gap-3 py-2 sm:gap-4">
        <a
          href="#inicio"
          className="flex shrink-0 items-center gap-1.5 pl-3 text-[var(--color-text)] no-underline sm:gap-2 sm:pl-4 lg:pl-6"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 2.1vw, 1.34rem)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          <span>{eventConfig.inviteeGreeting}</span>
          <img src={pinkBow} alt="" aria-hidden="true" className="h-auto w-3.5 sm:w-4" />
        </a>

        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          <nav className="flex items-center gap-6" aria-label="Navegacion principal">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative pb-1 text-[0.74rem] font-medium no-underline transition-colors hover:text-[var(--color-strawberry)] ${
                  activeHref === item.href
                    ? 'text-[var(--color-strawberry)] after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-[var(--color-pink-medium)]'
                    : 'text-[var(--color-text-muted)]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <CalendarButton className="min-h-0 px-4 py-2 text-[0.72rem] font-medium" />
        </div>

        <button
          type="button"
          aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          className="inline-flex min-h-11 min-w-11 items-center justify-center px-1 text-[var(--color-text)] md:hidden"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="relative flex h-5 w-6 flex-col items-center justify-center">
            <span
              className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                isOpen ? 'rotate-45' : '-translate-y-2'
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-200 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                isOpen ? '-rotate-45' : 'translate-y-2'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        aria-hidden={!isOpen}
        className={`absolute left-0 right-0 top-full overflow-y-auto bg-[var(--color-cream)] shadow-[0_18px_36px_rgba(180,126,120,0.08)] transition-all duration-300 ease-out md:hidden ${
          isOpen
            ? 'visible max-h-[calc(100svh-58px)] border-t border-[var(--color-border)] opacity-100'
            : 'invisible max-h-0 border-t border-transparent opacity-0 pointer-events-none overflow-hidden'
        }`}
      >
        <div
          className={`transition-all duration-300 ease-out ${
            isOpen ? 'translate-y-0' : '-translate-y-2'
          }`}
        >
          <nav
            className="page-shell flex flex-col gap-2 py-4"
            style={{ fontFamily: 'var(--font-sans)' }}
            aria-label="Navegacion principal movil"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-3 text-[1rem] font-semibold tracking-[0.02em] text-[var(--color-text)] no-underline hover:bg-[rgba(249,213,229,0.25)]"
                style={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontStyle: 'normal',
                  letterSpacing: '0.01em',
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <CalendarButton
              className="mt-2 w-full text-[0.95rem] font-semibold"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
              onClick={() => setIsOpen(false)}
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
