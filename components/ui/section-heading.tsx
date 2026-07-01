import React from 'react';
import ScrollReveal from './scroll-reveal';

/* Shared section heading.
 *
 * Uses the SAME display scale as the hero name ("Dinesh") so every section
 * title reads at the same monumental size. Left-aligned by default so the
 * heading's left edge lines up with the hero "D" (sections share the hero's
 * `px-6 md:px-12` gutter); `align="center"` is used only by Recognition.
 */

interface SectionHeadingProps {
  eyebrow?: string;
  align?: 'left' | 'center';
  className?: string;
  children: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  align = 'left',
  className = '',
  children,
}) => (
  <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
    {eyebrow && (
      <ScrollReveal>
        <div
          className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 dark:text-neutral-600 ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span className="h-px w-8 bg-current" />
          {eyebrow}
          {align === 'center' && <span className="h-px w-8 bg-current" />}
        </div>
      </ScrollReveal>
    )}
    <ScrollReveal delay={0.1} blur={false}>
      <h2 className="mt-5 font-display font-medium leading-[0.82] tracking-[-0.035em] text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12.5vw]">
        {children}
      </h2>
    </ScrollReveal>
  </div>
);

export default SectionHeading;
