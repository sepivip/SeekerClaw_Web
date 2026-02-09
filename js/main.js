/* ═══════════════════════════════════════════════════════════
   SeekerClaw — Main JavaScript
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Scroll-reveal with Intersection Observer ──────── */
  const revealElements = document.querySelectorAll('.reveal');

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

  revealElements.forEach((el) => revealObserver.observe(el));

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

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── Stats counter animation ───────────────────────── */
  const statNumbers = document.querySelectorAll('.stats__number[data-target]');

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

      // Format large numbers with commas
      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
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

  statNumbers.forEach((el) => statsObserver.observe(el));

  /* ── Waitlist form handling ────────────────────────── */
  const form = document.getElementById('waitlistForm');
  const statusEl = document.getElementById('waitlistStatus');

  if (form && statusEl) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnText = form.querySelector('.waitlist__btn-text');
      const btnLoading = form.querySelector('.waitlist__btn-loading');
      const submitBtn = form.querySelector('.waitlist__btn');

      // Show loading
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
          statusEl.textContent = "You're on the list! We'll be in touch.";
          statusEl.className = 'waitlist__status success';
          statusEl.hidden = false;
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch {
        statusEl.textContent =
          'Something went wrong. Please try again or reach out directly.';
        statusEl.className = 'waitlist__status error';
        statusEl.hidden = false;
      }

      // Reset button
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
