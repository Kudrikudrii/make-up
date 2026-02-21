import { useState, useCallback } from 'react';

interface Slide {
    src: string;
    alt: string;
}

export const useLightbox = (defaultSlides: Slide[] = []) => {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [slides, setSlides] = useState<Slide[]>(defaultSlides);

    const openLightbox = useCallback((newSlides: Slide[], newIndex: number) => {
        setSlides(newSlides);
        setIndex(newIndex);
        setOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setOpen(false);
    }, []);

    return {
        open,
        index,
        slides,
        openLightbox,
        closeLightbox
    };
};