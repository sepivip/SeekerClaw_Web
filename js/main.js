/* ═══════════════════════════════════════════════════════════
   SeekerClaw — Main JavaScript
   ───────────────────────────────────────────────────────────
   Reads SITE_CONFIG from config.js and populates the page.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const C = window.SITE_CONFIG;
  if (!C) return;

  /* ── Helpers ─────────────────────────────────────────── */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => (ctx || document).querySelectorAll(sel);

  function setHtml(sel, html) {
    const el = $(sel);
    if (el && html != null) el.innerHTML = html;
  }
  function setText(sel, text) {
    const el = $(sel);
    if (el && text != null) el.textContent = text;
  }
  function setAttr(sel, attr, val) {
    const el = $(sel);
    if (el && val != null) el.setAttribute(attr, val);
  }
  function setAllAttr(sel, attr, val) {
    $$(sel).forEach((el) => el.setAttribute(attr, val));
  }

  /* ══════════════════════════════════════════════════════
     APPLY CONFIG TO PAGE
     ══════════════════════════════════════════════════════ */

  /* ── Brand ───────────────────────────────────────────── */
  $$('[data-brand-name]').forEach((el) => (el.innerHTML = C.brand.nameHtml));
  $$('[data-brand-logo]').forEach((el) => {
    if (C.brand.logo) {
      el.src = C.brand.logo;
      el.alt = C.brand.name;
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
  setText('[data-brand-tagline]', C.brand.tagline);
  setText('[data-brand-footer]', C.brand.footer);

  /* ── Links ───────────────────────────────────────────── */
  setAllAttr('[data-link-dapp]', 'href', C.links.dappStore);
  setAllAttr('[data-link-github]', 'href', C.links.github);
  setAllAttr('[data-link-x]', 'href', C.links.x);

  /* ── Hero ─────────────────────────────────────────────── */
  setText('[data-hero-tag]', C.hero.tag);
  setHtml('[data-hero-title]',
    C.hero.titleLine1 + '<br><span class="gradient-text">' + C.hero.titleLine2 + '</span>'
  );
  setText('[data-hero-desc]', C.hero.description);
  setHtml('[data-hero-cta-primary]',
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> '
    + C.hero.ctaPrimary
  );
  setText('[data-hero-cta-secondary]', C.hero.ctaSecondary);
  if (C.hero.ctaSecondaryHref) {
    setAttr('[data-hero-cta-secondary]', 'href', C.hero.ctaSecondaryHref);
  }

  /* ── Device slideshow (Home / Console / Settings) ──── */
  (function initSlideshow() {
    var slides   = $$('.hero__slide');
    var hotspots = $$('.hero__hotspot');
    if (!slides.length) return;

    var current  = 0;
    var count    = slides.length;
    var interval = 4000;
    var timer    = null;

    function goTo(index) {
      slides[current].classList.remove('hero__slide--active');
      current = index % count;
      slides[current].classList.add('hero__slide--active');
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(function () { goTo(current + 1); }, interval);
    }

    function stopAuto() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    hotspots.forEach(function (btn) {
      btn.addEventListener('click', function () {
        goTo(parseInt(btn.dataset.tab, 10));
        startAuto();
      });
    });

    startAuto();
  })();

  /* ── Stats ───────────────────────────────────────────── */
  const statsContainer = $('.stats');
  if (statsContainer && C.stats) {
    statsContainer.innerHTML = '';
    C.stats.forEach((s, i) => {
      if (i > 0) {
        const div = document.createElement('div');
        div.className = 'stats__divider';
        statsContainer.appendChild(div);
      }
      const item = document.createElement('div');
      item.className = 'stats__item';
      const isNum = typeof s.value === 'number';
      item.innerHTML =
        '<span class="stats__number"' + (isNum ? ' data-target="' + s.value + '"' : '') + '>'
        + (isNum ? '0' : s.value) + '</span>'
        + (s.suffix ? '<span class="stats__suffix">' + s.suffix + '</span>' : '')
        + '<span class="stats__label">' + s.label + '</span>';
      statsContainer.appendChild(item);
    });
  }

  /* ── Links: OpenClaw ─────────────────────────────────── */
  setAllAttr('[data-link-openclaw]', 'href', C.links.openclaw);

  /* ── Features ────────────────────────────────────────── */
  setText('[data-features-tag]', C.features.tag);
  setText('[data-features-title]', C.features.title);
  setText('[data-features-desc]', C.features.description);

  /* ── How It Works ───────────────────────────────────── */
  if (C.howItWorks) {
    setText('[data-hiw-tag]', C.howItWorks.tag);
    setText('[data-hiw-title]', C.howItWorks.title);

    const hiwSteps = $('.hiw__steps');
    if (hiwSteps && C.howItWorks.steps) {
      hiwSteps.innerHTML = '';
      C.howItWorks.steps.forEach((step, i) => {
        const div = document.createElement('div');
        div.className = 'hiw__step reveal';
        div.innerHTML =
          '<div class="hiw__step-number">' + step.number + '</div>'
          + '<h3 class="hiw__step-title">' + step.title + '</h3>'
          + '<p class="hiw__step-desc">' + step.desc + '</p>';
        hiwSteps.appendChild(div);
        if (i < C.howItWorks.steps.length - 1) {
          var connector = document.createElement('div');
          connector.className = 'hiw__connector reveal';
          connector.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>';
          hiwSteps.appendChild(connector);
        }
      });
    }
  }

  /* ── Use Cases ───────────────────────────────────────── */
  setText('[data-usecases-tag]', C.useCases.tag);
  setText('[data-usecases-title]', C.useCases.title);
  setText('[data-usecases-desc]', C.useCases.description);

  const ucIcons = {
    'eye': '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>',
    'trending-up': '<path d="M3.5 18.5l6-6 4 4L22 6m0 0h-6m6 0v6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>',
    'bell': '<path d="M12 2a6 6 0 0 0-6 6c0 7-3 9-3 9h18s-3-2-3-9a6 6 0 0 0-6-6zm-1.27 19a2 2 0 0 0 3.46 0H10.73z"/>',
    'calendar': '<path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>',
    'map-pin': '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>',
    'share': '<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 18 8a3 3 0 1 0-3-3c0 .24.04.47.09.7L8.04 9.81A2.99 2.99 0 0 0 6 9a3 3 0 1 0 0 6c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65a2.92 2.92 0 0 0 2.92 2.92A2.92 2.92 0 0 0 21 19.08 2.92 2.92 0 0 0 18 16.08z"/>',
    'terminal': '<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V8h16v12zM6 10v8l5-4-5-4zm6 6v2h6v-2h-6z"/>',
    'globe': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>',
  };

  const ucGrid = $('.usecases__grid');
  if (ucGrid && C.useCases.items) {
    ucGrid.innerHTML = '';
    C.useCases.items.forEach((uc) => {
      const card = document.createElement('div');
      card.className = 'usecase-card reveal';
      var iconPath = ucIcons[uc.icon] || '';
      var isStroke = uc.icon === 'trending-up';
      var iconSvg = iconPath
        ? '<svg width="24" height="24" viewBox="0 0 24 24"'
          + (isStroke ? ' fill="none" stroke="#E41F28"' : ' fill="#E41F28"')
          + '>' + iconPath + '</svg>'
        : '';
      card.innerHTML =
        '<div class="usecase-card__icon">' + iconSvg + '</div>'
        + '<h3 class="usecase-card__title">' + uc.title + '</h3>'
        + uc.messages.map((m) =>
          '<div class="usecase-card__msg"><span class="usecase-card__prompt">&gt;</span> ' + m + '</div>'
        ).join('');
      ucGrid.appendChild(card);
    });
  }

  /* ── Comparison ──────────────────────────────────────── */
  setText('[data-comparison-tag]', C.comparison.tag);
  setText('[data-comparison-title]', C.comparison.title);
  setText('[data-comparison-desc]', C.comparison.description);

  const compTable = $('.comparison__table');
  if (compTable && C.comparison.rows) {
    const h = C.comparison.headers;
    compTable.innerHTML =
      '<thead><tr>'
      + '<th class="comparison__feature-col">' + h[0] + '</th>'
      + '<th class="comparison__other-col">' + h[1] + '</th>'
      + '<th class="comparison__seeker-col">' + h[2] + '</th>'
      + '</tr></thead><tbody>'
      + C.comparison.rows.map((r) => {
        const otherCell = r[1] === '\u2717'
          ? '<span class="comparison__x">\u2717</span>'
          : '<span class="comparison__muted">' + r[1] + '</span>';
        const seekerCell = r[2].startsWith('\u2713')
          ? '<span class="comparison__check">\u2713</span>' + r[2].slice(1)
          : r[2];
        return '<tr><td>' + r[0] + '</td><td>' + otherCell + '</td><td>' + seekerCell + '</td></tr>';
      }).join('')
      + '</tbody>';
  }

  /* ── Roadmap ─────────────────────────────────────────── */
  setText('[data-roadmap-tag]', C.roadmap.tag);
  setText('[data-roadmap-title]', C.roadmap.title);

  const rmGrid = $('.roadmap__grid');
  if (rmGrid && C.roadmap.columns) {
    rmGrid.innerHTML = '';
    C.roadmap.columns.forEach((col) => {
      const div = document.createElement('div');
      div.className = 'roadmap__col roadmap__col--' + col.phase + ' reveal';
      div.innerHTML =
        '<div class="roadmap__col-header">'
        + '<span class="roadmap__status roadmap__status--' + col.phase + '"></span> '
        + col.label
        + '</div>'
        + '<ul class="roadmap__list">'
        + col.items.map((item) => '<li>' + item + '</li>').join('')
        + '</ul>';
      rmGrid.appendChild(div);
    });
  }

  /* ── Vision ──────────────────────────────────────────── */
  setHtml('[data-vision-title]', '<span class="gradient-text">' + C.vision.title + '</span>');
  setText('[data-vision-text]', C.vision.text);
  setHtml('[data-vision-tagline]', C.vision.taglineHtml);

  /* ══════════════════════════════════════════════════════
     INTERACTIONS & ANIMATIONS
     ══════════════════════════════════════════════════════ */

  /* ── Scroll-reveal with Intersection Observer ──────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe both initial and dynamically-added .reveal elements
  $$('.reveal').forEach((el) => revealObserver.observe(el));

  /* ── Nav: scroll background ────────────────────────── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Nav: mobile burger toggle ─────────────────────── */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── Stats counter animation ───────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  $$('.stats__number[data-target]').forEach((el) => statsObserver.observe(el));

  /* ── Smooth scroll for anchor links ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPos =
          targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
})();
