import type { ReactNode } from 'react'
import { eventConfig } from '../config/event'
import { getCalendarFileUrl } from '../utils/calendar'

type DetailItem = {
  title: string
  value: string
  helper?: string
  helperHref?: string
  helperLabel?: string
  helperAction?: 'calendar'
  icon: ReactNode
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="5.5" width="17" height="15" rx="3" />
      <path d="M7 3.5v4M17 3.5v4M3.5 9.5h17" />
    </svg>
  )
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m4 11.5 8-6 8 6" />
      <path d="M6.5 10.5v8h11v-8" />
    </svg>
  )
}

function IconPhone() {
  return (
    <span
      className="block h-5 w-5 bg-[var(--color-strawberry)]"
      style={{
        maskImage: "url('/telefono.svg')",
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskImage: "url('/telefono.svg')",
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
      }}
    />
  )
}

function ArrowRightMini() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h13" strokeLinecap="round" />
      <path d="m13 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const detailItems: DetailItem[] = [
  {
    title: 'Fecha',
    value: eventConfig.dateLabel,
    helper: eventConfig.timeLabel,
    helperAction: 'calendar',
    icon: <IconCalendar />,
  },
  {
    title: 'Lugar',
    value: eventConfig.venue,
    helper: 'Los esperamos para compartir una tarde especial.',
    icon: <IconHome />,
  },
  {
    title: 'Direccion',
    value: eventConfig.address,
    helper: 'Abri el mapa para llegar mas facil.',
    helperHref: eventConfig.mapsUrl,
    helperLabel: 'Como llegar',
    icon: <IconPin />,
  },
  {
    title: 'Contacto',
    value: eventConfig.contactLabel,
    helper: 'Escribinos por cualquier duda. \n ¡Confirmar asistencia solo mediante el formulario de abajo!',
    icon: <IconPhone />,
  },
]

export function EventDetails() {
  return (
    <section id="detalles" className="px-4 py-10 sm:py-14">
      <div className="page-shell">
        <div className="section-heading">
          <p className="section-eyebrow">Detalles</p>
          <h2 className="section-title">Informacion del evento</h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {detailItems.map((item) => (
            <article
              key={item.title}
              className="card-surface group rounded-[24px] px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(180,126,120,0.16)] sm:px-5 sm:py-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(249,213,229,0.35)] text-[var(--color-strawberry)] transition-colors duration-200 group-hover:bg-[rgba(249,213,229,0.6)]">
                {item.icon}
              </div>
              <h3 className="mt-4 font-serif text-[1.75rem] font-bold leading-none text-[var(--color-text)] transition-colors duration-200 group-hover:text-[rgba(47,42,42,0.92)] sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-2 whitespace-pre-line text-sm font-semibold text-[var(--color-text)]">
                {item.value}
              </p>
              {item.helper ? (
                <div className="mt-2 space-y-1">
                  <p className="text-sm leading-6 text-[var(--color-text-muted)]">{item.helper}</p>
                  {item.helperAction === 'calendar' ? (
                    <a
                      href={getCalendarFileUrl()}
                      className="inline-flex items-center gap-1 text-[0.82rem] font-medium text-[var(--color-pink-medium)] no-underline transition-colors duration-200 hover:text-[var(--color-strawberry)]"
                    >
                      Agregar al calendario
                      <ArrowRightMini />
                    </a>
                  ) : null}
                  {item.helperHref && item.helperLabel ? (
                    <a
                      href={item.helperHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[0.82rem] font-medium text-[var(--color-pink-medium)] no-underline transition-colors duration-200 hover:text-[var(--color-strawberry)]"
                    >
                      {item.helperLabel}
                      <ArrowRightMini />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
