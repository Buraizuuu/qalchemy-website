(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  var iconMoon = document.getElementById('iconMoon');
  var iconSun = document.getElementById('iconSun');

  // Smooth cross-page transitions: fade in only once fonts are loaded (avoids
  // a fallback-font flash that swaps to Sora/Inter mid-fade and looks like
  // text "enlarging"), fade out before navigating away.
  function reveal() { document.body.classList.add('page-ready'); }
  if (document.fonts && document.fonts.ready) {
    var settled = false;
    document.fonts.ready.then(function () { if (!settled) { settled = true; reveal(); } });
    setTimeout(function () { if (!settled) { settled = true; reveal(); } }, 400);
  } else {
    requestAnimationFrame(reveal);
  }

  // Mobile nav menu
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('is-open') && !navLinks.contains(e.target) && e.target !== navToggle) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var url;
    try { url = new URL(href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin) return;

    e.preventDefault();
    document.body.classList.remove('page-ready');
    setTimeout(function () { location.href = url.href; }, 180);
  });

  function applyTheme(t) {
    if (t) root.setAttribute('data-theme', t);
    if (iconMoon && iconSun) {
      iconMoon.style.display = t === 'dark' ? 'none' : 'block';
      iconSun.style.display = t === 'dark' ? 'block' : 'none';
    }
  }

  var stored = localStorage.getItem('qalchemy-site-theme');
  if (stored) applyTheme(stored);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('qalchemy-site-theme', next);
      applyTheme(next);
    });
  }

  // Scroll-reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Docs TOC scroll spy (only present on docs.html)
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('#toc a'));
  if (tocLinks.length) {
    var targets = tocLinks
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = tocLinks.find(function (a) { return a.getAttribute('href') === '#' + entry.target.id; });
        if (!link) return;
        if (entry.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    targets.forEach(function (t) { spy.observe(t); });
  }
})();
