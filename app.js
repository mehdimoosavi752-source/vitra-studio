/* ═══════════════════════════════════════════════════
   STUDIO — UNIFIED APP.JS
   Handles: language, nav/drawer, reveal, social links
   order form, portal, login
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. LANGUAGE ─────────────────────────────────── */
  var storedLang = localStorage.getItem('s-lang');
  if (!localStorage.getItem('s-lang-primary-en')) {
    storedLang = 'en';
    localStorage.setItem('s-lang-primary-en', '1');
  }
  var lang = storedLang === 'fa' || storedLang === 'en' ? storedLang : 'en';

  function applyLang(l) {
    lang = l;
    localStorage.setItem('s-lang', l);
    document.documentElement.lang  = l;
    document.documentElement.dir   = l === 'en' ? 'ltr' : 'rtl';
    document.body.classList.toggle('is-ltr', l === 'en');

    /* translate all [data-fa][data-en] */
    document.querySelectorAll('[data-fa][data-en]').forEach(function (el) {
      el.textContent = l === 'en' ? el.dataset.en : el.dataset.fa;
    });
    /* placeholders */
    document.querySelectorAll('[data-fa-placeholder][data-en-placeholder]').forEach(function (el) {
      el.placeholder = l === 'en' ? el.dataset.enPlaceholder : el.dataset.faPlaceholder;
    });
    /* meta content (description, etc.) */
    document.querySelectorAll('[data-fa-content][data-en-content]').forEach(function (el) {
      el.content = l === 'en' ? el.dataset.enContent : el.dataset.faContent;
    });
    /* image alt text */
    document.querySelectorAll('img[data-fa-alt][data-en-alt]').forEach(function (el) {
      el.alt = l === 'en' ? el.dataset.enAlt : el.dataset.faAlt;
    });
    /* options inside selects */
    document.querySelectorAll('option[data-fa][data-en]').forEach(function (el) {
      el.textContent = l === 'en' ? el.dataset.en : el.dataset.fa;
    });
    /* lang buttons */
    document.querySelectorAll('.lang-btn, .sb-lang, .df-lang').forEach(function (b) {
      b.textContent = l === 'en' ? 'FA' : 'EN';
    });
    /* drawer lang button text */
    var dl = document.getElementById('drawer-lang');
    if (dl) dl.textContent = l === 'en' ? 'Switch to FA' : 'Switch to EN';
    /* order code label if present */
    var codeLabel = document.getElementById('order-code-label');
    if (codeLabel) codeLabel.textContent = l === 'en' ? 'Tracking code' : 'کد پیگیری';
  }
  window.__applyLang = applyLang;

  /* bind all lang buttons */
  document.addEventListener('click', function (e) {
    if (e.target.matches('.lang-btn, .sb-lang, #drawer-lang, .df-lang')) {
      applyLang(lang === 'fa' ? 'en' : 'fa');
      if (typeof applySiteContent === 'function') applySiteContent();
    }
  });

  /* ── 2. TOPBAR / DRAWER ──────────────────────────── */
  var menuBtn  = document.getElementById('menu-btn');
  var drawer   = document.getElementById('nav-drawer');
  var overlay  = document.getElementById('nav-overlay');
  var dClose   = document.getElementById('drawer-close');
  var isOpen   = false;

  function openDrawer() {
    isOpen = true;
    if (drawer)  { drawer.classList.add('open');  drawer.setAttribute('aria-hidden','false'); }
    if (overlay) overlay.classList.add('open');
    if (menuBtn) { menuBtn.classList.add('open');  menuBtn.setAttribute('aria-expanded','true'); }
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    isOpen = false;
    if (drawer)  { drawer.classList.remove('open');  drawer.setAttribute('aria-hidden','true'); }
    if (overlay) overlay.classList.remove('open');
    if (menuBtn) { menuBtn.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); }
    document.body.style.overflow = '';
  }
  if (menuBtn)  menuBtn.addEventListener('click', function () { isOpen ? closeDrawer() : openDrawer(); });
  if (dClose)   dClose.addEventListener('click', closeDrawer);
  if (overlay)  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen) closeDrawer(); });
  if (drawer) drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });

  /* ── 3. HERO SCROLL ──────────────────────────────── */
  var wrap   = document.getElementById('hero-wrap');
  var vid    = document.getElementById('hero-vid');
  var fill   = document.getElementById('hero-fill');
  var dots   = document.querySelectorAll('.hero-dot');
  var cues   = document.querySelectorAll('.hero-cue');
  var topbar = document.getElementById('topbar');

  if (wrap && vid) {
    var N = cues.length;
    var cur = -1, raf = false, ready = false;
    var reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    vid.autoplay = false; vid.loop = false; vid.pause();

    function topbarState() {
      if (!topbar) return;
      topbar.classList.toggle('over-hero', window.scrollY < wrap.offsetTop + wrap.offsetHeight - 60);
    }
    function progress() {
      return Math.max(0, Math.min(1, (window.scrollY - wrap.offsetTop) / wrap.offsetHeight));
    }
    function setCue(i) {
      if (i === cur) return; cur = i;
      cues.forEach(function (c, j) {
        c.classList.toggle('active', j === i);
        c.setAttribute('aria-hidden', j === i ? 'false' : 'true');
        c.querySelectorAll('a').forEach(function (a) { a.tabIndex = j === i ? 0 : -1; });
      });
      dots.forEach(function (d, j) { d.classList.toggle('active', j === i); });
    }
    function tick() {
      raf = false; topbarState();
      var p = progress();
      if (fill) fill.style.width = (p * 100) + '%';
      var z = Math.max(0, Math.min(N - 1, Math.floor((window.scrollY - wrap.offsetTop) / (wrap.offsetHeight / N))));
      setCue(z);
      if (!reduced && ready && vid.duration) {
        var t = Math.min(p * vid.duration, vid.duration - .08);
        if (Math.abs(vid.currentTime - t) > .015) vid.currentTime = t;
      }
    }
    function onScroll() { if (!raf) { raf = true; requestAnimationFrame(tick); } }

    function initHero() {
      vid.pause(); vid.currentTime = 0; ready = true;
      setCue(0); topbarState();
      window.addEventListener('scroll', onScroll, { passive: true });
      tick();
    }

    if (reduced) {
      setCue(0); topbarState();
      window.addEventListener('scroll', function () {
        topbarState();
        setCue(Math.max(0, Math.min(N - 1, Math.floor((window.scrollY - wrap.offsetTop) / (wrap.offsetHeight / N)))));
      }, { passive: true });
    } else if (vid.readyState >= 1) {
      initHero();
    } else {
      vid.addEventListener('loadedmetadata', initHero, { once: true });
      setCue(0); topbarState();
      setTimeout(function () { if (!ready) initHero(); }, 3000);
    }
  } else if (topbar) {
    /* non-home pages: just keep topbar solid */
    topbar.classList.remove('over-hero');
  }

  /* ── 4. SCROLL REVEAL ────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });
      revealEls.forEach(function (el) { obs.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ── 5. SOCIAL LINKS ─────────────────────────────── */
  function syncSocials() {
    var defaults = {
      instagram: 'https://instagram.com/',
      telegram:  'https://t.me/',
      whatsapp:  'https://wa.me/',
      linkedin:  'https://linkedin.com/',
      email:     'mailto:hello@studio.ir'
    };
    document.querySelectorAll('[data-social-link]').forEach(function (a) {
      var k = a.dataset.socialLink;
      a.href = localStorage.getItem('s-social-' + k) || defaults[k] || '#';
    });
  }
  syncSocials();

  document.querySelectorAll('[data-save-socials]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-social-input]').forEach(function (inp) {
        localStorage.setItem('s-social-' + inp.dataset.socialInput, inp.value);
      });
      syncSocials();
      btn.textContent = lang === 'en' ? 'Saved' : 'ذخیره شد';
    });
  });

  /* ── 6. ORDER FORM ───────────────────────────────── */
  function makeCode() {
    var d = new Date();
    return 'STD-' + d.getFullYear() +
      String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0') +
      '-' + Math.floor(1000 + Math.random() * 9000);
  }

  document.querySelectorAll('[data-order-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var code = makeCode();
      var data = {
        code: code,
        name:    (form.querySelector('[name=name]') || {}).value || '',
        phone:   (form.querySelector('[name=phone]') || {}).value || '',
        email:   (form.querySelector('[name=email]') || {}).value || '',
        service: (form.querySelector('[name=service]') || {}).value || '',
        budget:  (form.querySelector('[name=budget]') || {}).value || '',
        brief:   (form.querySelector('[name=brief]') || {}).value || '',
        features: [].slice.call(form.querySelectorAll('[name=features]:checked')).map(function (c) { return c.value; }),
        at: new Date().toISOString()
      };
      var all = JSON.parse(localStorage.getItem('s-orders') || '[]');
      all.unshift(data); localStorage.setItem('s-orders', JSON.stringify(all.slice(0, 30)));

      var res = form.nextElementSibling;
      if (res && res.classList.contains('order-result')) {
        res.hidden = false;
        var codeEl = res.querySelector('.order-code');
        if (codeEl) codeEl.textContent = code;
        res.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      var sub = form.querySelector('[type=submit]');
      if (sub) sub.textContent = lang === 'en' ? 'Request submitted ✓' : 'درخواست ثبت شد ✓';
      renderOrders();
    });
  });

  /* ── 7. RENDER ORDERS IN PORTAL ─────────────────── */
  function renderOrders() {
    var orders = JSON.parse(localStorage.getItem('s-orders') || '[]');
    document.querySelectorAll('[data-orders-list]').forEach(function (list) {
      if (!orders.length) {
        list.innerHTML = '<p style="color:var(--faint);font-size:13px;padding:12px 0">' +
          (lang === 'en' ? 'No requests yet.' : 'هنوز درخواستی ثبت نشده.') + '</p>';
        return;
      }
      list.innerHTML = orders.map(function (o) {
        return '<tr><td><strong>' + o.code + '</strong></td><td>' + (o.name || '-') + '</td>' +
          '<td>' + (o.service || '-') + '</td><td>' + (o.budget || '-') + '</td>' +
          '<td><span class="badge badge-green">' + (lang === 'en' ? 'New' : 'جدید') + '</span></td></tr>';
      }).join('');
    });
  }
  renderOrders();

  /* ── 8. LOGIN ────────────────────────────────────── */
  var AUTH_KEY = 's-auth-user';
  var demoAccounts = {
    'vitra-admin': {
      password: 'Vitra@2026',
      role: 'admin',
      name: 'Vitra Studio Admin',
      nameFa: 'مدیر ویترا استودیو',
      email: 'admin@vitra.studio'
    },
    'admin@vitra.studio': {
      password: 'Vitra@2026',
      role: 'admin',
      name: 'Vitra Studio Admin',
      nameFa: 'مدیر ویترا استودیو',
      email: 'admin@vitra.studio'
    },
    'vitra-client': {
      password: 'Client@2026',
      role: 'client',
      name: 'Demo Client',
      nameFa: 'مشتری نمونه',
      email: 'client@vitra.studio'
    },
    'client@vitra.studio': {
      password: 'Client@2026',
      role: 'client',
      name: 'Demo Client',
      nameFa: 'مشتری نمونه',
      email: 'client@vitra.studio'
    }
  };

  function getAuthUser() {
    try { return JSON.parse(sessionStorage.getItem(AUTH_KEY)) || null; }
    catch(e) { return null; }
  }

  function setAuthUser(user) {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }

  function clearAuthUser() {
    sessionStorage.removeItem(AUTH_KEY);
  }

  var loginForm = document.querySelector('[data-login-form]');
  if (loginForm) {
    document.querySelectorAll('[data-fill-login]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var kind = btn.dataset.fillLogin;
        var username = kind === 'client' ? 'vitra-client' : 'vitra-admin';
        var password = kind === 'client' ? 'Client@2026' : 'Vitra@2026';
        var userInput = loginForm.querySelector('[name=username]');
        var passInput = loginForm.querySelector('[name=password]');
        if (userInput) userInput.value = username;
        if (passInput) passInput.value = password;
      });
    });

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var u = ((loginForm.querySelector('[name=username]') || loginForm.querySelector('[name=email]') || {}).value || '').trim().toLowerCase();
      var p = ((loginForm.querySelector('[name=password]') || {}).value || '').trim();
      var account = demoAccounts[u];
      var loginScope = loginForm.dataset.loginScope || (document.body.dataset.page === 'admin-login' ? 'admin' : 'any');
      var error = document.querySelector('[data-login-error]');
      var scopeMismatch = account && loginScope !== 'any' && account.role !== loginScope;
      if (!account || account.password !== p || scopeMismatch) {
        if (error) {
          error.hidden = false;
          error.textContent = lang === 'en' ? 'Username or password is incorrect for this portal.' : 'نام کاربری یا رمز عبور برای این پنل درست نیست.';
        }
        return;
      }
      setAuthUser({
        role: account.role,
        name: account.name,
        nameFa: account.nameFa,
        email: account.email,
        loginAt: new Date().toISOString()
      });
      window.location.href = account.role === 'admin' ? 'admin.html' : 'client.html';
    });
  }

  document.querySelectorAll('[data-logout], .sb-exit, .back-site').forEach(function(link) {
    link.addEventListener('click', function() { clearAuthUser(); });
  });

  function protectPortal() {
    var pageName = (document.body.dataset.page || '').toLowerCase();
    if (pageName !== 'admin' && pageName !== 'client') return;
    var user = getAuthUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }
    if (pageName === 'admin' && user.role !== 'admin') {
      window.location.href = 'client.html';
      return;
    }
    if (pageName === 'client' && user.role !== 'client') {
      window.location.href = 'admin.html';
      return;
    }
    document.body.setAttribute('data-user-role', user.role);
    document.querySelectorAll('[data-auth-name]').forEach(function(el) {
      el.textContent = lang === 'en' ? user.name : (user.nameFa || user.name);
    });
    document.querySelectorAll('[data-auth-email]').forEach(function(el) {
      el.textContent = user.email;
    });
  }

  protectPortal();

  /* ── 9. PORTAL TICKETS ───────────────────────────── */
  document.querySelectorAll('[data-new-ticket]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var list = document.querySelector('[data-ticket-list]');
      if (!list) return;
      var title = prompt(lang === 'en' ? 'Ticket subject:' : 'موضوع تیکت:');
      if (!title) return;
      var row = document.createElement('div');
      row.className = 'ticket-item';
      row.innerHTML = '<span class="t-dot urgent"></span><div><b>' + title +
        '</b><span>' + (lang === 'en' ? 'Just now — Open' : 'همین الان — باز') + '</span></div>';
      list.prepend(row);
      var cnt = document.querySelector('[data-ticket-count]');
      if (cnt) cnt.textContent = String(parseInt(cnt.textContent || 0) + 1);
    });
  });

  /* ── 10. BUDGET RANGE ────────────────────────────── */
  var bRange = document.querySelector('[data-budget]');
  var bOut   = document.querySelector('[data-budget-out]');
  if (bRange && bOut) {
    function updateBudget() {
      bOut.textContent = lang === 'en'
        ? 'About ' + bRange.value + 'M toman'
        : 'حدود ' + new Intl.NumberFormat('fa-IR').format(bRange.value) + ' میلیون تومان';
    }
    bRange.addEventListener('input', updateBudget);
    updateBudget();
  }

  /* ── 11. MARK ACTIVE NAV ─────────────────────────── */
  function ensureStudioLabLinks() {
    function makeLink() {
      var a = document.createElement('a');
      a.href = 'studio-lab.html';
      a.dataset.fa = 'توانایی‌ها';
      a.dataset.en = 'Studio Lab';
      a.textContent = 'Studio Lab';
      return a;
    }

    function addLink(container, beforeSelector) {
      if (!container || container.querySelector('a[href="studio-lab.html"]')) return;
      var link = makeLink();
      var before = beforeSelector ? container.querySelector(beforeSelector) : null;
      if (before && before.parentNode === container) container.insertBefore(link, before);
      else container.appendChild(link);
    }

    document.querySelectorAll('.t-nav').forEach(function(nav) {
      addLink(nav, 'a[href="packages.html"], a[href="process.html"], a.cta');
    });
    document.querySelectorAll('.dl').forEach(function(nav) {
      addLink(nav, 'a[href="packages.html"], a[href="process.html"], .d-cta');
    });
    document.querySelectorAll('.footer-nav .footer-col').forEach(function(col) {
      if (col.querySelector('a[href="packages.html"], a[href="process.html"], a[href="faq.html"]')) {
        addLink(col, 'a[href="order.html"]');
      }
    });
  }

  ensureStudioLabLinks();

  var page = (document.body.dataset.page || '').toLowerCase();
  document.querySelectorAll('.t-nav a, .sb-nav a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace('.html', '');
    if (href === page || (page === 'home' && href === 'index')) {
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ── 12. APPLY LANGUAGE ON LOAD ──────────────────── */
  function initPortalPages() {
    var pageName = (document.body.dataset.page || '').toLowerCase();
    if (pageName !== 'admin' && pageName !== 'client') return;

    var main = document.querySelector(pageName === 'admin' ? '.portal-main' : '.real-main');
    var sidebar = document.querySelector(pageName === 'admin' ? '.sidebar nav' : '.real-sidebar nav');
    if (!main || !sidebar) return;

    var defaultPanel = pageName === 'admin' ? 'overview' : 'dashboard';
    var links = Array.prototype.slice.call(sidebar.querySelectorAll('a[href^="#"]'));

    function showPanel(rawId, shouldScroll) {
      var id = (rawId || defaultPanel).replace('#', '');
      var target = main.querySelector('#' + CSS.escape(id));
      if (!target) {
        id = defaultPanel;
        target = main.querySelector('#' + CSS.escape(id));
      }
      if (!target) return;

      main.querySelectorAll(':scope > section[id], :scope > [data-panel-for]').forEach(function(section) {
        var belongsTo = section.getAttribute('data-panel-for');
        var isActive = section.id === id || belongsTo === id;
        section.classList.toggle('active-panel', isActive);
        section.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      links.forEach(function(link) {
        var active = (link.getAttribute('href') || '') === '#' + id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });

      if (shouldScroll !== false) window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var id = (link.getAttribute('href') || '').replace('#', '') || defaultPanel;
        if (location.hash !== '#' + id) location.hash = id;
        showPanel(id, true);
      });
    });

    window.addEventListener('hashchange', function() {
      showPanel(location.hash || defaultPanel, true);
    });
    showPanel(location.hash || defaultPanel, false);
  }

  initPortalPages();

  applyLang(lang);

  /* ── 12b. WORDPRESS-LIKE SITE EDITOR ─────────────── */
  var SITE_CONTENT_KEY = 's-site-content';
  var THEME_KEY = 's-theme-settings';
  var editableBlocks = {
    'site.brand': {
      page: 'global',
      label: 'Site identity',
      selector: '.brand-name, .dh-brand',
      fa: 'استودیو',
      en: 'Studio'
    },
    'home.hero.tag': {
      page: 'home',
      label: 'Homepage hero label',
      selector: '.hero-cue[data-cue="0"] .hero-tag',
      fa: 'طراحی دیجیتال — نسل بعدی',
      en: 'Digital Design — Next Generation'
    },
    'home.hero.title': {
      page: 'home',
      label: 'Homepage headline',
      selector: '.hero-cue[data-cue="0"] h1',
      fa: 'آخرین باری که سایتت برات مشتری آورد، کی بود؟',
      en: 'When was the last time your website brought you a client?'
    },
    'home.hero.sub': {
      page: 'home',
      label: 'Homepage supporting copy',
      selector: '.hero-cue[data-cue="0"] .sub',
      fa: 'ما سایت نمی‌سازیم — سیستم رشد می‌سازیم.',
      en: "We don't build websites — we build growth systems."
    },
    'home.hero.ctaPrimary': {
      page: 'home',
      label: 'Primary CTA',
      selector: '.hero-cue[data-cue="0"] .hero-acts .btn-primary',
      fa: 'شروع پروژه',
      en: 'Start project'
    },
    'home.hero.ctaSecondary': {
      page: 'home',
      label: 'Secondary CTA',
      selector: '.hero-cue[data-cue="0"] .hero-acts .btn-ghost',
      fa: 'مشاهده دموها',
      en: 'View demos'
    },
    'home.hero.price': {
      page: 'home',
      label: 'Price note',
      selector: '.hero-cue[data-cue="0"] .price-anchor',
      fa: 'شروع از ۱۸ میلیون تومان',
      en: 'From 18M toman'
    },
    'seo.home.title': {
      page: 'global',
      label: 'Homepage SEO title',
      meta: 'title',
      fa: 'استودیو — طراحی که کار می‌کند',
      en: 'Studio — Design That Works'
    },
    'seo.home.description': {
      page: 'global',
      label: 'Homepage SEO description',
      meta: 'description',
      fa: 'طراحی سایت حرفه‌ای با پنل مدیریت — نسخه اولیه ۲۱ تا ۳۰ روز کاری، تحویل نهایی وابسته به محتوا و اصلاحیه‌ها.',
      en: 'Professional website design with an admin panel — initial draft in 21–30 working days; final launch depends on content and revisions.'
    },
    'services.hero.title': {
      page: 'services',
      label: 'Services page headline',
      selector: 'body[data-page="services"] .page-hero h1',
      fa: 'خدماتی که کسب‌وکار شما را آنلاین می‌کنند',
      en: 'Services that bring your business online'
    },
    'services.hero.lead': {
      page: 'services',
      label: 'Services page intro',
      selector: 'body[data-page="services"] .page-hero .lead',
      fa: 'از طراحی اولیه تا پشتیبانی ماهانه — هر چیزی که برای یک حضور آنلاین حرفه‌ای نیاز دارید.',
      en: 'From initial design to monthly support — everything you need for a professional online presence.'
    },
    'portfolio.hero.title': {
      page: 'portfolio',
      label: 'Portfolio page headline',
      selector: 'body[data-page="portfolio"] .page-hero h1',
      fa: 'دموهایی که می‌شود تجربه کرد',
      en: 'Demos you can actually experience'
    },
    'portfolio.hero.lead': {
      page: 'portfolio',
      label: 'Portfolio page intro',
      selector: 'body[data-page="portfolio"] .page-hero .lead',
      fa: 'مثل سایت واقعی — قابل کلیک، نه فقط تصویر.',
      en: 'Like real websites — clickable, not just screenshots.'
    },
    'packages.hero.title': {
      page: 'packages',
      label: 'Packages page headline',
      selector: 'body[data-page="packages"] .page-hero h1',
      fa: 'پکیج‌هایی برای شروع روشن',
      en: 'Packages with a clear starting point'
    },
    'packages.hero.lead': {
      page: 'packages',
      label: 'Packages page intro',
      selector: 'body[data-page="packages"] .page-hero .lead',
      fa: 'هر پکیج قابل شخصی‌سازی است؛ این‌ها نقطه شروع مذاکره‌اند.',
      en: 'Every package is customizable; these are starting points.'
    },
    'process.hero.title': {
      page: 'process',
      label: 'Process page headline',
      selector: 'body[data-page="process"] .page-hero h1',
      fa: 'فرایندی شفاف، قابل پیگیری و سریع',
      en: 'A transparent, trackable and fast process'
    },
    'process.hero.lead': {
      page: 'process',
      label: 'Process page intro',
      selector: 'body[data-page="process"] .page-hero .lead',
      fa: 'از شناخت تا تحویل، هر مرحله خروجی مشخص دارد.',
      en: 'From discovery to delivery, every step has a clear output.'
    },
    'about.hero.title': {
      page: 'about',
      label: 'About page headline',
      selector: 'body[data-page="about"] .page-hero h1',
      fa: 'استودیویی برای ساخت سایت‌هایی که کار می‌کنند',
      en: 'A studio for websites that work'
    },
    'about.hero.lead': {
      page: 'about',
      label: 'About page intro',
      selector: 'body[data-page="about"] .page-hero .lead',
      fa: 'تمرکز ما روی طراحی زیبا، مسیر فروش روشن و پنل قابل مدیریت است.',
      en: 'We focus on beautiful design, clear sales flow and manageable portals.'
    },
    'faq.hero.title': {
      page: 'faq',
      label: 'FAQ page headline',
      selector: 'body[data-page="faq"] .page-hero h1',
      fa: 'سوالات پرتکرار قبل از شروع پروژه',
      en: 'Frequently asked questions before starting'
    },
    'faq.hero.lead': {
      page: 'faq',
      label: 'FAQ page intro',
      selector: 'body[data-page="faq"] .page-hero .lead',
      fa: 'پاسخ کوتاه به مواردی که قبل از سفارش باید بدانید.',
      en: 'Short answers to what you should know before ordering.'
    },
    'order.hero.title': {
      page: 'order',
      label: 'Order page headline',
      selector: 'body[data-page="order"] .page-hero h1',
      fa: 'شروع پروژه سایت شما',
      en: 'Start your website project'
    },
    'order.hero.lead': {
      page: 'order',
      label: 'Order page intro',
      selector: 'body[data-page="order"] .page-hero .lead',
      fa: 'چند سؤال کوتاه جواب دهید تا مسیر، زمان و بودجه پروژه روشن شود.',
      en: 'Answer a few short questions so we can clarify scope, timeline and budget.'
    }
  };

  function getSiteContent() {
    try { return JSON.parse(localStorage.getItem(SITE_CONTENT_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function saveSiteContent(data) {
    localStorage.setItem(SITE_CONTENT_KEY, JSON.stringify(data));
  }

  function blockValue(key) {
    var saved = getSiteContent()[key] || {};
    var def = editableBlocks[key] || {};
    return {
      fa: saved.fa || def.fa || '',
      en: saved.en || def.en || '',
      label: def.label || key
    };
  }

  function applySiteContent() {
    var currentLang = document.documentElement.lang === 'fa' ? 'fa' : 'en';
    Object.keys(editableBlocks).forEach(function(key) {
      var def = editableBlocks[key];
      var value = blockValue(key);
      if (def.meta === 'title') {
        if (document.body.dataset.page !== 'home') return;
        document.title = value[currentLang] || value.en || value.fa || document.title;
        return;
      }
      if (def.meta === 'description') {
        if (document.body.dataset.page !== 'home') return;
        var desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', value[currentLang] || value.en || value.fa || '');
        return;
      }
      document.querySelectorAll(def.selector).forEach(function(el) {
        el.dataset.fa = value.fa;
        el.dataset.en = value.en;
        el.textContent = currentLang === 'en' ? value.en : value.fa;
      });
    });
  }

  function applyThemeSettings() {
    var theme = {};
    try { theme = JSON.parse(localStorage.getItem(THEME_KEY)) || {}; } catch(e) {}
    if (theme.accent) document.documentElement.style.setProperty('--accent', theme.accent);
    if (theme.leaf) document.documentElement.style.setProperty('--leaf', theme.leaf);
    if (theme.radius) document.documentElement.style.setProperty('--r', theme.radius + 'px');
  }

  applyThemeSettings();
  applySiteContent();

  function initSiteEditor() {
    var pagesList = document.querySelector('[data-wp-pages-list]');
    if (pagesList) {
      var pages = [
        ['Home', 'index.html', 'home'], ['Services', 'services.html', 'services'], ['Demos', 'portfolio.html', 'portfolio'],
        ['Packages', 'packages.html', 'packages'], ['Process', 'process.html', 'process'], ['FAQ', 'faq.html', 'faq'],
        ['About', 'about.html', 'about'], ['Order', 'order.html', 'order'], ['Audit', 'audit.html', 'global']
      ];
      pagesList.innerHTML = pages.map(function(p) {
        return '<tr><td><strong>' + p[0] + '</strong></td><td>' + p[1] + '</td>' +
          '<td><span class="badge badge-green">' + (lang === 'en' ? 'Published' : 'منتشرشده') + '</span></td>' +
          '<td><a class="btn btn-outline btn-sm" href="#content" data-edit-page="' + p[2] + '">' + (lang === 'en' ? 'Edit' : 'ویرایش') + '</a> ' +
          '<a class="btn btn-outline btn-sm" target="_blank" href="' + p[1] + '">' + (lang === 'en' ? 'View' : 'نمایش') + '</a></td></tr>';
      }).join('');
    }

    var form = document.getElementById('site-editor-form');
    if (form) {
      var pageInput = form.querySelector('[name=editorPage]');
      var keyInput = form.querySelector('[name=contentKey]');
      var faInput = form.querySelector('[name=fa]');
      var enInput = form.querySelector('[name=en]');
      var typeInput = form.querySelector('[name=contentType]');
      var previewTitle = document.querySelector('[data-editor-preview-title]');
      var previewBody = document.querySelector('[data-editor-preview-body]');
      var status = document.querySelector('[data-site-editor-status]');

      function fillBlockOptions() {
        var selectedPage = pageInput ? pageInput.value : 'home';
        var keys = Object.keys(editableBlocks).filter(function(key) {
          return (editableBlocks[key].page || 'global') === selectedPage;
        });
        if (!keys.length) keys = Object.keys(editableBlocks).filter(function(key) {
          return (editableBlocks[key].page || 'global') === 'global';
        });
        keyInput.innerHTML = keys.map(function(key) {
          return '<option value="' + key + '">' + ((editableBlocks[key] || {}).label || key) + '</option>';
        }).join('');
      }

      function loadBlock() {
        if (!keyInput.value) fillBlockOptions();
        var key = keyInput.value;
        var value = blockValue(key);
        faInput.value = value.fa;
        enInput.value = value.en;
        if (typeInput) typeInput.value = editableBlocks[key] && editableBlocks[key].meta ? 'SEO meta' : 'Text block';
        if (previewTitle) previewTitle.textContent = value.label;
        if (previewBody) previewBody.textContent = lang === 'en' ? value.en : value.fa;
      }

      if (pageInput) pageInput.addEventListener('change', function() {
        fillBlockOptions();
        loadBlock();
      });
      keyInput.addEventListener('change', loadBlock);
      [faInput, enInput].forEach(function(input) {
        input.addEventListener('input', function() {
          if (previewBody) previewBody.textContent = lang === 'en' ? enInput.value : faInput.value;
        });
      });

      var copyEn = document.querySelector('[data-editor-copy-en]');
      var copyFa = document.querySelector('[data-editor-copy-fa]');
      if (copyEn) copyEn.addEventListener('click', function(){ faInput.value = enInput.value; faInput.dispatchEvent(new Event('input')); });
      if (copyFa) copyFa.addEventListener('click', function(){ enInput.value = faInput.value; enInput.dispatchEvent(new Event('input')); });

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var all = getSiteContent();
        all[keyInput.value] = { fa: faInput.value.trim(), en: enInput.value.trim(), updatedAt: new Date().toISOString() };
        saveSiteContent(all);
        applySiteContent();
        if (status) {
          status.textContent = lang === 'en' ? 'Saved and published in this browser.' : 'ذخیره و در همین مرورگر منتشر شد.';
          setTimeout(function(){ status.textContent = ''; }, 2600);
        }
      });

      var reset = document.querySelector('[data-reset-site-content]');
      if (reset) reset.addEventListener('click', function() {
        if (!confirm(lang === 'en' ? 'Reset edited site content?' : 'محتوای ویرایش‌شده ریست شود؟')) return;
        localStorage.removeItem(SITE_CONTENT_KEY);
        loadBlock();
        applySiteContent();
      });

      document.querySelectorAll('[data-edit-page]').forEach(function(link) {
        link.addEventListener('click', function() {
          if (!pageInput) return;
          pageInput.value = link.dataset.editPage || 'home';
          fillBlockOptions();
          loadBlock();
        });
      });

      fillBlockOptions();
      loadBlock();
    }

    document.querySelectorAll('[data-asset]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var path = btn.dataset.asset;
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(path);
        var st = document.querySelector('[data-media-status]');
        if (st) st.textContent = (lang === 'en' ? 'Copied: ' : 'کپی شد: ') + path;
      });
    });
    var mediaUpload = document.querySelector('[data-media-upload]');
    if (mediaUpload) mediaUpload.addEventListener('change', function() {
      var file = mediaUpload.files && mediaUpload.files[0];
      var grid = document.querySelector('[data-media-library]');
      if (!file || !grid) return;
      var reader = new FileReader();
      reader.onload = function() {
        var btn = document.createElement('button');
        btn.className = 'media-item';
        btn.type = 'button';
        btn.dataset.asset = file.name;
        btn.innerHTML = '<img src="' + reader.result + '" alt="' + ((document.querySelector('[data-media-alt]') || {}).value || file.name) + '"/><span>' + file.name + '</span>';
        grid.prepend(btn);
        var st = document.querySelector('[data-media-status]');
        if (st) st.textContent = lang === 'en' ? 'Demo media added to this browser.' : 'رسانه نمایشی در همین مرورگر اضافه شد.';
        logActivity(lang === 'en' ? 'Demo media added' : 'رسانه نمایشی اضافه شد');
      };
      reader.readAsDataURL(file);
    });

    var saveTheme = document.querySelector('[data-save-theme]');
    if (saveTheme) {
      saveTheme.addEventListener('click', function() {
        var accent = (document.querySelector('[data-theme-color="accent"]') || {}).value || '#2d6a4f';
        var leaf = (document.querySelector('[data-theme-color="leaf"]') || {}).value || '#52b788';
        var radius = (document.querySelector('[data-theme-radius]') || {}).value || 18;
        localStorage.setItem(THEME_KEY, JSON.stringify({ accent: accent, leaf: leaf, radius: radius }));
        applyThemeSettings();
        saveTheme.textContent = lang === 'en' ? 'Saved ✓' : 'ذخیره شد ✓';
        setTimeout(function(){ saveTheme.textContent = lang === 'en' ? 'Save appearance' : 'ذخیره ظاهر'; }, 1800);
      });
    }
  }

  initSiteEditor();

  /* ── 12x. SHOWCASE INTERACTIONS ─────────────────── */
  (function(){
    var stage = document.querySelector('.hero-product-stage');
    if (stage && window.matchMedia('(min-width: 760px)').matches) {
      window.addEventListener('scroll', function(){
        var y = Math.min(window.scrollY / 900, 1);
        stage.style.transform = 'translateY(' + (y * 48) + 'px) rotate(' + (y * -2) + 'deg)';
        stage.style.opacity = String(1 - y * .22);
      }, { passive:true });
    }

    var tabData = {
      pages:   { title: 'Page editor', bars: ['82%','64%','94%'] },
      leads:   { title: 'Lead CRM', bars: ['72%','88%','56%'] },
      seo:     { title: 'SEO preview', bars: ['92%','78%','68%'] },
      reports: { title: 'Live reports', bars: ['58%','96%','84%'] }
    };
    document.querySelectorAll('[data-admin-tab]').forEach(function(btn){
      btn.addEventListener('click', function(){
        document.querySelectorAll('[data-admin-tab]').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var data = tabData[btn.dataset.adminTab] || tabData.pages;
        var title = document.querySelector('[data-preview-title]');
        if (title) title.textContent = data.title;
        document.querySelectorAll('.preview-bars i').forEach(function(bar, i){ bar.style.width = data.bars[i] || '70%'; });
      });
    });

    var orderForm = document.querySelector('[data-order-form]');
    if (orderForm) {
      var service = orderForm.querySelector('[name=service]');
      var budget = orderForm.querySelector('[name=budget]');
      var boxes = orderForm.querySelectorAll('[name=features]');
      function updateConfig(){
        var selected = service && service.options[service.selectedIndex] ? service.options[service.selectedIndex].textContent : 'Website';
        var checked = [].slice.call(boxes).filter(function(b){ return b.checked; });
        var base = parseInt((budget || {}).value || 30, 10);
        var estimate = base + checked.length * 4;
        var daysMin = 21 + checked.length * 2 + (service && service.value === 'shop' ? 7 : 0);
        var daysMax = 30 + checked.length * 3 + (service && service.value === 'shop' ? 10 : 0);
        var title = document.querySelector('[data-config-title]');
        var price = document.querySelector('[data-config-price]');
        var time = document.querySelector('[data-config-time]');
        var tags = document.querySelector('[data-config-tags]');
        if (title) title.textContent = selected;
        if (price) price.textContent = estimate + 'M';
        if (time) time.textContent = days + (lang === 'en' ? ' days' : ' روز');
        if (tags) tags.innerHTML = checked.map(function(b){ return '<span>' + (b.nextElementSibling ? b.nextElementSibling.textContent : b.value) + '</span>'; }).join('') || '<span>' + (lang === 'en' ? 'Core website' : 'سایت پایه') + '</span>';
      }
      if (service) service.addEventListener('change', updateConfig);
      if (budget) budget.addEventListener('input', updateConfig);
      boxes.forEach(function(b){ b.addEventListener('change', updateConfig); });
      updateConfig();
    }
  })();

  /* ── 12c. ADMIN/CLIENT MODULES ───────────────────── */
  function storageList(key, defaults) {
    try {
      var saved = JSON.parse(localStorage.getItem(key));
      return Array.isArray(saved) ? saved : defaults;
    } catch(e) { return defaults; }
  }
  function saveList(key, list) { localStorage.setItem(key, JSON.stringify(list)); }
  function logActivity(text) {
    var items = storageList('s-activity-log', []);
    items.unshift({ text: text, at: new Date().toLocaleString() });
    saveList('s-activity-log', items.slice(0, 30));
    renderActivityLog();
  }
  function renderActivityLog() {
    var el = document.querySelector('[data-admin-activity]');
    if (!el) return;
    var items = storageList('s-activity-log', [
      { text: lang === 'en' ? 'Role-based access enabled' : 'دسترسی نقش‌محور فعال شد', at: lang === 'en' ? 'Today' : 'امروز' }
    ]);
    el.innerHTML = items.map(function(i) {
      return '<div><b>' + i.text + '</b><span>' + i.at + '</span></div>';
    }).join('');
  }

  function renderPosts() {
    var el = document.querySelector('[data-admin-posts]');
    if (!el) return;
    var posts = storageList('s-posts', [
      { title: 'چک‌لیست طراحی سایت حرفه‌ای', category: 'طراحی سایت', excerpt: 'قبل از شروع طراحی سایت، این موارد را مشخص کنید.', status: 'published' }
    ]);
    el.innerHTML = posts.map(function(p) {
      return '<div><b>' + p.title + '</b><span>' + p.category + ' · ' + p.status + '</span><small>' + p.excerpt + '</small></div>';
    }).join('');
  }
  var postForm = document.querySelector('[data-post-form]');
  if (postForm) postForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var posts = storageList('s-posts', []);
    posts.unshift({
      title: postForm.querySelector('[name=title]').value,
      category: postForm.querySelector('[name=category]').value,
      excerpt: postForm.querySelector('[name=excerpt]').value,
      status: postForm.querySelector('[name=status]').value
    });
    saveList('s-posts', posts);
    renderPosts();
    logActivity(lang === 'en' ? 'Blog post saved' : 'نوشته وبلاگ ذخیره شد');
  });
  renderPosts();

  function renderServicesAdmin() {
    var el = document.querySelector('[data-admin-services]');
    if (!el) return;
    var services = storageList('s-services', [
      { nameFa: 'طراحی سایت جدید', nameEn: 'New Website Design', price: 'از ۱۸ میلیون تومان', timeline: '۱۰–۱۲ روز کاری', status: 'فعال' },
      { nameFa: 'سئو و محتوا', nameEn: 'SEO and Content', price: 'ماهانه', timeline: '۳۰ روزه', status: 'فعال' }
    ]);
    el.innerHTML = services.map(function(s) {
      return '<div><b>' + (lang === 'en' ? s.nameEn : s.nameFa) + '</b><span>' + s.price + ' · ' + s.timeline + ' · ' + s.status + '</span></div>';
    }).join('');
  }
  var serviceForm = document.querySelector('[data-service-form]');
  if (serviceForm) serviceForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var services = storageList('s-services', []);
    services.unshift({
      nameFa: serviceForm.querySelector('[name=nameFa]').value,
      nameEn: serviceForm.querySelector('[name=nameEn]').value,
      price: serviceForm.querySelector('[name=price]').value,
      timeline: serviceForm.querySelector('[name=timeline]').value,
      status: serviceForm.querySelector('[name=status]').value
    });
    saveList('s-services', services);
    renderServicesAdmin();
    logActivity(lang === 'en' ? 'Service saved' : 'خدمت ذخیره شد');
  });
  renderServicesAdmin();

  ['input','change'].forEach(function(evt) {
    document.querySelectorAll('[data-seo-title],[data-seo-desc],[data-seo-schema]').forEach(function(el) {
      el.addEventListener(evt, function() {
        var title = (document.querySelector('[data-seo-title]') || {}).value || '';
        var desc = (document.querySelector('[data-seo-desc]') || {}).value || '';
        var gt = document.querySelector('[data-google-title]');
        var gd = document.querySelector('[data-google-desc]');
        if (gt) gt.textContent = title;
        if (gd) gd.textContent = desc;
      });
    });
  });

  function renderLeadCrm() {
    var el = document.querySelector('[data-lead-crm-list]');
    if (!el) return;
    var leads = storageList('s-leads', [
      { name: 'Allameh Sokhan', service: 'Academy website', priority: 'High', status: 'Follow-up', follow: 'Tomorrow', note: 'Needs pricing call' },
      { name: 'Luna Beauty', service: 'Salon marketplace', priority: 'Medium', status: 'Proposal sent', follow: 'Friday', note: 'Waiting for approval' }
    ]);
    el.innerHTML = leads.map(function(l, i) {
      return '<tr><td>' + l.name + '</td><td>' + l.service + '</td><td><span class="badge badge-orange">' + l.priority + '</span></td>' +
        '<td>' + l.status + '</td><td>' + l.follow + '</td><td><input data-lead-note="' + i + '" value="' + l.note + '"/></td></tr>';
    }).join('');
    document.querySelectorAll('[data-lead-note]').forEach(function(input) {
      input.addEventListener('change', function() {
        var list = storageList('s-leads', leads);
        list[parseInt(input.dataset.leadNote, 10)].note = input.value;
        saveList('s-leads', list);
        logActivity(lang === 'en' ? 'Lead note updated' : 'یادداشت لید به‌روزرسانی شد');
      });
    });
  }
  renderLeadCrm();
  var exportLeads = document.querySelector('[data-export-leads]');
  if (exportLeads) exportLeads.addEventListener('click', function() {
    var leads = storageList('s-leads', []);
    var csv = 'name,service,priority,status,follow,note\n' + leads.map(function(l) {
      return [l.name,l.service,l.priority,l.status,l.follow,l.note].map(function(v){ return '"' + String(v || '').replace(/"/g,'""') + '"'; }).join(',');
    }).join('\n');
    var out = document.querySelector('[data-backup-output]');
    if (out) out.value = csv;
    logActivity(lang === 'en' ? 'Leads exported as CSV' : 'خروجی CSV لیدها ساخته شد');
  });

  var exportBackup = document.querySelector('[data-export-backup]');
  if (exportBackup) exportBackup.addEventListener('click', function() {
    var backup = {};
    ['s-site-content','s-theme-settings','s-posts','s-leads','s-testimonials','s-popups','s-activity-log'].forEach(function(k) {
      backup[k] = localStorage.getItem(k);
    });
    var out = document.querySelector('[data-backup-output]');
    if (out) out.value = JSON.stringify(backup, null, 2);
    logActivity(lang === 'en' ? 'Backup generated' : 'بکاپ ساخته شد');
  });
  var importBackup = document.querySelector('[data-import-backup]');
  if (importBackup) importBackup.addEventListener('click', function() {
    localStorage.setItem('s-theme-settings', JSON.stringify({ accent: '#2d6a4f', leaf: '#52b788', radius: 18 }));
    applyThemeSettings();
    logActivity(lang === 'en' ? 'Sample backup restored' : 'بکاپ نمونه بازیابی شد');
  });
  renderActivityLog();

  var submitChange = document.querySelector('[data-submit-change]');
  if (submitChange) submitChange.addEventListener('click', function() {
    var wrap = document.querySelector('[data-client-change-form]');
    var list = document.querySelector('[data-client-change-list]');
    if (!wrap || !list) return;
    var pageField = wrap.querySelector('input');
    var typeField = wrap.querySelector('select');
    var descField = wrap.querySelector('textarea');
    var item = document.createElement('div');
    item.innerHTML = '<b>' + (pageField ? pageField.value : 'Change request') + '</b><span>' + (typeField ? typeField.value : 'Change') + ' · ' + (lang === 'en' ? 'Sent' : 'ارسال شد') + '</span><small>' + (descField ? descField.value : '') + '</small>';
    list.prepend(item);
  });
  document.querySelectorAll('[data-approve-item]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var row = btn.closest('div');
      if (!row) return;
      var span = row.querySelector('span');
      if (span) span.textContent = lang === 'en' ? 'Approved' : 'تایید شد';
      btn.textContent = lang === 'en' ? 'Done' : 'انجام شد';
      btn.disabled = true;
    });
  });



  /* ── 13. TESTIMONIALS SYSTEM ─────────────────────── */
  var TESTI_KEY = 's-testimonials';

  function getTestimonials() {
    var defaults = [
      { id: 1, name: 'محمد رضایی', role: 'مدیر کلینیک دکتر رضایی', nameEn: 'Mohammad Rezaei', roleEn: 'Director, Dr. Rezaei Clinic', text: '«سایت ما در ۱۲ روز تحویل شد. پنل مدیریت دقیقاً همان چیزی بود که می‌خواستیم — بدون نیاز به طراح.»', textEn: '"Our site was delivered in 12 days. The admin portal was exactly what we needed — no developer required."', stars: 5, published: true, avatar: 'م' },
      { id: 2, name: 'سارا احمدی', role: 'مدیر آموزشگاه نوا', nameEn: 'Sara Ahmadi', roleEn: 'Director, Nova Academy', text: '«ثبت‌نام آنلاین دانش‌آموزان از صفر به روزانه ۱۵ نفر رسید. پنل ساده و کاربردیه.»', textEn: '"Online student enrollment went from zero to 15 per day. The portal is simple and practical."', stars: 5, published: true, avatar: 'س' },
      { id: 3, name: 'رضا نوری', role: 'صاحب فروشگاه Volt Shop', nameEn: 'Reza Nouri', roleEn: 'Owner, Volt Shop', text: '«فروشگاه آنلاین ما در ۱۸ روز راه افتاد. طراحی موبایل بی‌نقصه.»', textEn: '"The first store draft was prepared quickly; final launch followed revisions and mobile QA."', stars: 5, published: false, avatar: 'ر' }
    ];
    try { return JSON.parse(localStorage.getItem(TESTI_KEY)) || defaults; } catch(e) { return defaults; }
  }

  function saveTestimonials(list) {
    localStorage.setItem(TESTI_KEY, JSON.stringify(list));
  }

  /* Render testimonials on public pages */
  function renderPublicTestimonials() {
    var containers = document.querySelectorAll('[data-testi-public]');
    if (!containers.length) return;
    var list = getTestimonials().filter(function(t){ return t.published; });
    containers.forEach(function(c) {
      c.innerHTML = list.map(function(t) {
        var name = lang === 'en' ? (t.nameEn || t.name) : t.name;
        var role = lang === 'en' ? (t.roleEn || t.role) : t.role;
        var text = lang === 'en' ? (t.textEn || t.text) : t.text;
        return '<div class="t-card reveal in">' +
          '<div class="t-stars">' + '★'.repeat(t.stars || 5) + '</div>' +
          '<p>' + text + '</p>' +
          '<div class="t-author">' +
            '<div class="t-avatar">' + (t.avatar || name[0]) + '</div>' +
            '<div><b>' + name + '</b><small>' + role + '</small></div>' +
          '</div></div>';
      }).join('');
    });
  }

  /* Render testimonials in admin panel */
  function renderAdminTestimonials() {
    var list_el = document.getElementById('admin-testi-list');
    if (!list_el) return;
    var list = getTestimonials();
    list_el.innerHTML = list.map(function(t, i) {
      return '<div class="testi-admin-item" data-testi-id="' + t.id + '">' +
        '<div class="ta-head">' +
          '<div><span class="ta-name">' + t.name + '</span> &nbsp;<span class="ta-meta">' + t.role + '</span></div>' +
          '<div style="display:flex;gap:6px;align-items:center">' +
            '<span class="' + (t.published ? 'tag-published' : 'tag-draft') + '">' +
              (t.published ? (lang==='en'?'Published':'منتشرشده') : (lang==='en'?'Draft':'پیش‌نویس')) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="ta-text">' + t.text + '</div>' +
        '<div class="ta-actions">' +
          '<button class="btn btn-outline btn-sm" onclick="editTesti(' + i + ')" data-fa="ویرایش" data-en="Edit">' + (lang==='en'?'Edit':'ویرایش') + '</button>' +
          '<button class="btn btn-outline btn-sm" onclick="toggleTesti(' + i + ')" data-fa="' + (t.published?'پنهان':'انتشار') + '" data-en="' + (t.published?'Unpublish':'Publish') + '">' +
            (t.published ? (lang==='en'?'Unpublish':'پنهان‌کردن') : (lang==='en'?'Publish':'انتشار')) + '</button>' +
          '<button class="btn btn-sm" style="background:rgba(239,68,68,.1);color:#dc2626;border:1px solid rgba(239,68,68,.2)" onclick="deleteTesti(' + i + ')" data-fa="حذف" data-en="Delete">' + (lang==='en'?'Delete':'حذف') + '</button>' +
        '</div>' +
      '</div>';
    }).join('') || '<p style="color:var(--faint);font-size:13px">هنوز نظری ثبت نشده.</p>';
  }

  window.editTesti = function(i) {
    var list = getTestimonials();
    var t = list[i];
    if (!t) return;
    var f = document.getElementById('testi-form');
    if (!f) return;
    f.querySelector('[name=tname]').value = t.name || '';
    f.querySelector('[name=tnameEn]').value = t.nameEn || '';
    f.querySelector('[name=trole]').value = t.role || '';
    f.querySelector('[name=troleEn]').value = t.roleEn || '';
    f.querySelector('[name=ttext]').value = t.text || '';
    f.querySelector('[name=ttextEn]').value = t.textEn || '';
    f.querySelector('[name=tstars]').value = t.stars || 5;
    f.querySelector('[name=tpublished]').value = t.published ? '1' : '0';
    f.dataset.editId = t.id;
    f.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  window.toggleTesti = function(i) {
    var list = getTestimonials();
    if (!list[i]) return;
    list[i].published = !list[i].published;
    saveTestimonials(list);
    renderAdminTestimonials();
    renderPublicTestimonials();
  };

  window.deleteTesti = function(i) {
    var list = getTestimonials();
    if (confirm(lang === 'en' ? 'Delete this testimonial?' : 'این نظر حذف شود؟')) {
      list.splice(i, 1);
      saveTestimonials(list);
      renderAdminTestimonials();
    }
  };

  /* Save new/edit testimonial form */
  var testiForm = document.getElementById('testi-form');
  if (testiForm) {
    testiForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var list = getTestimonials();
      var editId = testiForm.dataset.editId ? parseInt(testiForm.dataset.editId) : null;
      var newT = {
        id: editId || Date.now(),
        name:      testiForm.querySelector('[name=tname]').value,
        nameEn:    testiForm.querySelector('[name=tnameEn]').value,
        role:      testiForm.querySelector('[name=trole]').value,
        roleEn:    testiForm.querySelector('[name=troleEn]').value,
        text:      testiForm.querySelector('[name=ttext]').value,
        textEn:    testiForm.querySelector('[name=ttextEn]').value,
        stars:     parseInt(testiForm.querySelector('[name=tstars]').value) || 5,
        published: testiForm.querySelector('[name=tpublished]').value === '1',
        avatar:    testiForm.querySelector('[name=tname]').value[0] || 'م'
      };
      if (editId) {
        var idx = list.findIndex(function(t){ return t.id === editId; });
        if (idx >= 0) list[idx] = newT; else list.unshift(newT);
      } else {
        list.unshift(newT);
      }
      saveTestimonials(list);
      renderAdminTestimonials();
      renderPublicTestimonials();
      testiForm.reset();
      delete testiForm.dataset.editId;
      var sub = testiForm.querySelector('[type=submit]');
      if (sub) { sub.textContent = lang==='en'?'Saved ✓':'ذخیره شد ✓'; setTimeout(function(){ sub.textContent=lang==='en'?'Save':'ذخیره'; },2000); }
    });
  }

  renderAdminTestimonials();
  renderPublicTestimonials();

  /* ── 14. BACK TO TOP ─────────────────────────────── */
  var bt = document.getElementById('back-top');
  if (bt) {
    window.addEventListener('scroll', function() {
      bt.style.display = window.scrollY > 500 ? 'flex' : 'none';
    }, { passive: true });
    bt.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ── 15. PRICE CALCULATOR IN ADMIN ──────────────── */
  var calcBtn = document.querySelector('[data-calc-price]');
  if (calcBtn) {
    calcBtn.addEventListener('click', function() {
      var pages = parseInt((document.querySelector('[data-pages-count]') || {}).value || 6);
      var panel = parseInt((document.querySelector('[data-panel-level]') || {}).value || 0);
      var base  = pages * 2500000 + panel;
      var res   = document.querySelector('[data-price-result]');
      if (res) res.textContent = lang === 'en'
        ? 'Estimated: ' + Math.round(base/1000000) + 'M toman'
        : 'تخمین: ' + new Intl.NumberFormat('fa-IR').format(Math.round(base/1000000)) + ' میلیون تومان';
    });
  }




  /* ══════════════════════════════════════════════════
     UPGRADE PACK — PREMIUM INTERACTIONS
     ══════════════════════════════════════════════════ */

  /* ── STAGGER REVEAL ──────────────────────────────── */
  var revEls = document.querySelectorAll('.reveal');
  if (revEls.length && window.IntersectionObserver) {
    var staggerObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (!e.isIntersecting) return;
        var siblings = e.target.parentElement.querySelectorAll('.reveal');
        var idx = Array.prototype.indexOf.call(siblings, e.target);
        e.target.style.transitionDelay = (idx * 75) + 'ms';
        e.target.classList.add('in');
        staggerObs.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
    revEls.forEach(function(el) { staggerObs.observe(el); });
  }

  /* ── COUNTER ANIMATION ───────────────────────────── */
  function animateCount(el, target, suffix, duration) {
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(eased * target);
      var locale = document.documentElement.lang === 'en' ? 'en-US' : 'fa-IR';
      el.textContent = (suffix === '%' ? '' : (locale === 'en-US' ? '+' : '+')) + val.toLocaleString(locale) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      var strong = e.target.querySelector('strong');
      if (!strong || strong.dataset.counted) return;
      strong.dataset.counted = '1';
      var raw = strong.textContent.trim();
      var num = parseInt(raw.replace(/[^0-9]/g, ''), 10);
      var suffix = raw.includes('%') ? '%' : '';
      if (num) animateCount(strong, num, suffix, 1400);
      statObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat, .pp-item').forEach(function(el) { statObs.observe(el); });

  /* ── PHILOSOPHY REVEAL ───────────────────────────── */
  var philObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.philosophy-line').forEach(function(line) {
        line.classList.add('in');
      });
      philObs.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.philosophy-wrap').forEach(function(el) { philObs.observe(el); });

  /* ── MAGNETIC BUTTONS ────────────────────────────── */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.btn-primary, .btn-magnetic').forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (x * 0.14) + 'px,' + (y * 0.14) + 'px)';
        btn.style.transition = 'transform 0.15s ease';
      });
      btn.addEventListener('mouseleave', function() {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      });
    });
  }

  /* ── BEFORE / AFTER SLIDER ───────────────────────── */
  document.querySelectorAll('.ba-wrap').forEach(function(wrap) {
    var active = false;
    var isRtl  = document.documentElement.dir === 'rtl';

    function setPos(clientX) {
      var r   = wrap.getBoundingClientRect();
      var raw = (clientX - r.left) / r.width;
      if (isRtl) raw = 1 - raw;
      var pct = Math.max(5, Math.min(95, raw * 100));
      wrap.style.setProperty('--split', pct + '%');
      var after   = wrap.querySelector('.ba-after');
      var divider = wrap.querySelector('.ba-divider');
      var handle  = wrap.querySelector('.ba-handle');
      if (after) {
        after.style.clipPath = isRtl
          ? 'inset(0 0 0 ' + (100 - pct) + '%)'
          : 'inset(0 ' + (100 - pct) + '% 0 0)';
      }
      if (divider) divider.style[isRtl ? 'right' : 'left'] = pct + '%';
      if (handle)  handle.style[isRtl ? 'right' : 'left']  = pct + '%';
    }

    wrap.addEventListener('mousedown', function(e) { active = true; setPos(e.clientX); });
    wrap.addEventListener('touchstart', function(e) { active = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mousemove', function(e) { if (active) setPos(e.clientX); });
    window.addEventListener('touchmove', function(e) { if (active) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mouseup',   function() { active = false; });
    window.addEventListener('touchend',  function() { active = false; });
  });

  /* ── EXIT INTENT POPUP ───────────────────────────── */
  var exitOverlay = document.getElementById('exit-popup');
  var exitShown   = sessionStorage.getItem('exit-shown');

  if (exitOverlay && !exitShown) {
    var exitTimer = null;

    document.addEventListener('mouseleave', function(e) {
      if (e.clientY < 40 && !exitShown) {
        exitTimer = setTimeout(function() {
          exitShown = true;
          sessionStorage.setItem('exit-shown', '1');
          exitOverlay.classList.add('active');
        }, 200);
      }
    });

    // Also show after 45s of reading
    setTimeout(function() {
      if (!exitShown && !exitOverlay.classList.contains('active')) {
        exitShown = true;
        sessionStorage.setItem('exit-shown', '1');
        exitOverlay.classList.add('active');
      }
    }, 45000);

    document.querySelectorAll('[data-close-exit]').forEach(function(el) {
      el.addEventListener('click', function() {
        exitOverlay.classList.remove('active');
        clearTimeout(exitTimer);
      });
    });
    exitOverlay.addEventListener('click', function(e) {
      if (e.target === exitOverlay) exitOverlay.classList.remove('active');
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') exitOverlay.classList.remove('active');
    });
  }

  /* ── CURSOR GLOW (desktop only) ─────────────────── */
  if (window.matchMedia('(hover: hover) and (min-width: 960px)').matches) {
    var glow = document.createElement('div');
    glow.style.cssText = [
      'position:fixed', 'pointer-events:none', 'z-index:9997',
      'width:320px', 'height:320px', 'border-radius:50%',
      'background:radial-gradient(circle,rgba(82,183,136,.07) 0%,transparent 70%)',
      'transform:translate(-50%,-50%)', 'transition:opacity .4s',
      'top:0', 'left:0', 'opacity:0'
    ].join(';');
    document.body.appendChild(glow);
    var glowX = 0, glowY = 0, glowActive = false;
    document.addEventListener('mousemove', function(e) {
      glowX = e.clientX; glowY = e.clientY;
      if (!glowActive) { glowActive = true; requestAnimationFrame(moveGlow); }
    });
    function moveGlow() {
      glow.style.left = glowX + 'px';
      glow.style.top  = glowY + 'px';
      glow.style.opacity = '1';
      glowActive = false;
    }
    document.addEventListener('mouseleave', function() { glow.style.opacity = '0'; });
  }

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── TOPBAR SCROLL SHRINK ────────────────────────── */
  var topbarEl = document.getElementById('topbar');
  if (topbarEl) {
    window.addEventListener('scroll', function() {
      topbarEl.style.paddingTop    = window.scrollY > 60 ? '8px' : '';
      topbarEl.style.paddingBottom = window.scrollY > 60 ? '8px' : '';
    }, { passive: true });
  }

  /* ── BACK TO TOP ─────────────────────────────────── */
  var bt = document.getElementById('back-top');
  if (bt) {
    window.addEventListener('scroll', function() {
      bt.style.display = window.scrollY > 500 ? 'flex' : 'none';
    }, { passive: true });
    bt.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }




  /* ── POPUP MANAGER SYSTEM ──────────────────────────
     localStorage key: 's-popups' → array of popup objects
     Each: { id, title, body, badge, cta1Text, cta1Href,
             cta2Text, cta2Href, skipText, trigger,
             pages, active, badgeColor, shown }
  ──────────────────────────────────────────────────── */
  var POPUP_KEY = 's-popups';

  function getPopups() {
    var defaults = [
      {
        id: 1,
        title: 'بررسی رایگان سایتت را دریافت کن',
        titleEn: 'Get your free website review',
        body: 'اگه سایت داری، در ۲۰ دقیقه بهت می‌گوییم دقیقاً چه مشکلی داره و چطور می‌توانی مشتری بیشتری از آن بگیری — کاملاً رایگان.',
        bodyEn: "If you have a site, in 20 minutes we'll tell you what's wrong and how to get more clients — completely free.",
        badge: 'قبل از رفتن',
        badgeEn: 'Before you go',
        badgeColor: '#e76f51',
        cta1Text: 'دریافت بررسی رایگان',
        cta1TextEn: 'Get free review',
        cta1Href: 'audit.html',
        cta2Text: 'شروع پروژه',
        cta2TextEn: 'Start project',
        cta2Href: 'order.html',
        skipText: 'نه ممنون، ادامه می‌دهم',
        skipTextEn: 'No thanks',
        trigger: 'exit',   // exit | scroll50 | delay30 | delay45
        pages: ['index'],  // index | all | services | packages | portfolio
        active: true,
      }
    ];
    try {
      var stored = JSON.parse(localStorage.getItem(POPUP_KEY));
      return (stored && stored.length) ? stored : defaults;
    } catch(e) { return defaults; }
  }

  function savePopups(list) {
    localStorage.setItem(POPUP_KEY, JSON.stringify(list));
  }

  /* ── Render admin popup list ── */
  function renderAdminPopups() {
    var el = document.getElementById('admin-popup-list');
    if (!el) return;
    var list = getPopups();
    el.innerHTML = list.map(function(p, i) {
      return '<div class="popup-item">' +
        '<div>' +
          '<div class="popup-item-title">' + p.title + '</div>' +
          '<div class="popup-item-meta">' +
            '<span>Trigger: <b>' + p.trigger + '</b></span>' +
            '<span>Pages: <b>' + p.pages.join(', ') + '</b></span>' +
            '<span class="' + (p.active ? 'tag-active' : 'tag-inactive') + '">' + (p.active ? (lang==='en'?'Active':'فعال') : (lang==='en'?'Inactive':'غیرفعال')) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="popup-item-actions">' +
          '<button class="btn btn-outline btn-sm" onclick="editPopup(' + i + ')" data-fa="ویرایش" data-en="Edit">' + (lang==='en'?'Edit':'ویرایش') + '</button>' +
          '<button class="btn btn-outline btn-sm" onclick="togglePopup(' + i + ')">' + (p.active ? (lang==='en'?'Disable':'غیرفعال') : (lang==='en'?'Enable':'فعال')) + '</button>' +
          '<button class="btn btn-sm" style="background:rgba(239,68,68,.1);color:#dc2626;border:1px solid rgba(239,68,68,.2)" onclick="deletePopup(' + i + ')">' + (lang==='en'?'Delete':'حذف') + '</button>' +
        '</div>' +
      '</div>';
    }).join('') || '<p style="font-size:13px;color:var(--faint)">' + (lang==='en'?'No popups yet.':'هنوز پاپ‌آپی تعریف نشده.') + '</p>';
  }

  window.editPopup = function(i) {
    var list = getPopups();
    var p = list[i];
    if (!p) return;
    var f = document.getElementById('popup-form');
    if (!f) return;
    f.querySelector('[name=ptitle]').value    = p.title || '';
    f.querySelector('[name=ptitleEn]').value  = p.titleEn || '';
    f.querySelector('[name=pbody]').value     = p.body || '';
    f.querySelector('[name=pbodyEn]').value   = p.bodyEn || '';
    f.querySelector('[name=pbadge]').value    = p.badge || '';
    f.querySelector('[name=pbadgeEn]').value  = p.badgeEn || '';
    f.querySelector('[name=pbadgeColor]').value = p.badgeColor || '#e76f51';
    f.querySelector('[name=pcta1text]').value = p.cta1Text || '';
    f.querySelector('[name=pcta1href]').value = p.cta1Href || '';
    f.querySelector('[name=pcta2text]').value = p.cta2Text || '';
    f.querySelector('[name=pcta2href]').value = p.cta2Href || '';
    f.querySelector('[name=pskip]').value     = p.skipText || '';
    f.querySelector('[name=ptrigger]').value  = p.trigger || 'exit';
    f.querySelector('[name=ppages]').value    = (p.pages || []).join(', ');
    f.querySelector('[name=pactive]').value   = p.active ? '1' : '0';
    f.dataset.editId = p.id;
    f.scrollIntoView({ behavior: 'smooth', block: 'center' });
    var title = document.getElementById('popup-form-title');
    if (title) title.textContent = lang === 'en' ? 'Edit popup' : 'ویرایش پاپ‌آپ';
  };

  window.togglePopup = function(i) {
    var list = getPopups();
    if (!list[i]) return;
    list[i].active = !list[i].active;
    savePopups(list);
    renderAdminPopups();
  };

  window.deletePopup = function(i) {
    var list = getPopups();
    var msg = lang === 'en' ? 'Delete this popup?' : 'این پاپ‌آپ حذف شود؟';
    if (confirm(msg)) {
      list.splice(i, 1);
      savePopups(list);
      renderAdminPopups();
    }
  };

  var popupForm = document.getElementById('popup-form');
  if (popupForm) {
    popupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var list = getPopups();
      var editId = popupForm.dataset.editId ? parseInt(popupForm.dataset.editId) : null;
      var pagesRaw = popupForm.querySelector('[name=ppages]').value;
      var pages = pagesRaw.split(',').map(function(s){return s.trim();}).filter(Boolean);
      var np = {
        id:          editId || Date.now(),
        title:       popupForm.querySelector('[name=ptitle]').value,
        titleEn:     popupForm.querySelector('[name=ptitleEn]').value,
        body:        popupForm.querySelector('[name=pbody]').value,
        bodyEn:      popupForm.querySelector('[name=pbodyEn]').value,
        badge:       popupForm.querySelector('[name=pbadge]').value,
        badgeEn:     popupForm.querySelector('[name=pbadgeEn]').value,
        badgeColor:  popupForm.querySelector('[name=pbadgeColor]').value,
        cta1Text:    popupForm.querySelector('[name=pcta1text]').value,
        cta1TextEn:  popupForm.querySelector('[name=pcta1text]').value,
        cta1Href:    popupForm.querySelector('[name=pcta1href]').value,
        cta2Text:    popupForm.querySelector('[name=pcta2text]').value,
        cta2TextEn:  popupForm.querySelector('[name=pcta2text]').value,
        cta2Href:    popupForm.querySelector('[name=pcta2href]').value,
        skipText:    popupForm.querySelector('[name=pskip]').value,
        skipTextEn:  popupForm.querySelector('[name=pskip]').value,
        trigger:     popupForm.querySelector('[name=ptrigger]').value,
        pages:       pages,
        active:      popupForm.querySelector('[name=pactive]').value === '1',
      };
      if (editId) {
        var idx = list.findIndex(function(x){ return x.id === editId; });
        if (idx >= 0) list[idx] = np; else list.unshift(np);
      } else {
        list.unshift(np);
      }
      savePopups(list);
      renderAdminPopups();
      popupForm.reset();
      delete popupForm.dataset.editId;
      var title = document.getElementById('popup-form-title');
      if (title) title.textContent = lang === 'en' ? 'Add new popup' : 'افزودن پاپ‌آپ جدید';
      var sub = popupForm.querySelector('[type=submit]');
      if (sub) { sub.textContent = lang==='en'?'Saved ✓':'ذخیره شد ✓'; setTimeout(function(){ sub.textContent=lang==='en'?'Save':'ذخیره'; },2000); }
      // update stat
      var sc = document.getElementById('stat-popups');
      if (sc) sc.textContent = getPopups().filter(function(p){return p.active;}).length;
    });
  }

  renderAdminPopups();

  /* ── Show popup on public pages ── */
  var popupOverlay = document.getElementById('site-popup-overlay');
  if (popupOverlay) {
    var pageName = (document.body.dataset.page || 'index').toLowerCase();
    var allPopups = getPopups();
    var match = null;
    for (var pi = 0; pi < allPopups.length; pi++) {
      var pp = allPopups[pi];
      if (!pp.active) continue;
      if (pp.pages.indexOf('all') < 0 && pp.pages.indexOf(pageName) < 0) continue;
      var shownKey = 's-popup-shown-' + pp.id;
      if (sessionStorage.getItem(shownKey)) continue;
      match = pp; break;
    }

    if (match) {
      function showSitePopup(p) {
        var isEn = lang === 'en';
        var badge   = document.getElementById('site-popup-badge');
        var titleEl = document.getElementById('site-popup-title');
        var bodyEl  = document.getElementById('site-popup-body');
        var acts    = document.getElementById('site-popup-actions');
        var skip    = document.getElementById('site-popup-skip');
        if (badge) { badge.textContent = isEn ? (p.badgeEn||p.badge) : p.badge; badge.style.background = (p.badgeColor||'#e76f51') + '18'; badge.style.borderColor = (p.badgeColor||'#e76f51') + '30'; badge.style.color = p.badgeColor||'#e76f51'; }
        if (titleEl) titleEl.textContent = isEn ? (p.titleEn||p.title) : p.title;
        if (bodyEl)  bodyEl.textContent  = isEn ? (p.bodyEn||p.body)   : p.body;
        if (acts) {
          acts.innerHTML = '';
          if (p.cta1Text) { var a1 = document.createElement('a'); a1.className='btn btn-primary'; a1.href=p.cta1Href||'#'; a1.textContent=isEn?(p.cta1TextEn||p.cta1Text):p.cta1Text; acts.appendChild(a1); }
          if (p.cta2Text) { var a2 = document.createElement('a'); a2.className='btn btn-outline'; a2.href=p.cta2Href||'#'; a2.textContent=isEn?(p.cta2TextEn||p.cta2Text):p.cta2Text; acts.appendChild(a2); }
        }
        if (skip) { skip.textContent = isEn ? (p.skipTextEn||p.skipText||'Close') : (p.skipText||'بستن'); }
        sessionStorage.setItem('s-popup-shown-' + p.id, '1');
        popupOverlay.classList.add('show');
      }

      function closeSitePopup() { popupOverlay.classList.remove('show'); }
      document.getElementById('site-popup-close').addEventListener('click', closeSitePopup);
      document.getElementById('site-popup-skip').addEventListener('click', closeSitePopup);
      popupOverlay.addEventListener('click', function(e){ if(e.target===popupOverlay) closeSitePopup(); });
      document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeSitePopup(); });

      // trigger
      if (match.trigger === 'exit') {
        var exitFired = false;
        document.addEventListener('mouseleave', function(e){
          if (e.clientY < 40 && !exitFired) { exitFired=true; setTimeout(function(){ showSitePopup(match); },200); }
        });
        setTimeout(function(){ if(!exitFired){ exitFired=true; showSitePopup(match); } }, 45000);
      } else if (match.trigger === 'scroll50') {
        window.addEventListener('scroll', function onScr(){
          if (window.scrollY / (document.body.scrollHeight - window.innerHeight) > 0.5) {
            window.removeEventListener('scroll', onScr);
            showSitePopup(match);
          }
        }, { passive: true });
      } else if (match.trigger === 'delay30') {
        setTimeout(function(){ showSitePopup(match); }, 30000);
      } else if (match.trigger === 'delay45') {
        setTimeout(function(){ showSitePopup(match); }, 45000);
      }
    }
  }

  /* update popup stat in admin */
  var sc = document.getElementById('stat-popups');
  if (sc) sc.textContent = getPopups().filter(function(p){return p.active;}).length;



  /* ══════════════════════════════════════════════════
     PREMIUM INTERACTIONS & ANIMATIONS
     ══════════════════════════════════════════════════ */

  /* ── Page scroll progress bar ─────────────────── */
  var pgBar = document.createElement('div');
  pgBar.className = 'page-progress';
  document.body.prepend(pgBar);
  window.addEventListener('scroll', function(){
    var pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    pgBar.style.transform = 'scaleX(' + Math.min(1, pct) + ')';
  }, { passive:true });

  /* ── Scroll hint on hero ─────────────────────── */
  var heroWrap = document.getElementById('hero-wrap');
  if (heroWrap) {
    var hint = document.createElement('div');
    hint.className = 'scroll-hint';
    hint.innerHTML = '<div class="scroll-hint-wheel"></div><span data-fa="اسکرول کنید" data-en="Scroll">اسکرول کنید</span>';
    var sticky = document.getElementById('hero-sticky');
    if (sticky) sticky.appendChild(hint);
    window.addEventListener('scroll', function(){
      if (window.scrollY > 80 && hint.parentNode) hint.style.opacity = '0';
      else hint.style.opacity = '';
    }, { passive:true });
  }

  /* ── 3D Card tilt ────────────────────────────── */
  if (window.matchMedia('(hover:hover) and (min-width:960px)').matches) {
    document.querySelectorAll('.path-card,.demo-card,.t-card,.pkg-card').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r   = card.getBoundingClientRect();
        var cx  = r.left + r.width  / 2;
        var cy  = r.top  + r.height / 2;
        var dx  = (e.clientX - cx) / (r.width  / 2);
        var dy  = (e.clientY - cy) / (r.height / 2);
        card.style.transform = 'perspective(700px) rotateY(' + (dx * 4) + 'deg) rotateX(' + (-dy * 4) + 'deg) translateY(-4px)';
        card.style.transition = 'transform .12s ease';
        card.style.boxShadow  = '0 20px 50px rgba(28,26,23,.18)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transform  = '';
        card.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .3s';
        card.style.boxShadow  = '';
      });
    });
  }

  /* ── Button ripple effect ────────────────────── */
  document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function(e){
      var r = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      var size = Math.max(r.width, r.height) * 2;
      ripple.className = 'btn-ripple';
      ripple.style.cssText = 'width:' + size + 'px;height:' + size + 'px;' +
        'left:' + (e.clientX - r.left - size/2) + 'px;' +
        'top:'  + (e.clientY - r.top  - size/2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function(){ ripple.remove(); }, 600);
    });
  });

  /* ── Stat glow on counter complete ──────────────── */
  document.querySelectorAll('.stat,.pp-item').forEach(function(el){
    var obs2 = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) {
          setTimeout(function(){
            e.target.classList.add('glowing');
          }, 1200);
          obs2.unobserve(e.target);
        }
      });
    }, { threshold:.8 });
    obs2.observe(el);
  });

  /* ── Typewriter on hero h1 cue 0 ─────────────── */
  (function(){
    var cue0 = document.querySelector('.hero-cue[data-cue="0"] h1');
    if (!cue0) return;
    if (document.documentElement.lang !== 'en') {
      cue0.textContent = cue0.dataset.fa || cue0.textContent;
      return;
    }
    var fullText = cue0.dataset[document.documentElement.lang === 'en' ? 'en' : 'fa'] || cue0.textContent;
    var cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    var done = false;

    function type(el, text, speed) {
      if (done) return;
      el.innerHTML = '';
      el.appendChild(cursor);
      var i = 0;
      var iv = setInterval(function(){
        if (i >= text.length) { clearInterval(iv); done = true; return; }
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
      }, speed);
    }

    // Only run when cue becomes active
    var twObs = new MutationObserver(function(){
      if (cue0.closest('.hero-cue').classList.contains('active') && !done) {
        setTimeout(function(){ type(cue0, fullText, 38); }, 300);
      }
    });
    var parent = cue0.closest('.hero-cue');
    if (parent) twObs.observe(parent, { attributes:true, attributeFilter:['class'] });
    // Also run on page load if already active
    if (parent && parent.classList.contains('active')) {
      setTimeout(function(){ type(cue0, fullText, 38); }, 800);
    }
  })();

  /* ── Demo card hover text ────────────────────── */
  (function(){
    var hoverTexts = {
      'demo-salon.html':      lang==='en' ? 'Click to explore the live demo →' : 'کلیک کنید — دمو زنده →',
      'demo-academy.html':    lang==='en' ? 'Click to explore the live demo →' : 'کلیک کنید — دمو زنده →',
      'demo-clinic.html':     lang==='en' ? 'Click to explore the live demo →' : 'کلیک کنید — دمو زنده →',
      'demo-shop.html':       lang==='en' ? 'Click to explore the live demo →' : 'کلیک کنید — دمو زنده →',
      'demo-restaurant.html': lang==='en' ? 'Click to explore the live demo →' : 'کلیک کنید — دمو زنده →',
    };
    document.querySelectorAll('.demo-card[href]').forEach(function(card){
      var href = card.getAttribute('href');
      var key  = Object.keys(hoverTexts).find(function(k){ return href && href.includes(k); });
      if (key) card.dataset.hoverText = hoverTexts[key];
    });
  })();

  /* ── Reveal left/right/scale for variety ──────── */
  (function(){
    var leftEls  = document.querySelectorAll('.reveal-left,.reveal-right,.reveal-scale');
    if (!leftEls.length || !window.IntersectionObserver) {
      leftEls.forEach(function(el){ el.classList.add('in'); });
      return;
    }
    var o = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); o.unobserve(e.target); }
      });
    },{ threshold:.12 });
    leftEls.forEach(function(el){ o.observe(el); });
  })();

  /* ── Smooth number update on lang change ─────── */
  var _origApply = window.__applyLang;

  /* ── Showcase layer: site-wide visual polish ───────── */
  (function(){
    document.body.classList.add('premium-showcase');

    if (!document.querySelector('.ambient-stage')) {
      var ambient = document.createElement('div');
      ambient.className = 'ambient-stage';
      ambient.setAttribute('aria-hidden', 'true');
      ambient.innerHTML = '<span></span><span></span><span></span>';
      document.body.prepend(ambient);
    }

    if (!document.querySelector('.motion-orbits') && !document.body.classList.contains('portal-body')) {
      var orbits = document.createElement('div');
      orbits.className = 'motion-orbits';
      orbits.setAttribute('aria-hidden', 'true');
      orbits.innerHTML = '<i></i><i></i><i></i><i></i><i></i>';
      document.body.appendChild(orbits);
    }

    if (!document.querySelector('.cursor-light') && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
      var light = document.createElement('div');
      light.className = 'cursor-light';
      light.setAttribute('aria-hidden', 'true');
      document.body.appendChild(light);
      var lx = window.innerWidth / 2, ly = window.innerHeight / 2, tx = lx, ty = ly;
      window.addEventListener('mousemove', function(e){
        tx = e.clientX; ty = e.clientY;
        light.style.opacity = '1';
      }, { passive:true });
      window.addEventListener('mouseleave', function(){ light.style.opacity = '0'; });
      function followLight(){
        lx += (tx - lx) * .14;
        ly += (ty - ly) * .14;
        light.style.transform = 'translate3d(' + lx + 'px,' + ly + 'px,0)';
        requestAnimationFrame(followLight);
      }
      followLight();
    }

    document.querySelectorAll('main > .wrap.sec, main section, .sec, .panel-split, .form-wrap, .portal-grid, .manager-grid').forEach(function(el, i){
      if (!el.classList.contains('showcase-block')) el.classList.add('showcase-block');
      el.style.setProperty('--block-i', String(i % 7));
    });

    document.querySelectorAll('.path-card,.demo-card,.pkg-card,.svc-card,.t-card,.p-card,.manager-card,.ps-card,.stat,.pf-item,.faq-item,.deliverable-grid a').forEach(function(card){
      card.classList.add('premium-card');
      if (!card.querySelector(':scope > .card-shine')) {
        var shine = document.createElement('span');
        shine.className = 'card-shine';
        shine.setAttribute('aria-hidden', 'true');
        card.appendChild(shine);
      }
    });

    if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
      document.querySelectorAll('.premium-card').forEach(function(card){
        card.addEventListener('mousemove', function(e){
          var r = card.getBoundingClientRect();
          var x = ((e.clientX - r.left) / r.width) * 100;
          var y = ((e.clientY - r.top) / r.height) * 100;
          card.style.setProperty('--mx', x + '%');
          card.style.setProperty('--my', y + '%');
        });
      });
    }

    document.querySelectorAll('h1,h2').forEach(function(h){
      if (!h.closest('.portal-body') && !h.classList.contains('gradient-title')) {
        h.classList.add('gradient-title');
      }
    });

    document.querySelectorAll('.sec-head,.page-hero,.panel-info,.form-wrap,.cta-band').forEach(function(el){
      if (!el.querySelector(':scope > .section-accent')) {
        var accent = document.createElement('span');
        accent.className = 'section-accent';
        accent.setAttribute('aria-hidden', 'true');
        el.prepend(accent);
      }
    });

    var showcaseObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('showcase-in');
          showcaseObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.showcase-block,.premium-card,.gradient-title').forEach(function(el){
      showcaseObserver.observe(el);
    });
  })();


})();
