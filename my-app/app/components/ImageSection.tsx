'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ExportedImage from 'next-image-export-optimizer'

export default function ImageSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const blur = useTransform(scrollYProgress, [0, 0.5, 1], [4, 2, 0]);
    const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 1]);

    return (
        <section 
            ref={sectionRef}
            className="relative h-screen flex items-end pb-20 overflow-hidden"
        >
            <motion.div 
                className="absolute inset-0 z-0"
                style={{ y }}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <motion.div 
                    className="relative w-full h-full"
                    style={{ 
                        filter: `blur(${blur}px) brightness(${brightness})`,
                    }}
                >
                    <ExportedImage
                        src='/images/IMG_2910.JPG'
                        alt=''
                        fill
                        className="object-cover"
                    />
                </motion.div>
                
                {/* Градиент, который уходит вниз при скроле (рассеивается сверху) */}
                <motion.div 
                    className="absolute inset-0"
                    style={{ 
                        background: useTransform(
                            scrollYProgress,
                            [0, 1],
                            [
                                'linear-gradient(to bottom,rgba(0,0,0,2), rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0))',
                                'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0))'
                            ]
                        )
                    }}
                />
            </motion.div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Искусство преображения
                    </motion.h2>
                    <motion.p className="text-lg md:text-xl text-white/90">
                        Каждый мазок — это история
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}