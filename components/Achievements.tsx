
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ShieldCheck, Trophy, Terminal, Fingerprint, ChevronRight } from 'lucide-react';

const achievements = [
  {
    id: 'VAL_25_GSC',
    rank: 'TOP 105 NATIONAL',
    title: 'Google Solution Challenge 2025',
    category: 'GLOBAL_LOGISTICS_AI',
    authority: '2025',
    description: 'GravitycARgo selected from 64,000+ National entries for its AI+AR logistics innovation.',
    images: ['/googlesolchallenge.png'],
    tech: ['LLM', 'Python', 'Flask', 'Optigenix Algorithm', 'Unity', 'NumPy', 'scikit-learn'],
    date: 'MAR 2025',
    prestige: true
  },
  {
    id: 'VAL_25_FOW',
    rank: '2ND RUNNER UP',
    title: 'The Future of Work Hackathon',
    category: 'WORKPLACE_EFFICIENCY',
    authority: '2025',
    description: 'Recognized for GravitycARgo, an AI+AR driven logistics solution for smarter, efficient packing strategies.',
    images: ['/FutureOfWork01.jpg', '/FutureOfWork02.jpg'],
    tech: ['LLM', 'Python', 'Flask', 'Optigenix Algorithm', 'Unity', 'Plotly'],
    date: 'JUL 2025',
    prestige: true
  },
  {
    id: 'VAL_25_UNI',
    rank: 'TOP 10',
    title: 'Unisys Innovation Program Y16',
    category: 'SUSTAINABLE_SYSTEMS',
    authority: '2025',
    description: 'Recognized for GravitycARgo, an AI+AR driven sustainable logistics platform.',
    images: ['/unisys.png'],
    tech: ['LLM', 'Python', 'Flask', 'Optigenix', 'Unity', 'scikit-learn'],
    date: 'JAN 2025',
    prestige: true
  },
  {
    id: 'VAL_24_OXD',
    rank: 'FINALIST',
    title: '0x.day Hacksday Hackathon',
    category: 'CARBON_OPTIMIZATION',
    authority: '2024',
    description: 'Built GravitycARgo, an AI system improving container space usage and reducing CO2.',
    images: ['/0xday1.JPG', '/0xday2.jpg'],
    tech: ['LLM', 'Python', 'Flask', 'Optigenix', 'NumPy', 'pandas', 'Plotly'],
    date: 'OCT 2024',
    prestige: false
  },
  {
    id: 'VAL_24_AVN',
    rank: 'FINALIST',
    title: 'Aventus 2.0 Hackathon',
    category: 'ASSISTIVE_MFA_TECH',
    authority: '2024',
    description: 'Developed The Light, Assistive app for the visually impaired with touch based secure authentication(SSFD).',
    images: ['/aventus1.jpg', '/aventus2.jpg'],
    tech: ['Flutter', 'TensorFlow', 'YOLO', 'OpenCV', 'Python', 'Flask'],
    date: 'MAY 2024',
    prestige: false
  },
  {
    id: 'VAL_24_YTK',
    rank: 'REGIONAL PREFINALIST',
    title: 'Youth Talk 2024',
    category: 'TECHNICAL_LEADERSHIP',
    authority: '2024',
    description: 'Participated in regional prefinals of ICT Academy Youth Talk Tamil Nadu.',
    images: ['/youthtalk.png'],
    tech: ['Public Speaking', 'System Design', 'Visionary Delivery'],
    date: '2024',
    prestige: false
  }
];

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="relative py-16 md:py-32 bg-background overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#CCFF00_1px,transparent_1px),linear-gradient(to_bottom,#CCFF00_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <div className="px-6 md:px-10 lg:px-20 max-w-[1500px] mx-auto relative z-10">
        <div className="mb-12 md:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 border-b border-white/5 pb-10 md:pb-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8 md:mb-10"
            >
              <div className="w-10 md:w-16 h-[1px] bg-accent" />
              <span className="font-mono text-accent text-[10px] md:text-sm tracking-[0.4em] md:tracking-[0.5em] uppercase">Honor Ledger</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-[1] uppercase">
              RECOGNITION.
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

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
          className="space-y-16 md:space-y-32 lg:space-y-48"
        >
          {achievements.map((ach, idx) => (
            <ArchiveEntry key={ach.id} ach={ach} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ArchiveEntry: React.FC<{ ach: any; index: number }> = ({ ach, index }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const isEven = index % 2 === 0;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = ach.images && ach.images.length > 1;

  // Auto-advance images every 3 seconds
  useEffect(() => {
    if (!hasMultipleImages) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % ach.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, ach.images.length]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % ach.images.length);
  };

  const currentImage = ach.images?.[currentImageIndex] || ach.images?.[0];
  
  // Apply cover mode for specific achievements
  const shouldCover = ach.id === 'VAL_24_OXD' || ach.id === 'VAL_24_AVN';

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
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ y: imgY, scale: shouldCover ? 1.15 : 1 }}
            src={currentImage} 
            className={`w-full h-full ${shouldCover ? 'object-cover' : 'object-contain'} bg-surface brightness-75 group-hover:brightness-90 transition-all duration-1000 ease-out`}
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

          {/* Image navigation - only show if multiple images */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-center gap-3">
              <button 
                onClick={handleNextImage}
                className="w-10 h-10 bg-accent/10 backdrop-blur-xl border border-accent/20 hover:bg-accent hover:border-accent flex items-center justify-center transition-all duration-300 group/btn"
              >
                <ChevronRight size={16} className="text-accent group-hover/btn:text-black transition-colors" />
              </button>
              <div className="flex gap-1.5">
                {ach.images.map((_: any, idx: number) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'bg-accent w-6' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-right hidden md:block">
             <div className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] mb-1">Year</div>
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
            {/* Removed Registry_Confirmed and ID as per request */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Achievements;
