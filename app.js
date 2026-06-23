/* ═══════════════════════════════════════════════════
   STUDIO — UNIFIED APP.JS
   Handles: language, nav/drawer, reveal, social links
   order form, portal, login
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. LANGUAGE ─────────────────────────────────── */
  var lang = localStorage.getItem('s-lang') || 'fa';

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

  /* bind all lang buttons */
  document.addEventListener('click', function (e) {
    if (e.target.matches('.lang-btn, .sb-lang, #drawer-lang, .df-lang')) {
      applyLang(lang === 'fa' ? 'en' : 'fa');
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
      cues.forEach(function (c, j) { c.classList.toggle('active', j === i); });
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
  var loginForm = document.querySelector('[data-login-form]');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var u = (loginForm.querySelector('[name=username]') || loginForm.querySelector('[name=email]') || {}).value || '';
      window.location.href = (u.includes('admin') || u.includes('studio')) ? 'admin.html' : 'client.html';
    });
  }

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
  var page = (document.body.dataset.page || '').toLowerCase();
  document.querySelectorAll('.t-nav a, .sb-nav a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace('.html', '');
    if (href === page || (page === 'home' && href === 'index')) {
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ── 12. APPLY LANGUAGE ON LOAD ──────────────────── */
  applyLang(lang);

})();
