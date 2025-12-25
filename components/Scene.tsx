
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import '../types';

interface SceneProps {
  isInView?: boolean;
}

export const Scene: React.FC<SceneProps> = ({ isInView = true }) => {
  const splineRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasGyroPermission, setHasGyroPermission] = useState(false);
  
  // Motion values for gyroscope-based rotation
  const rotationX = useMotionValue(0);
  const rotationY = useMotionValue(0);
  
  // Spring configuration for smooth gyroscope movement
  const springConfig = { damping: 20, stiffness: 100 };
  const smoothRotationX = useSpring(rotationX, springConfig);
  const smoothRotationY = useSpring(rotationY, springConfig);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Request gyroscope permission and setup device orientation listeners
  useEffect(() => {
    if (!isMobile || !isInView) return;

    const requestGyroPermission = async () => {
      // iOS 13+ requires explicit permission
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            setHasGyroPermission(true);
          }
        } catch (error) {
          console.log('Gyroscope permission denied');
        }
      } else {
        // Android and older iOS versions
        setHasGyroPermission(true);
      }
    };

    requestGyroPermission();
  }, [isMobile, isInView]);

  // Handle device orientation for gyroscope control
  useEffect(() => {
    if (!isMobile || !hasGyroPermission || !isInView || !splineRef.current) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta || 0;   // X-axis rotation (-180 to 180)
      const gamma = event.gamma || 0;  // Y-axis rotation (-90 to 90)

      // Map device orientation to rotation values
      // Normalize and invert for natural movement
      const normalizedX = (beta - 90) / 90; // -1 to 1
      const normalizedY = gamma / 90;       // -1 to 1

      rotationX.set(normalizedX * 30); // Scale to reasonable rotation range
      rotationY.set(normalizedY * 30);

      // Apply rotation to Spline viewer if available
      if (splineRef.current) {
        const splineElement = splineRef.current as any;
        if (splineElement.emitEvent) {
          splineElement.emitEvent('mouseMove', {
            x: 0.5 + normalizedY * 0.3,
            y: 0.5 + normalizedX * 0.3
          });
        }
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isMobile, hasGyroPermission, isInView, rotationX, rotationY]);

  // Handle cursor movement for desktop
  useEffect(() => {
    if (isMobile || !isInView || !splineRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!splineRef.current) return;
      
      const splineElement = splineRef.current as any;
      const rect = splineElement.getBoundingClientRect();
      
      // Calculate normalized position (0 to 1)
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      if (splineElement.emitEvent) {
        splineElement.emitEvent('mouseMove', { x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, isInView]);

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
            {/* The Spline Viewer - Hard unmount when isInView is false */}
            {/* @ts-ignore */}
            <spline-viewer 
              ref={splineRef}
              url="https://prod.spline.design/UTIsnsf41Ax0oLMK/scene.splinecode"
              loading-anim-type="none"
              className={`w-full h-full pointer-events-auto ${
                isMobile ? 'scale-[0.6] md:scale-105' : 'scale-105'
              }`}
            />

            {/* Shield Spline Watermark */}
            <div className="absolute bottom-0 right-0 w-36 h-14 bg-background z-20 pointer-events-none" />
            
            {/* Gyroscope indicator for mobile */}
            {isMobile && !hasGyroPermission && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent/10 border border-accent/30 backdrop-blur-md px-4 py-2 rounded-full"
                >
                  <p className="text-accent text-xs font-mono">Tap to enable gyroscope</p>
                </motion.div>
              </div>
            )}
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
