import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import SectionHeading from './ui/section-heading';

/* ─────────────────────────────────────────────────────────────
 * Recognition — a cinematic expand-and-sequence. As the section
 * rises toward the centre of the viewport a black card grows from a
 * thin margin to full-bleed (corners flattening); it holds while
 * honor stills cross-fade one at a time — B&W, grainy, Oppenheimer —
 * then eases back to its margin as it leaves. The whole arc is
 * scroll-linked, so it fills gradually with the wheel, not in a snap.
 * One image per honor, minimal bright-white caption.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const SHADOW = '[text-shadow:0_2px_28px_rgba(0,0,0,0.65)]';

interface Honor {
  n: string;
  rank: string;
  sub?: string;
  event: string;
  year: string;
  img: string;
  fit: 'cover' | 'contain';
}

const HONORS: Honor[] = [
  { n: '01', rank: 'Hackathon Winner', sub: '2nd Runner-Up', event: 'Kroolo', year: '2025', img: '/FutureOfWork01.jpg', fit: 'cover' },
  { n: '02', rank: 'Top 10 Finalist', event: '0x.day Hacksday', year: '2024', img: '/0xday1.JPG', fit: 'cover' },
  { n: '03', rank: 'Top 105 · National', event: 'Google Solution Challenge', year: '2025', img: '/googlesolchallenge.png', fit: 'contain' },
  { n: '04', rank: 'Finalist', event: 'Aventus 2.0 Hackathon', year: '2024', img: '/aventus1.jpg', fit: 'cover' },
  { n: '05', rank: 'Regional Prefinalist', event: 'Youth Talk', year: '2024', img: '/youthtalkimage.png', fit: 'cover' },
  { n: '06', rank: 'Top 10', event: 'Unisys Innovation Program', year: '2025', img: '/unisysinnovationprogram.png', fit: 'contain' },
  { n: '07', rank: 'Placed', sub: 'Campus Placement', event: 'Kaar Technologies', year: '2026', img: '/jubliation.JPG', fit: 'cover' },
];

const N = HONORS.length;
const FADE = 0.02;
// pinned window inside the full passage (['start end','end start'])
const HOLD_START = 0.16;
const HOLD_END = 0.84;
const pad = (n: number) => String(n).padStart(2, '0');

const Achievements: React.FC = () => {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // track the whole passage of the section through the viewport, so the
  // card can grow on approach and shrink on exit (not just once pinned)
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start end', 'end start'] });

  const margin = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], ['3.5vw', '0vw', '0vw', '3.5vw']);
  const radius = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], ['30px', '2px', '2px', '30px']);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const local = (v - HOLD_START) / (HOLD_END - HOLD_START);
    const i = Math.min(N - 1, Math.max(0, Math.floor(local * N)));
    setActive((p) => (p === i ? p : i));
  });

  // per-honor cross-fade windows across the pinned hold; the first holds
  // through the grow-in, the last through the shrink-out
  const seg = (HOLD_END - HOLD_START) / N;
  const opacities = HONORS.map((_, i) => {
    const s = HOLD_START + i * seg;
    const e = HOLD_START + (i + 1) * seg;
    const input = i === 0 ? [0, e - FADE, e + FADE] : i === N - 1 ? [s - FADE, s + FADE, 1] : [s - FADE, s + FADE, e - FADE, e + FADE];
    const output = i === 0 ? [1, 1, 0] : i === N - 1 ? [0, 1, 1] : [0, 1, 1, 0];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, input, output);
  });

  return (
    <section id="achievements" className="relative z-10 w-full text-black transition-colors duration-500 dark:text-white">
      {/* centered heading */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-14 pt-24 text-center md:pb-16 md:pt-28">
        <SectionHeading eyebrow="Recognition" align="center">
          Recognition.
        </SectionHeading>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-neutral-500 md:text-lg">
          National and global hackathons — the ones that made the cut.
        </p>
      </div>

      {/* pin-track — grow · sequence · shrink */}
      <div ref={pinRef} className="relative" style={{ height: '500vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div
            style={{ margin, borderRadius: radius }}
            className="absolute inset-0 overflow-hidden bg-black shadow-[0_40px_100px_-40px_rgba(0,0,0,0.5)]"
          >
            {/* stacked stills — each shown as an uncropped 4:3 still */}
            {HONORS.map((h, i) => (
              <motion.div
                key={h.n}
                style={{ opacity: opacities[i] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Ambient blurred backdrop — the same still, scaled up 130–150%
                    and heavily blurred so only its colours/large shapes remain,
                    slightly darker + more saturated. Fills the whole screen so
                    there are no bars; the sharp 4:3 image stays the focus. */}
                <img
                  src={h.img}
                  aria-hidden
                  className="absolute inset-0 h-full w-full scale-[1.4] object-cover blur-3xl brightness-[0.8] saturate-[1.25]"
                />
                {/* sharp, uncropped 4:3 foreground */}
                <div className="relative aspect-[4/3] max-h-[86%] w-[92%] max-w-[1250px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] md:h-[82%] md:w-auto">
                  <img
                    src={h.img}
                    alt={`${h.event} — ${h.rank}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover contrast-[1.05] saturate-[1.08]"
                  />
                </div>
              </motion.div>
            ))}

            {/* film texture — sits above the images, below the text */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
              style={{ backgroundImage: GRAIN }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.55) 100%)' }}
            />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />

            {/* captions — above the texture so the white stays bright */}
            {HONORS.map((h, i) => (
              <motion.div
                key={`cap-${h.n}`}
                style={{ opacity: opacities[i] }}
                className={`pointer-events-none absolute inset-x-0 bottom-0 p-8 md:p-16 ${SHADOW}`}
              >
                <p className="font-display text-3xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl">
                  {h.rank}
                </p>
                {h.sub && (
                  <p className="mt-1 font-display text-xl font-bold leading-[1.05] tracking-tight text-white md:text-3xl">
                    {h.sub}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white md:text-xs">{h.event}</p>
                  <span className="h-px w-6 bg-white/50" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 md:text-xs">{h.year}</p>
                </div>
              </motion.div>
            ))}

            {/* top bar */}
            <div className={`absolute inset-x-0 top-0 flex items-center justify-between p-8 md:p-12 ${SHADOW}`}>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/70">Selected honors</span>
              <div className="flex items-center gap-4">
                <div className="hidden items-center gap-1.5 sm:flex">
                  {HONORS.map((h, i) => (
                    <span
                      key={h.n}
                      className={`h-[3px] rounded-full transition-all duration-500 ${
                        i === active ? 'w-7 bg-white' : 'w-3 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[11px] tracking-[0.25em] text-white">
                  {pad(active + 1)} <span className="text-white/40">/ {pad(N)}</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
