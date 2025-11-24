import React from 'react';

const SpeakersSection: React.FC = () => {
    return (
        <section className="py-10 sm:py-12" id="speakers">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="font-heading text-4xl font-bold tracking-tight text-[var(--text-color)] sm:text-5xl">Our Speakers &amp; Mentors</h2>
                <p className="mt-4 text-lg leading-8 text-[var(--text-color)]/80">Learn from industry leaders, successful founders, and domain experts.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {/* Speaker 1 */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative rotate-small rotate-v9">
                        <img alt="Portrait of Alex Chen" className="h-40 w-40 rounded-full object-cover card-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrH2-nDNllyujV5y2pXzfGrqihhtZuyk59F42LvoDFG-iOPdOSREgLj1p1yOE2WW1xUuDvu5_AjX0Hz-O6KJ3CJf1JUoF6gpxIZyFy4LpaulHS4ppHaB-YBeYBcroUTiEX0qTgG5nseJvyZhrIEh9GXlP2N1Aq3GM3gS9wi081xkVOvDmMPkph7LD1BgFLP3fDYAvcjv_9MxK0N8UIvOnf1eKiEc0GtU9k2XKwiX-O8mGbjqZdJQbDdu5e4mEUpJXtLxcsoBEG2VI6" />
                        <div className="absolute -bottom-2 -right-2 rounded-lg bg-[var(--primary-accent)] p-2 card-shadow-doodle card-border">
                            <span className="material-symbols-outlined text-white">business_center</span>
                        </div>
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-bold text-[var(--text-color)]">Alex Chen</h3>
                    <p className="text-base font-semibold leading-7 text-[var(--primary-accent)]">Founder &amp; CEO, InnovateX</p>
                    <p className="mt-2 text-sm text-[var(--text-color)]/80">Expert in product development and scaling tech startups.</p>
                </div>

                {/* Speaker 2 */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative rotate-small-alt rotate-v10">
                        <img alt="Portrait of Priya Sharma" className="h-40 w-40 rounded-full object-cover card-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLJFx30HXmPhTYyOYoEApkmvrblUtJFHZXSVrBBA2hDewCCO_ztzGbyfsnVxve7aOd3uVEhYsdiesn5AP-V8dfL8d-_R5lQyQ61597_3Uzm51ZNlY5Cl1dXHGqlFBI3ZU87m-pBHQUTbNSMYB3vZxjWTfjogrZSofKPaSB1hTla3yA_cOfN2cA0AJgbZo520Sr1gZ4H1kWrj85144EneFfI9YSNQsWsLaOzmSrcQnaKJ5AENPXuTwYvHhDODcuL2iEwhMvdG0W0oQx" />
                        <div className="absolute -bottom-2 -right-2 rounded-lg bg-[var(--secondary-accent)] p-2 card-shadow-doodle card-border">
                            <span className="material-symbols-outlined text-[var(--card-stroke)]">palette</span>
                        </div>
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-bold text-[var(--text-color)]">Priya Sharma</h3>
                    <p className="text-base font-semibold leading-7 text-[var(--secondary-accent)]">Lead UX Designer, Creative Minds</p>
                    <p className="mt-2 text-sm text-[var(--text-color)]/80">Specializes in user-centric design and building intuitive products.</p>
                </div>

                {/* Speaker 3 */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative rotate-small rotate-v11">
                        <img alt="Portrait of Ben Carter" className="h-40 w-40 rounded-full object-cover card-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF2FBvKpeyGgxHCJrzWFhHUNqpYShfZIBMJKDtbuAjVSh5MJdc3-d0Wm4HvwABnlzhboQJesFCwDenBSvC7QIvhPIZ2P3kDN7TkpD2goFKJbSitQCL8fCC0DcbaGa2kYkcMtpqEe3bSEcytHZM2ILm8N9UWZUKWQfopinQwvDDkRV7NTH5eaC8NRNgRruXi8YXygtTrNb3Z1061EWKPf58dJnZbETzuf4Ixg3Myu83grhJFAXA9ZxFulMtGm9AB1s0KSd1u0hr9nSz" />
                        <div className="absolute -bottom-2 -right-2 rounded-lg bg-[var(--tertiary-accent)] p-2 card-shadow-doodle card-border">
                            <span className="material-symbols-outlined text-[var(--card-stroke)]">trending_up</span>
                        </div>
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-bold text-[var(--text-color)]">Ben Carter</h3>
                    <p className="text-base font-semibold leading-7 text-[var(--tertiary-accent)]">Venture Capitalist, Growth Ventures</p>
                    <p className="mt-2 text-sm text-[var(--text-color)]/80">Focuses on early-stage investments and startup strategy.</p>
                </div>
            </div>
        </section>
    );
};

export default SpeakersSection;