import bathImage from '../assets/gifts/gift-bath.svg'
import bottleImage from '../assets/gifts/gift-bottle.svg'
import monitorImage from '../assets/gifts/gift-monitor.svg'
import nurseryImage from '../assets/gifts/gift-nursery.svg'
import strollerImage from '../assets/gifts/gift-stroller.svg'
import swaddleImage from '../assets/gifts/gift-swaddle.svg'
import type { GiftItem } from '../types'

export const initialGifts: GiftItem[] = [
  {
    id: 'crib',
    image: nurseryImage,
    name: 'Cuna convertible',
    description: 'Madera blanca con detalles nordicos, incluye colchon y protector.',
    referenceUrl: 'https://example.com/cuna',
    status: 'available',
  },
  {
    id: 'stroller',
    image: strollerImage,
    name: 'Cochecito de paseo',
    description: 'Plegable y ultraliviano, color beige. Apto desde recien nacido.',
    referenceUrl: 'https://example.com/cochecito',
    status: 'reserved',
  },
  {
    id: 'outfit',
    image: swaddleImage,
    name: 'Set de ropa (0-3m)',
    description: 'Bodys de algodon organico en tonos pastel. Pack de 5 piezas.',
    referenceUrl: 'https://example.com/ropa',
    status: 'available',
  },
  {
    id: 'chair',
    image: nurseryImage,
    name: 'Silla de lactancia',
    description: 'Butaca ergonomica con apoyapies. Tapizado en velvet rosado.',
    referenceUrl: 'https://example.com/silla',
    status: 'available',
  },
  {
    id: 'bath',
    image: bathImage,
    name: 'Banera + set de bano',
    description: 'Banera ergonomica con soporte y set de productos naturales.',
    referenceUrl: 'https://example.com/banera',
    status: 'reserved',
  },
  {
    id: 'mobile',
    image: monitorImage,
    name: 'Movil musical',
    description: 'Nubes, estrellas y lunas en tela suave. Melodias relajantes incluidas.',
    referenceUrl: 'https://example.com/mobile',
    status: 'available',
  },
  {
    id: 'bottles',
    image: bottleImage,
    name: 'Mamaderas anti-colicos',
    description: 'Set practico para los primeros meses, con diseno simple y delicado.',
    referenceUrl: 'https://example.com/mamaderas',
    status: 'available',
  },
  {
    id: 'blankets',
    image: swaddleImage,
    name: 'Mantas de muselina',
    description: 'Suaves, respirables y en colores delicados para el dia a dia.',
    referenceUrl: 'https://example.com/mantas',
    status: 'open',
  },
  {
    id: 'lamp',
    image: nurseryImage,
    name: 'Lampara para cuarto',
    description: 'Luz calida y suave para acompanar las noches de Olivia.',
    referenceUrl: 'https://example.com/lampara',
    status: 'available',
  },
]
