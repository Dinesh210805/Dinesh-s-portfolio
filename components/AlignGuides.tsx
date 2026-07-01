import React, { useEffect, useRef, useState } from 'react';
import { SHOW_ALIGN_GUIDES } from '../lib/dev';

/* Dev-only per-element alignment guides.
 *
 * For every element marked with `data-guide` (optionally `data-guide="label"`),
 * draws full-width horizontal lines at its top & bottom edges and full-height
 * vertical lines at its left & right edges. Because the lines span the whole
 * viewport, you can eyeball whether elements across different sections share the
 * same horizontal / vertical lines (e.g. the hero name top == the photo top).
 *
 * Toggle with the SHOW_ALIGN_GUIDES flag (lib/dev.ts) or Ctrl/Cmd + G at
 * runtime. This is a development instrument — it renders nothing in production
 * builds when the flag is off. Never a shipping UI control.
 */

const COLOR = 'rgba(204,255,0,0.55)'; // accent lime — obviously a dev overlay
const LABEL_BG = 'rgba(204,255,0,0.9)';

const AlignGuides: React.FC = () => {
  const [on, setOn] = useState<boolean>(SHOW_ALIGN_GUIDES);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault();
        setOn((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!on || !layer) return;

    // Build real DOM nodes (no innerHTML): styles are our own numeric values
    // and the label is set via textContent, so there's no injection surface.
    const line = (css: string): HTMLElement => {
      const i = document.createElement('i');
      i.style.cssText = css;
      return i;
    };

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const els = document.querySelectorAll<HTMLElement>('[data-guide]');
      const nodes: HTMLElement[] = [];
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -40 || r.top > vh + 40) return; // skip off-screen
        const base = `position:absolute;background:${COLOR};pointer-events:none;`;
        // horizontal lines (top, bottom) — full viewport width
        nodes.push(line(`${base}left:0;width:${vw}px;height:1px;top:${r.top}px`));
        nodes.push(line(`${base}left:0;width:${vw}px;height:1px;top:${r.bottom}px`));
        // vertical lines (left, right) — full viewport height
        nodes.push(line(`${base}top:0;height:${vh}px;width:1px;left:${r.left}px`));
        nodes.push(line(`${base}top:0;height:${vh}px;width:1px;left:${r.right}px`));
        const label = el.getAttribute('data-guide');
        if (label) {
          const tag = line(
            `position:absolute;left:${r.left}px;top:${Math.max(0, r.top - 14)}px;font:600 9px/1 monospace;color:#000;background:${LABEL_BG};padding:1px 4px;letter-spacing:0.5px;`,
          );
          tag.textContent = `${label} · ${Math.round(r.width)}×${Math.round(r.height)}`;
          nodes.push(tag);
        }
      });
      layer.replaceChildren(...nodes);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      if (layer) layer.replaceChildren();
    };
  }, [on]);

  if (!on) return null;
  return <div ref={layerRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9997]" />;
};

export default AlignGuides;
