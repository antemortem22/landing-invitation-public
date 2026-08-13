import type { GalleryItem } from '../types'

type GalleryCardProps = {
  item: GalleryItem
  isPrimary?: boolean
  isSecondary?: boolean
  onImageClick?: (element: HTMLButtonElement) => void
}

export function GalleryCard({
  item,
  isPrimary = false,
  isSecondary = false,
  onImageClick,
}: GalleryCardProps) {
  return (
    <article
      className={`card-surface group overflow-hidden rounded-[28px] border-[rgba(232,160,180,0.46)] bg-[rgba(254,246,240,0.96)] shadow-[0_14px_32px_rgba(180,126,120,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(232,160,180,0.8)] hover:shadow-[0_24px_46px_rgba(180,126,120,0.16)] ${
        isPrimary
          ? 'lg:z-10 lg:scale-[1.03] lg:border-[rgba(200,55,74,0.34)] lg:shadow-[0_28px_54px_rgba(180,126,120,0.2)]'
          : isSecondary
            ? 'lg:scale-[0.965] lg:border-[rgba(255,253,252,0.32)] lg:bg-[rgba(255,253,252,0.52)] lg:backdrop-blur-[14px] lg:opacity-[0.88] lg:shadow-[0_18px_38px_rgba(180,126,120,0.12)]'
            : ''
      }`}
    >
      <button
        type="button"
        aria-label={`Abrir foto ${item.title}`}
        className="block h-[360px] w-full overflow-hidden text-left sm:h-[430px]"
        onClick={(event) => onImageClick?.(event.currentTarget)}
      >
        <img
          src={item.image}
          alt={item.alt}
          className={`h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] ${
            isPrimary
              ? 'lg:scale-[1.015]'
              : isSecondary
                ? 'lg:opacity-[0.72] lg:brightness-[1.03] lg:contrast-[0.95]'
                : ''
          }`}
        />
      </button>

      <div className="space-y-1 px-5 py-4 text-center sm:px-6">
        <h3 className="font-serif text-[1.55rem] font-bold italic leading-none text-[var(--color-text)] sm:text-[1.7rem]">
          {item.title}
        </h3>
      </div>
    </article>
  )
}
