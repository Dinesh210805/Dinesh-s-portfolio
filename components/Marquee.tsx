
import React from 'react';

interface ParallaxTextProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  duration?: number;
}

const ParallaxText: React.FC<ParallaxTextProps> = ({ children, direction = 'left', duration = 20 }) => {
  const animationClass = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div className="relative flex overflow-hidden select-none border-y border-white/5 py-4 bg-background">
      <div className={`flex whitespace-nowrap ${animationClass}`} style={{ animationDuration: `${duration}s` }}>
        {[...Array(10)].map((_, i) => (
          <span 
            key={i} 
            className="text-6xl md:text-8xl font-display font-bold uppercase text-transparent mx-8"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}
          >
            {children}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-left {
          animation: marquee-left linear infinite;
        }
        .marquee-right {
          animation: marquee-right linear infinite;
        }
      `}</style>
    </div>
  );
}

const Marquee: React.FC = () => {
  return (
    <div className="relative w-full py-10 bg-background overflow-hidden flex flex-col gap-2">
       <ParallaxText direction="left" duration={30}>
         CREATIVE DEVELOPER • OPEN FOR WORK • DINESH KUMAR •
       </ParallaxText>
       <ParallaxText direction="right" duration={40}>
         UI/UX DESIGN • FULL STACK • WEBGL • EXPERIENCES •
       </ParallaxText>
    </div>
  );
};

export default Marquee;
