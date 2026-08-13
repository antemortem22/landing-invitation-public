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
    name: 'Cuna nordica',
    description: 'Cuna de madera clara con un estilo delicado y calido.',
    status: 'available',
  },
  {
    id: 'stroller',
    image: strollerImage,
    name: 'Cochecito liviano',
    description: 'Cochecito liviano y practico para los primeros paseos.',
    status: 'reserved',
  },
  {
    id: 'outfit',
    image: swaddleImage,
    name: 'Set de ropa inicial',
    description: 'Pack de muestra con prendas suaves en colores neutros.',
    status: 'available',
  },
  {
    id: 'chair',
    image: nurseryImage,
    name: 'Sillon de descanso',
    description: 'Asiento comodo para acompanar los momentos de descanso.',
    status: 'available',
  },
  {
    id: 'bath',
    image: bathImage,
    name: 'Set de bano',
    description: 'Incluye accesorios de ejemplo para la rutina de higiene.',
    status: 'reserved',
  },
  {
    id: 'mobile',
    image: monitorImage,
    name: 'Movil decorativo',
    description: 'Movil para la cuna con tonos suaves y figuras colgantes.',
    status: 'available',
  },
  {
    id: 'bottles',
    image: bottleImage,
    name: 'Set de mamaderas',
    description: 'Set practico para acompanar la rutina de todos los dias.',
    status: 'available',
  },
  {
    id: 'blankets',
    image: swaddleImage,
    name: 'Mantas livianas',
    description: 'Mantas suaves y livianas que siempre vienen bien.',
    status: 'open',
  },
  {
    id: 'lamp',
    image: nurseryImage,
    name: 'Lampara de noche',
    description: 'Luz suave para completar la ambientacion del cuarto.',
    status: 'available',
  },
]
