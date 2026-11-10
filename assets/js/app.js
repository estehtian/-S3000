/* S3000 landing-page interactions — vanilla JavaScript, no dependencies. */
(() => {
  'use strict';

  const nav = document.querySelector('.nav');
  const navLinks = document.querySelector('.nav-links');
  const hero = document.querySelector('#home');

  if (!nav || !navLinks || !hero) return;

  const destinations = {
    '#home': hero,
    '#menu': document.querySelector('.food-plate') || document.querySelector('.scene'),
    '#story': document.querySelector('.tagline') || document.querySelector('.hero-left'),
    '#visit': document.querySelector('.bottom-strip') || document.querySelector('.feature-column'),
  };

  // Give existing navigation links useful destinations even when the page is
  // presented as a single-page landing page without separate content sections.
  Object.entries(destinations).forEach(([hash, target]) => {
    const link = navLinks.querySelector(`a[href="${hash}"]`);
    if (link && target && !target.id) target.id = hash.slice(1);
  });

  const style = document.createElement('style');
  style.textContent = `
    .nav-links a[aria-current="location"] { color: var(--cyan); }
    .nav-links a[aria-current="location"]::after { transform: scaleX(1); }
    .nav-menu-toggle { display: none; }
    @media (max-width: 760px) {
      .nav { flex-wrap: wrap; }
      .nav-menu-toggle {
        display: inline-flex; align-items: center; justify-content: center;
        width: 44px; height: 44px; padding: 0; border-radius: 12px;
        color: var(--cyan); background: rgba(13,35,49,.9);
        border: 1px solid var(--line); font: inherit; font-size: 22px;
        cursor: pointer;
      }
      .nav-menu-toggle:focus-visible { outline: 2px solid var(--lime); outline-offset: 3px; }
      .nav-links.is-open {
        display: flex; flex: 0 0 100%; flex-direction: column; align-items: stretch;
        gap: 4px; padding: 10px 14px; margin-top: 8px; border-radius: 14px;
        background: rgba(4,17,25,.97); border: 1px solid var(--line);
      }
      .nav-links.is-open a { padding: 12px 4px; }
    }
  `;
  document.head.append(style);

  const toggle = document.createElement('button');
  toggle.className = 'nav-menu-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Buka menu navigasi');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'primary-navigation');
  toggle.textContent = '☰';
  navLinks.id = navLinks.id || 'primary-navigation';
  nav.insertBefore(toggle, navLinks);

  const setMenuOpen = (open) => {
    navLinks.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    toggle.textContent = open ? '×' : '☰';
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  const scrollToDestination = (hash, updateHistory = true) => {
    const target = destinations[hash];
    if (!target) return;

    if (updateHistory && window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    setMenuOpen(false);
  };

  navLinks.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !destinations[link.getAttribute('href')]) return;
    event.preventDefault();
    scrollToDestination(link.getAttribute('href'));
  });

  // The hero arrow is styled as a visual CTA in the HTML; make it a real,
  // keyboard-accessible link to the featured menu item.
  const cta = document.querySelector('.cta-arrow');
  if (cta) {
    const link = document.createElement('a');
    link.className = cta.className;
    link.href = '#menu';
    link.setAttribute('aria-label', 'Lihat menu somay komplit');
    cta.replaceWith(link);
  }

  document.addEventListener('click', (event) => {
    if (event.target.closest('.cta-arrow')) {
      event.preventDefault();
      scrollToDestination('#menu');
    }
    if (!nav.contains(event.target) && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
    }
  });

  // Keep the selected navigation item in sync as visitors move through the page.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const activeHash = Object.entries(destinations).find(([, target]) => target === visible.target)?.[0];
      navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
        if (link.getAttribute('href') === activeHash) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { threshold: [0.2, 0.5, 0.8] });

    [...new Set(Object.values(destinations).filter(Boolean))].forEach((target) => observer.observe(target));
  }
})();
