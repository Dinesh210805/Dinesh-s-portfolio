import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  ShieldCheck, 
  ExternalLink, 
  Award, 
  Fingerprint, 
  Cpu, 
  Globe, 
  Hash,
  Database,
  Lock,
  BrainCircuit
} from 'lucide-react';
import { Certification } from '../types';

const certifications: (Certification & { slug: string; id_hex: string; link: string })[] = [
  {
    id: 'CERT_01',
    id_hex: '0x_FS_772',
    title: 'Diploma in Full Stack Development',
    issuer: 'I Shine Info Tech',
    slug: 'react',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
    date: '2023',
    link: 'https://drive.google.com/file/d/1qrIg6CE9CADRlQ58rG0f6GQkcKFhToZw/view?usp=sharing'
  },
  {
    id: 'CERT_02',
    id_hex: '0x_AI_991',
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft & LinkedIn',
    slug: 'linkedin',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    date: '2024',
    link: 'https://www.linkedin.com/learning/certificates/e4cb08e17e29e60b42bc2f69d154df89c11852782543ffb319372ff9d16f9d5f'
  },
  {
    id: 'CERT_03',
    id_hex: '0x_JV_441',
    title: 'Programming in Java (NPTEL)',
    issuer: 'NPTEL / IIT Madras',
    slug: 'openjdk',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
    date: '2023',
    link: 'https://drive.google.com/file/d/13DtTDlZQNWFqcaCyCkucnsdh_4QkIbsJ/view?usp=sharing'
  },
  {
    id: 'CERT_04',
    id_hex: '0x_DB_220',
    title: 'Database Management System (NPTEL)',
    issuer: 'NPTEL / IIT Kharagpur',
    slug: 'sqlite',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop',
    date: '2023',
    link: 'https://drive.google.com/file/d/1oeYc41j95ufyLGjufpDb9rp585uhoxgb/view?usp=sharing'
  }
];

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-16 md:py-32 bg-white dark:bg-background relative overflow-hidden transition-colors duration-500">
      {/* BACKGROUND GRID ARCHIVE */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] text-black dark:text-[#CCFF00]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="px-5 md:px-10 lg:px-20 max-w-[1600px] mx-auto relative z-10">
        
        {/* VAULT HEADER */}
        <div className="mb-12 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-[1px] bg-accent" />
              <span className="font-mono text-accent text-[10px] tracking-[0.6em] uppercase italic font-bold">Credential Protocol</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold text-black dark:text-white tracking-tighter leading-[0.9] uppercase">
              VERIFIED <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #CCFF00' }}>ARCHIVE.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 font-mono border-l border-black/10 dark:border-white/10 pl-8 lg:max-w-[320px]">
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-accent" />
              <span className="text-[10px] text-black/60 dark:text-white/60 tracking-[0.3em] uppercase">Auth_Status: Level_5</span>
            </div>
            <p className="text-[10px] text-secondary leading-relaxed uppercase tracking-widest">
              Digital twin verification of all industrial certifications. Every module is hashed and stored within the DK_Vault substrate.
            </p>
          </div>
        </div>

        {/* VAULT MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {certifications.map((cert, index) => (
            <CredentialModule key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* BOTTOM SCAN STATUS */}
        <div className="mt-12 md:mt-24 pt-8 md:pt-12 border-t border-black/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 dark:opacity-20 text-black dark:text-white">
           <div className="flex gap-12 font-mono text-[8px] uppercase tracking-[0.4em]">
              <span className="flex items-center gap-2"><Globe size={10}/> Global_DNS_Ready</span>
              <span className="flex items-center gap-2"><Lock size={10}/> Encrypted_SSL_T1</span>
           </div>
        </div>
      </div>
    </section>
  );
};

const CredentialModule: React.FC<{ cert: any; index: number }> = ({ cert, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const logoUrl = `https://cdn.simpleicons.org/${cert.slug}/CCFF00`;
  const isAICert = cert.slug === 'linkedin';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-neutral-100 dark:bg-[#0a0a0a] border border-black/10 dark:border-white/5 p-1 hover:border-accent/40 transition-all duration-700 overflow-hidden"
    >
      <div className="bg-white dark:bg-[#080808] p-8 lg:p-12 h-full flex flex-col justify-between relative overflow-hidden transition-colors duration-500">
        
        {/* HUD DECORATIVE OVERLAY */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1 opacity-10 group-hover:opacity-30 transition-opacity">
          <Hash size={12} className="text-black dark:text-white" />
          <span className="font-mono text-[7px] text-black dark:text-white uppercase tracking-widest">{cert.id_hex}</span>
        </div>

        <div className="space-y-12 relative z-10">
          {/* HEADER AREA */}
          <div className="flex justify-between items-start">
            <div className="w-20 h-20 bg-accent/[0.03] border border-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all duration-500 rounded-none shadow-[inset_0_0_15px_rgba(204,255,0,0.05)]">
              {isAICert ? (
                <BrainCircuit size={40} className="text-accent group-hover:text-black transition-all" />
              ) : (
                <img src={logoUrl} alt={cert.issuer} className="w-10 h-10 object-contain group-hover:invert transition-all" />
              )}
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-accent">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[8px] font-bold tracking-[0.3em] uppercase">Status: Verified</span>
              </div>
              <span className="font-mono text-[10px] text-black/40 dark:text-white/40 uppercase tracking-[0.2em]">{cert.date}</span>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-black/50 dark:text-white/50 tracking-[0.4em] uppercase">Issuer // {cert.issuer}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-black dark:text-white group-hover:text-accent transition-colors duration-500 leading-[0.9] uppercase tracking-tighter">
              {cert.title}
            </h3>
          </div>
        </div>

        {/* INTERACTIVE DATA FOOTER */}
        <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/5 flex items-center justify-between relative z-10">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-black/40 dark:text-white/40 hover:text-accent hover:border-accent transition-all cursor-none group/btn">
              <Database size={14} />
            </div>
            <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-black/40 dark:text-white/40 hover:text-accent hover:border-accent transition-all cursor-none">
              <Cpu size={14} />
            </div>
          </div>
          
          <motion.a 
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 text-[9px] font-mono font-bold text-black/60 dark:text-white/60 hover:text-accent transition-colors uppercase tracking-[0.4em]"
          >
            Access_Credential
            <div className="w-10 h-10 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all duration-500">
              <ExternalLink size={14} />
            </div>
          </motion.a>
        </div>

        {/* HOLOGRAPHIC SCAN EFFECT */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/20 translate-y-[-100%] group-hover:translate-y-[1000%] transition-transform duration-[2s] ease-in-out" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>

        {/* BG DECAL */}
        <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
          <Award size={200} className="text-black dark:text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default Certifications;