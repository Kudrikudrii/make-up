'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, type PanInfo } from 'framer-motion';
import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';
import { SLIDES_CONTENT } from '../utils/constants/slides';
import { SOCIAL_LINKS } from '../utils/constants/social';

type SlidesContent = {
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
  content: SlidesContent;
};

const slides: Slide[] = SLIDES_CONTENT as Slide[];
const FOOTER_HEIGHT = 150;

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const [isFooterRevealed, setIsFooterRevealed] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const isAnimatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const controls = useAnimation();
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setIsAnimating = useCallback((value: boolean) => {
    isAnimatingRef.current = value;
  }, []);

  // Очистка таймаутов
  useEffect(() => {
    return () => {
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    };
  }, []);

  // Адаптивная высота
  useEffect(() => {
    const updateHeight = () => {
      setSlideHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Блокировка скролла страницы
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Предотвращение нативного скролла на тач-устройствах
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventDefaultTouch = (e: TouchEvent) => {
      if (container.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefaultTouch, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventDefaultTouch);
    };
  }, []);

  // Управление воспроизведением видео
  useEffect(() => {
    slides.forEach((slide, index) => {
      if (slide.type === 'video') {
        const video = videoRefs.current[slide.id];
        if (video) {
          if (index === activeIndex && !isFooterRevealed) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      }
    });
  }, [activeIndex, isFooterRevealed]);

  // Предзагрузка следующего изображения
  useEffect(() => {
    const preloadNextImage = () => {
      const nextIndex = (activeIndex + 1) % slides.length;
      const nextSlide = slides[nextIndex];
      
      if (nextSlide.type === 'image' && nextSlide.content.imageSrc) {
        const img = new Image();
        img.src = nextSlide.content.imageSrc;
      }
    };

    preloadNextImage();
  }, [activeIndex]);

  // Анимация при изменении activeIndex или состояния футера
  useEffect(() => {
    const targetY = isFooterRevealed 
      ? -(activeIndex * slideHeight + FOOTER_HEIGHT)
      : -activeIndex * slideHeight;
    
    controls.start({ y: targetY });
  }, [activeIndex, slideHeight, isFooterRevealed, controls]);

  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    if (isAnimatingRef.current) return;

    // Если футер открыт и пытаемся идти дальше — закрываем футер
    if (isFooterRevealed && direction === 'next') {
      setIsFooterRevealed(false);
      return;
    }

    setIsAnimating(true);
    setIsFooterRevealed(false);
    
    setActiveIndex((prev) => {
      if (direction === 'next') {
        return Math.min(slides.length - 1, prev + 1);
      }
      return Math.max(0, prev - 1);
    });

    setTimeout(() => setIsAnimating(false), 500);
  }, [isFooterRevealed, setIsAnimating]);

  const handleDragEnd = useCallback((_event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => {
    if (isAnimatingRef.current) return;

    const threshold = 50;
    const velocityThreshold = 200;
    const offset = info.offset.y;
    const isLastSlide = activeIndex === slides.length - 1;
    
    // Если футер открыт и тянем вниз — закрываем
    if (isFooterRevealed && offset > threshold) {
      setIsFooterRevealed(false);
      return;
    }
    
    // Если на последнем слайде и тянем вверх — показываем футер
    if (isLastSlide && !isFooterRevealed) {
      const shouldRevealFooter = offset < -threshold || info.velocity.y < -velocityThreshold;
      
      if (shouldRevealFooter) {
        setIsFooterRevealed(true);
        return;
      }
    }
    
    // Стандартная логика переключения слайдов
    const shouldGoNext = offset < -threshold || info.velocity.y < -velocityThreshold;
    const shouldGoPrev = offset > threshold || info.velocity.y > velocityThreshold;
    
    if (shouldGoNext && activeIndex < slides.length - 1) {
      changeSlide('next');
    } else if (shouldGoPrev && activeIndex > 0) {
      changeSlide('prev');
    } else {
      const targetY = isFooterRevealed 
        ? -(activeIndex * slideHeight + FOOTER_HEIGHT)
        : -activeIndex * slideHeight;
      controls.start({ y: targetY });
    }
  }, [activeIndex, changeSlide, controls, slideHeight, isFooterRevealed]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (isAnimatingRef.current) return;

    if (wheelTimeout.current) clearTimeout(wheelTimeout.current);

    wheelTimeout.current = setTimeout(() => {
      const isLastSlide = activeIndex === slides.length - 1;
      
      // Если футер открыт и скроллим вверх — закрываем
      if (isFooterRevealed && e.deltaY < 0) {
        setIsFooterRevealed(false);
        return;
      }
      
      // Если на последнем слайде и скроллим вниз — показываем футер
      if (isLastSlide && !isFooterRevealed && e.deltaY > 20) {
        setIsFooterRevealed(true);
        return;
      }
      
      // Стандартная логика
      if (Math.abs(e.deltaY) > 20) {
        changeSlide(e.deltaY > 0 ? 'next' : 'prev');
      }
    }, 100);
  }, [changeSlide, activeIndex, isFooterRevealed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const onWheel = (e: WheelEvent) => handleWheel(e);
    container.addEventListener('wheel', onWheel, { passive: false });
    
    return () => container.removeEventListener('wheel', onWheel);
  }, [handleWheel]);

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (isFooterRevealed) {
          setIsFooterRevealed(false);
        } else {
          changeSlide('prev');
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        changeSlide('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeSlide, isFooterRevealed]);

  const handleImageError = (slideId: string) => {
    setImageErrors(prev => ({ ...prev, [slideId]: true }));
  };

  const setVideoRef = (slideId: string) => (el: HTMLVideoElement | null) => {
    videoRefs.current[slideId] = el;
  };

  return (
    <div className="relative">
      {/* Основной слайдер */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-black"
        style={{ height: slideHeight }}
      >
        <motion.div
          className="relative w-full h-full"
          drag="y"
          dragConstraints={{
            top: isFooterRevealed 
              ? -(slideHeight * (slides.length - 1) + FOOTER_HEIGHT)
              : -(slideHeight * (slides.length - 1) + (activeIndex === slides.length - 1 ? FOOTER_HEIGHT : 0)),
            bottom: 0
          }}
          dragElastic={activeIndex === slides.length - 1 ? 0.15 : 0}
          onDragEnd={handleDragEnd}
          animate={controls}
          transition={{ 
            type: 'spring', 
            damping: 30, 
            stiffness: 300,
            mass: 0.8
          }}
        >
          <div style={{ height: slideHeight * slides.length }}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="absolute left-0 w-full"
                style={{ top: index * slideHeight, height: slideHeight }}
              >
                <Link
                  href={slide.href}
                  target={slide.target}
                  className={`block w-full h-full relative overflow-hidden ${
                    isFooterRevealed ? 'pointer-events-none' : ''
                  }`}
                  onClick={(e) => isFooterRevealed && e.preventDefault()}
                >
                  {/* Рендер контента слайда */}
                  {slide.type === 'video' ? (
                    <>
                      <video
                        ref={setVideoRef(slide.id)}
                        src={slide.content.videoSrc}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {slide.content.title && (
                        <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={ { opacity: 1, y: 0 } }
                        transition={{ duration: 2.5, delay: 0.3 }}
                        className="absolute top-[5%] left-0 right-0 px-6 text-white text-center"
                    >
                        <motion.h1
                            className="text-primary text-8xl sm:text-3xl md:text-4xl lg:text-9xl font-light tracking-wide "
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            {slide.content.title}
                        </motion.h1>
                    </motion.div>
                      )}
                      {slide.content.discription && (
                        <div className="absolute top-[10%] left-0 right-0 px-6 text-white text-center">
                          <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-light tracking-wide">
                            {slide.content.discription}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {!imageErrors[slide.id] ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute inset-0"
                        >
                          <ExportedImage
                            src={slide.content.imageSrc || ''}
                            alt={slide.content.title || 'Slide image'}
                            fill
                            loading={index === 0 ? 'eager' : 'lazy'}
                            sizes="100vw"
                            className="object-cover"
                            style={{ objectFit: 'cover' }}
                            onError={() => handleImageError(slide.id)}
                          />
                        </motion.div>
                      ) : (
                        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                          <span className="text-white">Изображение временно недоступно</span>
                        </div>
                      )}
                      {slide.content.title && (
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute bottom-[7%] left-0 right-0 text-white text-center"
                        >
                          <h1 className="text-7xl sm:text-2xl md:text-3xl lg:text-9xl font-light tracking-wide">
                            {slide.content.title}
                          </h1>
                          <h2 className="text-5xl sm:text-2xl md:text-3xl lg:text-7xl font-light tracking-wide">
                            {slide.content.discription}
                          </h2>
                        </motion.div>
                      )}
                    </>
                  )}
                  
                  {index !== activeIndex && (
                    <div className="absolute inset-0 bg-black/50 transition-opacity duration-300" />
                  )}
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Индикаторы слайдов */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
          <div className="flex flex-col gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimatingRef.current && index !== activeIndex) {
                    setIsFooterRevealed(false);
                    setActiveIndex(index);
                  }
                }}
                className={`w-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-white h-6' 
                    : 'bg-white/50 hover:bg-white/80 h-2'
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Подсказка о футере на последнем слайде */}
        {activeIndex === slides.length - 1 && !isFooterRevealed && (
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white/50 text-sm rounded-t-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex flex-col items-center mb-7 h-14 w-30 pt-2">
              <svg 
                className="size-8 mt-3 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
              <p className="text-xl sm:text-xl md:text-2xl lg:text-6xl font-light tracking-wide">КОНТАКТЫ</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Футер с контактами */}
      <motion.footer 
        className="fixed bottom-0 left-0 w-full bg-primary text-white z-10"
        style={{ height: FOOTER_HEIGHT }}
        initial={{ y: FOOTER_HEIGHT }}
        animate={{ 
          y: isFooterRevealed ? 0 : FOOTER_HEIGHT,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div className="h-full flex flex-col items-center justify-center px-6">
          {/* <button
            onClick={() => setIsFooterRevealed(false)}
            className="absolute top-4 right-4 text-black"
            aria-label="Закрыть контакты"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
                    
          <div className="flex gap-10">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 transition-all hover:scale-110 group"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ExportedImage 
                    src={social.icon} 
                    alt={social.name}
                    className="w-20 h-20"
                    width={60}
                    height={14}
                  />
                </div>
                {/* <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {social.name}
                </span> */}
              </a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Slider;