const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
};

document.querySelectorAll("[data-demo-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.demoAction;
    if (action === "academy-focus") setText("[data-schedule-output]", "Learning path activated. Your first live class is selected.");
    if (action === "academy-selected") button.textContent = "Added";
    if (action === "salon-glow") setText("[data-salon-output]", "Booking draft created for the luxury chair.");
    if (action === "clinic-emergency") setText("[data-clinic-output]", "Emergency call request sent to the front desk.");
    if (action === "clinic-note") setText("[data-clinic-output]", "Secure patient note was saved in this demo.");
    if (action === "shop-coupon") button.textContent = "Coupon applied";
    if (action === "shop-track") setText("[data-shop-status]", "Order VT-2048 is packed and ready for courier pickup.");
  });
});

document.querySelectorAll("[data-filter-course]").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.filterCourse;
    document.querySelectorAll("[data-filter-course]").forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelectorAll("[data-course]").forEach((card) => {
      card.hidden = type !== "all" && card.dataset.course !== type;
    });
  });
});

document.querySelector("[data-demo-range='progress']")?.addEventListener("input", (event) => {
  setText("[data-progress-value]", `${event.target.value}%`);
});

document.querySelectorAll("[data-schedule]").forEach((button) => {
  button.addEventListener("click", () => {
    setText("[data-schedule-output]", `${button.dataset.schedule} class selected. Seat reserved in preview mode.`);
  });
});

document.querySelectorAll("[data-salon-service]").forEach((button) => {
  button.addEventListener("click", () => {
    const [name, time, price] = button.dataset.salonService.split("|");
    document.querySelectorAll("[data-salon-service]").forEach((item) => item.classList.toggle("is-active", item === button));
    setText("[data-salon-name]", name);
    setText("[data-salon-meta]", `${time} - ${price}`);
  });
});

document.querySelectorAll("[data-salon-stylist]").forEach((button) => {
  button.addEventListener("click", () => {
    setText("[data-salon-output]", `${button.dataset.salonStylist} selected as stylist.`);
  });
});

document.querySelectorAll("[data-clinic-day]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-clinic-day]").forEach((item) => item.classList.toggle("is-active", item === button));
    setText("[data-clinic-output]", `Showing ${button.dataset.clinicDay} schedule.`);
    setText("[data-clinic-visits]", button.dataset.clinicDay === "Today" ? "42" : "31");
  });
});

let cartCount = 0;
const cartItems = [];
document.querySelectorAll("[data-shop-add]").forEach((button) => {
  button.addEventListener("click", () => {
    cartCount += 1;
    cartItems.push(button.dataset.shopAdd);
    setText("[data-cart-count]", cartCount);
    setText("[data-cart-lines]", cartItems.map((item) => `• ${item}`).join("  "));
    button.textContent = "Added";
  });
});

document.querySelectorAll("[data-shop-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.shopFilter;
    document.querySelectorAll("[data-shop-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelectorAll("[data-product-type]").forEach((card) => {
      card.hidden = type !== "all" && card.dataset.productType !== type;
    });
  });
});
