
import React, { Suspense, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, MessageCircle, ArrowRight, Power, PowerOff } from 'lucide-react';
import { Scene } from './Scene';
import Magnetic from './Magnetic';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
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
    <section ref={containerRef} id="home" className="relative h-screen w-full flex items-center overflow-hidden bg-background">
      
      {/* 3D Scene - Offset to the right to avoid overlap with left-aligned text */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full">
           <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
            <Scene isInView={isInView && is3DEnabled} />
          </Suspense>
        </div>
      </div>

      {/* Main UI Layer */}
      <div className="relative z-20 w-full h-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 flex flex-col justify-between pointer-events-none">
        
        {/* Top Header: Socials & VFX Switch */}
        <div className="flex justify-between items-start pt-8 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-accent tracking-[0.4em] uppercase font-black">DK_v1.0</span>
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">PUDUCHERRY, IN</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-6 md:gap-8"
          >
             {/* Social Links */}
             <div className="flex items-center gap-6 text-white/40 mr-4 border-r border-white/10 pr-8 hidden md:flex">
               <a href="https://github.com/Dinesh210805" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all duration-300">
                 <Github size={18} />
               </a>
               <a href="https://linkedin.com/in/dinesh-kumar-c-93a38129b" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all duration-300">
                 <Linkedin size={18} />
               </a>
               <a href="https://wa.me/919943125323" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all duration-300">
                 <MessageCircle size={18} />
               </a>
             </div>

             {/* VFX Toggle */}
             <button 
               onClick={() => setIs3DEnabled(!is3DEnabled)}
               className={`flex items-center gap-3 px-4 py-2 border transition-all duration-500 font-mono text-[9px] tracking-widest uppercase font-bold
                ${is3DEnabled 
                  ? 'border-accent/30 bg-accent/5 text-accent hover:bg-accent/10' 
                  : 'border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/20'}`}
             >
              {is3DEnabled ? <Power size={11} /> : <PowerOff size={11} />}
              {is3DEnabled ? 'RENDER_ON' : 'RENDER_OFF'}
            </button>
          </motion.div>
        </div>

        {/* Central Identity: Left Aligned to avoid 3D overlap */}
        <motion.div 
          style={{ y, opacity }}
          className="flex flex-col items-start text-left max-w-4xl"
        >
          <div className="flex flex-col gap-0 mb-10 select-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="w-8 h-[1px] bg-accent" />
              <span className="font-mono text-accent text-[10px] tracking-[0.5em] uppercase font-bold">Creative_Engineer</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-[12vw] md:text-[8vw] font-display font-black text-white leading-[0.8] tracking-tighter uppercase will-change-transform"
            >
              DINESH
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-[12vw] md:text-[8vw] font-display font-black text-transparent leading-[0.8] tracking-tighter uppercase will-change-transform"
              style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.15)' }}
            >
              KUMAR
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col gap-2"
          >
            <span className="font-display text-2xl md:text-5xl text-white font-medium tracking-tight uppercase">
              GEN AI & <span className="text-accent italic font-bold">ML ENGINEER</span>
            </span>
            <p className="font-mono text-[10px] md:text-[11px] text-white/40 uppercase tracking-[0.3em] max-w-md leading-relaxed">
              Bridging the gap between cognitive architectures and high-performance user interfaces.
            </p>
          </motion.div>
        </motion.div>

        {/* Footer Navigation: Left-Bottom */}
        <div className="flex justify-between items-end pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="hidden lg:flex flex-col gap-4 pointer-events-auto"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em]">Substrate_Status</span>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] text-white/60 tracking-widest uppercase">Available for new opportunities</span>
              </div>
            </div>
            
            {/* Quick Contact Icons for Footer */}
            <div className="flex gap-4 opacity-40 hover:opacity-100 transition-opacity">
               <a href="mailto:dinesh210805@gmail.com" className="hover:text-accent"><MessageCircle size={14} /></a>
               <a href="https://github.com/Dinesh210805" className="hover:text-accent"><Github size={14} /></a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="pointer-events-auto ml-auto"
          >
             <Magnetic strength={40}>
               <button 
                 onClick={handleScrollToWorks}
                 className="group relative flex items-center gap-10 py-5 pl-12 pr-5 bg-white/[0.02] border border-white/5 hover:border-accent/40 transition-all duration-500 cursor-none overflow-hidden backdrop-blur-md"
               >
                 <span className="font-mono text-[11px] font-bold text-white uppercase tracking-[0.5em] group-hover:text-accent transition-colors relative z-10">
                   Explore_Archive
                 </span>
                 <div className="w-14 h-14 bg-accent text-black flex items-center justify-center group-hover:scale-105 transition-all relative z-10">
                   <ArrowRight size={22} />
                 </div>
                 <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
             </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Atmospheric Accents */}
      <div className="absolute top-0 left-0 w-[1px] h-full bg-white/[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[1px] h-full bg-white/[0.03] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-white/[0.03] pointer-events-none" />
      
      {/* Vibe Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
    </section>
  );
};

export default Hero;
