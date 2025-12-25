import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Terminal, 
  BrainCircuit, 
  Boxes, 
  Wrench, 
  Users,
  Cpu,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';

const technicalSystems = [
  {
    category: 'Programming Languages',
    id: '01',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'SQL', 'PHP', 'HTML/CSS'],
    icon: <Terminal size={24} />,
    color: '#CCFF00'
  },
  {
    category: 'Machine Learning & AI',
    id: '02',
    skills: ['CNN', 'YOLO v8', 'TensorFlow', 'OpenCV', 'NLP', 'Computer Vision'],
    icon: <BrainCircuit size={24} />,
    color: '#CCFF00'
  },
  {
    category: 'Frameworks & Systems',
    id: '03',
    skills: ['React.js', 'Next.js', 'Node.js', 'Flask', 'Flutter', 'Express.js', 'Bootstrap'],
    icon: <Boxes size={24} />,
    color: '#CCFF00'
  },
  {
    category: 'Engineering Ecosystem',
    id: '04',
    skills: ['Git & GitHub', 'Docker', 'VS Code', 'Android Studio', 'Jupyter'],
    icon: <Wrench size={24} />,
    color: '#CCFF00'
  },
  {
    category: 'Cognitive Soft Skills',
    id: '05',
    skills: ['Problem Solving', 'Leadership', 'Project Mgmt', 'Communication', 'Adaptability'],
    icon: <Users size={24} />,
    color: '#CCFF00'
  }
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  return (
    <section 
      ref={containerRef} 
      id="capabilities" 
      className="relative bg-[#050505]"
      style={{ height: '600vh' }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20">
        
        {/* GLOBAL GRID BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] [background-size:100px_100px]" />
          <motion.div 
            style={{ y: useTransform(smoothProgress, [0, 1], [0, -200]) }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.1)_0%,transparent_70%)]" 
          />
        </div>

        {/* SIDEBAR TRACKER HUD */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-10 z-50 hidden lg:flex">
          {technicalSystems.map((sys, i) => (
            <motion.div 
              key={sys.id}
              className="flex items-center gap-4 group cursor-pointer"
              onClick={() => window.lenis?.scrollTo(`#capabilities`, { offset: (i / technicalSystems.length) * (containerRef.current?.offsetHeight || 0) })}
            >
              <span className="font-mono text-[8px] text-white/20 group-hover:text-accent transition-colors uppercase tracking-[0.3em]">Module_{sys.id}</span>
              <motion.div 
                style={{ 
                  scale: useTransform(smoothProgress, [i/5, (i+0.5)/5, (i+1)/5], [1, 2, 1]),
                  backgroundColor: useTransform(smoothProgress, [i/5, (i+0.5)/5, (i+1)/5], ["#333", "#CCFF00", "#333"])
                }}
                className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(204,255,0,0)] group-hover:shadow-[0_0_10px_#CCFF00]"
              />
            </motion.div>
          ))}
        </div>

        {/* DATA HELIX CONTAINER */}
        <div className="relative w-full h-full perspective-[1500px]">
          {technicalSystems.map((system, idx) => (
            <HelixNode 
              key={system.id} 
              system={system} 
              index={idx} 
              total={technicalSystems.length}
              progress={smoothProgress} 
            />
          ))}
        </div>

        {/* BOTTOM HUD DATA BAR */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-30 pointer-events-none">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Activity size={14} className="text-accent animate-pulse" />
              <span className="font-mono text-[9px] text-accent tracking-[0.4em] uppercase">Stream_Buffer: Operational</span>
            </div>
            <div className="w-64 h-[1px] bg-white/10 relative">
              <motion.div 
                style={{ scaleX: smoothProgress }}
                className="absolute inset-0 bg-accent origin-left"
              />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
             <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">Access_Point // DK_HELIX</span>
             <span className="font-display font-black text-4xl text-white/5 italic">DATASET</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const HelixNode: React.FC<{ system: any, index: number, total: number, progress: any }> = ({ system, index, total, progress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const buffer = 0.15; // Increased buffer for smoother transitions

  // Fly-through transforms
  const opacity = useTransform(progress, [start - buffer, start + (end - start)/2, end + buffer], [0, 1, 0]);
  const scale = useTransform(progress, [start - buffer, start + (end - start)/2, end + buffer], [0.8, 1, 1.2]);
  const z = useTransform(progress, [start - buffer, start + (end - start)/2, end + buffer], [-500, 0, 500]);
  const rotateX = useTransform(progress, [start - buffer, start + (end - start)/2, end + buffer], [20, 0, -20]);

  return (
    <motion.div
      style={{ 
        opacity, 
        scale, 
        z,
        rotateX,
        display: useTransform(progress, (v: number) => v >= start - 0.1 && v <= end + 0.1 ? 'flex' : 'none'),
        pointerEvents: useTransform(progress, (v: number) => v >= start && v <= end ? 'auto' : 'none')
      }}
      className="absolute inset-0 flex items-center justify-center p-6 md:p-24"
    >
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* CATEGORY INFO */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="flex items-center gap-6">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border border-accent/30 rounded-full flex items-center justify-center text-accent bg-accent/5"
              >
                {system.icon}
              </motion.div>
              <div className="h-[1px] flex-1 bg-white/10" />
           </div>

           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <Zap size={10} className="text-accent" />
                 <span className="font-mono text-[8px] text-accent tracking-[0.5em] uppercase">Module_{system.id}_Load</span>
              </div>
              <h3 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter leading-none uppercase">
                {system.category.split(' ')[0]} <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(204,255,0,0.5)' }}>
                  {system.category.split(' ').slice(1).join(' ')}
                </span>
              </h3>
           </div>
        </div>

        {/* SKILLS GRID */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {system.skills.map((skill: string, idx: number) => (
            <SkillCard key={skill} skill={skill} index={idx} parentProgress={progress} range={[start, end]} />
          ))}
        </div>

      </div>
      
      {/* MASSIVE BG ID */}
      <motion.div 
        style={{ x: useTransform(progress, [start, end], [50, -50]) }}
        className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none select-none opacity-[0.03]"
      >
        <span className="text-[40vw] font-display font-black text-white italic leading-none uppercase tracking-tighter">
          {system.id}
        </span>
      </motion.div>
    </motion.div>
  );
};

const SkillCard: React.FC<{ skill: string, index: number, parentProgress: any, range: [number, number] }> = ({ skill, index, parentProgress, range }) => {
  const stagger = index * 0.01;
  const start = range[0] + stagger;
  const end = range[1] - (0.1 - stagger);

  const opacity = useTransform(parentProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const y = useTransform(parentProgress, [start, start + 0.05], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="group relative bg-white/[0.02] border border-white/5 p-6 md:p-8 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[160px] hover:border-accent hover:bg-accent/[0.03] transition-all duration-500 overflow-hidden"
    >
      <div className="flex justify-between items-start">
        <div className="w-1.5 h-1.5 bg-white/10 group-hover:bg-accent transition-colors" />
        <span className="font-mono text-[7px] text-white/10 uppercase">Node_0{index + 1}</span>
      </div>

      <h4 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-accent transition-colors uppercase leading-tight">
        {skill}
      </h4>

      {/* SCANLINE DECOR */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
      <div className="absolute bottom-0 right-0 w-[1px] h-full bg-accent/20 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />
    </motion.div>
  );
};

export default Services;