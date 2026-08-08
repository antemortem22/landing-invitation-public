export type GalleryItem = {
  id: string
  image: string
  title: string
  description: string
  alt: string
}

export type GiftItem = {
  id: string | number
  image: string
  name: string
  description: string
  referenceUrl?: string
  reserved: boolean
}

export type GiftFilter = 'all' | 'available' | 'reserved'

export type EventConfig = {
  babyName: string
  inviteeGreeting: string
  eyebrow: string
  title: string
  subtitle: string
  description: string
  eventDateTimeIso: string
  dateLabel: string
  timeLabel: string
  venue: string
  address: string
  mapsUrl: string
  whatsappNumber: string
  paymentAlias: string
  footerNote: string
  contactLabel: string
  calendarFile: string
  giftSectionIntro: string
  giftSectionLoadError: string
  giftSectionEmptyState: string
  giftAliasDescription: string
  giftAliasCopyAction: string
  giftAliasCopySuccess: string
  giftAliasCopyError: string
  rsvpSectionDescription: string
  rsvpRedirectHint: string
  rsvpReviewTitle: string
  rsvpReviewHint: string
  rsvpEditAction: string
  rsvpReviewRedirectHint: string
  rsvpCalendarHint: string
  rsvpChangeOfMindHint: string
}

export type RsvpAttendance = 'yes' | 'no'

export type RsvpFormState = {
  fullName: string
  attendance: RsvpAttendance
  attendees: number
  message: string
}
