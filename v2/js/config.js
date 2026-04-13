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
    tagline: 'Your phone. Your agent.',
    footer: 'Built for Seeker. Powered by Solana.',
    logo: 'assets/logo.svg',          // path to logo image (set '' to hide)
  },

  /* ── Links ───────────────────────────────────────────── */
  links: {
    dappStore: 'solanadappstore://details?id=com.seekerclaw.app', // dApp Store deep link
    github: 'https://github.com/sepivip/SeekerClaw', // GitHub repo URL
    x: 'https://x.com/SeekerClaw',    // X (Twitter) profile
    telegram: 'https://t.me/seekerclaw', // Telegram channel
    openclaw: 'https://github.com/openclaw/openclaw', // OpenClaw framework
    googlePlay: 'https://play.google.com/store/apps/details?id=com.seekerclaw.app&pcampaignid=web_share', // Google Play Store
  },

  /* ── Navigation (shared across all pages) ──────────── */
  nav: {
    links: [
      { label: 'Features',    href: '#features',        type: 'anchor' },
      { label: 'Use Cases',   href: '#usecases',        type: 'anchor' },
      { label: 'Roadmap',     href: '#roadmap',         type: 'anchor' },
      { label: 'Quick Setup', href: 'setup.html', type: 'page'   },
      { label: 'Partner Skills', href: 'partner-skills.html', type: 'page' },
      { label: 'Skill Creator', href: 'skill-creator.html', type: 'page' },
    ],
    ctaLabel: 'GitHub',
  },

  /* ── Footer (shared across all pages) ──────────────── */
  footer: {
    links: [
      { label: 'Features',    href: '#features',        type: 'anchor' },
      { label: 'Use Cases',   href: '#usecases',        type: 'anchor' },
      { label: 'Roadmap',     href: '#roadmap',         type: 'anchor' },
      { label: 'Quick Setup', href: 'setup.html', type: 'page'   },
      { label: 'Partner Skills', href: 'partner-skills.html', type: 'page' },
      { label: 'Skill Creator', href: 'skill-creator.html', type: 'page' },
      { label: 'Copyright',   href: 'copyright.html',   type: 'page'   },
      { label: 'License',     href: 'license.html',     type: 'page'   },
      { label: 'Privacy',     href: 'privacy.html',     type: 'page'   },
    ],
  },

  /* ── Hero Section ────────────────────────────────────── */
  hero: {
    tag: '🦞📲 AgentOS for your Android phone',
    titleLine1: 'Like having someone brilliant',
    titleLine2: 'in your pocket.',   // rendered with gradient
    description: "SeekerClaw turns your phone into a 24/7 helper powered by the world's best AI — Claude, GPT, and more. Text it on Telegram or Discord. It thinks, remembers, watches over your stuff, and quietly handles the boring parts of your day.",
    ctaPrimary: 'Get it on dApp Store',
    ctaSecondary: 'Quick Setup',
    ctaSecondaryHref: 'setup.html',
  },

  /* ── Stats ───────────────────────────────────────────── */
  stats: [
    { value: 200000, suffix: '+', label: 'Seeker Devices' },
    { value: 56,     suffix: '+', label: 'Built-in Tools' },
    { value: 255,    suffix: '+', label: 'PRs Shipped' },
    { value: '24/7', suffix: '',  label: 'Autonomous Agent' },
  ],

  /* ── Features ────────────────────────────────────────── */
  features: {
    tag: 'Capabilities',
    title: 'What SeekerClaw Does',
    description: 'A full-stack AI agent running natively on the most crypto-native phone in the world.',
    items: [
      {
        icon: 'brain',
        title: 'Autonomous AI Agent',
        desc: 'Powered by Claude or OpenAI (multi-provider) with persistent memory, customizable personality, and scheduled automation running 24/7. Self-aware — knows its own capabilities, diagnoses its own issues, and tells you what went wrong.',
      },
      {
        icon: 'clock',
        title: 'Solana Wallet Integration',
        desc: 'Check SOL & SPL token balances, send transactions, swap tokens via Jupiter, create limit orders and DCA positions — all secured by Seed Vault hardware.',
      },
      {
        icon: 'chat',
        title: 'Social & Messaging',
        desc: 'Telegram integration with reactions, file sharing, and vision analysis. Send SMS, make calls, manage contacts — your agent handles it all.',
      },
      {
        icon: 'terminal',
        title: 'Deep Device Control',
        desc: 'GPS location, camera with AI vision, app launching, clipboard, battery monitoring, text-to-speech — full native control of your Seeker.',
      },
      {
        icon: 'globe',
        title: 'Web Intelligence',
        desc: 'Real-time web search, page reading, crypto prices, news, weather, and deep research on any topic — delivered to your chat.',
      },
      {
        icon: 'tool',
        title: 'Modular Skill System',
        desc: '35 built-in skills: crypto prices, calorie tracking, news briefings, reminders, research, and more. Add custom skills without touching code.',
      },
    ],
  },

  /* ── How It Works ───────────────────────────────────── */
  howItWorks: {
    tag: 'Get Started',
    title: 'How It Works',
    steps: [
      { number: '01', title: 'Install SeekerClaw', desc: 'Download from the dApp Store onto your Solana Seeker phone.' },
      { number: '02', title: 'Connect Telegram & AI', desc: 'Add your Telegram bot token and AI provider key — takes under a minute.' },
      { number: '03', title: 'Your Claw Goes Live', desc: 'SeekerClaw runs 24/7 — monitoring, alerting, and acting autonomously.' },
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
          '"Swap 1 SOL to USDC with less than 1% slippage"',
        ],
      },
      {
        icon: 'bell',
        title: 'Onchain Notifications',
        messages: [
          'Agent monitors your wallet and sends alerts for incoming/outgoing transactions.',
        ],
      },
      {
        icon: 'home',
        title: 'Smart Home',
        messages: [
          '"Turn off the outdoor lights"',
          '"Set heating to 23 degrees"',
        ],
      },
      {
        icon: 'terminal',
        title: 'Shell & DevOps',
        messages: [
          '"Check disk space and clean up old files"',
          '"Curl this API endpoint and summarize the JSON response"',
        ],
      },
      {
        icon: 'globe',
        title: 'Web Research',
        messages: [
          '"Search the web for the latest Solana Mobile news"',
          '"Fetch this article and give me a 3-bullet summary"',
        ],
      },
    ],
  },

  /* ── Comparison Table ────────────────────────────────── */
  comparison: {
    tag: 'The Difference',
    title: 'Why SeekerClaw is Different',
    description: 'No other AI agent runs natively on a crypto phone with hardware wallet integration, shell access, and messaging — all at once.',
    headers: ['Feature', 'Regular AI Apps', 'SeekerClaw on Seeker'],
    rows: [
      ['Runs on device',           'Cloud only',  '\u2713 Native on Seeker'],
      ['Wallet access',            '\u2717',      '\u2713 Via Seed Vault'],
      ['Persistent memory',        '\u2717',      '\u2713 Learns and remembers'],
      ['Shell access',              '\u2717',      '\u2713 33 Unix commands + curl'],
      ['Messaging + reactions',    '\u2717',      '\u2713 Telegram with full formatting'],
      ['Usage analytics',          '\u2717',      '\u2713 Per-session token tracking'],
      ['Crypto-native',            '\u2717',      '\u2713 Solana-first'],
      ['Cron scheduling',          '\u2717',      '\u2713 Natural language + recurring'],
      ['Self-diagnosis',           '\u2717',      '\u2713 Agent knows when something\u2019s wrong and tells you'],
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
          'Persistent memory with ranked search',
          'Android device bridge (SMS, calls, GPS, camera, apps, contacts)',
          'Solana wallet (balance, send, swap, limit orders, DCA)',
          'Telegram with reactions, file sharing, and AI vision',
          '56 built-in tools with analytics',
          'Natural language cron scheduling',
          'Multi-provider web search + page reading',
          'MCP server support for extensible tools',
          '35 skills including CalClaw calorie tracker',
          'Skill marketplace: export as .md or ZIP, import custom skills',
          'NFT holdings viewer (Helius DAS API)',
          'Cron agent turns — scheduled jobs run full AI conversations',
          'Session memory — agent remembers context across restarts',
          'Multi-provider support (Claude + OpenAI)',
          'Self-aware agent: 100% SAB score (36/36 audit points)',
          'dApp Store listing',
          'Open-source: MIT license, CI/CD, community ready',
        ],
      },
      {
        phase: 'next',
        label: 'Next',
        items: [
          'Transaction monitoring & smart alerts',
          'Vector embeddings for semantic memory',
          'Community skill marketplace',
        ],
      },
      {
        phase: 'future',
        label: 'Future',
        items: [
          'Multi-agent coordination',
          'X, Discord & WhatsApp integration',
          'Multi-chain support',
          'DePIN & IoT device control',
          'Agent-to-agent economy on Solana',
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
