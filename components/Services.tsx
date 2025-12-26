import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  BrainCircuit, 
  Boxes, 
  Wrench, 
  Users,
  Cpu,
  Activity,
  Zap,
  Fingerprint,
  ChevronRight,
  Database,
  ExternalLink
} from 'lucide-react';

interface Skill {
  name: string;
  slug: string; // Used for fetching logos from simpleicons.org
  textOnly?: boolean; // For skills without icons (like soft skills)
}

const technicalSystems = [
  {
    category: 'Programming Languages',
    id: 'SYS_01',
    description: 'Core logic protocols and algorithmic substrates.',
    skills: [
      { name: 'Python', slug: 'python' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Java', slug: 'openjdk' },
      { name: 'C', slug: 'c' },
      { name: 'SQL', slug: 'postgresql' },
      { name: 'PHP', slug: 'php' },
      { name: 'HTML5', slug: 'html5' }
    ],
    icon: <Terminal size={32} />,
  },
  {
    category: 'Machine Learning & AI',
    id: 'SYS_02',
    description: 'Neural architectures and cognitive vision engines.',
    skills: [
      { name: 'CNN', slug: 'keras' },
      { name: 'YOLO v8', slug: 'opencv' },
      { name: 'TensorFlow', slug: 'tensorflow' },
      { name: 'OpenCV', slug: 'opencv' },
      { name: 'NLP', slug: 'huggingface' },
      { name: 'Scikit-Learn', slug: 'scikitlearn' }
    ],
    icon: <BrainCircuit size={32} />,
  },
  {
    category: 'Frameworks & Libraries',
    id: 'SYS_03',
    description: 'Modular systems for rapid technical deployment.',
    skills: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'Flask', slug: 'flask' },
      { name: 'Flutter', slug: 'flutter' },
      { name: 'Express', slug: 'express' },
      { name: 'Bootstrap', slug: 'bootstrap' }
    ],
    icon: <Boxes size={32} />,
  },
  {
    category: 'Engineering Ecosystem',
    id: 'SYS_04',
    description: 'Industrial development environments and tools.',
    skills: [
      { name: 'Git', slug: 'git' },
      { name: 'GitHub', slug: 'github' },
      { name: 'Docker', slug: 'docker' },
      { name: 'VS Code', slug: 'visualstudiocode' },
      { name: 'Android Studio', slug: 'androidstudio' },
      { name: 'Jupyter', slug: 'jupyter' }
    ],
    icon: <Wrench size={32} />,
  },
  {
    category: 'Cognitive Soft Skills',
    id: 'SYS_05',
    description: 'Strategic leadership and system management.',
    skills: [
      { name: 'Problem Solving', slug: '', textOnly: true },
      { name: 'Leadership', slug: '', textOnly: true },
      { name: 'Project Mgmt', slug: '', textOnly: true },
      { name: 'Communication', slug: '', textOnly: true },
      { name: 'Adaptability', slug: '', textOnly: true }
    ],
    icon: <Users size={32} />,
  }
];

const Services: React.FC = () => {
  return (
    <section id="capabilities" className="relative bg-[#050505] py-16 md:py-40 overflow-hidden">
      {/* BACKGROUND DATA MESH */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#CCFF00_1px,transparent_1px),linear-gradient(to_bottom,#CCFF00_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <div className="px-5 md:px-10 lg:px-20 max-w-[1600px] mx-auto relative z-10">
        
        {/* HUD HEADER */}
        <div className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-accent" />
              <span className="font-mono text-accent text-[10px] tracking-[0.5em] uppercase italic">Technical Skills</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white tracking-tighter leading-[0.9] uppercase">
              TECHNICAL <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #CCFF00' }}>REGISTRY.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 font-mono text-[9px] text-white/50 border-l border-white/10 pl-8">
            <div className="flex items-center gap-3">
              <Activity size={14} className="text-accent animate-pulse" />
              <span className="tracking-widest uppercase italic">Diagnostic_Active</span>
            </div>
            <p className="max-w-[280px] leading-relaxed uppercase tracking-widest">
              Verified mapping of technical competencies. 
              Diagnostic scan shows 100% core integrity across all system nodes.
            </p>
          </div>
        </div>

        {/* COMPONENT BLOCKS */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="space-y-10 md:space-y-20"
        >
          {technicalSystems.map((system, idx) => (
            <CapabilityBlock key={system.id} system={system} index={idx} />
          ))}
        </motion.div>
        
        {/* FOOTER DECAL */}
        <div className="mt-16 md:mt-40 pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-8 font-mono text-[8px] text-white/40 uppercase tracking-[0.5em]">
              {/* Removed footer strings as per request */}
           </div>
        </div>
      </div>
    </section>
  );
};

const CapabilityBlock: React.FC<{ system: any, index: number }> = ({ system, index }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.7, 
            ease: [0.16, 1, 0.3, 1] 
          }
        }
      }}
      className="group relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/5 bg-[#080808]/50 backdrop-blur-sm hover:border-accent/20 transition-all duration-700">
        
        {/* SIDE BAR / IDENTITY */}
        <div className="lg:col-span-4 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between gap-16 relative">
           <div className="space-y-8">
              <div className="w-16 h-16 bg-accent/5 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-500 rounded-sm shadow-[0_0_20px_rgba(204,255,0,0.05)]">
                {system.icon}
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-accent tracking-[0.5em] uppercase font-bold">{system.id}</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                 </div>
                 <h3 className="text-4xl lg:text-5xl font-display font-bold text-white group-hover:text-accent transition-colors duration-500 uppercase tracking-tighter leading-tight">
                   {system.category}
                 </h3>
              </div>
           </div>
           <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest leading-relaxed max-w-xs">
             {system.description}
           </p>

           {/* DECAL BACKGROUND */}
           <div className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Cpu size={80} className="text-white" />
           </div>
        </div>

        {/* DATA GRID / LOGOS */}
        <div className="lg:col-span-8 p-6 lg:p-12 bg-[#060606]/30">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {system.skills.map((skill: Skill, sIdx: number) => (
              <SkillCard key={skill.name} skill={skill} index={sIdx} />
            ))}
          </div>
        </div>

      </div>

      {/* SYSTEM SCANLINE */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-accent/30 origin-left"
      />
    </motion.div>
  );
};

const SkillCard: React.FC<{ skill: Skill, index: number }> = ({ skill, index }) => {
  // Simple Icons CDN allows us to fetch brand logos easily
  // Using custom color #CCFF00 (the Acid Lime) for the logos
  const logoUrl = skill.textOnly ? '' : `https://cdn.simpleicons.org/${skill.slug}/CCFF00`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      className="group/skill relative bg-[#0a0a0a] border border-white/5 p-6 flex flex-col items-center justify-center gap-5 hover:border-accent/40 hover:bg-accent/[0.02] transition-all duration-300 aspect-square text-center"
    >
      {!skill.textOnly ? (
        <>
          {/* REAL LOGO */}
          <div className="relative w-12 h-12 flex items-center justify-center grayscale group-hover/skill:grayscale-0 group-hover/skill:scale-110 transition-all duration-500">
            <img 
              src={logoUrl} 
              alt={skill.name} 
              className="w-full h-full object-contain opacity-50 group-hover/skill:opacity-100 transition-opacity"
              onError={(e) => {
                // Fallback for missing/broken slugs
                (e.target as HTMLImageElement).src = 'https://cdn.simpleicons.org/v0/CCFF00';
              }}
            />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover/skill:opacity-40 transition-opacity rounded-full" />
          </div>

          <div className="space-y-1">
            <span className="block font-mono text-[10px] md:text-xs font-bold text-white/60 group-hover/skill:text-accent transition-colors uppercase tracking-tight">
              {skill.name}
            </span>
            <div className="flex justify-center items-center gap-1 opacity-0 group-hover/skill:opacity-100 transition-opacity">
               <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
               <span className="font-mono text-[7px] text-accent uppercase tracking-widest">Live_Link</span>
            </div>
          </div>
        </>
      ) : (
        /* TEXT ONLY for soft skills */
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-mono text-sm md:text-base font-bold text-white/60 group-hover/skill:text-accent transition-colors uppercase tracking-wide text-center leading-tight">
            {skill.name}
          </span>
        </div>
      )}

      {/* CARD DECOR */}
      <div className="absolute top-2 right-2 font-mono text-[6px] text-white/10 uppercase tracking-tighter">
        NODE_{index + 1}
      </div>
      
      {/* INTERACTIVE SCAN LINE */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent/50 scale-x-0 group-hover/skill:scale-x-100 transition-transform origin-left duration-500" />
    </motion.div>
  );
};

export default Services;