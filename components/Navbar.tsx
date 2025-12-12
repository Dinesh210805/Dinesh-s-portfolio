import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Works', href: '#works' },
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
          transition-all duration-300
          ${isScrolled ? 'w-[90%] md:w-[600px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg' : 'w-[95%] md:w-[1400px] bg-transparent'}
        `}>
          <Magnetic strength={20}>
            <a href="#" className="block p-2 text-xl font-display font-bold text-white tracking-tight">
              D<span className="text-accent">.</span>
            </a>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Magnetic key={link.name} strength={15}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-xs font-medium uppercase tracking-widest text-secondary hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             {/* CTA on Navbar */}
             <Magnetic strength={40}>
               <a href="#contact" className="hidden md:flex items-center justify-center text-xs font-bold bg-white text-black px-6 py-3 rounded-full hover:bg-accent transition-colors">
                 Let's Talk
               </a>
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
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-5xl font-display font-bold text-white hover:text-transparent hover:stroke-text transition-all duration-300"
                  style={{ WebkitTextStroke: '1px #CCFF00' }}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="absolute bottom-10 flex gap-6 text-secondary">
              <span className="font-mono text-xs">Based in New York</span>
              <span className="font-mono text-xs">Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;