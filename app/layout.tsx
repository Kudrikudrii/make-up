import type { Metadata, Viewport } from 'next'
import Navbar from './components/Navbar'
import Social from './components/Social'
import Footer from './components/Footer'
import JsonLd from './components/JsonLd'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://make-up-six.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | Евгения Гаранкина | Визажист в Москве',
    default: 'Евгения Гаранкина | Профессиональный визажист и стилист в Москве',
  },
  description: 'Евгения Гаранкина — профессиональный визажист и стилист по волосам в Москве. Создаю естественные образы, подчеркивающие вашу индивидуальность. Работа на фотосессиях, мероприятиях, с брендами.',
  
  openGraph: {
    title: 'Евгения Гаранкина | Визажист в Москве',
    description: 'Профессиональный визажист и стилист по волосам. Создаю образы для фотосессий, мероприятий и сотрудничества с брендами.',
    url: baseUrl,
    siteName: 'Евгения Гаранкина | Визажист',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Евгения Гаранкина - профессиональный визажист в Москве',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: '',
    yandex: '',
  },
  
  alternates: {
    canonical: baseUrl,
    languages: {
      'ru-RU': baseUrl,
    },
  },
  
  icons: {
    icon: '/images/icons/icon.png',
    apple: '/images/icons/icon.png',
    shortcut: '/images/icons/icon.png',
  },
  
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="bg-[#F5E7E7] font-sans antialiased">
        <Navbar />
        {children}
        <Social />
        <Footer />
        <JsonLd />
      </body>
    </html>
  )
}