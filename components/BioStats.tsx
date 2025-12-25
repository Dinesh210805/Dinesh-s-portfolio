import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, Variants } from 'framer-motion';

const Counter = ({ value, decimals = 0 }: { value: number, decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const springValue = useSpring(0, { duration: 2000 });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(latest.toFixed(decimals));
    });
  }, [springValue, decimals]);

  return <span ref={ref}>{displayValue}</span>;
};

const BioStats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const stack = [
    { cat: "AI/ML", items: ["PyTorch", "TensorFlow", "YOLOv8", "OpenCV", "Scikit-Learn"] },
    { cat: "GenAI", items: ["LangChain", "RAG", "LLaMA-3", "Whisper", "ChromaDB"] },
    { cat: "Web", items: ["React", "Three.js", "Flask", "Tailwind", "PostgreSQL"] },
    { cat: "DevOps", items: ["Docker", "Git", "Cloud Run", "Weights & Biases"] }
  ];

  return (
    <section id="about" ref={containerRef} className="relative py-40 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto overflow-visible">
      
      {/* Scroll-driven Background Path */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[400px] -ml-[200px] pointer-events-none z-0">
           <svg className="w-full h-full" viewBox="0 0 400 1200" preserveAspectRatio="none">
             <motion.path
               d="M 200 0 Q 380 300 200 600 T 200 1200"
               fill="none"
               stroke="#CCFF00"
               strokeWidth="2"
               style={{ 
                 pathLength, 
                 opacity: 0.4,
                 filter: "drop-shadow(0px 0px 8px rgba(204, 255, 0, 0.3))"
               }}
             />
           </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* About & Education Text */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-accent mb-6 block text-lg tracking-widest uppercase italic">The Philosophy</span>
            <h3 className="text-4xl md:text-5xl font-sans font-bold leading-tight text-white mb-10">
              Driven by <span className="text-accent italic">Curiosity</span>,<br /> Focused on Performance.
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <p className="text-secondary text-lg leading-relaxed">
                  My work is centered around the belief that AI should be more than just a chatbot. I build systems that process visual data, understand context, and solve logistics problems in the real world.
                </p>
                <div className="p-6 border border-white/10 bg-surface/50 rounded-none relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-accent group-hover:h-full transition-all duration-500" />
                  <span className="font-mono text-[10px] text-accent uppercase block mb-2">Academic Excellence</span>
                  <p className="text-white text-sm">
                    Currently maintaining a <span className="font-bold">8.91 CGPA</span> at SMV Engineering College, specializing in Information Technology.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-mono text-xs text-secondary uppercase tracking-[0.3em] mb-4">Technical Arsenal</h4>
                <div className="grid grid-cols-1 gap-4">
                  {stack.map((s, idx) => (
                    <div key={idx} className="border-b border-white/5 pb-3">
                      <span className="font-mono text-[9px] text-accent mb-1 block">{s.cat}</span>
                      <p className="text-xs text-secondary flex flex-wrap gap-2">
                        {s.items.join(' • ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="lg:col-span-5">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full"
          >
            {[
              { label: "AI_INTERNSHIPS", value: 2, suffix: "", desc: "Industrial experience" },
              { label: "CORE_SYSTEMS", value: 5, suffix: "+", desc: "End-to-end projects" },
              { label: "CGPA_SCORE", value: 8.91, suffix: "", dec: 2, desc: "Academic standard" },
              { label: "SOLVE_RATE", value: 100, suffix: "%", desc: "Commitment to results" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={itemVariants} 
                className="p-8 border border-white/5 bg-surface/30 backdrop-blur-xl flex flex-col justify-between hover:bg-surface/50 hover:border-accent/20 transition-all duration-500 group"
              >
                <div>
                  <span className="font-mono text-[10px] text-secondary group-hover:text-accent transition-colors">{stat.label}</span>
                  <h4 className="text-5xl md:text-6xl font-display font-bold text-white mt-4 mb-2">
                    <Counter value={stat.value} decimals={stat.dec} />{stat.suffix}
                  </h4>
                </div>
                <p className="font-mono text-[10px] text-secondary tracking-widest mt-4 group-hover:translate-x-1 transition-transform">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Educational Timeline Snippet */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-10 font-mono text-[10px] text-secondary uppercase tracking-[0.2em]"
      >
        <div className="flex flex-col gap-2">
          <span className="text-accent">[B.TECH]</span>
          <span>SMV Engineering College</span>
          <span className="text-white">IT Specialization</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-accent">[HSC]</span>
          <span>Amalorpavam HSS</span>
          <span className="text-white">Score: 91.83%</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-accent">[CERT]</span>
          <span>Full Stack Diploma</span>
          <span className="text-white">Specialist Level</span>
        </div>
      </motion.div>
    </section>
  );
};

export default BioStats;