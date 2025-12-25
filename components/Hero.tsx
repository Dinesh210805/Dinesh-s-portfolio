import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowDown, Github, Linkedin, MessageCircle, ArrowRight } from 'lucide-react';
import { Scene } from './Scene';
import Magnetic from './Magnetic';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const imgScale = useTransform(scrollY, [0, 500], [1, 1.2]);

  const handleScrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const worksSection = document.getElementById('works');
    if (worksSection) {
      window.lenis?.scrollTo(worksSection, { duration: 1.5 });
    }
  };

  return (
    <section ref={containerRef} id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Profile Image (Subtle Acid Overlay) */}
      <motion.div 
        style={{ opacity: useTransform(scrollY, [0, 400], [0.15, 0]), scale: imgScale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img 
          src="DinesProfile.jpg" 
          alt="" 
          className="w-full h-full object-cover grayscale mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </motion.div>

      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <Scene isInView={isInView} />
      </Suspense>

      <div className="relative z-10 w-full h-full max-w-[1600px] px-6 md:px-10 lg:px-12 grid grid-cols-[auto_1fr_auto] items-center pointer-events-none">
        
        <div className="hidden md:flex flex-col justify-between h-[60vh] pointer-events-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-[1px] h-32 bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>

          <div className="flex flex-col gap-6 text-white/50">
             <a href="https://linkedin.com/in/dinesh-kumar-c-93a38129b" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:scale-110 transition-all duration-300"><Linkedin size={20} /></a>
             <a href="mailto:dinesh210805@gmail.com" className="hover:text-accent hover:scale-110 transition-all duration-300"><MessageCircle size={20} /></a>
             <a href="https://github.com/Dinesh210805" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:scale-110 transition-all duration-300"><Github size={20} /></a>
          </div>
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="flex flex-col items-center text-center justify-center h-full pointer-events-auto"
        >
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-3"
           >
             <div className="w-6 h-6 rounded-full overflow-hidden border border-accent/30">
                <img src="DinesProfile.jpg" className="w-full h-full object-cover" alt="DK" />
             </div>
             <span className="text-sm font-sans text-white/80 uppercase tracking-widest">GEN AI & ML ENGINEER</span>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="relative mb-10"
           >
             <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white tracking-tight leading-[1.1]">
               DINESH <br /> KUMAR C
             </h1>
             <h1 
               className="text-4xl md:text-6xl lg:text-8xl font-display font-bold text-transparent tracking-tight leading-[1.1] mt-4"
               style={{ WebkitTextStroke: '1px #F4F4F5' }}
             >
               GEN AI & ML ENGINEER<span className="text-accent">.</span>
             </h1>
           </motion.div>

           <Magnetic strength={30}>
            <motion.button
              onClick={handleScrollToWorks}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="group flex items-center gap-3 px-8 py-4 bg-accent text-black font-bold rounded-full hover:bg-white transition-colors duration-300 cursor-none"
            >
              Explore Intelligence
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
           </Magnetic>
        </motion.div>

        <div className="hidden md:flex flex-col justify-center h-[60vh] pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="writing-vertical-rl text-xs font-mono tracking-[0.2em] text-white/40 rotate-180"
          >
            GEN_AI • ML • FULL STACK
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 pointer-events-auto"
      >
        <span className="text-sm font-light tracking-widest lowercase">scrolling context</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;