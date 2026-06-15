(() => {
  'use strict';

  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose= document.getElementById('mobile-close');
  const iconMenu   = document.getElementById('icon-menu');
  const iconClose  = document.getElementById('icon-close');

  // ── Nav scroll state ──────────────────────────────────────
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 48);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile menu ───────────────────────────────────────────
  let menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    hamburger.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    iconMenu.hidden  =  open;
    iconClose.hidden = !open;
    if (open) {
      mobileClose.focus();
    } else {
      hamburger.focus();
    }
  }

  hamburger.addEventListener('click', () => setMenu(!menuOpen));
  mobileClose.addEventListener('click', () => setMenu(false));

  // Close on any nav link click
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) setMenu(false);
  });

  // ── Smooth scroll offset for fixed nav ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
