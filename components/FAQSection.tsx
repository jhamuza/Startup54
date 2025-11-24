import React from 'react';

const FAQSection: React.FC = () => {
    return (
        <section className="py-10 sm:py-12" id="faq">
            <div className="mx-auto max-w-4xl">
                <h2 className="text-center font-heading text-4xl font-bold tracking-tight text-[var(--text-color)] sm:text-5xl">Frequently Asked Questions</h2>
                <div className="mt-12 space-y-6">
                    <details className="group rounded-2xl bg-white p-6 card-shadow-doodle card-border rotate-small-alt rotate-v12">
                        <summary className="flex cursor-pointer items-center justify-between gap-4">
                            <h3 className="text-lg font-bold text-[var(--text-color)]">Who should attend Startup54?</h3>
                            <span className="relative h-6 w-6">
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                            </span>
                        </summary>
                        <p className="mt-4 text-base leading-relaxed text-[var(--text-color)]/80">Anyone passionate about building something new! This includes developers, designers, marketers, product managers, and aspiring entrepreneurs. You don't need a fully-formed idea to participate.</p>
                    </details>
                    
                    <details className="group rounded-2xl bg-white p-6 card-shadow-doodle card-border rotate-small rotate-v13">
                        <summary className="flex cursor-pointer items-center justify-between gap-4">
                            <h3 className="text-lg font-bold text-[var(--text-color)]">What do I need to bring?</h3>
                            <span className="relative h-6 w-6">
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                            </span>
                        </summary>
                        <p className="mt-4 text-base leading-relaxed text-[var(--text-color)]/80">Bring your laptop, charger, any specific tools you prefer for your work, and a whole lot of energy and ideas. We'll provide the Wi-Fi, food, drinks, and a great environment to create.</p>
                    </details>

                    <details className="group rounded-2xl bg-white p-6 card-shadow-doodle card-border rotate-small-alt rotate-v14">
                        <summary className="flex cursor-pointer items-center justify-between gap-4">
                            <h3 className="text-lg font-bold text-[var(--text-color)]">Do I need to have a team already?</h3>
                            <span className="relative h-6 w-6">
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                            </span>
                        </summary>
                        <p className="mt-4 text-base leading-relaxed text-[var(--text-color)]/80">Not at all! You can come with an idea, a team, or just yourself. The event kicks off with pitches and team formation, so you'll have the opportunity to join a team that excites you.</p>
                    </details>

                    <details className="group rounded-2xl bg-white p-6 card-shadow-doodle card-border rotate-small rotate-v15">
                        <summary className="flex cursor-pointer items-center justify-between gap-4">
                            <h3 className="text-lg font-bold text-[var(--text-color)]">What does the registration fee cover?</h3>
                            <span className="relative h-6 w-6">
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                            </span>
                        </summary>
                        <p className="mt-4 text-base leading-relaxed text-[var(--text-color)]/80">Your registration covers seven meals throughout the weekend (dinner Friday, all meals Saturday, breakfast and lunch Sunday), drinks and snacks, access to mentors, and all the event programming and resources.</p>
                    </details>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;