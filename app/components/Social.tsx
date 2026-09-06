'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ExportedImage from 'next-image-export-optimizer';
import { SOCIAL_LINKS, type SocialLink } from '../utils/constants/social';

export default function Social() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    return (
        <section id="contact" className="py-2 md:py-4 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6">
                    <h2 className="text-xl md:text-3xl font-bold text-black">
                        <strong>СВЯЗАТЬСЯ СО МНОЙ</strong>
                    </h2>
                </div>

                <motion.div
                    ref={ref}
                    className="flex flex-wrap justify-center gap-4 relative"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {SOCIAL_LINKS.map((item: SocialLink, index: number) => (
                        <motion.a
                            key={index}
                            href={item.link}
                            onClick={(e) => handleClick(e, item.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:text-white"
                        >
                            <ExportedImage
                                src={item.icon}
                                alt={item.name}
                                fill
                                sizes="64px"
                                className="object-cover"
                            />
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
