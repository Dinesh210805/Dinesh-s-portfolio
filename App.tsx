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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="bg-noise" />
      <Cursor />
      
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <main className="w-full min-h-screen bg-background text-primary selection:bg-accent selection:text-black">
          <Navbar />
          
          <div className="relative z-10 shadow-2xl shadow-black">
             <Hero />
             <Marquee />
             
             {/* Main Content Area */}
             <div className="relative bg-background pb-20">
               <BioStats />
               <Services />
               <Works />
               <Experience />
               
               {/* Spacer for Parallax Footer */}
               <div className="w-full h-[100vh] pointer-events-none" />
             </div>
          </div>

          <Footer />
        </main>
      )}
    </>
  );
};

export default App;