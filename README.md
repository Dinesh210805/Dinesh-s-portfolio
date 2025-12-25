<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Dinesh Kumar C — Portfolio

An immersive, Vite-powered portfolio for Dinesh Kumar C featuring smooth Lenis scrolling, framer-motion micro-interactions, 3D scenes with React Three Fiber, and a Gemini-powered chat assistant tailored to his resume.

## Features

- Smooth scrolling, custom cursor, and marquee hero interactions
- Sections for bio stats, services, works, achievements, certifications, experience, and contact
- Gemini-backed chat assistant with structured system context about the developer
- Preloader, noise background, and magnetic UI flourishes

## Tech Stack

- React 19 + TypeScript, Vite 6
- Styling via Tailwind-like utility classes
- Animations with framer-motion and Lenis
- 3D/visuals with three and @react-three/fiber/drei
- Gemini API via @google/genai

## Quick Start

Prerequisites: Node.js 18+

1) Install dependencies
```
npm install
```

2) Configure environment

Create a `.env.local` file at the repo root with your Gemini key:
```
API_KEY=your_gemini_api_key
```

3) Run the dev server
```
npm run dev
```
Vite will print the local URL (typically http://localhost:5173).

## Scripts

- npm run dev — start Vite dev server
- npm run build — production build
- npm run preview — preview the production build locally

## Notes

- The chat assistant uses the Gemini 3 Pro Preview model; keep the key private.
- For deployment (e.g., Netlify/Vercel), set API_KEY in environment variables and serve the `dist` output from `npm run build`.
