/* Cross-page section navigation.
 * On the home page, scroll smoothly to a section. From a sub-page,
 * route home first and let the home view consume the pending target. */

export const navState: { pendingSection: string | null } = { pendingSection: null };

const SCROLL_OPTS = {
  offset: -100, // clear the fixed navbar
  duration: 2,
  easing: (t: number) => 1 - Math.pow(1 - t, 4),
};

export function goToSection(id: string): void {
  if (id === 'home') {
    const onHome = !window.location.hash.startsWith('#/work');
    if (onHome) {
      window.lenis?.scrollTo(0, { duration: 2, easing: SCROLL_OPTS.easing });
      return;
    }
    navState.pendingSection = 'home';
    window.location.hash = '/';
    return;
  }

  const el = document.getElementById(id);
  if (el && window.lenis) {
    window.lenis.scrollTo(el, SCROLL_OPTS);
    return;
  }

  // Not on the home page (section not in DOM) — route home, then scroll.
  navState.pendingSection = id;
  window.location.hash = '/';
}

/** Called by the home view once mounted to honor a pending scroll. */
export function consumePendingSection(): void {
  const id = navState.pendingSection;
  if (!id) return;
  navState.pendingSection = null;

  // Wait a frame so the home sections are in the DOM.
  setTimeout(() => {
    if (id === 'home') {
      window.lenis?.scrollTo(0, { duration: 1.2, easing: SCROLL_OPTS.easing });
      return;
    }
    const el = document.getElementById(id);
    if (el && window.lenis) window.lenis.scrollTo(el, SCROLL_OPTS);
  }, 120);
}
