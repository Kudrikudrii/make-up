'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ExportedImage from 'next-image-export-optimizer'

export default function Hero() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 4]);
    const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

    return (
        <section 
            ref={sectionRef} 
            className="relative h-screen flex items-end pb-20 overflow-hidden relative"
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
                        src='/images/IMG_2911.JPG'
                        alt='Evgenia Garankina makeup artist'
                        fill
                        className="object-cover"
                    />
                </motion.div>
                <motion.div 
                    className="absolute inset-0"
                    style={{ 
                        background: useTransform(
                            scrollYProgress,
                            [0, 1],
                            ['linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6))',
                             'linear-gradient(to bottom, rgba(0,0,0,1.5), rgba(0,0,0,2))']
                        )
                    }}
                />
            </motion.div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-1">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.h1 
                        className="text-3xl sm:text-1xl  md:text-6xl lg:text-7xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <strong>Евгения Гаранкина</strong>
                    </motion.h1>
                    
                    <motion.p 
                        className="text-md md:text-2xl text-white mb-0 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        Проводник в сфере красоты.
Не создаю новые лица, а показываю женщине ее саму, только в более уверенной версии, честно, с любовью и поддержкой.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}