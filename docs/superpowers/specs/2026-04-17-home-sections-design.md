# Home Page — Three Sticky Panel Sections Design Spec
**Date:** 2026-04-17  
**Route:** `/sports/home`  
**Scope:** Sections 3 (About Us), 5 (BlackCats), 6 (Sports App) — replacing existing implementations

---

## Design Philosophy

Premium through restraint. No particle effects, no excessive glows, no motion for its own sake. Every animation serves the content. Typography and whitespace do the heavy lifting. Inspired by top-tier agency and sports brand editorial pages (Nike, Adidas, Awwwards studio sites).

---

## Layout Architecture — Sticky Overlapping Panels

Three panels, each `100vh`, stacked in a `300vh` scroll container. Each panel is `position: sticky; top: 0` and stacked with increasing `z-index`. As the user scrolls, the next panel slides over the previous with a hard geometric edge — no fade, a confident slice. The "card dealing" metaphor.

### Scroll Mechanics

- Container: `height: 300vh`, `position: relative`
- Panel 1 (About Us): `sticky top-0 z-10` — stays, gets covered
- Panel 2 (BlackCats): `sticky top-0 z-20` — slides up over Panel 1 via `translateY` driven by `useScroll`
- Panel 3 (Sports App): `sticky top-0 z-30` — slides up over Panel 2

Each panel's entry: `translateY` goes from `100%` → `0%` as scroll progresses through its entry window. Easing: `[0.22, 1, 0.36, 1]` (fast-out, same as existing hero). No spring — too bouncy for this aesthetic.

### Scroll Windows

Total container = 3 sections × 100vh scroll each.
- Panel 1 visible: `0–33%` of container scroll
- Panel 2 entry: `25–50%` (overlap for early reveal)
- Panel 3 entry: `58–83%`

---

## Panel 1 — About Us

**Background:** Cream `#F5F0E8`  
**Text:** `#111111`

### Layout: Two-column, 5/7 split

**Left column (5/12):**
- IITB Sports logo (gear + flame PNG) — large, `~280px`, positioned top-left area, no drop shadow, natural white bg from PNG cropped with `mix-blend-mode: multiply` so cream bg shows through
- Below logo: oversized `'58` in Barlow Condensed Black, `~220px` size, color `#EDEAE2` (near-invisible, textural). Sits behind/under the logo visually via negative margin or absolute positioning
- Small label beneath: `FONT-MONO ESTABLISHED · 1958` in accent gold, `10px`, `tracking-[0.3em]`

**Right column (7/12):**
- Eyebrow: `IIT BOMBAY SPORTS` in mono, accent, `11px`, `tracking-[0.3em]`
- Headline: `The Heartbeat of Excellence on Campus.` — Playfair Display, `clamp(48px, 6vw, 80px)`, `#111`, `italic` on "Excellence"
- Body: two-column text grid, `#555`, `text-lg`, `leading-[1.8]` — existing copy
- Bottom: the `UNTIL. VICTORY. ALWAYS.` tagline rendered as three words spaced across full column width in Barlow Condensed Black, `text-2xl`, accent/cream/accent alternating — minimal, not the full dark box treatment

**No** full-width dark tagline box — that was too heavy. Tagline lives inside the panel naturally.

---

## Panel 2 — Bombay BlackCats

**Background:** `#0D0D0D` (near-black, slightly off pure black for depth)  
**Text:** `#F5F0E8`

### Layout: Full-bleed with background logo treatment

**Background layer:**
- BlackCats panther PNG at `~90vh` height, right-aligned, `opacity-[0.08]`, `mix-blend-mode: luminosity`
- Fills the right 60% of the panel, partially crops off right/bottom edge
- No animation on the logo itself — static, confident

**Foreground content — left-aligned, vertically centered:**
- Eyebrow: `INTER-IIT CONTINGENT · SINCE 1961` in mono, accent, `10px`, `tracking-[0.4em]`
- Headline: `Bombay` (regular weight) + line break + `BlackCats` (italic) — DM Serif Display, `clamp(72px, 10vw, 140px)`, cream
- Accent rule: `h-[2px] w-20 bg-accent` — not `h-1`, thinner = more premium
- Body copy: `#F5F0E8/65`, `text-xl`, `leading-[1.8]`, max `520px` wide — existing copy trimmed to 2 sentences
- Stat row: three stats side by side — `3500+ ATHLETES`, `SINCE 1961`, `INDIA'S PREMIER MEET` — each in Barlow Condensed Black, `text-sm`, accent color, `tracking-widest`, separated by `·`
- CTA: text link only — `VIEW INTER-IIT RESULTS →` in accent, `font-black`, `text-sm`, underline on hover. No button/pill.

**Vertical accent line:** `2px` wide, full panel height, `bg-accent/20`, positioned `left-[23%]` — creates visual rhythm, subtle grid feel.

---

## Panel 3 — Sports App

**Background:** Pure white `#FFFFFF`  
**Text:** `#111111`

### Layout: Editorial print-ad — full typography, no device mockup

**Top-left:** `DIGITAL ECOSYSTEM` eyebrow in mono, accent, `10px`

**Hero headline (full-width, large):**
`Your Season,` — DM Serif Display italic, `clamp(64px, 9vw, 120px)`, `#111`  
`In Your Pocket.` — Barlow Condensed Black, same size, `#111`, contrasting weight creates typographic tension

**Feature list — 2×2 grid below headline:**
Each feature: large number (`01`, `02`, `03`, `04`) in Barlow Condensed, `text-6xl`, `#111/08` (ghosted), feature name in Barlow Condensed Black `text-xl` uppercase, one-line descriptor in DM Sans `text-sm` `#555`.

Features:
- `01` Event Registration
- `02` E-Certificate Generation  
- `03` Real-Time Court Booking
- `04` Live GC Scores

**Bottom strip:**
`LAUNCHING SOON` — Barlow Condensed Black, `text-4xl`, `tracking-[0.3em]`, `#111/20` (ghosted/watermark feel)  
Flanked by `ANDROID · iOS` badges — small pill borders, `text-[10px]`, mono font, `#111/30`

**Right edge:** thin `2px` vertical accent line, full height, `bg-accent` — mirrors the subtle grid line from Panel 2, creates continuity across panels.

---

## Transition Edge Treatment

Between panels, the incoming panel's top edge has a `4px` solid accent `#C9A84C` line — like a bookmark tab. Visible for the ~100px of translateY before it fully covers the previous panel. Gives the "card dealing" moment a tactile edge.

---

## Scroll Entry Animations (per panel, trigger on panel reaching `translateY: 0`)

- Text content: `opacity 0→1`, `y 24→0`, `duration: 0.9s`, `delay: 0.3s` after panel settles
- No stagger more than `0.15s` between elements — restraint

---

## Assets

| Asset | File | Usage |
|-------|------|-------|
| IITB Sports Logo | `iit bombay sports logo.png` | Panel 1 left column, `mix-blend-mode: multiply` |
| BlackCats Logo | `IIT Bombay Black Cats.png` | Panel 2 background, `opacity-[0.08]`, `mix-blend-mode: luminosity` |

Both PNGs to be placed in `/public/assets/`.

---

## What Does NOT Change

- Marquee ticker strips between sections — kept as-is
- Navbar behavior (transparent → white on scroll)
- Section 1 hero (landing panel before these three)
- Footer

---

## Files Modified

- `src/app/sports/home/page.tsx` — Sections 3, 5, 6 replaced entirely
