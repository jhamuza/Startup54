import React from 'react';

const CTASection: React.FC = () => {
    return (
        <section className="py-16 sm:py-20">
            <div className="relative overflow-hidden rounded-2xl bg-[var(--primary-accent)] p-8 card-shadow-doodle card-border sm:p-12 rotate-small-alt rotate-v16">
                <svg className="absolute top-0 left-0 w-full h-auto -translate-y-1/4" fill="none" viewBox="0 0 1098 502" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1098 501.5C841.5 453 732 268 531 268C330 268 288.5 470 0 501.5" stroke="#2D2D2D" strokeWidth="3"></path>
                    <path d="M1098 440.5C841.5 392 732 207 531 207C330 207 288.5 409 0 440.5" stroke="#FFD166" strokeLinejoin="round" strokeWidth="40"></path>
                    <path d="M1098 440.5C841.5 392 732 207 531 207C330 207 288.5 409 0 440.5" stroke="#2D2D2D" strokeWidth="3"></path>
                    <path d="M1098 387.5C841.5 339 732 154 531 154C330 154 288.5 356 0 387.5" stroke="#4ECDC4" strokeLinejoin="round" strokeWidth="40"></path>
                    <path d="M1098 387.5C841.5 339 732 154 531 154C330 154 288.5 356 0 387.5" stroke="#2D2D2D" strokeWidth="3"></path>
                </svg>
                <svg className="absolute bottom-0 left-0 w-full h-auto translate-y-1/4" fill="none" viewBox="0 0 1098 502" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.5C256.5 49.5 366 234.5 567 234.5C768 234.5 809.5 32.5 1098 0.5" stroke="#2D2D2D" strokeWidth="3"></path>
                    <path d="M0 61.5C256.5 110.5 366 295.5 567 295.5C768 295.5 809.5 93.5 1098 61.5" stroke="#FFD166" strokeLinejoin="round" strokeWidth="40"></path>
                    <path d="M0 61.5C256.5 110.5 366 295.5 567 295.5C768 295.5 809.5 93.5 1098 61.5" stroke="#2D2D2D" strokeWidth="3"></path>
                    <path d="M0 114.5C256.5 163.5 366 348.5 567 348.5C768 348.5 809.5 146.5 1098 114.5" stroke="#4ECDC4" strokeLinejoin="round" strokeWidth="40"></path>
                    <path d="M0 114.5C256.5 163.5 366 348.5 567 348.5C768 348.5 809.5 146.5 1098 114.5" stroke="#2D2D2D" strokeWidth="3"></path>
                </svg>
                <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center">
                    <div className="max-w-xl">
                        <h2 className="font-heading text-4xl font-extrabold text-[var(--card-stroke)] sm:text-5xl md:text-6xl">Don't Miss Out!</h2>
                        <p className="mt-4 text-lg text-[var(--card-stroke)]/90">Secure your spot at Startup54 and be part of a weekend that could change everything. Space is limited!</p>
                    </div>
                    <a className="flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 w-auto max-w-xs px-8 bg-white text-[var(--card-stroke)] text-lg font-bold leading-normal tracking-wide transition-transform hover:scale-105 card-border card-shadow-doodle" href="https://lu.ma" target="_blank" rel="noreferrer">
                        <span className="truncate">Register Now</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTASection;