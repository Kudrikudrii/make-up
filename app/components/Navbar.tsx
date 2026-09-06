'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '../utils/constants/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Блокируем прокрутку body при открытом меню
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (buttonRef.current?.contains(event.target as Node)) {
                return;
            }

            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="z-50 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="transition-all duration-300">
                    <div className="flex items-center justify-between md:px-6">
                        <div className="w-10"></div>
                        <button
                            onClick={toggleMenu}
                            className="relative w-10 h-10 flex flex-col justify-center items-center z-50 touch-manipulation"
                            aria-label="Toggle menu"
                            ref={buttonRef}
                            aria-expanded={isOpen}
                        >
                            <span
                                className={`absolute w-6 h-0.5 bg-black transition-all duration-300 shadow-[0_0_0_1px_gray] ${
                                    isOpen ? 'rotate-45' : '-translate-y-2'
                                }`}
                            />
                            <span
                                className={`absolute w-6 h-0.5 bg-black transition-all duration-300 shadow-[0_0_0_1px_gray] ${
                                    isOpen ? 'opacity-0' : ''
                                }`}
                            />
                            <span
                                className={`absolute w-6 h-0.5 bg-black transition-all duration-300 shadow-[0_0_0_1px_gray] ${
                                    isOpen ? '-rotate-45' : 'translate-y-2'
                                }`}
                            />
                        </button>
                    </div>
                    <motion.div
                        initial={false}
                        animate={{ height: isOpen ? 'auto' : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                        ref={menuRef}
                    >
                        <div className="backdrop-blur-md bg-white/10 rounded-2xl">
                            <div className="space-y-2">
                                {NAV_LINKS.map(({ href, label, ariaLabel }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2 text-primary hover:text-primary-light relative group transition-all duration-300 text-xl font-medium"
                                        aria-label={ariaLabel}
                                    >
                                        <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(79,38,10,0.3)]">
                                            {label}
                                        </span>
                                        <span className="absolute inset-0 rounded-full bg-linear-to-r from-primary/0 via-primary-light/0 to-primary-dark/0 group-hover:from-primary/20 group-hover:via-primary-light/20 group-hover:to-primary-dark/20 transition-all duration-500 blur-md"></span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </nav>
    );
}