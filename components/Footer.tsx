import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';

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

  // Footer is fixed at bottom with z-0. 
  // It stays in place while the content (z-10) scrolls up to reveal it.
  return (
    <footer 
      id="contact" 
      className="fixed bottom-0 left-0 right-0 h-[100vh] z-0 bg-[#020202] flex flex-col justify-between pt-32 px-5 md:px-10 lg:px-20 overflow-hidden"
    >
      
      {/* Top Section */}
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
        <div>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white uppercase leading-[0.9] tracking-tighter">
            Let's <br/> <span className="text-accent">Work</span> <br/> Together
          </h2>
        </div>
        
        <div className="flex flex-col justify-end items-start md:items-end">
          <a 
            href="mailto:hello@dinesh.dev" 
            className="group flex items-center gap-4 text-2xl md:text-4xl font-sans text-white hover:text-accent transition-colors mb-8"
          >
            hello@dinesh.dev
            <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <div className="flex gap-6">
            {[
              { icon: <Github size={24} />, href: '#' },
              { icon: <Linkedin size={24} />, href: '#' },
              { icon: <Twitter size={24} />, href: '#' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full mt-auto relative z-10">
         <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
            <div className="flex flex-col">
              <span className="font-mono text-secondary text-sm">Local Time</span>
              <span className="font-mono text-white text-xl">{time} GMT+5:30</span>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="font-mono text-secondary hover:text-white text-sm">Resume</a>
              <a href="#" className="font-mono text-secondary hover:text-white text-sm">Credits</a>
            </div>
         </div>

         {/* Giant Name Mask */}
         <div className="relative w-full overflow-hidden select-none">
           <h1 className="text-[15vw] md:text-[18vw] font-display font-bold text-[#111] leading-none text-center tracking-tighter mix-blend-difference">
             DINESH
           </h1>
         </div>
      </div>
      
      {/* Background Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/50 pointer-events-none" />
    </footer>
  );
};

export default Footer;