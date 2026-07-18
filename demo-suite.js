const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const $ = (selector, root = document) => root.querySelector(selector);
let activeLang = document.documentElement.lang === "en" ? "en" : "fa";
const cart = [];

function fixMojibakeText(value) {
  if (!value || !/[ØÙÛÚª¬œŒ€â]/.test(value)) return value || "";
  const map = {"€":0x80,"‚":0x82,"ƒ":0x83,"„":0x84,"…":0x85,"†":0x86,"‡":0x87,"ˆ":0x88,"‰":0x89,"Š":0x8A,"‹":0x8B,"Œ":0x8C,"Ž":0x8E,"‘":0x91,"’":0x92,"“":0x93,"”":0x94,"•":0x95,"–":0x96,"—":0x97,"˜":0x98,"™":0x99,"š":0x9A,"›":0x9B,"œ":0x9C,"ž":0x9E,"Ÿ":0x9F};
  try {
    const bytes = [...value].map((ch) => map[ch] !== undefined ? map[ch] : (ch.charCodeAt(0) & 255));
    return new TextDecoder("utf-8").decode(new Uint8Array(bytes));
  } catch (e) {
    return value;
  }
}

function applyLang(lang) {
  activeLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  $$("[data-fa][data-en]").forEach((node) => {
    node.textContent = lang === "fa" ? fixMojibakeText(node.dataset.fa) : node.dataset.en;
  });
  $$("[data-fa-placeholder][data-en-placeholder]").forEach((node) => {
    node.placeholder = lang === "fa" ? fixMojibakeText(node.dataset.faPlaceholder) : node.dataset.enPlaceholder;
  });
  const toggle = $("[data-lang-toggle]");
  if (toggle) toggle.textContent = lang === "fa" ? "EN" : "FA";
}

function openModal(id, title) {
  const modal = document.getElementById(id);
  if (!modal) return;
  const heading = $("[data-booking-heading]", modal);
  if (heading && title) heading.textContent = title;
  modal.setAttribute("aria-hidden", "false");
}

function closeModals() {
  $$(".suite-modal").forEach((modal) => modal.setAttribute("aria-hidden", "true"));
}

$("[data-lang-toggle]")?.addEventListener("click", () => applyLang(activeLang === "fa" ? "en" : "fa"));
$$("[data-open-modal]").forEach((button) => button.addEventListener("click", () => openModal(button.dataset.openModal, button.dataset.bookingTitle)));
$$("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModals));
$$("[data-scroll]").forEach((button) => button.addEventListener("click", () => $(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" })));
$$("[data-submit-demo]").forEach((button) => button.addEventListener("click", () => { button.textContent = activeLang === "fa" ? "ثبت شد" : "Saved"; }));

$$("[data-filter='academy']").forEach((button) => {
  button.addEventListener("click", () => {
    $$("[data-filter='academy']").forEach((item) => item.classList.toggle("is-active", item === button));
    $$("[data-group]").forEach((card) => card.hidden = button.dataset.value !== "all" && card.dataset.group !== button.dataset.value);
  });
});

$$("[data-select-plan]").forEach((button) => button.addEventListener("click", () => {
  button.textContent = activeLang === "fa" ? "انتخاب شد" : "Selected";
}));

$("[data-academy-hours]")?.addEventListener("input", (event) => {
  const hours = event.target.value;
  $("[data-academy-output]").textContent = activeLang === "fa" ? `${hours} ساعت در هفته - مسیر شخصی سازی شد.` : `${hours} hours per week - path customized.`;
});

$$("[data-schedule-pick]").forEach((button) => button.addEventListener("click", () => {
  $("[data-schedule-result]").textContent = activeLang === "fa" ? `${button.dataset.schedulePick} رزرو شد.` : `${button.dataset.schedulePick} selected.`;
}));

$$("[data-salon-chip]").forEach((button) => button.addEventListener("click", () => {
  $$("[data-salon-chip]").forEach((item) => item.classList.toggle("is-active", item === button));
  const type = button.dataset.salonChip;
  $$("[data-salon-type]").forEach((card) => card.hidden = type !== "all" && !card.dataset.salonType.includes(type));
}));

$("[data-salon-search]")?.addEventListener("click", () => {
  const query = ($("[data-salon-query]")?.value || "").toLowerCase();
  $$("[data-salon-type]").forEach((card) => card.hidden = query && !card.textContent.toLowerCase().includes(query));
});

$("[data-show-phone]")?.addEventListener("click", () => {
  $("[data-phone-output]").textContent = "+98 21 8844 2100";
});

function filterDoctors() {
  const city = $("[data-city-filter]")?.value || "all";
  const query = ($("[data-doctor-search]")?.value || "").toLowerCase();
  $$("[data-city]").forEach((card) => {
    card.hidden = (city !== "all" && card.dataset.city !== city) || (query && !card.textContent.toLowerCase().includes(query));
  });
}

$("[data-city-filter]")?.addEventListener("change", filterDoctors);
$("[data-doctor-search]")?.addEventListener("input", filterDoctors);
$("[data-reset-doctors]")?.addEventListener("click", () => {
  if ($("[data-city-filter]")) $("[data-city-filter]").value = "all";
  if ($("[data-doctor-search]")) $("[data-doctor-search]").value = "";
  filterDoctors();
});

$("[data-sort-doctors]")?.addEventListener("change", (event) => {
  const list = $(".doctor-list");
  if (!list) return;
  const cards = $$("[data-city]", list).sort((a, b) => {
    if (event.target.value === "rating") return Number(b.dataset.rating) - Number(a.dataset.rating);
    if (event.target.value === "recommend") return Number(b.dataset.recommend) - Number(a.dataset.recommend);
    return 0;
  });
  cards.forEach((card) => list.appendChild(card));
});

function renderCart() {
  $("[data-cart-count]") && ($("[data-cart-count]").textContent = cart.length);
  const lines = $("[data-cart-lines]");
  if (lines) lines.textContent = cart.length ? cart.map((item) => `${item.name} - ${item.price.toLocaleString("fa-IR")} تومان`).join(" | ") : (activeLang === "fa" ? "سبد خالی است." : "Cart is empty.");
}

$$("[data-add-cart]").forEach((button) => button.addEventListener("click", () => {
  cart.push({ name: button.dataset.addCart, price: Number(button.dataset.price) });
  renderCart();
  button.textContent = activeLang === "fa" ? "اضافه شد" : "Added";
}));

$$("[data-shop-category]").forEach((button) => button.addEventListener("click", () => {
  $$("[data-shop-category]").forEach((item) => item.classList.toggle("is-active", item === button));
  $$("[data-category]").forEach((card) => card.hidden = button.dataset.shopCategory !== "all" && card.dataset.category !== button.dataset.shopCategory);
}));

$("[data-shop-sort]")?.addEventListener("change", (event) => {
  const grid = $(".shop-grid");
  if (!grid) return;
  const cards = $$("[data-category]", grid).sort((a, b) => event.target.value === "low" ? Number(a.dataset.price) - Number(b.dataset.price) : Number(b.dataset.price) - Number(a.dataset.price));
  if (event.target.value === "latest") cards.reverse();
  cards.forEach((card) => grid.appendChild(card));
});

$$("[data-quick-view]").forEach((button) => button.addEventListener("click", () => {
  const [title, price] = button.dataset.quickView.split("|");
  $("[data-qv-title]").textContent = title;
  $("[data-qv-price]").textContent = price;
  openModal("quickView");
}));

$("[data-track-order]")?.addEventListener("click", () => {
  const code = $("[data-order-code]")?.value || "ML-2048";
  $("[data-track-output]").textContent = activeLang === "fa" ? `سفارش ${code} در مرحله آماده سازی است.` : `Order ${code} is being packed.`;
});

applyLang(activeLang);
