
import React, { Suspense, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Github, Linkedin, ArrowRight, Zap, ZapOff, Mail, Globe, Command } from 'lucide-react';
import { Scene } from './Scene';
import Magnetic from './Magnetic';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const [is3DEnabled, setIs3DEnabled] = useState(true);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const handleScrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const worksSection = document.getElementById('works');
    if (worksSection) {
      window.lenis?.scrollTo(worksSection, { duration: 1.5 });
    }
  };

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen w-full flex items-center overflow-hidden bg-background">
      
      {/* 3D Scene Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-3/4 lg:w-2/3 h-full">
           <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
            <Scene isInView={isInView && is3DEnabled} />
          </Suspense>
        </div>
      </div>

      {/* VFX Control */}
      <div className="absolute top-[60%] md:top-[55%] right-[5%] md:right-[15%] z-40 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button 
            onClick={() => setIs3DEnabled(!is3DEnabled)}
            className={`group flex items-center gap-3 px-4 py-2 md:px-5 md:py-3 border transition-all duration-500 backdrop-blur-xl rounded-sm
              ${is3DEnabled 
                ? 'border-accent/30 bg-accent/5 text-accent' 
                : 'border-white/10 bg-white/5 text-white/40 hover:text-white'}`}
          >
            <div className="relative">
              {is3DEnabled ? <Zap size={12} className="animate-pulse" /> : <ZapOff size={12} />}
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-mono text-[5px] md:text-[6px] tracking-[0.3em] font-black uppercase opacity-50 mb-1">Engine</span>
              <span className="font-mono text-[8px] md:text-[9px] tracking-widest uppercase font-bold">
                {is3DEnabled ? 'LIVE' : 'IDLE'}
              </span>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-20 w-full h-full max-w-[1600px] mx-auto px-6 md:px-12 py-20 flex flex-col justify-between pointer-events-none">
        
        <div className="h-12 md:h-20" />

        <motion.div 
          style={{ y, opacity }}
          className="flex flex-col items-start text-left max-w-2xl lg:max-w-3xl"
        >
          <div className="flex flex-col gap-0 mb-8 md:mb-12 select-none w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-4 mb-6 md:mb-10"
            >
              <div className="w-6 md:w-8 h-[1px] bg-accent/40" />
              <span className="font-mono text-accent text-[8px] md:text-[9px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold">Creative Architect</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-[11vw] md:text-[5.5vw] lg:text-[4.5vw] font-display font-black text-white leading-[0.9] tracking-tighter uppercase will-change-transform"
            >
              DINESH
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-[11vw] md:text-[5.5vw] lg:text-[4.5vw] font-display font-black text-transparent leading-[0.9] tracking-tighter uppercase will-change-transform"
              style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)' }}
            >
              KUMAR
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col gap-4 md:gap-6"
          >
            <span className="font-display text-xl md:text-3xl lg:text-4xl text-white font-medium tracking-tight uppercase">
              GEN AI & <span className="text-accent italic font-bold">ML ENGINEER</span>
            </span>
            <p className="font-mono text-[9px] md:text-[11px] text-white/30 uppercase tracking-[0.3em] md:tracking-[0.4em] max-w-xs md:max-w-sm leading-relaxed border-l border-accent/20 pl-4 md:pl-6">
              Processing patterns to build high-performance systems and cognitive solutions.
            </p>
          </motion.div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12 pt-12 md:pb-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col gap-4 md:gap-5 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[8px] md:text-[9px] text-white/60 tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold">Open for opportunities</span>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 md:gap-3 font-mono text-[7px] md:text-[8px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em]">
                <Globe size={10} className="text-white/40" />
                <span>PUDUCHERRY</span>
              </div>
              <div className="w-[1px] h-3 bg-white/10" />
              <div className="flex items-center gap-2 md:gap-3 font-mono text-[7px] md:text-[8px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em]">
                <Command size={10} className="text-white/40" />
                <span>0x21_NODE</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col items-start md:items-end gap-6 md:gap-8 pointer-events-auto w-full md:w-auto"
          >
            <div className="flex items-center gap-6 p-2 px-6 bg-white/[0.03] border border-white/5 backdrop-blur-md rounded-full">
               <a href="https://github.com/Dinesh210805" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-accent transition-all duration-300">
                 <Github size={16} />
               </a>
               <div className="w-[1px] h-4 bg-white/10" />
               <a href="https://linkedin.com/in/dinesh-kumar-c-93a38129b" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-accent transition-all duration-300">
                 <Linkedin size={16} />
               </a>
               <div className="w-[1px] h-4 bg-white/10" />
               <a href="mailto:dinesh210805@gmail.com" className="text-white/30 hover:text-accent transition-all duration-300">
                 <Mail size={16} />
               </a>
            </div>

            <Magnetic strength={40}>
               <button 
                 onClick={handleScrollToWorks}
                 className="group relative flex items-center gap-6 md:gap-10 py-4 md:py-5 pl-8 md:pl-12 pr-4 md:pr-5 bg-white/[0.02] border border-white/5 hover:border-accent/40 transition-all duration-500 cursor-none overflow-hidden backdrop-blur-md"
               >
                 <span className="font-mono text-[9px] md:text-[10px] font-bold text-white uppercase tracking-[0.4em] md:tracking-[0.5em] group-hover:text-accent transition-colors relative z-10">
                   Explore_Archive
                 </span>
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-accent text-black flex items-center justify-center group-hover:scale-105 transition-all relative z-10">
                   <ArrowRight size={18} />
                 </div>
                 <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
    </section>
  );
};

export default Hero;
