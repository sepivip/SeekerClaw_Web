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
    waitlistForm: 'https://formspree.io/f/YOUR_FORM_ID', // Formspree endpoint
  },

  /* ── Hero Section ────────────────────────────────────── */
  hero: {
    tag: 'Built for Solana Seeker',
    titleLine1: 'The AI Agent Layer',
    titleLine2: 'for Solana Seeker',   // rendered with gradient
    description: 'SeekerClaw turns your Seeker phone into an autonomous AI agent — one that lives on your device, manages your crypto, controls your phone, and keeps you updated on X. 24/7.',
    ctaPrimary: 'Get on dApp Store',
    ctaSecondary: 'Join Waitlist',
  },

  /* ── Stats ───────────────────────────────────────────── */
  stats: [
    { value: 150000, suffix: '+', label: 'Seeker Devices' },
    { value: 18,     suffix: '+', label: 'Built-in Skills' },
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
        desc: 'Powered by frontier LLMs with persistent memory, customizable personality, and scheduled automation that runs around the clock.',
      },
      {
        icon: 'chat',
        title: 'Social & Messaging',
        desc: 'Full X integration for two-way agent communication. Send SMS, make calls, manage contacts — your agent reports back via DMs and posts.',
      },
      {
        icon: 'phone',
        title: 'Deep Device Control',
        desc: 'GPS location, app launching, clipboard, battery monitoring, text-to-speech — full native control of your Seeker phone.',
      },
      {
        icon: 'globe',
        title: 'Web Intelligence',
        desc: 'Real-time web search, page reading, crypto prices, news, weather, and deep research on any topic — delivered to your chat.',
      },
      {
        icon: 'tool',
        title: 'Modular Skill System',
        desc: '18+ built-in skills: crypto prices, news, todos, reminders, GitHub, translations. Easily extensible — add new skills without touching core code.',
      },
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
          '"Alert me on X when my SOL balance drops below 5"',
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
          'Agent monitors your wallet and sends X alerts for incoming/outgoing transactions.',
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
          '"Search Twitter for the latest Solana Mobile news"',
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
      ['Persistent memory',        '\u2717',      '\u2713 Remembers everything'],
      ['Controls your phone',      '\u2717',      '\u2713 Calls, SMS, apps, GPS'],
      ['Messaging integration',    '\u2717',      '\u2713 X (more coming)'],
      ['Crypto-native',            '\u2717',      '\u2713 Solana-first'],
      ['Autonomous scheduling',    '\u2717',      '\u2713 Runs tasks 24/7'],
      ['Extensible skills',        '\u2717',      '\u2713 Modular system'],
      ['Hardware wallet security',  '\u2717',      '\u2713 Seed Vault signing'],
    ],
  },

  /* ── Roadmap ─────────────────────────────────────────── */
  roadmap: {
    tag: 'What\'s Coming',
    title: 'Roadmap',
    columns: [
      {
        phase: 'now',
        label: 'Now',
        items: [
          'Solana wallet (balance, transactions, history)',
          'X integration',
          'Full Android device control',
          'Persistent memory & scheduling',
          '18+ built-in skills',
        ],
      },
      {
        phase: 'next',
        label: 'Next',
        items: [
          'Transaction monitoring & smart alerts',
          'Discord & WhatsApp integration',
          'SPL token sends & swaps',
          'DeFi position tracking',
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
    text: 'Every Seeker owner gets a personal AI agent that lives on their phone 24/7, manages their crypto life, posts updates on X, joins Discord — and gets smarter every day.',
    taglineHtml: 'SeekerClaw is how Solana Seeker becomes the first true <strong>AI + Crypto phone</strong>.',
  },

  /* ── Waitlist ────────────────────────────────────────── */
  waitlist: {
    tag: 'Be First',
    title: 'Get Early Access',
    description: 'Join the waitlist and be the first to turn your Seeker into an autonomous AI agent.',
    placeholder: 'your@email.com',
    buttonText: 'Join Waitlist',
    successMsg: "You're on the list! We'll be in touch.",
    errorMsg: 'Something went wrong. Please try again or reach out directly.',
  },

  /* ── Terminal Mock (hero phone) ──────────────────────── */
  terminal: [
    { code: '<span class="c-purple">agent</span>.<span class="c-green">start</span>()' },
    { code: '<span class="c-muted">// checking SOL balance...</span>' },
    { code: '<span class="c-cyan">\u2192</span> <span class="c-green">12.45 SOL</span> <span class="c-muted">($2,847.50)</span>' },
    { code: '<span class="c-muted">// monitoring wallet...</span>' },
    { code: '<span class="c-cyan">\u2192</span> x.<span class="c-green">post</span>(<span class="c-purple">"Portfolio up 8%"</span>)' },
    { code: '<span class="c-green">\u2713</span> Message sent to @user' },
  ],
};
