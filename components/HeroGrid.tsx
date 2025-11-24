import React from 'react';
import CountdownTimer from './CountdownTimer';

const HeroGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 gap-6 @[1024px]:grid-cols-3 @[1024px]:grid-rows-3">
            {/* Main Hero Card */}
            <div className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl p-6 card-shadow-doodle card-border @[1024px]:col-span-2 @[1024px]:row-span-2 rotate-small rotate-v1 transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{backgroundImage: "url('https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
                />
                {/* Bright Overlay for readability */}
                <div className="absolute inset-0 z-0 bg-white/60 backdrop-blur-[2px] shadow-[inset_0_0_0_0_transparent] transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.1)]"></div>
                
                <div className="relative z-10 flex flex-col">
                    <h1 className="font-heading text-4xl font-black leading-tight text-[var(--text-color)] @[640px]:text-6xl">Empowering Communities</h1>
                    <p className="mt-2 text-2xl font-medium text-[var(--text-color)]">through Entrepreneurship Education.</p>
                </div>
                
                {/* Floating Logo - Size Increased ~2.5x */}
                <div className="relative z-10 flex flex-1 items-center justify-center my-4">
                     <img 
                        src="https://raw.githubusercontent.com/jhamuza/divac4/refs/heads/main/S54%20Sticker.png" 
                        alt="Startup54 Logo" 
                        className="h-60 sm:h-80 w-auto max-w-full object-contain drop-shadow-md animate-float"
                    />
                </div>

                <div className="relative z-10 mt-auto pt-6">
                    <h2 className="font-heading text-3xl font-bold leading-tight text-[var(--text-color)] mb-2">
                        Event Starts <span className="bg-[var(--tertiary-accent)] text-black px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm">January 9, 2026</span>
                    </h2>
                    <CountdownTimer />
                </div>
            </div>

            {/* Tentative Schedule Card */}
            <div className="group transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 rotate-small-alt rotate-v2">
                <div className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 card-shadow-doodle card-border transition-shadow duration-300 group-hover:shadow-[10px_10px_0_0_var(--card-stroke)]">
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
            </div>

            {/* What is Startup54 Card */}
            <div className="group transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 @[1024px]:col-span-1 rotate-small rotate-v3">
                <div className="flex h-full flex-col gap-4 rounded-2xl bg-[var(--tertiary-accent)] p-6 card-shadow-doodle card-border transition-shadow duration-300 group-hover:shadow-[10px_10px_0_0_var(--card-stroke)]">
                    <h2 className="font-heading text-2xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">What is Startup54?</h2>
                    <p className="text-base font-normal leading-relaxed text-[var(--text-color)]">A whirlwind 54-hour event where developers, designers, and innovators come together to turn ideas into reality. It's a platform to test ideas, develop skills, and connect with a community of creators.</p>
                    <a href="https://luma.com/tcet541m" target="_blank" rel="noreferrer" className="mt-auto flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-white text-[var(--card-stroke)] text-sm font-bold leading-normal tracking-wide transition-transform hover:scale-105 card-border">
                        <span className="truncate">Learn More</span>
                    </a>
                </div>
            </div>

            {/* Our Focus Card */}
            <div className="group transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 rotate-small-alt rotate-v4">
                <div className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 card-shadow-doodle card-border transition-shadow duration-300 group-hover:shadow-[10px_10px_0_0_var(--card-stroke)]">
                    <h2 className="font-heading text-2xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">Our Focus</h2>
                    <p className="text-base font-normal leading-relaxed text-[var(--text-color)]">We empower aspiring entrepreneurs by providing hands-on education. Learn to build, validate, and pitch a startup in one weekend, surrounded by a supportive community and experienced mentors.</p>
                </div>
            </div>

            {/* Venue Card */}
            <div className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl p-6 card-shadow-doodle card-border rotate-small rotate-v1 transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                    style={{backgroundImage: "url('https://tegas.org.my/wp-content/uploads/2024/10/Key-Act-1200x630-min-scaled.jpg')"}}
                >
                </div>
                
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 z-0 bg-black/50 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-40"></div>
                <div className="absolute inset-0 rounded-2xl ring-0 transition-shadow duration-300 group-hover:shadow-[10px_10px_0_0_var(--card-stroke)] pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 w-full">
                     <h2 className="font-heading text-3xl font-bold leading-tight text-white drop-shadow-sm">
                        Venue: <span className="bg-[var(--tertiary-accent)] text-black px-2 py-1 rounded-md inline-block transform -rotate-1 shadow-sm box-decoration-clone">TEGAS Digital Village</span>
                     </h2>
                </div>
            </div>

            {/* Ready to Build Card */}
            <div className="group transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 @[1024px]:col-span-1 rotate-small-alt rotate-v5">
                <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-4 rounded-2xl bg-[var(--primary-accent)] p-6 text-center card-shadow-doodle card-border transition-shadow duration-300 group-hover:shadow-[10px_10px_0_0_var(--card-stroke)]">
                    <h2 className="font-heading text-3xl font-bold leading-tight text-white">Ready to Build?</h2>
                    <p className="text-base font-medium leading-normal text-white">Join the brightest minds and create the future in one high-energy weekend.</p>
                    <a className="flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white text-[var(--card-stroke)] text-base font-bold leading-normal tracking-wide transition-transform hover:scale-105 card-border" href="https://luma.com/tcet541m" target="_blank" rel="noreferrer">
                        <span className="truncate">Register on Luma</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HeroGrid;