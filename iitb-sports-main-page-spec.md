# IITB Sports — Main Website Landing Page Design Spec
## Phase 2: Main Site Home Page

---

### Overview

The main site is the **deliberate contrast** to the entry landing page. Where the entry is dark, cinematic, and identity-first — the main site is light, structured, and content-rich. The aesthetic is **premium editorial meets modern product design**: cream warmth, strong typographic hierarchy, Bento grid layouts, and a consistent gold accent threading through both phases.

This page contains the actual navigable website with all content sections.

---

## Design Tokens

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#F5F0E8` | Main page background (warm cream) |
| `--bg-secondary` | `#EDEAE2` | Alternate section backgrounds, Bento cells |
| `--bg-dark` | `#111111` | Dark accent sections (BlackCats, footer) |
| `--bg-card` | `#FFFFFF` | Card/cell backgrounds |
| `--text-primary` | `#111111` | Body text, headings |
| `--text-secondary` | `#555555` | Subtext, captions, muted content |
| `--text-on-dark` | `#F5F0E8` | Text on dark sections |
| `--accent-gold` | `#C9A84C` | Primary accent — borders, underlines, highlights, CTAs |
| `--accent-gold-light` | `#E8D48A` | Hover states, subtle tints |
| `--border` | `rgba(0,0,0,0.08)` | Card borders, ruled lines |
| `--border-dark` | `rgba(255,255,255,0.10)` | Borders on dark sections |
| `--shadow` | `0 2px 20px rgba(0,0,0,0.06)` | Card elevation |

### Typography

| Role | Font | Weight | Transform |
|---|---|---|---|
| Display / Hero | `Barlow Condensed` | 900 Black | Uppercase |
| Section Headings | `Playfair Display` | 700 Bold | Title case |
| Sub-headings | `Barlow Condensed` | 600 SemiBold | Uppercase |
| Body Text | `DM Sans` | 400 Regular | Normal |
| Stats / Numbers | `Barlow Condensed` | 900 Black | Uppercase |
| Labels / Tags | `DM Mono` | 400 | Uppercase, tracked |
| Nav Links | `DM Sans` | 500 Medium | Normal |
| Marquee Ticker | `Barlow Condensed` | 700 Bold | Uppercase |

**Font Scale:**

| Level | Size | Usage |
|---|---|---|
| `--text-hero` | 96–120px | Hero section display |
| `--text-display` | 64–80px | Giant number anchors |
| `--text-h1` | 48px | Section headings |
| `--text-h2` | 32px | Sub-section headings |
| `--text-h3` | 24px | Card headings |
| `--text-body` | 16px | Body copy |
| `--text-small` | 13px | Labels, captions, tags |
| `--text-ticker` | 18px | Marquee text |

### Spacing & Radius

| Token | Value |
|---|---|
| `--section-gap` | `120px` vertical padding per section |
| `--card-radius` | `16px` |
| `--pill-radius` | `999px` |
| `--bento-gap` | `16px` |
| `--container-max` | `1280px` |
| `--container-pad` | `48px` horizontal |

---

## Navigation Bar

**Behavior:** Sticky. On load — transparent with dark text (cream bg shows through). On scroll past 80px — white background appears with subtle shadow `0 1px 20px rgba(0,0,0,0.08)`.

**Layout:** Logo (left) | Nav Links (center) | CTA (right)

**Nav Links:** Home · Sports · Court Status · GC · Yearbook · Blogs · Events Timeline · Turf Booking · Contact Us

**Active state:** Gold `#C9A84C` underline, 2px, sits below the link text

**CTA Pill — "Book a Court":**
- Background: `#C9A84C` gold
- Text: `#111111` black, `DM Sans` Medium
- Border radius: `999px`
- Hover: darkens to `#B8923B`

**Logo:** IITB Sports flame logo, left-aligned. Height 36px.

**Mobile:** Hamburger icon (right). Opens full-screen overlay menu — dark `#111111` background, large link list in `Barlow Condensed`, social icons at bottom.

---

## Page Sections (Top → Bottom)

---

### Section 1 — Hero

**Layout:** Full viewport height. Two-column split — left 55% text, right 45% image.

**Left:**
- Eyebrow label: `IITB SPORTS · EST. 1958` in `DM Mono`, gold color, small tracking
- Main headline (3 lines, `Barlow Condensed` Black, 96px):
  ```
  EVERY
  SPORT.
  ONE HOME.
  ```
- Subline (`DM Sans` Regular, 18px, muted): "10,000+ students. 40+ disciplines. One campus."
- Two CTAs side by side:
  - Primary: Gold filled pill — "Explore Sports"
  - Secondary: Outlined pill — "View Events"
- Below CTAs: Three quick stat chips in a row:
  `🥇 Inter-IIT 2024` · `40+ Sports` · `Olympic Pool`

**Right:**
- Large campus action photo (athlete in motion — pool, track, court)
- Photo has `border-radius: 24px`, slight shadow
- A small floating Bento-style card overlapping the photo bottom-left:
  - Shows next upcoming event: "Next Event: GC Swimming — Apr 22"
  - `DM Mono` label, white card, gold left border

**Background:** Cream `#F5F0E8`. Subtle ruled horizontal lines as texture (5% opacity).

---

### Section 2 — Marquee Ticker Strip

A full-width infinite scrolling marquee strip separating Hero from About.

**Content:** Sport names cycling continuously:
`SWIMMING · WATER POLO · FOOTBALL · CRICKET · BASKETBALL · ATHLETICS · BADMINTON · SQUASH · VOLLEYBALL · HOCKEY · TENNIS · TABLE TENNIS · CHESS · WEIGHTLIFTING · WRESTLING · GYMNASTICS ·`

**Style:**
- Background: `#C9A84C` gold
- Text: `#111111` black, `Barlow Condensed` Bold, uppercase, 18px
- Separator between items: `·` bullet
- Speed: ~40s per full loop, smooth
- Direction: Left scroll

---

### Section 3 — About Us

**Layout:** Asymmetric two-column. Left 40% — giant number anchor + label. Right 60% — content.

**Left column:**
- Giant numeral `'58` in `Barlow Condensed` Black, ~200px, color `#EDEAE2` (very light, background-like — acts as texture)
- Below it: Small gold label `DM Mono` — "YEAR FOUNDED"

**Right column:**
- Section eyebrow: `ABOUT US` in `DM Mono`, gold, tracked
- Heading (`Playfair Display` Bold, 48px): "IIT Bombay's Sporting Heart"
- Body (`DM Sans` 16px, line-height 1.7):
  > "IIT Bombay boasts a vibrant sports scene that keeps students active throughout the year. The institute's calendar is packed with exciting events, ranging from the inter-hostel General Championships to the prestigious Inter-IIT competitions. To nurture this competitive spirit, IIT Bombay offers state-of-the-art sports facilities — from basketball and volleyball courts to a swimming pool, football ground, and cricket ground. This commitment extends beyond facilities, with students and faculty alike demonstrating a dedication to honing their skills and fostering strong bonds through sportsmanship."

- Tagline box — full-width dark card (`#111111` bg, `#C9A84C` text, `Barlow Condensed` 32px):
  ```
  UNTIL.   VICTORY.   ALWAYS.
  ```
  Three words spaced across the card width, no border, just the card itself.

**Background:** Cream `#F5F0E8`. Thin horizontal ruled line above section.

---

### Section 4 — Marquee Ticker Strip #2

Same marquee component, different content. This one carries **achievements**:

`INTER-IIT GOLD · SWIMMING 2024 · 3 CONSECUTIVE TITLES · BLACKCATS · 3500+ ATHLETES ACROSS IITS · GMAAA AFFILIATED · OLYMPIC-SIZED POOL ·`

**Style:**
- Background: `#111111` dark
- Text: `#F5F0E8` cream, `Barlow Condensed` Bold
- Direction: Right scroll (opposite to first — creates counter-motion feel)

---

### Section 5 — Bombay BlackCats

**Layout:** Full-bleed dark section (`#111111` background). Two columns — left 60% text, right 40% mascot/image.

**Left:**
- Eyebrow: `INTER-IIT CONTINGENT` in `DM Mono`, gold
- Heading (`Playfair Display` Bold, 48px, cream): "Bombay BlackCats"
- Gold underline accent: 3px, 60px wide, below heading
- Body (`DM Sans` 16px, `--text-on-dark` cream):
  > "The BlackCats — IIT Bombay's Inter-IIT contingent — are a testament to the institute's unwavering dedication to athletic excellence. Since 1961, the Inter-IIT Sports Meet has served as India's premier inter-collegiate sporting battleground, drawing over 3,500 athletes from all IITs. The BlackCats are a force driven by an unparalleled passion for their sports. It burns brightly in the countless hours spent honing their skills, and the unwavering commitment to supporting their teammates. The BlackCats are a living embodiment of IIT Bombay's vibrant sports culture, where dedication, expert coaching, passion, and teamwork become the cornerstones of athletic achievement."
- CTA link: "View Inter-IIT Results →" in gold, underline on hover

**Right:**
- BlackCats mascot logo — large, centered
- Behind it: very subtle gold radial gradient glow (`rgba(201,168,76,0.15)`)
- Mascot card: no border, just the image floating on dark

**Background:** `#111111`

---

### Section 6 — Sports App

**Layout:** Light section break — background `#FFFFFF` white (first true white section, creates rhythm contrast against cream and dark).

**Structure:** Centered, single column, max-width 720px.

- Eyebrow: `COMING SOON` in `DM Mono`, gold, tracked
- Heading (`Playfair Display` Bold, 48px): "Sports, in your pocket."
- Subtext (`DM Sans`, muted): "The IITB Sports App seamlessly integrates event registration, automated e-certificate generation, real-time court booking for all facilities, live GC scores, tournament brackets, match schedules, and detailed player profiles and achievements. Available on Android and iOS."
- Phone mockup image — centered, floating, slight drop shadow
- CTA button: Large outlined pill — "LAUNCHING SOON" — gold border, gold text, `Barlow Condensed` Bold. Non-clickable (visual state only), or links to a notify/waitlist form.

**Platform tags:** Two small pill tags below CTA — `Android` · `iOS` — in `DM Mono`, bordered.

---

### Section 7 — Footer

**Layout:** Dark `#111111` background, four columns.

**Column 1 — Brand:**
- IITB Sports logo (white version)
- Tagline: "Until. Victory. Always." in `DM Sans` italic, muted cream
- Social icons: Instagram · LinkedIn · Facebook — white, hover gold

**Column 2 — Quick Links:**
- Home · Sports · Court Status · GC · Yearbook · Blogs

**Column 3 — More:**
- Events Timeline · Turf Booking · Contact Us · Feedback

**Column 4 — Legal:**
- Terms of Use · Privacy Policy
- Copyright line: "© 2025 IIT Bombay Sports. All rights reserved."

**Divider:** Thin gold `1px` horizontal rule above footer columns.

---

## Texture & Atmosphere Rules

| Element | Treatment |
|---|---|
| Cream sections | Subtle horizontal ruled lines, 4% black opacity — graph paper feel |
| Dark sections | No texture — pure flat dark, gold glows only |
| White sections | Clean, no texture — maximum contrast breathing room |
| Cards / Bento cells | `border: 1px solid var(--border)` + `box-shadow: var(--shadow)` |
| Section transitions | No harsh cuts — use the marquee strips as visual breathing strips between sections |

---

## Animation & Motion Rules

| Element | Animation |
|---|---|
| Page load | Staggered fade-up — navbar (0ms), hero text (100ms), hero image (200ms), stats (400ms) |
| Scroll reveal | Each section fades + slides up 24px on entering viewport |
| Marquee | Constant smooth CSS animation, no pause on hover |
| Nav on scroll | Background + shadow transition: `transition: all 0.3s ease` |
| CTA hover | Scale 1.02 + shadow deepens |
| Card hover (Bento) | `translateY(-4px)` + shadow increases |
| Gold accents | Color transitions: `transition: color 0.2s ease` |

---

## Section Order Summary

```
[Sticky Navbar]
  ↓
[1] Hero — split layout, headline, stats, CTAs
  ↓
[2] Marquee Ticker — gold bg, sport names
  ↓
[3] About Us — asymmetric, giant '58, body, UNTIL VICTORY ALWAYS
  ↓
[4] Marquee Ticker — dark bg, achievements, reverse direction
  ↓
[5] Bombay BlackCats — full dark section, mascot
  ↓
[6] Sports App — white section, phone mockup, launching soon
  ↓
[7] Footer — dark, 4-column, social, legal
```

---

*End of Phase 2 Spec. Next: Phase 3 — Sports Directory Page (Bento Grid) + Individual Sport Page Template (Aquatics).*
