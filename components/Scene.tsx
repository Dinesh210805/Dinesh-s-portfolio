
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../types';

interface SceneProps {
  isInView?: boolean;
}

export const Scene: React.FC<SceneProps> = ({ isInView = true }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {isInView ? (
          <motion.div 
            key="spline-active-container" // Key change forces fresh mount/unmount
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full h-full flex items-center justify-center pointer-events-auto"
          >
            {/* The Spline Viewer - Physically removed from DOM when isInView is false */}
            {/* @ts-ignore */}
            <spline-viewer 
              url="https://prod.spline.design/UTIsnsf41Ax0oLMK/scene.splinecode"
              loading-anim-type="none"
              className="w-full h-full scale-105 pointer-events-auto"
            />

            {/* WATERMARK SHIELD: Masks the Spline logo at bottom-right */}
            <div className="absolute bottom-0 right-0 w-36 h-14 bg-background z-20 pointer-events-none" />
          </motion.div>
        ) : (
          /* Placeholder strictly replaces the WebGL element */
          <div key="spline-idle-placeholder" className="w-full h-full bg-background" />
        )}
      </AnimatePresence>
      
      {/* Cinematic Overlays - Lightweight CSS based visuals */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_70%,rgba(5,5,5,0.9)_100%)] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </div>
  );
};
