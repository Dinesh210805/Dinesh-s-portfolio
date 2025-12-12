import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
          <a href="#" className="text-xl font-display font-bold text-white tracking-tight">
            D<span className="text-accent">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium uppercase tracking-widest text-secondary hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
          
           {/* CTA on Navbar */}
           <a href="#contact" className="hidden md:block text-xs font-bold bg-white text-black px-4 py-2 rounded-full hover:bg-accent transition-colors">
             Let's Talk
           </a>
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
              className="absolute top-8 right-8 text-white p-2 hover:text-accent transition-colors"
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