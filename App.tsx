
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
import CinematicSectionTransition from './components/CinematicSectionTransition';
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
      lerp: 0.04, // Lower lerp for a heavier, high-inertia scroll
      wheelMultiplier: 0.7, // Lower multiplier so each scroll tick covers less ground, slowing it down
      smoothWheel: true,
      touchMultiplier: 1.2,
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
             <ProfileHeader />
             
             <CinematicSectionTransition heading="THE PHILOSOPHY" hookLine="DRIVEN BY CURIOSITY" mode="light-to-dark" />
             <BioStats />
             
             <CinematicSectionTransition heading="ACHIEVEMENTS" hookLine="PROVEN TRACK RECORD" mode="dark-to-light" />
             <Achievements />
             
             <CinematicSectionTransition heading="CAPABILITIES" hookLine="ENGINEERING INTELLIGENCE" mode="light-to-dark" />
             <Services />
             
             <CinematicSectionTransition heading="SELECTED WORKS" hookLine="BUILDING THE FUTURE" mode="dark-to-light" />
             <Works />
             
             <CinematicSectionTransition heading="CERTIFICATIONS" hookLine="CONTINUOUS LEARNING" mode="light-to-dark" />
             <Certifications />
             
             <CinematicSectionTransition heading="EXPERIENCE" hookLine="YEARS OF EXCELLENCE" mode="dark-to-light" />
             <Experience />
             
             <CinematicSectionTransition heading="GET IN TOUCH" hookLine="LET'S BUILD SOMETHING" mode="light-to-dark" />
             <Contact />
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
