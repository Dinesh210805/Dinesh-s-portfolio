
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import '../types';

interface SceneProps {
  isInView?: boolean;
}

export const Scene: React.FC<SceneProps> = ({ isInView = true }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {isInView ? (
          <motion.div 
            key="spline-active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* React Spline Component */}
            <Spline
              scene="https://prod.spline.design/UTIsnsf41Ax0oLMK/scene.splinecode"
              className={`w-full h-full pointer-events-auto ${isMobile ? 'scale-100' : 'scale-105'}`}
            />

            {/* Shield Spline Watermark */}
            <div className="absolute bottom-0 right-0 w-36 h-14 bg-background z-20 pointer-events-none" />
          </motion.div>
        ) : (
          /* Static Image Fallback: Consumes 0% GPU */
          <motion.div 
            key="static-fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="w-full h-full bg-background flex items-center justify-center overflow-hidden"
          >
             <img 
               src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?q=80&w=2000&auto=format&fit=crop" 
               className="w-full h-full object-cover grayscale opacity-20 blur-sm scale-110"
               alt="Static Environment"
             />
             <div className="absolute inset-0 bg-background/60" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_70%,rgba(5,5,5,0.9)_100%)] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </div>
  );
};
