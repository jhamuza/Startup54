import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="pt-16 sm:pt-20">
            <div className="overflow-hidden bg-white p-8 card-shadow-doodle card-border sm:p-12 rounded-t-2xl">
                <div className="mx-auto max-w-7xl pb-8">
                    <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
                        <div className="max-w-lg">
                            <h2 className="font-heading text-4xl font-bold tracking-tight text-[var(--text-color)] sm:text-5xl">See you there!</h2>
                            <p className="mt-4 text-base leading-7 text-[var(--text-color)]/80">Reach out to <a className="font-semibold text-[var(--primary-accent)] hover:underline" href="mailto:questions@startup54.com">questions@startup54.com</a> if you have any questions.</p>
                        </div>
                        <form className="w-full max-w-md lg:col-start-2 lg:row-start-1" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                <div>
                                    <label className="sr-only" htmlFor="first-name">First Name</label>
                                    <input autoComplete="given-name" className="block w-full rounded-lg card-border px-4 py-3 text-base text-[var(--text-color)] placeholder:text-[var(--text-color)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:ring-offset-2 focus:ring-offset-white card-shadow-doodle" id="first-name" name="first-name" placeholder="First Name" type="text" />
                                </div>
                                <div>
                                    <label className="sr-only" htmlFor="email">Email</label>
                                    <input autoComplete="email" className="block w-full rounded-lg card-border px-4 py-3 text-base text-[var(--text-color)] placeholder:text-[var(--text-color)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:ring-offset-2 focus:ring-offset-white card-shadow-doodle" id="email" name="email" placeholder="Email" type="email" />
                                </div>
                                <div className="sm:col-span-2">
                                    <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[var(--primary-accent)] text-white text-base font-bold leading-normal tracking-wide transition-transform hover:scale-105 card-border card-shadow-doodle" type="submit">
                                        Get updates
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;