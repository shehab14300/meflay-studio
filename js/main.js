const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const FALLBACK_IMAGE = "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Tallah%20Cosmetics%20Event%20Visual%20_%20Static%20Summer%20Design.jpeg";

const PROJECTS = [
  {
    title: "Khan Coffee",
    slug: "khan-coffee",
    subtitle: "Arabic-inspired coffee packaging system",
    image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Khan%20Coffee%20Product%20Line%20_%20Complete%20Arabic%20Packaging%20System.jpeg",
    tags: ["Packaging", "Coffee", "Arabic Identity"],
    categories: ["packaging", "branding", "visual-identity"],
    services: "Packaging / Visual Identity / Product Line",
    storyTitle: "A packaging system rooted in Arabic warmth and everyday ritual.",
    storyBody: "Khan Coffee needed a visual language that feels local, premium and instantly recognizable on shelf. The system combines cultural inspiration, product clarity and a flexible packaging structure that can expand across flavors and formats.",
    gallery: [
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Khan%20Coffee%20Packaging%20_%20Arabic-Inspired%20Coffee%20Bag%20Design.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Khan%20Coffee%20Medium%20Roast%20_%20Arabic%20Coffee%20Packaging.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Khan%20Coffee%20Moodboard%20_%20Arabic%20Cultural%20Inspiration.jpeg"
    ]
  },
  {
    title: "Sayah Travel",
    slug: "sayah-travel",
    subtitle: "Flight-inspired travel identity system",
    image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Flight-Inspired%20Pattern%20System.jpeg",
    tags: ["Branding", "Travel", "Visual Identity"],
    categories: ["branding", "visual-identity", "visual-design"],
    services: "Brand Identity / Pattern System / Applications",
    storyTitle: "A travel identity designed around movement, direction and discovery.",
    storyBody: "Sayah was built to feel dynamic without losing clarity. The identity system uses a flight-inspired visual language, flexible patterns and strong touchpoints to create a travel brand that feels alive across digital, print and spatial applications.",
    gallery: [
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Travel%20Brand%20Logo%20%26%20Primary%20Identity.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Event%20Visuals%20%26%20Lifestyle%20Applications.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Merchandise%20%26%20Brand%20Touchpoints.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Spatial%20%26%20Interior%20Branding%20Concept.jpeg"
    ]
  },
  {
    title: "Tallah Cosmetics",
    slug: "tallah-cosmetics",
    subtitle: "Cosmetics event visuals and campaign direction",
    image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Tallah%20Cosmetics%20Event%20Visual%20_%20Static%20Summer%20Design.jpeg",
    tags: ["Visual Design", "Campaign", "Cosmetics"],
    categories: ["visual-design", "branding", "motion"],
    services: "Visual Design / Campaign / Event Visuals",
    storyTitle: "A bright event visual system made for beauty, energy and attention.",
    storyBody: "Tallah Cosmetics needed visuals that feel fresh, expressive and campaign-ready. The direction creates a high-impact beauty world with bold color, clear product focus and a visual system that works across digital launches and event communication.",
    gallery: [
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Tallah%20Cosmetics%20Event%20Visual%20_%20Static%20Design.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Tallah%20Cosmetics%20CGI%20Video%20_%20Summer%20Event%20Visual.jpeg"
    ]
  },
  {
    title: "EzyStay",
    slug: "ezystay",
    subtitle: "Mobile booking UI and travel branding",
    image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/EzyStay%20Mobile%20UI%20_%20Booking%20Made%20Simple.jpeg",
    tags: ["UI Design", "Mobile", "Travel"],
    categories: ["ui-design", "branding", "visual-design"],
    services: "UI Design / Brand Identity / Mobile Experience",
    storyTitle: "A digital booking experience designed to feel simple, warm and fast.",
    storyBody: "EzyStay turns vacation home booking into a clean, visual and user-friendly experience. The interface is structured for clarity, while the brand system keeps the platform approachable and memorable.",
    gallery: [
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Travel%20App%20UI%20_%20Explore%20Destinations%20with%20Ezy%20Stay.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Feel%20at%20Home%20_%20Ezy%20Stay%20Lifestyle%20Branding.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Ezy%20Stay%20Branding%20_%20Simplicity%20in%20Every%20Pixel.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/EzyStay%20Logo%20System%20_%20Brand%20Identity%20Colors.jpeg"
    ]
  },
  {
    title: "Curlz Noodles",
    slug: "curlz-noodles",
    subtitle: "FMCG packaging system and flavor range",
    image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Curlz%20Noodles%20_%20Full%20Flavor%20Range.jpeg",
    tags: ["Packaging", "FMCG", "Product Line"],
    categories: ["packaging", "visual-design"],
    services: "Packaging / FMCG / Product Range",
    storyTitle: "A colorful food packaging range built for shelf impact.",
    storyBody: "Curlz needed a packaging system that can organize multiple flavors while staying playful and easy to recognize. The design balances appetite appeal, color coding and strong brand consistency.",
    gallery: [
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Curlz%20Noodles%20_%20Meat%20Flavor%20Pack.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Curlz%20Noodles%20_%20Vegetable%20Flavor%20Pack.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Chicken%20Flavor%20%2B%20Print%20Layout%20Preview.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Curlz%20Packaging%20_%20Case%20Study%20Video.jpeg"
    ]
  },
  {
    title: "IDEA Kids",
    slug: "idea-kids",
    subtitle: "Kids identity and playful touchpoints",
    image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Kids%20Brand%20Identity%20_%20IDEA%20Cover%20Visual.jpeg",
    tags: ["Branding", "Kids", "Touchpoints"],
    categories: ["branding", "visual-identity", "packaging"],
    services: "Brand Identity / Kids Visual System / Touchpoints",
    storyTitle: "A playful identity system built around learning, color and movement.",
    storyBody: "IDEA Kids uses friendly visual elements, simple forms and memorable applications to create a brand that feels bright, safe and exciting for young audiences and parents.",
    gallery: [
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Kids%20Brand%20Touchpoints%20%26%20Outdoor%20Visuals%20_%20IDEA.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Logo%20Design%20for%20IDEA%20Kids%20Brand.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Kids%20Visual%20System%20_%20Numbers%20%26%20Shapes%20Exploration.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Kids%20Brand%20Merchandise%20%26%20Fun%20Items%20_%20IDEA.jpeg"
    ]
  },
  {
    title: "Advanced Buildings",
    slug: "advanced-buildings",
    subtitle: "Logo concept and corporate identity",
    image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Visual%20Identity%20for%20Advanced%20Buildings%20Company%20_%20Logo%20Concept.jpeg",
    tags: ["Branding", "Construction", "Logo"],
    categories: ["branding", "visual-identity"],
    services: "Logo Design / Visual Identity",
    storyTitle: "A construction identity designed around structure and confidence.",
    storyBody: "The visual identity focuses on strength, clarity and scalability, creating a professional brand system suitable for corporate communication, signage and business applications.",
    gallery: [
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Stationery%20Design%20with%20Structure%20%26%20Style.jpeg",
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Brand%20Identity%20in%20Real%20Spaces.jpeg"
    ]
  },
  {
    title: "Saudi Healthcare",
    slug: "saudi-healthcare",
    subtitle: "National identity motion concept",
    image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Saudi%20National%20Identity%20Motion%20Design%20_%20Healthcare%20Visual%20Concept.jpeg",
    tags: ["Motion", "Healthcare", "Saudi"],
    categories: ["motion", "visual-design"],
    services: "Motion Design / Healthcare Concept / Visual Direction",
    storyTitle: "A healthcare visual concept built with Saudi cultural energy.",
    storyBody: "This direction explores how national identity cues can be translated into healthcare communication with clarity, motion and emotional presence.",
    gallery: [
      "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Saudi%20National%20Identity%20Motion%20Design%20_%20Healthcare%20Visual%20Concept.jpeg"
    ]
  }
];

const HOME_PROJECTS = PROJECTS.slice(0, 6);
const SPOTLIGHT = [PROJECTS[2], PROJECTS[0], PROJECTS[1], PROJECTS[3], PROJECTS[4]];
const HERO_TRAIL_IMAGES = HOME_PROJECTS.map(project => project.image);
const CTA_IMAGE = "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Saudi%20National%20Identity%20Motion%20Design%20_%20Healthcare%20Visual%20Concept.jpeg";
const CTA_TRAIL_TEXTS = ["Say hello", "Start a project", "Get a quote", "Tell us your brief", "Project inquiry"];

let heroTrailIndex = 0;
let ctaTrailIndex = 0;
let trailsAlreadyBound = false;

const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const stackedProjects = document.getElementById("stackedProjects");
const allProjectsGrid = document.getElementById("allProjectsGrid");
const spotlightTrack = document.getElementById("spotlightTrack");
const introReveal = document.getElementById("introReveal");
const heroTrail = document.getElementById("heroTrail");
const ctaTrail = document.getElementById("ctaTrail");
const ctaImage = document.getElementById("ctaImage");

function headerState() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
}

function setupMenu() {
  if (!menuToggle || !mobileNav || menuToggle.dataset.bound === "true") return;

  menuToggle.dataset.bound = "true";

  menuToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      mobileNav.classList.remove("open");
      menuToggle.classList.remove("open");
      document.body.classList.remove("menu-open");
    }
  });
}

function fixImage(img) {
  img.addEventListener("error", () => {
    if (img.dataset.fallbackApplied === "true") return;
    img.dataset.fallbackApplied = "true";
    img.src = FALLBACK_IMAGE;
  });
}

function tagsHTML(tags = []) {
  return tags.map(tag => `<span>${tag}</span>`).join("");
}

function renderStackedProjects() {
  if (!stackedProjects) return;

  stackedProjects.innerHTML = HOME_PROJECTS.map((project, index) => `
    <article class="stack-card reveal" style="z-index:${index + 1};">
      <a href="/project.html?project=${encodeURIComponent(project.slug)}" aria-label="Open ${project.title} case study">
        <img src="${project.image}" alt="${project.title}" loading="${index < 2 ? "eager" : "lazy"}">
        <div class="stack-content">
          <div class="stack-top">
            <span class="stack-index">0${index + 1}</span>
            <div class="card-tags">${tagsHTML(project.tags)}</div>
          </div>

          <div class="stack-title-wrap">
            <h3>${project.title}</h3>
            <p>${project.subtitle}</p>
          </div>
        </div>
      </a>
    </article>
  `).join("");
}

function renderAllProjects() {
  if (!allProjectsGrid) return;

  allProjectsGrid.innerHTML = PROJECTS.map(project => `
    <article class="all-project-card reveal" data-cat="${project.categories.join(" ")}">
      <a href="/project.html?project=${encodeURIComponent(project.slug)}" aria-label="Open ${project.title} case study">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="all-project-content">
          <div>
            <h2>${project.title}</h2>
            <p>${project.subtitle}</p>
          </div>
          <div class="card-tags">${tagsHTML(project.tags)}</div>
        </div>
      </a>
    </article>
  `).join("");
}

function renderSpotlight() {
  if (!spotlightTrack) return;

  spotlightTrack.innerHTML = SPOTLIGHT.map(project => `
    <article class="spotlight-card reveal">
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <div class="spotlight-content">
        <h3>${project.title}</h3>
        <div class="card-tags">${tagsHTML(project.tags.slice(0, 3))}</div>
      </div>
    </article>
  `).join("");
}

function setupFilters() {
  const buttons = Array.from(document.querySelectorAll("#filters button"));
  const cards = Array.from(document.querySelectorAll(".all-project-card"));

  if (!buttons.length || !cards.length) return;

  buttons.forEach(button => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";

    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      buttons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      cards.forEach(card => {
        const cats = card.dataset.cat || "";
        const show = filter === "all" || cats.includes(filter);
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
}

function setupIntroReveal() {
  if (!introReveal || introReveal.dataset.ready === "true") return;

  const words = introReveal.textContent.trim().split(/\s+/);
  introReveal.innerHTML = words.map(word => `<span>${word}</span>`).join(" ");
  introReveal.dataset.ready = "true";
}

function updateIntroReveal() {
  if (!introReveal) return;

  const rect = introReveal.getBoundingClientRect();
  const windowHeight = window.innerHeight || 1;
  const progress = Math.min(1, Math.max(0, (windowHeight * 0.82 - rect.top) / (windowHeight * 0.85)));
  const spans = Array.from(introReveal.querySelectorAll("span"));
  const activeCount = Math.floor(progress * spans.length);

  spans.forEach((span, index) => {
    span.classList.toggle("active", index <= activeCount);
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    items.forEach(item => item.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  items.forEach(item => observer.observe(item));
}

function createImageTrail(container, images, event) {
  if (!container || !images.length) return;

  const rect = container.getBoundingClientRect();
  const image = document.createElement("img");

  image.className = "trail-image";
  image.src = images[heroTrailIndex % images.length];
  image.alt = "";
  image.style.left = `${event.clientX - rect.left}px`;
  image.style.top = `${event.clientY - rect.top}px`;

  fixImage(image);
  heroTrailIndex += 1;

  container.appendChild(image);

  requestAnimationFrame(() => image.classList.add("visible"));

  window.setTimeout(() => {
    image.classList.remove("visible");
    window.setTimeout(() => image.remove(), 480);
  }, 620);
}

function createTextTrail(container, texts, event) {
  if (!container || !texts.length) return;

  const rect = container.getBoundingClientRect();
  const item = document.createElement("span");

  item.className = "trail-text";
  item.textContent = texts[ctaTrailIndex % texts.length];
  item.style.left = `${event.clientX - rect.left}px`;
  item.style.top = `${event.clientY - rect.top}px`;
  item.style.setProperty("--r", `${[-8, 7, -4, 5, -10][ctaTrailIndex % 5]}deg`);

  ctaTrailIndex += 1;

  container.appendChild(item);

  requestAnimationFrame(() => item.classList.add("visible"));

  window.setTimeout(() => {
    item.classList.remove("visible");
    window.setTimeout(() => item.remove(), 480);
  }, 760);
}

function setupTrails() {
  if (prefersReducedMotion || trailsAlreadyBound) return;

  const hero = document.getElementById("hero");
  const cta = document.getElementById("contact");

  let heroLast = 0;
  let ctaLast = 0;

  if (hero && heroTrail) {
    hero.addEventListener("pointermove", event => {
      const now = performance.now();
      if (now - heroLast < 115) return;
      heroLast = now;
      createImageTrail(heroTrail, HERO_TRAIL_IMAGES, event);
    }, { passive: true });
  }

  if (cta && ctaTrail) {
    cta.addEventListener("pointermove", event => {
      const now = performance.now();
      if (now - ctaLast < 120) return;
      ctaLast = now;
      createTextTrail(ctaTrail, CTA_TRAIL_TEXTS, event);
    }, { passive: true });
  }

  trailsAlreadyBound = true;
}

function setupCtaColor() {
  const cta = document.querySelector(".cta");
  if (!cta) return;

  const rect = cta.getBoundingClientRect();
  const h = window.innerHeight || 1;
  const progress = Math.min(1, Math.max(0, (h * 0.88 - rect.top) / (h * 0.9)));

  const value = Math.round(234 - progress * 234);
  cta.style.background = `rgb(${value}, ${value}, ${value})`;
  cta.classList.toggle("is-dark", progress > 0.58);
}

function setupClock() {
  const clock = document.getElementById("footerClock");
  if (!clock) return;

  const now = new Date();
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(now);

  clock.textContent = `Cairo ${time}`;
}

function renderProjectPage() {
  if (document.body.dataset.page !== "project") return;

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("project");
  const project = PROJECTS.find(item => item.slug === requested) || PROJECTS[0];

  if (!project) return;

  document.title = `Meflay — ${project.title}`;

  const caseTitle = document.getElementById("caseTitle");
  const caseSubtitle = document.getElementById("caseSubtitle");
  const caseCover = document.getElementById("caseCover");
  const caseMetaProject = document.getElementById("caseMetaProject");
  const caseMetaServices = document.getElementById("caseMetaServices");
  const caseStoryTitle = document.getElementById("caseStoryTitle");
  const caseStoryBody = document.getElementById("caseStoryBody");
  const labels = document.getElementById("caseLabels");
  const gallery = document.getElementById("caseGallery");

  caseTitle.textContent = project.title;
  caseSubtitle.textContent = project.subtitle;
  caseCover.src = project.image;
  caseCover.alt = project.title;
  fixImage(caseCover);

  caseMetaProject.textContent = project.title;
  caseMetaServices.textContent = project.services;
  caseStoryTitle.textContent = project.storyTitle;
  caseStoryBody.textContent = project.storyBody;

  labels.innerHTML = tagsHTML(project.tags);

  const images = [project.image, ...(project.gallery || [])];

  gallery.innerHTML = images.map(src => `
    <figure class="reveal">
      <img src="${src}" alt="${project.title}" loading="lazy">
    </figure>
  `).join("");
}

function setupImagesFallback() {
  document.querySelectorAll("img").forEach(fixImage);
}

function bootApp() {
  if (ctaImage) {
    ctaImage.style.setProperty("--cta-image", `url("${CTA_IMAGE}")`);
  }

  renderStackedProjects();
  renderAllProjects();
  renderSpotlight();
  renderProjectPage();

  setupImagesFallback();
  setupFilters();
  setupIntroReveal();
  setupReveal();
  setupTrails();

  headerState();
  updateIntroReveal();
  setupCtaColor();
  setupClock();
}

window.addEventListener("scroll", () => {
  headerState();
  updateIntroReveal();
  setupCtaColor();
}, { passive: true });

window.addEventListener("resize", () => {
  updateIntroReveal();
  setupCtaColor();
}, { passive: true });

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  bootApp();
});

window.addEventListener("pageshow", () => {
  document.querySelectorAll(".trail-image, .trail-text").forEach(item => item.remove());
  headerState();
  updateIntroReveal();
  setupCtaColor();
  setupClock();
});
