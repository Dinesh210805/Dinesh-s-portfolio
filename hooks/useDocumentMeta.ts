import { useEffect } from 'react';

/* Sets document.title (and, optionally, the meta description) for the
 * duration this component is mounted, restoring the previous values on
 * unmount. This is a supplement for JS-executing crawlers and tab-title UX
 * on the hash-routed sub-pages (#/work, #/work/<slug>) — the primary,
 * crawler-safe SEO metadata for the root document lives statically in
 * index.html, since non-JS scrapers (social previews, some AI crawlers)
 * never run this hook. */
export function useDocumentMeta(title: string, description?: string): void {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const descTag = description
      ? document.querySelector<HTMLMetaElement>('meta[name="description"]')
      : null;
    const prevDescription = descTag?.getAttribute('content') ?? null;
    if (descTag && description) descTag.setAttribute('content', description);

    return () => {
      document.title = prevTitle;
      if (descTag && prevDescription !== null) descTag.setAttribute('content', prevDescription);
    };
  }, [title, description]);
}

export default useDocumentMeta;
