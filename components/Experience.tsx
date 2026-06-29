import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';

const experiences = [
  {
    id: 5,
    year: '2024',
    dateRange: 'OCT 2024 – NOV 2024',
    role: 'Generative AI Intern',
    company: 'AICTE 1M1B Flaunch',
    status: 'COMPLETED',
    achievement: 'LangLearn & EcoBot',
    details: 'Built LangLearn (JSON schema-enforced learning platform) & EcoBot (Fine-tuned LLaMA 3 8B with QLoRA, RAG pipeline).'
  },
  {
    id: 4,
    year: '2024',
    dateRange: 'JUL 2024 – OCT 2024',
    role: 'Associate AI Intern',
    company: 'Nuevera Infotech Pvt. Ltd.',
    status: 'COMPLETED',
    achievement: 'StayBot Dev',
    details: 'Architected an AI travel assistant using LangGraph ReAct agent (LLaMA 3.3-70B) routing across 15 specialised tools & Pinecone.'
  },
  {
    id: 3,
    year: '2022 – 2026',
    dateRange: '2022 – PRESENT',
    role: 'B.Tech IT',
    company: 'SMV Engineering College',
    status: 'IN_PROGRESS',
    achievement: '9.07 CGPA',
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
    <section ref={containerRef} id="experience" className="relative py-16 md:py-40 px-6 md:px-10 lg:px-20 mx-auto w-full bg-white transition-colors duration-500 overflow-visible">
      
      <div className="max-w-[1400px] mx-auto w-full relative">
        {/* SECTION HEADER */}
        <div className="mb-12 md:mb-32 relative z-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <div className="w-8 md:w-12 h-[1px] bg-accent" />
            <span className="font-mono text-accent font-bold text-[10px] md:text-sm tracking-[0.4em] uppercase">Career Timeline</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold text-black tracking-tighter leading-[1] mb-4 uppercase">
            CAREER <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #000000' }}>LEVELS.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Main Background Track */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-black/10 -translate-x-1/2" />
          
          {/* Active Data Path */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[1px] bg-black -translate-x-1/2 z-10 origin-top shadow-[0_0_15px_rgba(0,0,0,0.2)]"
          />

          {/* Floating Laser Scanner Marker - Only visible on medium+ screens */}
          <motion.div 
            style={{ top: scannerY }}
            className="absolute left-6 md:left-1/2 w-32 md:w-40 h-[1px] bg-black -translate-x-1/2 z-30 pointer-events-none hidden md:block"
          >
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-black font-bold tracking-widest whitespace-nowrap">
               SCAN_PATH...
             </div>
          </motion.div>

          <div className="space-y-20 md:space-y-40 lg:space-y-64 pb-12 md:pb-40">
            {experiences.map((exp, index) => (
              <TimelineNode 
                key={exp.id} 
                exp={exp} 
                index={index} 
              />
            ))}
          </div>
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
    <div ref={ref} className="relative flex flex-col md:flex-row items-start md:items-center group min-h-[400px]">
      
      {/* Background Level Text - Animated & Glowing - Positioned in empty half */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-y-0 ${isEven ? 'left-0 md:left-[50%]' : 'right-0 md:right-[50%]'} w-full md:w-[50%] hidden md:flex justify-center items-center pointer-events-none select-none z-0`}
      >
         <span 
           className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-display font-black text-transparent leading-none uppercase tracking-tighter whitespace-nowrap"
           style={{ 
             WebkitTextStroke: '2px #000000',
             filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.1))'
           }}
         >
           LEVEL 0{exp.id}
         </span>
      </motion.div>

      <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div 
          animate={isInView ? { scale: 1.1, backgroundColor: '#000000', borderColor: '#000000' } : { scale: 1, backgroundColor: '#ffffff', borderColor: 'rgba(0,0,0,0.2)' }}
          className="w-10 h-10 md:w-12 md:h-12 border-2 flex items-center justify-center transition-all duration-500 overflow-hidden"
        >
          <span className={`font-mono font-black text-xs md:text-sm transition-colors duration-500 ${isInView ? 'text-white' : 'text-neutral-400'}`}>
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
              <span className="font-mono text-[8px] md:text-[9px] text-accent font-bold tracking-[0.3em] uppercase">Entry_0{exp.id}</span>
              <div className="w-6 md:w-8 h-[1px] bg-black/20" />
              <span className={`font-mono font-bold text-[8px] md:text-[9px] tracking-widest ${exp.status === 'IN_PROGRESS' ? 'text-accent animate-pulse' : 'text-neutral-500'}`}>
                {exp.status}
              </span>
            </div>
            <p className="font-mono text-[9px] md:text-[10px] text-black/40 uppercase tracking-[0.2em]">{exp.dateRange}</p>
          </div>

          <div className="relative p-0.5 bg-black/10 group-hover/card:bg-black/20 transition-all duration-700">
             <div className="bg-white/90 backdrop-blur-3xl p-6 md:p-10 relative overflow-hidden">
                <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} px-3 py-1 bg-accent/10 border-b border-accent/20 text-accent font-mono text-[7px] md:text-[8px] font-bold tracking-widest`}>
                  {exp.achievement}
                </div>

                <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-black mb-4 md:mb-6 leading-tight uppercase group-hover/card:text-accent transition-colors duration-500 break-words">
                   {exp.role}
                </h3>
                
                <p className="text-lg md:text-xl text-neutral-600 font-light mb-6 md:mb-8 group-hover/card:text-black transition-colors">
                  {exp.company}
                </p>

                <div className={`flex items-start gap-3 md:gap-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                   <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent mt-1.5 shrink-0" />
                   <p className="text-xs md:text-sm text-black/70 leading-relaxed font-mono tracking-tight max-w-sm">
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
