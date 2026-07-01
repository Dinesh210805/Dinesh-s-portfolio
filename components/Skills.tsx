import React from 'react';
import ScrollReveal from './ui/scroll-reveal';
import { Em } from './ui/emphasis';
import SectionHeading from './ui/section-heading';
import LogoCloud, { type LogoItem } from './ui/logo-cloud';

/* ─────────────────────────────────────────────────────────────
 * Skills — a bordered logo grid of the tools actually reached for,
 * with the AI concepts that don't have a logo kept as a slim
 * keyword index beneath. Full-bleed; heading aligns to the hero "D".
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const LOGOS: LogoItem[] = [
  { slug: 'python', label: 'Python' },
  { slug: 'openjdk', label: 'Java' },
  { slug: 'javascript', label: 'JavaScript' },
  { slug: 'typescript', label: 'TypeScript' },
  { slug: 'tensorflow', label: 'TensorFlow' },
  { slug: 'opencv', label: 'OpenCV' },
  { slug: 'fastapi', label: 'FastAPI' },
  { slug: 'flask', label: 'Flask' },
  { slug: 'langchain', label: 'LangChain' },
  { slug: 'huggingface', label: 'Hugging Face' },
  { slug: 'googlegemini', label: 'Gemini' },
  { slug: 'ollama', label: 'Ollama' },
  { slug: 'docker', label: 'Docker' },
  { slug: 'googlecloud', label: 'Google Cloud' },
  { slug: 'git', label: 'Git' },
  { slug: 'github', label: 'GitHub' },
];

// concepts / platforms without a clean logo — kept so the breadth still reads
const CONCEPTS = [
  'RAG',
  'Multi-Agent Systems',
  'QLoRA Fine-Tuning',
  'LangGraph',
  'Function Calling',
  'Structured Output',
  'LLM Evaluation',
  'Prompt Engineering',
  'Model Context Protocol',
  'YOLOv8',
  'Pinecone',
  'ChromaDB',
  'WebRTC',
  'ONNX Runtime',
];

const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden py-20 text-black transition-colors duration-500 dark:text-white md:py-28"
    >
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 w-full px-6 md:px-12">
        {/* ── Header ── */}
        <div className="mb-12 md:mb-16">
          <SectionHeading eyebrow="Skills">Stack.</SectionHeading>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
              Not a checklist — the tools I <Em>actually reach for</Em>, picked because they{' '}
              <Em>ship</Em>.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Logo grid ── */}
        <ScrollReveal delay={0.1} blur={false}>
          <LogoCloud logos={LOGOS} />
        </ScrollReveal>

        {/* ── Concepts index ── */}
        <ScrollReveal delay={0.15} blur={false}>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 md:mt-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-600">
              Also
            </span>
            {CONCEPTS.map((c) => (
              <span
                key={c}
                className="font-mono text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
              >
                {c}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Skills;
