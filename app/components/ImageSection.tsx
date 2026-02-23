'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ExportedImage from 'next-image-export-optimizer'

export default function ImageSection() {
    const sectionRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const blur = useTransform(scrollYProgress, [0, 0.5, 1], [4, 2, 0]);

    return (
        <section 
            ref={sectionRef}
            className="relative h-screen flex items-end pb-20 overflow-hidden"
        >
            <motion.div 
                className="absolute inset-0 z-0"
                style={{ y }}
            >
                <motion.div 
                    className="relative w-full h-full"
                    style={{ 
                        filter: `blur(${blur}px)`,
                    }}
                >
                    <ExportedImage
                        src='/images/hero/evgeniya-garankina-stilist-po-volosam-i-makiyazhu-moskva-2.JPG'
                        alt='Евгения Гаранкина — визажист, бровист и мастер причесок в Москве | Профессиональный портрет стилиста'
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
                            [
                                'linear-gradient(to bottom,rgba(0,0,0,2), rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0))',
                                'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0))'
                            ]
                        )
                    }}
                />
            </motion.div>
        </section>
    );
}