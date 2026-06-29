
import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import './types'; // Ensure global types are loaded
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ProfileHeader from './components/ProfileHeader';
import BioStats from './components/BioStats';
import Services from './components/Services';
import Works from './components/Works';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import ChatBot from './components/ChatBot';
import SectionTransition from './components/SectionTransition';
import ScrollToTop from './components/ScrollToTop';
import useDynamicFavicon from './hooks/useDynamicFavicon';

declare global {
  interface Window {
    lenis: Lenis | undefined;
  }
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Set favicon dynamically based on profile image
  useDynamicFavicon();

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      lerp: 0.08, // Increased from 0.04 to make the scroll twice as responsive
      wheelMultiplier: 0.9, // Increased from 0.7 for a more natural scroll distance on desktop
      smoothWheel: true,
      touchMultiplier: 1.5, // Increased from 1.2 to keep touch scroll on mobile snappy and in sync
      infinite: false,
    });

    window.lenis = lenis;

    // Ensure smooth scroll container is positioned
    document.documentElement.style.position = 'relative';

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.lenis = undefined;
    };
  }, [isLoading]);

  return (
    <>
      <div className="bg-noise" />
      <Cursor />
      
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="w-full bg-background selection:bg-accent selection:text-black">
          <Navbar />
          
          <main className="relative z-20 bg-background shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
             <Hero />
             <Marquee />
             <SectionTransition delay={0.1}>
               <ProfileHeader />
             </SectionTransition>
             <SectionTransition delay={0.1}>
               <BioStats />
             </SectionTransition>
             <SectionTransition delay={0.1}>
               <Achievements />
             </SectionTransition>
             <SectionTransition delay={0.1}>
               <Services />
             </SectionTransition>
             <SectionTransition delay={0.1}>
               <Works />
             </SectionTransition>
             <SectionTransition delay={0.1}>
               <Certifications />
             </SectionTransition>
             <SectionTransition delay={0.1}>
               <Experience />
             </SectionTransition>
             <SectionTransition delay={0.1}>
               <Contact />
             </SectionTransition>
          </main>

          <Footer />
          <ChatBot />
          <ScrollToTop />
          <Analytics />
        </div>
      )}
    </>
  );
};

export default App;
