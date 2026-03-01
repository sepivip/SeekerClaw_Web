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
    }
    // Future partner skills go here
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
        + '    <span class="ps-chip ps-chip--muted" id="psVersionChip"></span>'
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

    if (contentCache[id]) {
      code.textContent = contentCache[id];
      preview.classList.remove('ps-preview--loading');
      var vMatch = contentCache[id].match(/^version:\s*"?(.+?)"?\s*$/m);
      var chip = $('#psVersionChip');
      if (vMatch && chip) chip.textContent = 'v' + vMatch[1];
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
        var vMatch = text.match(/^version:\s*"?(.+?)"?\s*$/m);
        var chip = $('#psVersionChip');
        if (vMatch && chip) chip.textContent = 'v' + vMatch[1];
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
      card.addEventListener('click', function () {
        showDetail(skill.id);
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
          .then(function (res) { return res.text(); })
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
