import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 6000; // 6 seconds loading for relaxed, smooth storytelling
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

  const getStoryText = () => {
    if (count < 30) return "Dinesh Kumar C.";
    if (count < 65) return "Generative AI Engineer.";
    return "Building agents that can perceive, think, and act.";
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ 
        clipPath: 'inset(0% 0% 100% 0%)', 
        transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <DottedSurface className="size-full absolute inset-0 opacity-70" />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-10 left-1/2 h-full w-full -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_50%)]',
            'blur-[80px]',
          )}
        />
        
        <div className="relative flex flex-col items-center justify-center z-10 mix-blend-difference w-full px-4">
          <div className="h-[12vw] md:h-[6vw] flex items-center justify-center relative w-full mb-8">
            <AnimatePresence mode="wait">
              <motion.h1 
                key={getStoryText()}
                className="absolute text-center text-[6vw] md:text-[3vw] font-sans font-medium text-white tracking-tight leading-none"
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {getStoryText()}
              </motion.h1>
            </AnimatePresence>
          </div>
          
          <motion.div 
            className="overflow-hidden h-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <div className="flex items-center justify-center gap-6 text-[10px] md:text-xs font-mono text-white/50 tracking-[0.2em] uppercase">
              <span className="min-w-[30px] text-right">{count}%</span>
              <span className="w-12 h-[1px] bg-white/20"></span>
              <span>Loading Experience</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 flex gap-4 text-[10px] md:text-xs font-mono text-white/30 tracking-[0.2em] uppercase mix-blend-difference">
          <span>System Initializing</span>
          <span className="animate-pulse">_</span>
      </div>
    </motion.div>
  );
};

export default Preloader;