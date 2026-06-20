const menuToggle = document.querySelector(".menu-toggle");
let activeLanguage = localStorage.getItem("vitra-language") || "fa";

function enhanceSiteFooters() {
  if (!document.querySelector(".site-footer")) {
    const main = document.querySelector("main");
    main?.insertAdjacentHTML(
      "beforeend",
      `<footer class="site-footer">
        <div><strong>Vitra Studio</strong><p data-fa="طراحی سایت، پنل، بازطراحی، سئو و پشتیبانی برای کسب‌وکارهایی که می‌خواهند حرفه‌ای دیده شوند و قابل مدیریت رشد کنند." data-en="Website design, portals, redesign, SEO and support for businesses that want to look professional and grow with control.">طراحی سایت، پنل، بازطراحی، سئو و پشتیبانی برای کسب‌وکارهایی که می‌خواهند حرفه‌ای دیده شوند و قابل مدیریت رشد کنند.</p></div>
        <div class="footer-socials"><a data-social-link="instagram" target="_blank" rel="noopener">IG</a><a data-social-link="telegram" target="_blank" rel="noopener">TG</a><a data-social-link="linkedin" target="_blank" rel="noopener">IN</a><a data-social-link="whatsapp" target="_blank" rel="noopener">WA</a><a data-social-link="email" target="_blank" rel="noopener">@</a></div>
      </footer>`
    );
  }
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
    if (footerMap && !footerMap.querySelector('a[href="audit.html"]')) {
      const auditLink = document.createElement("a");
      auditLink.href = "audit.html";
      auditLink.dataset.fa = "بررسی رایگان سایت";
      auditLink.dataset.en = "Free website review";
      auditLink.textContent = "بررسی رایگان سایت";
      footerMap.insertBefore(auditLink, footerMap.querySelector('a[href="order.html"]'));
    }
  });
  if (typeof syncSocialLinks === "function") syncSocialLinks();
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

function setBilingualCopy(selector, fa, en, lang, options = {}) {
  const nodes = options.all ? document.querySelectorAll(selector) : [document.querySelector(selector)];
  nodes.forEach((element) => {
    if (!element) return;
    element.dataset.fa = fa;
    element.dataset.en = en;
    element.textContent = lang === "en" ? en : fa;
  });
}

function polishMarketingCopy(lang) {
  const page = document.body.dataset.page || "";

  if (page === "home") {
    setBilingualCopy(
      ".hero-system h1",
      "وب‌سایت و پنل اختصاصی برای کسب‌وکارهایی که می‌خواهند حرفه‌ای دیده شوند و سفارش بیشتری بگیرند.",
      "Custom websites and portals for businesses that need to look professional and win more inquiries.",
      lang
    );
    setBilingualCopy(
      ".hero-system .hero-copy p:not(.eyebrow)",
      "سایت شما باید بیشتر از یک ظاهر زیبا باشد: باید اعتماد بسازد، مسیر انتخاب را کوتاه کند، درخواست مشتری را ثبت کند و بعد از تحویل با پنل قابل مدیریت بماند. Vitra Studio طراحی سایت، بازطراحی، فروشگاه، رزرو، پنل مدیریت، پنل مشتری، سئو پایه و پشتیبانی ماهانه را یکپارچه اجرا می‌کند.",
      "Your website should do more than look good: it should build trust, shorten the buying path, collect inquiries and stay manageable after launch. Vitra Studio delivers website design, redesign, ecommerce, booking, admin portals, client portals, baseline SEO and monthly support as one system.",
      lang
    );
    setBilingualCopy(
      ".home-service-paths .section-head h2",
      "مسیر مناسب کسب‌وکار خود را انتخاب کنید",
      "Choose the right path for your business",
      lang
    );
    setBilingualCopy(
      ".home-service-paths .section-head p",
      "اگر تازه شروع می‌کنید، سایت معرفی می‌خواهید. اگر سایت فعلی نتیجه نمی‌دهد، بازطراحی لازم دارید. اگر سفارش، مشتری، محتوا و قیمت‌ها باید قابل مدیریت باشند، پنل اختصاصی بهترین مسیر است.",
      "If you are launching, start with a business website. If your current site is not converting, choose redesign. If orders, clients, content and pricing need control, a custom portal is the right path.",
      lang
    );
    setBilingualCopy(
      ".demo-decision-layer h2",
      "دموهایی ببینید که مثل پروژه واقعی کار می‌کنند",
      "Explore demos that work like real projects",
      lang
    );
    setBilingualCopy(
      ".demo-decision-layer p",
      "قبل از سفارش، مشتری می‌تواند نمونه‌های قابل کلیک را بررسی کند: ثبت‌نام آموزشگاه، رزرو سالن، نوبت‌دهی کلینیک و فروشگاه پوشاک با محصول، سبد و پیگیری سفارش.",
      "Before ordering, clients can inspect clickable demos: academy enrollment, salon booking, clinic appointments and a fashion store with products, cart and order tracking.",
      lang
    );
    setBilingualCopy(
      ".vitra-panel-product h2",
      "پنل Vitra؛ کنترل سایت، مشتری و سفارش‌ها در یک محیط",
      "Vitra Panel: control website, clients and orders in one place",
      lang
    );
    setBilingualCopy(
      ".vitra-panel-product p",
      "بعد از تحویل، برای تغییر متن، قیمت، خدمات، صفحات، تیکت‌ها و لینک‌های فوتر منتظر طراح نمی‌مانید. پنل Vitra مدیریت روزمره سایت را ساده و قابل پیگیری می‌کند.",
      "After launch, you do not wait for a designer to edit copy, prices, services, pages, tickets or footer links. Vitra Panel keeps daily website management simple and trackable.",
      lang
    );
    setBilingualCopy(
      ".calculator-trust-note b",
      "بودجه پروژه را سریع و شفاف تخمین بزنید",
      "Estimate your project budget quickly and clearly",
      lang
    );
    setBilingualCopy(
      ".calculator-trust-note span",
      "این عدد برای تصمیم‌گیری اولیه است. قیمت نهایی بعد از بررسی تعداد صفحات، محتوا، امکانات، سطح پنل، زبان‌ها و پشتیبانی مورد نیاز مشخص می‌شود.",
      "This estimate helps with early decisions. Final pricing depends on pages, content, features, panel level, languages and support needs.",
      lang
    );
  }

  const heroCopy = {
    services: {
      h1: ["خدمات طراحی سایت، پنل و رشد برای کسب‌وکارهایی که نتیجه می‌خواهند", "Website, portal and growth services for businesses that want measurable outcomes"],
      p: ["از راه‌اندازی سرور تا طراحی سایت، بازطراحی، فروشگاه، رزرو، پنل مشتری، مدیریت محتوا، سئو پایه و پشتیبانی ماهانه را به صورت مرحله‌ای و قابل توسعه اجرا می‌کنیم.", "From server setup to website design, redesign, ecommerce, booking, client portals, content management, baseline SEO and monthly support, we build in clear scalable phases."]
    },
    portfolio: {
      h1: ["نمونه‌کارهایی که مشتری می‌تواند ببیند، کلیک کند و کیفیت اجرا را لمس کند", "Portfolio demos clients can view, click and evaluate before ordering"],
      p: ["هر دمو فقط یک تصویر نیست؛ برای یک نوع کسب‌وکار طراحی شده و امکانات واقعی همان حوزه را نشان می‌دهد تا تصمیم‌گیری برای مشتری آسان‌تر شود.", "Each demo is more than a picture; it is designed for a business type and shows realistic features so clients can decide with confidence."]
    },
    packages: {
      h1: ["پکیج‌هایی شفاف برای شروع سریع، رشد جدی و سیستم کامل مدیریت", "Clear packages for fast launch, serious growth and complete management systems"],
      p: ["به جای قیمت مبهم، هر پکیج با خروجی مشخص، سطح پنل، امکانات، زمان اجرا و مسیر ارتقا تعریف شده تا بدانید دقیقاً چه چیزی تحویل می‌گیرید.", "Instead of vague pricing, every package defines deliverables, portal level, features, timeline and upgrade path so you know exactly what you receive."]
    },
    process: {
      h1: ["فرایندی شفاف از تحلیل تا طراحی، اجرا، آموزش و پشتیبانی", "A clear process from discovery to design, build, training and support"],
      p: ["پروژه با شناخت نیاز و هدف شروع می‌شود، با طراحی و اجرای مرحله‌ای جلو می‌رود و با آموزش پنل، تحویل دسترسی‌ها و برنامه رشد ماهانه کامل می‌شود.", "Each project starts with goals and needs, moves through phased design and build, and finishes with portal training, access handoff and a monthly growth plan."]
    },
    faq: {
      h1: ["پاسخ‌های کوتاه و روشن قبل از سفارش سایت یا پنل", "Clear answers before ordering a website or portal"],
      p: ["زمان اجرا، هزینه، مالکیت سایت، پشتیبانی، پنل و مسیر توسعه را قبل از شروع شفاف می‌کنیم تا تصمیم‌گیری ساده‌تر باشد.", "We clarify timeline, pricing, ownership, support, portal scope and upgrade path before the project starts."]
    },
    about: {
      h1: ["Vitra Studio برای ساخت سایت‌هایی شکل گرفته که فقط دیده نمی‌شوند، کار می‌کنند", "Vitra Studio builds websites that do more than look good; they work"],
      p: ["تمرکز ما ترکیب طراحی مدرن، متن فروشنده، تجربه کاربری، پنل مدیریت و پشتیبانی است تا سایت شما بعد از تحویل قابل رشد و قابل مدیریت بماند.", "We combine modern design, conversion-focused copy, user experience, management portals and support so your website stays manageable and ready to grow after launch."]
    },
    order: {
      h1: ["سفارش پروژه را مرحله‌ای ثبت کنید تا مسیر اجرا دقیق‌تر شروع شود", "Submit your project step by step so execution starts with clarity"],
      p: ["نوع کسب‌وکار، امکانات، بودجه، زمان‌بندی و نیازهای پنل را وارد کنید تا پیشنهاد اولیه و مسیر اجرای مناسب برای شما مشخص شود.", "Enter your business type, features, budget, timeline and portal needs so the right proposal and execution path can be prepared."]
    },
    panel: {
      h1: ["پنل Vitra برای مدیریت سایت، مشتری، سفارش، محتوا و پشتیبانی", "Vitra Panel for managing website, clients, orders, content and support"],
      p: ["با پنل Vitra، سایت بعد از تحویل وابسته نمی‌ماند. محتوا، قیمت‌ها، خدمات، صفحات، تیکت‌ها، فایل‌ها، شبکه‌های اجتماعی و گزارش‌ها در یک محیط قابل کنترل هستند.", "With Vitra Panel, your website does not stay dependent after launch. Content, prices, services, pages, tickets, files, social links and reports are managed in one controlled workspace."]
    }
  };

  if (heroCopy[page]) {
    setBilingualCopy(".page-hero h1", heroCopy[page].h1[0], heroCopy[page].h1[1], lang);
    setBilingualCopy(".page-hero p:not(.eyebrow):not(.section-kicker)", heroCopy[page].p[0], heroCopy[page].p[1], lang);
  }
}

function polishFooterCTA(lang) {
  document.querySelectorAll(".site-footer").forEach((footer) => {
    footer.classList.add("footer-cta");
    const brandTitle = footer.querySelector(":scope > div:first-child strong");
    const brandCopy = footer.querySelector(":scope > div:first-child p");
    if (brandTitle) {
      brandTitle.dataset.fa = "برای سایت بعدی‌تان یک ویترین قابل مدیریت بسازیم";
      brandTitle.dataset.en = "Build a manageable digital storefront for your next project";
      brandTitle.textContent = lang === "en" ? brandTitle.dataset.en : brandTitle.dataset.fa;
    }
    if (brandCopy) {
      brandCopy.dataset.fa = "اگر سایت شما باید مشتری جذب کند، سفارش ثبت کند، قابل ویرایش باشد و بعد از تحویل رشد کند، Vitra Studio مسیر طراحی، پنل و پشتیبانی را یکپارچه اجرا می‌کند.";
      brandCopy.dataset.en = "If your website should attract clients, collect inquiries, stay editable and keep growing after launch, Vitra Studio delivers design, portal and support as one system.";
      brandCopy.textContent = lang === "en" ? brandCopy.dataset.en : brandCopy.dataset.fa;
    }

    const professional = footer.querySelector(".footer-professional");
    if (professional && !professional.querySelector(".footer-main-cta")) {
      professional.insertAdjacentHTML(
        "afterbegin",
        `<div class="footer-main-cta">
          <span data-fa="قدم بعدی" data-en="Next step">قدم بعدی</span>
          <b data-fa="پروژه را با چند سوال ساده شروع کنید" data-en="Start with a few focused questions">پروژه را با چند سوال ساده شروع کنید</b>
          <p data-fa="نوع سایت، امکانات، بودجه و نیاز پنل را وارد کنید تا مسیر مناسب طراحی و اجرا مشخص شود." data-en="Share website type, features, budget and portal needs so the right build path becomes clear.">نوع سایت، امکانات، بودجه و نیاز پنل را وارد کنید تا مسیر مناسب طراحی و اجرا مشخص شود.</p>
          <div>
            <a class="footer-primary-action" href="order.html" data-fa="شروع پروژه" data-en="Start project">شروع پروژه</a>
            <a class="footer-secondary-action" href="portfolio.html" data-fa="دیدن دموها" data-en="View demos">دیدن دموها</a>
          </div>
        </div>`
      );
    }

    setBilingualCopy(".footer-status strong", "تحویل با آموزش، دسترسی کامل و مسیر رشد", "Launch with training, full access and a growth path", lang, { all: true });
    setBilingualCopy(
      ".footer-status p",
      "در پایان پروژه فقط فایل تحویل نمی‌گیرید؛ پنل، آموزش مدیریت، چک‌لیست دسترسی، برنامه پشتیبانی و مسیر ارتقای بعدی هم مشخص می‌شود.",
      "At launch you do not just receive files; you receive the portal, management training, access checklist, support plan and next upgrade path.",
      lang,
      { all: true }
    );
  });
}

function createOfferCard(number, titleFa, titleEn, textFa, textEn, link, actionFa, actionEn) {
  return `
    <article>
      <span>${number}</span>
      <h3 data-fa="${titleFa}" data-en="${titleEn}">${titleFa}</h3>
      <p data-fa="${textFa}" data-en="${textEn}">${textFa}</p>
      <a href="${link}" data-fa="${actionFa}" data-en="${actionEn}">${actionFa}</a>
    </article>`;
}

function enhanceBusinessOfferLayers() {
  const page = document.body.dataset.page || "";
  const file = window.location.pathname.split("/").pop() || "index.html";

  if (page === "services" && file === "services.html" && !document.querySelector(".service-product-cards")) {
    const serviceIndex = document.querySelector(".service-index");
    if (serviceIndex && !serviceIndex.querySelector('a[href="audit.html"]')) {
      serviceIndex.insertAdjacentHTML("beforeend", `<a href="audit.html" data-fa="بررسی رایگان سایت" data-en="Free website review">بررسی رایگان سایت</a>`);
    }
    const anchor = document.querySelector(".service-lanes, .services-grid, .section");
    const html = `
      <section class="section offer-system">
        <div class="section-head">
          <div>
            <p class="section-kicker">Productized Services</p>
            <h2 data-fa="خدماتی که مشتری دقیق می‌فهمد برای چه چیزی هزینه می‌کند" data-en="Services clients can understand, compare and order">خدماتی که مشتری دقیق می‌فهمد برای چه چیزی هزینه می‌کند</h2>
            <p data-fa="هر خدمت با خروجی مشخص، زمان‌بندی قابل پیگیری و مسیر ارتقا تعریف شده تا تصمیم‌گیری ساده‌تر و اعتماد اولیه سریع‌تر ساخته شود." data-en="Every service has a clear deliverable, trackable timeline and upgrade path so decisions become easier and trust forms faster.">هر خدمت با خروجی مشخص، زمان‌بندی قابل پیگیری و مسیر ارتقا تعریف شده تا تصمیم‌گیری ساده‌تر و اعتماد اولیه سریع‌تر ساخته شود.</p>
          </div>
          <a class="text-link" href="order.html" data-fa="شروع مشاوره پروژه" data-en="Start project consultation">شروع مشاوره پروژه</a>
        </div>
        <div class="service-product-cards">
          ${createOfferCard("01", "سایت معرفی کسب‌وکار", "Business website", "صفحه خانه، خدمات، نمونه‌کار، درباره ما، سوالات، فرم تماس و ساختار محتوایی آماده جذب مشتری.", "Home, services, portfolio, about, FAQ, contact flow and conversion-focused content structure.", "order.html?service=business", "درخواست سایت معرفی", "Request business site")}
          ${createOfferCard("02", "فروشگاه یا رزرو آنلاین", "Ecommerce or booking", "محصول، فیلتر، سبد خرید، رزرو نوبت، پیامک/ایمیل، پیگیری سفارش و مسیر پرداخت قابل توسعه.", "Products, filters, cart, appointment booking, notifications, order tracking and scalable payment flow.", "order.html?service=commerce", "طراحی مسیر فروش", "Design sales flow")}
          ${createOfferCard("03", "بازطراحی سایت فعلی", "Website redesign sprint", "بررسی ضعف‌های ظاهری، متن، سرعت، CTA، موبایل و تبدیل آن به ساختاری حرفه‌ای‌تر و قابل فروش‌تر.", "Audit visual quality, copy, speed, CTAs and mobile experience, then rebuild for stronger conversion.", "order.html?service=redesign", "درخواست بازطراحی", "Request redesign")}
          ${createOfferCard("04", "پنل مدیریت اختصاصی", "Custom management panel", "ویرایش صفحات، محتوا، قیمت‌ها، خدمات، شبکه‌های اجتماعی، تیکت‌ها، فایل‌ها و گزارش‌ها در یک پنل.", "Manage pages, content, prices, services, social links, tickets, files and reports in one portal.", "panel.html", "دیدن پنل", "View panel")}
          ${createOfferCard("05", "سئو و محتوای پایه", "SEO and content starter", "ساختار صفحات، عنوان‌ها، توضیحات، کلمات کلیدی محلی، متن‌های فروشنده و آماده‌سازی برای رشد گوگل.", "Page structure, titles, descriptions, local keywords, sales copy and a foundation for organic growth.", "order.html?service=seo", "بررسی سئو", "Audit SEO")}
          ${createOfferCard("06", "پشتیبانی و رشد ماهانه", "Monthly care and growth", "آپدیت، بکاپ، امنیت، تغییرات محتوا، گزارش عملکرد و پیشنهادهای ماهانه برای بهتر شدن سایت.", "Updates, backups, security, content changes, performance reports and monthly improvement ideas.", "packages.html#monthly-care", "دیدن پکیج‌ها", "View packages")}
        </div>
      </section>`;
    anchor?.insertAdjacentHTML("beforebegin", html);
  }

  if ((page === "home" || (page === "services" && file === "services.html")) && !document.querySelector(".audience-fit")) {
    const anchor = page === "home" ? document.querySelector(".home-service-paths, #demos") : document.querySelector(".offer-system, .service-product-cards")?.closest(".section");
    const html = `
      <section class="section audience-fit">
        <div class="section-head">
          <div>
            <p class="section-kicker">Who It Fits</p>
            <h2 data-fa="برای کسب‌وکارهایی که سایت را ابزار فروش و مدیریت می‌بینند" data-en="For businesses that see the website as a sales and management tool">برای کسب‌وکارهایی که سایت را ابزار فروش و مدیریت می‌بینند</h2>
            <p data-fa="ساختار سایت و پنل بر اساس نیاز واقعی هر صنف طراحی می‌شود؛ نه یک قالب تکراری با چند کلمه متفاوت." data-en="The website and portal are shaped around each business type, not a repeated template with changed words.">ساختار سایت و پنل بر اساس نیاز واقعی هر صنف طراحی می‌شود؛ نه یک قالب تکراری با چند کلمه متفاوت.</p>
          </div>
        </div>
        <div class="audience-grid">
          <article><b data-fa="آموزشگاه" data-en="Academies">آموزشگاه</b><span data-fa="دوره، ثبت‌نام، مدرس، تقویم کلاس و پرداخت" data-en="Courses, enrollment, tutors, schedule and payment">دوره، ثبت‌نام، مدرس، تقویم کلاس و پرداخت</span></article>
          <article><b data-fa="کلینیک و مطب" data-en="Clinics">کلینیک و مطب</b><span data-fa="نوبت‌دهی، پزشک، خدمات، پرونده و یادآوری" data-en="Appointments, doctors, services, records and reminders">نوبت‌دهی، پزشک، خدمات، پرونده و یادآوری</span></article>
          <article><b data-fa="سالن و زیبایی" data-en="Beauty salons">سالن و زیبایی</b><span data-fa="رزرو، نمونه‌کار، پکیج خدمات و وفادارسازی" data-en="Booking, gallery, service bundles and loyalty">رزرو، نمونه‌کار، پکیج خدمات و وفادارسازی</span></article>
          <article><b data-fa="فروشگاه" data-en="Stores">فروشگاه</b><span data-fa="محصول، فیلتر، سبد، کوپن و پیگیری سفارش" data-en="Products, filters, cart, coupons and order tracking">محصول، فیلتر، سبد، کوپن و پیگیری سفارش</span></article>
          <article><b data-fa="شرکت خدماتی" data-en="Service companies">شرکت خدماتی</b><span data-fa="خدمات، درخواست قیمت، قرارداد و تیکت" data-en="Services, quote request, contract and tickets">خدمات، درخواست قیمت، قرارداد و تیکت</span></article>
          <article><b data-fa="استارتاپ" data-en="Startups">استارتاپ</b><span data-fa="لندینگ، داشبورد، کاربر، پرداخت و توسعه مرحله‌ای" data-en="Landing, dashboard, users, payment and phased growth">لندینگ، داشبورد، کاربر، پرداخت و توسعه مرحله‌ای</span></article>
        </div>
      </section>`;
    anchor?.insertAdjacentHTML(page === "home" ? "beforebegin" : "afterend", html);
  }

  if ((page === "home" || (page === "services" && file === "services.html")) && !document.querySelector(".trust-stack")) {
    const anchor = document.querySelector(".audience-fit") || document.querySelector(".service-product-cards")?.closest(".section");
    const html = `
      <section class="section trust-stack">
        <div>
          <p class="section-kicker">Trust System</p>
          <h2 data-fa="قبل از شروع، مسیر تحویل و مالکیت پروژه شفاف می‌شود" data-en="Before we start, delivery and ownership are clear">قبل از شروع، مسیر تحویل و مالکیت پروژه شفاف می‌شود</h2>
          <p data-fa="برای کم کردن ریسک مشتری، پروژه با مرحله‌بندی، گزارش، نسخه قابل مشاهده، آموزش پنل و چک‌لیست دسترسی تحویل می‌شود." data-en="To reduce client risk, projects are delivered with phases, reports, preview builds, portal training and an access checklist.">برای کم کردن ریسک مشتری، پروژه با مرحله‌بندی، گزارش، نسخه قابل مشاهده، آموزش پنل و چک‌لیست دسترسی تحویل می‌شود.</p>
        </div>
        <div class="trust-grid">
          <article data-fa="بررسی نیاز و پیشنهاد مسیر" data-en="Discovery and build direction">بررسی نیاز و پیشنهاد مسیر</article>
          <article data-fa="طراحی قابل مشاهده قبل از اجرا" data-en="Visible design before build">طراحی قابل مشاهده قبل از اجرا</article>
          <article data-fa="تحویل مرحله‌ای و قابل پیگیری" data-en="Trackable phased delivery">تحویل مرحله‌ای و قابل پیگیری</article>
          <article data-fa="آموزش پنل مدیریت" data-en="Admin panel training">آموزش پنل مدیریت</article>
          <article data-fa="چک‌لیست دامنه، هاست و دسترسی‌ها" data-en="Domain, hosting and access checklist">چک‌لیست دامنه، هاست و دسترسی‌ها</article>
          <article data-fa="برنامه پشتیبانی و رشد بعد از لانچ" data-en="Support and growth plan after launch">برنامه پشتیبانی و رشد بعد از لانچ</article>
        </div>
      </section>`;
    anchor?.insertAdjacentHTML("afterend", html);
  }

  if ((page === "home" || (page === "services" && file === "services.html") || page === "packages") && !document.querySelector(".entry-offer")) {
    const anchor = document.querySelector(".trust-stack") || document.querySelector(".package-compare") || document.querySelector(".site-footer");
    const html = `
      <section class="section entry-offer">
        <div>
          <span data-fa="پیشنهاد شروع" data-en="Entry offer">پیشنهاد شروع</span>
          <h2 data-fa="بررسی رایگان سایت فعلی یا ایده پروژه در ۲۰ دقیقه" data-en="Free 20-minute review of your current website or project idea">بررسی رایگان سایت فعلی یا ایده پروژه در ۲۰ دقیقه</h2>
          <p data-fa="اگر هنوز نمی‌دانید سایت جدید، بازطراحی، فروشگاه یا پنل برای شما مناسب‌تر است، مسیر درست را با چند سوال کوتاه مشخص می‌کنیم." data-en="If you are unsure whether you need a new site, redesign, ecommerce or portal, we clarify the right path with a few focused questions.">اگر هنوز نمی‌دانید سایت جدید، بازطراحی، فروشگاه یا پنل برای شما مناسب‌تر است، مسیر درست را با چند سوال کوتاه مشخص می‌کنیم.</p>
        </div>
        <a class="btn btn-primary" href="order.html?service=audit" data-fa="درخواست بررسی رایگان" data-en="Request free review">درخواست بررسی رایگان</a>
      </section>`;
    anchor?.insertAdjacentHTML(anchor.classList?.contains("site-footer") ? "beforebegin" : "afterend", html);
  }
}

function enhancePortfolioSalesLayer() {
  if (document.body.dataset.page !== "portfolio" || document.querySelector(".demo-sales-layer")) return;
  const anchor = document.querySelector(".portfolio-grid, .demo-grid, .portfolio-method");
  anchor?.insertAdjacentHTML(
    "beforebegin",
    `<section class="section demo-sales-layer">
      <div>
        <p class="section-kicker">Sales Portfolio</p>
        <h2 data-fa="نمونه‌کار باید به مشتری حس پروژه واقعی بدهد، نه فقط یک تصویر زیبا" data-en="A portfolio should feel like a real project, not only a nice picture">نمونه‌کار باید به مشتری حس پروژه واقعی بدهد، نه فقط یک تصویر زیبا</h2>
        <p data-fa="برای هر دمو، صفحه خانه، صفحات داخلی، اکشن‌های اصلی، فرم‌ها و سناریوی کاربر طراحی شده تا مشتری قبل از سفارش بداند چه سطحی از اجرا دریافت می‌کند." data-en="Each demo includes homepage, inner pages, key actions, forms and user scenarios so clients understand the execution quality before ordering.">برای هر دمو، صفحه خانه، صفحات داخلی، اکشن‌های اصلی، فرم‌ها و سناریوی کاربر طراحی شده تا مشتری قبل از سفارش بداند چه سطحی از اجرا دریافت می‌کند.</p>
      </div>
      <div class="demo-sales-points">
        <span data-fa="اسکرین‌شات صفحه اول" data-en="Homepage screenshot">اسکرین‌شات صفحه اول</span>
        <span data-fa="دموی قابل کلیک" data-en="Clickable demo">دموی قابل کلیک</span>
        <span data-fa="امکانات مخصوص هر صنف" data-en="Industry-specific features">امکانات مخصوص هر صنف</span>
        <span data-fa="مسیر سفارش مشابه پروژه واقعی" data-en="Real project order flow">مسیر سفارش مشابه پروژه واقعی</span>
      </div>
    </section>`
  );
}

function enhanceOrderConsultLayer() {
  if (document.body.dataset.page !== "order" || document.querySelector(".consult-strip")) return;
  const anchor = document.querySelector(".smart-order, .order-workspace, .project-form");
  anchor?.insertAdjacentHTML(
    "beforebegin",
    `<section class="section consult-strip">
      <div>
        <p class="section-kicker">Project Consultation</p>
        <h2 data-fa="فرم سفارش مثل یک جلسه مشاوره کوتاه طراحی شده" data-en="The order form works like a short consultation">فرم سفارش مثل یک جلسه مشاوره کوتاه طراحی شده</h2>
        <p data-fa="به جای دریافت یک پیام مبهم، فرم مشخص می‌کند کسب‌وکار شما چیست، چه هدفی دارید، چه امکاناتی لازم است، بودجه و زمان‌بندی چقدر است و پنل چه سطحی از کنترل باید بدهد." data-en="Instead of a vague message, the form clarifies business type, goals, required features, budget, timeline and the level of portal control needed.">به جای دریافت یک پیام مبهم، فرم مشخص می‌کند کسب‌وکار شما چیست، چه هدفی دارید، چه امکاناتی لازم است، بودجه و زمان‌بندی چقدر است و پنل چه سطحی از کنترل باید بدهد.</p>
      </div>
      <div class="consult-questions">
        <span data-fa="هدف اصلی پروژه چیست؟" data-en="What is the main goal?">هدف اصلی پروژه چیست؟</span>
        <span data-fa="مخاطب باید چه کاری انجام دهد؟" data-en="What should visitors do?">مخاطب باید چه کاری انجام دهد؟</span>
        <span data-fa="کدام امکانات ضروری است؟" data-en="Which features are essential?">کدام امکانات ضروری است؟</span>
        <span data-fa="چه چیزی باید در پنل قابل ویرایش باشد؟" data-en="What should be editable in the panel?">چه چیزی باید در پنل قابل ویرایش باشد؟</span>
      </div>
    </section>`
  );
}

function enhanceSupportPackages() {
  if (document.body.dataset.page !== "packages" || document.querySelector(".care-package-grid")) return;
  const anchor = document.querySelector(".monthly-care, #monthly-care, .package-compare");
  anchor?.insertAdjacentHTML(
    "afterend",
    `<section class="section care-package-grid">
      <div class="section-head">
        <div>
          <p class="section-kicker">Monthly Care</p>
          <h2 data-fa="پشتیبانی ماهانه را به پکیج قابل انتخاب تبدیل کنید" data-en="Choose monthly support as a clear package">پشتیبانی ماهانه را به پکیج قابل انتخاب تبدیل کنید</h2>
          <p data-fa="سایت بعد از لانچ نیاز به مراقبت، تغییر محتوا، امنیت، گزارش و رشد دارد. هر پکیج سطح مشخصی از همراهی را پوشش می‌دهد." data-en="After launch, a website needs care, content changes, security, reporting and growth. Each package covers a clear level of support.">سایت بعد از لانچ نیاز به مراقبت، تغییر محتوا، امنیت، گزارش و رشد دارد. هر پکیج سطح مشخصی از همراهی را پوشش می‌دهد.</p>
        </div>
      </div>
      <div class="care-grid">
        <article><span>Care</span><h3 data-fa="پایه" data-en="Basic">پایه</h3><p data-fa="آپدیت، بکاپ، بررسی امنیت و رفع خطاهای کوچک برای سایت‌های تازه راه‌اندازی‌شده." data-en="Updates, backups, security checks and small fixes for newly launched websites.">آپدیت، بکاپ، بررسی امنیت و رفع خطاهای کوچک برای سایت‌های تازه راه‌اندازی‌شده.</p></article>
        <article><span>Growth</span><h3 data-fa="رشد" data-en="Growth">رشد</h3><p data-fa="تغییرات محتوا، بهبود صفحات، گزارش ماهانه و پیشنهادهای عملی برای جذب مشتری بیشتر." data-en="Content changes, page improvements, monthly reports and practical ideas to win more clients.">تغییرات محتوا، بهبود صفحات، گزارش ماهانه و پیشنهادهای عملی برای جذب مشتری بیشتر.</p></article>
        <article><span>Pro</span><h3 data-fa="حرفه‌ای" data-en="Professional">حرفه‌ای</h3><p data-fa="کمپین، توسعه امکانات، بهبود پنل، صفحات جدید و همراهی نزدیک برای کسب‌وکارهای فعال." data-en="Campaigns, feature growth, panel improvements, new pages and closer support for active businesses.">کمپین، توسعه امکانات، بهبود پنل، صفحات جدید و همراهی نزدیک برای کسب‌وکارهای فعال.</p></article>
      </div>
    </section>`
  );
}

function enhancePanelAdvantage() {
  if (document.body.dataset.page !== "panel" || document.querySelector(".panel-advantage-strip")) return;
  const anchor = document.querySelector(".panel-dashboard, .manager-grid, .section");
  anchor?.insertAdjacentHTML(
    "beforebegin",
    `<section class="section panel-advantage-strip">
      <div>
        <p class="section-kicker">Control Center</p>
        <h2 data-fa="مزیت اصلی Vitra Studio فقط طراحی ظاهر نیست؛ کنترل بعد از تحویل است" data-en="Vitra Studio’s main advantage is not only visual design; it is control after launch">مزیت اصلی Vitra Studio فقط طراحی ظاهر نیست؛ کنترل بعد از تحویل است</h2>
        <p data-fa="پنل باید کاری کند مدیر سایت برای تغییر قیمت، ساخت صفحه، افزودن خدمت، دیدن تیکت، مدیریت مشتری و لینک شبکه‌های اجتماعی وابسته نماند." data-en="The panel should let website owners change prices, create pages, add services, view tickets, manage clients and update social links without dependency.">پنل باید کاری کند مدیر سایت برای تغییر قیمت، ساخت صفحه، افزودن خدمت، دیدن تیکت، مدیریت مشتری و لینک شبکه‌های اجتماعی وابسته نماند.</p>
      </div>
      <div class="panel-advantage-list">
        <span data-fa="ساخت صفحه جدید" data-en="Create new pages">ساخت صفحه جدید</span>
        <span data-fa="ویرایش قیمت و خدمات" data-en="Edit prices and services">ویرایش قیمت و خدمات</span>
        <span data-fa="مدیریت تیکت و مشتری" data-en="Manage tickets and clients">مدیریت تیکت و مشتری</span>
        <span data-fa="کنترل فوتر و شبکه‌ها" data-en="Control footer and socials">کنترل فوتر و شبکه‌ها</span>
      </div>
    </section>`
  );
}

function enhanceDedicatedServicePages() {
  const file = window.location.pathname.split("/").pop() || "";
  const configs = {
    "website-design.html": {
      kicker: "Website Design",
      titleFa: "خروجی طراحی سایت دقیقا چه چیزهایی است؟",
      titleEn: "What exactly is delivered with website design?",
      copyFa: "این سرویس برای کسب‌وکارهایی است که می‌خواهند یک سایت چندصفحه‌ای، سریع، دوزبانه و آماده جذب مشتری داشته باشند؛ با متن فروش‌محور، مسیر تماس روشن و امکان توسعه به پنل.",
      copyEn: "This service is for businesses that need a fast, bilingual, multi-page website ready to attract clients, with conversion copy, clear contact paths and room for portal expansion.",
      items: [
        ["معماری صفحه خانه و مسیر CTA", "Homepage architecture and CTA path"],
        ["صفحات خدمات، درباره، نمونه‌کار و سوالات", "Services, about, portfolio and FAQ pages"],
        ["متن‌های فروشنده و قابل اعتماد", "Trust-building sales copy"],
        ["نسخه موبایل، سرعت و سئوی پایه", "Mobile version, speed and baseline SEO"]
      ],
      outcomeFa: "مناسب برای شروع حرفه‌ای، گرفتن تماس بیشتر و ساختن ویترینی که بعدا به پنل، فروشگاه یا رزرو وصل شود.",
      outcomeEn: "Best for a professional launch, more inquiries and a storefront that can later connect to a portal, store or booking flow.",
      ctaFa: "درخواست طراحی سایت",
      ctaEn: "Request website design",
      service: "website"
    },
    "redesign.html": {
      kicker: "Redesign Sprint",
      titleFa: "بازطراحی فقط زیباتر کردن سایت نیست؛ اصلاح مسیر فروش است",
      titleEn: "Redesign is not only visual polish; it fixes the sales path",
      copyFa: "در بازطراحی، ضعف‌های صفحه اول، متن، سرعت، موبایل، اعتماد، CTA و ساختار خدمات بررسی می‌شود و سایت به نسخه‌ای مدرن‌تر و قابل فروش‌تر تبدیل می‌شود.",
      copyEn: "In redesign, homepage, copy, speed, mobile, trust, CTAs and service structure are audited and rebuilt into a more modern, sales-ready experience.",
      items: [
        ["تحلیل مشکل سایت فعلی و رقبا", "Current website and competitor audit"],
        ["بازنویسی پیام اصلی و CTAها", "Rewrite main message and CTAs"],
        ["بهبود خوانایی، موبایل و سرعت", "Improve readability, mobile and speed"],
        ["آماده‌سازی برای پنل و رشد بعدی", "Prepare for portal and future growth"]
      ],
      outcomeFa: "مناسب برای سایت‌هایی که ظاهر قدیمی دارند، اعتماد نمی‌سازند یا بازدید را به درخواست تبدیل نمی‌کنند.",
      outcomeEn: "Best for websites that feel outdated, fail to build trust or do not turn visits into inquiries.",
      ctaFa: "درخواست بازطراحی",
      ctaEn: "Request redesign",
      service: "redesign"
    },
    "portal.html": {
      kicker: "Portal System",
      titleFa: "پنل اختصاصی برای اینکه سایت بعد از تحویل زنده بماند",
      titleEn: "A custom portal keeps the website alive after launch",
      copyFa: "پنل برای مدیریت صفحه‌ها، خدمات، قیمت‌ها، مشتری‌ها، تیکت‌ها، فایل‌ها و لینک‌های شبکه اجتماعی طراحی می‌شود تا مدیر سایت وابسته نماند.",
      copyEn: "The portal manages pages, services, prices, clients, tickets, files and social links so the website owner stays independent.",
      items: [
        ["ساخت و ویرایش صفحه و خدمت", "Create and edit pages and services"],
        ["کنترل قیمت‌ها و محتوای سایت", "Control prices and site content"],
        ["تیکت، فایل و وضعیت پروژه", "Tickets, files and project status"],
        ["سطح دسترسی مدیر و مشتری", "Admin and client access levels"]
      ],
      outcomeFa: "مناسب برای کسب‌وکارهایی که تغییرات مداوم، سفارش، مشتری و پشتیبانی دارند.",
      outcomeEn: "Best for businesses with frequent changes, orders, clients and support needs.",
      ctaFa: "درخواست پنل اختصاصی",
      ctaEn: "Request custom portal",
      service: "portal"
    },
    "seo-growth.html": {
      kicker: "SEO Growth",
      titleFa: "سئو و محتوا باید از همان ساختار سایت شروع شود",
      titleEn: "SEO and content should start from the website structure",
      copyFa: "این سرویس ساختار عنوان‌ها، متن صفحات، کلمات کلیدی، لینک‌سازی داخلی، سرعت، متاتگ‌ها و مسیر تولید محتوای بعدی را آماده می‌کند.",
      copyEn: "This service prepares headings, page copy, keywords, internal links, speed, meta tags and the next content growth path.",
      items: [
        ["سئوی پایه و فنی صفحات", "Baseline and technical page SEO"],
        ["متن خدمات با هدف جذب مشتری", "Service copy built for inquiries"],
        ["پیشنهاد محتوای ماهانه", "Monthly content ideas"],
        ["گزارش رشد و اولویت‌های بعدی", "Growth report and next priorities"]
      ],
      outcomeFa: "مناسب برای سایت‌هایی که می‌خواهند بعد از طراحی هم دیده شوند و رشد کنند.",
      outcomeEn: "Best for websites that need visibility and growth after launch.",
      ctaFa: "درخواست بررسی سئو",
      ctaEn: "Request SEO review",
      service: "seo"
    },
    "monthly-support.html": {
      kicker: "Monthly Care",
      titleFa: "پشتیبانی ماهانه برای نگهداری، تغییر و رشد سایت",
      titleEn: "Monthly care for maintenance, changes and growth",
      copyFa: "بعد از لانچ، سایت نیاز به بکاپ، امنیت، آپدیت، تغییر محتوا، گزارش و پیشنهادهای رشد دارد. این سرویس سایت را فعال و قابل اعتماد نگه می‌دارد.",
      copyEn: "After launch, a website needs backups, security, updates, content changes, reports and growth ideas. This service keeps it active and reliable.",
      items: [
        ["بکاپ، امنیت و آپدیت", "Backups, security and updates"],
        ["تغییرات محتوایی و صفحه جدید", "Content changes and new pages"],
        ["گزارش ماهانه و پیشنهاد رشد", "Monthly report and growth ideas"],
        ["تیکت پشتیبانی و اولویت‌بندی", "Support tickets and prioritization"]
      ],
      outcomeFa: "مناسب برای سایت‌هایی که قرار نیست بعد از تحویل رها شوند.",
      outcomeEn: "Best for websites that should not be abandoned after launch.",
      ctaFa: "انتخاب پشتیبانی ماهانه",
      ctaEn: "Choose monthly support",
      service: "support"
    },
    "server.html": {
      kicker: "Infrastructure",
      titleFa: "زیرساخت تمیز یعنی سایت سریع‌تر، امن‌تر و قابل توسعه‌تر",
      titleEn: "Clean infrastructure means a faster, safer and more scalable website",
      copyFa: "هاست، VPS، دامنه، SSL، ایمیل سازمانی، بکاپ، مانیتورینگ و مستندات دسترسی به شکلی تنظیم می‌شود که پروژه از پایه مطمئن شروع شود.",
      copyEn: "Hosting, VPS, domain, SSL, business email, backups, monitoring and access documentation are prepared so the project starts on a reliable base.",
      items: [
        ["انتخاب هاست یا سرور مناسب", "Choose suitable hosting or server"],
        ["اتصال دامنه، DNS و SSL", "Connect domain, DNS and SSL"],
        ["ایمیل سازمانی و بکاپ", "Business email and backups"],
        ["مستندات تحویل و امنیت", "Delivery docs and security"]
      ],
      outcomeFa: "مناسب برای پروژه‌هایی که سرعت، پایداری و مالکیت دسترسی‌ها مهم است.",
      outcomeEn: "Best for projects where speed, reliability and access ownership matter.",
      ctaFa: "درخواست راه‌اندازی زیرساخت",
      ctaEn: "Request infrastructure setup",
      service: "server"
    }
  };
  const config = configs[file];
  if (!config || document.querySelector(".service-deep")) return;
  const anchor = document.querySelector(".page-hero");
  const items = config.items
    .map(([fa, en]) => `<article><span data-fa="${fa}" data-en="${en}">${fa}</span></article>`)
    .join("");
  anchor?.insertAdjacentHTML(
    "afterend",
    `<section class="section service-deep">
      <div class="service-deep-copy">
        <p class="section-kicker">${config.kicker}</p>
        <h2 data-fa="${config.titleFa}" data-en="${config.titleEn}">${config.titleFa}</h2>
        <p data-fa="${config.copyFa}" data-en="${config.copyEn}">${config.copyFa}</p>
      </div>
      <div class="service-deep-grid">${items}</div>
      <div class="service-deep-outcome">
        <b data-fa="خروجی قابل لمس" data-en="Tangible outcome">خروجی قابل لمس</b>
        <p data-fa="${config.outcomeFa}" data-en="${config.outcomeEn}">${config.outcomeFa}</p>
        <a class="btn btn-primary" href="order.html?service=${config.service}" data-fa="${config.ctaFa}" data-en="${config.ctaEn}">${config.ctaFa}</a>
      </div>
    </section>
    <section class="section service-faq-mini">
      <article><b data-fa="از کجا شروع می‌شود؟" data-en="Where does it start?">از کجا شروع می‌شود؟</b><p data-fa="با بررسی هدف، مخاطب، رقبا، محتوای موجود و سطح پنل مورد نیاز." data-en="With goals, audience, competitors, current content and required portal level.">با بررسی هدف، مخاطب، رقبا، محتوای موجود و سطح پنل مورد نیاز.</p></article>
      <article><b data-fa="قیمت چطور مشخص می‌شود؟" data-en="How is pricing defined?">قیمت چطور مشخص می‌شود؟</b><p data-fa="بر اساس تعداد صفحات، امکانات، زبان‌ها، سطح پنل، محتوا و زمان‌بندی." data-en="Based on pages, features, languages, portal level, content and timeline.">بر اساس تعداد صفحات، امکانات، زبان‌ها، سطح پنل، محتوا و زمان‌بندی.</p></article>
      <article><b data-fa="بعد از تحویل چه می‌شود؟" data-en="What happens after launch?">بعد از تحویل چه می‌شود؟</b><p data-fa="آموزش، دسترسی‌ها، چک‌لیست تحویل و مسیر پشتیبانی یا رشد مشخص می‌شود." data-en="Training, access, launch checklist and support or growth path are defined.">آموزش، دسترسی‌ها، چک‌لیست تحویل و مسیر پشتیبانی یا رشد مشخص می‌شود.</p></article>
    </section>`
  );
}

function enhanceOrderRecommendation() {
  if (document.body.dataset.page !== "order" || document.querySelector(".smart-recommendation")) return;
  const wizard = document.querySelector(".wizard-grid");
  wizard?.insertAdjacentHTML(
    "afterend",
    `<aside class="smart-recommendation">
      <div>
        <span data-fa="پیشنهاد اولیه" data-en="Initial recommendation">پیشنهاد اولیه</span>
        <b data-smart-package data-fa="Growth + پنل پایه" data-en="Growth + basic portal">Growth + پنل پایه</b>
        <p data-smart-reason data-fa="با توجه به انتخاب‌ها، بهتر است پروژه با سایت چندصفحه‌ای، فرم سفارش و پنل قابل توسعه شروع شود." data-en="Based on your choices, start with a multi-page website, order form and scalable portal.">با توجه به انتخاب‌ها، بهتر است پروژه با سایت چندصفحه‌ای، فرم سفارش و پنل قابل توسعه شروع شود.</p>
      </div>
      <a class="btn btn-ghost" href="packages.html" data-fa="مقایسه پکیج‌ها" data-en="Compare packages">مقایسه پکیج‌ها</a>
    </aside>`
  );
}

function updateSmartRecommendation() {
  const box = document.querySelector(".smart-recommendation");
  if (!box) return;
  const checked = [...document.querySelectorAll("[data-price-addon]:checked")].map((item) => item.dataset.priceAddon);
  const budget = Number(document.querySelector("[data-budget-range]")?.value || 28);
  let fa = "Launch + سایت معرفی";
  let en = "Launch + business website";
  let reasonFa = "برای شروع سریع، سایت چندصفحه‌ای با فرم تماس، خدمات، نمونه‌کار و سئوی پایه کافی است.";
  let reasonEn = "For a fast start, a multi-page website with contact flow, services, portfolio and baseline SEO is enough.";
  if (checked.includes("shop") || checked.includes("booking") || budget >= 45) {
    fa = "Growth + مسیر فروش";
    en = "Growth + sales flow";
    reasonFa = "نیاز به رزرو، فروشگاه یا بودجه بالاتر یعنی بهتر است مسیر فروش، پیگیری سفارش و پنل مدیریتی جدی‌تر طراحی شود.";
    reasonEn = "Booking, ecommerce or a higher budget means the sales flow, order tracking and admin panel should be designed more seriously.";
  }
  if (checked.includes("panel") && checked.length >= 3 && budget >= 60) {
    fa = "Command + پنل کامل";
    en = "Command + full portal";
    reasonFa = "وقتی چند قابلیت اصلی و بودجه بالاتر انتخاب شده، پنل کامل برای مدیریت محتوا، قیمت، تیکت، مشتری و گزارش بهترین مسیر است.";
    reasonEn = "With several core features and a higher budget, the full portal for content, pricing, tickets, clients and reports is the best path.";
  }
  const title = box.querySelector("[data-smart-package]");
  const reason = box.querySelector("[data-smart-reason]");
  if (title) {
    title.dataset.fa = fa;
    title.dataset.en = en;
    title.textContent = activeLanguage === "fa" ? fa : en;
  }
  if (reason) {
    reason.dataset.fa = reasonFa;
    reason.dataset.en = reasonEn;
    reason.textContent = activeLanguage === "fa" ? reasonFa : reasonEn;
  }
}

function enhanceAuditPage() {
  if (document.body.dataset.page !== "audit") return;
  document.querySelectorAll("[data-audit-form]").forEach((form) => {
    if (form.dataset.bound === "true") return;
    form.dataset.bound = "true";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const result = document.querySelector("[data-audit-result]");
      const site = form.querySelector('[name="website"]')?.value || "";
      if (result) {
        result.hidden = false;
        result.innerHTML = `
          <b>${activeLanguage === "fa" ? "درخواست بررسی ثبت شد" : "Review request saved"}</b>
          <p>${activeLanguage === "fa" ? `آدرس ${site || "سایت شما"} برای بررسی اولیه ثبت شد. خروجی پیشنهادی شامل ایرادهای ظاهری، CTA، سرعت، محتوا، سئو و مسیر پنل خواهد بود.` : `${site || "Your website"} was saved for an initial review. The suggested output covers visual issues, CTAs, speed, content, SEO and portal direction.`}</p>
          <a class="btn btn-primary" href="order.html?service=audit">${activeLanguage === "fa" ? "تکمیل فرم پروژه" : "Complete project form"}</a>
        `;
      }
    });
  });
}

function enhanceStrategicLayers() {
  enhanceBusinessOfferLayers();
  enhanceDedicatedServicePages();
  enhancePortfolioSalesLayer();
  enhanceOrderConsultLayer();
  enhanceOrderRecommendation();
  enhanceSupportPackages();
  enhancePanelAdvantage();
  enhanceAuditPage();
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
  enhanceStrategicLayers();
  polishMarketingCopy(lang);
  polishFooterCTA(lang);
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
  updateSmartRecommendation();
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
document.querySelectorAll("[data-budget-range], [data-price-addon]").forEach((input) => {
  input.addEventListener("input", updateSmartRecommendation);
  input.addEventListener("change", updateSmartRecommendation);
});

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
    updateSmartRecommendation();
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
