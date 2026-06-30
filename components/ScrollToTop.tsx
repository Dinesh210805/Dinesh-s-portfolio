import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      // Use Lenis smooth scroll if available
      window.lenis.scrollTo(0, { duration: 2 });
    } else {
      // Fallback to native smooth scroll
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 group pointer-events-auto hidden md:block"
          aria-label="Scroll to top"
        >
          <div className="relative">
            {/* Main Button */}
            <div className="w-12 h-12 bg-accent text-black flex items-center justify-center border border-accent/50 hover:bg-accent/90 transition-all duration-300 group-hover:scale-110">
              <ArrowUp size={20} className="group-hover:translate-y-[-2px] transition-transform" />
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-accent/40" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-accent/40" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-accent/40" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-accent/40" />
          </div>

          {/* Tooltip */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 font-mono text-[9px] text-white/60 uppercase tracking-[0.3em] whitespace-nowrap pointer-events-none"
          >
            Back_to_Top
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
