
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import '../types';

interface SceneProps {
  isInView?: boolean;
}

export const Scene: React.FC<SceneProps> = ({ isInView = true }) => {
  const splineRef = useRef<any>(null);
  const [sensorPermission, setSensorPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
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
    if (!isMobile || !isInView) return;

    // Show permission prompt after 2 seconds on mobile
    const timer = setTimeout(() => {
      if (sensorPermission === 'pending') {
        setShowPermissionPrompt(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isMobile, isInView, sensorPermission]);

  const requestSensorPermission = async () => {
    if (typeof DeviceOrientationEvent === 'undefined') {
      setSensorPermission('denied');
      setShowPermissionPrompt(false);
      return;
    }

    try {
      // @ts-ignore - iOS 13+ requires permission
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setSensorPermission('granted');
          enableSensorControls();
        } else {
          setSensorPermission('denied');
        }
      } else {
        // Android or older browsers
        setSensorPermission('granted');
        enableSensorControls();
      }
    } catch (error) {
      console.error('Error requesting sensor permission:', error);
      setSensorPermission('denied');
    }
    setShowPermissionPrompt(false);
  };

  const enableSensorControls = () => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!splineRef.current) return;

      // Get device orientation values
      const beta = event.beta || 0;  // -180 to 180 (front to back tilt)
      const gamma = event.gamma || 0; // -90 to 90 (left to right tilt)

      console.log('Orientation:', { beta, gamma }); // Debug log

      try {
        const splineElement = splineRef.current;
        
        // Map orientation to pixel coordinates
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Normalize gamma (-90 to 90) to screen width
        const x = ((gamma + 90) / 180) * width;
        
        // Normalize beta (-180 to 180) to screen height
        const y = ((beta + 90) / 180) * height;
        
        console.log('Mapped coordinates:', { x, y }); // Debug log

        // Dispatch mousemove event
        const rect = splineElement.getBoundingClientRect();
        const evt = new MouseEvent('mousemove', {
          clientX: x,
          clientY: y,
          bubbles: true,
          cancelable: true,
          view: window
        });
        splineElement.dispatchEvent(evt);
      } catch (error) {
        console.error('Error updating spline orientation:', error);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  };

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    if (sensorPermission === 'granted') {
      cleanup = enableSensorControls();
    }
    return () => {
      if (cleanup) cleanup();
    };
  }, [sensorPermission]);

  const dismissPermissionPrompt = () => {
    setShowPermissionPrompt(false);
    setSensorPermission('denied');
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      {/* Sensor Permission Prompt */}
      <AnimatePresence>
        {showPermissionPrompt && isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 pointer-events-auto"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={dismissPermissionPrompt} />
            
            {/* Modal */}
            <div className="relative bg-[#0a0a0a] border border-accent/30 backdrop-blur-xl p-6 rounded-sm max-w-sm w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone size={20} className="text-accent" />
                <h3 className="font-mono text-sm text-white uppercase tracking-wider">
                  Sensor Access
                </h3>
              </div>
              <p className="text-xs text-white/60 mb-6 leading-relaxed">
                Allow device orientation access to control the 3D model by tilting your phone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={requestSensorPermission}
                  className="flex-1 bg-accent text-black font-mono text-xs uppercase tracking-wider py-3 px-4 hover:bg-accent/80 transition-colors font-bold"
                >
                  Allow
                </button>
                <button
                  onClick={dismissPermissionPrompt}
                  className="flex-1 bg-white/5 text-white/60 font-mono text-xs uppercase tracking-wider py-3 px-4 hover:bg-white/10 transition-colors border border-white/10"
                >
                  Deny
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
