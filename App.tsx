import React from 'react';
import Header from './components/Header';
import HeroGrid from './components/HeroGrid';
import PartnersSection from './components/PartnersSection';
import ScheduleSection from './components/ScheduleSection';
import SpeakersSection from './components/SpeakersSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ScrollBackground from './components/ScrollBackground';

const App: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <ScrollBackground />
      <Header />
      <div className="layout-container flex h-full grow flex-col relative z-10 pointer-events-none">
        <div className="flex flex-1 justify-center px-4 sm:px-10 lg:px-20 pointer-events-auto">
          <div className="layout-content-container flex w-full max-w-7xl flex-1 flex-col">
            <main className="flex-1 pt-28 @container">
              <HeroGrid />
              <PartnersSection />
              <ScheduleSection />
              <SpeakersSection />
              <FAQSection />
              <CTASection />
              <Footer />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;