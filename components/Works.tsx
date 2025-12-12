import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: 'Nexus Fintech',
    category: 'SaaS / Dashboard',
    image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Aura Commerce',
    category: 'E-Commerce / Experience',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Chronos',
    category: 'Creative Portfolio',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Vanguard AI',
    category: 'Landing Page',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop'
  }
];

const Works: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="works" className="py-32 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
       <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div>
            <span className="font-mono text-accent mb-4 block text-lg">03. Works</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Selected Projects</h2>
         </div>
         <a href="#" className="text-secondary hover:text-white underline decoration-accent underline-offset-4 transition-colors">
           View All Archives
         </a>
      </div>

      <div className="flex flex-col gap-32">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    // Parallax effect for image inside the container
    const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="group"
        >
             {/* Info Header */}
             <div className="flex justify-between items-end mb-6 px-2">
                <div>
                    <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors duration-500">
                        {project.title}
                    </h3>
                    <div className="flex gap-4 items-center">
                        <span className="font-mono text-accent text-sm">0{index + 1}</span>
                        <span className="font-mono text-secondary text-sm uppercase tracking-wider">{project.category}</span>
                    </div>
                </div>
                <div className="hidden md:block">
                     <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                        <ArrowUpRight className="text-white group-hover:text-black" size={20} />
                     </div>
                </div>
             </div>

            {/* Image Container */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface">
                <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                    />
                </motion.div>
                
                {/* Overlay Flash */}
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none" />
                
                {/* Mobile Icon */}
                <div className="absolute bottom-4 right-4 md:hidden">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                         <ArrowUpRight className="text-black" size={20} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Works;