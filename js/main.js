const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const DEFAULT_CONTENT = {
  heroTrailImages: [
    "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Tallah%20Cosmetics%20Event%20Visual%20_%20Static%20Design.jpeg",
    "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Khan%20Coffee%20Packaging%20_%20Arabic-Inspired%20Coffee%20Bag%20Design.jpeg",
    "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Flight-Inspired%20Pattern%20System.jpeg",
    "https://ik.imagekit.io/42ah9dpycq/New%20Folder/EzyStay%20Mobile%20UI%20_%20Booking%20Made%20Simple.jpeg",
    "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Curlz%20Noodles%20_%20Full%20Flavor%20Range.jpeg"
  ],
  ctaImage: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Khan%20Coffee%20Packaging%20_%20Arabic-Inspired%20Coffee%20Bag%20Design.jpeg",
  ctaTrailTexts: ["Say hello", "Start a project", "Get a quote", "Tell us your brief", "Project inquiry"],
  projects: [
    {
      title: "Khan Coffee",
      slug: "khan-coffee",
      subtitle: "Arabic-inspired coffee packaging",
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
      title: "Sayah Travel Brand Identity",
      slug: "sayah",
      subtitle: "Travel brand identity",
      image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Travel%20Brand%20Logo%20&%20Primary%20Identity.jpeg",
      tags: ["Branding", "Travel", "Visual Identity"],
      categories: ["branding", "visual-identity", "visual-design"],
      services: "Brand Identity / Pattern System / Applications",
      storyTitle: "A travel identity designed around movement, direction and discovery.",
      storyBody: "Sayah was built to feel dynamic without losing clarity. The identity system uses a flight-inspired visual language, flexible patterns and strong touchpoints to create a travel brand that feels alive across digital, print and spatial applications.",
      gallery: [
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Flight-Inspired%20Pattern%20System.jpeg",
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Event%20Visuals%20&%20Lifestyle%20Applications.jpeg",
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Merchandise%20&%20Brand%20Touchpoints.jpeg",
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Spatial%20&%20Interior%20Branding%20Concept.jpeg"
      ]
    },
    {
      title: "Tallah Cosmetics",
      slug: "tallah-cosmetics",
      subtitle: "Cosmetics event visuals",
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
      title: "EzyStay Mobile Booking Experience",
      slug: "ezystay",
      subtitle: "Travel app UI and branding",
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
      title: "Curlz Noodles Full Flavor Range",
      slug: "curlz-noodles",
      subtitle: "FMCG packaging system",
      image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Curlz%20Noodles%20_%20Full%20Flavor%20Range.jpeg",
      tags: ["Packaging", "FMCG", "Product Line"],
      categories: ["packaging", "visual-design"],
      services: "Packaging / FMCG / Product Range",
      storyTitle: "A colorful food packaging range built for shelf impact.",
      storyBody: "Curlz needed a packaging system that can organize multiple flavors while staying playful and easy to recognize. The design balances appetite appeal, color coding and strong brand consistency.",
      gallery: [
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Curlz%20Noodles%20_%20Meat%20Flavor%20Pack.jpeg",
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Curlz%20Noodles%20_%20Vegetable%20Flavor%20Pack.jpeg",
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Chicken%20Flavor%20+%20Print%20Layout%20Preview.jpeg",
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Curlz%20Packaging%20_%20Case%20Study%20Video.jpeg"
      ]
    },
    {
      title: "IDEA Kids Brand",
      slug: "idea-kids",
      subtitle: "Kids identity and touchpoints",
      image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Kids%20Brand%20Identity%20_%20IDEA%20Cover%20Visual.jpeg",
      tags: ["Branding", "Kids", "Touchpoints"],
      categories: ["branding", "visual-identity", "packaging"],
      services: "Brand Identity / Kids Visual System / Touchpoints",
      storyTitle: "A playful identity system built around learning, color and movement.",
      storyBody: "IDEA Kids uses friendly visual elements, simple forms and memorable applications to create a brand that feels bright, safe and exciting for young audiences and parents.",
      gallery: [
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Kids%20Brand%20Touchpoints%20&%20Outdoor%20Visuals%20_%20IDEA.jpeg",
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Logo%20Design%20for%20IDEA%20Kids%20Brand.jpeg",
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Kids%20Visual%20System%20_%20Numbers%20&%20Shapes%20Exploration.jpeg",
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Kids%20Brand%20Merchandise%20&%20Fun%20Items%20_%20IDEA.jpeg"
      ]
    },
    {
      title: "Advanced Buildings Company",
      slug: "advanced-buildings",
      subtitle: "Logo concept and identity",
      image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Visual%20Identity%20for%20Advanced%20Buildings%20Company%20_%20Logo%20Concept.jpeg",
      tags: ["Branding", "Construction", "Logo"],
      categories: ["branding", "visual-identity"],
      services: "Logo Design / Visual Identity",
      storyTitle: "A construction identity designed around structure and confidence.",
      storyBody: "The visual identity focuses on strength, clarity and scalability, creating a professional brand system suitable for corporate communication, signage and business applications.",
      gallery: [
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Stationery%20Design%20with%20Structure%20&%20Style.jpeg",
        "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Brand%20Identity%20in%20Real%20Spaces.jpeg"
      ]
    }
  ],
  spotlight: [
    {
      title: "Khan Coffee Arabic Packaging System",
      image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Khan%20Coffee%20Product%20Line%20_%20Complete%20Arabic%20Packaging%20System.jpeg",
      tags: ["Packaging", "Coffee", "Arabic Identity"]
    },
    {
      title: "Sayah Travel Brand Identity",
      image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Sayah%20_%20Travel%20Brand%20Logo%20&%20Primary%20Identity.jpeg",
      tags: ["Branding", "Travel"]
    },
    {
      title: "EzyStay Mobile Booking Experience",
      image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/EzyStay%20Mobile%20UI%20_%20Booking%20Made%20Simple.jpeg",
      tags: ["UI Design", "Mobile"]
    },
    {
      title: "Curlz Noodles Full Flavor Range",
      image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Curlz%20Noodles%20_%20Full%20Flavor%20Range.jpeg",
      tags: ["Packaging", "FMCG"]
    },
    {
      title: "Tallah Cosmetics Summer Visuals",
      image: "https://ik.imagekit.io/42ah9dpycq/New%20Folder/Tallah%20Cosmetics%20Event%20Visual%20_%20Static%20Summer%20Design.jpeg",
      tags: ["Visual Design", "Campaign"]
    }
  ]
};

let content = DEFAULT_CONTENT;
let appIsBooting = false;
let trailsAlreadyBound = false;
let heroTrailIndex = 0;
let ctaTrailIndex = 0;

const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const projectStack = document.getElementById("projectStack");
const spotlightTrack = document.getElementById("spotlightTrack");
const introReveal = document.getElementById("introReveal");
const heroTrail = document.getElementById("heroTrail");
const ctaTrail = document.getElementById("ctaTrail");
const ctaImage = document.getElementById("ctaImage");

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function headerState() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
}

function setupMenu() {
  if (!menuToggle || !mobileNav) return;

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

function arrowSvg() {
  return `
    <svg class="project-arrow" viewBox="0 0 120 120" aria-hidden="true">
      <path d="M25 95L95 25" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
      <path d="M45 25H95V75" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function renderProjects(projects) {
  if (!projectStack) return;

  projectStack.innerHTML = "";

  projects.forEach((project, index) => {
    const slug = project.slug || slugify(project.title);
    const card = document.createElement("article");

    card.className = "project-card";
    card.dataset.cat = (project.categories || []).join(" ");
    card.style.zIndex = String(index + 1);

    card.innerHTML = `
      <a href="/project.html?project=${encodeURIComponent(slug)}" aria-label="Open ${project.title} case study">
        <img src="${project.image}" alt="${project.title}" loading="${index < 2 ? "eager" : "lazy"}">
        <div class="project-content">
          ${arrowSvg()}
          <div class="project-title-wrap">
            <p class="project-subtitle">${project.subtitle || ""}</p>
            <h2 class="project-title">${project.title}</h2>
          </div>
          <div class="project-tags">
            ${(project.tags || []).map(tag => `<span>${tag}</span>`).join("")}
          </div>
        </div>
      </a>
    `;

    projectStack.appendChild(card);
  });
}

function renderSpotlight(items) {
  if (!spotlightTrack) return;

  spotlightTrack.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "spotlight-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="spotlight-content">
        <h3>${item.title}</h3>
        <div class="spotlight-tags">
          ${(item.tags || []).map(tag => `<span>${tag}</span>`).join("")}
        </div>
      </div>
    `;

    spotlightTrack.appendChild(card);
  });
}

function setupFilters() {
  const oldButtons = Array.from(document.querySelectorAll("#filters button"));

  oldButtons.forEach(button => {
    const cleanButton = button.cloneNode(true);
    button.replaceWith(cleanButton);
  });

  const buttons = Array.from(document.querySelectorAll("#filters button"));
  const cards = Array.from(document.querySelectorAll(".project-card"));

  buttons.forEach(button => {
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

function createImageTrail(container, images, event) {
  if (!container || !images.length) return;

  const rect = container.getBoundingClientRect();
  const image = document.createElement("img");

  image.className = "trail-image";
  image.src = images[heroTrailIndex % images.length];
  image.alt = "";
  image.style.left = `${event.clientX - rect.left}px`;
  image.style.top = `${event.clientY - rect.top}px`;

  heroTrailIndex += 1;

  container.appendChild(image);

  requestAnimationFrame(() => image.classList.add("visible"));

  window.setTimeout(() => {
    image.classList.remove("visible");
    window.setTimeout(() => image.remove(), 450);
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
    window.setTimeout(() => item.remove(), 450);
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
      if (now - heroLast < 95) return;
      heroLast = now;
      createImageTrail(heroTrail, content.heroTrailImages || [], event);
    }, { passive: true });
  }

  if (cta && ctaTrail) {
    cta.addEventListener("pointermove", event => {
      const now = performance.now();
      if (now - ctaLast < 110) return;
      ctaLast = now;
      createTextTrail(ctaTrail, content.ctaTrailTexts || [], event);
    }, { passive: true });
  }

  trailsAlreadyBound = true;
}

function setupStackScale() {
  if (prefersReducedMotion) return;

  const cards = Array.from(document.querySelectorAll(".project-card"));

  cards.forEach((card, index) => {
    const progress = Math.min(index * 0.012, 0.08);
    card.style.transform = `scale(${1 - progress})`;
  });
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

function renderProjectPage(projects) {
  if (document.body.dataset.page !== "project") return;

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("project");
  const project = projects.find(item => (item.slug || slugify(item.title)) === requested) || projects[0];

  if (!project) return;

  document.title = `Meflay — ${project.title}`;
  document.getElementById("caseTitle").textContent = project.title;
  document.getElementById("caseSubtitle").textContent = project.subtitle || "A complete visual system built with clarity and contrast.";
  document.getElementById("caseCover").src = project.image;
  document.getElementById("caseCover").alt = project.title;
  document.getElementById("caseMetaProject").textContent = project.title;
  document.getElementById("caseMetaServices").textContent = project.services || (project.tags || []).join(" / ");
  document.getElementById("caseStoryTitle").textContent = project.storyTitle || "Designed to look sharp, feel clear and move across touchpoints.";
  document.getElementById("caseStoryBody").textContent = project.storyBody || "This project was built around a clear idea, strong contrast and a flexible system that can live across brand touchpoints.";

  const labels = document.getElementById("caseLabels");
  labels.innerHTML = (project.tags || []).map(tag => `<span>${tag}</span>`).join("");

  const gallery = document.getElementById("caseGallery");
  const images = [project.image, ...(project.gallery || [])];

  gallery.innerHTML = images.map(src => `
    <figure>
      <img src="${src}" alt="${project.title}" loading="lazy">
    </figure>
  `).join("");
}

async function bootApp() {
  if (appIsBooting) return;
  appIsBooting = true;

  try {
    const response = await fetch(`/data/content.json?v=${Date.now()}`, { cache: "no-store" });

    if (response.ok) {
      const externalContent = await response.json();
      content = {
        ...DEFAULT_CONTENT,
        ...externalContent,
        projects: externalContent.projects && externalContent.projects.length ? externalContent.projects : DEFAULT_CONTENT.projects,
        spotlight: externalContent.spotlight && externalContent.spotlight.length ? externalContent.spotlight : DEFAULT_CONTENT.spotlight
      };
    }
  } catch (error) {
    content = DEFAULT_CONTENT;
  }

  if (ctaImage && content.ctaImage) {
    ctaImage.style.setProperty("--cta-image", `url("${content.ctaImage}")`);
  }

  renderProjects(content.projects || []);
  renderSpotlight(content.spotlight || []);
  renderProjectPage(content.projects || []);
  setupFilters();
  setupIntroReveal();
  setupTrails();
  setupStackScale();
  updateIntroReveal();
  setupCtaColor();
  setupClock();
  headerState();

  appIsBooting = false;
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
  bootApp();
});
