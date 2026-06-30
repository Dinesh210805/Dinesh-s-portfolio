import React from 'react';
import ScrollReveal from './ui/scroll-reveal';
import { Em } from './ui/emphasis';

/* ─────────────────────────────────────────────────────────────
 * Experience — an editorial career ledger. Full-width 12-column
 * rows (period · role + story · a hard number), hairline-separated,
 * reverse-chronological, split Work → Education. Monochrome, matches
 * the home sections' shell and the 12-col grid used elsewhere.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface Entry {
  period: string;
  role: string;
  org: string;
  stat: string;
  statLabel: string;
  detail: string;
}

const WORK: Entry[] = [
  {
    period: 'Oct — Nov 2024',
    role: 'Generative AI Intern',
    org: 'AICTE · 1M1B Flaunch',
    stat: '2',
    statLabel: 'Products shipped',
    detail:
      'Built LangLearn, a learning platform with JSON-schema-enforced model output, and EcoBot — a waste classifier fine-tuned on LLaMA 3 8B with QLoRA and a retrieval pipeline.',
  },
  {
    period: 'Jul — Oct 2024',
    role: 'Associate AI Intern',
    org: 'Nuevera Infotech',
    stat: '15',
    statLabel: 'Tools orchestrated',
    detail:
      'Architected StayBot, an AI travel assistant: a LangGraph ReAct agent on LLaMA 3.3-70B routing across fifteen tools, with Pinecone-backed retrieval for real bookings.',
  },
];

const EDUCATION: Entry[] = [
  {
    period: '2022 — Present',
    role: 'B.Tech, Information Technology',
    org: 'SMV Engineering College',
    stat: '9.07',
    statLabel: 'CGPA',
    detail:
      'Systems, databases, and algorithms — the groundwork under the roles above. Currently in the final year.',
  },
  {
    period: '2021 — 2022',
    role: 'Higher Secondary',
    org: 'Amalorpavam HSS',
    stat: '91.83%',
    statLabel: 'Class XII',
    detail: 'Computer Science with Mathematics.',
  },
  {
    period: '2019 — 2020',
    role: 'Secondary School',
    org: 'Amalorpavam HSS',
    stat: '86.2%',
    statLabel: 'Class X',
    detail: 'SSLC — Amalorpavam Higher Secondary School.',
  },
];

const Row: React.FC<{ entry: Entry }> = ({ entry }) => (
  <ScrollReveal>
    <div className="group grid grid-cols-1 gap-x-8 gap-y-5 border-t border-black/10 py-9 transition-colors duration-500 hover:bg-black/[0.015] dark:border-white/10 dark:hover:bg-white/[0.015] md:grid-cols-12 md:gap-x-10 md:py-12">
      {/* Period */}
      <div className="md:col-span-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
          {entry.period}
        </p>
      </div>

      {/* Role · org · story */}
      <div className="md:col-span-6">
        <h3 className="font-display text-2xl font-bold leading-[1.05] tracking-tight md:text-[2rem]">
          {entry.role}
        </h3>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          {entry.org}
        </p>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-base">
          {entry.detail}
        </p>
      </div>

      {/* Hard number */}
      <div className="flex items-baseline gap-3 md:col-span-3 md:flex-col md:items-end md:gap-1 md:text-right">
        <p className="font-display text-4xl font-bold tracking-tighter md:text-[3.25rem] md:leading-none">
          {entry.stat}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
          {entry.statLabel}
        </p>
      </div>
    </div>
  </ScrollReveal>
);

const ChapterLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <ScrollReveal>
    <div
      className={`font-mono text-[10px] uppercase tracking-[0.45em] text-neutral-400 dark:text-neutral-600 ${className}`}
    >
      {children}
    </div>
  </ScrollReveal>
);

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden border-t border-black/10 bg-white py-20 text-black transition-colors duration-500 dark:border-white/10 dark:bg-background dark:text-white md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 max-w-2xl md:mb-16">
          <ScrollReveal>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 dark:text-neutral-600">
              <span className="h-px w-8 bg-current" />
              Experience
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mt-6 font-display text-5xl font-bold tracking-tighter md:text-7xl">
              How I got here.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
              Two AI internships and a B.Tech in Information Technology — the roles,{' '}
              <Em>what I built in them</Em>, and the dates. Most recent first.
            </p>
          </ScrollReveal>
        </div>

        {/* Work */}
        <ChapterLabel className="mb-7">Work</ChapterLabel>
        {WORK.map((e) => (
          <Row key={e.role} entry={e} />
        ))}

        {/* Education */}
        <ChapterLabel className="mb-7 mt-16 md:mt-20">Education</ChapterLabel>
        {EDUCATION.map((e) => (
          <Row key={e.role} entry={e} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
