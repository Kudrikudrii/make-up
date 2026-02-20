'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { NAV_LINKS, CONTACT_LINK } from '../utils/constants/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLButtonElement>(null)

  // Закрытие по клику вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="transition-all duration-300 py-3">
          <div className="flex items-center justify-between px-4 md:px-6">
            <div className="w-10"></div>
            {/* Бургер-меню */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex flex-col justify-center items-center z-50"
              aria-label="Toggle menu"
              ref={menuRef}
            >
              <span className={`absolute w-6 h-0.5 bg-black transition-all duration-300 shadow-[0_0_0_1px_gray] ${
                isOpen ? 'rotate-45' : '-translate-y-2'
              }`} />
              <span className={`absolute w-6 h-0.5 bg-black transition-all duration-300 shadow-[0_0_0_1px_gray] ${
                isOpen ? 'opacity-0' : ''
              }`} />
              <span className={`absolute w-6 h-0.5 bg-black transition-all duration-300 shadow-[0_0_0_1px_gray] ${
                isOpen ? '-rotate-45' : 'translate-y-2'
              }`} />
            </button>
          </div>

          {/* Контейнер с эффектом стекла появляется только при открытом меню */}
          <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            {/* Добавляем стекло только для выпадающего меню */}
            <div className="backdrop-blur-md bg-white/10 rounded-2xl mt-2 p-4">
              <div className="space-y-2">
                {NAV_LINKS.map(({ href, label, ariaLabel }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-4 py-2 text-[#947360] hover:bg-black/5 rounded-full transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                    aria-label={ariaLabel}
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href={CONTACT_LINK.href}
                  className="block bg-[#947360] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4F260A] transition-all duration-300 text-center"
                  onClick={() => setIsOpen(false)}
                  aria-label={CONTACT_LINK.ariaLabel}
                >
                  {CONTACT_LINK.label}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  )
}