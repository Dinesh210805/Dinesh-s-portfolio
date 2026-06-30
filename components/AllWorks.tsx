import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import { PROJECTS } from '../constants/projects';

/* ─────────────────────────────────────────────────────────────
 * AllWorks — the full archive page. Every project as a card that
 * links to its detail page. Monochrome, matches the home grid.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const EASE = [0.16, 1, 0.3, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const AllWorks: React.FC = () => {
  return (
    <main className="relative w-full overflow-hidden bg-white pb-28 pt-32 text-black transition-colors duration-500 dark:bg-background dark:text-white md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10 lg:px-16">
        {/* Back */}
        <ScrollReveal blur={false}>
          <a
            href="#/"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
          >
            <ArrowUpLeft size={14} className="transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            Home
          </a>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal delay={0.1} blur={false}>
          <h1 className="mt-10 font-display text-6xl font-bold tracking-tighter md:mt-14 md:text-8xl">
            All work.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
            Everything, in one place. {PROJECTS.length} projects — click any to read the full story.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-7"
        >
          {PROJECTS.map((p) => (
            <motion.a
              key={p.slug}
              variants={card}
              href={`#/work/${p.slug}`}
              className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-black/12 bg-neutral-50 transition-transform duration-500 hover:-translate-y-1 dark:border-white/12 dark:bg-[#0d0d0f]"
            >
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
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-tighter text-transparent transition-all duration-500 [-webkit-text-stroke:1px_rgba(0,0,0,0.45)] group-hover:text-black group-hover:[-webkit-text-stroke:0px] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.4)] dark:group-hover:text-white md:text-5xl">
                      {p.title}
                    </h2>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      {p.category}
                    </p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-black group-hover:text-white dark:border-white/20 dark:group-hover:bg-white dark:group-hover:text-black">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default AllWorks;
