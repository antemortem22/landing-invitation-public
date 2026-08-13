import { eventConfig } from '../config/event'

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-3.5 text-center">
      <div className="page-shell">
        <p className="font-serif text-[1.45rem] font-bold text-[var(--color-text)] md:text-[1.6rem]">
          Baby Shower de {eventConfig.babyName}
        </p>
        <p className="mt-1.5 text-xs text-[var(--color-text-muted)] md:text-sm">
          {eventConfig.dateLabel}
        </p>
        <p className="mt-1.5 text-[0.72rem] leading-4.5 text-[var(--color-text-muted)] md:text-xs">
          {eventConfig.footerNote}
        </p>
        <p className="mt-2 text-[0.58rem] uppercase tracking-[0.16em] text-[var(--color-pink-medium)] md:text-[0.64rem]">
          Hecho con amor para Luna
        </p>
      </div>
    </footer>
  )
}
