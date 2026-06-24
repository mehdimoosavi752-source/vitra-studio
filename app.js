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



  /* ── 13. TESTIMONIALS SYSTEM ─────────────────────── */
  var TESTI_KEY = 's-testimonials';

  function getTestimonials() {
    var defaults = [
      { id: 1, name: 'محمد رضایی', role: 'مدیر کلینیک دکتر رضایی', nameEn: 'Mohammad Rezaei', roleEn: 'Director, Dr. Rezaei Clinic', text: '«سایت ما در ۱۲ روز تحویل شد. پنل مدیریت دقیقاً همان چیزی بود که می‌خواستیم — بدون نیاز به طراح.»', textEn: '"Our site was delivered in 12 days. The admin portal was exactly what we needed — no developer required."', stars: 5, published: true, avatar: 'م' },
      { id: 2, name: 'سارا احمدی', role: 'مدیر آموزشگاه نوا', nameEn: 'Sara Ahmadi', roleEn: 'Director, Nova Academy', text: '«ثبت‌نام آنلاین دانش‌آموزان از صفر به روزانه ۱۵ نفر رسید. پنل ساده و کاربردیه.»', textEn: '"Online student enrollment went from zero to 15 per day. The portal is simple and practical."', stars: 5, published: true, avatar: 'س' },
      { id: 3, name: 'رضا نوری', role: 'صاحب فروشگاه Volt Shop', nameEn: 'Reza Nouri', roleEn: 'Owner, Volt Shop', text: '«فروشگاه آنلاین ما در ۱۸ روز راه افتاد. طراحی موبایل بی‌نقصه.»', textEn: '"Our online store launched in 18 days. The mobile design is flawless."', stars: 5, published: false, avatar: 'ر' }
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
      el.textContent = (suffix === '%' ? '' : '+') + val.toLocaleString('fa-IR') + suffix;
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


})();