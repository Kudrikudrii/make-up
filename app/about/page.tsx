'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ExportedImage from 'next-image-export-optimizer';
import GallerySection from '../portfolio/components/GallerySection';
import GalleryLightbox from '../portfolio/components/GalleryLightbox';
import { useLightbox } from '@/app/utils/hooks/useLightbox';
import {
    containerVariants,
    headerVariants,
    textVariants,
    imageVariants,
} from '@/app/utils/animations.config';
import { CREATIVE_PROCESS_IMAGES } from '../utils/constants/data';

const AboutPage = () => {
    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [secondRef, secondInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const lightbox = useLightbox();

    const handleImageClick = (
        slides: { src: string; alt: string }[],
        index: number
    ) => {
        lightbox.openLightbox(slides, index);
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-black min-h-screen pt-24 pb-16"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={heroRef}
                    initial="hidden"
                    animate={heroInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24"
                >
                    <motion.div
                        variants={imageVariants}
                        className="relative w-full h-full min-h-150 lg:min-h-175 rounded-xl overflow-hidden shadow-2xl"
                    >
                        <motion.div
                            whileHover="hover"
                            variants={imageVariants}
                            className="absolute inset-0 w-full h-full"
                        >
                            <ExportedImage
                                src="/images/about/hero/evgeniya-garankina-vizazhist-stilist-brovist-moskva-o-sebe-01.jpg"
                                alt="Евгения Гаранкина — визажист, бровист и мастер причесок в Москве | Фото из портфолио для раздела о себе"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        variants={containerVariants}
                        className="text-white text-center flex flex-col justify-start pt-0"
                    >
                        <motion.h1
                            variants={headerVariants}
                            className="text-4xl md:text-3xl lg:text-5xl font-bold mb-4"
                        >
                            <span className="text-[#947360]">
                                Привет, меня зовут Женя
                            </span>
                        </motion.h1>
                        <motion.hr
                            className="mx-auto w-[70%] border-0 h-px bg-white mb-4"
                            variants={headerVariants}
                            style={{ originX: 0.5 }}
                        />
                        <motion.p
                            variants={textVariants}
                            className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed"
                        >
                            С 2018 года я помогаю обретать уверенность в себе
                            через создание образа. Мой главный принцип — не
                            менять, а подчеркивать. Я бережно работаю с
                            природной красотой, чтобы в зеркале ты увидела себя,
                            но самую сияющую и вдохновенную версию.
                        </motion.p>

                        <motion.p
                            variants={textVariants}
                            className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed"
                        >
                            Со мной вы можете собраться на любое мероприятие,
                            фотосессию, праздник, главное ваш запрос.
                        </motion.p>
                    </motion.div>
                </motion.div>

                <motion.div
                    ref={secondRef}
                    initial="hidden"
                    animate={secondInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24"
                >
                    <motion.div
                        variants={containerVariants}
                        className="text-white text-center flex flex-col  justify-start pt-0 order-2 lg:order-1"
                    >
                        <motion.p
                            variants={textVariants}
                            className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed"
                        >
                            Я постоянно обучаюсь новым техникам и слежу за
                            трендами в мире beauty-индустрии. Это позволяет мне
                            создавать актуальные образы, которые подчеркивают
                            вашу индивидуальность.
                        </motion.p>
                        <motion.p
                            variants={textVariants}
                            className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed"
                        >
                            За годы работы успела поработать не только с
                            частными клиентами, но и на различных масштабных
                            площадках и мероприятиях.
                        </motion.p>
                        <motion.div
                            variants={containerVariants}
                            className="space-y-4"
                        >
                            <motion.div
                                variants={textVariants}
                                className="flex items-start gap-3"
                            >
                                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                                    Участие в проектах с продакшеном (социальные
                                    и имиджевые ролики для ТВ).
                                </p>
                            </motion.div>
                            <motion.div
                                variants={textVariants}
                                className="flex items-start gap-3"
                            >
                                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                                    Работа в составе гримеров на реалити-шоу,
                                    где важен каждый кадр, а также работа на
                                    клипах и рекламе.
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        variants={imageVariants}
                        className="relative w-full h-full min-h-[500px] lg:min-h-[600px] rounded-xl overflow-hidden shadow-2xl order-1 lg:order-2"
                    >
                        <motion.div
                            whileHover="hover"
                            variants={imageVariants}
                            className="absolute inset-0 w-full h-full"
                        >
                            <ExportedImage
                                src="/images/about/hero/evgeniya-garankina-vizazhist-stilist-brovist-moskva-o-sebe-02.jpg"
                                alt="Евгения Гаранкина — визажист, бровист и мастер причесок в Москве | Фото из портфолио для раздела о себе"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="bg-black min-h-screen"
                >
                    <GallerySection
                        title="Рабочий процесс"
                        description="Так происходит магия преображения"
                        images={CREATIVE_PROCESS_IMAGES}
                        onImageClick={handleImageClick}
                    />
                    <GalleryLightbox
                        open={lightbox.open}
                        index={lightbox.index}
                        slides={lightbox.slides}
                        onClose={lightbox.closeLightbox}
                    />
                </motion.section>
            </div>
        </motion.section>
    );
};

export default AboutPage;
