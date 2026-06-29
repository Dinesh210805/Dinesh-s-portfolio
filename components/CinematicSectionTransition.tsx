import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export interface CinematicTransitionProps {
  heading: string;
  hookLine: string;
  mode: 'light-to-dark' | 'dark-to-light';
}

const CinematicSectionTransition: React.FC<CinematicTransitionProps> = ({ heading, hookLine, mode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track when this specific spacer is in view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Only render the fixed overlay when it's actively being scrolled through
    if (latest > 0 && latest < 1) {
      if (!isActive) setIsActive(true);
    } else {
      if (isActive) setIsActive(false);
    }
  });

  // Background and Text colors based on mode
  const bgStart = mode === 'light-to-dark' ? '#ffffff' : '#050505';
  const bgEnd = mode === 'light-to-dark' ? '#050505' : '#ffffff';
  
  const textStart = mode === 'light-to-dark' ? '#000000' : '#ffffff';
  const textEnd = mode === 'light-to-dark' ? '#ffffff' : '#000000';

  const backgroundColor = useTransform(
    scrollYProgress, 
    [0.3, 0.7], 
    [bgStart, bgEnd]
  );
  
  const textColor = useTransform(
    scrollYProgress, 
    [0.3, 0.7], 
    [textStart, textEnd]
  );

  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.9, 1], 
    [0, 1, 1, 0]
  );

  // Heading moves in, stops at center, then moves out
  const headingX = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.65, 0.9],
    ["100vw", "0vw", "0vw", "-100vw"]
  );

  // Hook line moves continuously
  const hookX = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    ["100vw", "-100vw"]
  );

  return (
    <>
      {/* Tall spacer to create scroll room */}
      <div ref={containerRef} className="w-full h-[200vh] md:h-[250vh] relative z-10" />

      {/* Fixed Overlay */}
      {isActive && (
        <motion.div
          style={{
            backgroundColor,
            opacity,
            color: textColor
          }}
          className="fixed inset-0 z-[9998] pointer-events-none flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="w-full flex flex-col gap-4 md:gap-8 items-center">
            <motion.h2 
              style={{ x: headingX }}
              className="text-5xl md:text-8xl lg:text-[120px] font-display font-black tracking-tighter uppercase whitespace-nowrap will-change-transform"
            >
              {heading}
            </motion.h2>
            
            <motion.p 
              style={{ x: hookX }}
              className="text-xl md:text-4xl lg:text-5xl font-mono tracking-widest uppercase whitespace-nowrap opacity-60 will-change-transform"
            >
              {hookLine}
            </motion.p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CinematicSectionTransition;
