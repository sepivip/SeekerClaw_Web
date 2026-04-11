/* ═══════════════════════════════════════════════════════════
   SeekerClaw — Partner Skills
   ───────────────────────────────────────────────────────────
   Renders partner skill detail, handles install actions
   (send to agent, download, copy content, share link).
   Raw SKILL.md preview in <pre><code> — no markdown rendering.
   Must load AFTER config.js / components.js, BEFORE main.js.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     SKILL DATA (embedded — matches skill-creator.js pattern)
     ══════════════════════════════════════════════════════════ */
  var SKILLS_BASE_URL = 'partner-skills/';

  var SKILLS = [
    {
      id: 'clawpump',
      name: 'ClawPump',
      logo: 'assets/partner-skills/clawpump.jpg',
      category: 'Crypto & DeFi',
      tagline: 'Launch tokens on Solana via pump.fun',
      description: 'Launch tokens on Solana via ClawPump \u2014 gasless pump.fun launches, earn 65% of trading fees. Token creation, earnings tracking, domain search, and swap quotes.',
      partner: 'ClawPump',
      partnerUrl: 'https://clawpump.tech',
      disclaimer: 'Third-party service. ClawPump (clawpump.tech) is an independent platform not affiliated with SeekerClaw. Token launches involve real funds on Solana mainnet.',
      features: [
        { title: 'Gasless Token Launch', desc: 'Launch tokens for free \u2014 ClawPump covers Solana fees' },
        { title: 'Earn Trading Fees', desc: '65% of all trading fees from your launched tokens' },
        { title: 'Domain Search', desc: 'Find and check .com, .io, .ai, .dev, .xyz domains' },
        { title: 'Swap Quotes', desc: 'Get Jupiter DEX swap quotes (read-only)' }
      ]
    },
    {
      id: 'dune-analytics',
      name: 'Dune Analytics',
      logo: 'assets/partner-skills/dune.png',
      category: 'Onchain Data',
      tagline: 'Query onchain data from Dune Analytics',
      description: 'Query blockchain data via the Dune API \u2014 Solana DEX trades, token stats, wallet activity, protocol metrics, and custom SQL. Optimized for Solana but supports all chains Dune covers.',
      partner: 'SeekerClaw',
      partnerUrl: 'https://seekerclaw.xyz',
      disclaimer: 'Third-party service. Dune Analytics (dune.com) is an independent platform not affiliated with SeekerClaw. Requires a Dune API key. Query results may be cached and not real-time.',
      features: [
        { title: 'DEX Analytics', desc: 'Solana DEX volume, trades, and project breakdowns' },
        { title: 'Wallet Activity', desc: 'Track token transfers, trading history, and balances' },
        { title: 'Protocol Metrics', desc: 'TVL, staking stats, and usage data for Solana protocols' },
        { title: 'Custom SQL', desc: 'Run inline SQL queries against Dune\u2019s data warehouse' }
      ]
    },
    {
      id: 'home-assistant',
      name: 'Home Assistant',
      logo: 'assets/partner-skills/homeassistant.jpg',
      category: 'Smart Home',
      tagline: 'Control your smart home via Home Assistant',
      description: 'Control and monitor your smart home via Home Assistant \u2014 lights, climate, fan, vacuum, alarm, media, scenes, automations, and presence detection.',
      partner: 'SeekerClaw',
      partnerUrl: 'https://seekerclaw.xyz',
      disclaimer: 'Requires a Home Assistant instance with a long-lived access token. Your phone must be on the same network as your HA server (or use remote access).',
      features: [
        { title: 'Lights & Switches', desc: 'Toggle lights, switches, and scenes with natural language' },
        { title: 'Climate Control', desc: 'Set temperature, HVAC mode, and fan speed' },
        { title: 'Vacuum & Alarm', desc: 'Start/stop robot vacuum, arm/disarm alarm system' },
        { title: 'Presence & Media', desc: 'Check who\u2019s home, control speakers and TV' }
      ]
    },
    {
      id: 'career-companion',
      name: 'Career Companion',
      logo: 'assets/partner-skills/career-companion.jpg',
      category: 'Career & Jobs',
      tagline: 'AI career coach for frontier tech jobs',
      description: 'AI career coach for frontier tech \u2014 search live job openings, tailor resumes & cover letters, run mock interviews, research salaries, and plan career transitions across aerospace, AI, robotics, and defense.',
      partner: 'Zero G Talent',
      partnerUrl: 'https://zerogtalent.com',
      disclaimer: 'Job data powered by Zero G Talent (zerogtalent.com). Listings are sourced from third-party job boards and may not always be current. No API key required.',
      features: [
        { title: 'Live Job Search', desc: 'Search openings at 100+ frontier tech companies like SpaceX, Anthropic, NASA' },
        { title: 'Resume & Cover Letters', desc: 'Tailor your resume and write cover letters for specific roles' },
        { title: 'Mock Interviews', desc: 'Practice with role-specific interview questions and feedback' },
        { title: 'Salary Research', desc: 'Research compensation data across AI, space, robotics, and defense' }
      ]
    },
    {
      id: 'byreal',
      name: 'Byreal DEX',
      logo: 'assets/partner-skills/byreal.jpg',
      category: 'Crypto & DeFi',
      tagline: 'Trade on Byreal DEX — concentrated liquidity on Solana',
      description: 'Trade and analyze concentrated liquidity pools on Solana via Byreal \u2014 pool analytics, token prices, K-line charts, swap quotes, execute swaps, view positions, and copy top farmers.',
      partner: 'Byreal',
      partnerUrl: 'https://byreal.io',
      disclaimer: 'Third-party service. Byreal (byreal.io) is an independent DEX not affiliated with SeekerClaw. Swaps involve real funds on Solana mainnet. Pool APR/TVL figures are estimates and not guaranteed. Use at your own risk.',
      features: [
        { title: 'Pool Analytics', desc: 'Browse pools by TVL, volume, fees, and APR with full detail views' },
        { title: 'Swap via Byreal', desc: 'Get quotes and execute swaps through Byreal\u2019s CLMM router' },
        { title: 'K-Line Charts', desc: 'Candlestick data from 1m to 1d intervals for any pool' },
        { title: 'Copy Top Farmers', desc: 'Discover the most profitable LP positions in any pool' }
      ]
    }
  ];

  /* ── Helpers ─────────────────────────────────────────── */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };

  /* ── State ───────────────────────────────────────────── */
  var contentCache = {};

  /* ══════════════════════════════════════════════════════════
     RENDER SKILL DETAIL
     ══════════════════════════════════════════════════════════ */
  function findSkill(id) {
    for (var i = 0; i < SKILLS.length; i++) {
      if (SKILLS[i].id === id) return SKILLS[i];
    }
    return null;
  }

  function renderDetail(skill) {
    // Header
    var header = $('#psSkillHeader');
    if (header) {
      header.innerHTML = ''
        + '<img class="ps-skill-header__logo" src="' + skill.logo + '" alt="' + skill.name + '">'
        + '<div class="ps-skill-header__info">'
        + '  <h2 class="ps-skill-header__name">' + skill.name + '</h2>'
        + '  <div class="ps-skill-header__meta">'
        + '    <span class="ps-chip">' + skill.category + '</span>'
        + '    <span class="ps-chip ps-chip--muted" id="psVersionChip" hidden></span>'
        + '  </div>'
        + '  <p class="ps-skill-header__partner">by <a href="' + skill.partnerUrl + '" target="_blank" rel="noopener noreferrer">' + skill.partner + '</a></p>'
        + '  <p class="ps-skill-header__desc">' + skill.description + '</p>'
        + '</div>';
    }

    // Features
    var grid = $('#psFeaturesGrid');
    if (grid) {
      grid.innerHTML = '';
      skill.features.forEach(function (f) {
        var card = document.createElement('div');
        card.className = 'ps-feature-card';
        card.innerHTML = ''
          + '<div class="ps-feature-card__title">' + f.title + '</div>'
          + '<div class="ps-feature-card__desc">' + f.desc + '</div>';
        grid.appendChild(card);
      });
    }

    // Disclaimer
    var disc = $('#psDisclaimer');
    if (disc) disc.textContent = skill.disclaimer;

    // Preview filename
    var filename = $('#psPreviewFilename');
    if (filename) filename.textContent = skill.id + '/SKILL.md';

    // Install code
    var installCode = $('#psInstallCode');
    if (installCode) installCode.textContent = 'Install this skill: https://seekerclaw.xyz/partner-skills/' + skill.id + '.md';

    // Fetch and display raw content
    fetchContent(skill.id);
  }

  /* ══════════════════════════════════════════════════════════
     FETCH RAW SKILL CONTENT
     ══════════════════════════════════════════════════════════ */
  function fetchContent(id) {
    var preview = $('#psPreview');
    var code = $('#psPreviewCode');

    function setVersion(content) {
      var chip = $('#psVersionChip');
      if (!chip) return;
      var m = content.match(/^version:\s*"?(.+?)"?\s*$/m);
      if (m) { chip.textContent = 'v' + m[1]; chip.hidden = false; }
    }

    if (contentCache[id]) {
      code.textContent = contentCache[id];
      preview.classList.remove('ps-preview--loading');
      setVersion(contentCache[id]);
      return;
    }

    preview.classList.add('ps-preview--loading');
    code.textContent = 'Loading skill content...';

    fetch(SKILLS_BASE_URL + id + '.md')
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.text();
      })
      .then(function (text) {
        contentCache[id] = text;
        code.textContent = text;
        preview.classList.remove('ps-preview--loading');
        setVersion(text);
      })
      .catch(function () {
        code.textContent = 'Could not load skill content.';
        preview.classList.remove('ps-preview--loading');
      });
  }

  /* ══════════════════════════════════════════════════════════
     INSTALL ACTIONS
     ══════════════════════════════════════════════════════════ */

  // Toast
  var toastEl = null;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'ps-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2500);
  }

  // Copy to clipboard
  function copyText(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(successMsg || 'Copied to clipboard!');
      }).catch(function () {
        showToast('Copy failed \u2014 try manually');
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
        showToast('Copy failed \u2014 try manually');
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

  /* ══════════════════════════════════════════════════════════
     CARD GRID (multi-skill view)
     ══════════════════════════════════════════════════════════ */
  var cardsSection = $('#psCardsSection');
  var cardsGrid = $('#psCardsGrid');
  var detailSection = $('#detail');
  var backBtn = $('#psBackBtn');
  var isMultiSkill = SKILLS.length > 1;

  function renderCards() {
    if (!cardsGrid) return;
    cardsGrid.innerHTML = '';
    SKILLS.forEach(function (skill) {
      var card = document.createElement('div');
      card.className = 'ps-card reveal';
      card.setAttribute('data-skill', skill.id);
      card.innerHTML = ''
        + '<div class="ps-card__top">'
        + '  <img class="ps-card__logo" src="' + skill.logo + '" alt="' + skill.name + '">'
        + '  <div>'
        + '    <div class="ps-card__name">' + skill.name + '</div>'
        + '    <div class="ps-card__meta">'
        + '      <span class="ps-chip">' + skill.category + '</span>'
        + '    </div>'
        + '  </div>'
        + '</div>'
        + '<p class="ps-card__tagline">' + skill.tagline + '</p>'
        + '<span class="ps-card__partner">by ' + skill.partner + '</span>';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('click', function () {
        showDetail(skill.id);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showDetail(skill.id);
        }
      });
      cardsGrid.appendChild(card);
    });
  }

  function showCards() {
    if (cardsSection) cardsSection.hidden = false;
    if (detailSection) detailSection.hidden = true;
    window.history.pushState(null, '', window.location.pathname);
  }

  function showDetail(id) {
    var skill = findSkill(id);
    if (!skill) return;
    activeSkill = skill;
    renderDetail(skill);
    if (isMultiSkill) {
      if (cardsSection) cardsSection.hidden = true;
      if (backBtn) backBtn.hidden = false;
    }
    if (detailSection) detailSection.hidden = false;
    window.history.pushState(null, '', '#' + id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ══════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════ */
  var activeSkill = null;

  // Check URL hash for direct skill link
  var hashId = window.location.hash.replace('#', '');
  var hashSkill = hashId ? findSkill(hashId) : null;

  if (isMultiSkill && !hashSkill) {
    // Multi-skill: show card grid
    renderCards();
    if (cardsSection) cardsSection.hidden = false;
    if (detailSection) detailSection.hidden = true;
  } else {
    // Single skill or direct link: show detail
    activeSkill = hashSkill || SKILLS[0];
    if (!activeSkill) return;
    renderDetail(activeSkill);
    if (isMultiSkill && backBtn) backBtn.hidden = false;
  }

  // Back button
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      showCards();
    });
  }

  // Bind action buttons
  var sendBtn = $('#psSendBtn');
  var downloadBtn = $('#psDownloadBtn');
  var shareBtn = $('#psShareBtn');

  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var url = 'https://seekerclaw.xyz/partner-skills/' + activeSkill.id + '.md';
      copyText('Install this skill: ' + url, 'Install link copied! Paste in Telegram.');
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      var id = activeSkill.id;
      if (contentCache[id]) {
        downloadFile(contentCache[id], id + '.md');
        showToast('Downloading ' + id + '.md');
      } else {
        fetch(SKILLS_BASE_URL + id + '.md')
          .then(function (res) { if (!res.ok) throw new Error('Failed to fetch'); return res.text(); })
          .then(function (text) {
            contentCache[id] = text;
            downloadFile(text, id + '.md');
            showToast('Downloading ' + id + '.md');
          })
          .catch(function () {
            showToast('Download failed \u2014 try again');
          });
      }
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      var permalink = 'https://seekerclaw.xyz/partner-skills.html#' + activeSkill.id;
      copyText(permalink, 'Link copied!');
    });
  }

  // Browser back/forward support
  window.addEventListener('popstate', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash) {
      var skill = findSkill(hash);
      if (skill) {
        activeSkill = skill;
        renderDetail(skill);
        if (cardsSection) cardsSection.hidden = true;
        if (detailSection) detailSection.hidden = false;
        if (isMultiSkill && backBtn) backBtn.hidden = false;
      }
    } else if (isMultiSkill) {
      showCards();
    }
  });

})();
