import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

/* Bordered logo grid (replaces the old skills marquee).
 *
 * Monochrome silhouettes via the simple-icons CDN, fetched black and flipped to
 * white in dark mode (`dark:invert`) so they read on both the bone and the
 * near-black surfaces — matching the site's monochrome editorial language.
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
        <img
          src={`https://cdn.simpleicons.org/${logo.slug}/171717`}
          alt={logo.label}
          loading="lazy"
          className="h-7 w-auto select-none opacity-60 grayscale transition-opacity duration-300 group-hover/logo:opacity-100 dark:invert md:h-8"
        />
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
