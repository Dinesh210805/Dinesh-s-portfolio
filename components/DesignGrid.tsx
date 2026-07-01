import React from 'react';

/* Global editorial guide grid.
 *
 * A single fixed, full-bleed overlay that runs through the entire site. Each
 * column carries a left AND right hairline, so the gutters read as the "double
 * lines" of the Katerina grid (8 columns, 24px gutters, 48px margins on
 * desktop). Content across sections aligns to these columns.
 *
 * Sits behind content at z-0 — sections are transparent so the base page colour
 * (on the root wrapper) and this grid show through. Kept faint so it guides
 * without shouting.
 */

const LINE = 'border-black/[0.07] dark:border-white/[0.055]';
const HAIR = { borderLeftWidth: '0.8px', borderRightWidth: '0.8px' } as const;

const DesignGrid: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
    {/* mobile — 4 columns */}
    <div className="grid h-full grid-cols-4 gap-4 px-6 lg:hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className={`border-x ${LINE}`} style={HAIR} />
      ))}
    </div>
    {/* desktop — 8 columns, 24px gutters, 48px margins */}
    <div className="hidden h-full grid-cols-8 gap-6 px-12 lg:grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className={`border-x ${LINE}`} style={HAIR} />
      ))}
    </div>
  </div>
);

export default DesignGrid;
