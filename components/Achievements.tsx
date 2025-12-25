
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ShieldCheck, Trophy, Terminal, Fingerprint } from 'lucide-react';

const achievements = [
  {
    id: 'VAL_25_GSC',
    rank: 'TOP 105 NATIONAL',
    title: 'Google Solution Challenge 2025',
    category: 'GLOBAL_LOGISTICS_AI',
    authority: 'GOOGLE_DEVELOPERS',
    description: 'Selected from 64,000+ national entries for pioneering GravitycARgo—an AI+AR integrated logistics ecosystem designed for global carbon footprint reduction and spatial optimization.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    tech: ['LLM', 'Python', 'Flask', 'Optigenix Algorithm', 'Unity', 'NumPy', 'scikit-learn'],
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
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    tech: ['LLM', 'Python', 'Flask', 'Optigenix Algorithm', 'Unity', 'Plotly'],
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
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop',
    tech: ['LLM', 'Python', 'Flask', 'Optigenix', 'Unity', 'scikit-learn'],
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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    tech: ['LLM', 'Python', 'Flask', 'Optigenix', 'NumPy', 'pandas', 'Plotly'],
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
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    tech: ['Public Speaking', 'System Design', 'Visionary Delivery'],
    date: '2024',
    prestige: false
  }
];

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="relative py-24 md:py-40 bg-background overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#CCFF00_1px,transparent_1px),linear-gradient(to_bottom,#CCFF00_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <div className="px-6 md:px-10 lg:px-20 max-w-[1500px] mx-auto relative z-10">
        <div className="mb-24 md:mb-48 flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/5 pb-16 md:pb-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8 md:mb-10"
            >
              <div className="w-10 md:w-16 h-[1px] bg-accent" />
              <span className="font-mono text-accent text-[10px] md:text-sm tracking-[0.4em] md:tracking-[0.5em] uppercase">Honors_Ledger_v1.0</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white tracking-tighter leading-[1.1] md:leading-[0.8] uppercase">
              GLOBAL <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #CCFF00' }}>VALIDATION.</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-6 font-mono lg:min-w-[300px]">
            <div className="flex justify-between text-[10px] text-white/40 tracking-[0.2em] border-b border-white/10 pb-2">
              <span>TOTAL_ENTRIES</span>
              <span className="text-accent">0{achievements.length}</span>
            </div>
            <p className="text-[9px] text-secondary leading-relaxed uppercase tracking-widest max-w-[280px]">
              Validated registry of national and global hackathon achievements, selecting for architectural rigor and systemic impact.
            </p>
          </div>
        </div>

        <div className="space-y-40 md:space-y-60 lg:space-y-80">
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
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32 items-center relative"
    >
      {/* Background Number Decal - Hidden on very small screens to avoid overflow */}
      <div className={`hidden sm:block absolute -top-16 md:-top-32 ${isEven ? 'right-0 lg:-right-10' : 'left-0 lg:-left-10'} pointer-events-none select-none z-0`}>
        <span className="text-[15vw] md:text-[18vw] font-display font-black text-white/5 leading-none uppercase">
          0{index + 1}
        </span>
      </div>

      <div className={`lg:col-span-6 relative group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative overflow-hidden bg-surface border border-white/10 aspect-video w-full group shadow-2xl isolation-isolate">
          <motion.img 
            style={{ y: imgY, scale: 1.15 }}
            src={ach.image} 
            className="w-full h-full object-cover grayscale brightness-[0.25] group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-1000 ease-out"
            alt={ach.title}
            loading="lazy"
          />
          
          <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 md:w-12 md:h-12 ${ach.prestige ? 'bg-accent' : 'bg-white/10'} rounded-full flex items-center justify-center text-black shadow-lg`}>
                 <Trophy size={14} className={ach.prestige ? 'text-black' : 'text-white'} />
              </div>
              <div className="px-3 py-1 md:px-4 md:py-2 bg-black/60 backdrop-blur-xl border border-white/10 font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white">
                {ach.rank}
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-right hidden md:block">
             <div className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] mb-1">Authority_Check</div>
             <div className="font-mono text-[10px] text-accent font-bold uppercase">{ach.authority}</div>
          </div>
        </div>
      </div>

      <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex items-center gap-4">
            <div className="px-2 py-0.5 md:px-3 md:py-1 border border-accent/20 bg-accent/5 font-mono text-[8px] md:text-[9px] text-accent uppercase tracking-widest">
              {ach.category}
            </div>
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="font-mono text-[10px] text-white/30 tracking-widest">{ach.date}</span>
          </div>

          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] md:leading-[0.9] tracking-tighter uppercase group-hover:text-accent transition-colors break-words">
            {ach.title}
          </h3>

          <p className="text-secondary text-base md:text-lg font-light leading-relaxed max-w-2xl">
            {ach.description}
          </p>

          <div className="py-6 md:py-10 border-y border-white/5 space-y-6">
            <div className="flex items-center gap-2 font-mono text-[8px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em]">
              <Terminal size={12} className="text-accent" />
              <span>Technical_Stack_Index</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ach.tech.map((t: string) => (
                <span key={t} className="px-2 py-0.5 md:px-3 md:py-1 bg-white/5 border border-white/10 font-mono text-[8px] md:text-[9px] text-white/50 uppercase">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 md:gap-3">
               <ShieldCheck className="text-accent" size={14} />
               <span className="font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest">Registry_Confirmed</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
               <Fingerprint className="text-white/20" size={14} />
               <span className="font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest truncate max-w-[120px]">ID: {ach.id}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Achievements;
