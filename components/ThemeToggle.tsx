import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

/* Minimal Sun/Moon theme toggle, pinned to the top-right of the screen on all
 * breakpoints (the navbar drops to the bottom on mobile, so the toggle stays
 * independently reachable up top). */

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = (theme === 'system' ? resolvedTheme : theme) === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle color theme"
      className="fixed top-6 right-5 z-[60] grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/60 text-black backdrop-blur-md transition-colors duration-300 cursor-none hover:text-accent dark:border-white/15 dark:bg-white/[0.08] dark:text-white md:right-8"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};

export default ThemeToggle;
