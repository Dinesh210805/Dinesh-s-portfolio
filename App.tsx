
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
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import ChatBot from './components/ChatBot';

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
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      lerp: 0.08, // Increased smoothness
    });

    window.lenis = lenis;

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
          
          {/* Main Content: High Z-Index to scroll over footer */}
          <main className="relative z-20 bg-background shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
             <Hero />
             <Marquee />
             <ProfileHeader />
             <BioStats />
             <Achievements />
             <Services />
             <Works />
             <Certifications />
             <Experience />
          </main>

          {/* Footer: Reveal Effect */}
          <Footer />
          <ChatBot />
        </div>
      )}
    </>
  );
};

export default App;
