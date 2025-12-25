
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
    role: 'B.Tech IT',
    company: 'SMV Engineering College',
    status: 'IN_PROGRESS',
    achievement: '8.91 CGPA',
    details: 'Core engineering, system design, and advanced algorithmic studies.'
  },
  {
    id: 2,
    year: '2021 – 2022',
    dateRange: '2021 – 2022',
    role: 'HSC Education',
    company: 'Amalorpavam HSS',
    status: 'MASTERED',
    achievement: '91.83%',
    details: 'Focus on Mathematics and Computer Science fundamentals.'
  },
  {
    id: 1,
    year: '2019 – 2020',
    role: 'High School',
    dateRange: '2019 – 2020',
    company: 'Amalorpavam HSS',
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
  const scannerY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="experience" className="relative py-24 md:py-60 px-6 md:px-10 lg:px-20 max-w-[1400px] mx-auto overflow-visible">
      
      {/* SECTION HEADER */}
      <div className="mb-24 md:mb-40 relative z-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6 md:mb-8"
        >
          <div className="w-8 md:w-12 h-[1px] bg-accent" />
          <span className="font-mono text-accent text-[10px] md:text-sm tracking-[0.4em] uppercase">Progression_Matrix</span>
        </motion.div>
        
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white tracking-tighter leading-[1.1] md:leading-[0.8] mb-4 uppercase">
          CAREER <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #CCFF00' }}>LEVELS.</span>
        </h2>
      </div>

      <div className="relative">
        {/* Main Background Track */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />
        
        {/* Active Data Path */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-6 md:left-1/2 top-0 w-[1px] bg-accent -translate-x-1/2 z-10 origin-top shadow-[0_0_15px_rgba(204,255,0,0.3)]"
        />

        {/* Floating Laser Scanner Marker - Only visible on medium+ screens */}
        <motion.div 
          style={{ top: scannerY }}
          className="absolute left-6 md:left-1/2 w-32 md:w-40 h-[1px] bg-accent -translate-x-1/2 z-30 pointer-events-none hidden md:block"
        >
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-accent font-bold tracking-widest whitespace-nowrap">
             SCAN_PATH...
           </div>
        </motion.div>

        <div className="space-y-32 md:space-y-64 pb-20 md:pb-40">
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
      
      <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div 
          animate={isInView ? { scale: 1.1, backgroundColor: '#CCFF00', borderColor: '#CCFF00' } : { scale: 1, backgroundColor: '#050505', borderColor: 'rgba(255,255,255,0.1)' }}
          className="w-10 h-10 md:w-12 md:h-12 border-2 flex items-center justify-center transition-all duration-500 overflow-hidden"
        >
          <span className={`font-mono font-black text-xs md:text-sm transition-colors duration-500 ${isInView ? 'text-black' : 'text-secondary/40'}`}>
            0{exp.id}
          </span>
        </motion.div>
      </div>

      <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-24 md:text-right' : 'md:ml-auto md:pl-24'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group/card"
        >
          <div className={`flex flex-col mb-4 md:mb-6 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-2">
              <span className="font-mono text-[8px] md:text-[9px] text-accent tracking-[0.3em] font-bold uppercase">Entry_0{exp.id}</span>
              <div className="w-6 md:w-8 h-[1px] bg-accent/20" />
              <span className={`font-mono text-[8px] md:text-[9px] tracking-widest ${exp.status === 'IN_PROGRESS' ? 'text-yellow-400 animate-pulse' : 'text-secondary'}`}>
                {exp.status}
              </span>
            </div>
            <p className="font-mono text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.2em]">{exp.dateRange}</p>
          </div>

          <div className="relative p-0.5 bg-white/5 group-hover/card:bg-accent/20 transition-all duration-700">
             <div className="bg-background/90 backdrop-blur-3xl p-6 md:p-10 relative overflow-hidden">
                <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} px-3 py-1 bg-accent/10 border-b border-white/5 text-accent font-mono text-[7px] md:text-[8px] font-bold tracking-widest`}>
                  {exp.achievement}
                </div>

                <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 md:mb-6 leading-tight uppercase group-hover/card:text-accent transition-colors duration-500 break-words">
                   {exp.role}
                </h3>
                
                <p className="text-lg md:text-xl text-secondary font-light mb-6 md:mb-8 group-hover/card:text-white transition-colors">
                  {exp.company}
                </p>

                <div className={`flex items-start gap-3 md:gap-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                   <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent mt-1.5 shrink-0" />
                   <p className="text-xs md:text-sm text-white/50 leading-relaxed font-mono tracking-tight max-w-sm">
                     {exp.details}
                   </p>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
