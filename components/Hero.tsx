import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import Scene from './Scene';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <Scene />
      </Suspense>

      {/* Grid Layout Container */}
      <div className="relative z-10 w-full h-full max-w-[1600px] px-6 md:px-10 lg:px-12 grid grid-cols-[auto_1fr_auto] items-center pointer-events-none">
        
        {/* Left Sidebar: Line & Socials */}
        <div className="hidden md:flex flex-col justify-between h-[60vh] pointer-events-auto">
          {/* Vertical Line */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-[1px] h-32 bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>

          {/* Social Icons */}
          <div className="flex flex-col gap-6 text-white/50">
             <a href="#" className="hover:text-accent hover:scale-110 transition-all duration-300"><Linkedin size={20} /></a>
             <a href="#" className="hover:text-accent hover:scale-110 transition-all duration-300"><MessageCircle size={20} /></a>
             <a href="#" className="hover:text-accent hover:scale-110 transition-all duration-300"><Github size={20} /></a>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center justify-center h-full">
           
           {/* Intro Text */}
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-lg md:text-xl font-sans text-white/80 mb-6"
           >
             Hi! I'm Dinesh
           </motion.p>

           {/* Big Headline */}
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="relative"
           >
             <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-medium text-white tracking-tight leading-[1.1]">
               Full-stack Developer
             </h1>
             <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-medium text-white tracking-tight leading-[1.1]">
               UI & UX Designer<span className="text-accent">.</span>
             </h1>
           </motion.div>
        </div>

        {/* Right Sidebar: Vertical Name */}
        <div className="hidden md:flex flex-col justify-center h-[60vh] pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="writing-vertical-rl text-xs font-mono tracking-[0.2em] text-white/40 rotate-180"
          >
            DINESH KUMAR DEV
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 pointer-events-auto"
      >
        <span className="text-sm font-light tracking-widest lowercase">scroll down</span>
      </motion.div>

    </section>
  );
};

export default Hero;