/* ═══════════════════════════════════════════════════════════
   SeekerClaw — Shared Components (Nav + Footer)
   ───────────────────────────────────────────────────────────
   Injects consistent nav and footer into every page.
   Reads link definitions from SITE_CONFIG.
   Must load AFTER config.js and BEFORE main.js.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var C = window.SITE_CONFIG;
  if (!C) return;

  /* ── Page detection ────────────────────────────────── */
  function getCurrentPage() {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return file;
  }

  function isIndex() {
    var p = getCurrentPage();
    return p === '' || p === '/' || p === 'index.html';
  }

  function resolveHref(link) {
    if (link.type === 'page') return link.href;
    // Anchor links: on index page use as-is, elsewhere prefix with index.html
    return isIndex() ? link.href : 'index.html' + link.href;
  }

  function isActive(link) {
    var current = getCurrentPage();
    if (link.type === 'page') return link.href === current;
    return false;
  }

  /* ── Build nav HTML ────────────────────────────────── */
  function buildNav() {
    var logoHref = isIndex() ? '#' : 'index.html';

    var linksHtml = C.nav.links.map(function (link) {
      var cls = 'nav__link' + (isActive(link) ? ' nav__link--active' : '');
      return '<a href="' + resolveHref(link) + '" class="' + cls + '">' + link.label + '</a>';
    }).join('');

    return ''
      + '<nav class="nav" id="nav" aria-label="Main navigation">'
      + '  <div class="nav__container">'
      + '    <a href="' + logoHref + '" class="nav__logo">'
      + '      <img src="' + C.brand.logo + '" alt="' + C.brand.name + '" class="nav__logo-img">'
      + '      <span class="nav__logo-text">' + C.brand.nameHtml + '</span>'
      + '    </a>'
      + '    <div class="nav__links" id="navLinks">' + linksHtml + '</div>'
      + '    <a href="' + C.links.dappStore + '" class="btn btn--primary nav__cta">' + C.nav.ctaLabel + '</a>'
      + '    <button class="nav__burger" id="navBurger" aria-label="Toggle menu">'
      + '      <span></span><span></span><span></span>'
      + '    </button>'
      + '  </div>'
      + '</nav>';
  }

  /* ── Build footer HTML ─────────────────────────────── */
  function buildFooter() {
    var logoHref = isIndex() ? '#' : 'index.html';

    var linksHtml = C.footer.links.map(function (link) {
      return '<a href="' + resolveHref(link) + '" class="footer__link">' + link.label + '</a>';
    }).join('');

    var githubSvg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>';
    var xSvg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';
    var telegramSvg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>';

    return ''
      + '<footer class="footer">'
      + '  <div class="container">'
      + '    <div class="footer__top">'
      + '      <div class="footer__brand">'
      + '        <a href="' + logoHref + '" class="nav__logo">'
      + '          <img src="' + C.brand.logo + '" alt="' + C.brand.name + '" class="nav__logo-img">'
      + '          <span class="nav__logo-text">' + C.brand.nameHtml + '</span>'
      + '        </a>'
      + '        <p class="footer__tagline">' + C.brand.tagline + '</p>'
      + '      </div>'
      + '      <div class="footer__links">' + linksHtml + '</div>'
      + '      <div class="footer__social">'
      + '        <a href="' + C.links.github + '" class="footer__social-link" aria-label="GitHub">' + githubSvg + '</a>'
      + '        <a href="' + C.links.x + '" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="X (Twitter)">' + xSvg + '</a>'
      + '        <a href="' + C.links.telegram + '" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Telegram">' + telegramSvg + '</a>'
      + '      </div>'
      + '    </div>'
      + '    <div class="footer__bottom">'
      + '      <p>' + C.brand.footer + '</p>'
      + '      <p class="footer__powered-by">Powered by <a href="' + C.links.openclaw + '" target="_blank" rel="noopener noreferrer">OpenClaw</a> \u2014 open-source AI agent framework</p>'
      + '    </div>'
      + '  </div>'
      + '</footer>';
  }

  /* ── Inject into page ──────────────────────────────── */
  var navSlot = document.getElementById('site-nav');
  var footerSlot = document.getElementById('site-footer');

  if (navSlot) navSlot.innerHTML = buildNav();
  if (footerSlot) footerSlot.innerHTML = buildFooter();

  /* ── Graceful logo fallback (replaces inline onerror) ── */
  document.querySelectorAll('.nav__logo-img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });
})();
