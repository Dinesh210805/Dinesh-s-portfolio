import React, { useEffect, useRef } from 'react';
import { PROFILE_IMAGE, PROFILE_NAME } from '../constants/profile';

/* Scroll-linked portrait travel (desktop only).
 *
 * A single `position: fixed` framed portrait is flown from the hero slot
 * (#hero-portrait-slot) into the About card (#about-portrait-slot) as the user
 * scrolls — translating, scaling and rotating so it reads as one physical
 * object moving between sections. Both frames are identical (rounded-[28px],
 * 4/5, same grayscale zoom) so the landing is seamless: at the final frame the
 * fixed portrait fades out and the in-flow About image fades in.
 *
 * FLIP-style: every frame we read both slots' live rects and lerp between them,
 * mutating `.style` directly (no React re-render) to stay at 60fps.
 *
 * Disabled on < lg and when reduced motion is preferred — there the hero/about
 * images are static (the `.travel-hide*` CSS only bites while the layer is on).
 */

type Rect = { docTop: number; left: number; width: number; height: number };

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const REST_TOP_FRACTION = 0.16; // where the portrait "lands" from the viewport top
const ARC_DEGREES = 0; // no rotation — the portrait stays perfectly straight the whole travel

const HeroPortraitTravel: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const srcRef: { current: Rect | null } = { current: null };
    let rafId = 0;
    let active = false;
    let revealed = false;

    const el = (id: string) => document.getElementById(id);

    const captureSrc = () => {
      const hero = el('hero-portrait-slot');
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      srcRef.current = { docTop: r.top + window.scrollY, left: r.left, width: r.width, height: r.height };
      box.style.width = `${r.width}px`;
      box.style.height = `${r.height}px`;
    };

    const frame = () => {
      rafId = requestAnimationFrame(frame);
      const s = srcRef.current;
      const about = el('about-portrait-slot');
      const aboutImg = el('about-portrait-img') as HTMLElement | null;
      if (!s || !about) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const ar = about.getBoundingClientRect();

      const aboutDocTop = ar.top + scrollY;
      const restTop = vh * REST_TOP_FRACTION;
      const endScroll = Math.max(1, aboutDocTop - restTop);
      const p = clamp01(scrollY / endScroll);
      const e = easeInOut(p);

      const srcTopVp = s.docTop - scrollY;
      const curLeft = lerp(s.left, ar.left, e);
      const curTop = lerp(srcTopVp, ar.top, e);
      const curW = lerp(s.width, ar.width, e);
      const curH = lerp(s.height, ar.height, e);

      const cx = curLeft + curW / 2;
      const cy = curTop + curH / 2;
      const tx = cx - s.width / 2;
      const ty = cy - s.height / 2;
      const sx = curW / s.width;
      const sy = curH / s.height;
      const rot = Math.sin(p * Math.PI) * ARC_DEGREES;

      box.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(${sx}, ${sy})`;

      const landed = p >= 0.995;
      box.style.opacity = landed ? '0' : '1';
      if (aboutImg) aboutImg.style.opacity = landed ? '1' : '0';
    };

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      box.style.clipPath = 'inset(0 0 100% 0)';
      requestAnimationFrame(() => {
        box.style.transition = 'clip-path 1.3s cubic-bezier(0.16,1,0.3,1)';
        box.style.clipPath = 'inset(0 0 0 0)';
      });
    };

    const activate = () => {
      if (active) return;
      active = true;
      document.documentElement.dataset.portraitTravel = 'on';
      captureSrc();
      box.style.opacity = '1';
      reveal();
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(frame);
    };

    const deactivate = () => {
      active = false;
      delete document.documentElement.dataset.portraitTravel;
      cancelAnimationFrame(rafId);
      box.style.opacity = '0';
      const aboutImg = el('about-portrait-img') as HTMLElement | null;
      if (aboutImg) aboutImg.style.opacity = ''; // restore CSS-driven visibility
    };

    const sync = () => {
      if (mqDesktop.matches && !mqReduce.matches) activate();
      else deactivate();
    };

    const onResize = () => {
      if (active) captureSrc();
    };

    const settle = () => {
      if (active && window.scrollY < 8) captureSrc();
    };

    sync();
    mqDesktop.addEventListener('change', sync);
    mqReduce.addEventListener('change', sync);
    window.addEventListener('resize', onResize);
    window.addEventListener('load', settle);
    const settleTimer = window.setTimeout(settle, 400);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(settleTimer);
      mqDesktop.removeEventListener('change', sync);
      mqReduce.removeEventListener('change', sync);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', settle);
      delete document.documentElement.dataset.portraitTravel;
    };
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 overflow-hidden opacity-0 will-change-transform"
      style={{ transformOrigin: '50% 50%' }}
    >
      <img src={PROFILE_IMAGE} alt={PROFILE_NAME} className="h-[112%] w-full object-cover grayscale" />
    </div>
  );
};

export default HeroPortraitTravel;
