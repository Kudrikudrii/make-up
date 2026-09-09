import type { Metadata } from 'next'
import Slider from './components/Slider'


export const metadata: Metadata = {
  title: 'Евгения Гаранкина | Профессиональный визажист и стилист в Москве',
  description: 'Профессиональный визажист в Москве. Создание естественных образов для фотосессий, мероприятий и collaboration с брендами. Работа с 2018 года.',
  openGraph: {
    title: 'Евгения Гаранкина - визажист в Москве',
    description: 'Создаю образы, подчеркивающие вашу индивидуальность. Работа на фотосессиях и мероприятиях.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Евгения Гаранкина - профессиональный визажист',
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      <Slider />    
    </>
  )
}