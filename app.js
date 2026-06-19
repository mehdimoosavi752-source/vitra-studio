const menuToggle = document.querySelector(".menu-toggle");
let activeLanguage = localStorage.getItem("vitra-language") || "fa";

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
