import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import { PROJECTS, type ProjectData } from '../constants/projects';

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
    <main className="relative z-20 w-full overflow-hidden bg-bone pb-28 pt-32 text-black transition-colors duration-500 dark:bg-background dark:text-white md:pt-40">
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
          className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-20 md:grid-cols-2 md:gap-x-8 md:gap-y-14"
        >
          {PROJECTS.map((p) => (
            <ArchiveCard key={p.slug} p={p} />
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default AllWorks;
