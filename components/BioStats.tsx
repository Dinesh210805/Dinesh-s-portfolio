import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BioStats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate path length for drawing animation
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="about" ref={containerRef} className="relative py-32 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start relative">
        
        {/* SVG Connector Line (Desktop only mostly) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[200px] -ml-[100px] pointer-events-none z-0">
             <svg className="w-full h-full" viewBox="0 0 200 600" preserveAspectRatio="none">
               <motion.path
                 d="M 20 0 Q 180 100 100 300 T 180 600"
                 fill="none"
                 stroke="#CCFF00"
                 strokeWidth="2"
                 style={{ pathLength, opacity: 0.5 }}
               />
             </svg>
        </div>

        {/* Bio Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="font-mono text-accent mb-6 block text-lg">01. About</span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium leading-tight text-primary">
            I help companies build <span className="text-accent">scalable</span> web applications and intuitive digital experiences.
            Bridging the gap between engineering and design to create products that feel alive.
          </h3>
          <p className="mt-8 text-secondary text-lg leading-relaxed max-w-xl">
            With a deep understanding of the MERN stack and modern frontend architecture, I craft pixel-perfect interfaces backed by robust logic. 
            Currently focused on WebGL interactions and performance optimization.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 grid grid-cols-2 gap-6"
        >
          <div className="p-8 border border-white/10 bg-surface/50 backdrop-blur-sm rounded-none hover:border-accent/50 transition-colors duration-300">
            <h4 className="text-6xl font-display font-bold text-white mb-2">4+</h4>
            <p className="font-mono text-secondary text-sm uppercase tracking-wider">Years Experience</p>
          </div>
          <div className="p-8 border border-white/10 bg-surface/50 backdrop-blur-sm rounded-none hover:border-accent/50 transition-colors duration-300">
            <h4 className="text-6xl font-display font-bold text-white mb-2">30+</h4>
            <p className="font-mono text-secondary text-sm uppercase tracking-wider">Projects Shipped</p>
          </div>
          <div className="p-8 border border-white/10 bg-surface/50 backdrop-blur-sm rounded-none hover:border-accent/50 transition-colors duration-300">
            <h4 className="text-6xl font-display font-bold text-white mb-2">15+</h4>
            <p className="font-mono text-secondary text-sm uppercase tracking-wider">Happy Clients</p>
          </div>
          <div className="p-8 border border-white/10 bg-surface/50 backdrop-blur-sm rounded-none hover:border-accent/50 transition-colors duration-300">
            <h4 className="text-6xl font-display font-bold text-white mb-2">100%</h4>
            <p className="font-mono text-secondary text-sm uppercase tracking-wider">Job Success</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BioStats;