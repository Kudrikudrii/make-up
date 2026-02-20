import type { Metadata, Viewport } from 'next'
import Navbar from './components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Evgenia Garankina - Professional Makeup Artist',
  description: 'Transforming faces with artistry and passion. Experience the magic of expert makeup.',
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
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F5E7E7] font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}