import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

/* Bordered logo grid (replaces the old skills marquee).
 *
 * Full-color original brand logos via the simple-icons CDN. Each sits on a
 * small always-light chip so brand-black marks (GitHub, etc.) stay visible
 * against the near-black dark surface without inverting — and colored marks
 * (Python, TensorFlow, Docker...) keep their real colors in both themes.
 * Corner "+" ticks and the full-bleed top/bottom rules echo the reference. */

export interface LogoItem {
  slug: string; // simple-icons slug
  label: string;
}

interface LogoCloudProps {
  logos: LogoItem[];
  className?: string;
}

const LogoCloud: React.FC<LogoCloudProps> = ({ logos, className }) => (
  <div
    className={cn(
      'relative grid grid-cols-2 border-l border-t border-black/10 dark:border-white/10 sm:grid-cols-3 md:grid-cols-4',
      className,
    )}
  >
    {/* full-bleed rules that run past the grid, top and bottom */}
    <div className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2 border-t border-black/10 dark:border-white/10" />
    <div className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b border-black/10 dark:border-white/10" />

    {logos.map((logo, i) => (
      <div
        key={logo.slug + i}
        className="group/logo relative flex flex-col items-center justify-center gap-4 border-b border-r border-black/10 px-4 py-12 transition-colors duration-300 hover:bg-black/[0.02] dark:border-white/10 dark:hover:bg-white/[0.03] md:py-14"
      >
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover/logo:scale-105 md:h-12 md:w-12">
          <img
            src={`https://cdn.simpleicons.org/${logo.slug}`}
            alt={logo.label}
            loading="lazy"
            className="h-6 w-auto select-none opacity-90 transition-opacity duration-300 group-hover/logo:opacity-100 md:h-7"
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
          {logo.label}
        </span>
        {/* corner tick on the trailing corner of each cell */}
        <Plus
          aria-hidden
          strokeWidth={1}
          className="absolute -bottom-[9px] -right-[9px] z-10 hidden h-[18px] w-[18px] text-black/15 dark:text-white/15 md:block"
        />
      </div>
    ))}
  </div>
);

export default LogoCloud;
