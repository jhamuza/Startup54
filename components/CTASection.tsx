import React from 'react';

const CTASection: React.FC = () => {
    return (
        <section className="py-10 sm:py-12">
            <div className="relative overflow-hidden rounded-2xl bg-[var(--primary-accent)] p-8 card-shadow-doodle card-border sm:p-12 rotate-small-alt rotate-v16">
                
                {/* Simplified Wave Background - Top Right Only */}
                <svg className="absolute top-0 right-0 h-[150%] w-auto translate-x-1/6 -translate-y-1/6 pointer-events-none" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M500 0V500C300 350 400 100 100 0H500Z" fill="var(--tertiary-accent)"/>
                    <path d="M500 0V300C400 200 450 50 250 0H500Z" fill="white" opacity="0.2"/>
                </svg>

                <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center">
                    <div className="max-w-xl">
                        <h2 className="font-heading text-4xl font-extrabold text-[var(--card-stroke)] sm:text-5xl md:text-6xl">Don't Miss Out!</h2>
                        <p className="mt-4 text-lg text-[var(--card-stroke)]/90">Secure your spot at Startup54 and be part of a weekend that could change everything. Space is limited!</p>
                    </div>
                    {/* Button color updated to match 'What is Startup54' container (tertiary-accent) */}
                    <a className="flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 w-auto max-w-xs px-8 bg-[var(--tertiary-accent)] text-[var(--card-stroke)] text-lg font-bold leading-normal tracking-wide transition-transform hover:scale-105 card-border card-shadow-doodle" href="https://luma.com/tcet541m" target="_blank" rel="noreferrer">
                        <span className="truncate">Register Now</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTASection;