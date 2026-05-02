// ================================
// MOBILE MENU
// ================================
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    const isExpanded = !mobileMenu.classList.contains("hidden");
    menuToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");

    const line1 = menuToggle.querySelector(".line1");
    const line2 = menuToggle.querySelector(".line2");
    const line3 = menuToggle.querySelector(".line3");

    if (line1 && line2 && line3) {
      if (isExpanded) {
        line1.style.transform = "translateY(6px) rotate(45deg)";
        line2.style.opacity = "0";
        line3.style.transform = "translateY(-6px) rotate(-45deg)";
      } else {
        line1.style.transform = "none";
        line2.style.opacity = "1";
        line3.style.transform = "none";
      }
    }
  });
}

// ================================
// REVEAL ON SCROLL
// ================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-6");
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    },
    {
      threshold: 0.05
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => {
    el.classList.remove("opacity-0", "translate-y-6");
    el.classList.add("opacity-100", "translate-y-0");
  });
}

// ================================
// MANDALA ROTATE + ZOOM ON SCROLL
// ================================
const mainMandala = document.getElementById("mainMandala");

if (mainMandala) {
  function updateMandala() {
    const scrollY = window.scrollY || window.pageYOffset;
    const rotateDeg = scrollY * 0.08;
    const scaleValue = 1.12 + Math.min(scrollY * 0.00015, 0.18);

    mainMandala.style.transform =
      `translate(-50%, -50%) scale(${scaleValue}) rotate(${rotateDeg}deg)`;
  }

  updateMandala();
  window.addEventListener("scroll", updateMandala, { passive: true });
}

// ================================
// QUOTE BUILDER DATA
// ================================
const PACKAGE_DATA = {
  svc: {
    shraddha: {
      name: "Shraddha",
      price: 21000,
      description:
        "A simple devotional setup for intimate spiritual gatherings.",
      includes: [
        "Basic pooja arrangement",
        "Simple devotional flow",
        "Essential ritual items",
        "Suitable for family functions"
      ]
    },
    bhakti: {
      name: "Bhakti",
      price: 41000,
      description:
        "A balanced devotional package with stronger presentation and flow.",
      includes: [
        "Enhanced pooja arrangement",
        "Refined ritual coordination",
        "Improved ambience support",
        "Suitable for medium-sized gatherings"
      ]
    },
    divya: {
      name: "Divya",
      price: 100000,
      description:
        "A premium spiritual experience for large, memorable events.",
      includes: [
        "Grand devotional arrangement",
        "Premium event flow",
        "Expanded ritual support",
        "Best for premium gatherings and celebrations"
      ]
    }
  },

  dec: {
    saral: {
      name: "Saral",
      price: 11000,
      description:
        "Clean and simple devotional decor for graceful events.",
      includes: [
        "Basic floral styling",
        "Simple stage/background decor",
        "Subtle traditional theme"
      ]
    },
    utsav: {
      name: "Utsav",
      price: 41000,
      description:
        "Festive decor setup with richer presentation and color.",
      includes: [
        "Festive floral styling",
        "Enhanced backdrop setup",
        "Entry and focal point decor",
        "Suitable for celebratory events"
      ]
    },
    swarn: {
      name: "Swarn",
      price: 75000,
      description:
        "Luxury devotional decor with premium visual impact.",
      includes: [
        "Premium floral concepts",
        "Elegant stage styling",
        "Grand theme detailing",
        "Premium event-grade visual setup"
      ]
    }
  },

  seat: {
    dharti: {
      name: "Dharti Floor",
      price: 100,
      description:
        "Comfortable floor-style devotional seating.",
      includes: [
        "Traditional floor arrangement",
        "Suitable for satsang style seating"
      ]
    },
    aasan: {
      name: "Aasan Chair",
      price: 500,
      description:
        "Standard chair seating for guest comfort.",
      includes: [
        "Chair seating setup",
        "Better comfort for mixed audience gatherings"
      ]
    },
    sneh: {
      name: "Sneh VIP",
      price: 2000,
      description:
        "Premium seating experience for special guests.",
      includes: [
        "VIP seating layout",
        "Premium comfort arrangement",
        "Best for reserved guest sections"
      ]
    }
  },

  prs: {
    patra: {
      name: "Patra",
      price: 30,
      description:
        "Simple prasad distribution for devotional gatherings.",
      includes: [
        "Basic prasad serving",
        "Cost-effective per guest option"
      ]
    },
    bhandara: {
      name: "Bhandara",
      price: 120,
      description:
        "Traditional bhandara serving for community events.",
      includes: [
        "Fulfilling serving option",
        "Ideal for medium and large gatherings"
      ]
    },
    divyab: {
      name: "Divya Bhandara",
      price: 200,
      description:
        "Premium bhandara option for a richer guest experience.",
      includes: [
        "Premium serving experience",
        "Suitable for special gatherings and larger events"
      ]
    }
  }
};

// ================================
// GLOBAL STATE
// ================================
const state = {
  client: {
    name: "",
    phone: "",
    event: "",
    date: ""
  },
  svc: null,
  dec: null,
  seat: null,
  prs: null,
  paxSeat: 0,
  paxPrs: 0,
  souvenirPax: 0,
  welcomes: [],
  welcomeBundle: false,
  addons: []
};

// ================================
// HELPERS
// ================================
function formatINR(amount) {
  const safeAmount = Number(amount) || 0;
  return `₹${safeAmount.toLocaleString("en-IN")}`;
}

function byId(id) {
  return document.getElementById(id);
}

function getTextValue(id) {
  const el = byId(id);
  return el ? el.value.trim() : "";
}

function getNumberValue(id) {
  const el = byId(id);
  if (!el) return 0;
  const value = parseInt(el.value, 10);
  return Number.isNaN(value) || value < 0 ? 0 : value;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (match) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return map[match];
  });
}

// ================================
// DETAIL CARD RENDER
// ================================
function renderDetailCard(type, key) {
  const detail = byId(`${type}-detail`);
  if (!detail) return;

  if (!key || !PACKAGE_DATA[type] || !PACKAGE_DATA[type][key]) {
    detail.classList.remove("open");
    detail.innerHTML = "";
    return;
  }

  const item = PACKAGE_DATA[type][key];

  detail.innerHTML = `
    <div class="mt-3 rounded-2xl border border-orange-200 bg-orange-50/80 p-4 animate-in">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 class="text-lg font-semibold text-deepBhagwa">${escapeHtml(item.name)}</h4>
          <p class="text-sm text-darkBrown/75 mt-1">${escapeHtml(item.description)}</p>
        </div>
        <div class="text-right">
          <div class="text-sm text-darkBrown/60">Starting from</div>
          <div class="text-lg font-bold text-bhagwa">${formatINR(item.price)}</div>
        </div>
      </div>
      <ul class="mt-3 space-y-2 text-sm text-darkBrown/80 list-disc pl-5">
        ${item.includes.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
      </ul>
    </div>
  `;

  detail.classList.add("open");
}

// ================================
// PACKAGE SELECT
// ================================
function selPkg(type, key, el) {
  const dataGroup = PACKAGE_DATA[type];
  if (!dataGroup || !dataGroup[key]) return;

  state[type] = key;

  const pillsWrap = el.parentElement;
  if (pillsWrap) {
    pillsWrap.querySelectorAll(".pill").forEach((pill) => {
      pill.classList.remove("active");
    });
  }

  el.classList.add("active");
  renderDetailCard(type, key);

  if (type === "seat") {
    const seatPaxWrap = byId("seat-pax");
    if (seatPaxWrap) seatPaxWrap.classList.remove("hidden");
    calcSeat();
  }

  if (type === "prs") {
    const prsPaxWrap = byId("prs-pax");
    if (prsPaxWrap) prsPaxWrap.classList.remove("hidden");
    calcPrs();
  }

  updateSummary();
}

// ================================
// CLIENT INFO UPDATE
// ================================
function upd() {
  state.client.name = getTextValue("cname");
  state.client.phone = getTextValue("cphone");
  state.client.event = getTextValue("cevent");
  state.client.date = getTextValue("cdate");
  updateSummary();
}

// ================================
// SEATING CALC
// ================================
function calcSeat() {
  state.paxSeat = getNumberValue("pax-seat");
  const live = byId("seat-live");

  if (!state.seat) {
    if (live) live.textContent = "";
    updateSummary();
    return;
  }

  const rate = PACKAGE_DATA.seat[state.seat].price;
  const total = rate * state.paxSeat;

  if (live) {
    live.textContent = state.paxSeat > 0
      ? `${state.paxSeat} × ${formatINR(rate)} = ${formatINR(total)}`
      : "";
  }

  updateSummary();
}

// ================================
// PRASAD CALC
// ================================
function calcPrs() {
  state.paxPrs = getNumberValue("pax-prs");
  const live = byId("prs-live");

  if (!state.prs) {
    if (live) live.textContent = "";
    updateSummary();
    return;
  }

  const rate = PACKAGE_DATA.prs[state.prs].price;
  const total = rate * state.paxPrs;

  if (live) {
    live.textContent = state.paxPrs > 0
      ? `${state.paxPrs} × ${formatINR(rate)} = ${formatINR(total)}`
      : "";
  }

  updateSummary();
}

// ================================
// SOUVENIR CALC
// ================================
function calcSov() {
  state.souvenirPax = getNumberValue("pax-sov");
  const live = byId("sov-live");
  const rate = 150;
  const total = rate * state.souvenirPax;

  if (live) {
    live.textContent = state.souvenirPax > 0
      ? `${state.souvenirPax} × ${formatINR(rate)} = ${formatINR(total)}`
      : "";
  }

  updateSummary();
}

// ================================
// WELCOME SERVICES
// ================================
function togWel(el, price, name) {
  if (state.welcomeBundle) {
    state.welcomeBundle = false;
    const bundleBtn = document.querySelector("#wel-pills .bundle");
    if (bundleBtn) bundleBtn.classList.remove("active");
  }

  const existingIndex = state.welcomes.findIndex((item) => item.name === name);

  if (existingIndex > -1) {
    state.welcomes.splice(existingIndex, 1);
    el.classList.remove("active");
  } else {
    state.welcomes.push({ name, price });
    el.classList.add("active");
  }

  updateSummary();
}

function togBundle(el) {
  const allWelcomePills = document.querySelectorAll("#wel-pills .pill:not(.bundle)");

  if (state.welcomeBundle) {
    state.welcomeBundle = false;
    state.welcomes = [];
    el.classList.remove("active");
    allWelcomePills.forEach((pill) => pill.classList.remove("active"));
  } else {
    state.welcomeBundle = true;
    state.welcomes = [];
    el.classList.add("active");
    allWelcomePills.forEach((pill) => pill.classList.remove("active"));
  }

  updateSummary();
}

// ================================
// ADD-ONS
// ================================
function togAdd(el, price, name) {
  const existingIndex = state.addons.findIndex((item) => item.name === name);

  if (existingIndex > -1) {
    state.addons.splice(existingIndex, 1);
    el.classList.remove("active");
  } else {
    state.addons.push({ name, price });
    el.classList.add("active");
  }

  updateSummary();
}

// ================================
// BUILD SUMMARY
// ================================
function getSummaryRows() {
  const rows = [];

  if (state.svc) {
    const item = PACKAGE_DATA.svc[state.svc];
    rows.push({
      label: `Service — ${item.name}`,
      meta: "Base package",
      amount: item.price
    });
  }

  if (state.dec) {
    const item = PACKAGE_DATA.dec[state.dec];
    rows.push({
      label: `Decor — ${item.name}`,
      meta: "Decor package",
      amount: item.price
    });
  }

  if (state.seat) {
    const item = PACKAGE_DATA.seat[state.seat];
    const pax = state.paxSeat || 0;
    rows.push({
      label: `Seating — ${item.name}`,
      meta: pax > 0 ? `${pax} guests × ${formatINR(item.price)}` : "No guest count entered yet",
      amount: pax * item.price
    });
  }

  if (state.prs) {
    const item = PACKAGE_DATA.prs[state.prs];
    const pax = state.paxPrs || 0;
    rows.push({
      label: `Prasad — ${item.name}`,
      meta: pax > 0 ? `${pax} guests × ${formatINR(item.price)}` : "No guest count entered yet",
      amount: pax * item.price
    });
  }

  if (state.welcomeBundle) {
    rows.push({
      label: "Welcome Services — Full Bundle",
      meta: "Bundle selected",
      amount: 15000
    });
  } else {
    state.welcomes.forEach((item) => {
      rows.push({
        label: `Welcome — ${item.name}`,
        meta: "Selected",
        amount: item.price
      });
    });
  }

  state.addons.forEach((item) => {
    rows.push({
      label: `Add-on — ${item.name}`,
      meta: "Selected",
      amount: item.price
    });
  });

  if (state.souvenirPax > 0) {
    rows.push({
      label: "Souvenir Box",
      meta: `${state.souvenirPax} guests × ${formatINR(150)}`,
      amount: state.souvenirPax * 150
    });
  }

  return rows;
}

function updateSummary() {
  updClientSilently();

  const sumRows = byId("sum-rows");
  const grand = byId("grand");
  if (!sumRows || !grand) return;

  const rows = getSummaryRows();
  const total = rows.reduce((sum, row) => sum + row.amount, 0);

  if (!rows.length) {
    sumRows.innerHTML = `
      <p class="text-sm text-darkBrown/60 text-center py-2">
        Select services above to build your quote
      </p>
    `;
    grand.textContent = formatINR(0);
    return;
  }

  sumRows.innerHTML = rows.map((row) => `
    <div class="quote-row">
      <div>
        <div class="font-medium text-deepBhagwa">${escapeHtml(row.label)}</div>
        <div class="text-xs text-darkBrown/60 mt-1">${escapeHtml(row.meta)}</div>
      </div>
      <div class="font-semibold text-darkBrown whitespace-nowrap">${formatINR(row.amount)}</div>
    </div>
  `).join("");

  grand.textContent = formatINR(total);
}

function updClientSilently() {
  state.client.name = getTextValue("cname");
  state.client.phone = getTextValue("cphone");
  state.client.event = getTextValue("cevent");
  state.client.date = getTextValue("cdate");
}

// ================================
// RESET
// ================================
function resetAll() {
  state.client = {
    name: "",
    phone: "",
    event: "",
    date: ""
  };
  state.svc = null;
  state.dec = null;
  state.seat = null;
  state.prs = null;
  state.paxSeat = 0;
  state.paxPrs = 0;
  state.souvenirPax = 0;
  state.welcomes = [];
  state.welcomeBundle = false;
  state.addons = [];

  ["cname", "cphone", "cevent", "cdate", "pax-seat", "pax-prs", "pax-sov"].forEach((id) => {
    const el = byId(id);
    if (el) el.value = "";
  });

  document.querySelectorAll(".pill").forEach((pill) => {
    pill.classList.remove("active");
  });

  ["svc-detail", "dec-detail", "seat-detail", "prs-detail"].forEach((id) => {
    const detail = byId(id);
    if (detail) {
      detail.classList.remove("open");
      detail.innerHTML = "";
    }
  });

  const seatPax = byId("seat-pax");
  const prsPax = byId("prs-pax");
  const seatLive = byId("seat-live");
  const prsLive = byId("prs-live");
  const sovLive = byId("sov-live");

  if (seatPax) seatPax.classList.add("hidden");
  if (prsPax) prsPax.classList.add("hidden");
  if (seatLive) seatLive.textContent = "";
  if (prsLive) prsLive.textContent = "";
  if (sovLive) sovLive.textContent = "";

  updateSummary();
}

// ================================
// PDF DOWNLOAD
// ================================
function makePDF() {
  updClientSilently();

  const rows = getSummaryRows();
  const total = rows.reduce((sum, row) => sum + row.amount, 0);

  if (!rows.length) {
    alert("Please select at least one service before downloading the quote.");
    return;
  }

  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("PDF library is not loaded.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Sanatan Kriya - Estimated Quote", 14, y);

  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const clientLines = [
    `Client Name: ${state.client.name || "-"}`,
    `Phone: ${state.client.phone || "-"}`,
    `Event Type: ${state.client.event || "-"}`,
    `Event Date: ${state.client.date || "-"}`
  ];

  clientLines.forEach((line) => {
    doc.text(line, 14, y);
    y += 7;
  });

  y += 4;
  doc.setFont("helvetica", "bold");
  doc.text("Selected Items", 14, y);

  y += 8;
  doc.setFont("helvetica", "normal");

  rows.forEach((row, index) => {
    const line = `${index + 1}. ${row.label} (${row.meta})`;
    const amount = formatINR(row.amount);

    const wrapped = doc.splitTextToSize(line, 130);
    doc.text(wrapped, 14, y);
    doc.text(amount, 170, y, { align: "right" });

    y += (wrapped.length * 6) + 2;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Estimated Total: ${formatINR(total)}`, 14, y);

  y += 12;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    "Note: This is an estimated quote and may vary based on final requirements.",
    14,
    y
  );

  const safeName = (state.client.name || "quote")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  doc.save(`${safeName || "quote"}-sanatan-kriya-estimate.pdf`);
}

// ================================
// EXPOSE FUNCTIONS FOR INLINE HTML
// ================================
window.selPkg = selPkg;
window.upd = upd;
window.calcSeat = calcSeat;
window.calcPrs = calcPrs;
window.calcSov = calcSov;
window.togWel = togWel;
window.togBundle = togBundle;
window.togAdd = togAdd;
window.makePDF = makePDF;
window.resetAll = resetAll;

// ================================
// INITIALIZE
// ================================
document.addEventListener("DOMContentLoaded", () => {
  updateSummary();
});