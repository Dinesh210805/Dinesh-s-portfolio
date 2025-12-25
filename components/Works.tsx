import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, Terminal, Layers, Hash } from 'lucide-react';

const projects = [
  {
    id: 'PRJ-01',
    title: 'GravitycARgo',
    category: 'LOGISTICS_AI',
    year: '2024',
    tech: ['YOLOv8', 'ARCore', 'React Native'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop',
    description: 'A revolutionary system optimizing container space utilization using deep learning computer vision and augmented reality. Achieves 85% space density while reducing loading cycles by 40%, directly lowering logistics-related carbon emissions.',
    metrics: { efficiency: '+45%', latency: '24ms', precision: '0.98' }
  },
  {
    id: 'PRJ-02',
    title: 'EcoBot',
    category: 'VISION_COGNITION',
    year: '2024',
    tech: ['LLaMA-3', 'LangChain', 'ChromaDB'],
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2000&auto=format&fit=crop',
    description: 'Autonomous waste classification architecture utilizing LLaMA vision models and RAG. EcoBot handles high-throughput imagery to categorize complex waste streams for smart city infrastructure.',
    metrics: { accuracy: '94.2%', recall: '0.91', data: '4.2TB' }
  },
  {
    id: 'PRJ-03',
    title: 'The Light',
    category: 'ASSISTIVE_MFA',
    year: '2023',
    tech: ['OpenCV', 'SSFD', 'Android'],
    image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2000&auto=format&fit=crop',
    description: 'A dedicated mobility assistant for visually impaired users. Features an innovative touch-based sequential authentication method (SSFD) and spatial haptic feedback for secure digital interaction.',
    metrics: { security: 'AES-256', users: 'BETA', type: 'CORE' }
  },
  {
    id: 'PRJ-04',
    title: 'Langlearn',
    category: 'NEURAL_NLP',
    year: '2023',
    tech: ['Whisper v3', 'Groq', 'LLaMA 3.3'],
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2000&auto=format&fit=crop',
    description: 'High-speed neural translation engine built for real-time multi-modal communication. Optimized for low-latency inference using specialized hardware acceleration.',
    metrics: { speed: '120fps', voices: '30+', model: 'v3.3' }
  }
];

const Works: React.FC = () => {
  return (
    <section id="works" className="relative py-40 bg-background overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-full border-l border-white/10" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
      </div>

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
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
    >
      <div className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-accent tracking-widest">{project.id}</span>
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">{project.category}</span>
          </div>

          <div>
            <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 tracking-tighter leading-none uppercase">
              {project.title}
            </h3>
            <p className="text-secondary text-lg font-light leading-relaxed mb-10">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-y border-white/5">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-accent">
                 <Terminal size={14} />
                 <span className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase">Stack_Profile</span>
               </div>
               <div className="flex flex-wrap gap-2">
                 {project.tech.map((t: string) => (
                   <span key={t} className="px-3 py-1 border border-white/10 font-mono text-[9px] text-white/40 uppercase">
                     {t}
                   </span>
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

          <div className="pt-6">
            <button className="group flex items-center gap-6 text-[10px] font-mono font-bold text-white uppercase tracking-[0.4em] hover:text-accent transition-colors">
              SYSTEM_DOCUMENTATION
              <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-500">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="relative group overflow-hidden bg-surface border border-white/5 shadow-2xl aspect-[16/10] lg:aspect-auto lg:h-[600px]">
          <motion.img 
            style={{ y: imgY }}
            src={project.image} 
            className="w-full h-[130%] object-cover grayscale brightness-[0.25] group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-1000 ease-out"
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-8 left-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[8px] text-white tracking-widest uppercase">System_Linked</span>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2">
             <span className="font-mono text-[50px] font-black text-white/5 leading-none">0{index + 1}</span>
             <div className="h-[1px] w-24 bg-accent/20" />
          </div>

          <div className="absolute inset-0 border-[30px] border-background/20 group-hover:border-transparent transition-all duration-1000 pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};

export default Works;