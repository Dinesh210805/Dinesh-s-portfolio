import React from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Apple-style cubic bezier
      }}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;
