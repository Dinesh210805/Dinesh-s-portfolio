import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] text-black transition-colors duration-500 dark:bg-[#050505] dark:text-white z-10"
    >
      {/* Light Leak / Background Gradient */}
      <div className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)] blur-[120px] opacity-70" />
      <div className="pointer-events-none absolute top-20 left-10 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.02),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)] blur-[80px]" />

      <motion.div
        style={{ y, opacity }}
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-7xl mx-auto"
      >
        <h1 className="font-display text-[12vw] sm:text-[10vw] md:text-[7.5vw] lg:text-[6.5vw] xl:text-[5.5vw] leading-[1.1] tracking-[-0.03em] text-black dark:text-white font-medium flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-2 sm:gap-y-0">
          <div className="flex items-center gap-x-2 sm:gap-x-3 md:gap-x-4">
            <span>Hi!,</span>
            <span>I'm</span>
            <span className="italic font-serif text-black/40 dark:text-white/40 font-normal">Dinesh</span>
            <div className="shrink-0 w-[14vw] sm:w-[12vw] md:w-[8.5vw] lg:w-[7.5vw] xl:w-[6vw] h-[14vw] sm:h-[12vw] md:h-[8.5vw] lg:h-[7.5vw] xl:h-[6vw] rounded-full overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] p-1.5 bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-white/80 dark:border-white/20">
               <img src="/DineshProfile2.jpeg" alt="Dinesh Kumar" className="w-full h-full object-cover rounded-full" />
            </div>
            <span>,</span>
          </div>
          
          <div className="flex items-center mt-1 sm:mt-0 gap-x-2 sm:gap-x-3 md:gap-x-4">
            <span>a</span>
            <span className="italic font-serif text-black/40 dark:text-white/40 font-normal">Gen-AI</span>
            <span>Engineer</span>
          </div>
        </h1>

        <p className="mt-10 sm:mt-12 text-black/45 dark:text-white/45 max-w-[28rem] sm:max-w-xl mx-auto text-[15px] sm:text-base md:text-lg font-sans tracking-wide leading-relaxed font-medium">
          Building intelligent systems &amp; cognitive solutions at the intersection of AI and engineering. Working on useful and mindful products together with startups and known brands.
        </p>

        <div
          className="mt-12 sm:mt-14 inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-8 py-3.5 sm:px-10 sm:py-4 text-[13px] sm:text-sm font-semibold tracking-wide dark:bg-white dark:text-black shadow-xl"
        >
          Scroll Down
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 ml-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
