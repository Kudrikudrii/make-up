import localFont from 'next/font/local'

export const montserrat = localFont({
  src: [
    { path: '../public/fonts/montserrat.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/montserrat-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-montserrat',
  display: 'swap',
})

export const cormorant = localFont({
  src: [
    { path: '../public/fonts/cormorant.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/cormorant-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
})

export const fehero = localFont({
  src: '../public/fonts/fehero-regular.woff2',
  variable: '--font-fehero',
  display: 'swap',
})