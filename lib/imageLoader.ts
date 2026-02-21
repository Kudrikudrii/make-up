export default function imageLoader({ src }: {
  src: string
  width: number
  quality: number
}) {
  // Для локальных изображений просто возвращаем путь
  // next-image-export-optimizer сам создаст оптимизированные копии
  return src
}