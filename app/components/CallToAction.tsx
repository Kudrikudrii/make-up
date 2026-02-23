'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function CallToAction() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section className="py-8 md:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <strong>Сотворим волшебство вместе</strong>
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Хотите преобразиться? Давайте обсудим ваши идеи.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              className="bg-[#947360] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4F260A] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Забронировать сеанс
            </a>
            <Link
              href="/portfolio"
              className="bg-[#A1AFA0] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#193C19] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Портфолио
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}