# SeekerClaw Landing Page

## Project Overview
Landing page for SeekerClaw — the AI Agent Layer for Solana Seeker phone. Static site deployed on GitHub Pages.

## Tech Stack
- Pure HTML / CSS / JS — no build tools, no frameworks
- Google Fonts: Syne (headings), Outfit (body), JetBrains Mono (code)
- Formspree for waitlist email capture
- GitHub Pages for hosting

## File Structure
```
index.html          — Main landing page (all sections)
css/style.css       — Styles, CSS variables, animations, responsive
js/main.js          — Scroll reveals, nav, counter animation, form handling
assets/             — Logo and images (logo.jpg pending)
```

## Design System
- **Theme**: "Cyber-Solana" dark mode
- **Background**: #06080f (deep navy-black)
- **Accents**: Solana gradient (#9945FF purple → #14F195 green), #00e5cc cyan
- **CSS variables**: All tokens defined in `:root` in style.css
- **Animations**: Intersection Observer scroll reveals, CSS keyframe animations

## Page Sections
1. Sticky nav (transparent → solid on scroll)
2. Hero with animated terminal mockup
3. Stats strip (150K+ devices, 18+ skills, 24/7)
4. Features (6 cards)
5. Use Cases (6 cards)
6. Comparison table (vs regular AI apps)
7. Roadmap (Now / Next / Future)
8. Vision statement
9. Waitlist email form
10. Footer with social links

## Social Links
- X (Twitter): https://x.com/SeekerClaw
- GitHub: TBD
- dApp Store: TBD

## Before Going Live
- [ ] Add logo image to `assets/logo.jpg`
- [ ] Replace `YOUR_FORM_ID` in waitlist form action with Formspree ID
- [ ] Update `href="#"` on dApp Store CTA buttons with actual URL
- [ ] Update `href="#"` on GitHub footer icon with actual URL
- [ ] Enable GitHub Pages: Settings → Pages → Source: main branch, root

## Conventions
- BEM-ish class naming (block__element--modifier)
- Mobile-first responsive: 480px / 768px / 1024px breakpoints
- `.reveal` class for scroll-triggered animations
- No external JS dependencies
