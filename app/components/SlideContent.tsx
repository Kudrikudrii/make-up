'use client';

import { useState, useEffect, useRef } from 'react';
import ExportedImage from 'next-image-export-optimizer';
import { motion, useInView } from 'framer-motion';

type SlideContent = {
    title?: string;
    discription?: string;
    videoSrc?: string;
    imageSrc?: string;
};

type Slide = {
    id: string;
    type: 'video' | 'image';
    href: string;
    target: '_self' | '_blank';
    content: SlideContent;
};

const SlideContent = ({
    slide,
    isActive,
    index,
}: {
    slide: Slide;
    isActive: boolean;
    index: number;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [imageError, setImageError] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (slide.type !== 'video' || !videoRef.current) return;

        if (isActive) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
        }
    }, [isActive, slide.type]);

    if (slide.type === 'video') {
        return (
            <>
                <video
                    ref={videoRef}
                    src={slide.content.videoSrc}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {slide.content.title && (
                    <motion.div
                        ref={sectionRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className="absolute top-[5%] left-0 right-0 px-6 text-white text-center"
                    >
                        <motion.h1
                            className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light tracking-wide "
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            {slide.content.title}
                        </motion.h1>
                    </motion.div>
                )}
                {slide.content.discription && (
                    <motion.div
                        ref={sectionRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className="absolute top-[10%] left-0 right-0 px-6 text-white text-center"
                    >
                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-light tracking-wide"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1.5, delay: 1.5 }}
                        >
                            {slide.content.discription}
                        </motion.p>
                    </motion.div>
                )}
            </>
        );
    }

    return (
        <>
            {!imageError ? (
                <ExportedImage
                    src={slide.content.imageSrc || ''}
                    alt={slide.content.title || 'Slide image'}
                    fill
                    loading={index === 0 ? 'eager' : 'lazy'}
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectFit: 'cover' }}
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <span className="text-white">
                        Изображение временно недоступно
                    </span>
                </div>
            )}
            {slide.content.title && (
                <div className="absolute bottom-[10%] left-0 right-0 px-2 text-white text-center z-10">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
                        {slide.content.title}
                    </h2>
                </div>
            )}
        </>
    );
};

export default SlideContent;

// <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-1">
//     <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={isInView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.3 }}
//         className="absolute top-[10%] left-0 right-0 px-6 text-white text-center"
//     >
//         <motion.h1
//             className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light tracking-wide "
//             initial={{ opacity: 0, y: 30 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.5 }}
//         >
//             {slide.content.title}
//         </motion.h1>

//         <motion.p
//             className="text-md md:text-2xl text-white mb-0 max-w-2xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.7 }}
//         >
//             Проводник в сфере красоты. Не создаю новые лица, а
//             показываю женщине ее саму, только в более уверенной
//             версии, честно, с любовью и поддержкой.
//         </motion.p>
//     </motion.div>
// </div>
