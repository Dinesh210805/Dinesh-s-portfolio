import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number; // Delay in seconds
  duration?: number; // Duration of the scramble effect in seconds
  characters?: string;
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 1.2,
  characters = DEFAULT_CHARS,
}) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let frameId: number;
    let frame = 0;

    const startAnimation = () => {
      const length = text.length;
      let start = 0;
      
      const animate = () => {
        let output = '';
        let complete = 0;

        for (let i = 0; i < length; i++) {
          if (i < start) {
            output += text[i];
            complete++;
          } else if (text[i] === ' ') {
            output += ' ';
            complete++;
          } else {
            output += characters[Math.floor(Math.random() * characters.length)];
          }
        }

        setDisplayText(output);

        if (complete === length) {
          return;
        }

        // Increase the 'start' index gradually based on duration
        // We assume approx 60fps, so duration * 60 total frames.
        const totalFrames = duration * 60;
        frame++;
        
        // Every (totalFrames / length) frames, we reveal another character
        const framesPerChar = Math.max(1, totalFrames / length);
        start = Math.floor(frame / framesPerChar);

        frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);
    };

    timeoutId = setTimeout(startAnimation, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [text, delay, duration, characters]);

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: delay }}
    >
      {displayText}
    </motion.span>
  );
};
