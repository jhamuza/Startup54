import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Toggle state based on scroll position
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setIsMenuOpen(false);
        }
    };

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
                isScrolled 
                ? 'bg-[var(--bg-color)]/95 backdrop-blur-md border-b-4 border-[var(--card-stroke)] shadow-md' 
                : 'bg-transparent border-b-4 border-transparent'
            }`}
        >
            <div className="flex w-full justify-center px-4 sm:px-10 lg:px-20">
                <div className="flex w-full max-w-7xl items-center justify-between whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-4">
                        <div className="size-6 text-[var(--primary-accent)]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="font-heading text-2xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">Startup54</h2>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-9 md:flex">
                        <a 
                            className="text-base font-medium leading-normal text-[var(--text-color)] hover:text-[var(--primary-accent)] cursor-pointer transition-colors" 
                            href="#schedule"
                            onClick={(e) => scrollToSection(e, 'schedule')}
                        >
                            Schedule
                        </a>
                        <a 
                            className="text-base font-medium leading-normal text-[var(--text-color)] hover:text-[var(--primary-accent)] cursor-pointer transition-colors" 
                            href="#speakers"
                            onClick={(e) => scrollToSection(e, 'speakers')}
                        >
                            Speakers
                        </a>
                        <a 
                            className="text-base font-medium leading-normal text-[var(--text-color)] hover:text-[var(--primary-accent)] cursor-pointer transition-colors" 
                            href="#faq"
                            onClick={(e) => scrollToSection(e, 'faq')}
                        >
                            FAQ
                        </a>
                    </div>

                    <div className="hidden md:flex gap-2">
                        <a className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[var(--primary-accent)] text-white text-sm font-bold leading-normal tracking-wide transition-transform hover:scale-105 card-shadow-doodle card-border" href="https://luma.com/tcet541m" target="_blank" rel="noreferrer">
                            <span className="truncate">Register</span>
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden p-2 text-[var(--text-color)]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b-4 border-[var(--card-stroke)] p-4 flex flex-col gap-4 md:hidden shadow-lg animate-in slide-in-from-top-5">
                    <a 
                        className="text-base font-medium text-[var(--text-color)] cursor-pointer hover:text-[var(--primary-accent)]" 
                        href="#schedule" 
                        onClick={(e) => scrollToSection(e, 'schedule')}
                    >
                        Schedule
                    </a>
                    <a 
                        className="text-base font-medium text-[var(--text-color)] cursor-pointer hover:text-[var(--primary-accent)]" 
                        href="#speakers" 
                        onClick={(e) => scrollToSection(e, 'speakers')}
                    >
                        Speakers
                    </a>
                    <a 
                        className="text-base font-medium text-[var(--text-color)] cursor-pointer hover:text-[var(--primary-accent)]" 
                        href="#faq" 
                        onClick={(e) => scrollToSection(e, 'faq')}
                    >
                        FAQ
                    </a>
                    <a className="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 bg-[var(--primary-accent)] text-white text-sm font-bold card-border" href="https://luma.com/tcet541m" target="_blank" rel="noreferrer">
                        Register
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;