'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CREATIVE_PROCESS_IMAGES } from '@/app/utils/constants/data'
import ExportedImage from 'next-image-export-optimizer'


export default function CreativeProcess() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-fluid px-0">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            <strong>Creative Process</strong>
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ x: -200, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 relative"
        >
          {CREATIVE_PROCESS_IMAGES.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-3/4 overflow-hidden rounded-2xl"
            >
              <ExportedImage
                src={src}
                alt={`Creative Process ${index + 1}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}