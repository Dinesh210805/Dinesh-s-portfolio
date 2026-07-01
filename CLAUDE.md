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
- Design tokens live only in that script: colors `background #050505`, `surface #111`, `primary`, `secondary`, `accent #CCFF00`, `bone #F4F1EA`; fonts `Syne` (display), `Manrope` (sans), `JetBrains Mono`, `Space Grotesk`. Fonts and custom keyframes (`shimmer`, `grid-pan`) are also defined there.
- **`bone #F4F1EA` is the single light-mode surface** — the warm off-white used site-wide (never pure white). It's set on the page wrappers (`App.tsx` root + each route's `main`); **individual sections are transparent** so the base colour and the guide grid show through.
- Global CSS (cursor:none, `.bg-noise`, Lenis classes) is in the `<style>` block of `index.html`.
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — the standard class-merge helper.

### Section-transition / contrast system
- `components/ui/scroll-tape.tsx` (`ScrollTape`) is the core motion primitive between sections. It renders a tall scroll spacer + a fixed overlay of horizontally-sweeping text strips (middle strip solid, others hollow-stroked).
- It drives the **dark↔light background transition** for the whole page via scroll-linked `useTransform` color interpolation. The transition direction is chosen by comparing `fromBg`/`toBg` props (`#050505` dark vs `#ffffff` light) — see the `isDarkToLight` / `isLightToDark` / `isLightToLight` branches. When changing a section's light/dark theme, the adjacent `ScrollTape`'s `fromBg`/`toBg` must be updated to keep alternating contrast correct.
- `components/SectionTransition.tsx` is the older transition primitive; `ScrollTape` replaced its usage in `App.tsx` (see recent commits).
- `Navbar.tsx` adapts its styling to the active theme via `useTheme()`, forcing dark styling while over the Hero and inheriting the global theme past it.

### Layout grid & alignment system
The site is laid out on one editorial grid; everything aligns to it.
- **`components/DesignGrid.tsx`** — the permanent guide grid. A single **fixed, full-bleed** overlay of faint vertical hairlines: **8 columns / 24px gutters / 48px margins** on desktop (4 columns on mobile). Each column has a left *and* right hairline, so gutters read as "double lines" (Katerina-style). Kept faint (`black/[0.07]` / `dark:white/[0.055]`) — do not make it darker.
  - It renders **inside each `main`** (not behind it) at `z-0`, above the opaque `bone` bg but behind the transparent sections. This is deliberate: the **`Footer` is a `position:fixed` reveal layer behind `main`**, so a grid placed behind `main` would expose the footer. Keep `main` opaque and the grid inside it.
- **Section content aligns to the grid.** Sections use the same metrics (`px-6`/`md:px-12`, `grid-cols-8`, `gap-6`) so columns line up with the DesignGrid. Goal: uniform starts/ends (e.g. hero name top == portrait top), each section ideally fitting a single viewport (`lg:h-[100svh]`).
- **`components/AlignGuides.tsx` + `lib/dev.ts` — DEV-ONLY alignment instrument.** For any element tagged `data-guide` (or `data-guide="label"`), it draws full-viewport horizontal lines at the element's top/bottom and vertical lines at its left/right, plus a label with pixel dimensions — so cross-section alignment is visible. Toggle via `SHOW_ALIGN_GUIDES` in `lib/dev.ts` **or `Ctrl/Cmd+G`**. There is intentionally **no on-screen UI toggle**; ship with the flag `false`. Add/remove `data-guide` attributes freely while aligning.

### Hero → About shared portrait travel
- The hero portrait and the About card use the **same sharp/flat 4:5 grayscale frame** (no rounding, no shadow). `components/HeroPortraitTravel.tsx` flies a single `position:fixed` copy from `#hero-portrait-slot` into `#about-portrait-slot` on scroll (FLIP-style: reads both live rects each frame, lerps transform, rotates through an arc, hands off to the in-flow About image at the landing frame). **Desktop + motion-safe only**; `< lg` / reduced-motion show static images. The `.travel-hide` CSS (in `index.html`, gated by `data-portrait-travel="on"`) blanks the in-flow slot images while the layer is active so no ghost box is left behind.
- Auto-updating age: `lib/age.ts` (`ageLabel()`), rendered as the `/NN` mark above the hero portrait; rolls over on the birthday, no maintenance.

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
