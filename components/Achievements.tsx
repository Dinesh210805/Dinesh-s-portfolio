import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ShieldCheck, Trophy, Target, ArrowUpRight, Cpu, Layers, Fingerprint, Terminal, Award } from 'lucide-react';

const achievements = [
  {
    id: 'VAL_25_GSC',
    rank: 'TOP 105 NATIONAL',
    title: 'Google Solution Challenge 2025',
    category: 'GLOBAL_LOGISTICS_AI',
    authority: 'GOOGLE_DEVELOPERS',
    description: 'Selected from 64,000+ national entries for pioneering GravitycARgo—an AI+AR integrated logistics ecosystem designed for global carbon footprint reduction and spatial optimization.',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1400&auto=format&fit=crop',
    tech: ['LLM', 'Python', 'Flask', 'Optigenix Algorithm', 'Unity', 'NumPy', 'SciPy', 'scikit-learn', 'three.js'],
    date: 'MAR 2025',
    prestige: true
  },
  {
    id: 'VAL_25_FOW',
    rank: '2ND RUNNER UP',
    title: 'Future of Work Hackathon',
    category: 'WORKPLACE_EFFICIENCY',
    authority: 'FUTURE_SUMMIT_25',
    description: 'Recognized for GravitycARgo, an AI+AR driven logistics solution that redefines smarter, efficient packing strategies for modern warehouse and workspace management.',
    image: 'https://images.unsplash.com/photo-1504384308090-c89eecaaad8e?q=80&w=1400&auto=format&fit=crop',
    tech: ['LLM', 'Python', 'Flask', 'Optigenix Algorithm', 'Unity', 'NumPy', 'pandas', 'Plotly', 'three.js'],
    date: 'JUL 2025',
    prestige: true
  },
  {
    id: 'VAL_25_UNI',
    rank: 'TOP 10 FINALIST',
    title: 'Unisys Innovation Program Y16',
    category: 'SUSTAINABLE_SYSTEMS',
    authority: 'UNISYS_CORP',
    description: 'Awarded for architectural excellence in GravitycARgo. The platform combines deep learning and spatial computing for enterprise freight optimization.',
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e78b?q=80&w=1400&auto=format&fit=crop',
    tech: ['LLM', 'Python', 'Flask', 'Optigenix Algorithm', 'Unity', 'scikit-learn', 'Plotly', 'three.js'],
    date: 'JAN 2025',
    prestige: true
  },
  {
    id: 'VAL_24_OXD',
    rank: 'FINALIST',
    title: '0x.day Hacksday Hackathon',
    category: 'CARBON_OPTIMIZATION',
    authority: '0X_COMMUNITY',
    description: 'Built Gravitycargo, an AI system focused on improving container space usage and reducing CO2 through a proprietary Optigenix optimization core.',
    image: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=1400&auto=format&fit=crop',
    tech: ['LLM', 'Python', 'Flask', 'Optigenix Algorithm', 'NumPy', 'pandas', 'SciPy', 'scikit-learn', 'Plotly/Dash'],
    date: 'OCT 2024',
    prestige: false
  },
  {
    id: 'VAL_24_AVN',
    rank: 'FINALIST',
    title: 'Aventus 2.0 Hackathon',
    category: 'ASSISTIVE_MFA_TECH',
    authority: 'AVENTUS_LABS',
    description: 'Developed "The Light", an assistive application for visually impaired users. Features touch-based secure authentication (SSFD) and computer vision navigation.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop',
    tech: ['Flutter', 'TensorFlow', 'YOLO', 'OpenCV', 'Python', 'Flask'],
    date: 'MAY 2024',
    prestige: false
  },
  {
    id: 'VAL_24_YTK',
    rank: 'REGIONAL PREFINALIST',
    title: 'ICT Academy Youth Talk 2024',
    category: 'TECHNICAL_LEADERSHIP',
    authority: 'ICT_ACADEMY_TN',
    description: 'Participated in the regional prefinals of ICT Academy Youth Talk Tamil Nadu, delivering vision-driven concepts on AI and modern society.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1400&auto=format&fit=crop',
    tech: ['Public Speaking', 'System Design', 'Visionary Delivery'],
    date: '2024',
    prestige: false
  }
];

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="relative py-40 bg-background overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#CCFF00_1px,transparent_1px),linear-gradient(to_bottom,#CCFF00_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <div className="px-5 md:px-10 lg:px-20 max-w-[1500px] mx-auto relative z-10">
        
        {/* Header - Fixed Overlap */}
        <div className="mb-48 flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/5 pb-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-16 h-[1px] bg-accent" />
              <span className="font-mono text-accent text-sm tracking-[0.5em] uppercase">Honors_Ledger_v1.0</span>
            </motion.div>
            <h2 className="text-7xl md:text-9xl font-display font-bold text-white tracking-tighter leading-[0.8] uppercase">
              GLOBAL <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #CCFF00' }}>VALIDATION.</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-6 font-mono lg:min-w-[300px]">
            <div className="flex justify-between text-[10px] text-white/40 tracking-[0.2em] border-b border-white/10 pb-2">
              <span>TOTAL_ENTRIES</span>
              <span className="text-accent">0{achievements.length}</span>
            </div>
            <div className="flex justify-between text-[10px] text-white/40 tracking-[0.2em] border-b border-white/10 pb-2">
              <span>VERIFICATION</span>
              <span className="text-white">STAMP_ENCRYPTED</span>
            </div>
            <p className="text-[9px] text-secondary leading-relaxed uppercase tracking-widest max-w-[280px]">
              Validated registry of national and global hackathon achievements, selecting for architectural rigor and systemic impact.
            </p>
          </div>
        </div>

        {/* Detailed List */}
        <div className="space-y-60 lg:space-y-80">
          {achievements.map((ach, idx) => (
            <ArchiveEntry key={ach.id} ach={ach} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ArchiveEntry: React.FC<{ ach: any; index: number }> = ({ ach, index }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scanY = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center relative"
    >
      {/* Universal Numbering - Always Visible */}
      <div className={`absolute -top-32 ${isEven ? 'right-0 lg:-right-10' : 'left-0 lg:-left-10'} pointer-events-none select-none z-0`}>
        <span className="text-[18vw] font-display font-black text-white/5 leading-none">
          0{index + 1}
        </span>
      </div>

      {/* Image Block */}
      <div className={`lg:col-span-6 relative group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative overflow-hidden bg-surface border border-white/10 aspect-[16/10] lg:aspect-square group shadow-2xl">
          <motion.img 
            style={{ y: imgY }}
            src={ach.image} 
            className="w-full h-[125%] object-cover grayscale brightness-[0.25] group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-1000 ease-out"
            alt={ach.title}
          />
          
          {/* Scanning Line Overlay */}
          <motion.div 
            style={{ top: scanY }}
            className="absolute left-0 right-0 h-[2px] bg-accent/40 shadow-[0_0_20px_rgba(204,255,0,0.6)] z-20 pointer-events-none"
          />

          {/* Badge */}
          <div className="absolute top-8 left-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${ach.prestige ? 'bg-accent' : 'bg-white/10'} rounded-full flex items-center justify-center text-black shadow-lg`}>
                 <Trophy size={18} className={ach.prestige ? 'text-black' : 'text-white'} />
              </div>
              <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
                {ach.rank}
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 text-right">
             <div className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] mb-1">Authority_Check</div>
             <div className="font-mono text-[10px] text-accent font-bold uppercase">{ach.authority}</div>
          </div>
          
          <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
        </div>
      </div>

      {/* Content Block */}
      <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 border border-accent/20 bg-accent/5 font-mono text-[9px] text-accent uppercase tracking-widest">
              {ach.category}
            </div>
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="font-mono text-xs text-white/30 tracking-widest">{ach.date}</span>
          </div>

          <h3 className="text-4xl md:text-6xl font-display font-bold text-white leading-[0.9] tracking-tighter uppercase group-hover:text-accent transition-colors">
            {ach.title}
          </h3>

          <p className="text-secondary text-lg font-light leading-relaxed max-w-2xl">
            {ach.description}
          </p>

          {/* New Tech Stack Metric Block */}
          <div className="py-10 border-y border-white/5 space-y-6">
            <div className="flex items-center gap-2 font-mono text-[8px] text-white/20 uppercase tracking-[0.4em]">
              <Terminal size={12} className="text-accent" />
              <span>Technical_Stack_Index</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ach.tech.map((t: string) => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-[9px] text-white/50 uppercase">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
               <ShieldCheck className="text-accent" size={16} />
               <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Registry_Confirmed</span>
            </div>
            <div className="flex items-center gap-3">
               <Fingerprint className="text-white/20" size={16} />
               <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Biometric_ID: {ach.id}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Achievements;