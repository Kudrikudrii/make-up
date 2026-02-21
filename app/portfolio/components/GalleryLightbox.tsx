import React from 'react';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(
    () => import('yet-another-react-lightbox').then(mod => mod.default),
    { 
        ssr: false,
        loading: () => (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        )
    }
);

import 'yet-another-react-lightbox/styles.css';

interface Slide {
    src: string;
    alt: string;
}

interface GalleryLightboxProps {
    open: boolean;
    index: number;
    slides: Slide[];
    onClose: () => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
    open,
    index,
    slides,
    onClose
}) => {
    if (!open) return null;

    return (
        <Lightbox
            open={open}
            close={onClose}
            index={index}
            slides={slides}
            controller={{ closeOnBackdropClick: true }}
            carousel={{ finite: false }}
            animation={{ fade: 300 }}
        />
    );
};

export default React.memo(GalleryLightbox);