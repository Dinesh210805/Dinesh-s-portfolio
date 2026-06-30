# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page immersive portfolio for **Dinesh Kumar C**. React 19 + TypeScript built with **Vite 6** (not Next.js — despite `next-themes` being a dependency). Heavy on motion: Lenis smooth scroll, Framer Motion, React Three Fiber, and a Gemini-backed chat assistant.

## Commands

```bash
npm install        # install deps (Node 18+)
npm run dev        # Vite dev server on http://localhost:3000 (host 0.0.0.0)
npm run build      # production build to dist/
npm run preview    # preview the built dist/
```

There is **no test runner, linter, or typecheck script** configured. `tsc` runs in `--noEmit` mode only via the editor/`tsconfig.json`; the build does not typecheck.

## Environment / Gemini key (IMPORTANT gotcha)

The Gemini API key is referenced under three different names, but only one actually works:

- `components/ChatBot.tsx` reads **`import.meta.env.VITE_GEMINI_API_KEY`** ← the only one that functions, because Vite only exposes `VITE_`-prefixed vars to client code.
- `vite.config.ts` defines `process.env.API_KEY` / `process.env.GEMINI_API_KEY` from `GEMINI_API_KEY` — currently unused dead config.
- `README.md` says `API_KEY` — outdated.

To run the chat assistant, put `VITE_GEMINI_API_KEY=...` in `.env.local`. The model used is `gemini-2.5-flash`.

## Architecture

### Entry & composition
- `index.tsx` mounts `<App>` inside `next-themes` `ThemeProvider` (`attribute="class"`, `defaultTheme="dark"`). Theme toggling = adding/removing `dark` on `<html>`.
- `App.tsx` is the single source of page order. It gates everything behind a `Preloader`, initializes the Lenis smooth-scroll instance (exposed as `window.lenis`), and lays out all sections in sequence, **interleaving a `<ScrollTape>` between every content section**.

### Styling — runtime CDN Tailwind (no build step)
- `index.html` loads `cdn.tailwindcss.com` and configures the **entire theme inline** in a `<script>` block. There is no `tailwind.config.js`, no PostCSS, no CSS build.
- Design tokens live only in that script: colors `background #050505`, `surface #111`, `primary`, `secondary`, `accent #CCFF00`; fonts `Syne` (display), `Manrope` (sans), `JetBrains Mono`, `Space Grotesk`. Fonts and custom keyframes (`shimmer`, `grid-pan`) are also defined there.
- Global CSS (cursor:none, `.bg-noise`, Lenis classes) is in the `<style>` block of `index.html`.
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — the standard class-merge helper.

### Section-transition / contrast system
- `components/ui/scroll-tape.tsx` (`ScrollTape`) is the core motion primitive between sections. It renders a tall scroll spacer + a fixed overlay of horizontally-sweeping text strips (middle strip solid, others hollow-stroked).
- It drives the **dark↔light background transition** for the whole page via scroll-linked `useTransform` color interpolation. The transition direction is chosen by comparing `fromBg`/`toBg` props (`#050505` dark vs `#ffffff` light) — see the `isDarkToLight` / `isLightToDark` / `isLightToLight` branches. When changing a section's light/dark theme, the adjacent `ScrollTape`'s `fromBg`/`toBg` must be updated to keep alternating contrast correct.
- `components/SectionTransition.tsx` is the older transition primitive; `ScrollTape` replaced its usage in `App.tsx` (see recent commits).
- `Navbar.tsx` adapts its styling to the active theme via `useTheme()`, forcing dark styling while over the Hero and inheriting the global theme past it.

### Data
- All resume/portfolio content is hardcoded, not fetched:
  - `constants/profile.ts` — profile image, name, title. `PROFILE_IMAGE` here also drives the favicon via `hooks/useDynamicFavicon.ts`.
  - Per-section arrays (projects, experience, etc.) are defined inside their own components, typed by interfaces in `types.ts`.
  - `components/ChatBot.tsx` embeds the assistant's resume context and system instruction as string constants (`RESUME_DATA`, `SYSTEM_INSTRUCTION`).
- `types.ts` also contains global JSX augmentation for `spline-viewer` and R3F intrinsic elements (`ambientLight`, `group`, etc.).

### 3D / visuals
- `components/Scene.tsx` uses React Three Fiber/drei. Spline is loaded two ways: the `@splinetool/react-spline` package and the `<spline-viewer>` web component (script tag in `index.html`).
- `index.html` also declares an `importmap` mirroring the npm deps to esm.sh CDN URLs.

### Path alias
- `@/*` → repo root (configured in both `tsconfig.json` and `vite.config.ts`).

## Assets

Section images live in `public/` and are referenced by root-relative paths (e.g. `/DineshProfile2.jpeg`). Filenames are inconsistent (spaces, mixed case, `.JPG`/`.jpeg`) — match exact existing names when referencing.

## Conventions

- Components are PascalCase `.tsx` files directly in `components/` (reusable UI primitives in `components/ui/`). One component per file, default export.
- Animation is Framer Motion + scroll-linked `useScroll`/`useTransform`; prefer compositor-friendly properties (`transform`, `opacity`).
- The cursor is custom (`components/Cursor.tsx`); native cursor is hidden globally (`cursor: none`).
