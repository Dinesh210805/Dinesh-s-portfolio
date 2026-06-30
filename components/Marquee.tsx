import React from 'react';
import ScrollTape from './ui/scroll-tape';

/* ─────────────────────────────────────────────────────────────
 * Marquee — Cinematic transition between Hero (dark) and About (white).
 *
 * Three horizontal warning/duct-tape strips slide across the screen
 * as you scroll. Background morphs from black → white.
 *
 * Visual styles:
 *   - Strip 1: Neon Green background with black text (rotates -1.5deg)
 *   - Strip 2: Dark Gray background with white text (rotates 1.2deg)
 *   - Strip 3: Neon Green background with black text (rotates -0.8deg)
 * 
 * As you scroll, the tape colors invert contrastingly.
 * ───────────────────────────────────────────────────────────── */

const Marquee: React.FC = () => {
  return (
    <ScrollTape
      strips={[
        { text: 'GENERATIVE AI • MACHINE LEARNING •', direction: 'left' },
        { text: 'BUILT TO HOLD UP • BUILT TO HOLD UP •', direction: 'right' },
        { text: 'FROM FIRST IDEA TO REAL USE •', direction: 'left' },
      ]}
    />
  );
};

export default Marquee;
