
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import '../types';

interface SceneProps {
  isInView?: boolean;
  /** Fired once the Spline scene has finished loading. */
  onLoaded?: () => void;
}

export const Scene: React.FC<SceneProps> = ({ isInView = true, onLoaded }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {isInView ? (
          <motion.div
            key="spline-active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <Spline
              scene="https://prod.spline.design/UTIsnsf41Ax0oLMK/scene.splinecode"
              onLoad={() => onLoaded?.()}
              className={`h-full w-full pointer-events-auto ${isMobile ? 'scale-110' : 'scale-105'}`}
            />
            {/* Cover the Spline watermark */}
            <div className="absolute bottom-0 right-0 z-20 h-14 w-36 bg-[#050505]" />
          </motion.div>
        ) : (
          /* Static fallback while off-screen — consumes 0% GPU */
          <motion.div
            key="static-fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full bg-[radial-gradient(ellipse_at_center,#141417_0%,#050505_70%)]"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
