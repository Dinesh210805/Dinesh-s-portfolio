
import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';
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

declare global {
  interface Window {
    lenis: Lenis | undefined;
  }
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.05,
      syncTouch: true,
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
             <SectionTransition>
               <Hero />
             </SectionTransition>
             <SectionTransition delay={0.1}>
               <Marquee />
             </SectionTransition>
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
        </div>
      )}
    </>
  );
};

export default App;
