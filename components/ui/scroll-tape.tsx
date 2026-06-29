import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
 * TapeStrip — A single horizontal row of repeating text.
 * ───────────────────────────────────────────────────────────── */

interface TapeStripProps {
  children: string;
  x: MotionValue<string>;
  opacity: MotionValue<number>;
  isSolid: boolean;
  bgColor: MotionValue<string>;
  textColor: MotionValue<string>;
  strokeColor: MotionValue<string>;
  zIndex: number;
}

const TapeStrip: React.FC<TapeStripProps> = ({
  children,
  x,
  opacity,
  isSolid,
  bgColor,
  textColor,
  strokeColor,
  zIndex,
}) => {
  return (
    <motion.div
      className={`w-full overflow-hidden flex items-center select-none will-change-transform ${
        isSolid ? 'py-5 md:py-8 shadow-[0_15px_45px_rgba(0,0,0,0.5)]' : 'py-3'
      }`}
      style={{ 
        opacity, 
        backgroundColor: isSolid ? bgColor : 'transparent',
        borderTop: isSolid ? 'none' : '1px solid transparent', 
        borderBottom: isSolid ? 'none' : '1px solid transparent',
        zIndex,
        transformOrigin: 'center center'
      }}
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform w-full"
        style={{ x }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase mx-6 md:mx-10 tracking-tight ${
              isSolid ? '' : 'text-transparent'
            }`}
            style={{
              color: isSolid ? textColor : 'transparent',
              WebkitTextStroke: isSolid ? 'none' : '1.2px',
              WebkitTextStrokeColor: isSolid ? 'none' : strokeColor,
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
 *
 * Implements the "Heading + Hook Line" Scroll Lock:
 *   - Line 1 (Heading): Slides in, locks static at center, exits
 *     when the hook line is about to end.
 *   - Line 2 (Hook Line): Slides continuously across the viewport.
 * ───────────────────────────────────────────────────────────── */

interface StripConfig {
  text: string;
  direction: 'left' | 'right';
}

interface ScrollTapeProps {
  strips: StripConfig[];
  fromBg?: string;
  toBg?: string;
}

const ScrollTape: React.FC<ScrollTapeProps> = ({
  strips,
  fromBg = '#050505',
  toBg = '#ffffff',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth, organic spring physics
  const progress = useSpring(scrollYProgress, {
    damping: 55,
    stiffness: 300,
    mass: 0.12,
  });

  // ── Background (shared by spacer + overlay) ──
  const backgroundColor = useTransform(
    progress, [0.25, 0.65], [fromBg, toBg]
  );

  // ── Colors for Solid Middle Tape (Neon Green ➔ Black) ──
  const solidBg = useTransform(progress, [0.28, 0.62], ["#CCFF00", "#111111"]);
  const solidText = useTransform(progress, [0.28, 0.62], ["#000000", "#ffffff"]);

  // ── Colors for Hollow Stroke Text (Neon Green ➔ Black) ──
  const strokeColor = useTransform(progress, [0.28, 0.62], ["#CCFF00", "#111111"]);

  // ── Overlay overall opacity ──
  const overlayOpacity = useTransform(
    progress,
    [0.15, 0.25, 0.75, 0.85],
    [0,    1,    1,    0   ]
  );

  // ── Staggered Opacity for the two lines ──
  const opacity1 = useTransform(progress, [0.18, 0.26, 0.72, 0.80], [0, 1, 1, 0]);
  const opacity2 = useTransform(progress, [0.22, 0.30, 0.68, 0.76], [0, 1, 1, 0]);

  // ── Horizontal Translation Mapping ──
  // Line 1 (Heading): Enters to center (0%), locks, then exits
  const x1 = useTransform(
    progress,
    [0.20, 0.35, 0.65, 0.80],
    ["30%", "0%", "0%", "-30%"]
  );

  // Line 2 (Hook Line): Scrolls continuously without stopping
  const x2 = useTransform(
    progress,
    [0.20, 0.80],
    ["-45%", "35%"]
  );

  return (
    <>
      {/* ── SPACER ── */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-[320vh]"
        style={{ backgroundColor }}
      />

      {/* ── FIXED OVERLAY ── */}
      <motion.div
        className="fixed inset-0 flex flex-col justify-center gap-10 sm:gap-16 md:gap-24 overflow-hidden pointer-events-none"
        style={{
          backgroundColor,
          opacity: overlayOpacity,
          zIndex: 9998,
        }}
      >
        {strips.map((strip, i) => {
          const isSolid = i === 1; // Middle line (index 1) is solid
          const animX = i === 0 ? x1 : x2;
          const animOpacity = i === 0 ? opacity1 : opacity2;
          
          return (
            <TapeStrip
              key={i}
              x={animX}
              opacity={animOpacity}
              isSolid={isSolid}
              bgColor={solidBg}
              textColor={solidText}
              strokeColor={strokeColor}
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
