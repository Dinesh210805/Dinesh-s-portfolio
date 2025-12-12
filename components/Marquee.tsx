import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from '@motionone/utils';

interface ParallaxTextProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const baseX = useSpring(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  // Skew effect based on velocity
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-30, 30]);
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const isHovered = useRef(false);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // If hovered, stop movement
    if (isHovered.current) {
        moveBy = 0;
    }

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    if (!isHovered.current) {
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <div 
        className="overflow-hidden m-0 flex flex-nowrap whitespace-nowrap cursor-pointer"
        onMouseEnter={() => isHovered.current = true}
        onMouseLeave={() => isHovered.current = false}
    >
      <motion.div 
        className="flex whitespace-nowrap flex-nowrap" 
        style={{ x }}
      >
        <motion.span 
            style={{ 
                skew: skewVelocity,
                WebkitTextStroke: '1px rgba(255,255,255,0.2)'
            } as any} 
            className="block mr-8 text-6xl md:text-8xl font-display font-bold uppercase text-transparent"
        >
            {children} 
        </motion.span>
        <motion.span 
            style={{ 
                skew: skewVelocity,
                WebkitTextStroke: '1px rgba(255,255,255,0.2)'
            } as any} 
            className="block mr-8 text-6xl md:text-8xl font-display font-bold uppercase text-transparent"
        >
            {children} 
        </motion.span>
        <motion.span 
            style={{ 
                skew: skewVelocity,
                WebkitTextStroke: '1px rgba(255,255,255,0.2)'
            } as any} 
            className="block mr-8 text-6xl md:text-8xl font-display font-bold uppercase text-transparent"
        >
            {children} 
        </motion.span>
        <motion.span 
            style={{ 
                skew: skewVelocity,
                WebkitTextStroke: '1px rgba(255,255,255,0.2)'
            } as any} 
            className="block mr-8 text-6xl md:text-8xl font-display font-bold uppercase text-transparent"
        >
            {children} 
        </motion.span>
      </motion.div>
    </div>
  );
}

const Marquee: React.FC = () => {
  return (
    <div className="relative w-full py-16 bg-background overflow-hidden border-y border-white/5 flex flex-col gap-4">
       <ParallaxText baseVelocity={-5}>CREATIVE DEVELOPER • OPEN FOR WORK • DINESH KUMAR • </ParallaxText>
       <ParallaxText baseVelocity={5}>UI/UX DESIGN • FULL STACK • WEBGL • EXPERIENCES • </ParallaxText>
    </div>
  );
};

export default Marquee;