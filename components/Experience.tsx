import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';

const experiences = [
  {
    id: 5,
    year: '2024',
    dateRange: 'JUL 2024 – OCT 2024',
    role: 'Associate AI Intern',
    company: 'Nuevera Infotech',
    status: 'COMPLETED',
    achievement: 'AI/ML Implementation',
    details: 'Deployment of neural architectures for industrial workflows.'
  },
  {
    id: 4,
    year: '2024',
    dateRange: 'SEP 2024 – NOV 2024',
    role: 'Generative AI Intern',
    company: 'Flaunch Emerging Tech Internship',
    status: 'COMPLETED',
    achievement: 'RAG Pipeline Dev',
    details: 'Engineered LLM-based solutions and retrieval-augmented systems.'
  },
  {
    id: 3,
    year: '2022 – 2026',
    dateRange: '2022 – PRESENT',
    role: 'Bachelor of Technology in Information Technology',
    company: 'Sri Manakula Vinayagar Engineering College',
    status: 'IN_PROGRESS',
    achievement: '8.91 CGPA',
    details: 'Core engineering, system design, and advanced algorithmic studies.'
  },
  {
    id: 2,
    year: '2021 – 2022',
    dateRange: '2021 – 2022',
    role: 'Higher Secondary Education',
    company: 'Amalorpavam Higher Secondary School',
    status: 'MASTERED',
    achievement: '91.83%',
    details: 'Focus on Mathematics and Computer Science fundamentals.'
  },
  {
    id: 1,
    year: '2019 – 2020',
    role: 'High School',
    dateRange: '2019 – 2020',
    company: 'Amalorpavam Higher Secondary School',
    status: 'MASTERED',
    achievement: '86.2%',
    details: 'Early academic foundation and logic development.'
  }
];

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  // Laser scanner position
  const scannerY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="experience" className="relative py-60 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto overflow-visible">
      
      {/* SECTION HEADER */}
      <div className="mb-40 relative z-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-[1px] bg-accent" />
          <span className="font-mono text-accent text-sm tracking-[0.4em] uppercase">Progression_Matrix</span>
        </motion.div>
        
        <h2 className="text-7xl md:text-9xl font-display font-bold text-white tracking-tighter leading-[0.8] mb-4">
          CAREER <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #CCFF00' }}>LEVELS.</span>
        </h2>
        
        <div className="flex gap-10 font-mono text-[10px] text-secondary/40 uppercase tracking-[0.2em] mt-12">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent/20 border border-accent/40" />
            <span>Path_Linear</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <span>Nodes: 0{experiences.length}</span>
          </div>
        </div>
      </div>

      {/* THE TIMELINE BUS */}
      <div className="relative">
        {/* Main Background Track */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />
        
        {/* Active Data Path */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-6 md:left-1/2 top-0 w-[1px] bg-gradient-to-b from-accent/0 via-accent to-accent/0 -translate-x-1/2 z-10 origin-top shadow-[0_0_20px_rgba(204,255,0,0.4)]"
        />

        {/* Floating Laser Scanner Marker */}
        <motion.div 
          style={{ top: scannerY }}
          className="absolute left-6 md:left-1/2 w-40 h-[1px] bg-accent -translate-x-1/2 z-30 pointer-events-none hidden md:block"
        >
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 bg-accent rounded-full shadow-[0_0_10px_#CCFF00]" />
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 bg-accent rounded-full shadow-[0_0_10px_#CCFF00]" />
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-accent font-bold tracking-widest whitespace-nowrap">
             SCANNING_PATH...
           </div>
        </motion.div>

        <div className="space-y-40 md:space-y-64 pb-40">
          {experiences.map((exp, index) => (
            <TimelineNode 
              key={exp.id} 
              exp={exp} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineNode: React.FC<{ exp: any, index: number }> = ({ exp, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row items-start md:items-center group">
      
      {/* NODE MARKER */}
      <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div 
          animate={isInView ? { scale: 1.1, backgroundColor: '#CCFF00', borderColor: '#CCFF00' } : { scale: 1, backgroundColor: '#050505', borderColor: 'rgba(255,255,255,0.1)' }}
          className="w-12 h-12 border-2 flex items-center justify-center transition-all duration-500 overflow-hidden"
        >
          <span className={`font-mono font-black text-sm transition-colors duration-500 ${isInView ? 'text-black' : 'text-secondary/40'}`}>
            0{exp.id}
          </span>
          
          {/* Node pulse effect */}
          {isInView && (
            <motion.div 
              layoutId="node-pulse"
              className="absolute inset-0 bg-accent animate-ping opacity-20"
            />
          )}
        </motion.div>
      </div>

      {/* NODE GHOST TYPE (Background) */}
      <motion.div 
        animate={{ opacity: isInView ? 0.08 : 0.02, x: isInView ? 0 : isEven ? 50 : -50 }}
        className={`hidden lg:block absolute top-1/2 -translate-y-1/2 pointer-events-none select-none font-display font-black text-[15vw] leading-none transition-all duration-1000 ${isEven ? 'right-0 text-accent' : 'left-0 text-white'}`}
      >
        LVL_0{exp.id}
      </motion.div>

      {/* MODULE CARD */}
      <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-32 md:text-right' : 'md:ml-auto md:pl-32'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group/card"
        >
          {/* Card Meta Header */}
          <div className={`flex flex-col mb-6 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-[9px] text-accent tracking-[0.3em] font-bold uppercase">Archive_Entry_0{exp.id}</span>
              <div className="w-8 h-[1px] bg-accent/20" />
              <span className={`font-mono text-[9px] tracking-widest ${exp.status === 'IN_PROGRESS' ? 'text-yellow-400 animate-pulse' : 'text-secondary'}`}>
                {exp.status}
              </span>
            </div>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">{exp.dateRange}</p>
          </div>

          {/* Main Content Card */}
          <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent hover:from-accent/40 transition-all duration-700">
             <div className="bg-background/90 backdrop-blur-3xl p-8 md:p-12 relative overflow-hidden">
                {/* Scanner Overlay on Hover */}
                <div className="absolute inset-0 bg-accent/5 translate-y-[-100%] group-hover/card:translate-y-[100%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
                
                {/* Achievement Badge */}
                <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} px-4 py-1 bg-accent/10 border-b border-r md:border-l border-accent/20 text-accent font-mono text-[8px] font-bold tracking-widest`}>
                  {exp.achievement}
                </div>

                <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-[0.9] tracking-tighter uppercase group-hover/card:text-accent transition-colors duration-500">
                   {exp.role}
                </h3>
                
                <p className="text-xl text-secondary font-light mb-8 group-hover/card:text-white transition-colors">
                  {exp.company}
                </p>

                <div className={`flex items-start gap-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                   <div className="w-1.5 h-1.5 bg-accent mt-1.5 flex-shrink-0" />
                   <p className="text-xs md:text-sm text-white/50 leading-relaxed font-mono tracking-tight max-w-sm">
                     {exp.details}
                   </p>
                </div>
             </div>
          </div>

          {/* Connection Branch Wire */}
          <div className={`hidden md:block absolute top-1/2 w-32 h-[1px] bg-gradient-to-r from-white/0 via-white/10 to-accent/40 -translate-y-1/2 ${isEven ? 'left-full' : 'right-full rotate-180'}`} />
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
