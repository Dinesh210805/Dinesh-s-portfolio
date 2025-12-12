import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds loading
    const steps = 100;
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    // Wait a bit after 100% to animate out
    const timeout = setTimeout(() => {
      onComplete();
    }, duration + 800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative overflow-hidden">
        <motion.h1 
            className="text-[12vw] md:text-[8vw] font-display font-bold text-[#F4F4F5] leading-none"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
        >
          {count}%
        </motion.h1>
      </div>
      
      <div className="absolute bottom-10 right-10 flex gap-4 text-xs font-mono text-secondary">
          <span>INITIALIZING SYSTEM</span>
          <span className="animate-pulse">_</span>
      </div>
    </motion.div>
  );
};

export default Preloader;