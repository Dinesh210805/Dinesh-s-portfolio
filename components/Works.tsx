import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import { FEATURED, type ProjectData } from '../constants/projects';

/* ─────────────────────────────────────────────────────────────
 * Works (home) — Featured Work. Four text-only cards with a
 * cursor-tracked 3D tilt, a spotlight that follows the pointer, and
 * a name that fills in on hover. Links out to per-project pages.
 * ───────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const FeaturedCard: React.FC<{ p: ProjectData; reduce: boolean | null }> = ({ p, reduce }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 16 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 16 });
  const sx = useTransform(mx, (v) => `${v * 100}%`);
  const sy = useTransform(my, (v) => `${v * 100}%`);
  const lightSpot = useMotionTemplate`radial-gradient(circle at ${sx} ${sy}, rgba(0,0,0,0.06), transparent 55%)`;
  const darkSpot = useMotionTemplate`radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,0.10), transparent 55%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.a
      ref={ref}
      href={`#/work/${p.slug}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      variants={card}
      style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
      className="group relative block aspect-[4/3] cursor-none overflow-hidden rounded-2xl border border-black/12 bg-neutral-50 [transform-style:preserve-3d] dark:border-white/12 dark:bg-[#0d0d0f]"
    >
      {/* spotlight (theme-specific) */}
      <motion.div style={{ backgroundImage: lightSpot }} className="pointer-events-none absolute inset-0 dark:hidden" />
      <motion.div style={{ backgroundImage: darkSpot }} className="pointer-events-none absolute inset-0 hidden dark:block" />
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-9">
        <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          <span>{p.index}</span>
          <span>{p.year}</span>
        </div>

        <div>
          <h3 className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tighter text-transparent transition-all duration-500 [-webkit-text-stroke:1px_rgba(0,0,0,0.45)] group-hover:text-black group-hover:[-webkit-text-stroke:0px] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.4)] dark:group-hover:text-white md:text-6xl">
            {p.title}
          </h3>

          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                {p.category}
              </p>
              <p className="mt-2 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
                {p.tagline}
              </p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-black group-hover:text-white dark:border-white/20 dark:group-hover:bg-white dark:group-hover:text-black">
              <ArrowUpRight size={16} />
            </span>
          </div>

          {/* stack reveal on hover */}
          <div className="mt-5 flex translate-y-2 flex-wrap gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {p.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-black/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-neutral-500 dark:border-white/10"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
};

const Works: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="works"
      className="relative w-full overflow-hidden border-t border-black/10 bg-white py-20 text-black transition-colors duration-500 dark:border-white/10 dark:bg-background dark:text-white md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 dark:text-neutral-600">
                <span className="h-px w-8 bg-current" />
                Featured Work
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl font-bold tracking-tighter md:text-7xl">
                Things I’ve shipped.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
                Four I’m proud of. Each one built end to end — click in for the full story.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <a
              href="#/work"
              className="group inline-flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-black transition-colors dark:text-white"
            >
              <span className="border-b border-black/30 pb-0.5 transition-colors group-hover:border-black dark:border-white/30 dark:group-hover:border-white">
                View all work
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border border-black/20 transition-transform duration-300 group-hover:rotate-45 dark:border-white/20">
                <ArrowUpRight size={14} />
              </span>
            </a>
          </ScrollReveal>
        </div>

        {/* Featured grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7"
        >
          {FEATURED.map((p) => (
            <FeaturedCard key={p.slug} p={p} reduce={reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Works;
