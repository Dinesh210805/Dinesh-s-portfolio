import React, { useState, useEffect } from 'react';
import { User, LayoutGrid, Code2, Wrench, Briefcase, Award, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Magnetic from './Magnetic';
import { goToSection } from '../lib/navigation';

const navLinks = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Work', href: '#works', icon: LayoutGrid },
  { name: 'Recognition', href: '#achievements', icon: Award },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Services', href: '#services', icon: Wrench },
  { name: 'Experience', href: '#experience', icon: Briefcase },
];

// Scroll-spy targets in page order. Certifications maps onto Recognition.
const SECTION_IDS = ['about', 'works', 'achievements', 'skills', 'services', 'experience', 'certifications'];

const navIndexForSection = (id: string): number => {
  switch (id) {
    case 'about': return 0;
    case 'works': return 1;
    case 'achievements':
    case 'certifications': return 2;
    case 'skills': return 3;
    case 'services': return 4;
    case 'experience': return 5;
    default: return -1;
  }
};

const Navbar: React.FC = () => {
  // progress 0 → 1 across the first stretch of scroll (drives the glass forming + shrink)
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  // true only while the full-bleed Recognition card spans the viewport
  const [hideNav, setHideNav] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== 'light';

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setProgress(Math.min(1, window.scrollY / 360));
      const line = window.innerHeight * 0.4;
      let current = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSection(current);

      // hide the bar only while the Recognition card actually covers the screen
      const ach = document.getElementById('achievements');
      if (ach) {
        const r = ach.getBoundingClientRect();
        setHideNav(r.top <= 0 && r.bottom >= window.innerHeight);
      } else {
        setHideNav(false);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSection(href.replace('#', ''));
    goToSection(href === '#' ? 'home' : href.replace('#', ''));
  };

  const activeIndex = navIndexForSection(activeSection);
  const p = progress;

  // Scroll-linked liquid-glass surface: invisible & wide at the hero, condensing
  // into a bordered glass pill as you scroll into the page.
  const surfaceStyle: React.CSSProperties = {
    width: '94%',
    maxWidth: `${1320 - 470 * p}px`,
    backgroundColor: isDark ? `rgba(255,255,255,${0.09 * p})` : `rgba(255,255,255,${0.66 * p})`,
    borderColor: isDark ? `rgba(255,255,255,${0.16 * p})` : `rgba(0,0,0,${0.10 * p})`,
    backdropFilter: `blur(${16 * p}px) saturate(${100 + 60 * p}%)`,
    WebkitBackdropFilter: `blur(${16 * p}px) saturate(${100 + 60 * p}%)`,
    boxShadow:
      p > 0.02
        ? isDark
          ? `0 12px 40px rgba(0,0,0,${0.55 * p}), inset 0 1px 1px rgba(255,255,255,${0.18 * p})`
          : `0 10px 34px rgba(0,0,0,${0.14 * p}), inset 0 1px 1px rgba(255,255,255,${0.85 * p})`
        : 'none',
  };

  return (
    <>
      {/* ── Desktop top bar ── */}
      <header
        className={`pointer-events-none fixed top-6 left-0 right-0 z-50 hidden justify-center transition-opacity duration-500 md:flex ${
          hideNav ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          style={surfaceStyle}
          className={`relative flex flex-nowrap items-center justify-between gap-6 rounded-full border px-6 py-2.5 ${
            hideNav ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {/* specular sheen (fades in with scroll) */}
          <div
            aria-hidden
            style={{ opacity: p }}
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
          >
            <div className="absolute inset-x-3 top-0 h-1/2 rounded-b-[100%] bg-gradient-to-b from-white/50 to-transparent dark:from-white/[0.12]" />
          </div>

          <Magnetic strength={20}>
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="relative z-10 block p-2 text-xl font-display font-bold tracking-tight text-black transition-colors duration-300 cursor-none dark:text-white"
            >
              D<span className="text-accent">.</span>
            </a>
          </Magnetic>

          <nav className="relative z-10 flex items-center gap-0.5">
            {navLinks.map((link, i) => {
              const active = activeIndex === i;
              return (
                <button
                  key={link.name}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative cursor-none rounded-full px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active
                      ? 'text-black dark:text-white'
                      : 'text-black/70 hover:text-black dark:text-white/75 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-bubble-desktop"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 z-0 rounded-full border border-white/60 bg-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_10px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-white/15 dark:bg-white/15 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_2px_10px_rgba(0,0,0,0.4)]"
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          <Magnetic strength={40}>
            <button
              onClick={(e) => scrollToSection(e, '#contact')}
              className="relative z-10 flex items-center justify-center rounded-full bg-black px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors duration-300 cursor-none hover:bg-accent hover:text-black dark:bg-white dark:text-black dark:hover:bg-accent"
            >
              Connect
            </button>
          </Magnetic>
        </div>
      </header>

      {/* ── Mobile bottom bar (detached floating glass, icon-only) ── */}
      <nav
        className={`pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 transition-opacity duration-500 md:hidden ${
          hideNav ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className={`flex items-center gap-1 rounded-full border border-black/10 bg-white/65 px-2 py-2 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_10px_34px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/[0.08] ${hideNav ? 'pointer-events-none' : 'pointer-events-auto'}`}>
          {navLinks.map((link, i) => {
            const Icon = link.icon;
            const active = activeIndex === i;
            return (
              <button
                key={link.name}
                onClick={(e) => scrollToSection(e, link.href)}
                aria-label={link.name}
                className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 ${
                  active ? 'text-black dark:text-white' : 'text-black/55 dark:text-white/60'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-bubble-mobile"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 z-0 rounded-full bg-black/10 dark:bg-white/15"
                  />
                )}
                <span className="relative z-10">
                  <Icon size={18} strokeWidth={2.2} />
                </span>
              </button>
            );
          })}

          <button
            onClick={(e) => scrollToSection(e, '#contact')}
            aria-label="Connect"
            className="ml-0.5 grid h-10 w-10 place-items-center rounded-full bg-accent text-black"
          >
            <Mail size={18} strokeWidth={2.2} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
