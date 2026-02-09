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
  setAttr('[data-link-form]', 'action', C.links.waitlistForm);

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

  /* ── Terminal lines ──────────────────────────────────── */
  const termScreen = $('.hero__phone-screen');
  if (termScreen && C.terminal) {
    // keep header dots, rebuild lines
    const header = termScreen.querySelector('.hero__phone-header');
    termScreen.innerHTML = '';
    if (header) termScreen.appendChild(header);
    C.terminal.forEach((line) => {
      const div = document.createElement('div');
      div.className = 'hero__phone-line';
      div.innerHTML = line.code;
      termScreen.appendChild(div);
    });
    const cursor = document.createElement('div');
    cursor.className = 'hero__phone-cursor';
    termScreen.appendChild(cursor);
  }

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

  /* ── Features ────────────────────────────────────────── */
  setText('[data-features-tag]', C.features.tag);
  setText('[data-features-title]', C.features.title);
  setText('[data-features-desc]', C.features.description);

  /* ── Use Cases ───────────────────────────────────────── */
  setText('[data-usecases-tag]', C.useCases.tag);
  setText('[data-usecases-title]', C.useCases.title);
  setText('[data-usecases-desc]', C.useCases.description);

  const ucGrid = $('.usecases__grid');
  if (ucGrid && C.useCases.items) {
    ucGrid.innerHTML = '';
    C.useCases.items.forEach((uc) => {
      const card = document.createElement('div');
      card.className = 'usecase-card reveal';
      card.innerHTML =
        '<div class="usecase-card__emoji">' + uc.emoji + '</div>'
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

  /* ── Waitlist ────────────────────────────────────────── */
  setText('[data-waitlist-tag]', C.waitlist.tag);
  setText('[data-waitlist-title]', C.waitlist.title);
  setText('[data-waitlist-desc]', C.waitlist.description);
  setAttr('[data-waitlist-input]', 'placeholder', C.waitlist.placeholder);
  setText('[data-waitlist-btn-text]', C.waitlist.buttonText);

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

  /* ── Waitlist form handling ────────────────────────── */
  const form = document.getElementById('waitlistForm');
  const statusEl = document.getElementById('waitlistStatus');

  if (form && statusEl) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnText = form.querySelector('.waitlist__btn-text');
      const btnLoading = form.querySelector('.waitlist__btn-loading');
      const submitBtn = form.querySelector('.waitlist__btn');

      if (btnText) btnText.hidden = true;
      if (btnLoading) btnLoading.hidden = false;
      submitBtn.disabled = true;

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          statusEl.textContent = C.waitlist.successMsg;
          statusEl.className = 'waitlist__status success';
          statusEl.hidden = false;
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch {
        statusEl.textContent = C.waitlist.errorMsg;
        statusEl.className = 'waitlist__status error';
        statusEl.hidden = false;
      }

      if (btnText) btnText.hidden = false;
      if (btnLoading) btnLoading.hidden = true;
      submitBtn.disabled = false;
    });
  }

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
