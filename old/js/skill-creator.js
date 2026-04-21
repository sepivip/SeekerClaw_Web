/* ═══════════════════════════════════════════════════════════
   SeekerClaw — Skill Creator
   ───────────────────────────────────────────────────────────
   3-mode interactive skill builder:
     1. Blank   — empty editor with live SKILL.md preview
     2. Template — pick from 13 real skills, pre-fills editor
     3. Claude CC Prompt — answer questions, get a prompt
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     TEMPLATE DATA (13 skills — full SKILL.md content)
     ══════════════════════════════════════════════════════════ */
  var TEMPLATES = [
    {
      emoji: '\u{1F4B0}', name: 'crypto-prices', cat: 'Crypto & DeFi',
      desc: 'Get real-time cryptocurrency prices and market data from CoinGecko (free, no API key)',
      content: '---\nname: crypto-prices\nversion: "1.0.0"\ndescription: "Get real-time cryptocurrency prices and market data from CoinGecko (free, no API key)"\nmetadata:\n  openclaw:\n    emoji: "\u{1F4B0}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Crypto Prices\n\nGet cryptocurrency prices using the free CoinGecko API.\n\n## When to Use\n\nUser asks about:\n- Crypto prices ("What\'s Bitcoin at?", "SOL price")\n- Market data ("Is ETH up or down?")\n- Multiple coins ("Price of BTC, ETH, and SOL")\n\n## API Endpoints\n\n### Get single coin price\n\n```javascript\nweb_fetch({\n  url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"\n})\n```\n\nResponse: `{"bitcoin":{"usd":45000}}`\n\n### Get multiple coins with 24h change\n\n```javascript\nweb_fetch({\n  url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"\n})\n```\n\n### Get detailed coin info\n\n```javascript\nweb_fetch({\n  url: "https://api.coingecko.com/api/v3/coins/bitcoin"\n})\n```\n\nReturns market cap, volume, all-time high, etc.\n\n## Coin ID Mapping\n\nCommon coins and their CoinGecko IDs:\n\n| Symbol | CoinGecko ID |\n|--------|-------------|\n| BTC | bitcoin |\n| ETH | ethereum |\n| SOL | solana |\n| USDC | usd-coin |\n| USDT | tether |\n| BNB | binancecoin |\n| XRP | ripple |\n| ADA | cardano |\n| DOGE | dogecoin |\n| AVAX | avalanche-2 |\n\nFor other coins, search: `https://api.coingecko.com/api/v3/search?query=COINNAME`\n\n## Response Format\n\nPresent prices clearly to the user:\n\n```\nBitcoin (BTC): $45,123.45 (+2.3% 24h)\nEthereum (ETH): $2,456.78 (-1.2% 24h)\nSolana (SOL): $98.76 (+5.4% 24h)\n```\n\n## Rate Limits\n\nCoinGecko free tier: 10-30 requests/minute. Don\'t spam requests.\nIf rate limited, wait 60 seconds before retrying.\n\n## Examples\n\n**User:** "What\'s the price of Bitcoin?"\n**Action:** Fetch BTC price, format nicely\n\n**User:** "How are BTC and ETH doing?"\n**Action:** Fetch both with 24h change, show comparison\n\n**User:** "Give me SOL market cap"\n**Action:** Use detailed endpoint for Solana, extract market_cap'
    },
    {
      emoji: '\u{1FA99}', name: 'solana-wallet', cat: 'Crypto & DeFi',
      desc: 'Check Solana wallet balance, transaction history, and send SOL with wallet approval',
      content: '---\nname: solana-wallet\nversion: "1.0.0"\ndescription: "Check Solana wallet balance, transaction history, and send SOL with wallet approval"\nmetadata:\n  openclaw:\n    emoji: "\u{1FA99}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Solana Wallet\n\nInteract with the user\'s Solana wallet connected via the SeekerClaw app.\n\n## When to Use\n\nUser asks about:\n- Wallet balance ("What\'s my SOL balance?", "How much crypto do I have?")\n- Token holdings ("Do I have any tokens?", "Show my wallet")\n- Transaction history ("Show my recent transactions")\n- Sending SOL ("Send 0.1 SOL to ...")\n- Wallet address ("What\'s my wallet address?")\n\n## Tools Available\n\n| Tool | Purpose |\n|------|--------|\n| `solana_address` | Get connected wallet address |\n| `solana_balance` | Get SOL + SPL token balances |\n| `solana_history` | Get recent transaction history |\n| `solana_send` | Send SOL (requires user + wallet approval) |\n\n## Usage\n\n### Check Balance\n\n```javascript\nsolana_balance()\n```\n\nResponse:\n```json\n{\n  "address": "7xKX...",\n  "sol": 2.5,\n  "tokens": [\n    { "mint": "EPjF...Dt1v", "amount": "100.0", "decimals": 6 }\n  ]\n}\n```\n\nFormat:\n```\n\u{1FA99} **Wallet Balance**\n\u{1F4B0} **SOL:** 2.5 SOL\n\u{1FA99} **USDC:** 100.0\n```\n\n### Send SOL\n\n**CRITICAL: Always confirm first!**\n\n```javascript\nsolana_send({ to: "RecipientAddress...", amount: 0.1 })\n```\n\n## Examples\n\n**User:** "What\'s my SOL balance?"\n**Action:** Call solana_balance, format nicely\n\n**User:** "Send 0.5 SOL to 9aE2..."\n**Action:** Show confirmation, wait for yes, then call solana_send'
    },
    {
      emoji: '\u{1F4F1}', name: 'solana-dapp', cat: 'Crypto & DeFi',
      desc: 'Discover, launch, and interact with Solana dApps on the Seeker device',
      content: '---\nname: solana-dapp\nversion: "1.0.0"\ndescription: "Discover, launch, and interact with Solana dApps on the Seeker device via the dApp Store and MWA"\nmetadata:\n  openclaw:\n    emoji: "\u{1F4F1}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Solana Seeker dApp\n\nDiscover, launch, and manage Solana dApps on the Solana Seeker device.\n\n## When to Use\n\nUser asks about:\n- Solana dApps ("What dApps do I have?")\n- dApp Store ("Find a swap app")\n- Launching dApps ("Open Jupiter")\n- DeFi on Seeker ("How do I swap tokens?")\n\n## Tools Available\n\n| Tool | Purpose |\n|------|--------|\n| `android_apps_list` | List installed apps |\n| `android_apps_launch` | Launch an app by package name |\n| `web_fetch` | Look up dApp info |\n| `solana_balance` | Check wallet balance |\n\n## Known dApp Package Names\n\n| App | Package | Category |\n|-----|---------|----------|\n| Phantom | `app.phantom` | Wallet |\n| Jupiter | `ag.jup.mobile` | DEX / Swap |\n| Tensor | `com.tensor.android` | NFT Marketplace |\n| Magic Eden | `io.magiceden.android` | NFT Marketplace |\n| Marinade | `finance.marinade.app` | Staking |\n\n## Usage\n\n### List installed dApps\n```javascript\nandroid_apps_list()\n```\n\n### Launch a dApp\n```javascript\nandroid_apps_launch({ package: "ag.jup.mobile" })\n```\n\n## Examples\n\n**User:** "Open Jupiter"\n**Action:** Launch ag.jup.mobile, guide user on swapping\n\n**User:** "What Solana apps do I have?"\n**Action:** List apps, match against known dApp packages'
    },
    {
      emoji: '\u{1F50B}', name: 'device-status', cat: 'Device',
      desc: 'Check battery level, storage space, and device status',
      content: '---\nname: device-status\nversion: "1.0.0"\ndescription: "Check battery level, storage space, and device status"\nmetadata:\n  openclaw:\n    emoji: "\u{1F50B}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Device Status\n\nCheck device status including battery, storage, and more.\n\n## When to Use\n\nUser asks about:\n- Battery level ("How much battery do I have?")\n- Storage space ("How much space is left?")\n- Device info ("What\'s my phone status?")\n\n## Usage\n\n### Battery Status\n\n```javascript\nandroid_battery()\n```\n\nResponse:\n```json\n{ "level": 75, "isCharging": true, "chargeType": "usb" }\n```\n\nFormat: "\u{1F50B} **Battery:** 75% (charging via USB)"\n\n### Storage Status\n\n```javascript\nandroid_storage()\n```\n\nResponse:\n```json\n{ "totalFormatted": "120.00 GB", "availableFormatted": "42.00 GB" }\n```\n\nFormat: "\u{1F4BE} **Storage:** 42 GB available of 120 GB (65% used)"\n\n## Warnings\n\nIf battery < 20%: "\u26A0\uFE0F Battery is low. Consider charging soon."\nIf storage < 10%: "\u26A0\uFE0F Storage is almost full."\n\n## Examples\n\n**User:** "How much battery do I have?"\n**Action:** Call android_battery, format with emoji\n\n**User:** "Phone status?"\n**Action:** Call both android_battery and android_storage, combine'
    },
    {
      emoji: '\u{1F4CD}', name: 'location', cat: 'Device',
      desc: 'Get current GPS location and find nearby places',
      content: '---\nname: location\nversion: "1.0.0"\ndescription: "Get current GPS location and find nearby places"\nmetadata:\n  openclaw:\n    emoji: "\u{1F4CD}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Location\n\nGet current GPS location and find nearby places.\n\n## When to Use\n\nUser asks about:\n- Current location ("Where am I?")\n- Nearby places ("Find coffee shops near me")\n\n## Usage\n\n```javascript\nandroid_location()\n```\n\nResponse:\n```json\n{ "latitude": 37.7749, "longitude": -122.4194, "accuracy": 10.5 }\n```\n\n### Find Nearby Places\n\nAfter getting location:\n```javascript\nweb_search({ query: "coffee shops near 37.7749, -122.4194" })\n```\n\n## Response Format\n\n"\u{1F4CD} **Your Location**\nCoordinates: 37.7749, -122.4194\n[Open in Google Maps](https://maps.google.com/?q=37.7749,-122.4194)"\n\n## Examples\n\n**User:** "Where am I?"\n**Action:** Get GPS location, show coordinates + map link\n\n**User:** "Find pizza near me"\n**Action:** Get location, web search nearby, list results'
    },
    {
      emoji: '\u{1F50A}', name: 'speak', cat: 'Device',
      desc: 'Speak text out loud using device text-to-speech',
      content: '---\nname: speak\nversion: "1.0.0"\ndescription: "Speak text out loud using device text-to-speech"\nmetadata:\n  openclaw:\n    emoji: "\u{1F50A}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Speak (Text-to-Speech)\n\nSpeak text out loud using Android\'s built-in text-to-speech.\n\n## When to Use\n\nUser asks to:\n- Read something aloud ("Read this to me")\n- Speak a message ("Say hello")\n- Announce something ("Announce the time")\n\n## Usage\n\n```javascript\nandroid_tts({ text: "Hello! How can I help you today?" })\n```\n\nOptional: speed (0.5\u20132.0, default 1.0), pitch (0.5\u20132.0, default 1.0)\n\n## Response Format\n\nAfter speaking, confirm: "\u{1F50A} *Speaking:* [summary]"\n\n## Examples\n\n**User:** "What time is it? Tell me out loud"\n**Action:** Get time, speak via android_tts\n\n**User:** "Read me the weather"\n**Action:** Fetch weather, then speak summary'
    },
    {
      emoji: '\u{1F4DE}', name: 'phone-call', cat: 'Device',
      desc: 'Make phone calls to contacts or phone numbers',
      content: '---\nname: phone-call\nversion: "1.0.0"\ndescription: "Make phone calls to contacts or phone numbers"\nmetadata:\n  openclaw:\n    emoji: "\u{1F4DE}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Phone Call\n\nMake phone calls using the Android call tool.\n\n## When to Use\n\nUser says: "Call Mom", "Phone John", "Dial 555-1234"\n\n## CRITICAL: Always confirm before calling!\n\n## Usage\n\n### Step 1: Find contact\n```javascript\nandroid_contacts_search({ query: "Mom" })\n```\n\n### Step 2: Confirm with user\n"\u{1F4DE} Call **Mom** (+1 555-123-4567)? Say \'yes\' to call."\n\n### Step 3: Make call\n```javascript\nandroid_call({ phone: "+15551234567" })\n```\n\n## Examples\n\n**User:** "Call Mom"\n**Action:** Search contacts, confirm, then dial\n\n**User:** "Call the nearest pizza place"\n**Action:** Web search for number, confirm, then dial'
    },
    {
      emoji: '\u{1F4AC}', name: 'sms', cat: 'Device',
      desc: 'Send SMS text messages to contacts or phone numbers',
      content: '---\nname: sms\nversion: "1.0.0"\ndescription: "Send SMS text messages to contacts or phone numbers"\nmetadata:\n  openclaw:\n    emoji: "\u{1F4AC}"\n    requires:\n      bins: []\n      env: []\n---\n\n# SMS\n\nSend text messages using the Android SMS tool.\n\n## When to Use\n\nUser says: "Text John that I\'ll be late", "Send SMS to 555-1234", "Message Mom happy birthday"\n\n## CRITICAL: Always confirm message content before sending!\n\n## Usage\n\n### Step 1: Find contact\n```javascript\nandroid_contacts_search({ query: "John" })\n```\n\n### Step 2: Confirm\n"\u{1F4F1} **To:** John Smith (+1 555-123-4567)\n\u{1F4AC} **Message:** Running 10 minutes late!\nShould I send it?"\n\n### Step 3: Send\n```javascript\nandroid_sms({ phone: "+15551234567", message: "Running 10 minutes late!" })\n```\n\n## Examples\n\n**User:** "Text John that I\'ll be late"\n**Action:** Find John, compose message, confirm, send\n\n**User:** "Send Mom a happy birthday text"\n**Action:** Find Mom, compose birthday message, confirm, send'
    },
    {
      emoji: '\u{1F419}', name: 'github', cat: 'Web & API',
      desc: 'Search repositories, view issues, check PRs, manage GitHub projects',
      content: '---\nname: github\nversion: "1.0.0"\ndescription: "Search repositories, view issues, check PRs, manage GitHub projects"\nmetadata:\n  openclaw:\n    emoji: "\u{1F419}"\n    requires:\n      bins: []\n      env: ["GITHUB_TOKEN"]\n---\n\n# GitHub\n\nInteract with GitHub using the REST API.\n\n## When to Use\n\nUser asks about:\n- Repositories ("Find Kotlin repos", "My repos")\n- Issues ("Open issues on X")\n- Pull requests ("PRs waiting for review")\n\n## Authentication\n\nNeeds a GitHub Personal Access Token for private repos/higher rate limits.\n\n## API Endpoints\n\nBase URL: `https://api.github.com`\n\n### Search repos\n```javascript\nweb_fetch({\n  url: "https://api.github.com/search/repositories?q=language:kotlin+stars:>1000&sort=stars"\n})\n```\n\n### Authenticated requests\n```javascript\nweb_fetch({\n  url: "https://api.github.com/user/repos?sort=updated",\n  headers: { "Authorization": "Bearer {GITHUB_TOKEN}" }\n})\n```\n\n## Rate Limits\n\nUnauthenticated: 60/hour. Authenticated: 5,000/hour.\n\n## Examples\n\n**User:** "Find popular Rust projects"\n**Action:** Search repos with language:rust, sort by stars\n\n**User:** "Show my recent PRs"\n**Action:** Search user\'s open PRs across repos'
    },
    {
      emoji: '\u{1F4DA}', name: 'dictionary', cat: 'Web & API',
      desc: 'Look up word definitions, pronunciation, and etymology using Free Dictionary API',
      content: '---\nname: dictionary\nversion: "1.0.0"\ndescription: "Look up word definitions, pronunciation, and etymology using Free Dictionary API"\nmetadata:\n  openclaw:\n    emoji: "\u{1F4DA}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Dictionary\n\nLook up word definitions using the Free Dictionary API.\n\n## When to Use\n\nUser asks about:\n- Word definitions ("What does \'ephemeral\' mean?")\n- Pronunciation ("How do you pronounce \'quinoa\'?")\n- Etymology ("Where does \'algorithm\' come from?")\n\n## API Endpoint\n\n```javascript\nweb_fetch({\n  url: "https://api.dictionaryapi.dev/api/v2/entries/en/ephemeral"\n})\n```\n\n## Response Format\n\n```\n\u{1F4DA} **ephemeral** /\u026A\u02C8f\u025Bm(\u0259)r\u0259l/\n\n**adjective**\n1. Lasting for a very short time.\n   _"Fashions are ephemeral."_\n\n**Synonyms:** transitory, fleeting\n**Origin:** Late 16th century, from Greek\n```\n\n## Examples\n\n**User:** "Define serendipity"\n**Action:** Fetch definition, format nicely\n\n**User:** "Synonyms for happy"\n**Action:** Fetch word, list synonyms'
    },
    {
      emoji: '\u{1F4B1}', name: 'exchange-rates', cat: 'Web & API',
      desc: 'Get currency exchange rates and convert between currencies (free API)',
      content: '---\nname: exchange-rates\nversion: "1.0.0"\ndescription: "Get currency exchange rates and convert between currencies (free API)"\nmetadata:\n  openclaw:\n    emoji: "\u{1F4B1}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Exchange Rates\n\nGet currency exchange rates using free APIs.\n\n## When to Use\n\nUser asks about:\n- Exchange rates ("USD to EUR rate")\n- Currency conversion ("Convert 100 USD to JPY")\n\n## API Endpoints\n\n```javascript\nweb_fetch({ url: "https://open.er-api.com/v6/latest/USD" })\n```\n\nOr Frankfurter API:\n```javascript\nweb_fetch({ url: "https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY" })\n```\n\n## Response Format\n\n```\n\u{1F4B1} **USD \u2192 EUR**\nRate: 1 USD = 0.92 EUR\n\u{1F4B0} 100 USD = 92.00 EUR\n```\n\n## Examples\n\n**User:** "What\'s the dollar to euro rate?"\n**Action:** Get USD rates, show EUR rate\n\n**User:** "Convert 500 yen to dollars"\n**Action:** Get JPY rates, calculate USD amount'
    },
    {
      emoji: '\u{1F3AC}', name: 'movie-tv', cat: 'Web & API',
      desc: 'Search movies and TV shows, get ratings, recommendations using TMDB (free API)',
      content: '---\nname: movie-tv\nversion: "1.0.0"\ndescription: "Search movies and TV shows, get ratings, recommendations using TMDB (free API)"\nmetadata:\n  openclaw:\n    emoji: "\u{1F3AC}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Movie & TV\n\nSearch for movies and TV shows using The Movie Database (TMDB) API.\n\n## When to Use\n\nUser asks about:\n- Movie info ("Tell me about Dune")\n- TV shows ("What\'s Severance about?")\n- Recommendations ("Movies like Inception")\n\n## API Key\n\nTMDB requires a free API key. Get one at: https://www.themoviedb.org/settings/api\n\n## API Endpoints\n\n```javascript\nweb_fetch({\n  url: "https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query=Dune"\n})\n```\n\nTrending: `https://api.themoviedb.org/3/trending/all/day?api_key={API_KEY}`\n\n## Response Format\n\n```\n\u{1F3AC} Dune: Part Two (2024)\nRating: 8.3/10 | Runtime: 166 min\nGenre: Science Fiction, Adventure\nDirector: Denis Villeneuve\n```\n\n## Examples\n\n**User:** "What\'s the new Dune movie about?"\n**Action:** Search "Dune", show latest result details\n\n**User:** "Movies similar to Interstellar"\n**Action:** Get Interstellar ID, fetch recommendations'
    },
    {
      emoji: '\u{1F373}', name: 'recipe', cat: 'Web & API',
      desc: 'Search recipes, get ingredients and cooking instructions from TheMealDB (free, no API key)',
      content: '---\nname: recipe\nversion: "1.0.0"\ndescription: "Search recipes, get ingredients and cooking instructions from TheMealDB (free, no API key)"\nmetadata:\n  openclaw:\n    emoji: "\u{1F373}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Recipe\n\nSearch for recipes using the free TheMealDB API.\n\n## When to Use\n\nUser asks about:\n- Recipes ("How do I make pasta carbonara?")\n- Meal ideas ("What can I make with chicken?")\n- Ingredients ("What\'s in a margarita?")\n\n## API Endpoints\n\nSearch: `https://www.themealdb.com/api/json/v1/1/search.php?s=carbonara`\nRandom: `https://www.themealdb.com/api/json/v1/1/random.php`\nBy ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`\nBy cuisine: `https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian`\n\n## Response Format\n\n```\n\u{1F373} **Pasta Carbonara**\n\u{1F30D} Italian | \u{1F37D}\uFE0F Pasta\n\n**Ingredients:**\n- 320g Spaghetti\n- 150g Guanciale\n- 4 Egg Yolks\n- 100g Pecorino Romano\n\n**Instructions:**\n1. Cook pasta in salted water\n2. Fry guanciale until crispy\n3. Mix egg yolks with cheese\n4. Combine hot pasta with egg mixture\n```\n\n## Examples\n\n**User:** "How do I make tiramisu?"\n**Action:** Search "tiramisu", format recipe\n\n**User:** "Give me a random recipe"\n**Action:** Use random endpoint, present result\n\n**User:** "What can I cook with salmon?"\n**Action:** Filter by ingredient "salmon", list options'
    }
  ];

  /* ══════════════════════════════════════════════════════════
     TOOL REFERENCE (56 tools grouped by category)
     ══════════════════════════════════════════════════════════ */
  var TOOL_CATEGORIES = [
    { cat: 'Web & Search', tools: [
      { id: 'web_search', desc: 'Search the web via DuckDuckGo' },
      { id: 'web_fetch', desc: 'Fetch a URL, returns markdown/JSON/text' }
    ]},
    { cat: 'Memory', tools: [
      { id: 'memory_save', desc: 'Save to long-term memory' },
      { id: 'memory_read', desc: 'Read long-term memory' },
      { id: 'daily_note', desc: 'Add to today\'s daily memory' },
      { id: 'memory_search', desc: 'Search SQL.js memory DB' },
      { id: 'memory_get', desc: 'Get specific memory lines' }
    ]},
    { cat: 'Files', tools: [
      { id: 'read', desc: 'Read a workspace file' },
      { id: 'write', desc: 'Write/create a workspace file' },
      { id: 'edit', desc: 'Edit an existing file' },
      { id: 'ls', desc: 'List files and directories' },
      { id: 'delete', desc: 'Delete a workspace file' }
    ]},
    { cat: 'Skills', tools: [
      { id: 'skill_read', desc: 'Read a skill\'s full instructions' },
      { id: 'skill_install', desc: 'Install/update a skill' }
    ]},
    { cat: 'Scheduling', tools: [
      { id: 'cron_create', desc: 'Create a scheduled job' },
      { id: 'cron_list', desc: 'List all scheduled jobs' },
      { id: 'cron_cancel', desc: 'Cancel a scheduled job' },
      { id: 'cron_status', desc: 'Get scheduling status' },
      { id: 'datetime', desc: 'Get current date/time' }
    ]},
    { cat: 'Analytics', tools: [
      { id: 'session_status', desc: 'Session info & API analytics' },
      { id: 'memory_stats', desc: 'Memory system statistics' }
    ]},
    { cat: 'Device \u2014 Battery & Storage', tools: [
      { id: 'android_battery', desc: 'Battery level & charging status' },
      { id: 'android_storage', desc: 'Storage info (total/available)' }
    ]},
    { cat: 'Device \u2014 Clipboard', tools: [
      { id: 'android_clipboard_get', desc: 'Get clipboard content' },
      { id: 'android_clipboard_set', desc: 'Set clipboard content' }
    ]},
    { cat: 'Device \u2014 Communication', tools: [
      { id: 'android_contacts_search', desc: 'Search contacts by name' },
      { id: 'android_sms', desc: 'Send SMS (requires confirmation)' },
      { id: 'android_call', desc: 'Make a phone call (requires confirmation)' }
    ]},
    { cat: 'Device \u2014 Location & Sensors', tools: [
      { id: 'android_location', desc: 'GPS location' },
      { id: 'android_tts', desc: 'Text-to-speech' }
    ]},
    { cat: 'Device \u2014 Camera', tools: [
      { id: 'android_camera_capture', desc: 'Capture a photo' },
      { id: 'android_camera_check', desc: 'Capture + analyze with vision' }
    ]},
    { cat: 'Device \u2014 Apps', tools: [
      { id: 'android_apps_list', desc: 'List installed apps' },
      { id: 'android_apps_launch', desc: 'Launch an app' }
    ]},
    { cat: 'Solana \u2014 Wallet', tools: [
      { id: 'solana_address', desc: 'Get wallet address' },
      { id: 'solana_balance', desc: 'SOL + SPL token balances' },
      { id: 'solana_history', desc: 'Transaction history' },
      { id: 'solana_send', desc: 'Send SOL (requires confirmation)' },
      { id: 'solana_price', desc: 'Token USD prices' }
    ]},
    { cat: 'Solana \u2014 Jupiter Swap', tools: [
      { id: 'solana_quote', desc: 'Get swap quote from Jupiter' },
      { id: 'solana_swap', desc: 'Swap tokens via Jupiter Ultra' }
    ]},
    { cat: 'Solana \u2014 Jupiter Orders', tools: [
      { id: 'jupiter_trigger_create', desc: 'Create limit/trigger order' },
      { id: 'jupiter_trigger_list', desc: 'List limit/stop orders' },
      { id: 'jupiter_trigger_cancel', desc: 'Cancel an order' }
    ]},
    { cat: 'Solana \u2014 Jupiter DCA', tools: [
      { id: 'jupiter_dca_create', desc: 'Create DCA order' },
      { id: 'jupiter_dca_list', desc: 'List DCA orders' },
      { id: 'jupiter_dca_cancel', desc: 'Cancel DCA order' }
    ]},
    { cat: 'Solana \u2014 Jupiter Research', tools: [
      { id: 'jupiter_token_search', desc: 'Search tokens by name' },
      { id: 'jupiter_token_security', desc: 'Token safety via Jupiter Shield' },
      { id: 'jupiter_wallet_holdings', desc: 'Wallet token holdings' }
    ]},
    { cat: 'Telegram', tools: [
      { id: 'telegram_react', desc: 'Send reaction emoji' },
      { id: 'telegram_send_file', desc: 'Send a file' },
      { id: 'telegram_delete', desc: 'Delete a message' },
      { id: 'telegram_send', desc: 'Send a message' }
    ]},
    { cat: 'System', tools: [
      { id: 'shell_exec', desc: 'Execute shell command (sandboxed)' },
      { id: 'js_eval', desc: 'Execute JavaScript in Node.js' }
    ]}
  ];

  /* ══════════════════════════════════════════════════════════
     CLAUDE CC PROMPT TEMPLATE
     ══════════════════════════════════════════════════════════ */
  var PROMPT_TEMPLATE = 'Create a SeekerClaw skill file. SeekerClaw is an Android app that runs an AI agent on the Solana Seeker phone. Skills are SKILL.md files that teach the agent new capabilities.\n\n## SKILL.md Format\n\nThe file has two parts: YAML frontmatter (delimited by ---) and a markdown body.\n\n### Frontmatter (required):\n\n---\nname: skill-name-kebab-case\nversion: "1.0.0"\ndescription: "One sentence \u2014 the AI reads this to decide when to use the skill"\nmetadata:\n  openclaw:\n    emoji: "\u{1F527}"\n    requires:\n      bins: []\n      env: [{api_keys_as_yaml_list}]\n---\n\n### Body sections (in order):\n\n1. # Title \u2014 skill name as heading\n2. Brief intro (1-2 sentences)\n3. ## When to Use \u2014 bullet list of example user messages\n4. ## Usage \u2014 sub-sections with tool call code blocks (```javascript), expected responses (```json), and formatted output examples\n5. ## Response Format \u2014 how to present results to the user (use emoji)\n6. ## Error Handling \u2014 what to say when things fail\n7. ## Examples \u2014 "User:" / "Action:" pairs showing trigger\u2192behavior\n\n{reference_examples_block}\n\n## Skill to Create\n\n- **Purpose:** {purpose}\n- **API/Service:** {api_service}\n- **Example user messages that should trigger it:**\n{example_messages_formatted}\n- **Tools to use:** {tools_comma_separated}\n- **API keys or credentials needed:** {api_keys}\n\n## Rules\n\n- Tool calls use function syntax: tool_name({ param: "value" })\n- Include 3-5 example trigger messages in "When to Use"\n- Include 2-4 "User:"/"Action:" pairs in "Examples"\n- Show realistic API responses in code blocks\n- Use emoji in response formats for visual clarity\n- Include error handling (permission denied, API errors, not found)\n- Only reference tools the skill actually needs\n- Keep the file practical and actionable \u2014 the AI follows these instructions literally\n\n## Available SeekerClaw Tools (only use what\'s needed)\n\n{tools_reference_for_checked_categories}\n\nSave the file as: workspace/skills/{name_slug}/SKILL.md\n\nOutput ONLY the file content. No explanations.';

  var REF_EXAMPLE_WEB = '\n## Reference Example: API-Based Skill\n\n---\nname: crypto-prices\nversion: "1.0.0"\ndescription: "Get real-time cryptocurrency prices and market data from CoinGecko (free, no API key)"\nmetadata:\n  openclaw:\n    emoji: "\u{1F4B0}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Crypto Prices\n\nGet cryptocurrency prices using the free CoinGecko API.\n\n## When to Use\n\nUser asks about:\n- Crypto prices ("What\'s Bitcoin at?", "SOL price")\n- Market data ("Is ETH up or down?")\n- Multiple coins ("Price of BTC, ETH, and SOL")\n\n## Usage\n\n### Get coin price\n\n```javascript\nweb_fetch({\n  url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"\n})\n```\n\nResponse: `{"bitcoin":{"usd":45000,"usd_24h_change":2.3}}`\n\n## Response Format\n\n```\n\u{1F4B0} Bitcoin (BTC): $45,123.45 (+2.3% 24h)\n```\n\n## Error Handling\n\nIf rate limited, wait 60 seconds before retrying.\n\n## Examples\n\n**User:** "What\'s the price of Bitcoin?"\n**Action:** Fetch BTC price, format nicely\n\n**User:** "How are BTC and ETH doing?"\n**Action:** Fetch both with 24h change, show comparison';

  var REF_EXAMPLE_DEVICE = '\n## Reference Example: Device Tool Skill\n\n---\nname: speak\nversion: "1.0.0"\ndescription: "Speak text out loud using device text-to-speech"\nmetadata:\n  openclaw:\n    emoji: "\u{1F50A}"\n    requires:\n      bins: []\n      env: []\n---\n\n# Speak (Text-to-Speech)\n\nSpeak text out loud using Android\'s built-in text-to-speech.\n\n## When to Use\n\nUser asks to:\n- Read something aloud ("Read this to me")\n- Speak a message ("Say hello")\n- Announce something ("Announce the time")\n\n## Usage\n\n```javascript\nandroid_tts({ text: "Hello! How can I help you today?" })\n```\n\nOptional parameters:\n- speed: 0.5 (slow) to 2.0 (fast), default 1.0\n- pitch: 0.5 (low) to 2.0 (high), default 1.0\n\n## Response Format\n\nAfter speaking, confirm:\n"\u{1F50A} *Speaking:* [summary of what was said]"\n\n## Examples\n\n**User:** "What time is it? Tell me out loud"\n**Action:** Get time, speak it via android_tts';

  /* ══════════════════════════════════════════════════════════
     DOM REFERENCES
     ══════════════════════════════════════════════════════════ */
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return document.querySelectorAll(sel); };

  // Tabs & panels
  var tabs = $$('.sc-tab');
  var panels = {
    blank:    $('#sc-panel-blank'),
    template: $('#sc-panel-template'),
    prompt:   $('#sc-panel-prompt')
  };

  // Blank editor fields
  var fName    = $('#scName');
  var fEmoji   = $('#scEmoji');
  var fVersion = $('#scVersion');
  var fDesc    = $('#scDesc');
  var fBody    = $('#scBody');
  var preview  = $('#scPreview');
  var previewFilename = $('#scPreviewFilename');

  // Claude CC prompt fields
  var fPurpose    = $('#scPurpose');
  var fApiService = $('#scApiService');
  var fApiKeys    = $('#scApiKeys');
  var fExampleMsgs = $('#scExampleMsgs');
  var promptPreview = $('#scPromptPreview');

  // Tag inputs
  var envTagsEl = $('#scEnvTags');
  var binTagsEl = $('#scBinTags');

  // Buttons
  var copyBtn     = $('#scCopyBtn');
  var downloadBtn = $('#scDownloadBtn');
  var copyPromptBtn = $('#scCopyPromptBtn');

  // Status
  var blankStatus  = $('#scBlankStatus');
  var promptStatus = $('#scPromptStatus');

  // Template grid
  var templatesGrid = $('#scTemplatesGrid');

  // Tools grid
  var toolsGrid = $('#scToolsGrid');

  /* ══════════════════════════════════════════════════════════
     TAG INPUT COMPONENT
     ══════════════════════════════════════════════════════════ */
  function initTagInput(container) {
    var tags = [];
    var placeholder = container.getAttribute('data-placeholder') || 'Add...';

    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'sc-tags__input';
    input.placeholder = placeholder;
    container.appendChild(input);

    function render() {
      // Remove existing chips
      container.querySelectorAll('.sc-tags__chip').forEach(function (c) { c.remove(); });
      tags.forEach(function (tag, i) {
        var chip = document.createElement('span');
        chip.className = 'sc-tags__chip';
        chip.textContent = tag;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'sc-tags__remove';
        btn.textContent = '\u00D7';
        btn.setAttribute('aria-label', 'Remove ' + tag);
        btn.addEventListener('click', function () {
          tags.splice(i, 1);
          render();
          updatePreview();
        });
        chip.appendChild(btn);
        container.insertBefore(chip, input);
      });
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        var val = input.value.trim().replace(/,/g, '');
        if (val && tags.indexOf(val) === -1) {
          tags.push(val);
          input.value = '';
          render();
          updatePreview();
        }
      }
      if (e.key === 'Backspace' && !input.value && tags.length) {
        tags.pop();
        render();
        updatePreview();
      }
    });

    container.addEventListener('click', function () { input.focus(); });

    container._getTags = function () { return tags.slice(); };
    container._setTags = function (arr) {
      tags = arr.slice();
      input.value = '';
      render();
    };
  }

  initTagInput(envTagsEl);
  initTagInput(binTagsEl);

  /* ══════════════════════════════════════════════════════════
     MODE SWITCHING
     ══════════════════════════════════════════════════════════ */
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var mode = tab.getAttribute('data-mode');
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');

      Object.keys(panels).forEach(function (key) {
        if (key === mode) {
          panels[key].removeAttribute('hidden');
        } else {
          panels[key].setAttribute('hidden', '');
        }
      });
    });
  });

  /* ══════════════════════════════════════════════════════════
     BLANK MODE — LIVE PREVIEW
     ══════════════════════════════════════════════════════════ */
  function buildSkillMd() {
    var name = fName.value.trim();
    var emoji = fEmoji.value.trim() || '\u{1F527}';
    var version = fVersion.value.trim() || '1.0.0';
    var desc = fDesc.value.trim();
    var envTags = envTagsEl._getTags();
    var binTags = binTagsEl._getTags();
    var body = fBody.value;

    var envYaml = envTags.length ? '["' + envTags.join('", "') + '"]' : '[]';
    var binYaml = binTags.length ? '["' + binTags.join('", "') + '"]' : '[]';

    var md = '---\n';
    md += 'name: ' + (name || '""') + '\n';
    md += 'version: "' + version + '"\n';
    md += 'description: "' + desc.replace(/"/g, '\\"') + '"\n';
    md += 'metadata:\n';
    md += '  openclaw:\n';
    md += '    emoji: "' + emoji + '"\n';
    md += '    requires:\n';
    md += '      bins: ' + binYaml + '\n';
    md += '      env: ' + envYaml + '\n';
    md += '---\n';
    if (body) {
      md += '\n' + body;
    }

    return md;
  }

  function updatePreview() {
    var md = buildSkillMd();
    preview.querySelector('code').textContent = md;

    var name = fName.value.trim();
    previewFilename.textContent = name ? name + '/SKILL.md' : 'SKILL.md';
  }

  // Bind input events
  [fName, fEmoji, fVersion, fDesc, fBody].forEach(function (el) {
    el.addEventListener('input', updatePreview);
  });

  /* ══════════════════════════════════════════════════════════
     TEMPLATE MODE
     ══════════════════════════════════════════════════════════ */
  function renderTemplates() {
    TEMPLATES.forEach(function (tpl, i) {
      var card = document.createElement('div');
      card.className = 'sc-tpl-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Load ' + tpl.name + ' template');

      card.innerHTML = ''
        + '<div class="sc-tpl-card__top">'
        + '  <span class="sc-tpl-card__emoji">' + tpl.emoji + '</span>'
        + '  <span class="sc-tpl-card__name">' + tpl.name + '</span>'
        + '</div>'
        + '<span class="sc-tpl-card__cat">' + tpl.cat + '</span>'
        + '<p class="sc-tpl-card__desc">' + tpl.desc + '</p>';

      card.addEventListener('click', function () { loadTemplate(i); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          loadTemplate(i);
        }
      });

      templatesGrid.appendChild(card);
    });
  }

  function loadTemplate(index) {
    var tpl = TEMPLATES[index];
    var content = tpl.content;

    // Parse frontmatter
    var parts = content.split('---');
    var fm = parts[1] || '';
    var bodyParts = parts.slice(2);
    var body = bodyParts.join('---').replace(/^\n/, '');

    // Extract fields from frontmatter
    var nameMatch = fm.match(/^name:\s*(.+)$/m);
    var versionMatch = fm.match(/version:\s*"(.+?)"/);
    var descMatch = fm.match(/description:\s*"(.+?)"/);
    var emojiMatch = fm.match(/emoji:\s*"(.+?)"/);
    var envMatch = fm.match(/env:\s*\[(.+?)\]/);
    var binMatch = fm.match(/bins:\s*\[(.+?)\]/);

    fName.value = nameMatch ? nameMatch[1].trim() : '';
    fVersion.value = versionMatch ? versionMatch[1] : '1.0.0';
    fDesc.value = descMatch ? descMatch[1] : '';
    fEmoji.value = emojiMatch ? emojiMatch[1] : '\u{1F527}';
    fBody.value = body;

    // Parse env/bin arrays
    var envArr = [];
    if (envMatch && envMatch[1].trim()) {
      envArr = envMatch[1].replace(/"/g, '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    }
    envTagsEl._setTags(envArr);

    var binArr = [];
    if (binMatch && binMatch[1].trim()) {
      binArr = binMatch[1].replace(/"/g, '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    }
    binTagsEl._setTags(binArr);

    // Switch to blank mode
    tabs.forEach(function (t) { t.classList.remove('is-active'); });
    tabs[0].classList.add('is-active');
    Object.keys(panels).forEach(function (key) {
      if (key === 'blank') {
        panels[key].removeAttribute('hidden');
      } else {
        panels[key].setAttribute('hidden', '');
      }
    });

    updatePreview();
    showToast('Loaded "' + tpl.name + '" template');
  }

  renderTemplates();

  /* ══════════════════════════════════════════════════════════
     CLAUDE CC PROMPT MODE — TOOLS GRID
     ══════════════════════════════════════════════════════════ */
  function renderToolsGrid() {
    TOOL_CATEGORIES.forEach(function (cat) {
      var section = document.createElement('div');
      section.className = 'sc-tools-cat';

      var header = document.createElement('button');
      header.type = 'button';
      header.className = 'sc-tools-cat__header';
      header.innerHTML = '<span>' + cat.cat + ' (' + cat.tools.length + ')</span>'
        + '<svg class="sc-tools-cat__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

      header.addEventListener('click', function () {
        section.classList.toggle('is-open');
      });

      var body = document.createElement('div');
      body.className = 'sc-tools-cat__body';

      cat.tools.forEach(function (tool) {
        var label = document.createElement('label');
        label.className = 'sc-tool-check';
        label.innerHTML = '<input type="checkbox" value="' + tool.id + '" data-cat="' + cat.cat + '">'
          + '<span class="sc-tool-check__label" title="' + tool.desc + '">' + tool.id + '</span>';
        label.querySelector('input').addEventListener('change', updatePromptPreview);
        body.appendChild(label);
      });

      section.appendChild(header);
      section.appendChild(body);
      toolsGrid.appendChild(section);
    });
  }

  renderToolsGrid();

  /* ══════════════════════════════════════════════════════════
     CLAUDE CC PROMPT — BUILD PROMPT
     ══════════════════════════════════════════════════════════ */
  function getCheckedTools() {
    var checked = [];
    toolsGrid.querySelectorAll('input[type="checkbox"]:checked').forEach(function (cb) {
      checked.push({ id: cb.value, cat: cb.getAttribute('data-cat') });
    });
    return checked;
  }

  function hasDeviceTools(checked) {
    return checked.some(function (t) { return t.cat.indexOf('Device') === 0; });
  }

  function hasWebTools(checked) {
    return checked.some(function (t) {
      return t.id === 'web_fetch' || t.id === 'web_search';
    });
  }

  function buildPrompt() {
    var purpose = fPurpose.value.trim();
    var apiService = fApiService.value.trim() || 'None';
    var apiKeys = fApiKeys.value.trim() || 'None';
    var exampleMsgs = fExampleMsgs.value.trim();
    var checked = getCheckedTools();

    if (!purpose) return 'Fill in "What should this skill do?" to generate a prompt...';

    // Format example messages
    var msgFormatted = '  (not provided)';
    if (exampleMsgs) {
      msgFormatted = exampleMsgs.split('\n').filter(Boolean).map(function (m) {
        return '  - "' + m.trim() + '"';
      }).join('\n');
    }

    // Tools comma-separated
    var toolsList = checked.length
      ? checked.map(function (t) { return t.id; }).join(', ')
      : '(let Claude decide based on purpose)';

    // API keys YAML
    var apiKeysYaml = '[]';
    if (apiKeys && apiKeys !== 'None') {
      apiKeysYaml = '["' + apiKeys.replace(/,\s*/g, '", "') + '"]';
    }

    // Name slug
    var nameSlug = purpose.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 30)
      .replace(/-+$/, '');

    // Reference examples
    var device = hasDeviceTools(checked);
    var web = hasWebTools(checked);
    var refBlock = '';
    if (device && web) {
      refBlock = REF_EXAMPLE_WEB + '\n' + REF_EXAMPLE_DEVICE;
    } else if (web) {
      refBlock = REF_EXAMPLE_WEB;
    } else if (device) {
      refBlock = REF_EXAMPLE_DEVICE;
    } else {
      refBlock = REF_EXAMPLE_WEB + '\n' + REF_EXAMPLE_DEVICE;
    }

    // Tools reference — only checked categories
    var toolsRef = '';
    if (checked.length) {
      var seenCats = {};
      checked.forEach(function (t) { seenCats[t.cat] = true; });
      TOOL_CATEGORIES.forEach(function (cat) {
        if (seenCats[cat.cat]) {
          toolsRef += '\n### ' + cat.cat + '\n';
          cat.tools.forEach(function (tool) {
            toolsRef += '- ' + tool.id + ': ' + tool.desc + '\n';
          });
        }
      });
    } else {
      toolsRef = '(No specific tools selected \u2014 use whatever tools are needed based on the skill\'s purpose)';
    }

    // Assemble
    var prompt = PROMPT_TEMPLATE
      .replace('{purpose}', purpose)
      .replace('{api_service}', apiService)
      .replace('{api_keys}', apiKeys)
      .replace('{api_keys_as_yaml_list}', apiKeysYaml)
      .replace('{example_messages_formatted}', msgFormatted)
      .replace('{tools_comma_separated}', toolsList)
      .replace('{name_slug}', nameSlug)
      .replace('{reference_examples_block}', refBlock)
      .replace('{tools_reference_for_checked_categories}', toolsRef);

    return prompt;
  }

  function updatePromptPreview() {
    promptPreview.querySelector('code').textContent = buildPrompt();
  }

  [fPurpose, fApiService, fApiKeys, fExampleMsgs].forEach(function (el) {
    el.addEventListener('input', updatePromptPreview);
  });

  /* ══════════════════════════════════════════════════════════
     EXPORT — COPY & DOWNLOAD
     ══════════════════════════════════════════════════════════ */
  function showStatus(el, msg, type) {
    el.textContent = msg;
    el.className = 'sc-status ' + (type || '');
    setTimeout(function () { el.textContent = ''; el.className = 'sc-status'; }, 4000);
  }

  // Toast
  var toastEl = null;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'sc-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2500);
  }

  // Copy to clipboard
  function copyText(text, statusEl, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(successMsg || 'Copied to clipboard!');
      }).catch(function () {
        showStatus(statusEl, 'Copy failed — try manually', 'error');
      });
    } else {
      // Fallback
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast(successMsg || 'Copied to clipboard!');
      } catch (e) {
        showStatus(statusEl, 'Copy failed — try manually', 'error');
      }
      document.body.removeChild(ta);
    }
  }

  // Download as file
  function downloadFile(content, filename) {
    var blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Blank mode — Copy
  copyBtn.addEventListener('click', function () {
    var name = fName.value.trim();
    var desc = fDesc.value.trim();
    if (!name || !desc) {
      showStatus(blankStatus, 'Name and description are required', 'error');
      return;
    }
    copyText(buildSkillMd(), blankStatus, 'SKILL.md copied!');
  });

  // Blank mode — Download
  downloadBtn.addEventListener('click', function () {
    var name = fName.value.trim();
    var desc = fDesc.value.trim();
    if (!name || !desc) {
      showStatus(blankStatus, 'Name and description are required', 'error');
      return;
    }
    var filename = (name || 'skill') + '.md';
    downloadFile(buildSkillMd(), filename);
    showToast('Downloaded ' + filename);
  });

  // Claude CC — Copy Prompt
  copyPromptBtn.addEventListener('click', function () {
    var purpose = fPurpose.value.trim();
    if (!purpose) {
      showStatus(promptStatus, 'Purpose is required', 'error');
      return;
    }
    copyText(buildPrompt(), promptStatus, 'Prompt copied! Paste it into Claude Code or Claude.');
  });

})();
