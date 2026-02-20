'use client'

import { useEffect, useRef } from 'react'

export default function ScrollingText() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) return

    const animate = () => {
      if (scroll.scrollLeft >= scroll.scrollWidth / 2) {
        scroll.scrollLeft = 0
      } else {
        scroll.scrollLeft += 1
      }
      requestAnimationFrame(animate)
    }

    const animation = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animation)
  }, [])

  const text = "Award-winning artist with a decade of experience. * Specializing in editorial and bridal looks. * "

  return (
    <section className="bg-white overflow-hidden relative">
      <div className="container-fluid px-0">
        <div
          ref={scrollRef}
          className="overflow-x-hidden whitespace-nowrap"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="inline-block">
            <span className="text-6xl md:text-7xl font-bold text-black/10">
              {text}
            </span>
          </div>
          <div className="inline-block">
            <span className="text-6xl md:text-7xl font-bold text-black/10">
              {text}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}