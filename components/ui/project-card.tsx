import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectData } from '../../constants/projects';

/* ─────────────────────────────────────────────────────────────
 * ProjectCard — the one project-preview card used everywhere:
 * the home "Featured Work" grid, the full All Work archive, and
 * the "More projects" row on each project's detail page. Cover
 * photo fills the frame; falls back to a colour block with a
 * tone-on-tone title if a cover hasn't been added yet.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

interface ProjectCardProps {
  p: ProjectData;
  reduce?: boolean | null;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ p, reduce }) => {
  const fill = p.color ?? '#171717';
  const [coverFailed, setCoverFailed] = useState(false);
  const showCover = Boolean(p.cover) && !coverFailed;

  return (
    <motion.div variants={cardVariants} className="group">
      <a
        href={`#/work/${p.slug}`}
        data-cursor-text="View"
        data-cursor-variant="bubble"
        aria-label={`View ${p.title} — ${p.category}`}
        className="relative block aspect-[3/2] cursor-none overflow-hidden rounded-3xl"
      >
        {showCover ? (
          <img
            src={p.cover}
            alt={`${p.title} — ${p.category}`}
            loading="lazy"
            onError={() => setCoverFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover ${reduce ? '' : 'transition-transform duration-700 ease-out group-hover:scale-[1.05]'}`}
          />
        ) : (
          <div
            className={`absolute inset-0 ${reduce ? '' : 'transition-transform duration-700 ease-out group-hover:scale-[1.06]'}`}
            style={{ backgroundColor: fill }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.18), transparent 60%)' }}
            />
            <div className="absolute inset-0 grid place-items-center px-6">
              <span className="select-none font-display text-6xl font-bold uppercase leading-none tracking-tighter text-white/10 md:text-8xl">
                {p.title}
              </span>
            </div>
          </div>
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6 font-mono text-[11px] uppercase tracking-widest text-white/75 md:p-7">
          <span>{p.index}</span>
          <span>{p.year}</span>
        </div>
      </a>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{p.title}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            {p.category}
          </p>
        </div>
        <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-black group-hover:text-white dark:border-white/15 dark:group-hover:bg-white dark:group-hover:text-black">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
