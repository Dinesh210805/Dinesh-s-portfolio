
import React from 'react';

interface ParallaxTextProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  duration?: number;
  isAccent?: boolean;
}

const ParallaxText: React.FC<ParallaxTextProps> = ({ children, direction = 'left', duration = 20, isAccent = false }) => {
  const animationClass = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div className="relative flex overflow-hidden select-none border-y border-white/5 py-4 bg-background">
      <div className={`flex whitespace-nowrap ${animationClass}`} style={{ animationDuration: `${duration}s` }}>
        {[...Array(10)].map((_, i) => (
          <span 
            key={i} 
            className="text-3xl sm:text-5xl md:text-8xl font-display font-bold uppercase text-transparent mx-4 md:mx-8"
            style={{ WebkitTextStroke: isAccent ? '1px #CCFF00' : '1.5px rgba(255,255,255,0.3)' }}
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
    <div className="relative w-full py-4 md:py-10 bg-background overflow-hidden flex flex-col gap-2">
       <ParallaxText direction="left" duration={30} isAccent={true}>
         CREATIVE DEVELOPER • OPEN FOR WORK • DINESH KUMAR •
       </ParallaxText>
       <ParallaxText direction="right" duration={60}>
         AI/ML ENGINEER • GENERATIVE AI • FULL STACK • PROBLEM SOLVER •
       </ParallaxText>
    </div>
  );
};

export default Marquee;
