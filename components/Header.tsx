import React, { useState } from 'react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="flex items-center justify-between whitespace-nowrap px-6 py-4 relative z-50">
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
                <a className="text-base font-medium leading-normal text-[var(--text-color)] hover:text-[var(--primary-accent)]" href="#schedule">Schedule</a>
                <a className="text-base font-medium leading-normal text-[var(--text-color)] hover:text-[var(--primary-accent)]" href="#speakers">Speakers</a>
                <a className="text-base font-medium leading-normal text-[var(--text-color)] hover:text-[var(--primary-accent)]" href="#faq">FAQ</a>
            </div>

            <div className="hidden md:flex gap-2">
                <a className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[var(--primary-accent)] text-white text-sm font-bold leading-normal tracking-wide transition-transform hover:scale-105 card-shadow-doodle card-border" href="https://lu.ma" target="_blank" rel="noreferrer">
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

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b-2 border-[var(--card-stroke)] p-4 flex flex-col gap-4 md:hidden shadow-lg">
                    <a className="text-base font-medium text-[var(--text-color)]" href="#schedule" onClick={() => setIsMenuOpen(false)}>Schedule</a>
                    <a className="text-base font-medium text-[var(--text-color)]" href="#speakers" onClick={() => setIsMenuOpen(false)}>Speakers</a>
                    <a className="text-base font-medium text-[var(--text-color)]" href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                    <a className="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 bg-[var(--primary-accent)] text-white text-sm font-bold card-border" href="https://lu.ma" target="_blank" rel="noreferrer">
                        Register
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;