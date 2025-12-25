<<<<<<< HEAD
import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, MessageCircle, Twitter, ArrowRight } from 'lucide-react';
=======
import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowDown, Github, Linkedin, MessageCircle, ArrowRight } from 'lucide-react';
>>>>>>> 8795f5ff4bf77324dbe5dc6c0a3eae323b003b2c
import { Scene } from './Scene';
import Magnetic from './Magnetic';

const Hero: React.FC = () => {
<<<<<<< HEAD
  const [use3D, setUse3D] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowSpec = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
    const enable3DFlag = import.meta.env.VITE_ENABLE_3D === 'true';

    // Default to video to minimize GPU; enable 3D only when explicitly allowed and the device looks capable.
    setUse3D(enable3DFlag && !prefersReduce && !lowSpec);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background: lightweight looping video by default, opt-in 3D when enabled */}
      {use3D ? (
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <Scene />
        </Suspense>
      ) : (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src="/hero-loop.webm"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoFailed(true)}
          />
          {videoFailed && <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b] via-[#090909] to-[#050505]" />}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </>
      )}
=======
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef); // Detects if Hero section is visible

  const { scrollY } = useScroll();
  
  // Adjusted parallax: 
  // Before: [0, 500] -> [0, 200] (This made it scroll FASTER than the page)
  // After: [0, 800] -> [0, -150] (This makes it scroll SLOWER/Resist the page, which is true parallax)
  const y = useTransform(scrollY, [0, 800], [0, -150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section ref={containerRef} id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        {/* Pass isInView prop to pause rendering when scrolled away */}
        <Scene isInView={isInView} />
      </Suspense>
>>>>>>> 8795f5ff4bf77324dbe5dc6c0a3eae323b003b2c

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

        {/* Center Content with Parallax */}
        <motion.div 
          style={{ y, opacity }}
          className="flex flex-col items-center text-center justify-center h-full pointer-events-auto"
        >
           
           {/* Pill Badge */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
           >
             <span className="text-sm font-sans text-white/80">Hi, I'm Dinesh</span>
           </motion.div>

           {/* Big Headline */}
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="relative mb-10"
           >
             <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white tracking-tight leading-[1.1]">
               FULL-STACK <br /> DEVELOPER
             </h1>
             <h1 
               className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-transparent tracking-tight leading-[1.1]"
               style={{ WebkitTextStroke: '1px #F4F4F5' }}
             >
               UI & UX DESIGNER<span className="text-accent">.</span>
             </h1>
           </motion.div>

           {/* CTA Button */}
           <Magnetic strength={30}>
            <motion.a
              href="#works"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="group flex items-center gap-3 px-8 py-4 bg-accent text-black font-bold rounded-full hover:bg-white transition-colors duration-300"
            >
              See My Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
           </Magnetic>
        </motion.div>

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
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 pointer-events-auto"
      >
        <span className="text-sm font-light tracking-widest lowercase">scroll down</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.div>

    </section>
  );
};

export default Hero;