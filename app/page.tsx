import Hero from './components/Hero'
import CallToAction from './components/CallToAction'
import ImageSection from './components/ImageSection'
import ScrollingText from './components/ScrollingText'
import type { Metadata } from 'next'


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
      <Hero />
      <CallToAction />
      <ImageSection />
      <ScrollingText />
    </>
  )
}