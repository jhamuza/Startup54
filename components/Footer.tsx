import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-10 sm:py-12">
            <div className="overflow-hidden bg-white p-8 card-shadow-doodle card-border sm:p-12 rounded-2xl">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="max-w-2xl">
                            <h2 className="font-heading text-4xl font-bold tracking-tight text-[var(--text-color)] sm:text-5xl">See you there!</h2>
                            <p className="mt-4 text-base leading-7 text-[var(--text-color)]/80">Reach out to <a className="font-semibold text-[var(--primary-accent)] hover:underline" href="mailto:questions@startup54.com">questions@startup54.com</a> if you have any questions.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Copyright Footer */}
            <div className="mt-12 text-center">
                <p className="text-sm font-bold text-[var(--text-color)] opacity-80 font-heading tracking-wide">
                    All rights reserved by Startup54, 2025
                </p>
            </div>
        </footer>
    );
};

export default Footer;