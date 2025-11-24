import React from 'react';
import Header from './components/Header';
import HeroGrid from './components/HeroGrid';
import PartnersSection from './components/PartnersSection';
import ScheduleSection from './components/ScheduleSection';
import SpeakersSection from './components/SpeakersSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 px-4 sm:px-10 lg:px-20">
          <div className="layout-content-container flex w-full max-w-7xl flex-1 flex-col">
            <Header />
            <main className="flex-1 py-10 @container">
              <HeroGrid />
              <PartnersSection />
              <ScheduleSection />
              <SpeakersSection />
              <FAQSection />
              <CTASection />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;