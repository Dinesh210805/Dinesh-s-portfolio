import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Smartphone, Zap } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '01',
    title: 'Frontend Development',
    description: 'Building responsive, high-performance web applications using React, Next.js, and Tailwind CSS.',
    icon: 'Code'
  },
  {
    id: '02',
    title: 'UI/UX Design',
    description: 'Crafting intuitive user journeys and high-fidelity prototypes in Figma.',
    icon: 'Layout'
  },
  {
    id: '03',
    title: 'Backend Engineering',
    description: 'Developing scalable APIs and database architectures with Node.js, Express, and MongoDB.',
    icon: 'Zap'
  },
  {
    id: '04',
    title: 'Mobile Apps',
    description: 'Cross-platform mobile application development using React Native.',
    icon: 'Smartphone'
  }
];

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code size={32} />,
  Layout: <Layout size={32} />,
  Zap: <Zap size={32} />,
  Smartphone: <Smartphone size={32} />,
};

const Services: React.FC = () => {
  return (
    <section className="py-32 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
      <div className="mb-16">
         <span className="font-mono text-accent mb-4 block text-lg">02. Services</span>
         <h2 className="text-4xl md:text-5xl font-display font-bold text-white">What I Do</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, borderColor: '#CCFF00' }}
            className="group p-10 border border-white/10 bg-surface hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all duration-500">
               <span className="font-mono text-xl">{service.id}</span>
            </div>
            
            <div className="mb-8 text-secondary group-hover:text-accent transition-colors duration-300">
              {iconMap[service.icon]}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
              {service.title}
            </h3>
            
            <p className="text-secondary leading-relaxed max-w-sm">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;