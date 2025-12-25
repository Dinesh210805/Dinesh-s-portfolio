
import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useInView } from 'framer-motion';
import { wrap } from '@motionone/utils';

interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity: number;
}

const ParallaxText: React.FC<ParallaxTextProps> = ({ children, baseVelocity = 100 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  
  const baseX = useSpring(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-30, 30]);
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const isHovered = useRef(false);

  useAnimationFrame((t, delta) => {
    // CRITICAL: Stop the loop if the component is not in the viewport
    if (!isInView) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

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
        ref={containerRef}
        className="overflow-hidden m-0 flex flex-nowrap whitespace-nowrap cursor-pointer"
        onMouseEnter={() => isHovered.current = true}
        onMouseLeave={() => isHovered.current = false}
    >
      <motion.div 
        className="flex whitespace-nowrap flex-nowrap" 
        style={{ x }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.span 
            key={i}
            style={{ 
                skew: skewVelocity,
                WebkitTextStroke: '1px rgba(255,255,255,0.2)'
            } as any} 
            className="block mr-8 text-6xl md:text-8xl font-display font-bold uppercase text-transparent"
          >
            {children} 
          </motion.span>
        ))}
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
