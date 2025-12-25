import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, Variants } from 'framer-motion';

const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const springValue = useSpring(0, { duration: 2000 });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

const BioStats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate path length for drawing animation
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="about" ref={containerRef} className="relative py-40 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto overflow-visible">
      
      {/* 
        SVG Connector Line
        - Removed strokeDasharray to allow pathLength to work correctly
        - Adjusted Z-index and Opacity for better visibility
      */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[400px] -ml-[200px] pointer-events-none z-0">
           <svg className="w-full h-full" viewBox="0 0 400 1200" preserveAspectRatio="none">
             <motion.path
               d="M 200 0 
                  Q 350 300 200 600 
                  T 200 1200"
               fill="none"
               stroke="#CCFF00"
               strokeWidth="4"
               style={{ 
                 pathLength, 
                 opacity: 0.8,
                 filter: "drop-shadow(0px 0px 8px rgba(204, 255, 0, 0.5))"
               }}
             />
           </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start relative z-10">
        
        {/* Bio Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid grid-cols-2 gap-6"
        >
          <motion.div variants={itemVariants} className="p-8 border border-white/10 bg-surface/50 backdrop-blur-sm rounded-none hover:border-accent/50 transition-colors duration-300">
            <h4 className="text-6xl font-display font-bold text-white mb-2">
              <Counter value={4} />+
            </h4>
            <p className="font-mono text-secondary text-sm uppercase tracking-wider">Years Experience</p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-8 border border-white/10 bg-surface/50 backdrop-blur-sm rounded-none hover:border-accent/50 transition-colors duration-300">
            <h4 className="text-6xl font-display font-bold text-white mb-2">
              <Counter value={30} />+
            </h4>
            <p className="font-mono text-secondary text-sm uppercase tracking-wider">Projects Shipped</p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-8 border border-white/10 bg-surface/50 backdrop-blur-sm rounded-none hover:border-accent/50 transition-colors duration-300">
            <h4 className="text-6xl font-display font-bold text-white mb-2">
              <Counter value={15} />+
            </h4>
            <p className="font-mono text-secondary text-sm uppercase tracking-wider">Happy Clients</p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-8 border border-white/10 bg-surface/50 backdrop-blur-sm rounded-none hover:border-accent/50 transition-colors duration-300">
            <h4 className="text-6xl font-display font-bold text-white mb-2">
              <Counter value={100} />%
            </h4>
            <p className="font-mono text-secondary text-sm uppercase tracking-wider">Job Success</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BioStats;