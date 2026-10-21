/* Page-specific canonical and social metadata for the static site. */
(() => {
  const siteOrigin = "https://augurtravel.com";
  const path = window.location.pathname === "/" || /\/index\.html$/i.test(window.location.pathname)
    ? "/"
    : window.location.pathname.replace(/\.html$/i, "");
  const canonicalUrl = `${siteOrigin}${path}`;
  const description = document.querySelector('meta[name="description"]')?.content
    || "Uganda safaris, gorilla trekking, airport transfers, car hire, and corporate transport from Augur Tours.";
  const image = `${siteOrigin}/assets/safari/gorilla.webp`;
  const ensureMeta = (selector, attributes, content) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement("meta");
      Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
      document.head.appendChild(element);
    }
    element.content = content;
  };
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
  ensureMeta('meta[property="og:type"]', { property: "og:type" }, "website");
  ensureMeta('meta[property="og:title"]', { property: "og:title" }, document.title);
  ensureMeta('meta[property="og:description"]', { property: "og:description" }, description);
  ensureMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
  ensureMeta('meta[property="og:image"]', { property: "og:image" }, image);
  ensureMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
})();

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navDropdowns = Array.from(document.querySelectorAll(".nav-dropdown"));



menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navDropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".nav-dropdown-toggle");
  toggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    navDropdowns.forEach((item) => {
      if (item !== dropdown) {
        item.classList.remove("is-open");
        item.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
      }
    });
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav?.classList.remove("is-open");
    navDropdowns.forEach((dropdown) => dropdown.classList.remove("is-open"));
    menuToggle?.setAttribute("aria-expanded", "false");
    navDropdowns.forEach((dropdown) => dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false"));
  });
});

document.addEventListener("click", (event) => {
  navDropdowns.forEach((dropdown) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("is-open");
      dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
    }
  });
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
    route: "Route note: Best planned from Entebbe, Kampala, Kabale, or Kigali depending on permit date and lodge location.",
    quote: "From quote - final price depends on gorilla permits, lodge level, vehicle, dates, and group size.",
    highlights: ["Best for mountain gorilla trekking", "Expert guide coordination", "Permit and transport support"]
  },
  murchison: {
    title: "Murchison Falls National Park",
    type: "National Park Safari",
    meta: "Uganda | Parks",
    image: "assets/wildlife/wildlife-25.jpg",
    copy: "Giraffes, elephants, hartebeests, patas monkeys, Nile boat cruises, waterfalls, bird watching, and game drives.",
    route: "Route note: Kampala to Murchison Falls is usually 5-6 hours; Entebbe is usually 6-7 hours depending on stops.",
    quote: "From quote - final price depends on lodge level, vehicle, boat cruise, park activities, dates, and group size.",
    highlights: ["Giraffes on savannah ridges", "Elephant crossings and Nile launch trip", "Patas monkeys, hartebeests, buffaloes, and antelopes"]
  },
  queen: {
    title: "Queen Elizabeth National Park",
    type: "National Park Safari",
    meta: "Uganda | Parks",
    image: "assets/wildlife/wildlife-49.jpg",
    copy: "Kazinga Channel, elephant herds, crater lakes, salt pans, Kasenyi game drives, Kyambura Gorge, and Ishasha wildlife.",
    route: "Route note: Kampala to Queen Elizabeth is usually 7-8 hours; Ishasha or Bwindi can be added with extra time.",
    quote: "From quote - final price depends on vehicle, lodge level, Kazinga boat timing, game drives, dates, and group size.",
    highlights: ["Elephant herds, hippos, buffaloes, and antelopes", "Crater lakes and salt pans", "Kazinga Channel, Kasenyi, and Ishasha"]
  },
  jinja: {
    title: "Jinja Water Sports",
    type: "Natural Adventure",
    meta: "Uganda | Natural",
    image: "assets/safari/boat-cruise.webp",
    copy: "Source of the Nile | Water sports | Day trips | Group travel",
    route: "Route note: Kampala to Jinja is usually 2-3 hours depending on traffic and activity timing.",
    quote: "From quote - final price depends on activities, vehicle, pickup point, dates, and group size.",
    highlights: ["Water activity planning", "Source of the Nile visits", "Short-stay transfers"]
  },
  kibale: {
    title: "Kibale Chimpanzee",
    type: "Primate Trekking",
    meta: "Uganda | Parks",
    image: "assets/safari/chimpanzee.webp",
    copy: "Kibale Forest | Chimpanzee habituation | Primate walks | Expert guides",
    route: "Route note: Kampala to Kibale is usually 5-6 hours; it pairs well with crater lakes and Queen Elizabeth.",
    quote: "From quote - final price depends on permits, activity type, lodge level, vehicle, dates, and group size.",
    highlights: ["Chimpanzee habituation experience", "Chimpanzee tracking", "Western safari combinations"]
  },
  mburo: {
    title: "Lake Mburo National Park",
    type: "National Park Safari",
    meta: "Uganda | Parks",
    image: "assets/wildlife/wildlife-64.jpg",
    copy: "Lake Mburo | Zebra and antelope | Short safaris | Active adventures",
    route: "Route note: Kampala to Lake Mburo is usually 4-5 hours; it works well as a short escape or western route stop.",
    quote: "From quote - final price depends on vehicle, lodge level, boat or walking safari plans, dates, and group size.",
    highlights: ["Zebra, impala, and eland", "Short safari routes", "Western Uganda stopover"]
  },
  rwenzori: {
    title: "Rwenzori Mountains",
    type: "Mountain Adventure",
    meta: "Uganda | Natural",
    image: "assets/destinations/rwenzori-mountains.jpg",
    copy: "Rwenzori Mountains | Scenic walks | Multi-day treks | Summit expeditions",
    route: "Route note: Best planned through Kasese with timing shaped around trek length, fitness, guides, and accommodation.",
    quote: "From quote - final price depends on trek length, guide support, accommodation, transport, dates, and group size.",
    highlights: ["Mountain and foothill hikes", "Multi-day trekking", "Guide and transport coordination"]
  },
  elgon: {
    title: "Mount Elgon & Sipi Falls",
    type: "Mountain Adventure",
    meta: "Uganda | Natural",
    image: "assets/packages/sipi-falls.jpg",
    copy: "Mount Elgon | Sipi Falls | Hiking | Coffee and cultural experiences",
    route: "Route note: Kampala to Sipi is usually 5-6 hours; route timing depends on hike choice and coffee experiences.",
    quote: "From quote - final price depends on hikes, guide support, accommodation, vehicle, dates, and group size.",
    highlights: ["Waterfall and forest walks", "Mountain trekking", "Sipi coffee experiences"]
  },
  rwanda: {
    title: "Rwanda Volcanoes & Lake Kivu",
    type: "Rwanda Tours",
    meta: "Rwanda | Parks",
    image: "assets/safari/gorilla.webp",
    copy: "Volcanoes National Park, Kigali, Akagera, Nyungwe, Lake Kivu boat journeys, and Uganda-Rwanda cross-border planning.",
    route: "Route note: Best planned from Kigali, Kabale, or a Uganda-Rwanda border route depending on permits and timing.",
    quote: "From quote - final price depends on permits, hotels, transport, border timing, dates, and group size.",
    highlights: ["Volcanoes National Park", "Lake Kivu boat and lakeside add-ons", "Kigali and cross-border planning"]
  },
  kidepo: {
    title: "Kidepo Valley National Park",
    type: "Remote Safari",
    meta: "Uganda | Parks",
    image: "assets/packages/north-eastern.webp",
    copy: "Kidepo Valley | Remote wilderness | Culture | North Eastern Uganda",
    route: "Route note: Kidepo is a long northern Uganda route and is best planned as a multi-day safari or fly-in option.",
    quote: "From quote - final price depends on transport style, lodge level, route length, dates, and group size.",
    highlights: ["Remote safari planning", "Cultural visits", "Multi-day wilderness routes"]
  },
  bunyonyi: {
    title: "Lake Bunyonyi",
    type: "Natural Destination",
    meta: "Uganda | Natural",
    image: "assets/safari/lake-bunyonyi.webp",
    copy: "Lake Bunyonyi | Southern Uganda | Calm stays | Scenic island routes",
    route: "Route note: Kampala to Lake Bunyonyi is usually 7-8 hours; it pairs well with Kabale, Bwindi, and Rwanda routes.",
    quote: "From quote - final price depends on transport, lodge level, boat plans, dates, and group size.",
    highlights: ["Relaxed lakeside stays", "Southern region tours", "Bwindi route combinations"]
  },
  volcanoes: {
    title: "Rwanda Volcanoes",
    type: "Rwanda Tours",
    meta: "Rwanda | Parks",
    image: "assets/safari/gorilla.webp",
    copy: "Rwanda Volcanoes | Gorilla trekking | Kigali connections | Cross-border tours",
    route: "Route note: Kigali to Volcanoes is usually 2-3 hours; Uganda border routes can also connect through south-western Uganda.",
    quote: "From quote - final price depends on gorilla permits, lodge level, vehicle, dates, and group size.",
    highlights: ["Gorilla trekking", "Kigali city connection", "Cross-border travel support"]
  },
  akagera: {
    title: "Akagera National Park",
    type: "Rwanda Safari",
    meta: "Rwanda | Parks",
    image: "assets/wildlife/wildlife-64.jpg",
    copy: "Akagera National Park | Wildlife drives | Lake Ihema boat trips | Rwanda safari add-ons",
    route: "Route note: Kigali to Akagera is usually 2.5-3.5 hours depending on pickup point and park timing.",
    quote: "From quote - final price depends on vehicle, lodge level, game drive timing, boat plans, dates, and group size.",
    highlights: ["Wildlife game drives", "Lake Ihema boat trip", "Kigali safari add-on"]
  },
  nyungwe: {
    title: "Nyungwe National Park",
    type: "Rwanda Forest",
    meta: "Rwanda | Parks",
    image: "assets/safari/chimpanzee.webp",
    copy: "Nyungwe National Park | Chimpanzee tracking | Forest walks | Rwanda nature routes",
    route: "Route note: Kigali to Nyungwe is usually 5-6 hours; it pairs well with Lake Kivu and southern Rwanda routes.",
    quote: "From quote - final price depends on permits, accommodation, transport, forest activities, dates, and group size.",
    highlights: ["Chimpanzee tracking", "Canopy and forest experiences", "Lake Kivu route pairing"]
  },
  kivu: {
    title: "Lake Kivu",
    type: "Rwanda Lake Add-on",
    meta: "Rwanda | Natural",
    image: "assets/wildlife/wildlife-01.jpg",
    copy: "Lake Kivu | Scenic boat journeys | Lakeside stays | Relaxed Rwanda extensions",
    route: "Route note: Kigali to Lake Kivu is usually 3-4 hours; Volcanoes to Lake Kivu is often 2-3 hours.",
    quote: "From quote - final price depends on hotel level, boat plan, route start, dates, and group size.",
    highlights: ["Scenic boat journey", "Lakeside relaxation", "Add-on after Kigali, Volcanoes, or Nyungwe"]
  },
  kigali: {
    title: "Kigali City Tour",
    type: "Cultural Tour",
    meta: "Rwanda | Cultural",
    image: "assets/safari/culture.webp",
    copy: "Kigali city tours | Cultural experiences | Rwanda travel planning",
    route: "Route note: Kigali city experiences can be planned around airport arrivals, business travel, or Rwanda safari starts.",
    quote: "From quote - final price depends on transport, guide time, stops, dates, and group size.",
    highlights: ["City sightseeing", "Cultural visits", "Short Rwanda itinerary planning"]
  },
  zziwa: {
    title: "Ziwa Rhino Sanctuary",
    type: "Sanctuary",
    meta: "Uganda | Sanctuary",
    image: "assets/wildlife/wildlife-30.jpg",
    copy: "Guided rhino tracking, conservation learning, and a practical stopover on Kampala or Entebbe routes to Murchison Falls.",
    route: "Route note: Kampala to Ziwa is usually 3-4 hours; Entebbe to Ziwa is usually 4-5 hours.",
    quote: "From quote - final price depends on pickup point, vehicle, tracking plan, dates, and group size.",
    highlights: ["Guided on-foot rhino tracking", "Conservation learning", "Kampala, Entebbe, and Murchison route pairing"]
  }
};

function whatsappFor(title) { return `/booking-request?service=Safari&trip=${encodeURIComponent(title)}`; }

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
  const route = document.querySelector("#destination-detail-route");
  const quote = document.querySelector("#destination-detail-quote");
  const list = document.querySelector("#destination-detail-list");
  const link = document.querySelector("#destination-detail-link");

  if (image) {
    image.src = item.image;
    image.alt = item.title;
  }
  if (meta) meta.textContent = item.meta;
  if (title) title.textContent = item.title;
  if (copy) copy.textContent = item.copy;
  if (route) route.innerHTML = `<strong>Route note:</strong> ${(item.route || "").replace(/^Route note:\s*/i, "")}`;
  if (quote) quote.textContent = item.quote || "From quote - final price depends on route, dates, vehicle, and group size.";
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
const galleryFilterButtons = document.querySelectorAll("[data-gallery-filter]");
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
  "Giraffe on the ridge - Murchison Falls National Park",
  "Giraffe walking across open country",
  "Giraffe moving over the horizon",
  "Giraffe in golden grass",
  "Patas monkey in the bush",
  "Patas monkey in acacia woodland",
  "Elephants crossing a park road - Murchison Falls National Park",
  "Elephant family crossing the road - Murchison Falls National Park",
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
  "Tree-climbing lions in Queen Elizabeth National Park",
  "Lions resting in a fig tree",
  "Tree-climbing lion above the plains",
  "Elephants beside safari vehicles",
  "Elephant in open savannah",
  "Tree-climbing lion at Queen Elizabeth",
  "Elephant close to the park road",
  "Elephants among candelabra trees",
  "Elephant with birds in tall grass",
  "Elephants crossing a red-earth track",
  "Elephant herd around a safari road - Queen Elizabeth National Park",
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

const wildlifePhotoSelection = [
  1, 2, 3, 6, 8, 9, 10, 11, 14, 18,
  20, 25, 29, 37, 38, 40, 43, 45, 46, 47,
  48, 50, 52, 55, 58, 60, 63, 65, 66
];

function getWildlifePhotoCategories(photoNumber, caption) {
  const text = caption.toLowerCase();
  const categories = new Set();
  if (/lion|giraffe|monkey|elephant|rhino|buffalo|zebra|waterbuck|hartebeest|warthog|baboon/.test(text)) {
    categories.add("wildlife");
  }
  if (/falls|waterfall|rainbow|mist/.test(text)) categories.add("waterfalls");
  if (/rhino/.test(text)) categories.add("rhinos");
  if (/murchison|patas|giraffe|elephants crossing|falls|waterfall|rainbow/.test(text) || [14, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].includes(photoNumber)) {
    categories.add("murchison");
  }
  if (/queen|tree-climbing|ishasha|elephant herd/.test(text) || [43, 48, 49, 50, 52, 54, 55, 56, 57, 58, 59, 60].includes(photoNumber)) {
    categories.add("queen");
  }
  if (photoNumber === 1 || /lake/.test(text)) categories.add("rwanda");
  return Array.from(categories).join(" ");
}

function setGalleryFilter(filter) {
  if (!wildlifePhotoGrid) return;
  galleryFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.galleryFilter === filter);
  });
  wildlifePhotoGrid.querySelectorAll("figure").forEach((figure) => {
    const categories = figure.dataset.galleryCategories?.split(" ") || [];
    figure.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
  });
}

if (wildlifePhotoGrid) {
  wildlifePhotoSelection.forEach((photoNumber) => {
    const caption = wildlifePhotoCaptions[photoNumber - 1];
    const number = String(photoNumber).padStart(2, "0");
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
    figure.dataset.galleryCategories = getWildlifePhotoCategories(photoNumber, caption);

    link.appendChild(image);
    figure.append(link, figcaption);
    wildlifePhotoGrid.appendChild(figure);
  });
}

galleryFilterButtons.forEach((button) => {
  button.addEventListener("click", () => setGalleryFilter(button.dataset.galleryFilter || "all"));
});

const newsletterPanel = document.querySelector("#newsletter-panel");
const newsletterClose = document.querySelector("#newsletter-close");

if (newsletterPanel && localStorage.getItem("augurNewsletterDismissed") !== "true") {
  setTimeout(() => newsletterPanel.classList.add("is-open"), 30000);
}

newsletterClose?.addEventListener("click", () => {
  newsletterPanel?.classList.remove("is-open");
  localStorage.setItem("augurNewsletterDismissed", "true");
});

const footerBottom = document.querySelector(".footer-bottom");

if (footerBottom && !footerBottom.querySelector(".design-credit")) {
  const designCredit = document.createElement("p");
  designCredit.className = "design-credit";
  designCredit.innerHTML = `
    <span>Designed by <strong>MosesTechFixSolutions</strong></span>
    <span>WhatsApp:
      <a href="https://wa.me/256789218570" target="_blank" rel="noopener">0789 218 570</a>
      <span aria-hidden="true">·</span>
      <a href="https://wa.me/256708262179" target="_blank" rel="noopener">0708 262 179</a>
    </span>`;
  footerBottom.appendChild(designCredit);
}

/* Package comparison filters */
const packageSearch = document.querySelector("#package-search");
const packageCountryFilter = document.querySelector("#package-country-filter");
const packageActivityFilter = document.querySelector("#package-activity-filter");
const packageDurationFilter = document.querySelector("#package-duration-filter");
const packageFilterReset = document.querySelector("#package-filter-reset");
const packageResultCount = document.querySelector("#package-result-count");
const filterablePackageCards = Array.from(document.querySelectorAll(".package-grid [data-package]"));

const packageFilterData = {
  "mountain-gorillas": ["uganda", "primates wildlife", "short flexible"],
  "murchison-falls": ["uganda", "wildlife", "short"],
  "queen-elizabeth-safari": ["uganda", "wildlife", "short"],
  "ziwa-rhino-tracking": ["uganda", "wildlife education", "day"],
  "cultural-tours": ["uganda", "culture", "flexible"],
  "kampala-city": ["uganda", "culture", "day"],
  honeymoon: ["uganda", "romance nature", "flexible"],
  "sipi-falls": ["uganda", "nature", "short"],
  "western-region": ["uganda", "wildlife primates nature", "extended flexible"],
  "southern-region": ["uganda", "wildlife primates nature", "extended flexible"],
  "north-eastern": ["uganda", "wildlife culture", "extended flexible"],
  "historical-educational": ["uganda", "education culture", "flexible"],
  "lake-kivu-addon": ["rwanda", "nature romance", "short"],
  "rwanda-tours": ["rwanda", "wildlife primates culture nature", "flexible"]
};

filterablePackageCards.forEach((card) => {
  const values = packageFilterData[card.dataset.package];
  if (!values) return;
  [card.dataset.country, card.dataset.activity, card.dataset.duration] = values;
});

function updatePackageFilters() {
  if (!filterablePackageCards.length) return;
  const query = (packageSearch?.value || "").trim().toLowerCase();
  const country = packageCountryFilter?.value || "all";
  const activity = packageActivityFilter?.value || "all";
  const duration = packageDurationFilter?.value || "all";
  let visible = 0;

  filterablePackageCards.forEach((card) => {
    const textMatch = !query || card.textContent.toLowerCase().includes(query);
    const countryMatch = country === "all" || card.dataset.country === country;
    const activityMatch = activity === "all" || (card.dataset.activity || "").split(" ").includes(activity);
    const durationMatch = duration === "all" || (card.dataset.duration || "").split(" ").includes(duration);
    const matches = textMatch && countryMatch && activityMatch && durationMatch;
    card.classList.toggle("is-filtered-out", !matches);
    if (matches) visible += 1;
  });

  if (packageResultCount) {
    packageResultCount.textContent = `${visible} ${visible === 1 ? "package" : "packages"} shown`;
  }
}

[packageSearch, packageCountryFilter, packageActivityFilter, packageDurationFilter].forEach((control) => {
  control?.addEventListener("input", updatePackageFilters);
  control?.addEventListener("change", updatePackageFilters);
});

packageFilterReset?.addEventListener("click", () => {
  if (packageSearch) packageSearch.value = "";
  if (packageCountryFilter) packageCountryFilter.value = "all";
  if (packageActivityFilter) packageActivityFilter.value = "all";
  if (packageDurationFilter) packageDurationFilter.value = "all";
  updatePackageFilters();
});
updatePackageFilters();

const bookingEnquiryForm = document.querySelector("#booking-enquiry-form");
const enquiryStatus = document.querySelector("#enquiry-status");

/* The trip-builder workspace can retain a device-local draft; it is never presented as a submitted customer enquiry. */
const enquiryStorageKey = "augurBookingEnquiries";

function readEnquiries() {
  try {
    return JSON.parse(localStorage.getItem(enquiryStorageKey) || "[]");
  } catch {
    return [];
  }
}

function storeEnquiry(enquiry) {
  const enquiries = readEnquiries();
  enquiries.unshift(enquiry);
  localStorage.setItem(enquiryStorageKey, JSON.stringify(enquiries));
}

bookingEnquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (enquiryStatus) enquiryStatus.textContent = "Use Continue on WhatsApp to send your enquiry directly to Augur Tours.";
  contactWhatsappLink?.focus();
});

/* Custom trip builder */
const tripBuilderForm = document.querySelector("#trip-builder-form");
const tripSummary = document.querySelector("#trip-summary");
const plannerWhatsapp = document.querySelector("#planner-whatsapp");
const plannerStatus = document.querySelector("#planner-status");

function selectedPlannerDestinations() {
  return Array.from(document.querySelectorAll('input[name="destination"]:checked')).map((input) => input.value);
}

function getPlannerData() {
  return {
    destinations: selectedPlannerDestinations(),
    experience: document.querySelector("#planner-experience")?.value || "Wildlife safari",
    duration: document.querySelector("#planner-duration")?.value || "Not sure yet",
    month: document.querySelector("#planner-month")?.value || "Not sure yet",
    travelers: document.querySelector("#planner-travelers")?.value || "2",
    comfort: document.querySelector("#planner-comfort")?.value || "Mid-range",
    start: document.querySelector("#planner-start")?.value || "Not sure yet",
    notes: document.querySelector("#planner-notes")?.value?.trim() || "None shared"
  };
}

function updateTripSummary() {
  if (!tripSummary || !plannerWhatsapp) return;
  const data = getPlannerData();
  const destinations = data.destinations.length ? data.destinations.join(", ") : "No destinations selected yet";
  tripSummary.innerHTML = `
    <dl>
      <div><dt>Destinations</dt><dd>${destinations}</dd></div>
      <div><dt>Experience</dt><dd>${data.experience}</dd></div>
      <div><dt>Timing</dt><dd>${data.duration} · ${data.month}</dd></div>
      <div><dt>Travelers</dt><dd>${data.travelers}</dd></div>
      <div><dt>Travel style</dt><dd>${data.comfort}</dd></div>
      <div><dt>Start</dt><dd>${data.start}</dd></div>
    </dl>`;
  const message = `Hello Augur Tours, I built a safari brief. Destinations: ${destinations}. Main experience: ${data.experience}. Duration: ${data.duration}. Travel month: ${data.month}. Travelers: ${data.travelers}. Comfort level: ${data.comfort}. Starting point: ${data.start}. Notes: ${data.notes}. Please check route logic, availability, permits, and prepare a quotation.`;
  plannerWhatsapp.href = `https://wa.me/256772510411?text=${encodeURIComponent(message)}`;
}

tripBuilderForm?.addEventListener("input", updateTripSummary);
tripBuilderForm?.addEventListener("change", updateTripSummary);
tripBuilderForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = getPlannerData();
  if (!data.destinations.length) {
    if (plannerStatus) plannerStatus.textContent = "Please select at least one destination.";
    return;
  }
  const createdAt = new Date();
  storeEnquiry({
    reference: `AUG-${createdAt.getFullYear()}-${String(createdAt.getTime()).slice(-6)}`,
    createdAt: createdAt.toISOString(),
    name: "Trip builder visitor",
    reach: "Continue via WhatsApp",
    type: data.experience,
    month: data.month,
    duration: data.duration,
    travelers: data.travelers,
    budget: data.comfort,
    message: `${data.destinations.join(", ")}. Start: ${data.start}. ${data.notes}`
  });
  if (plannerStatus) plannerStatus.textContent = "Trip brief saved on this device. Send it on WhatsApp when you are ready for availability and pricing.";
});
updateTripSummary();

/* Enquiry workspace */
const enquiryTableBody = document.querySelector("#enquiry-table-body");
const enquiryTotal = document.querySelector("#enquiry-total");
const exportEnquiries = document.querySelector("#export-enquiries");

function renderEnquiries() {
  if (!enquiryTableBody) return;
  const enquiries = readEnquiries();
  enquiryTableBody.innerHTML = "";
  if (enquiryTotal) enquiryTotal.textContent = `${enquiries.length} ${enquiries.length === 1 ? "enquiry" : "enquiries"}`;
  if (!enquiries.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "No saved enquiries on this device yet.";
    row.appendChild(cell);
    enquiryTableBody.appendChild(row);
    return;
  }
  enquiries.forEach((enquiry) => {
    const row = document.createElement("tr");
    [
      enquiry.reference,
      new Date(enquiry.createdAt).toLocaleDateString(),
      enquiry.name,
      enquiry.type,
      `${enquiry.month} · ${enquiry.duration} · ${enquiry.travelers} traveler(s)`,
      enquiry.reach
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    enquiryTableBody.appendChild(row);
  });
}

exportEnquiries?.addEventListener("click", () => {
  const enquiries = readEnquiries();
  if (!enquiries.length) return;
  const columns = ["reference", "createdAt", "name", "reach", "type", "month", "duration", "travelers", "budget", "message"];
  const csv = [columns.join(","), ...enquiries.map((item) => columns.map((column) => `"${String(item[column] || "").replaceAll('"', '""')}"`).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "augur-enquiries.csv";
  link.click();
  URL.revokeObjectURL(url);
});
renderEnquiries();

