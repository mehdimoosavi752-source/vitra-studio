const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const $ = (selector, root = document) => root.querySelector(selector);
let activeLang = document.documentElement.lang === "en" ? "en" : "fa";
const cart = [];

function fixMojibakeText(value) {
  if (!value || !/[\u00d8\u00d9\u00db\u00da\u00aa\u00ac\u0153\u0152\u20ac\u00e2]/.test(value)) return value || "";
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
    node.textContent = lang === "fa" ? fixMojibakeText(node.dataset.fa) : fixMojibakeText(node.dataset.en);
  });
  $$("[data-fa-placeholder][data-en-placeholder]").forEach((node) => {
    node.placeholder = lang === "fa" ? fixMojibakeText(node.dataset.faPlaceholder) : fixMojibakeText(node.dataset.enPlaceholder);
  });
  const toggle = $("[data-lang-toggle]");
  if (toggle) toggle.textContent = lang === "fa" ? "EN" : "FA";
  repairVisibleMojibakeText(document.body);
  normalizeDemoChrome(lang);
}

function repairVisibleMojibakeText(root = document.body) {
  if (!root) return;
  const bad = /[\u00d8\u00d9\u00db\u00c3\u00c2]|\u00e2\u20ac|\u00e2\u20ac\u201d/;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|INPUT)$/i.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return bad.test(node.nodeValue || "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  let node;
  while ((node = walker.nextNode())) node.nodeValue = fixMojibakeText(node.nodeValue);
}

function demoKind() {
  if (document.body.classList.contains("salon-suite")) return "salon";
  if (document.body.classList.contains("academy-suite")) return "academy";
  if (document.body.classList.contains("clinic-suite")) return "clinic";
  if (document.body.classList.contains("shop-suite")) return "shop";
  return "demo";
}

function normalizeDemoChrome(lang = activeLang) {
  const kind = demoKind();
  const prices = {
    salon: ["از ۲۸ میلیون", "From 28M"],
    academy: ["از ۲۲ میلیون", "From 22M"],
    clinic: ["از ۲۴ میلیون", "From 24M"],
    shop: ["از ۳۵ میلیون", "From 35M"],
    demo: ["قیمت اختصاصی", "Custom quote"]
  };
  const price = $(".demo-price");
  if (price) {
    price.dataset.fa = prices[kind][0];
    price.dataset.en = prices[kind][1];
    price.textContent = lang === "fa" ? prices[kind][0] : prices[kind][1];
  }

  const vpLabels = {
    mobile: ["موبایل", "Mobile"],
    tablet: ["تبلت", "Tablet"],
    desktop: ["دسکتاپ", "Desktop"]
  };
  $$("[data-vp]").forEach((button) => {
    const item = vpLabels[button.dataset.vp] || ["نما", "View"];
    button.dataset.fa = item[0];
    button.dataset.en = item[1];
    button.title = item[1];
    button.textContent = lang === "fa" ? item[0] : item[1];
  });

  const salonCity = $(".salon-suite .search-panel label:nth-child(2) input");
  if (salonCity) salonCity.value = lang === "fa" ? "تهران" : "Tehran";

  $$(".clinic-suite [data-city-filter] option").forEach((option) => {
    const map = {
      all: ["همه شهرها", "All cities"],
      tehran: ["تهران", "Tehran"],
      yazd: ["یزد", "Yazd"],
      isfahan: ["اصفهان", "Isfahan"]
    };
    const item = map[option.value];
    if (item) option.textContent = lang === "fa" ? item[0] : item[1];
  });

  $$(".clinic-suite [data-sort-doctors] option").forEach((option) => {
    const map = {
      soon: ["اولین نوبت", "Earliest slot"],
      rating: ["بیشترین امتیاز", "Highest rating"],
      recommend: ["بیشترین توصیه", "Most recommended"]
    };
    const item = map[option.value];
    if (item) option.textContent = lang === "fa" ? item[0] : item[1];
  });

  $$(".shop-suite [data-shop-sort] option").forEach((option) => {
    const map = {
      latest: ["جدیدترین", "Latest"],
      low: ["ارزان ترین", "Lowest price"],
      high: ["گران ترین", "Highest price"]
    };
    const item = map[option.value];
    if (item) option.textContent = lang === "fa" ? item[0] : item[1];
  });
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

function injectWebsiteDepth() {
  const main = $("main");
  if (!main || $(".demo-real-depth")) return;
  const isSalon = document.body.classList.contains("salon-suite");
  const isAcademy = document.body.classList.contains("academy-suite");
  const isClinic = document.body.classList.contains("clinic-suite");
  const isShop = document.body.classList.contains("shop-suite");
  const brand = isSalon ? "Velora" : isAcademy ? "Lingua Orbit" : isClinic ? "DentaLine" : isShop ? "Moodline" : "Vitra Demo";
  const industry = isSalon ? "Beauty booking" : isAcademy ? "Language academy" : isClinic ? "Dental clinic" : isShop ? "Fashion commerce" : "Business website";
  const leadFa = isSalon ? "رزرو آنلاین، پروفایل سالن، گالری، امتیازها و مسیر تماس واقعی برای مشتری." :
    isAcademy ? "مسیر آموزشی، ثبت نام، معرفی استاد، برنامه کلاس و گزارش پیشرفت زبان آموز." :
    isClinic ? "نوبت دهی، پروفایل پزشک، خدمات درمانی، راهنمای بیمار و پیگیری مراجعه." :
    isShop ? "محصول، فیلتر، رنگ و سایز، سبد خرید، پیگیری سفارش و کمپین فروش." :
    "صفحه های واقعی، فرم، محتوا، اعتمادسازی و پنل مدیریت.";
  const leadEn = isSalon ? "Online booking, salon profile, gallery, ratings and a real contact path." :
    isAcademy ? "Learning paths, enrollment, teacher profiles, class schedule and progress reports." :
    isClinic ? "Appointments, doctor profiles, medical services, patient guides and follow-up." :
    isShop ? "Products, filters, colors, sizes, cart, order tracking and sales campaigns." :
    "Real pages, forms, content, trust blocks and admin management.";
  const section = document.createElement("section");
  section.className = "suite-section demo-real-depth";
  section.innerHTML = `
    <div class="real-depth-copy">
      <span class="eyebrow" data-fa="حس یک سایت واقعی" data-en="Real website feeling">Real website feeling</span>
      <h2 data-fa="این دمو فقط چند کارت نیست؛ مسیر واقعی مشتری را نشان می‌دهد." data-en="This demo is not just a few cards; it shows the real customer journey.">This demo is not just a few cards; it shows the real customer journey.</h2>
      <p data-fa="${leadFa}" data-en="${leadEn}">${leadEn}</p>
      <div class="real-depth-actions">
        <a href="order.html?demo=${brand.toLowerCase().replaceAll(" ", "-")}" data-fa="سفارش سایت مشابه" data-en="Order a similar site">Order a similar site</a>
        <a href="portfolio.html" data-fa="دیدن بقیه دموها" data-en="See more demos">See more demos</a>
      </div>
    </div>
    <div class="real-depth-board">
      <article><b>${brand}</b><span>${industry}</span></article>
      <article><b>Live CMS</b><span data-fa="محتوا قابل ویرایش" data-en="Editable content">Editable content</span></article>
      <article><b>Mobile ready</b><span data-fa="آماده موبایل" data-en="Responsive flow">Responsive flow</span></article>
      <article><b>Conversion</b><span data-fa="مسیر تبدیل کاربر" data-en="Customer conversion path">Customer conversion path</span></article>
    </div>`;
  main.appendChild(section);

  const footer = document.createElement("footer");
  footer.className = "demo-real-footer";
  footer.innerHTML = `
    <strong>${brand}</strong>
    <nav>
      <a href="#" data-fa="خدمات" data-en="Services">Services</a>
      <a href="#" data-fa="تماس" data-en="Contact">Contact</a>
      <a href="#" data-fa="قوانین" data-en="Terms">Terms</a>
    </nav>
    <span data-fa="دموی آماده سفارش توسط ویترا" data-en="Order-ready demo by Vitra">Order-ready demo by Vitra</span>`;
  main.appendChild(footer);
}

injectWebsiteDepth();

if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
  $$(".venue-card,.doctor-card,.fashion-card,.path-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
  });
}

applyLang(activeLang);
