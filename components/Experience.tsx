import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useReducedMotion } from 'framer-motion';
import { Em } from './ui/emphasis';
import SectionHeading from './ui/section-heading';

/* ─────────────────────────────────────────────────────────────
 * Experience — a vertical "levels" timeline. A central spine draws
 * an active line as you scroll, a marker rides its tip, numbered
 * nodes light as they enter view, and a big outlined LEVEL 0X sits
 * behind each entry. Cards are raised skeuomorphic surfaces.
 * Monochrome — matches the site shell (grain · Syne / JetBrains
 * Mono · <Em>). Reverse-chronological.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Claymorphic surface — same tone as the page (bone / background), raised
 * purely through a soft dual-direction shadow (light top-left, dark
 * bottom-right) rather than a contrasting card color. Large radius, soft
 * edges, no hard border — reads as "risen from" the surface, not placed on it. */
const CARD =
  'rounded-[32px] bg-bone ' +
  'shadow-[10px_10px_28px_rgba(0,0,0,0.10),-10px_-10px_28px_rgba(255,255,255,0.8),inset_0_1px_1px_rgba(255,255,255,0.6)] ' +
  'dark:bg-background ' +
  'dark:shadow-[12px_12px_32px_rgba(0,0,0,0.6),-10px_-10px_28px_rgba(255,255,255,0.025),inset_0_1px_1px_rgba(255,255,255,0.04)]';

interface Entry {
  id: number; // level number — climbs from school (01) to the latest role
  dateRange: string;
  role: string;
  org: string;
  status: string;
  live?: boolean; // the one in-progress entry
  stat?: string;
  statLabel?: string;
  detail: React.ReactNode;
}

const ENTRIES: Entry[] = [
  {
    id: 5,
    dateRange: 'Oct — Nov 2024',
    role: 'Generative AI Intern',
    org: 'AICTE · 1M1B Flaunch',
    status: 'Shipped',
    detail: (
      <>
        Built <Em>LangLearn</Em>, a learning platform with <Em>schema-enforced</Em> model output, and{' '}
        <Em>EcoBot</Em> — a waste classifier fine-tuned on <Em>LLaMA 3 8B</Em> with QLoRA and a
        retrieval pipeline.
      </>
    ),
  },
  {
    id: 4,
    dateRange: 'Jul — Oct 2024',
    role: 'Associate AI Intern',
    org: 'Nuevera Infotech',
    status: 'Shipped',
    detail: (
      <>
        Architected <Em>StayBot</Em>, an AI travel assistant: a <Em>LangGraph ReAct agent</Em> on
        LLaMA 3.3-70B routing across <Em>fifteen tools</Em>, with Pinecone-backed retrieval for real
        bookings.
      </>
    ),
  },
  {
    id: 3,
    dateRange: '2022 — Present',
    role: 'B.Tech, Information Technology',
    org: 'Sri Manakula Vinayagar Engineering College',
    status: 'In progress',
    live: true,
    stat: '9.07',
    statLabel: 'CGPA',
    detail: (
      <>
        Eight semesters of <Em>systems, databases, and algorithms</Em> — the groundwork under the
        roles above.
      </>
    ),
  },
  {
    id: 2,
    dateRange: '2021 — 2022',
    role: 'Higher Secondary',
    org: 'Amalorpavam Higher Secondary School',
    status: 'Complete',
    stat: '91.83%',
    statLabel: 'Class XII',
    detail: (
      <>
        <Em>Biology and Mathematics</Em> — where the habit of taking things apart started.
      </>
    ),
  },
  {
    id: 1,
    dateRange: '2019 — 2020',
    role: 'Secondary School',
    org: 'Amalorpavam Higher Secondary School',
    status: 'Complete',
    stat: '86.2%',
    statLabel: 'Class X',
    detail: <>SSLC — the first level on the path.</>,
  },
];

/* ── One entry: LEVEL watermark, spine node, skeuomorphic card ── */
const TimelineNode: React.FC<{ entry: Entry; index: number }> = ({ entry, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: false, margin: '-20%' });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative flex min-h-[340px] flex-col items-start md:min-h-[400px] md:flex-row md:items-center"
    >
      {/* big outlined LEVEL number, sitting in the empty half */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, margin: '-20%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-none absolute inset-y-0 hidden w-1/2 select-none items-center md:flex ${
          isEven ? 'left-1/2 justify-end pr-10 lg:pr-16' : 'right-1/2 justify-start pl-10 lg:pl-16'
        }`}
      >
        <span className="font-display text-[2.25rem] font-black uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(0,0,0,0.14)] dark:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.14)] lg:text-[3.5rem]">
          Level 0{entry.id}
        </span>
      </motion.div>

      {/* spine node */}
      <div className="absolute left-6 top-6 z-20 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
        <div
          className={`flex h-10 w-10 items-center justify-center border-2 transition-all duration-500 md:h-12 md:w-12 ${
            inView
              ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
              : 'border-black/20 bg-white text-neutral-400 dark:border-white/20 dark:bg-background dark:text-neutral-500'
          }`}
        >
          <span className="font-mono text-xs font-bold md:text-sm">0{entry.id}</span>
        </div>
      </div>

      {/* card */}
      <div
        className={`w-full pl-16 md:w-1/2 md:pl-0 ${
          isEven ? 'md:pr-20 md:text-right' : 'md:ml-auto md:pl-20'
        }`}
      >
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`group ${CARD} p-7 transition-transform duration-500 will-change-transform hover:-translate-y-1 md:p-9`}
        >
          {/* date · status */}
          <div className={`mb-5 flex items-center gap-3 ${isEven ? 'md:justify-end' : ''}`}>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
              {entry.dateRange}
            </span>
            <span className="h-px w-6 bg-black/15 dark:bg-white/15" />
            <span
              className={`inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${
                entry.live ? 'text-black dark:text-white' : 'text-neutral-400 dark:text-neutral-500'
              }`}
            >
              {entry.live && (
                <span className="h-1.5 w-1.5 rounded-full bg-black motion-safe:animate-pulse dark:bg-white" />
              )}
              {entry.status}
            </span>
          </div>

          <h3 className="font-display text-2xl font-bold leading-[1.05] tracking-tight md:text-[2rem]">
            {entry.role}
          </h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            {entry.org}
          </p>

          <p
            className={`mt-6 text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-base ${
              isEven ? 'md:ml-auto' : ''
            } max-w-md`}
          >
            {entry.detail}
          </p>

          {/* hard number — only shown when there's a real, verifiable figure */}
          {entry.stat && (
            <div className={`mt-7 flex items-baseline gap-3 ${isEven ? 'md:justify-end' : ''}`}>
              <span className="font-display text-4xl font-bold leading-none tracking-tighter md:text-5xl">
                {entry.stat}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                {entry.statLabel}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const lineHeight = useTransform(smooth, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      className="relative w-full py-20 text-black transition-colors duration-500 dark:text-white md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div ref={containerRef} className="relative z-10 w-full px-6 md:px-12">
        {/* header — full-width, aligned to the hero "D" */}
        <div className="mb-12 md:mb-20">
          <SectionHeading eyebrow="Experience">Path.</SectionHeading>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
            Two AI internships and a B.Tech — five levels, <Em>most recent first</Em>. The line draws
            as you go.
          </p>
        </div>

        {/* timeline kept centered at a readable width */}
        <div className="relative mx-auto max-w-[1150px]">
          {/* background track */}
          <div className="absolute bottom-0 left-6 top-0 w-px -translate-x-1/2 bg-black/10 dark:bg-white/10 md:left-1/2" />
          {/* active drawn line */}
          {!reduce && (
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-6 top-0 z-10 w-px origin-top -translate-x-1/2 bg-black dark:bg-white md:left-1/2"
            >
              {/* marker riding the tip */}
              <span className="absolute bottom-0 left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rotate-45 border border-black bg-white dark:border-white dark:bg-background md:block" />
            </motion.div>
          )}

          <div className="space-y-14 pb-6 md:space-y-24">
            {ENTRIES.map((entry, index) => (
              <TimelineNode key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
