import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
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
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center bg-accent rounded-full pointer-events-none z-[10000] mix-blend-difference overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovered ? (cursorText ? 80 : 32) : 16, // Expand more if there is text
          height: isHovered ? (cursorText ? 80 : 32) : 16,
        }}
      >
        <motion.span 
          className="text-black font-bold text-[10px] uppercase text-center leading-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: cursorText ? 1 : 0 }}
        >
          {cursorText}
        </motion.span>
      </motion.div>
      
      {/* Trailing Ring */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9999]"
        style={{
             x: cursorX,
             y: cursorY,
             translateX: -8, 
             translateY: -8,
             opacity: isHovered ? 0 : 1 // Hide ring when hovering to focus on the dot
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />
    </>
  );
};

export default Cursor;