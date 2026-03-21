export const siteConfig = {
  brand: {
    name: 'SeekerClaw',
    tagline: 'Your phone. Your agent.',
    footer: 'Built for Seeker. Powered by Solana.',
    logo: '/assets/logo.svg',
  },

  links: {
    dappStore: 'solanadappstore://details?id=com.seekerclaw.app',
    github: 'https://github.com/sepivip/SeekerClaw',
    x: 'https://x.com/SeekerClaw',
    telegram: 'https://t.me/seekerclaw',
    openclaw: 'https://github.com/openclaw/openclaw',
    apk: 'https://github.com/sepivip/SeekerClaw/releases/latest',
    productHunt: 'https://www.producthunt.com/products/seekerclaw',
    domain: 'https://seekerclaw.xyz',
  },

  nav: {
    anchors: [
      { label: 'Features', href: '#features' },
      { label: 'Use Cases', href: '#usecases' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
    pages: [
      { label: 'Quick Setup', href: '/setup.html' },
      { label: 'Partner Skills', href: '/partner-skills.html' },
      { label: 'Skill Creator', href: '/skill-creator.html' },
    ],
  },

  hero: {
    tag: 'Built for Solana Seeker',
    titleLine1: 'The AI Agent Layer',
    titleLine2: 'for Solana Seeker',
    description:
      'SeekerClaw turns your Seeker phone into an autonomous AI agent. Monitor your wallet, trade on Jupiter, get Telegram alerts, control your device — all running 24/7 on your phone.',
    ctaPrimary: 'Get on dApp Store',
    ctaGithub: 'GitHub',
    ctaApk: 'Download APK',
    ctaSetup: 'Quick Setup',
    screenshots: [
      { src: '/assets/hero_scr1.png', alt: 'SeekerClaw Home — agent dashboard' },
      { src: '/assets/hero_scr2.png', alt: 'SeekerClaw Console — system logs' },
      { src: '/assets/hero_scr3.png', alt: 'SeekerClaw Skills — agent tools' },
      { src: '/assets/hero_scr4.png', alt: 'SeekerClaw Settings — configuration' },
    ],
  },

  stats: [
    { value: 200000, suffix: '+', label: 'Seeker Devices' },
    { value: 56, suffix: '+', label: 'Built-in Tools' },
    { value: 255, suffix: '+', label: 'PRs Shipped' },
    { value: '24/7', suffix: '', label: 'Autonomous Agent' },
  ] as const,

  features: {
    tag: 'Capabilities',
    title: 'What SeekerClaw Does',
    description: 'A full-stack AI agent running natively on the most crypto-native phone in the world.',
    items: [
      {
        icon: 'Brain' as const,
        title: 'Autonomous AI Agent',
        desc: 'Powered by Claude or OpenAI (multi-provider) with persistent memory, customizable personality, and scheduled automation running 24/7. Self-aware — knows its own capabilities, diagnoses its own issues, and tells you what went wrong.',
      },
      {
        icon: 'Clock' as const,
        title: 'Solana Wallet Integration',
        desc: 'Check SOL & SPL token balances, send transactions, swap tokens via Jupiter, create limit orders and DCA positions — all secured by Seed Vault hardware.',
      },
      {
        icon: 'MessageCircle' as const,
        title: 'Social & Messaging',
        desc: 'Telegram integration with reactions, file sharing, and vision analysis. Send SMS, make calls, manage contacts — your agent handles it all.',
      },
      {
        icon: 'Smartphone' as const,
        title: 'Deep Device Control',
        desc: 'GPS location, camera with AI vision, app launching, clipboard, battery monitoring, text-to-speech — full native control of your Seeker.',
      },
      {
        icon: 'Globe' as const,
        title: 'Web Intelligence',
        desc: 'Real-time web search, page reading, crypto prices, news, weather, and deep research on any topic — delivered to your chat.',
      },
      {
        icon: 'Wrench' as const,
        title: 'Modular Skill System',
        desc: '35 built-in skills: crypto prices, calorie tracking, news briefings, reminders, research, and more. Add custom skills without touching code.',
      },
    ],
  },

  howItWorks: {
    tag: 'Get Started',
    title: 'How It Works',
    steps: [
      { number: '01', title: 'Install SeekerClaw', desc: 'Download from the dApp Store onto your Solana Seeker phone.' },
      { number: '02', title: 'Connect Telegram & AI', desc: 'Add your Telegram bot token and AI provider key — takes under a minute.' },
      { number: '03', title: 'Your Claw Goes Live', desc: 'SeekerClaw runs 24/7 — monitoring, alerting, and acting autonomously.' },
    ],
  },

  selfAware: {
    tag: 'Self-Aware Agent',
    title: 'An Agent That Knows Itself',
    description: 'SeekerClaw scores 100% on SAB (Self-Awareness Benchmark) — 36 audit points across knowledge and diagnostics.',
    cards: [
      { title: 'Knows what it can do', desc: 'Your agent understands its own tools, limits, and configuration. Ask it anything about itself and it answers accurately.' },
      { title: 'Diagnoses its own problems', desc: 'When something breaks, it checks logs, reads health files, and pinpoints the issue — across Telegram, wallet, memory, scheduling, and device control.' },
      { title: "Tells you what's wrong", desc: 'No silent failures. If the API is down, a permission is missing, or a tool times out — your agent explains what happened and what to do next.' },
    ],
  },

  useCases: {
    tag: 'Real-World Scenarios',
    title: 'What Seeker Owners Are Doing',
    description: 'From portfolio monitoring to DeFi research — SeekerClaw handles it all autonomously.',
    items: [
      {
        icon: 'Eye' as const,
        title: 'Wallet Watcher',
        messages: [
          '"Alert me on Telegram when my SOL balance drops below 5"',
          '"Check my portfolio every morning and send me a summary"',
        ],
      },
      {
        icon: 'TrendingUp' as const,
        title: 'DeFi Assistant',
        messages: [
          '"What\'s the current price of SOL, JUP, and BONK?"',
          '"Swap 1 SOL to USDC with less than 1% slippage"',
        ],
      },
      {
        icon: 'Bell' as const,
        title: 'Onchain Notifications',
        messages: [
          'Agent monitors your wallet and sends alerts for incoming/outgoing transactions.',
        ],
      },
      {
        icon: 'Home' as const,
        title: 'Smart Home',
        messages: [
          '"Turn off the outdoor lights"',
          '"Set heating to 23 degrees"',
        ],
      },
      {
        icon: 'Terminal' as const,
        title: 'Shell & DevOps',
        messages: [
          '"Check disk space and clean up old files"',
          '"Curl this API endpoint and summarize the JSON response"',
        ],
      },
      {
        icon: 'Globe' as const,
        title: 'Web Research',
        messages: [
          '"Search the web for the latest Solana Mobile news"',
          '"Fetch this article and give me a 3-bullet summary"',
        ],
      },
    ],
  },

  comparison: {
    tag: 'The Difference',
    title: 'Why SeekerClaw is Different',
    description: 'No other AI agent runs natively on a crypto phone with hardware wallet integration, shell access, and messaging — all at once.',
    headers: ['Feature', 'Regular AI Apps', 'SeekerClaw on Seeker'],
    rows: [
      ['Runs on device', 'Cloud only', '✓ Native on Seeker'],
      ['Wallet access', '✗', '✓ Via Seed Vault'],
      ['Persistent memory', '✗', '✓ Learns and remembers'],
      ['Shell access', '✗', '✓ 33 Unix commands + curl'],
      ['Messaging + reactions', '✗', '✓ Telegram with full formatting'],
      ['Usage analytics', '✗', '✓ Per-session token tracking'],
      ['Crypto-native', '✗', '✓ Solana-first'],
      ['Cron scheduling', '✗', '✓ Natural language + recurring'],
      ['Self-diagnosis', '✗', "✓ Agent knows when something's wrong"],
      ['Error resilience', '✗', '✓ Auto-retry + graceful fallback'],
      ['Hardware wallet security', '✗', '✓ Seed Vault signing'],
    ],
  },

  roadmap: {
    tag: "What's Coming",
    title: 'Roadmap',
    columns: [
      {
        phase: 'now' as const,
        label: 'Shipped',
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
          'Multi-provider support (Claude + OpenAI)',
          'Self-aware agent: 100% SAB score (36/36)',
          'dApp Store listing',
          'Open-source: MIT license, CI/CD, community ready',
        ],
      },
      {
        phase: 'next' as const,
        label: 'Next',
        items: [
          'Transaction monitoring & smart alerts',
          'Vector embeddings for semantic memory',
          'Community skill marketplace',
        ],
      },
      {
        phase: 'future' as const,
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

  vision: {
    title: 'The Vision',
    text: 'Every Seeker owner gets a personal AI agent that lives on their phone 24/7, monitors their wallet, keeps them informed via Telegram — and gets smarter every day.',
    tagline: 'SeekerClaw is how Solana Seeker becomes the first true',
    taglineBold: 'AI + Crypto phone',
  },

  cta: {
    tag: 'Get Started',
    title: 'Set Up Your Agent in Under a Minute',
    description: 'Use our Quick Setup tool to generate a config QR code, then scan it with SeekerClaw to import your credentials and defaults instantly.',
    buttonLabel: 'Quick Setup',
  },

  footer: {
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '#features' },
          { label: 'Use Cases', href: '#usecases' },
          { label: 'Roadmap', href: '#roadmap' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Quick Setup', href: '/setup.html' },
          { label: 'Partner Skills', href: '/partner-skills.html' },
          { label: 'Skill Creator', href: '/skill-creator.html' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Copyright', href: '/copyright.html' },
          { label: 'License', href: '/license.html' },
          { label: 'Privacy', href: '/privacy.html' },
        ],
      },
    ],
  },
} as const
