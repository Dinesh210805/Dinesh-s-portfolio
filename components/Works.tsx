import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import SectionHeading from './ui/section-heading';
import ProjectCard from './ui/project-card';
import { FEATURED } from '../constants/projects';

/* ─────────────────────────────────────────────────────────────
 * Works (home) — Featured Work. Large editorial cards (ProjectCard)
 * in a three-across grid. The pointer morphs into a "View" bubble
 * over each card. Same card component powers AllWorks and the
 * "more projects" row on each detail page.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const Works: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="works"
      className="relative w-full overflow-hidden border-t border-black/10 py-20 text-black transition-colors duration-500 dark:border-white/10 dark:text-white md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 w-full px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeading eyebrow="Selected Work">Work.</SectionHeading>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <ScrollReveal delay={0.2}>
              <p className="max-w-lg text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
                Selected projects, not a highlight reel — each one shipped, used, and still running.
              </p>
            </ScrollReveal>

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
        </div>

        {/* Featured grid — three across on one line */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-14"
        >
          {FEATURED.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} p={p} reduce={reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Works;
