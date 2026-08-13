import galleryCelebration from '../assets/gallery/gallery-celebration.svg'
import galleryNursery from '../assets/gallery/gallery-nursery.svg'
import galleryStory from '../assets/gallery/gallery-story.svg'
import heroImage from '../assets/hero.png'
import type { GalleryItem } from '../types'

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    image: heroImage,
    title: 'Portada conceptual',
    alt: 'Ilustracion principal de la invitacion',
  },
  {
    id: 'gallery-2',
    image: galleryStory,
    title: 'Historia de bienvenida',
    alt: 'Ilustracion decorativa de la historia del evento',
  },
  {
    id: 'gallery-3',
    image: galleryCelebration,
    title: 'Momento de celebracion',
    alt: 'Ilustracion decorativa de una celebracion de baby shower',
  },
  {
    id: 'gallery-4',
    image: galleryNursery,
    title: 'Inspiracion del espacio',
    alt: 'Ilustracion decorativa del cuarto del bebe',
  },
  {
    id: 'gallery-5',
    image: galleryStory,
    title: 'Recuerdos de muestra',
    alt: 'Ilustracion conceptual para la galeria',
  },
  {
    id: 'gallery-6',
    image: galleryCelebration,
    title: 'Cierre visual',
    alt: 'Ilustracion decorativa de cierre para la galeria',
  },
]
