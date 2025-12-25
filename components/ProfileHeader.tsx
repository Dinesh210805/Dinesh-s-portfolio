
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProfileHeader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <section ref={containerRef} className="relative py-32 px-5 md:px-10 lg:px-20 overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <div className="text-[30vw] font-display font-black leading-none whitespace-nowrap -ml-20">
          ARCHITECT ARCHITECT
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        <div className="w-full lg:w-1/2 relative">
          <motion.div 
            style={{ scale, opacity }}
            className="relative z-10 w-full aspect-[4/5] overflow-hidden border border-white/5 bg-surface shadow-2xl group isolation-isolate"
          >
            <motion.img 
              style={{ y }}
              src="DinesProfile.jpg" 
              alt="Dinesh Kumar C"
              className="w-full h-[130%] -mt-[15%] object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1500&auto=format&fit=crop";
              }}
            />

            <motion.div 
              animate={{ top: ['-5%', '105%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[1px] bg-accent/60 shadow-[0_0_20px_rgba(204,255,0,0.9)] z-20 pointer-events-none"
            />
            
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-accent/40" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-accent/40" />
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-8 -right-4 md:-right-12 z-20 bg-surface/90 backdrop-blur-2xl border border-white/10 p-6 min-w-[240px]"
          >
            <div className="flex flex-col gap-4 font-mono">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] text-secondary uppercase">Status</span>
                <span className="text-[10px] text-accent flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  AVAILABLE_FOR_WORK
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-secondary">PRIMARY_STACK</p>
                <p className="text-xs text-white">GEN_AI / ML / FULL_STACK</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-secondary">COORDINATES</p>
                <p className="text-xs text-white">11.9416° N, 79.8083° E</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <motion.div style={{ y: textY }}>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-accent" />
              <span className="font-mono text-accent text-sm tracking-[0.4em] uppercase">Who I Am</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-10">
              Architecting <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #CCFF00' }}>Cognitive</span> <br /> Solutions.
            </h2>

            <div className="space-y-8 max-w-lg">
              <p className="text-secondary text-xl leading-relaxed font-light">
                I am a specialized developer focused on bridging the gap between <span className="text-white font-medium">Generative AI</span> and <span className="text-white font-medium">Practical Systems</span>. My approach combines deep technical rigor with intuitive user experiences.
              </p>
              
              <div className="p-6 border-l-2 border-accent bg-white/[0.02]">
                <p className="italic text-secondary text-lg">
                  "Complexity is easy; simplicity is the ultimate sophistication in engineering."
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                {['ML_VISION', 'LLM_OPS', 'REACT_3D', 'SYSTEM_ARCH'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-mono tracking-widest text-secondary hover:text-white hover:bg-white/10 transition-colors">
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
