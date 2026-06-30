const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navDropdown = document.querySelector(".nav-dropdown");
const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

if (siteNav && !siteNav.querySelector('a[href="blog.html"]')) {
  const blogLink = document.createElement("a");
  blogLink.href = "blog.html";
  blogLink.textContent = "Travel News";
  if (window.location.pathname.toLowerCase().endsWith("/blog.html")) {
    blogLink.classList.add("is-current");
  }
  const accountLink = siteNav.querySelector('a[href="customer.html"]');
  siteNav.insertBefore(blogLink, accountLink || null);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

dropdownToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = navDropdown.classList.toggle("is-open");
  dropdownToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav?.classList.remove("is-open");
    navDropdown?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    dropdownToggle?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!navDropdown?.contains(event.target)) {
    navDropdown?.classList.remove("is-open");
    dropdownToggle?.setAttribute("aria-expanded", "false");
  }
});

const hero = document.querySelector(".hero");
const heroButtons = document.querySelectorAll(".hero-slider-controls button");
const featurePanels = document.querySelectorAll(".feature-panel");
let heroIndex = 0;

function setHeroSlide(index) {
  if (!hero || !heroButtons.length) return;
  const button = heroButtons[index % heroButtons.length];
  hero.style.setProperty("--hero-image", `url("${button.dataset.heroImage}")`);
  heroButtons.forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
  if (featurePanels.length) {
    const activePanelIndex = index % featurePanels.length;
    featurePanels.forEach((panel, panelIndex) => {
      panel.classList.toggle("is-active", panelIndex === activePanelIndex);
    });
  }
  heroIndex = index % heroButtons.length;
}

heroButtons.forEach((button, index) => {
  button.addEventListener("click", () => setHeroSlide(index));
});

if (heroButtons.length) {
  setInterval(() => setHeroSlide(heroIndex + 1), 6500);
}

const destinationData = {
  bwindi: {
    title: "Bwindi Gorilla Trekking",
    type: "Gorilla Trekking",
    meta: "Uganda | Parks",
    image: "assets/safari/gorilla.webp",
    copy: "Bwindi & Mgahinga | Expert Guides | Once-in-a-Lifetime Experience",
    highlights: ["Best for mountain gorilla trekking", "Expert guide coordination", "Permit and transport support"]
  },
  murchison: {
    title: "Murchison Falls Safari",
    type: "National Park Safari",
    meta: "Uganda | Parks",
    image: "assets/wildlife/wildlife-25.jpg",
    copy: "Murchison Falls | Bird watching | Sport fishing | Night game drive",
    highlights: ["Nile launch trip and bird watching", "Sport fishing by arrangement", "Authorized night game drive"]
  },
  queen: {
    title: "Queen Elizabeth Park",
    type: "National Park Safari",
    meta: "Uganda | Parks",
    image: "assets/wildlife/wildlife-49.jpg",
    copy: "Queen Elizabeth | Kazinga boat ride | Kyambura Gorge | Ishasha",
    highlights: ["Kazinga Channel boat ride", "Kyambura Gorge primate tracking", "Tree-climbing lions in Ishasha"]
  },
  jinja: {
    title: "Jinja Water Sports",
    type: "Natural Adventure",
    meta: "Uganda | Natural",
    image: "assets/safari/boat-cruise.webp",
    copy: "Source of the Nile | Water sports | Day trips | Group travel",
    highlights: ["Water activity planning", "Source of the Nile visits", "Short-stay transfers"]
  },
  kibale: {
    title: "Kibale Chimpanzee",
    type: "Primate Trekking",
    meta: "Uganda | Parks",
    image: "assets/safari/chimpanzee.webp",
    copy: "Kibale Forest | Chimpanzee habituation | Primate walks | Expert guides",
    highlights: ["Chimpanzee habituation experience", "Chimpanzee tracking", "Western safari combinations"]
  },
  mburo: {
    title: "Lake Mburo National Park",
    type: "National Park Safari",
    meta: "Uganda | Parks",
    image: "assets/wildlife/wildlife-64.jpg",
    copy: "Lake Mburo | Zebra and antelope | Short safaris | Active adventures",
    highlights: ["Zebra, impala, and eland", "Short safari routes", "Western Uganda stopover"]
  },
  rwenzori: {
    title: "Rwenzori Mountains",
    type: "Mountain Adventure",
    meta: "Uganda | Natural",
    image: "assets/destinations/rwenzori-mountains.jpg",
    copy: "Rwenzori Mountains | Scenic walks | Multi-day treks | Summit expeditions",
    highlights: ["Mountain and foothill hikes", "Multi-day trekking", "Guide and transport coordination"]
  },
  elgon: {
    title: "Mount Elgon & Sipi Falls",
    type: "Mountain Adventure",
    meta: "Uganda | Natural",
    image: "assets/packages/sipi-falls.jpg",
    copy: "Mount Elgon | Sipi Falls | Hiking | Coffee and cultural experiences",
    highlights: ["Waterfall and forest walks", "Mountain trekking", "Sipi coffee experiences"]
  },
  rwanda: {
    title: "Rwanda Volcanoes",
    type: "Rwanda Tours",
    meta: "Rwanda | Parks",
    image: "assets/safari/gorilla.webp",
    copy: "Rwanda Volcanoes | Cross-border packages | Kigali city tours | Cultural experiences",
    highlights: ["Volcanoes National Park", "Kigali city connections", "Cross-border planning"]
  },
  kidepo: {
    title: "Kidepo Valley National Park",
    type: "Remote Safari",
    meta: "Uganda | Parks",
    image: "assets/wildlife/wildlife-30.jpg",
    copy: "Kidepo Valley | Remote wilderness | Culture | North Eastern Uganda",
    highlights: ["Remote safari planning", "Cultural visits", "Multi-day wilderness routes"]
  },
  bunyonyi: {
    title: "Lake Bunyonyi",
    type: "Natural Destination",
    meta: "Uganda | Natural",
    image: "assets/safari/lake-bunyonyi.webp",
    copy: "Lake Bunyonyi | Southern Uganda | Calm stays | Scenic island routes",
    highlights: ["Relaxed lakeside stays", "Southern region tours", "Bwindi route combinations"]
  },
  volcanoes: {
    title: "Rwanda Volcanoes",
    type: "Rwanda Tours",
    meta: "Rwanda | Parks",
    image: "assets/safari/gorilla.webp",
    copy: "Rwanda Volcanoes | Gorilla trekking | Kigali connections | Cross-border tours",
    highlights: ["Gorilla trekking", "Kigali city connection", "Cross-border travel support"]
  },
  kigali: {
    title: "Kigali City Tour",
    type: "Cultural Tour",
    meta: "Rwanda | Cultural",
    image: "assets/safari/culture.webp",
    copy: "Kigali city tours | Cultural experiences | Rwanda travel planning",
    highlights: ["City sightseeing", "Cultural visits", "Short Rwanda itinerary planning"]
  },
  zziwa: {
    title: "Ziwa Rhino Sanctuary",
    type: "Sanctuary",
    meta: "Uganda | Sanctuary",
    image: "assets/safari/game-drive.webp",
    copy: "Ziwa Rhino Sanctuary | Wildlife conservation | Murchison route stop",
    highlights: ["Rhino tracking", "Conservation stop", "Murchison route pairing"]
  }
};

function whatsappFor(title) {
  const text = `Hello Augur Tours, I would like to book ${title}. You can also reach me through +256 772 510 411.`;
  return `https://wa.me/256772510411?text=${encodeURIComponent(text)}`;
}

const destinationSelect = document.querySelector("#destination-select");
const summaryImage = document.querySelector("#destination-summary-image");
const summaryType = document.querySelector("#destination-summary-type");
const summaryTitle = document.querySelector("#destination-summary-title");
const summaryCopy = document.querySelector("#destination-summary-copy");
const summaryLink = document.querySelector("#destination-book-link");

function updateDestinationSummary(id) {
  const item = destinationData[id] || destinationData.bwindi;
  if (summaryImage) {
    summaryImage.src = item.image;
    summaryImage.alt = item.title;
  }
  if (summaryType) summaryType.textContent = item.type;
  if (summaryTitle) summaryTitle.textContent = item.title;
  if (summaryCopy) summaryCopy.textContent = item.copy;
  if (summaryLink) summaryLink.href = whatsappFor(item.title);
}

destinationSelect?.addEventListener("change", () => {
  updateDestinationSummary(destinationSelect.value);
});
updateDestinationSummary(destinationSelect?.value);

const packageDestinationSelect = document.querySelector("#package-destination-select");
const packageCards = document.querySelectorAll("[data-package]");
let packageHighlightTimeout;

function focusPackageCard(id) {
  const card = document.querySelector(`[data-package="${id}"]`);
  if (!card) return;
  packageCards.forEach((item) => item.classList.remove("is-highlighted"));
  card.classList.add("is-highlighted");
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  window.clearTimeout(packageHighlightTimeout);
  packageHighlightTimeout = window.setTimeout(() => {
    card.classList.remove("is-highlighted");
  }, 2400);
}

packageDestinationSelect?.addEventListener("change", () => {
  focusPackageCard(packageDestinationSelect.value);
});

const finderDestination = document.querySelector("#finder-destination");
const finderActivity = document.querySelector("#finder-activity");
const finderDuration = document.querySelector("#finder-duration");
const finderTravelers = document.querySelector("#finder-travelers");
const safariFinderLink = document.querySelector("#safari-finder-link");

function updateSafariFinderLink() {
  if (!safariFinderLink) return;
  const destination = finderDestination?.value || "Uganda";
  const activity = finderActivity?.value || "safari";
  const duration = finderDuration?.value || "custom duration";
  const travelers = finderTravelers?.value || "2";
  const text = `Hello Augur Tours, I would like a quote for ${activity} in ${destination} for ${duration}. We are ${travelers} traveler(s).`;
  safariFinderLink.href = `https://wa.me/256772510411?text=${encodeURIComponent(text)}`;
}

[finderDestination, finderActivity, finderDuration, finderTravelers].forEach((element) => {
  element?.addEventListener("change", updateSafariFinderLink);
  element?.addEventListener("input", updateSafariFinderLink);
});
updateSafariFinderLink();

const countryButtons = document.querySelectorAll(".country-tabs button");
const categoryButtons = document.querySelectorAll(".category-tabs button");
const markers = document.querySelectorAll(".marker");
const destinationPills = document.querySelectorAll(".destination-pills button");
let activeCountry = "both";
let activeCategory = "all";

function itemMatchesFilters(item) {
  const countryMatch = activeCountry === "both" || item.classList.contains(activeCountry);
  const categoryMatch = activeCategory === "all" || item.classList.contains(activeCategory);
  return countryMatch && categoryMatch;
}

function updateMarkers() {
  markers.forEach((marker) => marker.classList.toggle("is-hidden", !itemMatchesFilters(marker)));
  destinationPills.forEach((pill) => pill.classList.toggle("is-hidden", !itemMatchesFilters(pill)));
}

function setDestinationDetail(id) {
  const item = destinationData[id] || destinationData.bwindi;
  markers.forEach((marker) => marker.classList.toggle("is-selected", marker.dataset.destination === id));
  destinationPills.forEach((pill) => pill.classList.toggle("is-selected", pill.dataset.destination === id));

  const image = document.querySelector("#destination-detail-image");
  const meta = document.querySelector("#destination-detail-meta");
  const title = document.querySelector("#destination-detail-title");
  const copy = document.querySelector("#destination-detail-copy");
  const list = document.querySelector("#destination-detail-list");
  const link = document.querySelector("#destination-detail-link");

  if (image) {
    image.src = item.image;
    image.alt = item.title;
  }
  if (meta) meta.textContent = item.meta;
  if (title) title.textContent = item.title;
  if (copy) copy.textContent = item.copy;
  if (list) {
    list.innerHTML = "";
    item.highlights.forEach((highlight) => {
      const li = document.createElement("li");
      li.textContent = highlight;
      list.appendChild(li);
    });
  }
  if (link) link.href = whatsappFor(item.title);
}

countryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    countryButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    activeCountry = button.dataset.country;
    updateMarkers();
  });
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    activeCategory = button.dataset.category;
    updateMarkers();
  });
});

[...markers, ...destinationPills].forEach((item) => {
  item.addEventListener("click", () => setDestinationDetail(item.dataset.destination));
});

if (markers.length || destinationPills.length) {
  setDestinationDetail("bwindi");
  updateMarkers();
}

const rates = {
  USD: { USD: 0.92, UGX: 3850 },
  EUR: { USD: 1, UGX: 4200 },
  GBP: { USD: 1.13, UGX: 4750 },
  KES: { USD: 0.0078, UGX: 30 }
};

const fromCurrency = document.querySelector("#from-currency");
const toCurrency = document.querySelector("#to-currency");
const fromAmount = document.querySelector("#from-amount");
const convertedAmount = document.querySelector("#converted-amount");

function updateConversion() {
  if (!fromCurrency || !toCurrency || !fromAmount || !convertedAmount) return;
  const amount = Number(fromAmount.value || 0);
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const value = amount * (rates[from]?.[to] ?? 0);
  convertedAmount.textContent = value.toLocaleString("en-US", {
    maximumFractionDigits: to === "UGX" ? 0 : 2
  });
}

[fromCurrency, toCurrency, fromAmount].forEach((element) => {
  element?.addEventListener("input", updateConversion);
  element?.addEventListener("change", updateConversion);
});
updateConversion();

const stepButtons = Array.from(document.querySelectorAll(".booking-steps button"));
const prevStep = document.querySelector("#prev-step");
const nextStep = document.querySelector("#next-step");
let activeStep = 1;

function setStep(step) {
  if (!Number.isFinite(step)) return;
  activeStep = Math.min(4, Math.max(1, step));
  stepButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.step) === activeStep);
  });
}

stepButtons.forEach((button) => {
  button.addEventListener("click", () => setStep(Number(button.dataset.step)));
});

prevStep?.addEventListener("click", () => setStep(activeStep - 1));
nextStep?.addEventListener("click", () => setStep(activeStep + 1));

const transferDistance = document.querySelector("#transfer-distance");
const transferVehicle = document.querySelector("#transfer-vehicle");
const transferTotal = document.querySelector("#transfer-total");

function updateTransferTotal() {
  if (!transferDistance || !transferVehicle || !transferTotal) return;
  const distance = Number(transferDistance.value || 0);
  const vehicle = Number(transferVehicle.value || 1);
  transferTotal.textContent = Math.round(distance * vehicle).toLocaleString("en-US");
}

[transferDistance, transferVehicle].forEach((element) => {
  element?.addEventListener("change", updateTransferTotal);
});
updateTransferTotal();

const accountForm = document.querySelector("#account-form");
const customerDashboard = document.querySelector("#customer-dashboard");
const dashboardName = document.querySelector("#dashboard-name");

function unlockDashboard(name) {
  if (dashboardName) dashboardName.textContent = name || "Traveler";
  customerDashboard?.classList.remove("is-locked");
  customerDashboard?.scrollIntoView({ behavior: "smooth", block: "start" });
}

accountForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#account-name")?.value?.trim() || "Traveler";
  unlockDashboard(name);
});

const assistantButton = document.querySelector(".assistant-button");
const assistantPanel = document.querySelector("#travel-assistant");
const assistantMessages = document.querySelector(".assistant-messages");

if (!document.querySelector(".call-float")) {
  const callFloat = document.createElement("a");
  callFloat.className = "call-float";
  callFloat.href = "tel:+256772510411";
  callFloat.setAttribute("aria-label", "Call Augur Tours on 0772 510 411");
  callFloat.textContent = "Call";
  document.body.appendChild(callFloat);
}

function updateFloatingActions() {
  const revealPoint = Math.min(520, window.innerHeight * 0.62);
  document.body.classList.toggle("floats-ready", window.scrollY > revealPoint);
}

window.addEventListener("scroll", updateFloatingActions, { passive: true });
updateFloatingActions();

const contactSection = document.querySelector("#contact");

if (contactSection && "IntersectionObserver" in window) {
  const contactObserver = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle("contact-in-view", entry.isIntersecting);
    },
    { threshold: 0.12 }
  );
  contactObserver.observe(contactSection);
}

assistantButton?.addEventListener("click", () => {
  assistantPanel?.classList.toggle("is-open");
});

document.querySelectorAll("[data-assistant-reply]").forEach((button) => {
  button.addEventListener("click", () => {
    const reply = document.createElement("p");
    reply.textContent = button.dataset.assistantReply;
    assistantMessages?.appendChild(reply);
  });
});

const contactName = document.querySelector("#contact-name");
const contactReach = document.querySelector("#contact-reach");
const contactType = document.querySelector("#contact-type");
const contactMonth = document.querySelector("#contact-month");
const contactDuration = document.querySelector("#contact-duration");
const contactTravelers = document.querySelector("#contact-travelers");
const contactBudget = document.querySelector("#contact-budget");
const contactMessage = document.querySelector("#contact-message");
const contactWhatsappLink = document.querySelector("#contact-whatsapp-link");

function updateContactWhatsappLink() {
  if (!contactWhatsappLink) return;
  const name = contactName?.value?.trim() || "a traveler";
  const reach = contactReach?.value?.trim() || "my contact details";
  const type = contactType?.value || "booking enquiry";
  const month = contactMonth?.value || "Not sure yet";
  const duration = contactDuration?.value || "Not sure yet";
  const travelers = contactTravelers?.value || "2";
  const budget = contactBudget?.value || "Not sure yet";
  const message = contactMessage?.value?.trim() || "Please help me plan my trip.";
  const text = `Hello Augur Tours, my name is ${name}. I have a ${type} enquiry. Travel month: ${month}. Trip length: ${duration}. Travelers: ${travelers}. Budget guide: ${budget}. You can reach me through ${reach}. ${message}`;
  contactWhatsappLink.href = `https://wa.me/256772510411?text=${encodeURIComponent(text)}`;
}

[contactName, contactReach, contactType, contactMonth, contactDuration, contactTravelers, contactBudget, contactMessage].forEach((element) => {
  element?.addEventListener("input", updateContactWhatsappLink);
  element?.addEventListener("change", updateContactWhatsappLink);
});
updateContactWhatsappLink();

const wildlifePhotoGrid = document.querySelector("#wildlife-photo-grid");
const wildlifePhotoCaptions = [
  "Scenic boat journey on an East African lake",
  "Olive baboon beside a forest road",
  "Wildflower detail from the journey",
  "Lions resting on a national park road",
  "Male lion moving through the savannah",
  "Lions beside a safari vehicle",
  "Close wildlife encounter on a game drive",
  "Travelers exploring a crater salt lake",
  "Salt pans and waterbirds in western Uganda",
  "Waterbuck in open grassland",
  "Hartebeest beneath a dramatic sky",
  "Giraffe feeding on a hillside",
  "Giraffe overlooking the savannah",
  "Giraffe on the ridge",
  "Giraffe walking across open country",
  "Giraffe moving over the horizon",
  "Giraffe in golden grass",
  "Vervet monkey in the bush",
  "Vervet monkey in acacia woodland",
  "Elephants crossing a park road",
  "Elephant family crossing the road",
  "Murchison Falls and river mist",
  "The power of Murchison Falls",
  "Rainbow in the spray at Murchison Falls",
  "Waterfalls and rainbow",
  "Murchison Falls panorama",
  "Murchison Falls from the viewpoint",
  "Rainbow over the falls",
  "Rhinos in a woodland sanctuary",
  "White rhino at Ziwa Rhino Sanctuary",
  "Rhino tracking landscape at Ziwa",
  "Rhino grazing on green sanctuary grounds",
  "A crash of rhinos near the track",
  "Rhinos moving through woodland",
  "Rhinos on open sanctuary grounds",
  "Rhino family beside a red-earth road",
  "Sunset over the national park",
  "Giraffe family in woodland",
  "Giraffes feeding among the trees",
  "Buffalo cooling in a mud wallow",
  "Buffalo and cattle egret at the wallow",
  "Lioness crossing the safari track",
  "Elephant herd on the move",
  "Male lion in dry savannah",
  "Male lion walking through scrub",
  "Hartebeest portrait",
  "Warthog in the grass",
  "Lion approaching through tall grass",
  "Tree-climbing lions in Queen Elizabeth",
  "Lions resting in a fig tree",
  "Tree-climbing lion above the plains",
  "Elephants beside safari vehicles",
  "Elephant in open savannah",
  "Tree-climbing lion at Queen Elizabeth",
  "Elephant close to the park road",
  "Elephants among candelabra trees",
  "Elephant with birds in tall grass",
  "Elephants crossing a red-earth track",
  "Elephant herd around a safari road",
  "Elephants in green woodland",
  "Baboons gathered beside a forest road",
  "Baboon troop on the road",
  "Baboon watching from a roadside post",
  "Zebra in open woodland",
  "Buffalo resting in a waterhole",
  "Zebra portrait in the bush",
  "Buffalo cooling in shallow water",
  "Buffalo and egret at a savannah wallow"
];

if (wildlifePhotoGrid) {
  wildlifePhotoCaptions.forEach((caption, index) => {
    const number = String(index + 1).padStart(2, "0");
    const figure = document.createElement("figure");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    link.href = `assets/wildlife/wildlife-${number}.jpg`;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `Open full-size photo: ${caption}`);
    image.src = link.href;
    image.alt = caption;
    image.loading = "lazy";
    image.decoding = "async";
    figcaption.textContent = caption;

    link.appendChild(image);
    figure.append(link, figcaption);
    wildlifePhotoGrid.appendChild(figure);
  });
}

const newsletterPanel = document.querySelector("#newsletter-panel");
const newsletterClose = document.querySelector("#newsletter-close");

if (newsletterPanel && localStorage.getItem("augurNewsletterDismissed") !== "true") {
  setTimeout(() => newsletterPanel.classList.add("is-open"), 12000);
}

newsletterClose?.addEventListener("click", () => {
  newsletterPanel?.classList.remove("is-open");
  localStorage.setItem("augurNewsletterDismissed", "true");
});
