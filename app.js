const menuToggle = document.querySelector(".menu-toggle");
let activeLanguage = localStorage.getItem("vitra-language") || "fa";

const textDictionary = {
  "خدمات": "Services",
  "دموها": "Demos",
  "ورود / ثبت‌نام": "Login / Sign up",
  "تعرفه‌ها": "Pricing",
  "شروع پروژه": "Start Project",
  "خانه": "Home",
  "دیدن پنل مدیر": "Open Admin Panel",
  "طراحی لوگو": "Logo Design",
  "طراحی سایت": "Website Design",
  "سرور و زیرساخت": "Server and Infrastructure",
  "پنل کاربری": "User Portal",
  "پشتیبانی و رشد": "Support and Growth",
  "داشبورد": "Dashboard",
  "صفحه‌ساز": "Page Builder",
  "محتوا": "Content",
  "خدمات و قیمت": "Services and Pricing",
  "مشتری‌ها": "Clients",
  "تیکت‌ها": "Tickets",
  "شبکه‌های اجتماعی": "Social Networks",
  "فوتر": "Footer",
  "خروج از پنل": "Logout",
  "ساخت صفحه": "Create Page",
  "تنظیم شبکه‌ها": "Social Settings",
  "ایجاد صفحه جدید": "Create New Page",
  "ذخیره متن": "Save Text",
  "ذخیره خدمت": "Save Service",
  "محاسبه": "Calculate",
  "ثبت تیکت داخلی": "Create Internal Ticket",
  "ذخیره و نمایش در فوتر": "Save and Show in Footer",
  "ذخیره فوتر": "Save Footer",
  "ورود": "Login",
  "ثبت‌نام مشتری جدید": "Create New Client Account",
  "ورود به دمو": "Open Demo",
  "مشاهده دوره‌ها": "View Courses",
  "پنل هنرجو": "Student Portal",
  "رزرو نوبت": "Book Appointment",
  "شروع رزرو": "Start Booking",
  "پنل سالن": "Salon Panel",
  "گرفتن نوبت": "Book Visit",
  "پنل پذیرش": "Reception Panel",
  "دیدن محصول": "View Product",
  "پنل سفارش‌ها": "Orders Panel",
  "طراحی، توسعه و مدیریت سایت‌های آینده‌نگر با پنل، دمو و پشتیبانی.": "Future-facing website design, development, portals, demos, and support."
};

function rememberOriginalText(element) {
  if (!element.dataset.faOriginal) {
    element.dataset.faOriginal = element.textContent.trim();
  }
}

function translateLooseText(lang) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (node.parentElement?.closest("[data-fa][data-en]")) return;
    const original = node.parentElement?.dataset.faOriginal || node.nodeValue.trim();
    const clean = original.trim();
    if (!clean || node.parentElement?.closest("script, style")) return;
    if (lang === "fa") {
      if (node.parentElement?.dataset.faOriginal) node.nodeValue = node.parentElement.dataset.faOriginal;
      return;
    }
    if (/[\u0600-\u06FF]/.test(clean)) {
      node.parentElement.dataset.faOriginal = clean;
      node.nodeValue = textDictionary[clean] || "Website management content";
    }
  });
}

function applyLanguage(lang) {
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
  .forEach((element) => {
    element.setAttribute("data-reveal", "");
  });

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

document.querySelectorAll("[data-reveal]").forEach((element) => {
  revealObserver.observe(element);
});

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
  if (
    (currentPage === "home" && href === "index.html") ||
    (currentPage && href.startsWith(`${currentPage}.html`))
  ) {
    link.setAttribute("aria-current", "page");
  }
});

const ticketDialog = document.querySelector("[data-ticket-dialog]");
const openTicket = document.querySelector("[data-open-ticket]");
const submitTicket = document.querySelector("[data-submit-ticket]");
const ticketTitle = document.querySelector("[data-ticket-title]");
const ticketList = document.querySelector("[data-ticket-list]");
const ticketCount = document.querySelector("[data-ticket-count]");

if (openTicket && ticketDialog) {
  openTicket.addEventListener("click", () => ticketDialog.showModal());
}

if (submitTicket && ticketList && ticketTitle) {
  submitTicket.addEventListener("click", (event) => {
    event.preventDefault();
    const item = document.createElement("div");
    const fallbackTitle = activeLanguage === "fa" ? "تیکت جدید" : "New ticket";
    const statusText = activeLanguage === "fa" ? "ثبت شد" : "Created";
    const timeText = activeLanguage === "fa" ? "همین الان" : "Just now";
    item.innerHTML = `<b>${ticketTitle.value || fallbackTitle}</b><span>${statusText}</span><small>${timeText}</small>`;
    ticketList.prepend(item);
    ticketCount.textContent = String(Number(ticketCount.textContent || 0) + 1);
    ticketDialog.close();
  });
}

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
    document.querySelector("[data-price-result]").textContent =
      activeLanguage === "fa" ? `حدود ${formatted} تومان` : `About ${formatted} Toman`;
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

if (budgetRange) {
  budgetRange.addEventListener("input", updateBudgetOutput);
}

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

const estimateButton = document.querySelector("[data-estimate-project]");

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

if (estimateButton) {
  estimateButton.addEventListener("click", updateProjectEstimate);
}

document.querySelectorAll("[data-est-pages], [data-est-lang], [data-est-panel], [data-price-addon]").forEach((element) => {
  element.addEventListener("input", updateProjectEstimate);
  element.addEventListener("change", updateProjectEstimate);
});

const scoreButton = document.querySelector("[data-calc-score]");

function updateProjectScore() {
  const result = document.querySelector("[data-score-result]");
  if (!result) return;
  const score = [...document.querySelectorAll("[data-score-item]:checked")]
    .reduce((sum, item) => sum + Number(item.value || 0), 0);
  let fa = "پکیج Starter برای شروع کافی است.";
  let en = "Starter is enough to begin.";
  if (score >= 4 && score < 8) {
    fa = "پکیج Business مناسب‌تر است؛ پنل و مسیر سفارش لازم دارید.";
    en = "Business is more suitable; you need a panel and order flow.";
  }
  if (score >= 8) {
    fa = "پکیج Command پیشنهاد می‌شود؛ شما به سیستم کامل دیجیتال نیاز دارید.";
    en = "Command is recommended; you need a complete digital system.";
  }
  result.textContent = activeLanguage === "fa" ? fa : en;
}

if (scoreButton) {
  scoreButton.addEventListener("click", updateProjectScore);
}

document.querySelectorAll("[data-score-item]").forEach((item) => {
  item.addEventListener("change", updateProjectScore);
});

const defaultSocials = {
  instagram: "https://instagram.com/vitrastudio",
  telegram: "https://t.me/vitrastudio",
  linkedin: "https://linkedin.com/company/vitrastudio",
  whatsapp: "https://wa.me/989000000000",
  email: "mailto:hello@vitrastudio.ir"
};

function readSocials() {
  try {
    return { ...defaultSocials, ...JSON.parse(localStorage.getItem("vitra-socials") || "{}") };
  } catch {
    return defaultSocials;
  }
}

function applySocialLinks() {
  const socials = readSocials();
  document.querySelectorAll("[data-social-link]").forEach((link) => {
    const key = link.dataset.socialLink;
    const value = socials[key];
    if (value) {
      link.href = value;
      link.classList.remove("is-empty");
    } else {
      link.removeAttribute("href");
      link.classList.add("is-empty");
    }
  });
  document.querySelectorAll("[data-social-input]").forEach((input) => {
    input.value = socials[input.dataset.socialInput] || "";
  });
}

const saveSocials = document.querySelector("[data-save-socials]");

if (saveSocials) {
  saveSocials.addEventListener("click", () => {
    const socials = {};
    document.querySelectorAll("[data-social-input]").forEach((input) => {
      socials[input.dataset.socialInput] = input.value.trim();
    });
    localStorage.setItem("vitra-socials", JSON.stringify(socials));
    applySocialLinks();
    saveSocials.textContent = activeLanguage === "fa" ? "ذخیره شد" : "Saved";
  });
}

applySocialLinks();
applyLanguage(activeLanguage);
updateBudgetOutput();
updateProjectEstimate();
updateProjectScore();
