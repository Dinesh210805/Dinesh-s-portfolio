import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // We want the cursor to feel highly responsive and native since it's an arrow
  const springConfig = { damping: 100, stiffness: 2000, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // No offset needed: the tip of the arrow is exactly at 0,0
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for custom cursor text
      const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      
      if (text) {
        setIsHovered(true);
        setCursorText(text);
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? -5 : 0
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative flex items-center justify-center"
      >
        {/* Glass Blur Background (Mathematically mapped Clip-Path for the Arrow) */}
        <div 
          className="absolute inset-0 bg-white/10 backdrop-blur-md transition-colors duration-300"
          style={{ 
            clipPath: 'polygon(0% 0%, 100% 71.4%, 40% 71.4%, 0% 100%)',
            WebkitClipPath: 'polygon(0% 0%, 100% 71.4%, 40% 71.4%, 0% 100%)',
            transformOrigin: 'top left'
          }}
        />

        {/* SVG Border and Gloss Gradient for the sharp glass edge */}
        <svg 
          width="20" 
          height="28" 
          viewBox="0 0 15 21" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_0_2px_rgba(255,255,255,0.4)]"
        >
          <path 
            d="M 0 0 L 15 15 L 6 15 L 0 21 Z"
            fill="url(#glass-gradient)"
            stroke={isHovered ? "#ccff00" : "rgba(255,255,255,0.7)"}
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="glass-gradient" x1="0" y1="0" x2="15" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="30%" stopColor="white" stopOpacity="0.0" />
              <stop offset="70%" stopColor="white" stopOpacity="0.0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Cursor Text Pill (replaces the expanding circle text) */}
        {cursorText && (
          <motion.div 
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 15 }}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full whitespace-nowrap drop-shadow-xl"
          >
            <span className="text-white font-tech text-[9px] uppercase font-bold tracking-widest">{cursorText}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cursor;