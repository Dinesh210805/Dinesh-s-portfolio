import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from 'next-themes';

const Cursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  // 'bubble' swaps the arrow for a circular disc centered on the pointer.
  const [variant, setVariant] = useState<'default' | 'bubble'>('default');
  // Theme-aware ink so the arrow stays visible on light surfaces.
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  // Touch devices have no pointer — skip the custom cursor entirely.
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setEnabled(!coarse);
  }, []);

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

      // Check for custom cursor text + optional variant (e.g. "bubble")
      const labelled = target.closest('[data-cursor-text]');
      const text = labelled?.getAttribute('data-cursor-text');
      const mode = labelled?.getAttribute('data-cursor-variant');

      if (text) {
        setIsHovered(true);
        setCursorText(text);
        setVariant(mode === 'bubble' ? 'bubble' : 'default');
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovered(true);
        setCursorText('');
        setVariant('default');
      } else {
        setIsHovered(false);
        setCursorText('');
        setVariant('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

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
          scale: variant === 'bubble' ? 0 : isHovered ? 1.05 : 1,
          opacity: variant === 'bubble' ? 0 : 1,
          rotate: isHovered ? -5 : 0
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative flex items-center justify-center"
      >
        {/* Glass Blur Background (Mathematically mapped Clip-Path for the Arrow) */}
        <div
          className={`absolute inset-0 backdrop-blur-md transition-colors duration-300 ${isLight ? 'bg-black/10' : 'bg-white/10'}`}
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
          className={`relative z-10 ${isLight ? 'drop-shadow-[0_0_2px_rgba(0,0,0,0.35)]' : 'drop-shadow-[0_0_2px_rgba(255,255,255,0.4)]'}`}
        >
          <path
            d="M 0 0 L 15 15 L 6 15 L 0 21 Z"
            fill="url(#glass-gradient)"
            stroke={isLight ? (isHovered ? '#000000' : 'rgba(0,0,0,0.75)') : (isHovered ? '#ffffff' : 'rgba(255,255,255,0.7)')}
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="glass-gradient" x1="0" y1="0" x2="15" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={isLight ? 'black' : 'white'} stopOpacity="0.4" />
              <stop offset="30%" stopColor={isLight ? 'black' : 'white'} stopOpacity="0.0" />
              <stop offset="70%" stopColor={isLight ? 'black' : 'white'} stopOpacity="0.0" />
              <stop offset="100%" stopColor={isLight ? 'black' : 'white'} stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Cursor Text Pill — side label for plain links (not bubble mode) */}
        {cursorText && variant !== 'bubble' && (
          <motion.div
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 15 }}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full whitespace-nowrap drop-shadow-xl"
          >
            <span className="text-white font-tech text-[9px] uppercase font-bold tracking-widest">{cursorText}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Circular "View" bubble — centered on the pointer, follows via the same spring */}
      <AnimatePresence>
        {variant === 'bubble' && (
          <motion.div
            key="cursor-bubble"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute left-0 top-0 grid h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md"
          >
            <span className="font-tech text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              {cursorText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cursor;