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
        isSolid ? 'py-4 sm:py-5 md:py-7 shadow-[0_12px_40px_rgba(0,0,0,0.4)]' : 'py-2 md:py-3'
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
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className={`text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase mx-4 sm:mx-6 md:mx-10 tracking-tight ${
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

  // ── Dynamic Color Logic ──
  const isLightToDark = fromBg === '#ffffff';
  
  const tapeBgStart = isLightToDark ? "#111111" : "#CCFF00";
  const tapeBgEnd = isLightToDark ? "#CCFF00" : "#111111";
  
  const tapeTextStart = isLightToDark ? "#ffffff" : "#000000";
  const tapeTextEnd = isLightToDark ? "#000000" : "#ffffff";

  // ── Colors for Solid Middle Tape ──
  const solidBg = useTransform(progress, [0.25, 0.65], [tapeBgStart, tapeBgEnd]);
  const solidText = useTransform(progress, [0.25, 0.65], [tapeTextStart, tapeTextEnd]);

  // ── Colors for Hollow Stroke Text ──
  const strokeColor = useTransform(progress, [0.25, 0.65], [tapeBgStart, tapeBgEnd]);

  // ── Overlay overall opacity ──
  const overlayOpacity = useTransform(
    progress,
    [0.15, 0.25, 0.75, 0.85],
    [0,    1,    1,    0   ]
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
      <motion.div
        ref={containerRef}
        className="relative w-full h-[150vh] md:h-[250vh] lg:h-[320vh]"
        style={{ backgroundColor }}
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
