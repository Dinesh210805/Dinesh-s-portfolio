import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'none';
  distance?: number;
  blur?: boolean;
  className?: string;
  delay?: number; // Used to stagger scroll-linked elements (shifts the scroll offset)
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  distance = 30,
  blur = true,
  className = '',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Translate delay (e.g., 0.1, 0.2) into a tight viewport offset shift near the bottom
  // delay=0:   starts at 100% (bottom edge), ends at 92% (8% into viewport)
  // delay=0.2: starts at 96% (4% into viewport), ends at 88% (12% into viewport)
  const startPercent = 100 - (delay * 20);
  const endPercent = 92 - (delay * 20);

  // Track the scroll progress of this element relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startPercent}%`, `start ${endPercent}%`],
  });

  // Apply a spring to the scroll progress to create a buttery-smooth, high-end momentum feel
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 250,
    mass: 0.15,
  });

  // Map progress (0 to 1) directly to opacity, translation, and blur
  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  
  const y = useTransform(
    smoothProgress,
    [0, 1],
    [direction === 'up' ? distance : 0, 0]
  );

  const blurAmount = useTransform(smoothProgress, [0, 1], [12, 0]);
  const filter = useTransform(blurAmount, (val) => blur ? `blur(${val}px)` : 'none');

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        y,
        filter,
        willChange: 'transform, opacity, filter',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
