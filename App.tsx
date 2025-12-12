import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import BioStats from './components/BioStats';
import Services from './components/Services';
import Works from './components/Works';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Integrate with Request Animation Frame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept all anchor clicks to use Lenis smooth scroll instead of native jump
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        // Only handle internal links
        if (href?.startsWith('#')) {
          e.preventDefault();
          
          if (href === '#home' || href === '#') {
            lenis.scrollTo(0, { duration: 1.5 });
          } else {
            const element = document.querySelector(href);
            if (element) {
              lenis.scrollTo(element as HTMLElement, {
                offset: 0,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              });
            }
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
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
          
          {/* 
            Content Wrapper: 
            z-10 and bg-background ensure this sits ON TOP of the footer.
            Shadow adds depth when revealing the footer.
          */}
          <div className="relative z-10 bg-background shadow-2xl shadow-black">
             <Hero />
             <Marquee />
             <BioStats />
             <Services />
             <Works />
             <Experience />
          </div>

          {/* 
             Transparent Spacer:
             This allows the page to scroll past the content wrapper, 
             revealing the fixed footer (z-0) underneath through the transparency.
          */}
          <div className="relative z-10 w-full h-[100vh] pointer-events-none" />

          {/* Footer sits fixed at the bottom with z-0 */}
          <Footer />
        </main>
      )}
    </>
  );
};

export default App;