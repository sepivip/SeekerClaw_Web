# SeekerClaw Design System

*Adapted from Airbnb's design philosophy, inverted for a cyber-Solana dark theme.*

## 1. Visual Theme & Atmosphere

SeekerClaw is a dark-mode, agent-forward product page that feels like a terminal meets a premium crypto phone. Where Airbnb is pure white and photography-first, SeekerClaw is deep navy-black (`#06080f`) and code-first — the surface itself feels like the inside of a running agent. The design operates on a foundation of layered dark backgrounds with **SeekerClaw Red** (`#E41F28`) as the singular brand accent, and the Solana gradient (`#9945FF → #14F195`) reserved for rare decorative moments (logo, hero, stat highlights).

Typography pairs **Rethink Sans** (headings) with **Outfit** (body) and **JetBrains Mono** (code) — a combination that reads like a developer tool but still feels human. Headings use slight negative letter-spacing (`-0.02em`) to feel confident without being cold. The effect is a product page that signals "this runs on your phone, not in a browser tab" the moment it loads.

What distinguishes SeekerClaw's system is a **semantic token layer** (`--color-*`, `--bg-*`, `--text-*`, `--border-*` in `theme.css`) over a dark color ramp, plus a **subtle glow shadow stack** that replaces Airbnb's warm drop shadows with cyber-style red glows for elevated/active elements. Combined with generous but not excessive border-radius (8px–16px), BEM-like class naming, and scroll-reveal animations, the interface feels built rather than decorated.

**Key Characteristics:**
- Deep navy-black canvas (`#06080f`) with SeekerClaw Red (`#E41F28`) as singular brand accent
- Rethink Sans (display) + Outfit (body) + JetBrains Mono (code)
- Semantic token system (`--color-*`, `--bg-*`, `--text-*`) layered over raw values
- Subtle red-glow shadows for elevated and hovered surfaces instead of warm drop shadows
- Border-radius scale: 8px inputs/buttons, 12px cards, 14–16px feature cards, 50% avatars
- Code-forward details: terminal mocks, mono chips, versioned badges
- Solana gradient (`#9945FF → #14F195`) reserved for logo, hero headline, and stat numbers only
- Warm-near-black text is replaced by a cool near-white ramp — `#f4f6fb` primary, `#95a3c4` secondary, `#5a6a8c` muted

## 2. Color Palette & Roles

### Primary Brand
- **SeekerClaw Red** (`#E41F28`): `--color-primary`, primary CTA, brand accent, active states, logo claw
- **Deep Red** (`#B01820`): pressed/dark variant of brand red, border accents on active items
- **Red Glow 10%** (`rgba(228, 31, 40, 0.10)`): chip backgrounds, hover tints
- **Red Glow 40%** (`rgba(228, 31, 40, 0.40)`): focus rings, active borders

### Solana Gradient (Decorative Only)
- **Solana Purple** (`#9945FF`): gradient start
- **Solana Green** (`#14F195`): gradient end
- **Usage**: `--gradient-solana` — logo, hero headline, stat numbers. Never on body text, buttons, or large surfaces.

### Surface Scale (Dark Ramp)
- **Background Deep** (`#06080f`): `--bg-deep`, page background
- **Background Card** (`#0b0f1a`): `--bg-card`, feature cards, panels
- **Background Card Hover** (`#0f1422`): `--bg-card-hover`, hover state
- **Background Elevated** (`#11162a`): `--bg-elevated`, modals, dropdowns, QR preview card
- **Background Code** (`#0a0e18`): `--bg-code`, code blocks, terminal mocks

### Text Scale (Cool Near-White Ramp)
- **Text Primary** (`#f4f6fb`): `--text-primary`, headings, emphasized UI
- **Text Secondary** (`#95a3c4`): `--text-secondary`, body copy, descriptions
- **Text Muted** (`#5a6a8c`): `--text-muted`, captions, placeholders, disabled
- **Text Accent** (`#ff8f94`): `--text-accent`, inline links on dark (lighter red for contrast)

### Borders & Dividers
- **Border Subtle** (`rgba(47, 60, 91, 0.35)`): `--border-subtle`, dividers, code block borders
- **Border Default** (`rgba(47, 60, 91, 0.55)`): `--border`, card borders, inputs
- **Border Hover** (`rgba(228, 31, 40, 0.30)`): `--border-hover`, hovered/active cards
- **Border Focus** (`rgba(228, 31, 40, 0.55)`): `--border-focus`, focused inputs

### Semantic
- **Success** (`#14F195`): reuses Solana Green — success toasts, positive stats
- **Warning** (`#FFB84D`): `--color-warning`, warning banners (e.g. "anyone who scans this QR…")
- **Error** (`#FF5B61`): `--color-error`, validation errors (lighter red for contrast on dark)

## 3. Typography Rules

### Font Family
- **Display / Headings**: `Rethink Sans`, fallback `-apple-system, system-ui, sans-serif`
- **Body / UI**: `Outfit`, fallback `-apple-system, system-ui, sans-serif`
- **Mono / Code / Chips**: `JetBrains Mono`, fallback `ui-monospace, "Cascadia Mono", monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Hero Title | Rethink Sans | clamp(2rem, 5vw, 3.6rem) | 800 | 1.05 | -0.02em | Gradient sub-line |
| Section Title | Rethink Sans | clamp(1.7rem, 3.5vw, 2.5rem) | 700 | 1.1 | -0.02em | `.section-title` |
| Card Title | Rethink Sans | 1.05–1.25rem | 700 | 1.2 | -0.01em | Feature cards, use cases |
| Small Title | Rethink Sans | 0.88–0.92rem | 600 | 1.2 | normal | FAQ summary, panel headers |
| Section Tag | JetBrains Mono | 0.72rem | 500 | 1.2 | 0.06em | `text-transform: uppercase`, red |
| Body Large | Outfit | 1rem | 400 | 1.6 | normal | Hero description |
| Body | Outfit | 0.88rem | 400 | 1.55 | normal | Cards, paragraphs |
| Body Small | Outfit | 0.82rem | 400 | 1.5 | normal | Meta, captions |
| Button | Outfit | 0.88rem | 600 | 1.2 | normal | CTA buttons |
| Chip / Badge | JetBrains Mono | 0.62rem | 500 | 1 | 0.04em | Category chips, versions, uppercase |
| Inline Code | JetBrains Mono | 0.76–0.78rem | 500 | 1.4 | normal | Config keys, CLI commands |
| Terminal Line | JetBrains Mono | 0.82rem | 400 | 1.5 | normal | Hero terminal mock |

### Principles
- **Display ≥ 700 weight** — headings are always confident. No 400-weight headings.
- **Negative tracking on display** — `-0.02em` on large titles for intimacy, `-0.01em` on card titles.
- **Mono for identity signals** — chips, versions, tags, and tech labels always use JetBrains Mono to reinforce the "this is developer-grade" feel.
- **Tight line-height on display (1.05–1.2), comfortable on body (1.55–1.65)** — headings feel like a title card, body feels like a readable doc.
- **Uppercase + letter-spacing** — reserved for small mono chips and eyebrow tags. Never on body copy.

## 4. Component Stylings

### Buttons

**Primary (brand)**
- Background: `#E41F28`
- Text: `#ffffff`
- Padding: `0.7rem 1.35rem`
- Radius: `10px`
- Shadow: `0 8px 24px rgba(228, 31, 40, 0.25)`
- Hover: `translateY(-1px)` + shadow `0 12px 32px rgba(228, 31, 40, 0.35)`
- Active: `translateY(0) scale(0.98)`
- Focus-visible: `0 0 0 3px rgba(228, 31, 40, 0.35)` ring

**Outline (secondary)**
- Background: `transparent`
- Text: `#f4f6fb`
- Border: `1px solid rgba(47, 60, 91, 0.55)`
- Hover: background `rgba(228, 31, 40, 0.08)` + border `rgba(228, 31, 40, 0.35)`

**Ghost / Icon-only**
- Background: `transparent`
- Radius: `50%` for circular (tooltip triggers, nav icons)
- Hover: background `rgba(47, 60, 91, 0.30)` + text `--text-primary`

### Cards & Containers
- Background: `#0b0f1a` (`--bg-card`)
- Border: `1px solid rgba(47, 60, 91, 0.55)`
- Radius: `12px` standard, `14–16px` large feature cards
- Hover: background `#0f1422`, border `rgba(228, 31, 40, 0.30)`, `translateY(-2px)`, shadow `0 16px 48px rgba(228, 31, 40, 0.08)`
- Feature cards: 1.2rem internal padding, icon at top, title + description below

### Inputs
- Background: `rgba(6, 8, 15, 0.70)`
- Border: `1px solid rgba(47, 60, 91, 0.45)`
- Text: `#f4f6fb`
- Placeholder: `#5a6a8c`
- Font size: `1rem` minimum on mobile (prevents iOS auto-zoom)
- Min-height: `36px` (quick setup) / `44px` (general)
- Radius: `8px`
- Focus: border `rgba(228, 31, 40, 0.55)` + ring `0 0 0 3px rgba(228, 31, 40, 0.12)`
- Invalid: border `rgba(255, 91, 97, 0.85)`

### Custom Select
- Trigger styled identically to input
- Dropdown: `rgba(13, 17, 28, 0.97)` background with `backdrop-filter: blur(16px)`, 1px border, `8px` radius, layered shadow
- Option: JetBrains Mono, `0.78rem`, 5px radius on hover/selected
- Selected option: red tint (`rgba(228, 31, 40, 0.15)`)
- Arrow: rotates 180° when open

### Chips / Badges
- Brand chip: `rgba(228, 31, 40, 0.10)` bg, `#E41F28` text, JetBrains Mono `0.62rem`, uppercase, `4px` radius
- Muted chip: `rgba(47, 60, 91, 0.30)` bg, `#5a6a8c` text (e.g. version chip, category muted variant)

### Navigation
- Transparent sticky header that solidifies on scroll: background `rgba(6, 8, 15, 0.85)` + `backdrop-filter: blur(16px)` + subtle bottom border
- Logo left (claw icon + wordmark with red "Claw" accent)
- Link list center-right
- Primary CTA right (outline → red on hover)
- Mobile: burger toggle, full-width dropdown, `aria-expanded` mirrored

### Code Blocks & Terminal Mocks
- Background: `rgba(11, 15, 26, 0.90)` with 1px subtle border
- Header strip with three macOS dots (`#ff5f56`, `#ffbd2e`, `#27c93f`) and mono filename
- Body: JetBrains Mono, `0.72rem`, `1.65` line-height, `white-space: pre-wrap`
- Syntax color classes: `.c-purple` (#9945FF), `.c-green` (#14F195), `.c-cyan` (#00d4ff), `.c-muted` (#5a6a8c)

### Toasts
- Position: fixed bottom-center, `2rem` offset
- Background: `rgba(11, 15, 26, 0.95)` + `backdrop-filter: blur(12px)`
- Border: `1px solid rgba(47, 60, 91, 0.55)`
- Radius: `10px`
- Enter: `translateY(20px) → 0` with `opacity 0 → 1`

## 5. Layout Principles

### Spacing System
- Base unit: **4px**
- Scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px`
- Typical paddings: cards `1–1.5rem`, sections `3.5–5rem` vertical, container `1.5rem` horizontal

### Container & Grid
- Max container width: `1180–1280px`
- Horizontal padding: `1.5rem` mobile, `2rem` desktop
- Feature grid: `repeat(auto-fit, minmax(280–320px, 1fr))`
- Stats strip: 4-column flex with dividers between items

### Whitespace Philosophy
- **Breathing room over density**: `3.5–5rem` vertical padding between sections, generous card internals
- **Stats strip is the anchor** — large mono-weighted numbers in Solana gradient, visually heavy
- **Hero is layered, not crowded** — orbs + device slideshow + text with clear z-stacking, no competing CTAs

### Border Radius Scale
| Role | Radius |
|---|---|
| Inline code / small chips | `4–6px` |
| Inputs / standard buttons | `8–10px` |
| Cards / panels | `12px` |
| Feature cards / large panels | `14–16px` |
| Modals / hero panels | `16–20px` |
| Avatars / circular controls | `50%` |

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow | Page background, body text blocks |
| Card (subtle) | `1px` border + very faint ambient shadow | Feature cards, panels at rest |
| Card (lifted) | `0 16px 48px rgba(228, 31, 40, 0.08)` | Hover state on cards |
| Button (brand) | `0 8px 24px rgba(228, 31, 40, 0.25)` | Primary CTAs at rest |
| Button (hover) | `0 12px 32px rgba(228, 31, 40, 0.35)` | Primary CTA hover |
| Modal / Dropdown | `0 4px 6px rgba(0,0,0,0.2), 0 12px 40px rgba(0,0,0,0.45)` + `backdrop-filter: blur(16px)` | Select dropdowns, tooltips, toasts |
| Focus ring | `0 0 0 3px rgba(228, 31, 40, 0.12–0.35)` | All focusable elements |

**Shadow Philosophy**: On a dark canvas, drop shadows are nearly invisible — depth comes from **border contrast**, **red glow on interaction**, and **blur-backed layers** (`backdrop-filter: blur`). Red glow replaces Airbnb's warm drop shadow. Always use `rgba` reds (not solid) so the glow feels like light leaking out of the accent, not a hard outline.

## 7. Do's and Don'ts

### Do
- Use `#f4f6fb` (cool near-white) for primary text — never pure `#ffffff` except on brand buttons
- Apply SeekerClaw Red (`#E41F28`) as the singular accent — CTAs, active states, focus rings, tag eyebrows
- Reserve the Solana gradient for logo, hero headline, and stat numbers — it is a decorative signature, not a utility
- Use Rethink Sans ≥ 600 for headings, Outfit 400–500 for body, JetBrains Mono for chips/code
- Apply red-glow shadows (`rgba(228, 31, 40, 0.08–0.35)`) for hover and elevated states
- Use `12–16px` radius on cards, `8–10px` on inputs/buttons, `50%` on avatars/dots
- Ensure all form inputs are ≥ `1rem` on mobile to prevent iOS auto-zoom
- Mirror `aria-expanded` on every disclosure control (burger, tooltip, select, details)

### Don't
- Don't use pure black (`#000000`) for backgrounds — always the navy-tinted `#06080f`
- Don't apply Solana gradient to body text, buttons, borders, or large surfaces
- Don't use warm drop shadows — depth on dark comes from glow + border contrast
- Don't use thin weights (300) or 400 for headings — 600 minimum for display
- Don't use sharp corners (0–4px) on cards — the `12px+` rounding is part of the product feel
- Don't introduce additional brand colors beyond `--color-primary` + Solana gradient + semantic (success/warning/error)
- Don't override semantic tokens (`--text-*`, `--bg-*`) with raw hex in components — use the variable layer

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile Small | `<480px` | Single-column layouts, compact nav, burger menu |
| Mobile | `480–768px` | Stats strip stacks, hero device below text |
| Tablet | `768–1024px` | 2-column feature grid, nav links visible |
| Desktop | `1024–1280px` | 3-column feature grid, full hero layout |
| Large Desktop | `≥1280px` | Max container width, 4-column where useful |

### Touch Targets
- Buttons & links: ≥ `44px` height on mobile
- Form inputs: ≥ `44px` height, ≥ `1rem` font-size
- Nav burger: ≥ `44×44px` tap area
- Card tap targets: full card clickable, not just title

### Collapsing Strategy
- Feature grid: 3 → 2 → 1 columns
- Stats strip: 4 in a row → 2×2 → stacked
- Hero: side-by-side (text + device) → stacked (text above device)
- Navigation: full links → burger dropdown at `<768px`
- Partner skills grid: multi-column → stacked single column on mobile

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: `#06080f` (deep navy-black)
- Card background: `#0b0f1a`
- Primary text: `#f4f6fb`
- Secondary text: `#95a3c4`
- Muted text: `#5a6a8c`
- Brand accent: `#E41F28` (SeekerClaw Red)
- Gradient (special): `linear-gradient(135deg, #9945FF 0%, #14F195 100%)`
- Border: `rgba(47, 60, 91, 0.55)`
- Button hover shadow: `0 12px 32px rgba(228, 31, 40, 0.35)`

### Example Component Prompts
- **Feature card**: "Dark card with `#0b0f1a` background, `12px` radius, `1px` border `rgba(47,60,91,0.55)`. On hover: border becomes `rgba(228,31,40,0.30)`, translateY(-2px), shadow `0 16px 48px rgba(228,31,40,0.08)`. Icon at top (32px, red stroke), Rethink Sans 1.05rem weight 700 title, Outfit 0.88rem weight 400 description in `#95a3c4`."
- **Primary CTA**: "`#E41F28` background, white text, `10px` radius, Outfit 0.88rem weight 600, padding `0.7rem 1.35rem`, shadow `0 8px 24px rgba(228,31,40,0.25)`. Hover: translateY(-1px), shadow stronger."
- **Stats number**: "Large Rethink Sans 800 at clamp(2rem, 4vw, 3rem), color transparent with `background: linear-gradient(135deg, #9945FF 0%, #14F195 100%)` + `background-clip: text`. Label below in Outfit 0.82rem weight 500 `#95a3c4`."
- **Code chip**: "JetBrains Mono 0.62rem weight 500, `rgba(47,60,91,0.30)` background, `#5a6a8c` text, `4px` radius, `0.12rem 0.4rem` padding, uppercase with `0.04em` letter-spacing."
- **Terminal mock**: "Dark panel `rgba(11,15,26,0.90)` with `12px` radius and three-dot header strip. JetBrains Mono 0.82rem body, 1.5 line-height. Syntax highlights: `#9945FF` for keywords, `#14F195` for values, `#5a6a8c` for comments."

### Iteration Guide
1. Start dark — the content itself provides warmth, not the background
2. SeekerClaw Red (`#E41F28`) is the singular accent — use for CTAs, active states, and one focal moment per section
3. Solana gradient is a decorative signature — logo, hero headline, stat numbers only
4. Use cool near-white (`#f4f6fb`) text — a dark theme's "warmth" comes from the red accent, not bleached text
5. Red-glow shadows (`rgba(228,31,40,*)`) replace warm drop shadows — depth is light-leak, not drop-shadow
6. Rethink Sans ≥ 600 for display, Outfit for body, JetBrains Mono for anything code/chip/version
7. `12px+` radius on cards, `50%` on controls — the generous rounding is part of the premium-tech feel
8. Every interactive element needs `:focus-visible` with a `3px` red-glow ring
