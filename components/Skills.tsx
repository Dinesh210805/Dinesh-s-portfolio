import React from 'react';
import ScrollReveal from './ui/scroll-reveal';
import { Em } from './ui/emphasis';

/* ─────────────────────────────────────────────────────────────
 * Skills — slim, monochrome, editorial index, now with life:
 * each category's tags ride a slow, edge-faded marquee that
 * pauses on hover (so it moves but stays readable). Rows alternate
 * direction. Shares the Services language. Résumé-accurate.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface Group {
  n: string;
  label: string;
  items: string[];
}

const GROUPS: Group[] = [
  {
    n: '01',
    label: 'Languages',
    items: ['Python', 'Java', 'C', 'SQL', 'JavaScript', 'TypeScript', 'HTML/CSS'],
  },
  {
    n: '02',
    label: 'Generative AI & LLMs',
    items: [
      'RAG',
      'Multi-Agent Systems',
      'QLoRA Fine-Tuning',
      'Function Calling',
      'Structured Output',
      'LLM Evaluation',
      'LangChain',
      'LangGraph',
      'Prompt Engineering',
    ],
  },
  {
    n: '03',
    label: 'AI Platforms & Vector DBs',
    items: ['Gemini API', 'Groq', 'Google ADK', 'Ollama', 'Hugging Face', 'Pinecone', 'ChromaDB', 'MCP'],
  },
  {
    n: '04',
    label: 'ML & Computer Vision',
    items: ['TensorFlow', 'YOLOv8', 'OpenCV', 'spaCy', 'ONNX Runtime', 'ML Kit OCR'],
  },
  {
    n: '05',
    label: 'Backend, Cloud & Tools',
    items: ['FastAPI', 'Flask', 'WebRTC', 'Docker', 'Google Cloud Run', 'Git', 'GitHub', 'Postman'],
  },
];

const Tag: React.FC<{ children: string }> = ({ children }) => (
  <span className="shrink-0 rounded-full border border-black/15 px-4 py-2 font-mono text-[11px] uppercase tracking-wide text-neutral-600 transition-colors duration-300 hover:border-transparent hover:bg-black hover:text-white dark:border-white/15 dark:text-neutral-400 dark:hover:bg-white dark:hover:text-black">
    {children}
  </span>
);

const Marquee: React.FC<{ items: string[]; reverse?: boolean }> = ({ items, reverse }) => {
  const duration = items.length * 4.5 + 14; // keep perceived speed consistent across rows
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
      <div
        className={`flex w-max gap-2.5 animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused] ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <Tag key={`${item}-${i}`}>{item}</Tag>
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-white py-20 text-black transition-colors duration-500 dark:bg-background dark:text-white md:py-28"
    >
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10 lg:px-16">
        {/* ── Header ── */}
        <div className="mb-14 max-w-3xl md:mb-20">
          <ScrollReveal>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 dark:text-neutral-600">
              <span className="h-px w-8 bg-current" />
              Skills
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mt-6 font-display text-5xl font-bold tracking-tighter md:text-7xl">
              What I build with.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
              Not a checklist — the tools I <Em>actually reach for</Em>, picked because they{' '}
              <Em>ship</Em>.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Index (marquee rows) ── */}
        <ScrollReveal delay={0.1} blur={false}>
          <div className="border-t border-black/12 dark:border-white/12">
            {GROUPS.map((g, i) => (
              <div
                key={g.n}
                className="group grid grid-cols-1 gap-5 border-b border-black/12 py-8 dark:border-white/12 md:grid-cols-12 md:items-center md:gap-8 md:py-9"
              >
                {/* Label */}
                <div className="flex items-baseline gap-4 md:col-span-3">
                  <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">{g.n}</span>
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{g.label}</h3>
                </div>

                {/* Marquee tags */}
                <div className="md:col-span-9">
                  <Marquee items={g.items} reverse={i % 2 === 1} />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Skills;
