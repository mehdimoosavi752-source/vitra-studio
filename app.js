const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
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

const panelTabs = document.querySelectorAll("[data-panel-tab]");
const panelViews = document.querySelectorAll("[data-panel-view]");

function setPanelView(name) {
  panelTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.panelTab === name);
  });
  panelViews.forEach((view) => {
    view.classList.toggle("active", view.dataset.panelView === name);
  });
}

panelTabs.forEach((tab) => {
  tab.addEventListener("click", () => setPanelView(tab.dataset.panelTab));
});

if (location.hash === "#cms") {
  setPanelView("cms");
}

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
    item.innerHTML = `<b>${ticketTitle.value || "تیکت جدید"}</b><span>ثبت شد</span><small>همین الان</small>`;
    ticketList.prepend(item);
    ticketCount.textContent = String(Number(ticketCount.textContent || 0) + 1);
    ticketDialog.close();
  });
}

const addPage = document.querySelector("[data-add-page]");
const pageList = document.querySelector("[data-page-list]");

if (addPage && pageList) {
  addPage.addEventListener("click", () => {
    const title = document.querySelector(".cms-builder input")?.value || "صفحه جدید";
    const item = document.createElement("div");
    item.innerHTML = `<b>${title}</b><span>پیش‌نویس تازه</span>`;
    pageList.prepend(item);
  });
}

const calcPrice = document.querySelector("[data-calc-price]");

if (calcPrice) {
  calcPrice.addEventListener("click", () => {
    const pages = Number(document.querySelector("[data-pages-count]")?.value || 1);
    const panel = Number(document.querySelector("[data-panel-level]")?.value || 0);
    const total = pages * 3000000 + panel;
    const formatted = new Intl.NumberFormat("fa-IR").format(total);
    document.querySelector("[data-price-result]").textContent = `حدود ${formatted} تومان`;
  });
}
