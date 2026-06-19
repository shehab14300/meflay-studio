const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const heroTrail = document.getElementById("heroTrail");
const ctaTrail = document.getElementById("ctaTrail");
const projectStack = document.getElementById("projectStack");
const spotlightTrack = document.getElementById("spotlightTrack");
const ctaImage = document.getElementById("ctaImage");

let content = {
  heroTrailImages: [],
  projects: [],
  spotlight: [],
  ctaTrailTexts: []
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function headerState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", headerState, { passive: true });
headerState();

function toggleMenu() {
  const open = mobileNav.classList.toggle("open");
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}

function closeMenu() {
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
    return `
      <article class="project-card" data-cat="${cats}" style="z-index:${index + 1}">
        <a href="#contact" aria-label="View ${project.title}">
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

  const items = document.querySelectorAll(".intro p, .project-card, .services-left, .services-grid article, .spot-card, .cta-title");
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

  let heroLast = 0;
  let ctaLast = 0;

  const hero = document.getElementById("hero");
  const cta = document.getElementById("contact");

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
      createTextTrail(ctaTrail, content.ctaTrailTexts, event);
    }, { passive: true });
  }
}

function setupStackScale() {
  if (prefersReducedMotion) return;

  const cards = Array.from(document.querySelectorAll(".project-card"));
  if (!cards.length) return;

  function updateCards() {
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const progress = Math.min(Math.max((40 - rect.top) / 280, 0), 1);
      const scale = 1 - progress * 0.035;
      const blur = progress * 2.2;
      card.style.transform = `scale(${scale})`;
      card.style.filter = `blur(${blur}px)`;
      if (index === cards.length - 1) {
        card.style.filter = "none";
      }
    });

    requestAnimationFrame(updateCards);
  }

  updateCards();
}

async function loadContent() {
  try {
    const res = await fetch("data/content.json", { cache: "no-store" });
    content = await res.json();

    if (ctaImage && content.ctaImage) {
      ctaImage.style.setProperty("--cta-image", `url("${content.ctaImage}")`);
    }

    renderProjects(content.projects || []);
    renderSpotlight(content.spotlight || []);
    setupFilters();
    setupReveal();
    setupTrails();
    setupStackScale();
  } catch (err) {
    console.warn("Could not load data/content.json", err);
  }
}

loadContent();
