import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { Certification } from '../types';

const certifications: Certification[] = [
  {
    id: 'CERT_01',
    title: 'Diploma in Full Stack Development',
    issuer: 'I Shine Info Tech',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
    date: '2023'
  },
  {
    id: 'CERT_02',
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft & LinkedIn',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    date: '2024'
  },
  {
    id: 'CERT_03',
    title: 'Programming in Java (NPTEL)',
    issuer: 'NPTEL / IIT Madras',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
    date: '2023'
  },
  {
    id: 'CERT_04',
    title: 'Database Management System (NPTEL)',
    issuer: 'NPTEL / IIT Kharagpur',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop',
    date: '2023'
  }
];

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-40 bg-background relative overflow-hidden">
      {/* Background Tech Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] aspect-square border border-accent rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] aspect-square border border-white rounded-full" />
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
            <span className="font-mono text-accent text-sm tracking-[0.4em] uppercase">Verified_Credentials</span>
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[0.9]">
            SKILL <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #CCFF00' }}>CERTIFIED.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CertificationCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group bg-background p-10 flex flex-col justify-between aspect-square relative overflow-hidden"
    >
      {/* Interactive Background */}
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-700" />
      <div className="absolute bottom-[-50%] right-[-50%] w-full h-full bg-accent/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-secondary group-hover:text-accent group-hover:border-accent transition-all duration-500">
            <ShieldCheck size={24} />
          </div>
          <div className="flex flex-col items-end">
             <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.2em]">VERIFIED</span>
             <CheckCircle2 size={12} className="text-accent mt-1" />
          </div>
        </div>

        <h3 className="text-2xl font-display font-bold text-white mb-4 leading-tight group-hover:text-accent transition-colors">
          {cert.title}
        </h3>
        <p className="text-secondary font-mono text-[10px] uppercase tracking-widest">{cert.issuer}</p>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="flex justify-between items-end border-t border-white/5 pt-8">
          <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em]">{cert.date || 'LIFETIME'}</span>
          <button className="flex items-center gap-2 text-[10px] font-mono font-bold text-secondary hover:text-white transition-colors uppercase tracking-widest">
            Source <ExternalLink size={14} />
          </button>
        </div>
      </div>
      
      {/* Card Glitch Highlight */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </motion.div>
  );
};

export default Certifications;
