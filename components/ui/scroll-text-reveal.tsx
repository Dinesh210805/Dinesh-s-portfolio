import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
 * ScrollTextReveal — reading-style reveal.
 * Words start dim (low opacity of the current text colour, so they
 * read as grey) and resolve one-by-one as scroll progresses.
 * Animates opacity only → theme-agnostic (inherits text colour).
 *
 * Driver:
 *   - default: self-tracks its own position with `offset`.
 *   - pinned : pass an external `progress` MotionValue (e.g. from a
 *     sticky section) and a `range` window; the reveal maps across
 *     that slice, leaving the rest of progress as "hold" time.
 * ───────────────────────────────────────────────────────────── */

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  baseOpacity: number;
}

const Word: React.FC<WordProps> = ({ children, progress, range, baseOpacity }) => {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  );
};

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  baseOpacity?: number;
  /** External progress driver (for sticky/pinned sections). */
  progress?: MotionValue<number>;
  /** Slice of the driver's [0,1] used for the reveal. */
  range?: [number, number];
  /** Self-tracking offset (ignored when `progress` is supplied). */
  offset?: [string, string];
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  text,
  className = '',
  baseOpacity = 0.12,
  progress,
  range = [0, 1],
  offset = ['start 0.85', 'end 0.5'],
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const self = useScroll({
    target: ref,
    offset: offset as unknown as any,
  });
  const driver = progress ?? self.scrollYProgress;

  const words = text.split(' ');
  const total = words.length;
  const [rangeStart, rangeEnd] = range;
  const span = rangeEnd - rangeStart;

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = rangeStart + (i / total) * span;
        const end = rangeStart + ((i + 1) / total) * span;
        return (
          <Word key={i} progress={driver} range={[start, end]} baseOpacity={baseOpacity}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default ScrollTextReveal;
