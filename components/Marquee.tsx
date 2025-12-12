import React from 'react';
import { motion } from 'framer-motion';

const Marquee: React.FC = () => {
  const marqueeText = "CREATIVE DEVELOPER • OPEN FOR WORK • DINESH KUMAR • UI/UX DESIGN • FULL STACK • ";
  
  return (
    <div className="relative w-full py-12 bg-background overflow-hidden border-y border-white/5">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {[...Array(4)].map((_, i) => (
             <h2
               key={i}
               className="text-6xl md:text-8xl font-display font-bold uppercase text-transparent px-4"
               style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
             >
               {marqueeText}
             </h2>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;