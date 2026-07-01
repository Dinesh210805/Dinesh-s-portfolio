import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import SectionHeading from './ui/section-heading';
import { FEATURED, type ProjectData } from '../constants/projects';

/* ─────────────────────────────────────────────────────────────
 * Works (home) — Featured Work. Large editorial cards: a rounded
 * media block holding a solid-color placeholder (screenshots land
 * later) that zooms on hover, with the project name set below. The
 * pointer morphs into a "View" bubble over each card.
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
  const fill = p.color ?? '#171717';

  return (
    <motion.div variants={card} className="group">
      {/* Media block — solid-color placeholder, swappable for an <img> later */}
      <a
        href={`#/work/${p.slug}`}
        data-cursor-text="View"
        data-cursor-variant="bubble"
        aria-label={`View ${p.title} — ${p.category}`}
        className="relative block aspect-[4/3] cursor-none overflow-hidden rounded-3xl bg-neutral-100 dark:bg-white/[0.03]"
      >
        {/* Cover mockup — object-contain so the shot is shown whole, never
            cropped on the sides; sits on a neutral matte. */}
        {p.cover ? (
          <img
            src={p.cover}
            alt={`${p.title} — ${p.category}`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-contain p-3 md:p-4 ${reduce ? '' : 'transition-transform duration-700 ease-out group-hover:scale-[1.03]'}`}
          />
        ) : (
          <div
            className={`absolute inset-0 ${reduce ? '' : 'transition-transform duration-700 ease-out group-hover:scale-[1.06]'}`}
            style={{ backgroundColor: fill }}
          >
            {/* soft top sheen for depth */}
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.18), transparent 60%)' }}
            />
            {/* faint tone-on-tone title so the placeholder reads as intentional */}
            <div className="absolute inset-0 grid place-items-center px-6">
              <span className="select-none font-display text-6xl font-bold uppercase leading-none tracking-tighter text-white/10 md:text-8xl">
                {p.title}
              </span>
            </div>
          </div>
        )}

        {/* grain over the media */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
        {/* base darken for metadata legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* index / year overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6 font-mono text-[11px] uppercase tracking-widest text-white/75 md:p-7">
          <span>{p.index}</span>
          <span>{p.year}</span>
        </div>
      </a>

      {/* Title + subtitle below the card (reference composition) */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{p.title}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            {p.category}
          </p>
        </div>
        <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-black group-hover:text-white dark:border-white/15 dark:group-hover:bg-white dark:group-hover:text-black">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.div>
  );
};

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
                Three I’m proud of. Each one built end to end — click in for the full story.
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
            <FeaturedCard key={p.slug} p={p} reduce={reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Works;
