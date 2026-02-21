import React from 'react';
import { motion } from 'framer-motion';
import GalleryHeader from './GalleryHeader';
import ImageGrid from './ImageGrid';
import { containerVariants } from '../../utils/animations.config';
import { ImageItem } from '../types';

interface GallerySectionProps {
    title: string;
    description: string;
    images: ImageItem[];
    onImageClick: (slides: { src: string; alt: string }[], index: number) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({
    title,
    description,
    images,
    onImageClick
}) => {
    const slides = React.useMemo(
        () => images.map(img => ({ src: img.src, alt: img.alt })),
        [images]
    );

    const handleImageClick = (index: number) => {
        onImageClick(slides, index);
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-8"
            variants={containerVariants}
        >
            <GalleryHeader title={title} description={description} />
            <ImageGrid images={images} onImageClick={handleImageClick} />
        </motion.div>
    );
};

export default React.memo(GallerySection);