'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GallerySection from './components/GallerySection';
import GalleryLightbox from './components/GalleryLightbox';
import { useLightbox } from '@/app/utils/hooks/useLightbox';
import { containerVariants } from './animations.config';
import {
    PORTFOLIO_IMAGES,
    PORTFOLIO_BRANDS_IMAGES,
} from '@/app/utils/constants/data';

const Gallery: React.FC = () => {
    const lightbox = useLightbox();

    const handleImageClick = (slides: { src: string; alt: string }[], index: number) => {
        lightbox.openLightbox(slides, index);
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-black min-h-screen"
        >
            <GallerySection
                title="Фотосессии"
                description="Совместные проекты с фотографом и стилистом. Здесь мы создавали образы от идеи до воплощения, где каждая деталь работает на кадр."
                images={PORTFOLIO_IMAGES}
                onImageClick={handleImageClick}
            />

            <GallerySection
                title="Работа с брендами"
                description="Эти фотографии — результат сотрудничества с компаниями и дизайнерами. Моя задача как визажиста и стилиста по волосам — подчеркнуть идею продукта или коллекции, сделав образ гармоничным."
                images={PORTFOLIO_BRANDS_IMAGES}
                onImageClick={handleImageClick}
            />

            <GalleryLightbox
                open={lightbox.open}
                index={lightbox.index}
                slides={lightbox.slides}
                onClose={lightbox.closeLightbox}
            />
        </motion.section>
    );
};

export default Gallery;