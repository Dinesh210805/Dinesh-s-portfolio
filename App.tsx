
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
import ScrollTape from './components/ui/scroll-tape';
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
             
             <ScrollTape strips={[{text: "DRIVEN BY CURIOSITY •", direction: "left"}, {text: "THE PHILOSOPHY • THE PHILOSOPHY •", direction: "right"}, {text: "DRIVEN BY CURIOSITY •", direction: "left"}]} fromBg="#ffffff" toBg="#050505" />
             <BioStats />
             
             <ScrollTape strips={[{text: "PROVEN TRACK RECORD •", direction: "right"}, {text: "ACHIEVEMENTS • ACHIEVEMENTS •", direction: "left"}, {text: "PROVEN TRACK RECORD •", direction: "right"}]} fromBg="#050505" toBg="#ffffff" />
             <Achievements />
             
             <ScrollTape strips={[{text: "ENGINEERING INTELLIGENCE •", direction: "left"}, {text: "CAPABILITIES • CAPABILITIES •", direction: "right"}, {text: "ENGINEERING INTELLIGENCE •", direction: "left"}]} fromBg="#ffffff" toBg="#050505" />
             <Services />
             
             <ScrollTape strips={[{text: "BUILDING THE FUTURE •", direction: "right"}, {text: "SELECTED WORKS • SELECTED WORKS •", direction: "left"}, {text: "BUILDING THE FUTURE •", direction: "right"}]} fromBg="#050505" toBg="#ffffff" />
             <Works />
             
             <ScrollTape strips={[{text: "CONTINUOUS LEARNING •", direction: "left"}, {text: "CERTIFICATIONS • CERTIFICATIONS •", direction: "right"}, {text: "CONTINUOUS LEARNING •", direction: "left"}]} fromBg="#ffffff" toBg="#050505" />
             <Certifications />
             
             <ScrollTape strips={[{text: "YEARS OF EXCELLENCE •", direction: "right"}, {text: "EXPERIENCE • EXPERIENCE •", direction: "left"}, {text: "YEARS OF EXCELLENCE •", direction: "right"}]} fromBg="#050505" toBg="#ffffff" />
             <Experience />
             
             <ScrollTape strips={[{text: "LET'S BUILD SOMETHING •", direction: "left"}, {text: "GET IN TOUCH • GET IN TOUCH •", direction: "right"}, {text: "LET'S BUILD SOMETHING •", direction: "left"}]} fromBg="#ffffff" toBg="#050505" />
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
