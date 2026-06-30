  import React, { Suspense, useRef, useState } from 'react';
  import { motion, useScroll, useTransform, useInView, useReducedMotion, type Variants } from 'framer-motion';
  import { Scene } from './Scene';

  /* ─────────────────────────────────────────────────────────────
  * Hero — minimal, monochrome. The robot is the subject (cropped to
  * a bust), framed by the name (split to the corners) and three
  * domain pills. Dark stage by design: chrome only reads on black.
  * ───────────────────────────────────────────────────────────── */

  const EASE = [0.16, 1, 0.3, 1] as const;

  const DOMAINS = ['Generative AI', 'Machine Learning', 'AI Agents'];

  const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

  const reveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: EASE, delay: 0.25 + i * 0.12 },
    }),
  };

  interface PillProps {
    children: React.ReactNode;
    className?: string;
    index?: number;
  }
  const Pill: React.FC<PillProps> = ({ children, className = '', index = 0 }) => (
    <motion.span
      custom={index}
      variants={reveal}
      className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-[13px] font-medium tracking-wide text-white/90 backdrop-blur-md shadow-[0_6px_30px_rgba(0,0,0,0.45)] ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-white/50" />
      {children}
    </motion.span>
  );

  const Hero: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { amount: 0.2 });
    const [loaded, setLoaded] = useState(false);
    const reduceMotion = useReducedMotion();

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, -120]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    const initial = reduceMotion ? 'show' : 'hidden';

    return (
      <section
        ref={containerRef}
        id="home"
        className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white"
      >
        {/* Graphite stage */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_62%_55%_at_50%_42%,#121216_0%,#08080a_58%,#050505_100%)]" />

        {/* Subtle light leaks */}
        <motion.div
          aria-hidden
          className="absolute left-[8%] top-[6%] z-[1] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)] blur-[110px] mix-blend-screen pointer-events-none"
          animate={reduceMotion ? undefined : { x: [0, 40, 0], y: [0, 24, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          aria-hidden
          className="absolute bottom-[8%] right-[6%] z-[1] h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_62%)] blur-[120px] mix-blend-screen pointer-events-none"
        />

        {/* Grain */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] opacity-[0.06] mix-blend-screen pointer-events-none"
          style={{ backgroundImage: GRAIN }}
        />

        {/* Robot — centred subject, zoom-out on load */}
        <motion.div
          style={{ y, opacity }}
          initial={{ scale: reduceMotion ? 1 : 1.25, opacity: 0 }}
          animate={loaded ? { scale: 1, opacity: 1 } : { scale: reduceMotion ? 1 : 1.25, opacity: 0 }}
          transition={{ duration: 1.7, ease: EASE }}
          className="absolute inset-0 z-[3]"
        >
          <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
            <Scene isInView={isInView} onLoaded={() => setLoaded(true)} />
          </Suspense>
        </motion.div>

        {/* Crop the legs: fade the lower third into the stage */}
        <div className="absolute inset-x-0 bottom-0 z-[4] h-[34%] bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent pointer-events-none" />

        {/* ── Framing: name + domain pills + scroll, height-robust flex ── */}
        <motion.div
          style={{ opacity }}
          variants={reveal}
          initial={initial}
          animate="show"
          className="pointer-events-none relative z-20 flex min-h-screen flex-col justify-between px-6 pt-28 pb-12 md:px-[6%] md:pt-32 md:pb-14"
        >
          {/* Top — name (split on desktop, stacked centred on mobile) */}
          <div className="flex justify-center md:justify-between">
            <motion.span
              custom={0}
              variants={reveal}
              className="hidden font-display text-5xl font-bold uppercase leading-none tracking-tighter text-white md:block lg:text-6xl xl:text-7xl"
            >
              Dinesh
            </motion.span>
            <motion.span
              custom={0}
              variants={reveal}
              className="hidden font-display text-5xl font-bold uppercase leading-none tracking-tighter text-white md:block lg:text-6xl xl:text-7xl"
            >
              Kumar
            </motion.span>
            <motion.h1
              custom={0}
              variants={reveal}
              className="text-center font-display text-[14vw] font-bold uppercase leading-[0.85] tracking-tighter text-white md:hidden"
            >
              Dinesh
              <br />
              Kumar
            </motion.h1>
          </div>

          {/* Middle — side pills (desktop) */}
          <div className="hidden items-center justify-between md:flex">
            <Pill index={1}>{DOMAINS[0]}</Pill>
            <Pill index={2}>{DOMAINS[1]}</Pill>
          </div>

          {/* Bottom — remaining pill (desktop) / all pills (mobile) + scroll cue */}
          <div className="flex flex-col items-center gap-5">
            <Pill index={3} className="hidden md:inline-flex">
              {DOMAINS[2]}
            </Pill>
            <div className="flex flex-wrap items-center justify-center gap-2.5 md:hidden">
              {DOMAINS.map((d, i) => (
                <Pill key={d} index={i + 1} className="px-4 py-2 text-[11px]">
                  {d}
                </Pill>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-white/40">Scroll</span>
              <div className="relative h-10 w-px overflow-hidden bg-white/10">
                <motion.div
                  className="absolute top-0 h-1/2 w-full bg-white/70"
                  animate={reduceMotion ? undefined : { y: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  };

  export default Hero;
