import React from 'react';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import { getProject, PROJECTS } from '../constants/projects';

/* ─────────────────────────────────────────────────────────────
 * ProjectPage — per-project detail. Editorial, text-driven for now
 * (screenshots later). Two-column sections, monochrome, grain.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ProjectPage: React.FC<{ slug: string }> = ({ slug }) => {
  const p = getProject(slug);

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

  const others = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <main className="relative z-20 w-full overflow-hidden bg-bone pb-28 pt-32 text-black transition-colors duration-500 dark:bg-background dark:text-white md:pt-40">
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 md:px-10">
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
            <h1 className="font-display text-[16vw] font-bold uppercase leading-[0.85] tracking-tighter md:text-[8rem]">
              {p.title}
            </h1>
          </div>
        </ScrollReveal>

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
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
            {others.map((o) => (
              <a
                key={o.slug}
                href={`#/work/${o.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-black/12 p-7 transition-colors duration-300 hover:border-black/40 dark:border-white/12 dark:hover:border-white/40"
              >
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{o.title}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    {o.category}
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/20 transition-transform duration-300 group-hover:rotate-45 dark:border-white/20">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
