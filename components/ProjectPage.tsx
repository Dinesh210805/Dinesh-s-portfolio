import React, { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import ProjectCard from './ui/project-card';
import { getProject, PROJECTS } from '../constants/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

/* ─────────────────────────────────────────────────────────────
 * ProjectPage — per-project detail. Editorial, text-driven for now
 * (screenshots later). Two-column sections, monochrome, grain.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const ProjectPage: React.FC<{ slug: string }> = ({ slug }) => {
  const p = getProject(slug);
  const reduce = useReducedMotion();
  const [coverFailed, setCoverFailed] = useState(false);
  useDocumentMeta(
    p ? `${p.title} — ${p.category} | Dinesh Kumar C` : 'Project not found | Dinesh Kumar C',
    p?.summary
  );

  if (!p) {
    return (
      <main className="relative z-20 flex min-h-screen flex-col items-center justify-center gap-6 bg-bone text-black dark:bg-background dark:text-white">
        <h1 className="font-display text-4xl font-bold">Project not found.</h1>
        <a href="#/work" className="font-mono text-xs uppercase tracking-[0.3em] underline">
          ← All work
        </a>
      </main>
    );
  }

  const others = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const showCover = Boolean(p.cover) && !coverFailed;

  return (
    <main className="relative z-20 w-full overflow-hidden bg-bone pb-28 pt-32 text-black transition-colors duration-500 dark:bg-background dark:text-white md:pt-40">
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 w-full px-6 md:px-12">
        {/* Back */}
        <ScrollReveal blur={false}>
          <a
            href="#/work"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
          >
            <ArrowUpLeft size={14} className="transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            All work
          </a>
        </ScrollReveal>

        {/* Hero */}
        <ScrollReveal delay={0.1} blur={false}>
          <div className="mt-10 flex items-start gap-4 md:mt-14">
            <span className="mt-3 font-mono text-sm text-neutral-400 dark:text-neutral-600">{p.index}</span>
            <h1 className="font-display text-[16vw] font-bold uppercase leading-[0.9] tracking-tighter sm:leading-[0.85] md:text-[8rem] md:leading-[0.85]">
              {p.title}
            </h1>
          </div>
        </ScrollReveal>

        {/* Cover photo */}
        {showCover && (
          <ScrollReveal delay={0.12} blur={false}>
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl md:mt-14">
              <img
                src={p.cover}
                alt={`${p.title} — ${p.category}`}
                loading="eager"
                onError={() => setCoverFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay"
                style={{ backgroundImage: GRAIN }}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Meta + summary */}
        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-black/10 pt-10 dark:border-white/10 md:grid-cols-12">
          <ScrollReveal delay={0.15} className="md:col-span-5">
            <div className="flex flex-wrap gap-x-10 gap-y-6 font-mono text-sm">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600">
                  Category
                </p>
                <p>{p.category}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600">
                  Year
                </p>
                <p>{p.year}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600">
                  Links
                </p>
                <div className="flex gap-4">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                    >
                      {l.label}
                      <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="md:col-span-7">
            <p className="font-display text-xl font-medium leading-relaxed tracking-tight md:text-2xl">
              {p.summary}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-black/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-neutral-500 dark:border-white/15"
                >
                  {s}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Sections */}
        <div className="mt-16 md:mt-24">
          {p.sections.map((s, i) => (
            <ScrollReveal key={i} delay={0.05}>
              <div className="grid grid-cols-1 gap-5 border-t border-black/10 py-10 dark:border-white/10 md:grid-cols-12 md:gap-10 md:py-12">
                <h2 className="font-display text-2xl font-bold tracking-tight md:col-span-4 md:text-3xl">
                  {s.heading}
                </h2>
                <div className="max-w-2xl space-y-5 md:col-span-8">
                  {s.body.map((para, j) => (
                    <p
                      key={j}
                      className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* More projects */}
        <div className="mt-24 border-t border-black/10 pt-12 dark:border-white/10">
          <h2 className="mb-8 font-display text-3xl font-bold tracking-tighter md:text-4xl">
            More projects
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-14"
          >
            {others.map((o) => (
              <ProjectCard key={o.slug} p={o} reduce={reduce} />
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
