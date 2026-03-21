# SeekerClaw V2 — Landing Page Build Prompt

Build a single-page landing page for **SeekerClaw** — an AI agent layer for the Solana Seeker phone — using **React + Vite + TypeScript + Tailwind CSS + shadcn/ui**. The aesthetic is dark, premium, Apple-inspired with a custom "liquid glass" morphism effect. Deep black background (`#06080f`) throughout with `#E41F28` red as the sole brand accent.

---

## FONTS & DESIGN SYSTEM

**Google Fonts import:**
- **Rethink Sans** (400, 500, 600, 700, 800) — headings
- **Outfit** (300, 400, 500, 600) — body text
- **JetBrains Mono** (400, 500) — code/terminal elements

**Tailwind config** — extend fontFamily:
```js
heading: ["'Rethink Sans'", "sans-serif"]
body: ["'Outfit'", "sans-serif"]
mono: ["'JetBrains Mono'", "monospace"]
```

**CSS Variables** (`:root` in `index.css`):
```css
--background: #06080f;
--foreground: #eaf0ff;
--primary: #E41F28;
--primary-foreground: #ffffff;
--border: rgba(26, 34, 53, 1);
--border-glow: rgba(228, 31, 40, 0.25);
--radius: 16px;
--font-heading: 'Rethink Sans', sans-serif;
--font-body: 'Outfit', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Surface layers */
--bg-surface: #0b0f1a;
--bg-card: #0f1420;
--bg-card-hover: #131a28;
--bg-elevated: #161d2d;

/* Text */
--text-primary: #eaf0ff;
--text-secondary: #8892b0;
--text-muted: #7a8ab0;

/* Glow effects */
--glow-sm: 0 0 24px rgba(228, 31, 40, 0.25);
--glow-md: 0 0 32px rgba(228, 31, 40, 0.4);
--glow-lg: 0 0 60px rgba(228, 31, 40, 0.08);
```

**Typography rules:**
- All headings: `font-heading font-bold text-[--text-primary] tracking-tight leading-[0.95]`
- All body text: `font-body font-light text-[--text-secondary] text-sm`
- All code/terminal: `font-mono text-sm`
- All buttons: `font-body font-medium rounded-full`
- Gradient text accent: `background: linear-gradient(135deg, #E41F28, #ff6b6b); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`

---

## LIQUID GLASS CSS (in `@layer components`)

Two variants — `.liquid-glass` (subtle) and `.liquid-glass-strong` (more visible):

### `.liquid-glass`
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(228, 31, 40, 0.35) 0%, rgba(255, 255, 255, 0.15) 20%,
    rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.15) 80%, rgba(228, 31, 40, 0.35) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### `.liquid-glass-strong`
Same structure but: `backdrop-filter: blur(50px)`, stronger `box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15)`, and slightly higher gradient opacity (0.45 / 0.2). The gradient uses the brand red `rgba(228, 31, 40, ...)` at top and bottom edges for a subtle red glass tint.

---

## SECTION 1 — NAVBAR (fixed)

Fixed at `top-4`, full-width, `z-50`.

- **Left:** SeekerClaw logo (SVG claw mark, 40×40) + "Seeker**Claw**" text (brand name with "Claw" in `--primary` red)
- **Center:** a `liquid-glass` `rounded-full` pill containing nav links:
  - "Features", "Use Cases", "Roadmap" as `text-sm font-medium text-foreground/90`
  - Page links: "Quick Setup", "Partner Skills", "Skill Creator"
- **Right:** a solid `bg-[--primary] text-white rounded-full` "GitHub" button with GitHub icon + a `liquid-glass-strong rounded-full` "Get on dApp Store" button with download icon
- **Mobile (< 768px):** burger toggle → `.nav__links.open` dropdown

---

## SECTION 2 — HERO (min-height 100vh)

Container: `relative overflow-visible`, min-height `100vh`, `--background` deep black.

### Background effects:
- **Grid:** subtle CSS grid pattern overlay at 4% opacity
- **Orbs:** two radial gradient orbs — one red (`rgba(228,31,40,0.12)`, top-right), one dark blue (`rgba(11,15,26,0.8)`, bottom-left) — both with 40px blur

### Content (z-10, two-column layout on desktop):

**Left column (text):**
- Tag pill: `liquid-glass rounded-full` containing "Built for Solana Seeker"
- Heading: **"The AI Agent Layer"** + line break + **"for Solana Seeker"** (second line uses gradient-text red effect) — `text-[clamp(2.2rem,5vw,3.5rem)] font-heading font-bold tracking-tight leading-[0.95]`
- Subtext: "SeekerClaw turns your Seeker phone into an autonomous AI agent. Monitor your wallet, trade on Jupiter, get Telegram alerts, control your device — all running 24/7 on your phone." — fades in with blur animation at 0.8s delay
- CTA buttons (motion, 1.1s delay):
  - `bg-[--primary] text-white rounded-full` "Get on dApp Store" + download icon
  - `liquid-glass-strong rounded-full` "GitHub" + GitHub icon
  - `liquid-glass rounded-full` "Download APK" + download icon
  - Text link: "Quick Setup →"

**Right column (visual):**
- Phone device mockup frame (`rounded-[20px]` with `border border-[--border]`)
- Inside: slideshow of 4 app screenshots (Home, Console, Skills, Settings) — auto-rotate every 4s with crossfade
- Invisible hotspot buttons over the phone's bottom nav bar to switch slides
- Subtle red glow behind the device: `box-shadow: var(--glow-lg)`

### Stats strip (below hero content):
Horizontal row of 4 stats in `liquid-glass rounded-2xl`, each separated by dividers:
- **200,000+** — "Seeker Devices"
- **56+** — "Built-in Tools"
- **255+** — "PRs Shipped"
- **24/7** — "Autonomous Agent"
Values: `text-2xl font-heading font-bold text-[--text-primary]` with animated counter (easeOutCubic, 1.8s) triggered by IntersectionObserver. Labels: `text-xs text-[--text-muted]`.

### Product Hunt badge:
Centered below stats strip. PH featured badge image linking to the SeekerClaw Product Hunt page.

---

## SECTION 3 — FEATURES ("What SeekerClaw Does")

`py-[var(--section-pad)]` with `--bg-surface` background.

**Header:** badge "Capabilities", heading "What SeekerClaw Does", subtext "A full-stack AI agent running natively on the most crypto-native phone in the world."

**6-card grid** — `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`. Each card: `liquid-glass rounded-[--radius-card] p-6`, scroll-reveal animation. Contains:
- Icon: `w-10 h-10` SVG in `text-[--primary]` (stroke, not fill)
- Title: `text-lg font-heading font-semibold text-[--text-primary]`
- Description: `text-[--text-secondary] font-body font-light text-sm`

**Cards:**
1. Brain icon — **"Autonomous AI Agent"** — "Powered by Claude or OpenAI (multi-provider) with persistent memory, customizable personality, and scheduled automation running 24/7. Self-aware — knows its own capabilities, diagnoses its own issues, and tells you what went wrong."
2. Clock icon — **"Solana Wallet Integration"** — "Check SOL & SPL token balances, send transactions, swap tokens via Jupiter, create limit orders and DCA positions — all secured by Seed Vault hardware."
3. Chat icon — **"Social & Messaging"** — "Telegram integration with reactions, file sharing, and vision analysis. Send SMS, make calls, manage contacts — your agent handles it all."
4. Phone icon — **"Deep Device Control"** — "GPS location, camera with AI vision, app launching, clipboard, battery monitoring, text-to-speech — full native control of your Seeker."
5. Globe icon — **"Web Intelligence"** — "Real-time web search, page reading, crypto prices, news, weather, and deep research on any topic — delivered to your chat."
6. Wrench icon — **"Modular Skill System"** — "35 built-in skills: crypto prices, calorie tracking, news briefings, reminders, research, and more. Add custom skills without touching code."

---

## SECTION 4 — HOW IT WORKS

Full-width section, `py-[var(--section-pad)]`.

**Header:** badge "Get Started", heading "How It Works"

**3-step horizontal flow** (stacks vertical on mobile). Each step: `liquid-glass rounded-2xl p-8` with a large step number, title, and description. Steps connected by arrow icons between them.

1. **"01 — Install SeekerClaw"** — "Download from the dApp Store onto your Solana Seeker phone."
2. **"02 — Connect Telegram & AI"** — "Add your Telegram bot token and AI provider key — takes under a minute."
3. **"03 — Your Claw Goes Live"** — "SeekerClaw runs 24/7 — monitoring, alerting, and acting autonomously."

Step numbers: `text-4xl font-heading font-bold text-[--primary]/20` (large, faded red). Titles: `text-lg font-heading font-semibold`. Descriptions: `text-sm text-[--text-secondary]`.

---

## SECTION 5 — SELF-AWARE AGENT

`py-[var(--section-pad)]` with `--bg-surface` background.

**Header:** badge "Self-Aware Agent", heading "An Agent That Knows Itself", subtext "SeekerClaw scores 100% on SAB (Self-Awareness Benchmark) — 36 audit points across knowledge and diagnostics."

**3-card grid** — `grid-cols-1 md:grid-cols-3 gap-6`:
1. **"Knows what it can do"** — "Your agent understands its own tools, limits, and configuration. Ask it anything about itself and it answers accurately."
2. **"Diagnoses its own problems"** — "When something breaks, it checks logs, reads health files, and pinpoints the issue — across Telegram, wallet, memory, scheduling, and device control."
3. **"Tells you what's wrong"** — "No silent failures. If the API is down, a permission is missing, or a tool times out — your agent explains what happened and what to do next."

Each card: `liquid-glass rounded-[--radius-card] p-6` with scroll-reveal.

---

## SECTION 6 — USE CASES ("What Seeker Owners Are Doing")

`py-[var(--section-pad)]`.

**Header:** badge "Real-World Scenarios", heading "What Seeker Owners Are Doing", subtext "From portfolio monitoring to DeFi research — SeekerClaw handles it all autonomously."

**6-card grid** — `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`. Each card: `liquid-glass rounded-[--radius-card] p-6` with a terminal/chat aesthetic:
- Title: `font-heading font-semibold text-[--text-primary]`
- Messages: styled as terminal prompts with `>` prefix in `text-[--primary]`, message text in `font-mono text-sm text-[--text-secondary]`

**Cards:**
1. Eye icon — **"Wallet Watcher"**
   - `> "Alert me on Telegram when my SOL balance drops below 5"`
   - `> "Check my portfolio every morning and send me a summary"`
2. TrendingUp icon — **"DeFi Assistant"**
   - `> "What's the current price of SOL, JUP, and BONK?"`
   - `> "Swap 1 SOL to USDC with less than 1% slippage"`
3. Bell icon — **"Onchain Notifications"**
   - `> Agent monitors your wallet and sends alerts for incoming/outgoing transactions.`
4. Home icon — **"Smart Home"**
   - `> "Turn off the outdoor lights"`
   - `> "Set heating to 23 degrees"`
5. Terminal icon — **"Shell & DevOps"**
   - `> "Check disk space and clean up old files"`
   - `> "Curl this API endpoint and summarize the JSON response"`
6. Globe icon — **"Web Research"**
   - `> "Search the web for the latest Solana Mobile news"`
   - `> "Fetch this article and give me a 3-bullet summary"`

---

## SECTION 7 — COMPARISON TABLE ("Why SeekerClaw is Different")

`py-[var(--section-pad)]` with `--bg-surface` background.

**Header:** badge "The Difference", heading "Why SeekerClaw is Different", subtext "No other AI agent runs natively on a crypto phone with hardware wallet integration, shell access, and messaging — all at once."

**Table** inside a `liquid-glass rounded-2xl` container with horizontal scroll on mobile:
- 3 columns: Feature | Regular AI Apps | SeekerClaw on Seeker
- SeekerClaw column header highlighted with `text-[--primary]`
- Rows with alternating subtle background. Check marks (`✓`) in `text-[--primary]`, X marks (`✗`) in `text-[--text-muted]`.

| Feature | Regular AI Apps | SeekerClaw on Seeker |
|---|---|---|
| Runs on device | Cloud only | ✓ Native on Seeker |
| Wallet access | ✗ | ✓ Via Seed Vault |
| Persistent memory | ✗ | ✓ Learns and remembers |
| Shell access | ✗ | ✓ 33 Unix commands + curl |
| Messaging + reactions | ✗ | ✓ Telegram with full formatting |
| Usage analytics | ✗ | ✓ Per-session token tracking |
| Crypto-native | ✗ | ✓ Solana-first |
| Cron scheduling | ✗ | ✓ Natural language + recurring |
| Self-diagnosis | ✗ | ✓ Agent knows when something's wrong |
| Error resilience | ✗ | ✓ Auto-retry + graceful fallback |
| Hardware wallet security | ✗ | ✓ Seed Vault signing |

---

## SECTION 8 — ROADMAP

`py-[var(--section-pad)]`.

**Header:** badge "What's Coming", heading "Roadmap"

**3-column layout** — `grid-cols-1 md:grid-cols-3 gap-6`. Each column: `liquid-glass rounded-2xl p-6` with a colored status indicator dot in the header.

**Column 1 — Shipped ✅** (green dot):
- Persistent memory with ranked search
- Android device bridge (SMS, calls, GPS, camera, apps, contacts)
- Solana wallet (balance, send, swap, limit orders, DCA)
- Telegram with reactions, file sharing, and AI vision
- 56 built-in tools with analytics
- Natural language cron scheduling
- Multi-provider web search + page reading
- MCP server support for extensible tools
- 35 skills including CalClaw calorie tracker
- Skill marketplace: export as .md or ZIP, import custom skills
- NFT holdings viewer (Helius DAS API)
- Cron agent turns — scheduled jobs run full AI conversations
- Session memory — agent remembers context across restarts
- Multi-provider support (Claude + OpenAI)
- Self-aware agent: 100% SAB score (36/36 audit points)
- dApp Store listing
- Open-source: MIT license, CI/CD, community ready

**Column 2 — Next** (yellow/amber dot):
- Transaction monitoring & smart alerts
- Vector embeddings for semantic memory
- Community skill marketplace

**Column 3 — Future** (blue dot):
- Multi-agent coordination
- X, Discord & WhatsApp integration
- Multi-chain support
- DePIN & IoT device control
- Agent-to-agent economy on Solana

List items: `text-sm text-[--text-secondary]` with subtle left border or bullet. Status dots use respective colors matching V1 (green/amber/blue).

---

## SECTION 9 — VISION

`py-[var(--section-pad)]` with `--bg-surface` background. Centered text layout.

- Heading: **"The Vision"** — uses gradient-text red effect, `text-[clamp(2rem,4.5vw,3.2rem)]`
- Body: "Every Seeker owner gets a personal AI agent that lives on their phone 24/7, monitors their wallet, keeps them informed via Telegram — and gets smarter every day."
- Tagline: "SeekerClaw is how Solana Seeker becomes the first true **AI + Crypto phone**." — with `<strong>` in white against muted text

---

## SECTION 10 — CTA ("Get Started")

`py-[var(--section-pad)]` with a subtle red radial glow in the background (`radial-gradient(ellipse at center, rgba(228,31,40,0.08) 0%, transparent 70%)`).

**Content (z-10, centered):**
- Badge: "Get Started"
- Heading: **"Set Up Your Agent in Under a Minute"** — `text-[clamp(2.2rem,5vw,3.5rem)]`
- Subtext: "Use our Quick Setup tool to generate a config QR code, then scan it with SeekerClaw to import your credentials and defaults instantly."
- Button: `bg-[--primary] text-white rounded-full` "Quick Setup" + plus icon

---

## SECTION 11 — FOOTER

`mt-16 pt-8 border-t border-[--border]`.

- **Top row:** SeekerClaw logo + brand tagline "Built for Seeker. Powered by Solana."
- **Middle row:** Link columns — "Product" (Features, Use Cases, Roadmap), "Resources" (Quick Setup, Partner Skills, Skill Creator), "Legal" (Copyright, License, Privacy)
- **Social icons row:** X (Twitter), GitHub, Telegram — as icon links
- **Bottom:** `text-[--text-muted] text-xs` — "© 2026 SeekerClaw. Built for Seeker. Powered by Solana."

---

## INTERACTIONS & ANIMATIONS

### Scroll reveal
All sections use `.reveal` class + `IntersectionObserver` (threshold 0.12). When element enters viewport, add `.visible` class that triggers:
```css
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out); }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

### Nav scroll behavior
Nav adds `.scrolled` class when `scrollY > 60px` — applies `backdrop-filter: blur(12px)` and `liquid-glass` background.

### Mobile menu
Burger toggle opens `.nav__links.open` with slide-down animation.

### Stats counter animation
`IntersectionObserver` triggers `animateCounter()` with easeOutCubic over 1.8s. Numbers count up from 0 to target value.

### Hero phone slideshow
Auto-rotate slides every 4s with crossfade. Hotspot buttons allow manual tab switching. Active slide indicator syncs with phone's bottom nav bar.

### Smooth scroll
All `a[href^="#"]` links scroll with nav height offset compensation.

### BlurText heading animation (Hero)
Uses `motion/react` (framer-motion). Splits heading text by words, each word animates via IntersectionObserver:
- `filter: blur(10px)` → `blur(5px)` → `blur(0px)`
- `opacity: 0` → `0.5` → `1`
- `y: 50` → `-5` → `0`
- Step duration: 0.35s, delay: 100ms per word

---

## DEPENDENCIES

```json
{
  "hls.js": "for any HLS video backgrounds (future use)",
  "motion": "framer-motion for scroll/reveal animations",
  "lucide-react": "icon library",
  "tailwindcss-animate": "Tailwind animation utilities",
  "@shadcn/ui": "UI component primitives"
}
```

---

## KEY PATTERNS

- **Section badges:** `liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-[--text-primary] font-body inline-block mb-4`
- **Section headings:** `text-[clamp(2.2rem,5vw,3.5rem)] font-heading font-bold text-[--text-primary] tracking-tight leading-[0.95]`
- **Cards:** `liquid-glass rounded-[--radius-card] p-6` with hover → `bg-[--bg-card-hover]` transition
- **Primary buttons:** `bg-[--primary] text-white font-body font-medium rounded-full px-6 py-3 hover:shadow-[var(--glow-sm)] transition`
- **Ghost buttons:** `liquid-glass-strong rounded-full px-6 py-3 text-[--text-primary] hover:bg-white/5 transition`
- **Gradient text:** `bg-gradient-to-r from-[#E41F28] to-[#ff6b6b] bg-clip-text text-transparent`
- **Outer page wrapper:** `bg-[--background] overflow-visible`
- **All responsive breakpoints:** 1024px (tablet — 2-col grids, stacked hero), 768px (mobile — 1-col grids, burger menu), 480px (small mobile)

---

## CONFIG-DRIVEN ARCHITECTURE

All page content should be driven from a central config object (similar to V1's `window.SITE_CONFIG`), stored as a TypeScript constant. This includes:

- Brand info (name, tagline, logo path, links)
- Navigation links
- Hero content (tag, title lines, description, CTA labels)
- Stats array (value, suffix, label)
- Feature cards (icon name, title, description)
- How-it-works steps (number, title, description)
- Self-aware agent cards (title, description)
- Use case cards (icon, title, messages array)
- Comparison table (headers, rows)
- Roadmap columns (phase, label, items array)
- Vision text
- CTA section text
- Footer links

This allows the entire site to be rebranded or content-updated by editing a single config file.

---

## LINKS & EXTERNAL REFERENCES

- **dApp Store:** `solanadappstore://details?id=com.seekerclaw.app`
- **GitHub:** `https://github.com/sepivip/SeekerClaw`
- **X (Twitter):** `https://x.com/SeekerClaw`
- **Telegram:** `https://t.me/seekerclaw`
- **OpenClaw:** `https://github.com/openclaw/openclaw`
- **APK Download:** `https://github.com/sepivip/SeekerClaw/releases/latest`
- **Product Hunt:** `https://www.producthunt.com/products/seekerclaw`
- **Domain:** `https://seekerclaw.xyz`

---

## NOTES

- V1 is vanilla HTML/CSS/JS with no build tools. V2 migrates to React + Vite + TypeScript for component reusability and better DX.
- The liquid glass gradient uses brand red (#E41F28) tinting instead of pure white, giving it a subtle warm/red glass edge.
- Hero screenshots (hero_scr1–4.png) and logo (logo.svg) assets carry over from V1.
- No video backgrounds in V1 — if adding HLS video sections in V2, use `hls.js` with Safari native fallback. Video URLs are TBD (placeholders OK).
- Waitlist/Formspree form from the original prompt is not used — SeekerClaw uses dApp Store + GitHub as primary distribution channels.
- The landing page is currently the only page being rebuilt. Quick Setup, Partner Skills, Skill Creator, and legal pages remain separate and may be migrated later.
