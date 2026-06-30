
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer 
      className="sticky bottom-0 left-0 right-0 min-h-screen z-10 bg-[#020202] flex flex-col justify-between pt-24 md:pt-32 px-6 md:px-10 lg:px-20 overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-10">
        <div>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold text-white uppercase leading-[1.1] md:leading-[0.9] tracking-tighter will-change-transform">
            LET'S <br/> <span className="text-accent">CONNECT</span>
          </h2>
        </div>
        
        <div className="flex flex-col justify-end items-start md:items-end gap-6">
          <a 
            href="mailto:dinesh210805@gmail.com" 
            className="group flex flex-wrap items-center gap-4 text-xl md:text-4xl font-sans text-white hover:text-accent transition-colors break-all"
          >
            dinesh210805@gmail.com
            <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform shrink-0" size={24} />
          </a>
          <a 
            href="tel:+919943125323" 
            className="group flex items-center gap-4 text-lg md:text-xl font-mono text-secondary hover:text-white transition-colors"
          >
            +91 9943125323
          </a>
          
          <div className="flex gap-4 md:gap-6 mt-4">
            {[
              { icon: <Github size={20} />, href: 'https://github.com/Dinesh210805' },
              { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/dinesh-kumar-c-93a38129b' },
              { icon: <Mail size={20} />, href: 'mailto:dinesh210805@gmail.com' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 md:p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mt-auto relative z-10">
         <div className="border-t border-white/10 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-secondary text-[10px] md:text-sm uppercase tracking-widest">Zone Identity</span>
              <span className="font-mono text-white text-base md:text-xl tracking-tighter">{time} GMT+5:30 • PUDUCHERRY</span>
            </div>
            
            <div className="flex gap-6 md:gap-8">
              <span className="font-mono text-secondary text-[10px] md:text-sm uppercase tracking-widest">Portfolio V.1.0</span>
              <a href="/Dinesh_Kumar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-secondary hover:text-white text-[10px] md:text-sm uppercase tracking-widest">Resume</a>
            </div>
         </div>

         <div className="relative w-full overflow-hidden select-none pb-4">
           <h1 className="text-[18vw] font-display font-bold text-[#111] leading-none text-center tracking-tighter mix-blend-difference will-change-transform uppercase">
             DINESH
           </h1>
         </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/50 pointer-events-none" />
    </footer>
  );
};

export default Footer;
