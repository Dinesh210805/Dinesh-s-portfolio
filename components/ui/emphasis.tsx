import React from 'react';

/* ─────────────────────────────────────────────────────────────
 * Emphasis — the "muted body, bright key words" treatment.
 * Use inside a muted paragraph (text-neutral-500) so the emphasis
 * pops to full foreground. Two flavours:
 *   <Em>   — brighter + medium weight
 *   <Mark> — subtle highlighter background
 * Theme-aware (black on light, white on dark).
 * ───────────────────────────────────────────────────────────── */

interface Props {
  children: React.ReactNode;
}

export const Em: React.FC<Props> = ({ children }) => (
  <span className="font-medium text-black dark:text-white">{children}</span>
);

export const Mark: React.FC<Props> = ({ children }) => (
  <span className="rounded-[4px] bg-black/[0.07] px-1.5 py-0.5 font-medium text-black dark:bg-white/10 dark:text-white">
    {children}
  </span>
);
