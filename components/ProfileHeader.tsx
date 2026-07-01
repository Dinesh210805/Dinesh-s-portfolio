import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import ScrollTextReveal from './ui/scroll-text-reveal';
import { Em } from './ui/emphasis';
import { PROFILE_IMAGE, PROFILE_NAME } from '../constants/profile';

/* Plain-spoken, humble copy — the person, not the tooling. */
const INTRO_LEFT =
  'I’m Dinesh — a developer based in India, building AI systems that do real work, not just impressive demos.';

const MANIFESTO =
  'I build systems that think — and make sure the thinking holds up. Curiosity starts the work; rigor decides whether it ships. What matters is not how much a model can say, but how much of it you can trust.';

/* Self-contained grain texture (monochrome, no asset request). */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ProfileHeader: React.FC = () => {
  // Intro portrait parallax
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ['start end', 'end start'],
  });
  // Gentle parallax — kept small so the travel handoff lands cleanly on the card.
  const imgY = useTransform(introProgress, [0, 1], [-16, 16]);

  // Pinned manifesto reveal
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pinProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });
  const barScaleX = useTransform(pinProgress, [0, 0.62], [0, 1]);

  return (
    <section id="about" className="relative w-full text-black transition-colors duration-500 dark:text-white">
      {/* grain texture across the whole identity block */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      {/* ───────── ACT 1 — the intro (face + plain bio) ───────── */}
      <div ref={introRef} className="relative z-10 mx-auto max-w-[1300px] px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-56 lg:px-16">
        <ScrollReveal blur={false}>
          <h2 className="font-display text-[18vw] font-bold leading-[0.85] tracking-tighter md:text-[9rem]">
            Hey.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-y-12 md:mt-16 lg:grid-cols-12 lg:gap-x-10">
          {/* Left copy */}
          <div className="lg:col-span-3 lg:self-end">
            <ScrollReveal delay={0.1}>
              <p className="max-w-xs text-lg font-medium leading-relaxed md:text-xl">{INTRO_LEFT}</p>
            </ScrollReveal>
          </div>

          {/* Portrait — hidden on mobile (the hero already shows the face; a second
              copy here reads as a duplicate). Desktop keeps it as the travel target. */}
          <div className="hidden lg:col-span-5 lg:block">
            <ScrollReveal blur={false}>
              <div
                id="about-portrait-slot"
                className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden"
              >
                <motion.img
                  id="about-portrait-img"
                  style={{ y: imgY }}
                  src={PROFILE_IMAGE}
                  alt={PROFILE_NAME}
                  className="travel-hide h-[112%] w-full object-cover grayscale"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
                  style={{ backgroundImage: GRAIN }}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right copy + CTA — right-aligned on mobile to balance the left intro
              paragraph; reverts to left-aligned from lg up. */}
          <div className="lg:col-span-4">
            <div className="flex flex-col items-end gap-6 text-right lg:items-start lg:text-left">
              <ScrollReveal delay={0.15}>
                <p className="text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
                  I’m a <Em>Gen-AI and ML engineer</Em>. I care about the unglamorous parts: the edge
                  cases, the thing <Em>holding up in production</Em>, the demo that still{' '}
                  <Em>works on the second try</Em>.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <p className="text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
                  Over the past couple of years I’ve <Em>shipped AI products end to end</Em> —{' '}
                  <Em>mostly solo</Em>, occasionally at 2am. I’d rather build{' '}
                  <Em>one system that lasts</Em> than ten that only look good on launch day.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.35}>
                <a
                  href="mailto:dinesh210805@gmail.com"
                  className="group inline-flex w-fit items-center gap-3 pt-2 font-medium text-black transition-colors dark:text-white"
                >
                  <span className="border-b border-black/30 pb-0.5 transition-colors group-hover:border-black dark:border-white/30 dark:group-hover:border-white">
                    Get in touch
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-black/20 transition-transform duration-300 group-hover:rotate-45 dark:border-white/20">
                    <ArrowUpRight size={15} />
                  </span>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── ACT 2 — pinned belief reveal ───────── */}
      <div ref={pinRef} className="relative z-10 h-[230vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute left-6 top-[20vh] flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 dark:text-neutral-600 md:left-16">
            <span className="h-px w-8 bg-current" />
            What I believe
          </div>

          <div className="mx-auto max-w-5xl px-6 md:px-10">
            <ScrollTextReveal
              text={MANIFESTO}
              progress={pinProgress}
              range={[0.04, 0.62]}
              baseOpacity={0.1}
              className="text-center font-display text-[7.5vw] font-medium leading-[1.18] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.6rem]"
            />
          </div>

          <motion.div
            style={{ scaleX: barScaleX }}
            className="absolute bottom-[14vh] left-1/2 h-px w-40 -translate-x-1/2 origin-left bg-black/25 dark:bg-white/25"
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
