import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, Terminal, Layers, ChevronRight } from 'lucide-react';

import ScrollReveal from './ui/scroll-reveal';

const projects = [
  {
    id: 'PRJ-01',
    title: 'AURA (Phone-as-MCP)',
    category: 'ON_DEVICE_AGENT',
    tech: ['Kotlin', 'WebRTC', 'YOLOv8', 'ML Kit OCR', 'LangGraph'],
    images: ['/vs code.png'],
    description: 'Turned an Android phone into an MCP server peer-to-peer over DTLS WebRTC. Exposes 36 live-verified tools to any AI client with zero cloud dependency.'
  },
  {
    id: 'PRJ-02',
    title: 'StayBot',
    category: 'AI_TRAVEL_ASSISTANT',
    tech: ['FastAPI', 'LangGraph', 'Pinecone', 'Next.js'],
    images: ['/vs code.png'],
    description: 'AI travel assistant built on a LangGraph ReAct agent routing across 15 specialized tools, semantic search, and persistent memory.'
  },
  {
    id: 'PRJ-03',
    title: 'GravitycARgo',
    category: 'LOGISTICS_AI',
    tech: ['Python', 'Three.js', 'Flutter', 'Unity AR', 'OSRM'],
    images: ['/GravitycArgo.jpeg', '/GravitycArgo2.jpeg', '/GravitycArgo3.jpeg'],
    description: '3D container-loading optimizer using random-key genetic algorithms, achieving 77.9% mean fill with zero hard violations.'
  },
  {
    id: 'PRJ-04',
    title: 'Langlearn',
    category: 'NEURAL_NLP',
    tech: ['Flask', 'React', 'LLaMA 3.3', 'Web Speech API'],
    images: ['/Langlearn.jpeg', '/Langlearn (2).jpeg', '/Langlearn (3).jpeg', '/Langlearn (4).jpeg', '/Langlearn (5).jpeg'],
    description: '40+ language learning platform with schema-enforced JSON generation and voice-to-voice translation.'
  },
  {
    id: 'PRJ-05',
    title: 'EcoBot',
    category: 'VISION_COGNITION',
    tech: ['FastAPI', 'QLoRA', 'LLaMA 3', 'ChromaDB'],
    images: ['/ecobot.png'],
    useContain: true,
    description: 'Fine-tuned LLaMA 3 with QLoRA & 4-stage RAG pipeline returning structured output for waste classification.'
  }
];

const Works: React.FC = () => {
  return (
    <section id="works" className="relative py-16 md:py-40 bg-white overflow-hidden border-t border-black/10 transition-colors duration-500">
      <div className="px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto relative z-10">
        <div className="mb-12 md:mb-32">
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="font-mono text-accent font-bold text-sm tracking-[0.4em] uppercase">Project Archive</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-black tracking-tighter leading-[0.95]">
              TECHNICAL <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #000000' }}>RECORDS.</span>
            </h2>
          </ScrollReveal>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.15
              }
            }
          }}
          className="space-y-20 md:space-y-40 lg:space-y-60"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Parallax adjustment for smoother feel and no edge revealing
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images || [];
  
  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <motion.div
      ref={containerRef}
      variants={{
        hidden: { opacity: 0, y: 100, filter: 'blur(12px)' },
        visible: { 
          opacity: 1, 
          y: 0,
          filter: 'blur(0px)',
          transition: { 
            duration: 0.9, 
            ease: [0.16, 1, 0.3, 1] 
          }
        }
      }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
    >
      <div className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-accent font-bold tracking-widest">{project.id}</span>
            <div className="h-[1px] flex-1 bg-black/10" />
            <span className="font-mono text-xs text-accent/50 font-bold uppercase tracking-widest">{project.category}</span>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-black mb-8 tracking-tighter leading-[1.1] uppercase">{project.title}</h3>
            <p className="text-neutral-700 text-lg font-light leading-relaxed mb-10">{project.description}</p>
          </div>
          <div className="py-10 border-y border-black/10">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-accent font-bold">
                 <Terminal size={14} />
                 <span className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase">Stack_Profile</span>
               </div>
               <div className="flex flex-wrap gap-2">
                 {project.tech.map((t: string) => (
                   <span key={t} className="px-3 py-1 border border-black/10 font-mono text-[9px] font-bold text-black/70 uppercase">{t}</span>
                 ))}
               </div>
            </div>
          </div>
          <button className="group flex items-center gap-6 text-[10px] font-mono font-bold text-accent uppercase tracking-[0.4em] hover:text-accent/80 transition-colors">
            SYSTEM_DOCUMENTATION
            <div className="w-12 h-12 border border-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all">
              <ArrowUpRight size={18} />
            </div>
          </button>
        </div>
      </div>

      <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
        {/* Enforced isolation and overflow-hidden to prevent overlap */}
        <div className={`relative group overflow-hidden border border-black/10 aspect-video w-full isolation-isolate ${project.useContain ? 'bg-white' : 'bg-neutral-100'}`}>
          <motion.img 
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ y: isInView ? imgY : 0, scale: project.useContain ? 1 : 1.1 }}
            src={images[currentImageIndex]} 
            className={`w-full h-full ${project.useContain ? 'object-contain' : 'object-cover'} ${project.useContain ? 'brightness-100' : 'brightness-95 group-hover:brightness-100'} transition-all duration-700 ease-out`}
            alt={project.title}
            loading="lazy"
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-white/10 group-hover:opacity-0 transition-opacity pointer-events-none" />
          
          {/* Carousel controls - only show if multiple images */}
          {images.length > 1 && (
            <>
              {/* Next button */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent/80 hover:bg-accent flex items-center justify-center transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="text-black" size={20} />
              </button>
              
              {/* Progress indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-accent w-6' : 'bg-black/20 hover:bg-accent/40'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Works;
