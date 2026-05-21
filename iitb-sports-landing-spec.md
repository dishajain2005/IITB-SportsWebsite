# IITB Sports — Landing Page Design Spec
## Phase 1: Home / Entry Landing Page

---

### Overview

A full-viewport cinematic entry page — not the main website itself, but a **dramatic gateway** into it. Inspired by the Lewis Hamilton site's editorial boldness and Nike's typographic confidence. The page is intentionally sparse — no clutter, just presence.

---

### Structure (Top → Bottom)

---

#### 1. Background
- **Full-viewport video background** — IIT Bombay Gymkhana footage (athletics, pool, courts, crowds)
- Dark overlay on top of the video (semi-transparent, ~60% black) to ensure text legibility
- Video plays silently, loops seamlessly
- No poster/thumbnail — video starts immediately

---

#### 2. Top-Right Corner — Legal Links
- Minimal, uppercase, small tracking
- Two links: **TERMS** · **PRIVACY POLICY**
- Positioned top-right, like lewishamilton.com
- White text, no background, subtle hover underline

---

#### 3. Hero Text Block — Left-Aligned (Lewis Hamilton structure)
Large, bold, left-anchored typographic statement. Three lines:

```
FOR
EVERY
[DYNAMIC WORD]*
```

**Line 3 is animated** — cycles through words in sequence:
`MEN` → `WOMEN` → `STUDENTS` → `FACULTY` → `BEGINNERS` → `CHAMPIONS`
→ finally lands on and stays at: **`ATHLETES`***

- Font: Heavy/Black weight, condensed — something like `Barlow Condensed Black` or `Anton`
- Size: Massive — each word takes up significant vertical space (viewport-filling)
- Color: White
- The asterisk `*` stays on `ATHLETES` permanently once the cycling stops

**Asterisk footnote** (bottom-left, italic, small):
> *If you wear the colours, you are an athlete.*

_(IITB-specific equivalent of Nike's "If you have a body, you are an athlete")_

---

#### 4. Social Links Row — Below the Name Block
Inline icon row, left-aligned, beneath the main text:
- **Instagram** · **LinkedIn** · **Facebook**
- White icons, subtle opacity, full opacity on hover
- Matching lewishamilton.com's social row placement

---

#### 5. Bottom Section — About Us Teaser
A single line or short 2-line statement about IITB Sports, low on the page:
> "IIT Bombay Sports — Powering 10,000+ students across 40+ disciplines since 1958."

- Small, refined typography — not bold, just present
- White, ~60% opacity

---

#### 6. CTA — Enter the Website
A single prominent call-to-action that routes to the actual sports website content:

- Text: **"EXPLORE SPORTS →"** or **"ENTER"**
- Style: Outlined button OR just a large underlined text link — no filled button (too corporate)
- Positioned centrally or bottom-center
- On click: navigates to `/sports/home` (the actual main site)

---

### Typography

| Role | Font | Weight | Style |
|---|---|---|---|
| Hero display (3 lines) | `Barlow Condensed` or `Anton` | Black / 900 | Uppercase |
| Asterisk footnote | `DM Serif Display` or `Libre Baskerville` | Regular | Italic |
| Legal links | `DM Sans` or `Barlow` | Medium | Uppercase, tracked |
| Social icons | Icon font / SVG | — | — |
| About teaser | `DM Sans` | Regular | Normal case |
| CTA | `Barlow Condensed` | SemiBold | Uppercase |

---

### Color Palette (Landing Page Only)

| Token | Value | Usage |
|---|---|---|
| `--bg-overlay` | `rgba(0,0,0,0.60)` | Video overlay |
| `--text-primary` | `#FFFFFF` | Hero text |
| `--text-muted` | `rgba(255,255,255,0.55)` | About teaser, legal links |
| `--accent` | `#C9A84C` | Hover states, CTA underline, asterisk |
| `--cta-border` | `#FFFFFF` | CTA button outline |

> Note: Gold `#C9A84C` is used sparingly — only on hover/active states. The page is primarily black and white.

---

### Animation Spec

| Element | Animation |
|---|---|
| Background video | Autoplay, muted, loop |
| Line 3 word cycle | Swap every ~400ms, 5–6 words, then hold on ATHLETES |
| Word transition | Fast vertical slide-up or simple fade |
| Social icons | Fade in with staggered delay on load |
| CTA | Fade in last, after text settles |
| Scroll hint | Optional: thin animated down-arrow at very bottom center |

---

### Layout Notes
- **No navbar** on this entry page — this is pre-navigation
- Entire page is one viewport (no scroll needed ideally)
- Mobile: text scales down, same structure, video still plays
- The page should feel like a **title card**, not a homepage

---

### What This Page Is NOT
- Not the main website
- Not a dashboard or directory
- No sports cards, no event listings, no court bookings here
- Pure identity — brand statement before the product

---

*End of Phase 1 Spec. Next phase: Main Website Design System + Home Page template.*
