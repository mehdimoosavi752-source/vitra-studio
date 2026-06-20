const menuToggle = document.querySelector(".menu-toggle");
let activeLanguage = localStorage.getItem("vitra-language") || "fa";

function enhanceSiteFooters() {
  document.querySelectorAll(".site-footer").forEach((footer) => {
    if (footer.dataset.enhanced === "true") return;
    footer.dataset.enhanced = "true";
    const panel = document.createElement("div");
    panel.className = "footer-professional";
    panel.innerHTML = `
      <div class="footer-service-map">
        <a href="services.html" data-fa="خدمات طراحی و توسعه" data-en="Design and development">خدمات طراحی و توسعه</a>
        <a href="portfolio.html" data-fa="دموهای قابل اجرا" data-en="Live working demos">دموهای قابل اجرا</a>
        <a href="packages.html" data-fa="پکیج و برآورد قیمت" data-en="Packages and pricing">پکیج و برآورد قیمت</a>
        <a href="order.html" data-fa="شروع سفارش مرحله‌ای" data-en="Start a guided order">شروع سفارش مرحله‌ای</a>
      </div>
      <div class="footer-proof">
        <span><b>CMS</b><small data-fa="ویرایش محتوا و قیمت" data-en="Content and pricing control">ویرایش محتوا و قیمت</small></span>
        <span><b>CRM</b><small data-fa="مدیریت مشتری و پروژه" data-en="Client and project tracking">مدیریت مشتری و پروژه</small></span>
        <span><b>Ticket</b><small data-fa="پشتیبانی منظم" data-en="Organized support">پشتیبانی منظم</small></span>
      </div>
      <div class="footer-status">
        <strong data-fa="تحویل شفاف، توسعه‌پذیر و قابل پیگیری" data-en="Transparent, scalable and trackable delivery">تحویل شفاف، توسعه‌پذیر و قابل پیگیری</strong>
        <p data-fa="هر پروژه با صفحه سفارش، پنل، وضعیت اجرا، فایل‌ها، تیکت‌ها و مسیر رشد بعد از تحویل طراحی می‌شود." data-en="Every project is designed with order flow, portal, execution status, files, tickets and a growth path after launch.">هر پروژه با صفحه سفارش، پنل، وضعیت اجرا، فایل‌ها، تیکت‌ها و مسیر رشد بعد از تحویل طراحی می‌شود.</p>
      </div>
    `;
    footer.append(panel);
    const footerMap = footer.querySelector(".footer-service-map");
    if (footerMap && !footerMap.querySelector('a[href="panel.html"]')) {
      const panelLink = document.createElement("a");
      panelLink.href = "panel.html";
      panelLink.dataset.fa = "پنل مدیریت Vitra";
      panelLink.dataset.en = "Vitra management panel";
      panelLink.textContent = "پنل مدیریت Vitra";
      footerMap.insertBefore(panelLink, footerMap.querySelector('a[href="packages.html"]'));
    }
  });
}

function enhancePrimaryNav() {
  document.querySelectorAll(".nav").forEach((nav) => {
    if (nav.dataset.vitraEnhanced === "true") return;
    nav.dataset.vitraEnhanced = "true";
    const orderLink = nav.querySelector('a[href="order.html"]');
    const panelLink = document.createElement("a");
    panelLink.href = "panel.html";
    panelLink.dataset.fa = "پنل Vitra";
    panelLink.dataset.en = "Vitra Panel";
    panelLink.textContent = "پنل Vitra";
    nav.insertBefore(panelLink, orderLink || null);
  });
}

function enhanceHomePage() {
  if (document.body.dataset.page !== "home") return;

  const capabilityRail = document.querySelector(".capability-rail");
  if (capabilityRail && !document.querySelector(".home-service-paths")) {
    capabilityRail.insertAdjacentHTML(
      "afterend",
      `
      <section class="section home-service-paths">
        <div class="section-head">
          <div>
            <p class="section-kicker">Service Paths</p>
            <h2 data-fa="مشتری باید از همان صفحه اول مسیر مناسب خودش را پیدا کند" data-en="Clients should find the right path from the first page">مشتری باید از همان صفحه اول مسیر مناسب خودش را پیدا کند</h2>
            <p data-fa="به جای اینکه همه چیز در یک متن طولانی بماند، خدمات در سه مسیر قابل انتخاب چیده شده‌اند: ساخت سایت، بازطراحی و سیستم اختصاصی." data-en="Instead of a long generic message, services are organized into three clear choices: new website, redesign and custom system.">به جای اینکه همه چیز در یک متن طولانی بماند، خدمات در سه مسیر قابل انتخاب چیده شده‌اند: ساخت سایت، بازطراحی و سیستم اختصاصی.</p>
          </div>
          <a class="text-link" href="services.html" data-fa="جزئیات خدمات" data-en="Service details">جزئیات خدمات</a>
        </div>
        <div class="service-path-grid">
          <article>
            <span>01</span>
            <h3 data-fa="طراحی سایت جدید" data-en="New website design">طراحی سایت جدید</h3>
            <p data-fa="برای کسب‌وکارهایی که می‌خواهند سریع و حرفه‌ای وارد فضای آنلاین شوند، صفحه خدمات، نمونه کار، فرم سفارش و مسیر تماس ساخته می‌شود." data-en="For businesses launching online with service pages, portfolio, order form and clear contact flow.">برای کسب‌وکارهایی که می‌خواهند سریع و حرفه‌ای وارد فضای آنلاین شوند، صفحه خدمات، نمونه کار، فرم سفارش و مسیر تماس ساخته می‌شود.</p>
            <a href="order.html?service=website" data-fa="شروع این مسیر" data-en="Start this path">شروع این مسیر</a>
          </article>
          <article>
            <span>02</span>
            <h3 data-fa="بازطراحی و ارتقا" data-en="Redesign and upgrade">بازطراحی و ارتقا</h3>
            <p data-fa="برای سایت‌هایی که ظاهر قدیمی، مسیر فروش ضعیف، سرعت پایین یا متن نامطمئن دارند، ساختار، محتوا و تجربه کاربر بازسازی می‌شود." data-en="For outdated websites with weak sales flow, slow speed or unclear copy, structure, content and UX are rebuilt.">برای سایت‌هایی که ظاهر قدیمی، مسیر فروش ضعیف، سرعت پایین یا متن نامطمئن دارند، ساختار، محتوا و تجربه کاربر بازسازی می‌شود.</p>
            <a href="order.html?service=redesign" data-fa="درخواست بازطراحی" data-en="Request redesign">درخواست بازطراحی</a>
          </article>
          <article class="featured">
            <span>03</span>
            <h3 data-fa="پنل و سیستم اختصاصی" data-en="Portal and custom system">پنل و سیستم اختصاصی</h3>
            <p data-fa="برای مدیریت محتوا، قیمت‌ها، خدمات، تیکت، مشتری، فایل‌ها و گزارش‌ها، پنل مدیر و مشتری به سایت وصل می‌شود." data-en="Admin and client portals manage content, prices, services, tickets, clients, files and reports.">برای مدیریت محتوا، قیمت‌ها، خدمات، تیکت، مشتری، فایل‌ها و گزارش‌ها، پنل مدیر و مشتری به سایت وصل می‌شود.</p>
            <a href="panel.html" data-fa="دیدن پنل Vitra" data-en="View Vitra Panel">دیدن پنل Vitra</a>
          </article>
        </div>
      </section>`
    );
  }

  const demos = document.querySelector("#demos");
  if (demos && !document.querySelector(".demo-decision-layer")) {
    demos.insertAdjacentHTML(
      "beforebegin",
      `
      <section class="section demo-decision-layer">
        <div>
          <p class="section-kicker">Demo Strategy</p>
          <h2 data-fa="قبل از ورود به دمو، مشتری می‌فهمد هر نمونه چه قابلیتی را ثابت می‌کند" data-en="Before opening a demo, clients know what each demo proves">قبل از ورود به دمو، مشتری می‌فهمد هر نمونه چه قابلیتی را ثابت می‌کند</h2>
          <p data-fa="دموها فقط تصویر نیستند. هر دمو باید یک سناریوی واقعی را نشان بدهد: رزرو، ثبت نام، فیلتر، سبد خرید، پیگیری سفارش، نوبت‌دهی یا مدیریت محتوا." data-en="Demos are not just visuals. Each demo shows a real scenario: booking, enrollment, filters, cart, order tracking, appointments or content management.">دموها فقط تصویر نیستند. هر دمو باید یک سناریوی واقعی را نشان بدهد: رزرو، ثبت نام، فیلتر، سبد خرید، پیگیری سفارش، نوبت‌دهی یا مدیریت محتوا.</p>
        </div>
        <div class="demo-proof-list">
          <span data-fa="صفحه خانه واقعی" data-en="Real homepage">صفحه خانه واقعی</span>
          <span data-fa="صفحات داخلی" data-en="Inner pages">صفحات داخلی</span>
          <span data-fa="فرم و اکشن" data-en="Forms and actions">فرم و اکشن</span>
          <span data-fa="هویت جداگانه" data-en="Separate identity">هویت جداگانه</span>
        </div>
      </section>`
    );
  }

  const panelTour = document.querySelector("#panel-tour");
  if (panelTour && !document.querySelector(".vitra-panel-product")) {
    panelTour.insertAdjacentHTML(
      "beforebegin",
      `
      <section class="section vitra-panel-product">
        <div class="panel-product-copy">
          <p class="section-kicker">Vitra Panel</p>
          <h2 data-fa="پنل، محصول اصلی پشت سایت است" data-en="The panel is the main product behind the website">پنل، محصول اصلی پشت سایت است</h2>
          <p data-fa="ظاهر سایت ویترین است، اما پنل باعث می‌شود سایت بعد از تحویل زنده بماند. مدیر می‌تواند صفحه بسازد، قیمت تغییر دهد، خدمت اضافه کند، تیکت ببیند و شبکه‌های اجتماعی فوتر را کنترل کند." data-en="The website is the storefront, but the portal keeps it alive after launch. Admins can create pages, edit pricing, add services, view tickets and control footer social links.">ظاهر سایت ویترین است، اما پنل باعث می‌شود سایت بعد از تحویل زنده بماند. مدیر می‌تواند صفحه بسازد، قیمت تغییر دهد، خدمت اضافه کند، تیکت ببیند و شبکه‌های اجتماعی فوتر را کنترل کند.</p>
          <div class="action-row">
            <a class="btn btn-primary" href="panel.html" data-fa="صفحه معرفی پنل" data-en="Panel overview">صفحه معرفی پنل</a>
            <a class="btn btn-ghost" href="admin.html" data-fa="ورود به پنل مدیر" data-en="Open admin panel">ورود به پنل مدیر</a>
          </div>
        </div>
        <div class="panel-product-screen" aria-label="Vitra Panel preview">
          <div><b>CMS</b><span data-fa="صفحه، محتوا، قیمت" data-en="Pages, content, pricing">صفحه، محتوا، قیمت</span></div>
          <div><b>CRM</b><span data-fa="مشتری، پروژه، فایل" data-en="Clients, projects, files">مشتری، پروژه، فایل</span></div>
          <div><b>Ticket</b><span data-fa="پشتیبانی و پیگیری" data-en="Support and follow-up">پشتیبانی و پیگیری</span></div>
          <div><b>Growth</b><span data-fa="گزارش و ارتقا" data-en="Reports and upgrades">گزارش و ارتقا</span></div>
        </div>
      </section>`
    );
  }

  const calculator = document.querySelector("#calculator");
  if (calculator && !calculator.querySelector(".calculator-trust-note")) {
    calculator.insertAdjacentHTML(
      "afterbegin",
      `<div class="calculator-trust-note">
        <b data-fa="برآورد سریع، نه قیمت قطعی" data-en="Fast estimate, not final pricing">برآورد سریع، نه قیمت قطعی</b>
        <span data-fa="این ماشین حساب کمک می‌کند مشتری محدوده بودجه و زمان را بفهمد. قیمت نهایی بعد از بررسی محتوا، امکانات و سطح پنل مشخص می‌شود." data-en="This calculator helps clients understand budget and timeline range. Final pricing depends on content, features and panel level.">این ماشین حساب کمک می‌کند مشتری محدوده بودجه و زمان را بفهمد. قیمت نهایی بعد از بررسی محتوا، امکانات و سطح پنل مشخص می‌شود.</span>
      </div>`
    );
  }
}

function enhanceConversionLayer() {
  enhancePrimaryNav();
  enhanceHomePage();
}

function rememberOriginalText(element) {
  if (!element.dataset.faOriginal) {
    element.dataset.faOriginal = element.textContent.trim();
  }
}

function translateLooseText(lang) {
  const dictionary = {
    "خدمات": "Services",
    "دموها": "Demos",
    "ورود / ثبت‌نام": "Login / Sign up",
    "پکیج‌ها": "Packages",
    "سوالات": "FAQ",
    "شروع پروژه": "Start project",
    "خانه": "Home",
    "محاسبه": "Calculate",
    "ذخیره خدمت": "Save Service",
    "ذخیره متن": "Save Copy",
    "ذخیره و نمایش در فوتر": "Save and Show in Footer",
    "خروج از پنل": "Exit Panel"
  };

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (node.parentElement?.closest("[data-fa][data-en]")) return;
    if (node.parentElement?.closest("script, style, textarea, input, select")) return;
    const original = node.parentElement?.dataset.faOriginal || node.nodeValue.trim();
    const clean = original.trim();
    if (!clean) return;
    if (lang === "fa") {
      if (node.parentElement?.dataset.faOriginal) node.nodeValue = node.parentElement.dataset.faOriginal;
      return;
    }
    if (/[\u0600-\u06FF]/.test(clean) && dictionary[clean]) {
      node.parentElement.dataset.faOriginal = clean;
      node.nodeValue = dictionary[clean];
    }
  });
}

function applyLanguage(lang) {
  enhanceConversionLayer();
  enhanceSiteFooters();
  activeLanguage = lang;
  localStorage.setItem("vitra-language", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  document.body.classList.toggle("is-ltr", lang === "en");

  document.querySelectorAll("[data-fa][data-en]").forEach((element) => {
    rememberOriginalText(element);
    element.textContent = element.dataset[lang];
  });

  document.querySelectorAll("[data-fa-placeholder][data-en-placeholder]").forEach((element) => {
    element.placeholder = element.dataset[`${lang}Placeholder`];
  });

  document.querySelectorAll("[data-fa-value][data-en-value]").forEach((element) => {
    element.value = element.dataset[`${lang}Value`];
    if (element.tagName === "TEXTAREA") element.textContent = element.dataset[`${lang}Value`];
  });

  translateLooseText(lang);
  document.querySelectorAll(".lang-switch").forEach((button) => {
    button.textContent = lang === "fa" ? "EN" : "FA";
  });
  updateBudgetOutput();
  updateProjectEstimate();
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
}

document.querySelectorAll(".lang-switch").forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(activeLanguage === "fa" ? "en" : "fa");
  });
});

document
  .querySelectorAll(".section, .service-lanes, .capability-rail, .portfolio-grid, .execution-grid, .manager-grid")
  .forEach((element) => element.setAttribute("data-reveal", ""));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
}

const loginForm = document.querySelector("[data-login-form]");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.querySelector("[data-login-user]")?.value.toLowerCase() || "";
    const isAdmin = username.includes("admin") || username.includes("vitra");
    const isAllameh = username.includes("allameh") || username.includes("client");
    window.location.href = isAdmin && !isAllameh ? "admin.html" : "client.html";
  });
}

const currentPage = document.body.dataset.page;
document.querySelectorAll(".nav a").forEach((link) => {
  const href = link.getAttribute("href") || "";
  if ((currentPage === "home" && href === "index.html") || (currentPage && href.startsWith(`${currentPage}.html`))) {
    link.setAttribute("aria-current", "page");
  }
});

const ticketDialog = document.querySelector("[data-ticket-dialog]");
document.querySelectorAll("[data-open-ticket]").forEach((openTicket) => {
  if (ticketDialog) openTicket.addEventListener("click", () => ticketDialog.showModal());
});

document.querySelectorAll("[data-submit-ticket]").forEach((submitTicket) => {
  submitTicket.addEventListener("click", (event) => {
    event.preventDefault();
    const ticketList = document.querySelector("[data-ticket-list]");
    if (!ticketList) return;
    const ticketTitle = submitTicket.closest("form, article")?.querySelector("[data-ticket-title]");
    const item = document.createElement("div");
    const fallbackTitle = activeLanguage === "fa" ? "تیکت جدید" : "New ticket";
    const statusText = activeLanguage === "fa" ? "ثبت شد" : "Created";
    const timeText = activeLanguage === "fa" ? "همین الان" : "Just now";
    item.innerHTML = `<b>${ticketTitle?.value || fallbackTitle}</b><span>${statusText}</span><small>${timeText}</small>`;
    ticketList.prepend(item);
    const ticketCount = document.querySelector("[data-ticket-count]");
    if (ticketCount) ticketCount.textContent = String(Number(ticketCount.textContent || 0) + 1);
    if (ticketDialog?.open) ticketDialog.close();
  });
});

const addPage = document.querySelector("[data-add-page]");
const pageList = document.querySelector("[data-page-list]");
if (addPage && pageList) {
  addPage.addEventListener("click", () => {
    const title = document.querySelector(".cms-builder input")?.value || (activeLanguage === "fa" ? "صفحه جدید" : "New page");
    const item = document.createElement("div");
    item.innerHTML = `<b>${title}</b><span>${activeLanguage === "fa" ? "پیش‌نویس تازه" : "Fresh draft"}</span>`;
    pageList.prepend(item);
  });
}

const calcPrice = document.querySelector("[data-calc-price]");
if (calcPrice) {
  calcPrice.addEventListener("click", () => {
    const pages = Number(document.querySelector("[data-pages-count]")?.value || 1);
    const panel = Number(document.querySelector("[data-panel-level]")?.value || 0);
    const total = pages * 3000000 + panel;
    const formatted = new Intl.NumberFormat(activeLanguage === "fa" ? "fa-IR" : "en-US").format(total);
    const result = document.querySelector("[data-price-result]");
    if (result) result.textContent = activeLanguage === "fa" ? `حدود ${formatted} تومان` : `About ${formatted} toman`;
  });
}

const budgetRange = document.querySelector("[data-budget-range]");
const budgetOutput = document.querySelector("[data-budget-output]");
function updateBudgetOutput() {
  if (!budgetRange || !budgetOutput) return;
  const value = Number(budgetRange.value || 28);
  budgetOutput.textContent =
    activeLanguage === "fa"
      ? `حدود ${new Intl.NumberFormat("fa-IR").format(value)} میلیون تومان`
      : `About ${new Intl.NumberFormat("en-US").format(value)}M toman`;
}
if (budgetRange) budgetRange.addEventListener("input", updateBudgetOutput);

const buildRequest = document.querySelector("[data-build-request]");
if (buildRequest) {
  buildRequest.addEventListener("click", () => {
    const type = document.querySelector("[data-wizard-type]")?.selectedOptions?.[0]?.textContent || "";
    const features = [...document.querySelectorAll("[data-price-addon]:checked")].length;
    const summary = document.querySelector("[data-wizard-summary]");
    if (summary) {
      summary.textContent =
        activeLanguage === "fa"
          ? `درخواست ${type} با ${new Intl.NumberFormat("fa-IR").format(features)} قابلیت اصلی آماده شد.`
          : `${type} request with ${features} main features is ready.`;
    }
    buildRequest.textContent = activeLanguage === "fa" ? "درخواست ساخته شد" : "Request created";
  });
}

function updateProjectEstimate() {
  const result = document.querySelector("[data-estimate-result]");
  if (!result) return;
  const pages = Number(document.querySelector("[data-est-pages]")?.value || 1);
  const languages = Number(document.querySelector("[data-est-lang]")?.value || 1);
  const panel = Number(document.querySelector("[data-est-panel]")?.value || 0);
  const addOns = [...document.querySelectorAll("[data-price-addon]:checked")].length * 3;
  const total = Math.round(pages * 2.4 + languages * 4 + panel + addOns);
  const minDays = Math.max(12, pages * 3 + panel);
  const maxDays = minDays + 10;
  result.textContent =
    activeLanguage === "fa"
      ? `حدود ${new Intl.NumberFormat("fa-IR").format(total)} میلیون تومان - ${new Intl.NumberFormat("fa-IR").format(minDays)} تا ${new Intl.NumberFormat("fa-IR").format(maxDays)} روز کاری`
      : `About ${new Intl.NumberFormat("en-US").format(total)}M toman - ${minDays} to ${maxDays} working days`;
}

document.querySelectorAll("[data-est-pages], [data-est-lang], [data-est-panel], [data-price-addon]").forEach((input) => {
  input.addEventListener("input", updateProjectEstimate);
  input.addEventListener("change", updateProjectEstimate);
});

const estimateButton = document.querySelector("[data-estimate-project]");
if (estimateButton) estimateButton.addEventListener("click", updateProjectEstimate);

const scoreButton = document.querySelector("[data-calc-score]");
if (scoreButton) {
  scoreButton.addEventListener("click", () => {
    const score = [...document.querySelectorAll("[data-score-item]:checked")].reduce((sum, item) => sum + Number(item.value || 0), 0);
    const result = document.querySelector("[data-score-result]");
    if (!result) return;
    if (score >= 7) {
      result.textContent = activeLanguage === "fa" ? "پیشنهاد: پکیج Command با پنل کامل و پشتیبانی ماهانه." : "Recommendation: Command package with full panel and monthly support.";
    } else if (score >= 4) {
      result.textContent = activeLanguage === "fa" ? "پیشنهاد: پکیج Business با پنل مشتری و مسیر سفارش." : "Recommendation: Business package with client portal and order flow.";
    } else {
      result.textContent = activeLanguage === "fa" ? "پیشنهاد: پکیج Starter برای شروع سریع." : "Recommendation: Starter package for a fast launch.";
    }
  });
}

function syncSocialLinks() {
  document.querySelectorAll("[data-social-link]").forEach((link) => {
    const key = link.dataset.socialLink;
    const stored = localStorage.getItem(`vitra-social-${key}`);
    const defaultMap = {
      instagram: "https://instagram.com/vitrastudio",
      telegram: "https://t.me/vitrastudio",
      linkedin: "https://linkedin.com/company/vitrastudio",
      whatsapp: "https://wa.me/989000000000",
      email: "mailto:hello@vitrastudio.ir"
    };
    const href = stored || defaultMap[key] || "";
    link.href = href;
    link.classList.toggle("is-empty", !href);
  });
}

document.querySelectorAll("[data-save-socials]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-social-input]").forEach((input) => {
      localStorage.setItem(`vitra-social-${input.dataset.socialInput}`, input.value);
    });
    syncSocialLinks();
    button.textContent = activeLanguage === "fa" ? "ذخیره شد" : "Saved";
  });
});

syncSocialLinks();

// Project request flow for the dedicated order page.
function vitraFieldValue(form, name) {
  const field = form.querySelector(`[name="${name}"]`);
  if (!field) return "";
  if (field.tagName === "SELECT") return field.selectedOptions?.[0]?.textContent?.trim() || field.value;
  return field.value.trim();
}

function vitraTrackingCode() {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  return `VITRA-${datePart}-${Math.floor(1000 + Math.random() * 9000)}`;
}

document.querySelectorAll("[data-build-request]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector("#project-form");
    button.textContent = activeLanguage === "fa" ? "ادامه در فرم پروژه" : "Continue to project form";
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-project-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const features = [...form.querySelectorAll('[name="features"]:checked')].map((item) => item.closest("label")?.innerText.trim() || item.value);
    const request = {
      code: vitraTrackingCode(),
      name: vitraFieldValue(form, "name"),
      phone: vitraFieldValue(form, "phone"),
      email: vitraFieldValue(form, "email"),
      project: vitraFieldValue(form, "project"),
      current: vitraFieldValue(form, "current"),
      service: vitraFieldValue(form, "service"),
      package: vitraFieldValue(form, "package"),
      budget: vitraFieldValue(form, "budget"),
      timeline: vitraFieldValue(form, "timeline"),
      features,
      brief: vitraFieldValue(form, "brief"),
      createdAt: new Date().toISOString()
    };

    const requests = JSON.parse(localStorage.getItem("vitra-project-requests") || "[]");
    requests.unshift(request);
    localStorage.setItem("vitra-project-requests", JSON.stringify(requests.slice(0, 20)));

    const preview = document.querySelector("[data-order-preview]");
    if (preview) {
      preview.innerHTML = `
        <div><b>${activeLanguage === "fa" ? "کد پیگیری" : "Tracking code"}</b><strong>${request.code}</strong></div>
        <div><b>${activeLanguage === "fa" ? "پروژه" : "Project"}</b><span>${request.project}</span></div>
        <div><b>${activeLanguage === "fa" ? "خدمت" : "Service"}</b><span>${request.service}</span></div>
        <div><b>${activeLanguage === "fa" ? "بودجه / زمان" : "Budget / timeline"}</b><span>${request.budget} - ${request.timeline}</span></div>
        <div><b>${activeLanguage === "fa" ? "امکانات" : "Features"}</b><span>${request.features.join("، ") || "-"}</span></div>
      `;
    }

    const result = document.querySelector("[data-order-result]");
    if (result) {
      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const submit = form.querySelector('[type="submit"]');
    if (submit) submit.textContent = activeLanguage === "fa" ? "درخواست ثبت شد" : "Request submitted";
  });
});

function renderStoredRequests() {
  const requests = JSON.parse(localStorage.getItem("vitra-project-requests") || "[]");
  document.querySelectorAll("[data-admin-requests], [data-client-requests]").forEach((list) => {
    if (!requests.length) {
      list.innerHTML = `<div class="empty-state"><b>${activeLanguage === "fa" ? "هنوز درخواستی ثبت نشده" : "No requests yet"}</b><span>${activeLanguage === "fa" ? "از صفحه شروع پروژه یک درخواست تستی ثبت کن." : "Create a test request from the start project page."}</span></div>`;
      return;
    }
    list.innerHTML = requests
      .map(
        (request) => `
          <article>
            <div><b>${request.project || "-"}</b><span>${request.code}</span></div>
            <p>${request.service || "-"} · ${request.budget || "-"} · ${request.timeline || "-"}</p>
            <small>${(request.features || []).join("، ") || "-"}</small>
            <a class="text-link" href="order.html">${activeLanguage === "fa" ? "ثبت درخواست مشابه" : "Create similar request"}</a>
          </article>
        `
      )
      .join("");
  });
}

renderStoredRequests();

const orderParams = new URLSearchParams(window.location.search);
const preferredPackage = orderParams.get("package");
const preferredService = orderParams.get("service");
if (preferredPackage || preferredService) {
  const packageSelect = document.querySelector('[name="package"]');
  const serviceSelect = document.querySelector('[name="service"]');
  if (packageSelect && preferredPackage) {
    [...packageSelect.options].forEach((option) => {
      if (option.textContent.trim().toLowerCase().includes(preferredPackage.toLowerCase())) packageSelect.value = option.value;
    });
  }
  if (serviceSelect && preferredService) {
    [...serviceSelect.options].forEach((option) => {
      if (option.textContent.trim().toLowerCase().includes(preferredService.toLowerCase())) serviceSelect.value = option.value;
    });
  }
  document.querySelector("#project-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

applyLanguage(activeLanguage);
