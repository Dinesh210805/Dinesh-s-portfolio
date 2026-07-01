
import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import './types'; // Ensure global types are loaded
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroPortraitTravel from './components/HeroPortraitTravel';
import AlignGuides from './components/AlignGuides';
import Marquee from './components/Marquee';
import ProfileHeader from './components/ProfileHeader';
import Services from './components/Services';
import Skills from './components/Skills';
import Works from './components/Works';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ThemeToggle from './components/ThemeToggle';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import AllWorks from './components/AllWorks';
import ProjectPage from './components/ProjectPage';
import useDynamicFavicon from './hooks/useDynamicFavicon';
import { useHashRoute } from './hooks/useHashRoute';
import { consumePendingSection, navState } from './lib/navigation';

declare global {
  interface Window {
    lenis: Lenis | undefined;
  }
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const route = useHashRoute();
  const routeKey = route.name + (route.name === 'project' ? `:${route.slug}` : '');

  // Set favicon dynamically based on profile image
  useDynamicFavicon();

  // On route change: reset scroll, then honor any pending in-page target.
  useEffect(() => {
    requestAnimationFrame(() => {
      if (window.lenis) {
        window.lenis.resize();
        window.lenis.scrollTo(0, { immediate: true, force: true } as any);
      }
      window.scrollTo(0, 0);
      if (route.name === 'home') consumePendingSection();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      lerp: 0.1, // Default responsive lerp
      smoothWheel: true,
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
        <div className="w-full bg-bone dark:bg-background selection:bg-accent selection:text-black">
          <Navbar />
          <ThemeToggle />
          <AlignGuides />

          {route.name === 'home' && (
            <main className="relative z-20 bg-bone dark:bg-background shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
              <Hero />
              <HeroPortraitTravel />
              {/* <Marquee /> */}
              <ProfileHeader />
              <Works />
              <Achievements />
              <Skills />
              <Services />
              <Experience />
              <Certifications />
              <Contact />
            </main>
          )}

          {route.name === 'all' && <AllWorks />}
          {route.name === 'project' && <ProjectPage slug={route.slug} />}

          <Footer />
          <ScrollToTop />
          <Analytics />
        </div>
      )}
    </>
  );
};

export default App;
