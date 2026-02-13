/* ═══════════════════════════════════════════════════════════
   SeekerClaw — Site Configuration
   ───────────────────────────────────────────────────────────
   All branding, links, content, and text in one place.
   Edit this file to rebrand or update the entire site.
   ═══════════════════════════════════════════════════════════ */

window.SITE_CONFIG = {

  /* ── Brand ───────────────────────────────────────────── */
  brand: {
    name: 'SeekerClaw',
    nameHtml: 'Seeker<span class="accent">Claw</span>',
    tagline: 'Your phone. Your agent. Your keys. Your rules.',
    footer: 'Built for Seeker. Powered by Solana.',
    logo: 'assets/logo.svg',          // path to logo image (set '' to hide)
  },

  /* ── Links ───────────────────────────────────────────── */
  links: {
    dappStore: '#',                    // dApp Store / download URL
    github: '#',                       // GitHub repo URL
    x: 'https://x.com/SeekerClaw',    // X (Twitter) profile
    openclaw: 'https://github.com/openclaw/openclaw', // OpenClaw framework
  },

  /* ── Navigation (shared across all pages) ──────────── */
  nav: {
    links: [
      { label: 'Features',    href: '#features',        type: 'anchor' },
      { label: 'Use Cases',   href: '#usecases',        type: 'anchor' },
      { label: 'Roadmap',     href: '#roadmap',         type: 'anchor' },
      { label: 'Quick Setup', href: 'quick-setup.html', type: 'page'   },
    ],
    ctaLabel: 'Get on dApp Store',
  },

  /* ── Footer (shared across all pages) ──────────────── */
  footer: {
    links: [
      { label: 'Features',    href: '#features',        type: 'anchor' },
      { label: 'Use Cases',   href: '#usecases',        type: 'anchor' },
      { label: 'Roadmap',     href: '#roadmap',         type: 'anchor' },
      { label: 'Quick Setup', href: 'quick-setup.html', type: 'page'   },
      { label: 'Copyright',   href: 'copyright.html',   type: 'page'   },
      { label: 'Privacy',     href: 'privacy.html',     type: 'page'   },
    ],
  },

  /* ── Hero Section ────────────────────────────────────── */
  hero: {
    tag: 'Built for Solana Seeker',
    titleLine1: 'The AI Agent Layer',
    titleLine2: 'for Solana Seeker',   // rendered with gradient
    description: 'SeekerClaw turns your Seeker phone into an autonomous AI agent — one that lives on your device, monitors your wallet, controls your phone, and connects via Telegram for real-time updates. 24/7.',
    ctaPrimary: 'Get on dApp Store',
    ctaSecondary: 'Quick Setup',
    ctaSecondaryHref: 'quick-setup.html',
  },

  /* ── Stats ───────────────────────────────────────────── */
  stats: [
    { value: 150000, suffix: '+', label: 'Seeker Devices' },
    { value: 25,     suffix: '+', label: 'Built-in Tools' },
    { value: 68,     suffix: '+',  label: 'Commits Shipped' },
    { value: '24/7', suffix: '',  label: 'Autonomous Agent' },
  ],

  /* ── Features ────────────────────────────────────────── */
  features: {
    tag: 'Capabilities',
    title: 'What SeekerClaw Does',
    description: 'A full-stack AI agent running natively on the most crypto-native phone in the world.',
    items: [
      {
        icon: 'clock',
        title: 'Solana Wallet Integration',
        desc: 'Check SOL & SPL token balances, send transactions via Seed Vault, and monitor your wallet history — all secured by hardware.',
      },
      {
        icon: 'brain',
        title: 'Autonomous AI Agent',
        desc: 'Powered by frontier LLMs with ranked memory search, SQL.js indexed recall, customizable personality, and cron-based automation that runs around the clock.',
      },
      {
        icon: 'chat',
        title: 'Social & Messaging',
        desc: 'Telegram integration with reactions, blockquotes, and HTML formatting. Send SMS, make calls, manage contacts — your agent reports back in real time.',
      },
      {
        icon: 'phone',
        title: 'Deep Device Control',
        desc: 'GPS location, app launching, clipboard, battery monitoring, text-to-speech — full native control of your Seeker phone.',
      },
      {
        icon: 'globe',
        title: 'Web Intelligence',
        desc: 'Multi-provider web search, markdown page extraction with caching, crypto prices, news, weather, and deep research — all with smart retry and error resilience.',
      },
      {
        icon: 'tool',
        title: 'Modular Skill System',
        desc: '25+ built-in tools with per-session analytics, usage tracking, and error rate monitoring. Easily extensible — add new skills without touching core code.',
      },
    ],
  },

  /* ── How It Works ───────────────────────────────────── */
  howItWorks: {
    tag: 'Get Started',
    title: 'How It Works',
    steps: [
      { number: '01', title: 'Install SeekerClaw', desc: 'Download from the dApp Store onto your Solana Seeker phone.' },
      { number: '02', title: 'Connect Wallet + Telegram', desc: 'Link your Seed Vault wallet and Telegram account in seconds.' },
      { number: '03', title: 'Your Agent Goes Live', desc: 'SeekerClaw runs 24/7 — monitoring, alerting, and acting autonomously.' },
    ],
  },

  /* ── Use Cases ───────────────────────────────────────── */
  useCases: {
    tag: 'Real-World Scenarios',
    title: 'What Seeker Owners Are Doing',
    description: 'From portfolio monitoring to DeFi research — SeekerClaw handles it all autonomously.',
    items: [
      {
        icon: 'eye',
        title: 'Wallet Watcher',
        messages: [
          '"Alert me on Telegram when my SOL balance drops below 5"',
          '"Check my portfolio every morning and send me a summary"',
        ],
      },
      {
        icon: 'trending-up',
        title: 'DeFi Assistant',
        messages: [
          '"What\'s the current price of SOL, JUP, and BONK?"',
          '"Research the latest Solana DeFi protocols and summarize"',
        ],
      },
      {
        icon: 'bell',
        title: 'Onchain Notifications',
        messages: [
          'Agent monitors your wallet and sends Telegram alerts for incoming/outgoing transactions.',
        ],
      },
      {
        icon: 'calendar',
        title: 'Crypto Calendar',
        messages: [
          '"Remind me about the Jupiter airdrop claim on March 15th"',
          '"Every Friday at 6pm, show me my weekly portfolio performance"',
        ],
      },
      {
        icon: 'map-pin',
        title: 'Travel + Crypto',
        messages: [
          'Agent knows your GPS location, finds local crypto-friendly spots, converts prices, and can send SOL to a friend.',
        ],
      },
      {
        icon: 'share',
        title: 'Social + Web3',
        messages: [
          '"Text my friend that I just sent them 2 SOL"',
          '"Search the web for the latest Solana Mobile news"',
        ],
      },
    ],
  },

  /* ── Comparison Table ────────────────────────────────── */
  comparison: {
    tag: 'The Difference',
    title: 'Why SeekerClaw is Different',
    description: 'No other AI agent runs natively on a crypto phone with hardware wallet integration, device control, and messaging — all at once.',
    headers: ['Feature', 'Regular AI Apps', 'SeekerClaw on Seeker'],
    rows: [
      ['Runs on device',           'Cloud only',  '\u2713 Native on Seeker'],
      ['Wallet access',            '\u2717',      '\u2713 Via Seed Vault'],
      ['Ranked memory search',     '\u2717',      '\u2713 SQL.js indexed recall'],
      ['Controls your phone',      '\u2717',      '\u2713 Calls, SMS, apps, GPS'],
      ['Messaging + reactions',    '\u2717',      '\u2713 Telegram with full formatting'],
      ['Crypto-native',            '\u2717',      '\u2713 Solana-first'],
      ['Cron scheduling',          '\u2717',      '\u2713 Natural language + recurring'],
      ['Usage analytics',          '\u2717',      '\u2713 Per-session token tracking'],
      ['Error resilience',         '\u2717',      '\u2713 Auto-retry + graceful fallback'],
      ['Hardware wallet security', '\u2717',      '\u2713 Seed Vault signing'],
    ],
  },

  /* ── Roadmap ─────────────────────────────────────────── */
  roadmap: {
    tag: 'What\'s Coming',
    title: 'Roadmap',
    columns: [
      {
        phase: 'now',
        label: 'Shipped ✅',
        items: [
          'Solana wallet (balance, transactions, history)',
          'Telegram with reactions & blockquotes',
          'Full Android device control (12 bridge tools)',
          'SQL.js ranked memory search & indexing',
          '25+ built-in tools with analytics',
          'Cron scheduling (natural language + recurring)',
          'Multi-provider web search & markdown fetch',
          'Per-session usage tracking & error resilience',
          'OpenClaw v2026.2.12 parity (4 sprints shipped)',
        ],
      },
      {
        phase: 'next',
        label: 'Next',
        items: [
          'Transaction monitoring & smart alerts',
          'X, Discord & WhatsApp integration',
          'SPL token sends & swaps',
          'DeFi position tracking',
          'Vector embeddings for semantic memory',
          'Media attachments & inline keyboards',
        ],
      },
      {
        phase: 'future',
        label: 'Future',
        items: [
          'Multi-agent coordination',
          'Community skill marketplace',
          'Multi-chain support',
          'Vision — agent sees your camera',
          'Agent-to-agent economy on Solana',
          'DePIN & IoT device control',
        ],
      },
    ],
  },

  /* ── Vision ──────────────────────────────────────────── */
  vision: {
    title: 'The Vision',
    text: 'Every Seeker owner gets a personal AI agent that lives on their phone 24/7, monitors their wallet, keeps them informed via Telegram — and gets smarter every day.',
    taglineHtml: 'SeekerClaw is how Solana Seeker becomes the first true <strong>AI + Crypto phone</strong>.',
  },

  /* ── Terminal Mock (hero phone) ──────────────────────── */
  terminal: [
    { code: '<span class="c-purple">agent</span>.<span class="c-green">start</span>()' },
    { code: '<span class="c-muted">// checking SOL balance...</span>' },
    { code: '<span class="c-cyan">\u2192</span> <span class="c-green">12.45 SOL</span> <span class="c-muted">($2,847.50)</span>' },
    { code: '<span class="c-muted">// monitoring wallet...</span>' },
    { code: '<span class="c-cyan">\u2192</span> telegram.<span class="c-green">send</span>(<span class="c-purple">"Portfolio up 8%"</span>)' },
    { code: '<span class="c-green">\u2713</span> Alert delivered' },
  ],
};
