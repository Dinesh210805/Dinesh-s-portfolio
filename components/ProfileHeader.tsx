
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ui/scroll-reveal';
import { PROFILE_IMAGE, PROFILE_NAME } from '../constants/profile';

const ProfileHeader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={containerRef} className="w-full bg-white text-black py-12 md:py-24 overflow-hidden transition-colors duration-500">
      {/* Background Ghost Text - Hidden on mobile if it risks causing horizontal scroll */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.02] md:opacity-[0.03] select-none flex items-center">
        <div 
          className="text-[25vw] font-display font-black leading-none whitespace-nowrap -ml-10 uppercase text-transparent"
          style={{ WebkitTextStroke: '2px rgba(0, 0, 0, 0.1)' }}
        >
          {PROFILE_NAME}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-24 relative z-10">
        
        <div className="w-full lg:w-1/2 relative">
          <motion.div 
            className="relative z-10 w-full aspect-[4/5] md:aspect-[4/5] overflow-hidden border border-black/10 bg-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group isolation-isolate"
          >
            <motion.img 
              style={{ y }}
              src={PROFILE_IMAGE} 
              alt={PROFILE_NAME}
              className="w-full h-[115%] object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />

            <motion.div 
              animate={{ top: ['-5%', '105%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-black/40 shadow-[0_0_15px_rgba(0,0,0,0.2)] z-20 pointer-events-none"
            />
          </motion.div>

          {/* Floating Status HUD - Adjusted for mobile */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-12 z-40 bg-white/90 backdrop-blur-3xl border border-black/10 p-4 md:p-6 min-w-[200px] md:min-w-[260px] shadow-2xl text-black"
          >
            <div className="flex flex-col gap-3 md:gap-4 font-mono">
              <div className="flex justify-between items-center border-b border-black/5 pb-2">
                <span className="text-[8px] md:text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Status</span>
                <span className="text-[8px] md:text-[10px] text-black flex items-center gap-2 font-bold">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-black animate-pulse" />
                  AVAILABLE
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] text-neutral-500 tracking-widest uppercase">Specialization</p>
                <p className="text-[10px] md:text-[11px] text-black font-bold">GEN_AI / ML ARCHITECT</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="flex flex-col gap-0">
            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <span className="w-8 md:w-12 h-[1px] bg-black" />
                <span className="font-mono text-black text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold">Identity</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-black leading-[1.1] md:leading-[0.9] mb-8 md:mb-12 uppercase tracking-tighter break-words">
                Architecting <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #000000' }}>Cognitive</span> <br /> Solutions.
              </h2>
            </ScrollReveal>

            <div className="space-y-8 md:space-y-10 max-w-lg">
              <ScrollReveal delay={0.3}>
                <p className="text-neutral-700 text-base md:text-xl leading-relaxed font-light">
                  I am a specialized developer focused on bridging the gap between <span className="text-black font-medium">Generative AI</span> and <span className="text-white font-medium bg-black px-1.5 py-0.5 rounded-sm">Practical Systems</span>. My approach combines deep technical rigor with intuitive user experiences.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <div className="p-6 md:p-8 border-l-2 border-black bg-neutral-50 backdrop-blur-sm">
                  <p className="italic text-neutral-800 text-base md:text-lg leading-relaxed font-medium">
                    "Complexity is easy; simplicity is the ultimate sophistication in engineering."
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="pt-4">
                  <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-light border-t border-black/10 pt-6">
                    A developer deeply interested in Generative AI and ML, I build intelligent systems with a strong focus on usability, system design, and performance. Skilled in web development, I enjoy solving complex problems collaboratively continually iterating to create meaningful, scalable technology that delivers lasting impact in real-world contexts.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
