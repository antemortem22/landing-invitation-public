import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { getCalendarFileUrl } from '../utils/calendar'

type CalendarButtonProps = {
  children?: ReactNode
  className?: string
  showIcon?: boolean
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>

function shouldDownloadCalendarFile() {
  if (typeof navigator === 'undefined') {
    return true
  }

  const userAgent = navigator.userAgent.toLowerCase()
  const platform = navigator.platform?.toLowerCase() ?? ''
  const touchPoints = navigator.maxTouchPoints ?? 0
  const isAppleMobile =
    /iphone|ipad|ipod/.test(userAgent) ||
    (platform === 'macintel' && touchPoints > 1)
  const isAndroidMobile = /android/.test(userAgent)
  const isMobile = isAppleMobile || isAndroidMobile

  return !isMobile
}

function CalendarMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4.5" y="5.5" width="15" height="14" rx="3" />
      <path d="M8 3.5v4M16 3.5v4M4.5 9.5h15" />
    </svg>
  )
}

export function CalendarButton({
  children = 'Agregar al calendario',
  className = '',
  showIcon = true,
  ...props
}: CalendarButtonProps) {
  const shouldDownload = shouldDownloadCalendarFile()

  return (
    <a
      href={getCalendarFileUrl()}
      className={`pill-button border-[rgba(232,160,180,0.52)] bg-[rgba(249,213,229,0.72)] text-[var(--color-text)] shadow-none hover:bg-[rgba(249,213,229,0.88)] ${className}`.trim()}
      download={shouldDownload}
      {...props}
    >
      {showIcon ? (
        <span className="text-[var(--color-pink-medium)]">
          <CalendarMiniIcon />
        </span>
      ) : null}
      {children}
    </a>
  )
}
