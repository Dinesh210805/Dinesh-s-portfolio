
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, Terminal, Layers } from 'lucide-react';

const projects = [
  {
    id: 'PRJ-01',
    title: 'GravitycARgo',
    category: 'LOGISTICS_AI',
    tech: ['YOLOv8', 'ARCore', 'React Native'],
    image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=2070&auto=format&fit=crop',
    description: 'AI+AR integrated logistics ecosystem for container space optimization.',
    metrics: { efficiency: '+45%', latency: '24ms', precision: '0.98' }
  },
  {
    id: 'PRJ-02',
    title: 'EcoBot',
    category: 'VISION_COGNITION',
    tech: ['LLaMA-3', 'LangChain', 'ChromaDB'],
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2070&auto=format&fit=crop',
    description: 'Autonomous waste classification architecture utilizing LLaMA vision models and RAG.',
    metrics: { accuracy: '94.2%', recall: '0.91', data: '4.2TB' }
  },
  {
    id: 'PRJ-03',
    title: 'The Light',
    category: 'ASSISTIVE_MFA',
    tech: ['OpenCV', 'SSFD', 'Android'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    description: 'Dedicated mobility assistant for visually impaired users with touch-based authentication.',
    metrics: { security: 'AES-256', users: 'BETA', type: 'CORE' }
  },
  {
    id: 'PRJ-04',
    title: 'Langlearn',
    category: 'NEURAL_NLP',
    tech: ['Whisper v3', 'Groq', 'LLaMA 3.3'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    description: 'High-speed neural translation engine built for real-time multi-modal communication.',
    metrics: { speed: '120fps', voices: '30+', model: 'v3.3' }
  }
];

const Works: React.FC = () => {
  return (
    <section id="works" className="relative py-40 bg-background overflow-hidden border-t border-white/5">
      <div className="px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto relative z-10">
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-[1px] bg-accent" />
            <span className="font-mono text-accent text-sm tracking-[0.4em] uppercase">Engineering_Archive</span>
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[0.9]">
            TECHNICAL <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #CCFF00' }}>RECORDS.</span>
          </h2>
        </div>

        <div className="space-y-60">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Parallax adjustment for smoother feel and no edge revealing
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
    >
      <div className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-accent tracking-widest">{project.id}</span>
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">{project.category}</span>
          </div>
          <div>
            <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 tracking-tighter leading-none uppercase">{project.title}</h3>
            <p className="text-secondary text-lg font-light leading-relaxed mb-10">{project.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-y border-white/5">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-accent">
                 <Terminal size={14} />
                 <span className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase">Stack_Profile</span>
               </div>
               <div className="flex flex-wrap gap-2">
                 {project.tech.map((t: string) => (
                   <span key={t} className="px-3 py-1 border border-white/10 font-mono text-[9px] text-white/40 uppercase">{t}</span>
                 ))}
               </div>
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-accent">
                 <Layers size={14} />
                 <span className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase">Metrics_Feed</span>
               </div>
               <div className="flex flex-col gap-1">
                  {Object.entries(project.metrics).map(([k, v]: [string, any]) => (
                    <div key={k} className="flex justify-between font-mono text-[10px] uppercase">
                      <span className="text-white/20">{k}:</span>
                      <span className="text-white">{v}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
          <button className="group flex items-center gap-6 text-[10px] font-mono font-bold text-white uppercase tracking-[0.4em] hover:text-accent transition-colors">
            SYSTEM_DOCUMENTATION
            <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all">
              <ArrowUpRight size={18} />
            </div>
          </button>
        </div>
      </div>

      <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
        {/* Enforced isolation and overflow-hidden to prevent overlap */}
        <div className="relative group overflow-hidden bg-surface border border-white/5 aspect-video w-full isolation-isolate">
          <motion.img 
            style={{ y: isInView ? imgY : 0, scale: 1.1 }}
            src={project.image} 
            className="w-full h-full object-cover grayscale brightness-[0.25] group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700 ease-out"
            alt={project.title}
            loading="lazy"
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-background/20 group-hover:opacity-0 transition-opacity pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};

export default Works;
