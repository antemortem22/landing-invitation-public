import type { GiftFilter } from '../types'

type GiftFiltersProps = {
  activeFilter: GiftFilter
  onChange: (filter: GiftFilter) => void
}

const filters: { label: string; value: GiftFilter }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Disponibles', value: 'available' },
  { label: 'Elegidos', value: 'reserved' },
]

export function GiftFilters({ activeFilter, onChange }: GiftFiltersProps) {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter

        return (
          <button
            key={filter.value}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              isActive
                ? 'border-[var(--color-pink-medium)] bg-[var(--color-pink-medium)] text-[var(--color-warm-white)]'
                : 'border-[var(--color-border)] bg-[rgba(254,246,240,0.96)] text-[var(--color-text-muted)]'
            }`}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
