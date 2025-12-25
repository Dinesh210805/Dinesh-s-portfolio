
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProfileHeader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [30, 0]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 px-6 md:px-10 lg:px-20 overflow-hidden bg-background">
      {/* Background Ghost Text - Hidden on mobile if it risks causing horizontal scroll */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.02] md:opacity-[0.03] select-none flex items-center">
        <div 
          className="text-[25vw] font-display font-black leading-none whitespace-nowrap -ml-10 uppercase text-transparent"
          style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)' }}
        >
          DINESH KUMAR
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
        
        <div className="w-full lg:w-1/2 relative">
          <motion.div 
            style={{ scale, opacity }}
            className="relative z-10 w-full aspect-[4/5] md:aspect-[4/5] overflow-hidden border border-white/10 bg-surface shadow-[0_0_50px_rgba(0,0,0,0.5)] group isolation-isolate"
          >
            <motion.img 
              style={{ y }}
              src="./DineshProfile.jpg" 
              alt="Dinesh Kumar C"
              className="w-full h-[115%] object-cover transition-all duration-700 ease-out group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1500&auto=format&fit=crop";
              }}
            />

            <motion.div 
              animate={{ top: ['-5%', '105%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-accent/40 shadow-[0_0_15px_rgba(204,255,0,0.8)] z-20 pointer-events-none"
            />
          </motion.div>

          {/* Floating Status HUD - Adjusted for mobile */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-12 z-40 bg-surface/90 backdrop-blur-3xl border border-white/10 p-4 md:p-6 min-w-[200px] md:min-w-[260px] shadow-2xl"
          >
            <div className="flex flex-col gap-3 md:gap-4 font-mono">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[8px] md:text-[10px] text-secondary uppercase tracking-widest font-bold">Status</span>
                <span className="text-[8px] md:text-[10px] text-accent flex items-center gap-2 font-bold">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-accent animate-pulse" />
                  AVAILABLE
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] text-secondary tracking-widest uppercase">Specialization</p>
                <p className="text-[10px] md:text-[11px] text-white font-bold">GEN_AI / ML ARCHITECT</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <motion.div style={{ y: textY }}>
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="w-8 md:w-12 h-[1px] bg-accent" />
              <span className="font-mono text-accent text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold">Identity</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold text-white leading-[1.1] md:leading-[0.9] mb-8 md:mb-12 uppercase tracking-tighter break-words">
              Architecting <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #CCFF00' }}>Cognitive</span> <br /> Solutions.
            </h2>

            <div className="space-y-8 md:space-y-10 max-w-lg">
              <p className="text-secondary text-base md:text-xl leading-relaxed font-light">
                I am a specialized developer focused on bridging the gap between <span className="text-white font-medium">Generative AI</span> and <span className="text-white font-medium">Practical Systems</span>. My approach combines deep technical rigor with intuitive user experiences.
              </p>
              
              <div className="p-6 md:p-8 border-l-2 border-accent bg-accent/[0.02] backdrop-blur-sm">
                <p className="italic text-secondary text-base md:text-lg leading-relaxed">
                  "Complexity is easy; simplicity is the ultimate sophistication in engineering."
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-3 md:gap-4">
                {['ML_VISION', 'LLM_OPS', 'REACT_3D', 'SYSTEM_ARCH'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 md:px-5 md:py-2.5 bg-white/[0.03] border border-white/5 rounded-none text-[8px] md:text-[10px] font-mono tracking-[0.2em] text-white/40 hover:text-accent hover:border-accent/40 transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
