# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production build
npm run lint     # eslint
```

No test suite configured.

## Stack

- **Next.js 16.2.4** + **React 19** + **TypeScript** — App Router only
- **Tailwind CSS v4** — configured via `@theme` block in `globals.css`, not `tailwind.config`
- **Framer Motion** for all animations
- **lucide-react** for icons; custom SVG social icons in `src/components/SocialIcons.tsx`

## Architecture

Two distinct visual zones, each with its own color palette:

| Zone | Route | Palette |
|------|-------|---------|
| Landing / splash | `/` | Black `#000000` bg, white text, `overflow-hidden` on body |
| Inner site | `/sports/home`, `/gc`, `/blogs`, etc. | Cream `#F5F0E8` bg, `#111111` text, includes `<Navbar />` |

`src/app/layout.tsx` loads 5 Google fonts as CSS variables:
- `--font-barlow-condensed` → `.font-condensed` (hero display text)
- `--font-dm-sans` → body default
- `--font-connexa` → `.font-serif-display` (primary headings)
- `--font-dm-serif` → `.font-serif-italic`
- `--font-dm-mono` → `.font-mono-custom`

Accent color `#c9a84c` (gold) is `--accent` / `text-accent` / `bg-accent` throughout.

`Navbar` is a client component used only on inner pages — **not** on the landing page (`/`). It transitions from transparent → white/95 on scroll.

Marquee animations are defined inline via `<style jsx>` in each page, not in `globals.css`.

## Key Conventions

- All pages are `'use client'` — no server components yet
- `@/` alias maps to `src/`
- Many routes listed in `Navbar.tsx` (`/courts`, `/yearbook`, `/events`, `/turf`, `/contact`) have **no page files yet** — they're placeholders
- Data (GC standings, sport lists) is hardcoded inline; no API or DB layer exists
- `public/hero-bg.mp4` is referenced by the landing page but may not exist in the repo
