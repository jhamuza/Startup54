import React from 'react';
import CountdownTimer from './CountdownTimer';

const HeroGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 gap-6 @[1024px]:grid-cols-3 @[1024px]:grid-rows-3">
            {/* Main Hero Card */}
            <div className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl bg-[var(--quaternary-accent)] p-6 card-shadow-doodle card-border @[1024px]:col-span-2 @[1024px]:row-span-2 rotate-small rotate-v1">
                <div className="relative z-10 flex flex-col">
                    <h1 className="font-heading text-4xl font-black leading-tight text-[var(--text-color)] @[640px]:text-6xl">Empowering Communities</h1>
                    <p className="mt-2 text-lg font-medium text-[var(--text-color)]">through Entrepreneurship Education.</p>
                </div>
                <div className="relative z-10 mt-auto">
                    <p className="text-sm font-medium text-[var(--text-color)]">Event Starts January 9, 2026</p>
                    <CountdownTimer />
                </div>
            </div>

            {/* Tentative Schedule Card */}
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 card-shadow-doodle card-border rotate-small-alt rotate-v2">
                <h2 className="font-heading text-2xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">Tentative Schedule</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--secondary-accent)] text-[var(--card-stroke)] card-border">
                            <span className="material-symbols-outlined">campaign</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-color)]">Friday: Kickoff &amp; Pitches</h3>
                            <p className="text-sm text-[var(--text-color)]/80">Networking, idea pitches, and team formation.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--tertiary-accent)] text-[var(--card-stroke)] card-border">
                            <span className="material-symbols-outlined">code</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-color)]">Saturday: Build &amp; Mentor</h3>
                            <p className="text-sm text-[var(--text-color)]/80">Intensive building with guidance from experts.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-accent)] text-white card-border">
                            <span className="material-symbols-outlined">emoji_events</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-color)]">Sunday: Demos &amp; Awards</h3>
                            <p className="text-sm text-[var(--text-color)]/80">Final presentations, judging, and celebration.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* What is Startup54 Card */}
            <div className="flex flex-col gap-4 rounded-2xl bg-[var(--tertiary-accent)] p-6 card-shadow-doodle card-border @[1024px]:col-span-1 rotate-small rotate-v3">
                <h2 className="font-heading text-2xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">What is Startup54?</h2>
                <p className="text-base font-normal leading-relaxed text-[var(--text-color)]">A whirlwind 54-hour event where developers, designers, and innovators come together to turn ideas into reality. It's a platform to test ideas, develop skills, and connect with a community of creators.</p>
                <button className="mt-auto flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-white text-[var(--card-stroke)] text-sm font-bold leading-normal tracking-wide transition-transform hover:scale-105 card-border">
                    <span className="truncate">Learn More</span>
                </button>
            </div>

            {/* Our Focus Card */}
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 card-shadow-doodle card-border rotate-small-alt rotate-v4">
                <h2 className="font-heading text-2xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">Our Focus</h2>
                <p className="text-base font-normal leading-relaxed text-[var(--text-color)]">We empower aspiring entrepreneurs by providing hands-on education. Learn to build, validate, and pitch a startup in one weekend, surrounded by a supportive community and experienced mentors.</p>
            </div>

            {/* Abstract Image Card */}
            <div 
                className="flex min-h-[200px] items-end rounded-2xl bg-cover bg-center p-6 card-shadow-doodle card-border rotate-small rotate-v1" 
                style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAetgQSgmF9dZvAsRnNmU3LbJaTevJugBKRSRtLpAbdBXNZTF1ndoL5pb77DvyVVEjp8ugzsKGyEsnM1SHufluhayPy7PAoMumDtauZBnaADcqavrWEe6B9C00mZXZWa0WLBWDmQ7Ab1tPLf2U93_7wQg7fFcqZnlrCXiqyy9CIGVaLrKnn3vm2aXJOVDz5uNK3yml7hwbIDmc8AluTB6tlc--kyHRA4APo6uRzvQJhnk1tmL-XIkyQyqfC3OiB40-2sk0-Bi0pabiN')"}}
            >
            </div>

            {/* Ready to Build Card */}
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-2xl bg-[var(--primary-accent)] p-6 text-center card-shadow-doodle card-border @[1024px]:col-span-1 rotate-small-alt rotate-v5">
                <h2 className="font-heading text-3xl font-bold leading-tight text-white">Ready to Build?</h2>
                <p className="text-base font-medium leading-normal text-white">Join the brightest minds and create the future in one high-energy weekend.</p>
                <a className="flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white text-[var(--card-stroke)] text-base font-bold leading-normal tracking-wide transition-transform hover:scale-105 card-border" href="https://lu.ma" target="_blank" rel="noreferrer">
                    <span className="truncate">Register on Luma</span>
                </a>
            </div>
        </div>
    );
};

export default HeroGrid;