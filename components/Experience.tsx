import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceItem } from '../types';

const experiences: ExperienceItem[] = [
  {
    id: 1,
    year: '2023 - Present',
    role: 'Senior Frontend Engineer',
    company: 'TechFlow Solutions'
  },
  {
    id: 2,
    year: '2021 - 2023',
    role: 'Full Stack Developer',
    company: 'Creative Agency X'
  },
  {
    id: 3,
    year: '2019 - 2021',
    role: 'UI Designer & Dev',
    company: 'Startup Inc.'
  },
  {
    id: 4,
    year: '2018 - 2019',
    role: 'Junior Web Developer',
    company: 'Freelance'
  }
];

const Experience: React.FC = () => {
  return (
    <section className="py-32 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Title Column */}
        <div>
           <span className="font-mono text-accent mb-4 block text-lg">04. History</span>
           <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
             Work <br /> Experience
           </h2>
           <p className="mt-6 text-secondary max-w-xs">
             A timeline of my professional career and growth in the tech industry.
           </p>
        </div>

        {/* Timeline Column */}
        <div className="lg:col-span-2">
          <div className="flex flex-col">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-white/10 hover:bg-white/5 px-6 transition-colors duration-300"
              >
                <span className="font-mono text-secondary text-sm md:text-base w-40 group-hover:text-white transition-colors">
                  {exp.year}
                </span>
                
                <h3 className="text-2xl font-display font-bold text-white flex-1 group-hover:text-accent transition-colors">
                  {exp.role}
                </h3>
                
                <span className="text-secondary text-lg mt-2 md:mt-0 group-hover:text-white transition-colors">
                  {exp.company}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;