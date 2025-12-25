
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../types';

interface SceneProps {
  isInView?: boolean;
}

export const Scene: React.FC<SceneProps> = ({ isInView = true }) => {
  const splineRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !isInView || !splineRef.current) return;

    let permissionGranted = false;

    const requestPermission = async () => {
      try {
        // @ts-ignore - iOS 13+ requires permission
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
          const permission = await DeviceOrientationEvent.requestPermission();
          permissionGranted = permission === 'granted';
        } else {
          permissionGranted = true;
        }
      } catch (error) {
        console.error('Error requesting sensor permission:', error);
      }
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!splineRef.current || !permissionGranted) return;

      const beta = event.beta || 0;  // -180 to 180 (front to back tilt)
      const gamma = event.gamma || 0; // -90 to 90 (left to right tilt)

      try {
        const splineElement = splineRef.current;
        
        // Map device orientation to viewport coordinates with high sensitivity
        // Center around 0, with 20 degree range for full movement
        const normalizedX = Math.max(0, Math.min(1, (gamma + 20) / 40));
        const normalizedY = Math.max(0, Math.min(1, (beta - 30) / 40));
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        const x = normalizedX * width;
        const y = normalizedY * height;

        // Try multiple approaches to control Spline
        // Approach 1: Direct property setting if available
        if (splineElement.setMousePosition) {
          splineElement.setMousePosition(normalizedX, normalizedY);
        }
        
        // Approach 2: Mouse event with pointer properties
        const mouseEvent = new PointerEvent('pointermove', {
          clientX: x,
          clientY: y,
          bubbles: true,
          cancelable: true,
          pointerType: 'mouse',
          isPrimary: true
        });
        splineElement.dispatchEvent(mouseEvent);

        // Approach 3: Touch event for mobile
        const touch = new Touch({
          identifier: Date.now(),
          target: splineElement,
          clientX: x,
          clientY: y,
          radiusX: 2.5,
          radiusY: 2.5,
          rotationAngle: 0,
          force: 0.5,
        });

        const touchEvent = new TouchEvent('touchmove', {
          cancelable: true,
          bubbles: true,
          touches: [touch],
          targetTouches: [touch],
          changedTouches: [touch],
        });
        splineElement.dispatchEvent(touchEvent);

      } catch (error) {
        console.error('Error updating spline orientation:', error);
      }
    };

    // Auto-request permission and start listening
    requestPermission().then(() => {
      if (permissionGranted || typeof DeviceOrientationEvent.requestPermission !== 'function') {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
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
