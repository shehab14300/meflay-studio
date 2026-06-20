const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const heroTrail = document.getElementById("heroTrail");
const ctaTrail = document.getElementById("ctaTrail");
const projectStack = document.getElementById("projectStack");
const spotlightTrack = document.getElementById("spotlightTrack");
const ctaImage = document.getElementById("ctaImage");
const introReveal = document.getElementById("introReveal");
const ctaSection = document.getElementById("contact");
const footerClock = document.getElementById("footerClock");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let content = {
  heroTrailImages: [],
  projects: [],
  spotlight: [],
  ctaTrailTexts: []
};

function slugify(value = "") {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function headerState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);

  if (ctaSection) {
    const rect = ctaSection.getBoundingClientRect();
    const headerIsOverDarkArea = rect.top < 90 && rect.bottom > 40;
    header.classList.toggle("on-dark", headerIsOverDarkArea);
  }
}

window.addEventListener("scroll", headerState, { passive: true });
window.addEventListener("resize", headerState, { passive: true });
headerState();

function toggleMenu() {
  if (!mobileNav || !menuToggle) return;
  const open = mobileNav.classList.toggle("open");
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}

function closeMenu() {
  if (!mobileNav || !menuToggle) return;
  mobileNav.classList.remove("open");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", toggleMenu);
  mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
}

function arrowSvg() {
  return `
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="60 58 140 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M198,64V168a6,6,0,0,1-12,0V78.48L68.24,196.24a6,6,0,0,1-8.48-8.48L177.52,70H88a6,6,0,0,1,0-12H192A6,6,0,0,1,198,64Z"></path>
    </svg>
  `;
}

function renderProjects(projects) {
  if (!projectStack) return;

  const featured = projects.slice(0, 6);
  projectStack.innerHTML = featured.map((project, index) => {
    const tags = (project.tags || []).slice(0, 4).map(tag => `<span>${tag}</span>`).join("");
    const cats = (project.categories || []).join(" ");
    const slug = slugify(project.slug || project.title);

    return `
      <article class="project-card" data-cat="${cats}" style="z-index:${index + 1}">
        <a href="/project.html?project=${encodeURIComponent(slug)}" aria-label="View ${project.title} case study">
          <figure>
            <img src="${project.image}" alt="${project.title}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} />
            <figcaption class="project-content">
              <span class="project-arrow">${arrowSvg()}</span>
              <div class="project-main">
                <div class="project-title-wrap">
                  <h2 class="project-title">${project.title}</h2>
                  <p class="project-subtitle">${project.subtitle || ""}</p>
                </div>
                <div class="project-tags">${tags}</div>
              </div>
            </figcaption>
          </figure>
        </a>
      </article>
    `;
  }).join("");
}

function renderSpotlight(items) {
  if (!spotlightTrack) return;

  spotlightTrack.innerHTML = items.map(item => {
    const tags = (item.tags || []).map(tag => `<span>${tag}</span>`).join("");
    return `
      <article class="spot-card">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="spot-inner">
          <h3>${item.title}</h3>
          <div class="spot-tags">${tags}</div>
        </div>
      </article>
    `;
  }).join("");
}

function setupFilters() {
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

function setupReveal() {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

  const items = document.querySelectorAll(".project-card, .services-left, .services-grid article, .spot-card, .cta-title, .case-cover, .case-overview, .case-gallery img");
  items.forEach(item => item.classList.add("reveal"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px"
  });

  items.forEach(item => observer.observe(item));
}

function setupIntroReveal() {
  if (!introReveal) return;

  const originalText = introReveal.textContent.trim().replace(/\s+/g, " ");
  introReveal.innerHTML = originalText
    .split(" ")
    .map(word => `<span class="word">${word}</span>`)
    .join(" ");

  const words = Array.from(introReveal.querySelectorAll(".word"));

  function updateWords() {
    const rect = introReveal.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const progress = Math.min(Math.max((viewport * 0.82 - rect.top) / (rect.height + viewport * 0.35), 0), 1);
    const activeCount = Math.floor(progress * words.length);

    words.forEach((word, index) => {
      word.classList.toggle("is-active", index <= activeCount);
    });
  }

  updateWords();
  window.addEventListener("scroll", updateWords, { passive: true });
  window.addEventListener("resize", updateWords, { passive: true });
}

function createImageTrail(container, images, event) {
  if (!container || !images.length) return;

  const rect = container.getBoundingClientRect();
  const img = document.createElement("img");
  img.className = "trail-image";
  img.src = images[Math.floor(Math.random() * images.length)];
  img.alt = "";
  img.style.left = `${event.clientX - rect.left}px`;
  img.style.top = `${event.clientY - rect.top}px`;
  img.style.setProperty("--r", `${Math.random() * 34 - 17}deg`);

  container.appendChild(img);
  window.setTimeout(() => img.remove(), 950);
}

function createTextTrail(container, texts, event) {
  if (!container || !texts.length) return;

  const rect = container.getBoundingClientRect();
  const item = document.createElement("span");
  item.className = "trail-text";
  item.textContent = texts[Math.floor(Math.random() * texts.length)];
  item.style.left = `${event.clientX - rect.left}px`;
  item.style.top = `${event.clientY - rect.top}px`;
  item.style.background = ["#ff4629", "#2ac4ea", "#78cd6e"][Math.floor(Math.random() * 3)];
  item.style.setProperty("--r", `${Math.random() * 28 - 14}deg`);

  container.appendChild(item);
  window.setTimeout(() => item.remove(), 950);
}

function setupTrails() {
  if (prefersReducedMotion) return;

  const hero = document.getElementById("hero");
  const cta = document.getElementById("contact");
  let heroLast = 0;
  let ctaLast = 0;

  if (hero) {
    hero.addEventListener("pointermove", event => {
      const now = performance.now();
      if (now - heroLast < 110) return;
      heroLast = now;
      createImageTrail(heroTrail, content.heroTrailImages, event);
    }, { passive: true });
  }

  if (cta) {
    cta.addEventListener("pointermove", event => {
      const now = performance.now();
      if (now - ctaLast < 110) return;
      ctaLast = now;
      createTextTrail(ctaTrail, content.ctaTrailTexts || ["Let’s talk", "Start a project", "Get a quote"], event);
    }, { passive: true });
  }
}

function setupStackScale() {
  if (prefersReducedMotion) return;

  const cards = Array.from(document.querySelectorAll(".project-card"));
  if (!cards.length) return;

  function updateCards() {
    cards.forEach((card, index) => {
      if (card.classList.contains("is-hidden")) return;
      const rect = card.getBoundingClientRect();
      const progress = Math.min(Math.max((40 - rect.top) / 280, 0), 1);
      const scale = 1 - progress * 0.028;
      const blur = progress * 1.4;
      card.style.transform = `scale(${scale})`;
      card.style.filter = `blur(${blur}px)`;
      if (index === cards.length - 1) card.style.filter = "none";
    });

    requestAnimationFrame(updateCards);
  }

  updateCards();
}

function setupCtaColor() {
  const cta = document.getElementById("contact");
  if (!cta) return;

  function mix(a, b, t) {
    return Math.round(a + (b - a) * t);
  }

  function updateCta() {
    const rect = cta.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const progress = Math.min(Math.max((viewport * 0.78 - rect.top) / (viewport * 0.72), 0), 1);

    const bg = [
      mix(234, 0, progress),
      mix(233, 0, progress),
      mix(232, 0, progress)
    ];

    const fg = [
      mix(0, 255, progress),
      mix(0, 255, progress),
      mix(0, 255, progress)
    ];

    cta.style.setProperty("--cta-bg", bg.join(","));
    cta.style.setProperty("--cta-fg", fg.join(","));
  }

  updateCta();
  window.addEventListener("scroll", updateCta, { passive: true });
  window.addEventListener("resize", updateCta, { passive: true });
}

function renderProjectPage(projects) {
  const page = document.getElementById("projectPage");
  if (!page) return;

  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("project");
  const projectIndex = Math.max(projects.findIndex(item => slugify(item.slug || item.title) === requestedSlug), 0);
  const project = projects[projectIndex] || projects[0];
  const next = projects[(projectIndex + 1) % projects.length] || projects[0];

  if (!project) return;

  const caseTitle = document.getElementById("caseTitle");
  const caseSubtitle = document.getElementById("caseSubtitle");
  const caseCover = document.getElementById("caseCover");
  const caseOverview = document.getElementById("caseOverview");
  const caseMeta = document.getElementById("caseMeta");
  const caseGallery = document.getElementById("caseGallery");
  const nextProject = document.getElementById("nextProject");

  document.title = `${project.title} — Meflay Studio`;

  caseTitle.textContent = project.title;
  caseSubtitle.textContent = project.subtitle || "Case study visual direction and brand system.";
  caseCover.src = project.image;
  caseCover.alt = project.title;
  caseOverview.textContent = project.overview || `A case study page for ${project.title}, built to hold the full visual story, brand direction, applications, and production-ready project details.`;

  caseMeta.innerHTML = (project.tags || project.categories || []).map(tag => `<span>${tag}</span>`).join("");

  const related = projects
    .filter(item => item.title !== project.title)
    .filter(item => (item.categories || []).some(cat => (project.categories || []).includes(cat)))
    .slice(0, 4);

  const galleryItems = [project, ...related].slice(0, 5);

  caseGallery.innerHTML = `
    <img src="${galleryItems[0].image}" alt="${galleryItems[0].title}" loading="lazy" />
    <div class="gallery-grid">
      ${galleryItems.slice(1, 3).map(item => `<img src="${item.image}" alt="${item.title}" loading="lazy" />`).join("")}
    </div>
    ${galleryItems.slice(3).map(item => `<img src="${item.image}" alt="${item.title}" loading="lazy" />`).join("")}
  `;

  nextProject.href = `/project.html?project=${encodeURIComponent(slugify(next.slug || next.title))}`;
  nextProject.textContent = `Next: ${next.title}`;
}

function setupClock() {
  if (!footerClock) return;

  function updateClock() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Africa/Cairo"
    });

    footerClock.textContent = `Cairo ${formatter.format(now)}`;
  }

  updateClock();
  window.setInterval(updateClock, 1000);
}

async function loadContent() {
  try {
    const res = await fetch("/data/content.json", { cache: "no-store" });
    content = await res.json();

    if (ctaImage && content.ctaImage) {
      ctaImage.style.setProperty("--cta-image", `url("${content.ctaImage}")`);
    }

    renderProjects(content.projects || []);
    renderSpotlight(content.spotlight || []);
    renderProjectPage(content.projects || []);

    setupFilters();
    setupReveal();
    setupIntroReveal();
    setupTrails();
    setupStackScale();
    setupCtaColor();
    setupClock();
    headerState();
  } catch (err) {
    console.warn("Could not load /data/content.json", err);
    setupReveal();
    setupIntroReveal();
    setupCtaColor();
    setupClock();
  }
}

loadContent();
