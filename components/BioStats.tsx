import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, Variants } from 'framer-motion';

import ScrollReveal from './ui/scroll-reveal';

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
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stack = [
    { cat: "Languages", items: ["Python", "Java", "C", "SQL", "HTML/CSS"] },
    { cat: "Generative AI", items: ["RAG", "Multi-Agent Systems", "QLoRA", "LangGraph", "LangChain"] },
    { cat: "AI & ML", items: ["Gemini API", "Groq API", "YOLOv8", "OpenCV", "MCP", "TensorFlow"] },
    { cat: "Backend & Cloud", items: ["FastAPI", "Flask", "WebRTC", "Docker", "Google Cloud Run"] }
  ];

  return (
    <section id="about" ref={containerRef} className="w-full bg-background text-primary py-16 md:py-32 overflow-visible transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative">
        {/* Scroll-driven Background Path */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[400px] -ml-[200px] pointer-events-none z-0">
             <svg className="w-full h-full" viewBox="0 0 400 1200" preserveAspectRatio="none">
               <motion.path
                 d="M 200 0 Q 380 300 200 600 T 200 1200"
                 fill="none"
                 stroke="#ffffff"
                 strokeWidth="1.5"
                 style={{ 
                   pathLength, 
                   opacity: 0.08,
                 }}
               />
             </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          
          {/* About & Education Text */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-0">
              <ScrollReveal delay={0.1}>
                <span className="font-mono text-accent mb-6 block text-lg tracking-widest uppercase italic font-bold">[ The Philosophy ]</span>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <h3 className="text-4xl md:text-5xl font-sans font-bold leading-tight text-primary mb-10">
                  Driven by <span className="underline decoration-white/30 decoration-2 italic">Curiosity</span>,<br /> Focused on Performance.
                </h3>
              </ScrollReveal>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <ScrollReveal delay={0.3} className="space-y-6">
                  <p className="text-secondary text-lg leading-relaxed font-light">
                    Technology should solve real problems, not just generate responses. I build intelligent systems that bridge the gap between cutting-edge innovation and practical impact—turning complex challenges into elegant solutions.
                  </p>
                  <div className="p-6 border border-white/10 bg-surface rounded-none relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-[2px] h-0 bg-accent group-hover:h-full transition-all duration-500" />
                    <span className="font-mono text-[10px] text-accent uppercase block mb-2 font-bold">Academic Excellence</span>
                    <p className="text-secondary text-sm">
                      Currently maintaining a <span className="font-bold text-primary">9.07 CGPA</span> at SMVEC, specializing in Information Technology.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.4} className="space-y-6">
                  <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-[0.3em] mb-4 font-bold">Technical Arsenal</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {stack.map((s, idx) => (
                      <div key={idx} className="border-b border-white/10 pb-3">
                        <span className="font-mono text-[9px] text-accent mb-1 block font-bold">{s.cat}</span>
                        <p className="text-xs text-neutral-400 flex flex-wrap gap-2 font-light">
                          {s.items.join(' • ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
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
                { label: "CGPA_SCORE", value: 9.07, suffix: "", dec: 2, desc: "Academic standard" },
                { label: "SOLVE_RATE", value: 100, suffix: "%", desc: "Commitment to results" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants} 
                  className="p-8 border border-white/10 bg-surface flex flex-col justify-between hover:bg-surface/80 hover:border-white/30 transition-all duration-500 group shadow-sm"
                >
                  <div>
                    <span className="font-mono text-[10px] text-neutral-400 group-hover:text-accent transition-colors font-bold">{stat.label}</span>
                    <h4 className="text-5xl md:text-6xl font-display font-bold text-primary mt-4 mb-2">
                      <Counter value={stat.value} decimals={stat.dec} />{stat.suffix}
                    </h4>
                  </div>
                  <p className="font-mono text-[10px] text-neutral-400 tracking-widest mt-4 group-hover:translate-x-1 transition-transform">{stat.desc}</p>
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
          className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 font-mono text-[10px] text-neutral-400 uppercase tracking-[0.2em]"
        >
          <div className="flex flex-col gap-2">
            <span className="text-accent font-bold">[B.TECH]</span>
            <span>SMVEC</span>
            <span className="text-primary font-semibold">IT Specialization</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-accent font-bold">[HSC]</span>
            <span>Amalorpavam Higher Secondary School</span>
            <span className="text-primary font-semibold">Percentage: 91.83%</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-accent font-bold">[SSLC]</span>
            <span>Amalorpavam Higher Secondary School</span>
            <span className="text-primary font-semibold">Percentage: 86.2%</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BioStats;