import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
 * TapeStrip — A single horizontal text row.
 * ───────────────────────────────────────────────────────────── */

interface TapeStripProps {
  children: string;
  x: MotionValue<string>;
  opacity: MotionValue<number>;
  isSolid: boolean;
  zIndex: number;
}

const TapeStrip: React.FC<TapeStripProps> = ({
  children,
  x,
  opacity,
  isSolid,
  zIndex,
}) => {
  return (
    <motion.div
      className={`w-full overflow-hidden flex items-center select-none will-change-transform transition-colors duration-500 ${
        isSolid 
          ? 'py-4 sm:py-5 md:py-7 shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_rgba(255,255,255,0.05)] bg-black dark:bg-white' 
          : 'py-2 md:py-3 bg-transparent border-y border-transparent'
      }`}
      style={{ 
        opacity,
        zIndex,
        transformOrigin: 'center center'
      }}
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform w-full"
        style={{ x }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className={`text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase mx-4 sm:mx-6 md:mx-10 tracking-tight transition-colors duration-500 ${
              isSolid 
                ? 'text-white dark:text-black' 
                : 'text-black dark:text-white'
            }`}
            style={{
              WebkitTextFillColor: isSolid ? 'currentColor' : 'transparent',
              WebkitTextStroke: isSolid ? 'none' : '1.2px currentColor',
            }}
          >
            {children}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
 * ScrollTape — Reusable cinematic section-transition component.
 * ───────────────────────────────────────────────────────────── */

interface StripConfig {
  text: string;
  direction: 'left' | 'right';
}

interface ScrollTapeProps {
  strips: StripConfig[];
}

const ScrollTape: React.FC<ScrollTapeProps> = ({
  strips,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth, organic spring physics (softened for a calmer, less "slideshow" feel)
  const progress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 190,
    mass: 0.25,
  });

  // ── Overlay overall opacity ──
  const overlayOpacity = useTransform(
    progress,
    [0.12, 0.24, 0.78, 0.9],
    [0,    1,    1,    0  ]
  );

  // Create individual staggered motion values for each strip
  const stripAnimations = strips.map((strip, i) => {
    // Stagger factor
    const stagger = i * 0.03;

    // Entry and exit boundaries
    const entryStart = 0.18 + stagger;
    const exitEnd = 0.82 - stagger;

    // 1. Horizontal Translation (Wider sweep range for full text scroll)
    const xStart = strip.direction === 'left' ? '15%' : '-50%';
    const xEnd = strip.direction === 'left' ? '-50%' : '15%';
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const x = useTransform(progress, [0, 1], [xStart, xEnd]);

    // 2. Opacity (Fades in, stays visible, fades out during exit)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const opacity = useTransform(
      progress,
      [entryStart, entryStart + 0.08, exitEnd - 0.08, exitEnd],
      [0, 1, 1, 0]
    );

    return { x, opacity };
  });

  return (
    <>
      {/* ── SPACER ── */}
      <div
        ref={containerRef}
        className="relative w-full h-[150vh] md:h-[250vh] lg:h-[320vh] bg-bone dark:bg-[#050505] transition-colors duration-500 text-black/20 dark:text-white/20"
      />

      {/* ── FIXED OVERLAY ── */}
      <motion.div
        className="fixed inset-0 flex flex-col justify-center gap-10 sm:gap-16 md:gap-24 overflow-hidden pointer-events-none"
        style={{
          opacity: overlayOpacity,
          zIndex: 9998,
        }}
      >
        {strips.map((strip, i) => {
          const isSolid = i === 1; // Only the middle line (index 1) is a solid tape
          const anim = stripAnimations[i];
          return (
            <TapeStrip
              key={i}
              x={anim.x}
              opacity={anim.opacity}
              isSolid={isSolid}
              zIndex={10 + i}
            >
              {strip.text}
            </TapeStrip>
          );
        })}
      </motion.div>
    </>
  );
};

export default ScrollTape;
