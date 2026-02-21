import React from 'react';
import { motion } from 'framer-motion';
import { headerVariants, textVariants, hrVariants } from '../../utils/animations.config';

interface GalleryHeaderProps {
    title: string;
    description: string;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({ title, description }) => {
    return (
        <>
            <motion.h1
                className="text-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                variants={headerVariants}
            >
                {title}
            </motion.h1>
            <motion.hr
                className="mx-auto w-[70%] border-0 h-px bg-white mb-4"
                variants={hrVariants}
                style={{ originX: 0.5 }}
            />
            <motion.p
                className="text-center text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 mb-8 max-w-4xl mx-auto"
                variants={textVariants}
            >
                {description}
            </motion.p>
        </>
    );
};

export default GalleryHeader;