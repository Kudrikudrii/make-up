import React, { useState } from 'react';
import ExportedImage from 'next-image-export-optimizer'
import { motion } from 'framer-motion';
import { imageVariants, gridVariants } from '../../utils/animations.config';
import { ImageItem } from '../types';

interface ImageGridProps {
    images: ImageItem[];
    onImageClick: (index: number) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onImageClick }) => {
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => new Set(prev).add(index));
    };

    return (
        <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4"
            variants={gridVariants}
        >
            {images.map((image, idx) => (
                <motion.div
                    key={image.id}
                    className="relative overflow-hidden rounded-lg shadow-md cursor-pointer aspect-square bg-gray-200"
                    variants={imageVariants}
                    whileHover="hover"
                    onClick={() => onImageClick(idx)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            onImageClick(idx);
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${image.alt}`}
                >
                    {!loadedImages.has(idx) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        </div>
                    )}
                    <ExportedImage
                        src={image.thumbnail}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className={`object-cover transition-opacity duration-300 ${
                            loadedImages.has(idx) ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(idx)}
                        priority={idx < 4}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default React.memo(ImageGrid);