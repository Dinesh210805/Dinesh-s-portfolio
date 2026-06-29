import React from 'react';
import ScrollTape from './ui/scroll-tape';

/* ─────────────────────────────────────────────────────────────
 * Marquee — Cinematic transition between Hero (dark) and About (white).
 *
 * Implements the "Heading + Hook Line" Scroll Lock:
 *   - Line 1 (Heading): "DINESH KUMAR" (Hollow Outline). Enters,
 *     locks at center, and exits when the hook line ends.
 *   - Line 2 (Hook Line): "IDENTITY ARCHITECT • COGNITIVE SOLUTIONS"
 *     (Solid Tape). Slides continuously across the viewport.
 * ───────────────────────────────────────────────────────────── */

const Marquee: React.FC = () => {
  return (
    <ScrollTape
      strips={[
        { text: 'DINESH KUMAR • DINESH KUMAR • DINESH KUMAR •', direction: 'left' },
        { text: 'IDENTITY ARCHITECT • COGNITIVE SOLUTIONS • BRIDGING AI & SYSTEMS •', direction: 'right' },
      ]}
      fromBg="#050505"
      toBg="#ffffff"
    />
  );
};

export default Marquee;
