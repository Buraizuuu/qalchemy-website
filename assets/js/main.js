(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  var iconMoon = document.getElementById('iconMoon');
  var iconSun = document.getElementById('iconSun');

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

  // Dynamic copyright year
  var yearEls = document.querySelectorAll('.js-year');
  if (yearEls.length) {
    var currentYear = String(new Date().getFullYear());
    yearEls.forEach(function (el) { el.textContent = currentYear; });
  }

  // Mobile footer accordion
  var footCols = document.querySelectorAll('.foot-col');
  if (footCols.length) {
    footCols.forEach(function (col) {
      var heading = col.querySelector('h5');
      var list = col.querySelector('ul');
      if (!heading || !list) return;
      heading.setAttribute('role', 'button');
      heading.setAttribute('tabindex', '0');
      heading.setAttribute('aria-expanded', 'false');
      heading.addEventListener('click', function () {
        if (!matchMedia('(max-width: 640px)').matches) return;
        var isOpen = col.classList.toggle('is-open');
        heading.setAttribute('aria-expanded', String(isOpen));
      });
      heading.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          heading.click();
        }
      });
    });
  }

  // Back to top
  var backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 19V5m0 0l-6 6m6-6l6 6"/></svg>';
  document.body.appendChild(backToTop);
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('is-visible', window.scrollY > 480);
  }, { passive: true });

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

  // Docs search (only present on docs.html)
  var searchInput = document.getElementById('docsSearch');
  var docsContent = document.querySelector('.docs-content');
  if (searchInput && docsContent) {
    var articles = Array.prototype.slice.call(docsContent.querySelectorAll('article'));

    var countEl = document.createElement('p');
    countEl.className = 'docs-search-count';
    countEl.style.display = 'none';
    searchInput.closest('.docs-search').insertAdjacentElement('afterend', countEl);

    var noResults = document.createElement('p');
    noResults.className = 'docs-no-results';
    noResults.textContent = 'No sections match your search.';
    noResults.style.display = 'none';
    docsContent.appendChild(noResults);

    function clearHighlights() {
      Array.prototype.slice.call(docsContent.querySelectorAll('mark.docs-hit')).forEach(function (m) {
        var parent = m.parentNode;
        parent.replaceChild(document.createTextNode(m.textContent), m);
        parent.normalize();
      });
    }

    function highlight(el, query) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function (node) {
        var text = node.nodeValue;
        var idx = text.toLowerCase().indexOf(query);
        if (idx === -1) return;
        var frag = document.createDocumentFragment();
        var rest = text;
        while (idx !== -1) {
          frag.appendChild(document.createTextNode(rest.slice(0, idx)));
          var mark = document.createElement('mark');
          mark.className = 'docs-hit';
          mark.textContent = rest.slice(idx, idx + query.length);
          frag.appendChild(mark);
          rest = rest.slice(idx + query.length);
          idx = rest.toLowerCase().indexOf(query);
        }
        frag.appendChild(document.createTextNode(rest));
        node.parentNode.replaceChild(frag, node);
      });
    }

    function runSearch() {
      var query = searchInput.value.trim().toLowerCase();
      clearHighlights();
      if (!query) {
        articles.forEach(function (a) { a.style.display = ''; });
        tocLinks.forEach(function (a) { a.style.display = ''; });
        Array.prototype.slice.call(document.querySelectorAll('#toc .toc-title')).forEach(function (t) { t.style.display = ''; });
        countEl.style.display = 'none';
        noResults.style.display = 'none';
        return;
      }
      var matches = 0;
      articles.forEach(function (article) {
        var hit = article.textContent.toLowerCase().indexOf(query) !== -1;
        article.style.display = hit ? '' : 'none';
        if (hit) { matches++; highlight(article, query); }
        var tocLink = tocLinks.find(function (a) { return a.getAttribute('href') === '#' + article.id; });
        if (tocLink) tocLink.style.display = hit ? '' : 'none';
      });
      Array.prototype.slice.call(document.querySelectorAll('#toc .toc-title')).forEach(function (title) {
        var el = title.nextElementSibling;
        var anyVisible = false;
        while (el && !el.classList.contains('toc-title')) {
          if (el.tagName === 'A' && el.style.display !== 'none') anyVisible = true;
          el = el.nextElementSibling;
        }
        title.style.display = anyVisible ? '' : 'none';
      });
      countEl.textContent = matches === 1 ? '1 section matches' : matches + ' sections match';
      countEl.style.display = '';
      noResults.style.display = matches ? 'none' : '';
    }

    var searchTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(runSearch, 120);
    });
  }
})();
