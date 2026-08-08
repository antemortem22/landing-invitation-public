export type CountdownState = 'before' | 'today' | 'started' | 'ended'

export type CountdownSnapshot = {
  state: CountdownState
  isToday: boolean
  totalMs: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

const EVENT_DAY_END_HOURS = 23
const EVENT_DAY_END_MINUTES = 59
const EVENT_DAY_END_SECONDS = 59

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, '0')
}

function pluralize(value: number, singular: string, plural: string) {
  return `${value} ${value === 1 ? singular : plural}`
}

function joinParts(parts: string[]) {
  if (parts.length <= 1) {
    return parts[0] ?? ''
  }

  if (parts.length === 2) {
    return `${parts[0]} y ${parts[1]}`
  }

  return `${parts.slice(0, -1).join(', ')} y ${parts[parts.length - 1]}`
}

function getEventDayEnd(eventDateTimeIso: string) {
  const datePart = eventDateTimeIso.slice(0, 10)
  const offsetPart = eventDateTimeIso.slice(-6)

  return new Date(
    `${datePart}T${String(EVENT_DAY_END_HOURS).padStart(2, '0')}:${String(EVENT_DAY_END_MINUTES).padStart(2, '0')}:${String(EVENT_DAY_END_SECONDS).padStart(2, '0')}${offsetPart}`,
  )
}

export function getCountdownSnapshot(
  eventDateTimeIso: string,
  now = new Date(),
): CountdownSnapshot {
  const eventDate = new Date(eventDateTimeIso)
  const eventDayEnd = getEventDayEnd(eventDateTimeIso)

  if (now >= eventDayEnd) {
    return {
      state: 'ended',
      isToday: false,
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  if (now >= eventDate) {
    return {
      state: 'started',
      isToday: true,
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  const totalMs = Math.max(0, eventDate.getTime() - now.getTime())
  const totalSeconds = Math.floor(totalMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const isToday = days === 0

  return {
    state: isToday ? 'today' : 'before',
    isToday,
    totalMs,
    days,
    hours,
    minutes,
    seconds,
  }
}

export function formatHeroCountdownUnits(snapshot: CountdownSnapshot) {
  return [
    { label: 'DIAS', value: pad(snapshot.days) },
    { label: 'HORAS', value: pad(snapshot.hours) },
    { label: 'MIN', value: pad(snapshot.minutes) },
    { label: 'SEG', value: pad(snapshot.seconds) },
  ]
}

export function getHeroCountdownStatusMessage(snapshot: CountdownSnapshot) {
  if (snapshot.state === 'today') {
    return '¡Es hoy!'
  }

  if (snapshot.state === 'started') {
    return '¡Llegó el gran día! Te estamos esperando.'
  }

  if (snapshot.state === 'ended') {
    return 'Gracias por acompañarnos en un momento tan especial.'
  }

  return null
}

export function getRsvpCountdownMessage(snapshot: CountdownSnapshot) {
  if (snapshot.state === 'started') {
    return '¡Llegó el gran día! Te estamos esperando 💗'
  }

  if (snapshot.state === 'ended') {
    return 'Gracias por acompañarnos en un momento tan especial 💕'
  }

  if (snapshot.isToday) {
    if (snapshot.hours === 0 && snapshot.minutes < 2) {
      return '¡Es hoy! Falta muy poquito 💕'
    }

    if (snapshot.hours === 0) {
      return `¡Es hoy! Nos vemos en ${pluralize(snapshot.minutes, 'minuto', 'minutos')} 🎀`
    }

    const todayParts = [pluralize(snapshot.hours, 'hora', 'horas')]

    if (snapshot.minutes > 0) {
      todayParts.push(pluralize(snapshot.minutes, 'minuto', 'minutos'))
    }

    return `¡Es hoy! Nos vemos en ${joinParts(todayParts)} 🎀`
  }

  if (snapshot.days > 0) {
    const upcomingParts = [pluralize(snapshot.days, 'día', 'días')]

    if (snapshot.hours > 0) {
      upcomingParts.push(pluralize(snapshot.hours, 'hora', 'horas'))
    }

    return `Nos vemos en ${joinParts(upcomingParts)} ✨`
  }

  const parts: string[] = []

  if (snapshot.hours > 0) {
    parts.push(pluralize(snapshot.hours, 'hora', 'horas'))
  }

  if (snapshot.minutes > 0) {
    parts.push(pluralize(snapshot.minutes, 'minuto', 'minutos'))
  }

  if (parts.length === 0) {
    parts.push(pluralize(snapshot.seconds, 'segundo', 'segundos'))
  }

  return `Nos vemos en ${joinParts(parts)} ✨`
}
