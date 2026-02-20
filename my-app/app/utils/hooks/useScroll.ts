import { useState, useEffect } from 'react'

export const useScroll = (threshold = 50) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Проверяем, что мы в браузере
    if (typeof window === 'undefined') return

    let ticking = false
    
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    
    // Проверяем начальное состояние
    handleScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}