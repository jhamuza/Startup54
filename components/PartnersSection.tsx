import React from 'react';

const PartnersSection: React.FC = () => {
    return (
        <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                 <div className="mx-auto max-w-2xl text-center mb-10">
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text-color)] sm:text-4xl">
                        Organized & Supported By
                    </h2>
                </div>
                <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {/* Partner 1: UiTM */}
                    <div className="flex justify-center group">
                        <img
                            className="max-h-24 w-full object-contain grayscale opacity-60 transition-all duration-300 ease-in-out group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100"
                            src="https://korporat.uitm.edu.my/images/download/2019/LogoUiTM.png"
                            alt="Universiti Teknologi MARA"
                        />
                    </div>
                     {/* Partner 2: SDGA */}
                    <div className="flex justify-center group">
                        <img
                            className="max-h-24 w-full object-contain grayscale opacity-60 transition-all duration-300 ease-in-out group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100"
                            src="https://www.sarawakdga.org.my/wp-content/uploads/2020/08/a1.png"
                            alt="Sarawak Dayak Graduates Association"
                        />
                    </div>
                     {/* Partner 3: Google Cloud */}
                    <div className="flex justify-center group">
                        <img
                            className="max-h-20 w-full object-contain grayscale opacity-60 transition-all duration-300 ease-in-out group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/1024px-Google_Cloud_logo.svg.png"
                            alt="Google Cloud"
                        />
                    </div>
                     {/* Partner 4: GrowthCharger */}
                    <div className="flex justify-center group">
                        <img
                            className="max-h-24 w-full object-contain grayscale opacity-60 transition-all duration-300 ease-in-out group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100"
                            src="https://static1.squarespace.com/static/63cfd3e1ae2e8d6c07087e13/t/63cff257bc1f0240b2add8a6/1760417928198/"
                            alt="GrowthCharger"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;