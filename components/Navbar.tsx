import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Magnetic from './Magnetic';
import { goToSection } from '../lib/navigation';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Skills', href: '#skills' },
  { name: 'Works', href: '#works' },
  { name: 'Awards', href: '#achievements' },
  { name: 'Certs', href: '#certifications' },
  { name: 'History', href: '#experience' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsPastHero(window.scrollY > window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Cross-page aware: scrolls on home, or routes home first from a sub-page.
    goToSection(href === '#' ? 'home' : href.replace('#', ''));

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Determine navbar styling based on position and theme
  // Over Hero: Always dark styling (white text)
  // Past Hero: Inherit global theme
  const getNavContainerClasses = () => {
    if (!isScrolled) return 'w-[95%] md:w-[1400px] bg-transparent';
    // Scrolled: hug content (md:w-auto) so links + Connect never overflow the pill.
    if (!isPastHero) return 'w-[90%] md:w-auto max-w-[95%] bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg';
    // Past Hero, adapt to theme using Tailwind classes
    return 'w-[90%] md:w-auto max-w-[95%] bg-white/70 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-sm dark:shadow-lg';
  };

  const getTextColor = () => {
    if (!isPastHero) return 'text-white';
    return 'text-black dark:text-white';
  };

  const getMutedTextColor = () => {
    if (!isPastHero) return 'text-white/70 hover:text-white';
    return 'text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white';
  };

  const getCtaClasses = () => {
    if (!isPastHero) return 'bg-white text-black hover:bg-accent';
    return 'bg-black text-white hover:bg-accent hover:text-black dark:bg-white dark:text-black dark:hover:bg-accent';
  };

  return (
    <>
      <header
        className={`fixed top-6 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none`}
      >
        <div className={`
          pointer-events-auto
          flex items-center justify-between gap-4 md:gap-8
          px-6 py-3
          rounded-full
          transition-all duration-500 ease-out
          ${getNavContainerClasses()}
        `}>
          <Magnetic strength={20}>
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, '#home')}
              className={`block p-2 text-xl font-display font-bold tracking-tight cursor-none transition-colors duration-300 ${getTextColor()}`}
            >
              D<span className="text-accent">.</span>
            </a>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Magnetic key={link.name} strength={15}>
                <button
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 cursor-none ${getMutedTextColor()}`}
                >
                  {link.name}
                </button>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
             {/* Theme Toggle */}
             {mounted && (
               <button
                 onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                 className={`p-2 rounded-full transition-colors duration-300 ${getTextColor()} hover:text-accent`}
                 aria-label="Toggle Theme"
               >
                 {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
               </button>
             )}

             {/* CTA on Navbar */}
             <Magnetic strength={40}>
               <button 
                 onClick={(e) => scrollToSection(e, '#contact')}
                 className={`hidden md:flex items-center justify-center text-[10px] font-bold px-5 py-2 rounded-full transition-colors duration-300 uppercase tracking-widest cursor-none ${getCtaClasses()}`}
               >
                 Connect
               </button>
             </Magnetic>

             {/* Mobile Menu Toggle */}
             <button
               className={`md:hidden p-2 transition-colors duration-300 ${getTextColor()}`}
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={20} />
             </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white p-4 hover:text-accent transition-colors"
            >
              <X size={32} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-4xl font-display font-bold text-white hover:text-transparent hover:stroke-text transition-all duration-300 uppercase tracking-tighter"
                  style={{ WebkitTextStroke: '1px #CCFF00' }}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            <div className="absolute bottom-10 flex flex-col items-center gap-4 text-secondary">
              <span className="font-mono text-xs uppercase tracking-[0.4em]">PUDUCHERRY, INDIA</span>
              <span className="font-mono text-[10px] text-accent animate-pulse uppercase tracking-widest">System_Live</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;