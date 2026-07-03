import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { PROFILE_IMAGE, PROFILE_NAME } from '../constants/profile';
import { ageLabel } from '../lib/age';

/* Editorial hero, sized to fit within a single viewport (desktop).
 * - Name rises up letter-by-letter from a mask and NEVER wraps; circled-C
 *   monogram = surname "C".
 * - Name (top-left) and portrait (top-right) share the same top line; the whole
 *   pair is pushed toward the bottom via `content-end` so the photo's bottom gap
 *   equals its right gap (both = the section's px/pb margin).
 * - The portrait is sized by HEIGHT (`h-[56vh] w-auto aspect-[4/5]`) so it stays
 *   a strict 4:5 on every viewport — this keeps the hero→about travel handoff
 *   from squishing (source and destination must share an aspect ratio). It is
 *   the travel SOURCE (#hero-portrait-slot).
 */

const NAME = 'Dinesh';
const EASE = [0.16, 1, 0.3, 1] as const;

const CircleC: React.FC = () => (
  <span
    aria-hidden
    className="inline-grid shrink-0 place-items-center rounded-full border-current align-middle font-sans font-semibold leading-none
               border-[1.5px] lg:border-2
               h-[6vw] w-[6vw] text-[2.7vw]
               sm:h-[4.6vw] sm:w-[4.6vw] sm:text-[2vw]
               md:h-[3.6vw] md:w-[3.6vw] md:text-[1.6vw]
               lg:h-[2.3vw] lg:w-[2.3vw] lg:text-[1vw]
               -translate-y-[0.95em] ml-[0.12em]"
  >
    C
  </span>
);

const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const age = ageLabel();

  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.085, delayChildren: 0.35 } },
  };
  // Slower, softer letter rise out of the mask for a smoother entrance.
  const rise: Variants = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 1.35, ease: EASE } },
  };
  const fade: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 1.05, ease: EASE } },
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden text-black transition-colors duration-500 dark:text-white lg:h-[100svh]"
    >
      <div className="relative z-10 flex min-h-[100svh] w-full flex-col px-6 pb-12 pt-24 md:px-12 md:pb-12 md:pt-28 lg:h-full">
        {/* name (top-left) + photo (top-right) share the top line; `content-end`
            pushes the whole pair down so the photo's bottom gap == its right gap.
            Mobile: simple stack — name, photo, meta. */}
        <div className="flex flex-1 flex-col gap-10 py-6 lg:grid lg:grid-cols-[1fr_auto] lg:content-end lg:gap-x-12 lg:py-0">
          {/* NAME — left column, top of the shared row */}
          <motion.h1
            variants={group}
            initial={reduce ? 'show' : 'hidden'}
            animate="show"
            className="font-display font-medium leading-[0.82] tracking-[-0.035em] lg:col-start-1 lg:row-start-1 lg:self-start"
          >
            <span className="flex flex-nowrap items-start whitespace-nowrap text-[18vw] leading-[0.82] sm:text-[16vw] md:text-[14vw] lg:text-[12.5vw]">
              {NAME.split('').map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em]">
                  <motion.span variants={rise} className="inline-block">
                    {ch}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden">
                <motion.span variants={rise} className="inline-block">
                  <CircleC />
                </motion.span>
              </span>
            </span>
          </motion.h1>

          {/* PORTRAIT — right column; height-driven 4:5 (travel SOURCE) */}
          <motion.div
            variants={group}
            initial={reduce ? 'show' : 'hidden'}
            animate="show"
            className="relative lg:col-start-2 lg:row-start-1 lg:self-end"
          >
            {/* /age — inline above photo on mobile; floats just above the photo top
                on desktop. Positioning transform lives on this static wrapper so
                Framer's animated transform (inner) can't clobber it. */}
            <div className="mb-3 lg:absolute lg:right-0 lg:top-0 lg:z-10 lg:mb-0 lg:-translate-y-[calc(100%+0.6rem)]">
              <motion.div
                variants={fade}
                className="flex items-center gap-3 font-mono text-black/70 dark:text-white/70"
              >
                <span className="text-2xl leading-none tracking-tight md:text-[28px]">/{age}</span>
                <span className="h-px flex-1 bg-black/15 dark:bg-white/15 lg:hidden" />
              </motion.div>
            </div>
            <div
              id="hero-portrait-slot"
              className="relative aspect-[4/5] w-full overflow-hidden lg:ml-auto lg:h-[68vh] lg:max-h-[660px] lg:w-auto"
            >
              <motion.img
                id="hero-portrait-img"
                src={PROFILE_IMAGE}
                alt={PROFILE_NAME}
                className="travel-hide h-[112%] w-full object-cover grayscale"
                initial={reduce ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0 0)' }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* META — left column, bottom of the shared row (with scroll hint) */}
          <motion.div
            variants={group}
            initial={reduce ? 'show' : 'hidden'}
            animate="show"
            className="max-w-sm lg:col-start-1 lg:row-start-1 lg:self-end"
          >
            <motion.p variants={fade} className="font-mono text-[12px] uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
              [ GenAI Engineer ]
            </motion.p>
            <motion.p variants={fade} className="mt-4 text-base font-medium leading-relaxed text-black/70 dark:text-white/70 md:text-lg">
              Building intelligent systems that hold up outside the demo.
            </motion.p>
            <motion.span
              variants={fade}
              className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-black/60 dark:text-white/60"
            >
              Scroll Down
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="motion-safe:animate-bounce"
              >
                <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
              </svg>
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
