import { useEffect, useState } from 'react';

/* Tiny dependency-free hash router.
 *   #/            → home
 *   #/work        → all work
 *   #/work/<slug> → project detail
 * Anything else (e.g. #about) is treated as home so in-page anchors
 * keep working. */

export type Route =
  | { name: 'home' }
  | { name: 'all' }
  | { name: 'project'; slug: string };

const parse = (): Route => {
  const h = window.location.hash.replace(/^#/, '');
  if (h === '/work' || h === '/work/') return { name: 'all' };
  const m = h.match(/^\/work\/(.+)$/);
  if (m) return { name: 'project', slug: m[1] };
  return { name: 'home' };
};

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined' ? { name: 'home' } : parse()
  );

  useEffect(() => {
    const onHash = () => setRoute(parse());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

export const goHome = () => {
  window.location.hash = '/';
};
export const goToProject = (slug: string) => {
  window.location.hash = `/work/${slug}`;
};
export const goToAllWork = () => {
  window.location.hash = '/work';
};
