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
      { label: 'Quick Setup', href: 'setup.html', type: 'page'   },
      { label: 'Partner Skills', href: 'partner-skills.html', type: 'page' },
      { label: 'Skill Creator', href: 'skill-creator.html', type: 'page' },
      { label: 'Terms',       href: 'terms.html',       type: 'page'   },
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
    description: "SeekerClaw turns your phone into a 24/7 helper powered by the world's best AI — Claude, GPT, Grok, and more. Text it on Telegram or Discord. It thinks, remembers, watches over your stuff, and quietly handles the boring parts of your day.",
    ctaPrimary: 'Get it on dApp Store',
    ctaSecondary: 'Quick Setup',
    ctaSecondaryHref: 'setup.html',
  },

  /* ── Stats ───────────────────────────────────────────── */
  stats: [
    { value: 200000, suffix: '+', label: 'Seeker Devices' },
    { value: 60,     suffix: '+', label: 'Tools it can use' },
    { value: 22,     suffix: '+', label: 'Skills, and you can add more' },
    { value: '24/7', suffix: '',  label: 'Autonomous Agent' },
  ],

  /* ── Features ────────────────────────────────────────── */
  features: {
    tag: 'Capabilities',
    title: 'What SeekerClaw Does',
    description: 'A full-stack AI agent running natively on the most crypto-native phone in the world.',
    items: [
      {
        emoji: '\uD83E\uDD16',
        title: 'The best AI on earth',
        desc: 'Claude, GPT, Grok, and 100+ more via OpenRouter. Bring an API key or your Claude, ChatGPT or Grok subscription.',
      },
      {
        emoji: '\uD83D\uDCAC',
        title: 'Chat wherever you already are',
        desc: 'Telegram and Discord, with reactions, file sharing, and photo analysis.',
      },
      {
        emoji: '\uD83D\uDCF1',
        title: 'Full phone powers',
        desc: 'GPS, camera, contacts, apps, clipboard, text-to-speech, plus texts and calls you confirm before they go out.',
      },
      {
        emoji: '\uD83C\uDF10',
        title: 'The web, read for you',
        desc: 'Search, page reading, research, news, weather, crypto prices.',
      },
      {
        emoji: '\uD83E\uDDE9',
        title: '22 skills, and room for yours',
        desc: 'Calorie tracker, network security audit, news briefings, reminders, research, partner skills like Home Assistant, and your own.',
      },
      {
        emoji: '\uD83D\uDCB0',
        title: 'Crypto-native',
        desc: 'Solana wallet, Jupiter swaps, DCA, limit orders, NFT tracking, secured by Seed Vault. Plus an optional burner wallet the agent can spend from on its own, within caps you set.',
      },
    ],
  },

  /* ── How It Works ───────────────────────────────────── */
  howItWorks: {
    tag: 'Get Started',
    title: 'How It Works',
    steps: [
      { number: '01', title: 'Install on your phone', desc: 'Download from Google Play or the dApp Store onto your Seeker — or any Android phone.' },
      { number: '02', title: 'Connect Telegram or Discord', desc: 'Link your chat app and pick your AI. Takes under a minute.' },
      { number: '03', title: 'Start chatting. It\u2019s live.', desc: 'That\u2019s it. Your helper is running 24/7 — text it anytime.' },
    ],
  },

  /* ── Use Cases ───────────────────────────────────────── */
  useCases: {
    tag: 'Real-World Scenarios',
    title: 'What Seeker Owners Are Doing',
    description: 'From portfolio monitoring to DeFi research — SeekerClaw handles it all autonomously.',
    items: [
      {
        emoji: '\uD83D\uDC40',
        title: 'Wallet Watcher',
        messages: [
          '"Alert me on Telegram when my SOL balance drops below 5"',
          '"Check my portfolio every morning and send me a summary"',
        ],
      },
      {
        emoji: '\uD83D\uDCB9',
        title: 'DeFi Trading',
        messages: [
          '"What\'s the current price of SOL, JUP, and BONK?"',
          '"Swap 1 SOL to USDC with less than 1% slippage"',
        ],
      },
      {
        emoji: '\uD83D\uDEE1\uFE0F',
        title: 'Token Safety',
        messages: [
          '"Is this token a rug?"',
          '"Alert me on new inflows to my wallet every 15 min"',
        ],
      },
      {
        emoji: '\uD83C\uDFE0',
        title: 'Smart Home',
        messages: [
          '"Turn off the outdoor lights"',
          '"Set heating to 23 degrees"',
        ],
      },
      {
        emoji: '\u23F0',
        title: 'Scheduled Briefings',
        messages: [
          '"Every morning: portfolio + SOL news + BTC price"',
          '"Every evening at 8, tell me tomorrow\'s weather"',
        ],
      },
      {
        emoji: '\uD83C\uDF10',
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
    title: 'Regular AI Services vs SeekerClaw',
    description: 'The AI you already know — but running on your phone, 24/7, with real-world powers.',
    headers: ['Feature', 'Regular AI Services', 'SeekerClaw'],
    rows: [
      ['Runs on your phone',       '\u2717 Cloud only',       '\u2713 Runs on device'],
      ['Persistent memory',        '\u2717 Session only',     '\u2713 Learns and remembers'],
      ['Runs in background',       '\u2717',                  '\u2713 24/7, always on'],
      ['Can text you first',       '\u2717',                  '\u2713 Proactive alerts + cron'],
      ['Messaging + reactions',    '\u2717',                  '\u2713 Telegram + Discord'],
      ['Control your phone',       '\u2717',                  '\u2713 SMS, calls, GPS, camera, apps'],
      ['Self-diagnosis',           '\u2717',                  '\u2713 Knows when something\u2019s wrong'],
      ['Wallet access',            '\u2717',                  '\u2713 Solana via Seed Vault'],
      ['Pays for paid APIs',       '\u2717',                  '\u2713 USDC via x402, within caps you set'],
      ['Crypto-native',            '\u2717',                  '\u2713 Swaps, DCA, limit orders, NFTs'],
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
          'Android device bridge (GPS, camera, apps, contacts, SMS and calls you confirm)',
          'Solana wallet (balance, send, swap, limit orders, DCA)',
          'Telegram with reactions, file sharing, and AI vision',
          '64 built-in tools with analytics',
          'Natural language cron scheduling',
          'Multi-provider web search + page reading',
          'MCP server support for extensible tools',
          '22 bundled skills including CalClaw calorie tracker, plus partner skills',
          'Skill marketplace: export as .md or ZIP, import custom skills',
          'NFT holdings viewer (Helius DAS API)',
          'Cron agent turns — scheduled jobs run full AI conversations',
          'Session memory — agent remembers context across restarts',
          'Five AI providers: Claude, OpenAI, xAI Grok, OpenRouter, any OpenAI-compatible gateway',
          'Sign in with a Claude, ChatGPT or Grok subscription',
          'Discord as a second chat channel',
          'Burner wallet: capped autonomous trading and x402 USDC payments',
          'Self-aware agent, checked by SAB audits',
          'Google Play and Solana dApp Store listings',
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
          'WhatsApp & Slack channels',
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
    text: 'Every phone owner gets a brilliant helper that lives in their pocket, thinks with them, and quietly handles the boring parts of life. The first and best one runs on Solana Seeker.',
    taglineHtml: 'SeekerClaw is <strong>AgentOS for your Android phone</strong>.',
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
