import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Awards', href: '#achievements' },
  { name: 'Skills', href: '#capabilities' },
  { name: 'Works', href: '#works' },
  { name: 'Certs', href: '#certifications' },
  { name: 'History', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const targetId = href.replace('#', '');
    
    if (href === '#home' || href === '#') {
      window.lenis?.scrollTo(0, { duration: 2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        window.lenis?.scrollTo(element, {
          offset: -20,
          duration: 2,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      }
    }
    
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-6 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none`}
      >
        <div className={`
          pointer-events-auto
          flex items-center justify-between
          px-6 py-3
          rounded-full
          transition-all duration-500 ease-out
          ${isScrolled ? 'w-[90%] md:w-[750px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg' : 'w-[95%] md:w-[1400px] bg-transparent'}
        `}>
          <Magnetic strength={20}>
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, '#home')}
              className="block p-2 text-xl font-display font-bold text-white tracking-tight cursor-none"
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
                  className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary hover:text-white transition-colors cursor-none"
                >
                  {link.name}
                </button>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             {/* CTA on Navbar */}
             <Magnetic strength={40}>
               <button 
                 onClick={(e) => scrollToSection(e, '#contact')}
                 className="hidden md:flex items-center justify-center text-[10px] font-bold bg-white text-black px-5 py-2 rounded-full hover:bg-accent transition-colors uppercase tracking-widest cursor-none"
               >
                 Connect
               </button>
             </Magnetic>

             {/* Mobile Menu Toggle */}
             <button
               className="md:hidden text-white p-2"
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