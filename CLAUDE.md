# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Next.js dev server at http://localhost:3000
- `npm run build` — Production build (Next.js 15, React 19)
- `npm run start` — Run the built app
- `npm run lint` — ESLint with `next/core-web-vitals` + `next/typescript`

Note: `next.config.ts` sets `eslint.ignoreDuringBuilds: true`, so `npm run build` will not catch lint regressions — run `npm run lint` separately.

TypeScript path alias: `@/*` → `./src/*`.

## Architecture

Single-page bilingual (ES/EN) portfolio built on the Next.js App Router. The whole app is client-side: `src/app/layout.tsx` and `src/app/page.tsx` are both `"use client"`, and there is no `metadata` export — title and meta description are set imperatively in `<head>` and then live-updated by `useDocumentLanguage` based on the active language.

### Page composition

`src/app/page.tsx` renders the section sequence: `Navigation` → `HeroSection` → `AboutSection` → `ExperienceSection` → `ProjectsSection` → `EducationSection` → `Footer`. Each section is a self-contained component under `src/components/` that pulls its copy from the i18n layer.

### Global chrome (mounted in `layout.tsx`)

`LayoutContent` wraps `children` with several siblings that must remain in this order to layer correctly:

1. `LoadingScreen` (conditional, dismisses via `onLoadingComplete`)
2. `SmoothScroll` provides Lenis + GSAP integration via `LenisContext`
3. Inside `SmoothScroll`: `SectionBackgrounds` (animated page bg), `PremiumBackground`, `CustomCursor`, `ScrollProgress`, a `.noise` overlay, then the page content, then `<Analytics />` from `@vercel/analytics/next`

`LanguageProvider` wraps `LayoutContent` so language is available everywhere, and `useDocumentLanguage` (called inside `LayoutContent`) syncs `<html lang>`, `<title>` and meta description on every language change.

### Smooth scroll + animation system

`SmoothScroll` dynamically imports `lenis` (graceful fallback to native scroll if import fails), and wires Lenis's `scroll` event to `ScrollTrigger.update` plus its `raf` into `gsap.ticker`. Components that animate on scroll must `gsap.registerPlugin(ScrollTrigger)` inside a `typeof window !== "undefined"` guard at module scope — this pattern is repeated in every animated component (e.g. `SmoothScroll.tsx`, `SectionBackgrounds.tsx`, `ProjectsSection.tsx`). Inside components, wrap GSAP setup in `gsap.context(() => { ... })` and return cleanup that kills ScrollTriggers — otherwise scroll triggers leak across re-renders.

`SectionBackgrounds` is the source of truth for the page background color per section: it looks up DOM IDs (`hero`, `about`, `experience`, `projects`, `education`, `footer`) and tweens the fixed bg between values in its `sectionColors` map. If you add a new section, give it one of those IDs (or extend the map) or the background will not transition into it.

### Internationalization

`src/i18n/` is a small custom i18n layer — no library. `translations.ts` exports two flat objects `es` and `en` and a `Language` type. `LanguageContext`:

- On mount, first reads a saved choice from `localStorage` (`preferred-language`). If none exists, walks `navigator.languages` (full preference list) and returns the first match; anything that isn't `es` or `en` falls back to `en`.
- Renders an SSR-safe placeholder (Spanish) until `isClient` is true to avoid hydration flashes. The `LoadingScreen` overlay (~2.5s) covers the page while the correct language is applied on the client.
- Exposes `{ language, t, setLanguage }`. `setLanguage('es' | 'en')` persists to `localStorage`, so a manual override sticks across visits.

Components consume copy via `const { t, language, setLanguage } = useLanguage();` and index into typed objects (e.g. `t.projects.projectsList[0].title`). When adding strings, update both `es` and `en` in `translations.ts` to keep the shape symmetric — the codebase indexes arrays by position (see `ProjectsSection.tsx` reading `t.projects.projectsList[2]` etc.), so positional ordering between languages is load-bearing.

All user-facing text must come from `translations.ts` — never hardcode Spanish/English strings inside components, or the page will mix languages when the active locale doesn't match the hardcoded one. The manual ES/EN toggle in `Navigation.tsx` (desktop nav + mobile menu) calls `setLanguage`.

### Styling

- Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config`; configuration lives in `globals.css`).
- `src/app/globals.css` defines all design tokens as CSS custom properties (`--color-*`, `--ease-*`, etc.) and utility classes (`.container`, `.section`, `.btn`, `.btn-primary`, `.btn-ghost`, `.link-hover`, `.text-display`, `.text-heading`, `.text-mono`, `.noise`, `.orb`).
- Theme is light. `prefers-reduced-motion: reduce` is globally honored (animation durations clamped to 0.01ms).
- The custom cursor toggles `html.custom-cursor-active` to set `cursor: none` everywhere — only enable on desktop and when reduced motion is not requested (logic already in `CustomCursor.tsx`).

### Assets

Public assets used by the app: `/CV-alvaro-langa-2.0.pdf`, `/CV-alvaro-langa-2.0-EN.pdf`, `/logoPersonal-removebg-preview.png` (favicon), project images under `/public/images/` (`kata-no.png`, `f1.png`, `kart.png`, etc.). Project URLs and image paths are hard-coded inside `ProjectsSection.tsx` rather than in translations.

## Reference docs in the repo

- `docs/portfolio-handoff.md` — canonical content source (profile, bio, project descriptions, stack); update this in sync with `translations.ts`.
- `docs/performance-audit.md` — performance notes.
- `DESIGN.md` — design system reference (Apple-inspired light theme tokens, type scale, spacing).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
