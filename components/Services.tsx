import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import { Em } from './ui/emphasis';

/* ─────────────────────────────────────────────────────────────
 * Services — "the capability ledger".
 * Narrative beat after Identity: belief → what that produces.
 * A typography-led accordion; one row open at a time. Each row
 * reveals what it is + the real projects that prove it. Monochrome.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface Service {
  n: string;
  title: string;
  desc: React.ReactNode;
  proof: string[];
}

const SERVICES: Service[] = [
  {
    n: '01',
    title: 'Generative AI Applications',
    desc: (
      <>
        RAG pipelines and LLM apps that return <Em>structured, reliable output</Em> — not just
        plausible text.
      </>
    ),
    proof: ['EcoBot', 'StayBot', 'LangLearn'],
  },
  {
    n: '02',
    title: 'AI Agents & Automation',
    desc: (
      <>
        Multi-agent systems that <Em>plan, call tools, and actually act</Em> — with guardrails,
        retries, and observability.
      </>
    ),
    proof: ['AURA', 'StayBot'],
  },
  {
    n: '03',
    title: 'Web Development',
    desc: (
      <>
        Full-stack web apps. <Em>React and Next.js</Em> on the front, <Em>Flask and FastAPI</Em>{' '}
        behind, shipped and deployed.
      </>
    ),
    proof: ['LangLearn', 'GravitycARgo', 'This site'],
  },
  {
    n: '04',
    title: 'Backend & API Development',
    desc: (
      <>
        APIs that <Em>hold up</Em>: clean contracts, real-time where it counts, containerized and
        observable.
      </>
    ),
    proof: ['StayBot', 'EcoBot', 'AURA'],
  },
  {
    n: '05',
    title: 'Mobile App Development',
    desc: (
      <>
        Android and cross-platform apps — including <Em>on-device AI</Em> and real-time perception.
      </>
    ),
    proof: ['AURA'],
  },
  {
    n: '06',
    title: 'UI/UX Design',
    desc: (
      <>
        Interfaces with intent: hierarchy, restraint, and motion that clarifies rather than
        distracts. <Em>This site is the proof.</Em>
      </>
    ),
    proof: ['This site'],
  },
];

const Services: React.FC = () => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-white py-20 text-black transition-colors duration-500 dark:bg-background dark:text-white md:py-28"
    >
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10 lg:px-16">
        {/* ── Header (narrative tie) ── */}
        <div className="mb-14 max-w-3xl md:mb-20">
          <ScrollReveal>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 dark:text-neutral-600">
              <span className="h-px w-8 bg-current" />
              Work With Me
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mt-6 font-display text-5xl font-bold tracking-tighter md:text-7xl">
              What I’ll build for you.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
              Need something built? Pick what fits — I’ll <Em>design and ship it end to end</Em>,{' '}
              usually on my own. These are the engagements I <Em>take on</Em> and deliver.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Ledger ── */}
        <ScrollReveal delay={0.1} blur={false}>
          <div className="border-t border-black/12 dark:border-white/12">
            {SERVICES.map((s, i) => {
              const isActive = active === i;
              return (
                <div
                  key={s.n}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group cursor-pointer border-b border-black/12 transition-opacity duration-500 dark:border-white/12 ${
                    isActive ? 'opacity-100' : 'md:opacity-40 md:hover:opacity-100'
                  }`}
                >
                  {/* Row head */}
                  <div className="flex items-center justify-between gap-6 py-6 md:py-8">
                    <div className="flex items-baseline gap-5 md:gap-10">
                      <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
                        {s.n}
                      </span>
                      <h3
                        className={`font-display text-2xl font-bold uppercase leading-none tracking-tight transition-transform duration-500 sm:text-4xl md:text-6xl ${
                          isActive ? 'md:translate-x-2' : ''
                        }`}
                      >
                        {s.title}
                      </h3>
                    </div>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 md:h-11 md:w-11 ${
                        isActive
                          ? 'rotate-45 border-transparent bg-black text-white dark:bg-white dark:text-black'
                          : 'border-black/20 dark:border-white/20'
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </div>

                  {/* Row detail */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-5 pb-8 md:grid-cols-12 md:gap-10 md:pl-[3.75rem]">
                          <p className="max-w-xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:col-span-7 md:text-lg">
                            {s.desc}
                          </p>
                          <div className="flex flex-wrap content-start items-start gap-2 md:col-span-5">
                            {s.proof.map((p) => (
                              <span
                                key={p}
                                className="rounded-full border border-black/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:border-white/15"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;
