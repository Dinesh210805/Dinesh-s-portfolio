import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';
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
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';

// Extend window interface for Lenis
declare global {
  interface Window {
    lenis: Lenis | undefined;
  }
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Make lenis globally accessible
    window.lenis = lenis;

    // Integrate with Request Animation Frame
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
        <main className="w-full min-h-screen text-primary selection:bg-accent selection:text-black">
          <Navbar />
          
          <div className="relative z-10 bg-background shadow-2xl shadow-black">
             <Hero />
             <Marquee />
             <ProfileHeader />
             <BioStats />
             <Achievements />
             <Services />
             <Works />
             <Certifications />
             <Experience />
          </div>

          <div className="relative z-10 w-full h-[100vh] pointer-events-none" />

          <Footer />
        </main>
      )}
    </>
  );
};

export default App;