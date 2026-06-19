const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const cursorDot = document.getElementById('cursorDot');
const heroStage = document.getElementById('heroStage');
const floatCards = Array.from(document.querySelectorAll('.float-card'));
const projectGrid = document.getElementById('projectGrid');
const journalTrack = document.getElementById('journalTrack');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setNavState() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 24);
}

setNavState();
window.addEventListener('scroll', setNavState, { passive: true });

function closeMenu() {
    if (!navLinks || !menuBtn) return;
    navLinks.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
}

function toggleMenu() {
    if (!navLinks || !menuBtn) return;
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
}

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', toggleMenu);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });
}

if (cursorDot && !prefersReducedMotion) {
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    window.addEventListener('pointermove', event => {
        cursorX = event.clientX;
        cursorY = event.clientY;
        cursorDot.classList.add('visible');
    }, { passive: true });

    function bindCursorHover() {
        document.querySelectorAll('a, button, .project-card, .journal-card').forEach(element => {
            element.addEventListener('pointerenter', () => cursorDot.classList.add('is-hovering'));
            element.addEventListener('pointerleave', () => cursorDot.classList.remove('is-hovering'));
        });
    }

    function animateCursor() {
        dotX += (cursorX - dotX) * 0.2;
        dotY += (cursorY - dotY) * 0.2;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }

    bindCursorHover();
    animateCursor();

    window.bindCursorHover = bindCursorHover;
}

if (heroStage && floatCards.length && !prefersReducedMotion) {
    let stageX = 0;
    let stageY = 0;
    let targetX = 0;
    let targetY = 0;

    heroStage.addEventListener('pointermove', event => {
        const rect = heroStage.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }, { passive: true });

    heroStage.addEventListener('pointerleave', () => {
        targetX = 0;
        targetY = 0;
    });

    function animateHeroCards() {
        stageX += (targetX - stageX) * 0.08;
        stageY += (targetY - stageY) * 0.08;

        floatCards.forEach(card => {
            const depth = Number(card.dataset.depth || 10);
            const x = stageX * depth;
            const y = stageY * depth * 0.72;
            card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(var(--rotate, 0deg))`;
        });

        requestAnimationFrame(animateHeroCards);
    }

    animateHeroCards();
}

function setText(id, value, useHTML = false) {
    const element = document.getElementById(id);
    if (!element || !value) return;

    if (useHTML) {
        element.innerHTML = value;
    } else {
        element.textContent = value;
    }
}

function setHref(id, href, text) {
    const element = document.getElementById(id);
    if (!element) return;

    if (href) element.href = href;
    if (text) element.textContent = text;
}

function createTag(tag) {
    const span = document.createElement('span');
    span.textContent = tag;
    return span;
}

function getProjectClass(index) {
    if (index === 0 || index === 8 || index === 18 || index === 30) return 'project-card project-card-large';
    if (index === 4 || index === 13 || index === 24 || index === 36) return 'project-card project-card-tall';
    return 'project-card';
}

function renderProjects(projects = []) {
    if (!projectGrid) return;

    projectGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const article = document.createElement('article');
        article.className = getProjectClass(index);
        article.dataset.cat = (project.categories || []).join(' ');

        const link = document.createElement('a');
        link.className = 'project-link';
        link.href = project.link || '#contact';
        link.setAttribute('aria-label', `View ${project.title}`);

        const media = document.createElement('div');
        media.className = 'project-media';

        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.alt || project.title;
        img.loading = index < 4 ? 'eager' : 'lazy';

        media.appendChild(img);

        const overlay = document.createElement('div');
        overlay.className = 'project-overlay';

        const top = document.createElement('div');
        top.className = 'project-top';

        (project.tags || []).slice(0, 4).forEach(tag => {
            top.appendChild(createTag(tag));
        });

        const bottom = document.createElement('div');
        bottom.className = 'project-bottom';

        const text = document.createElement('div');

        const eyebrow = document.createElement('p');
        eyebrow.textContent = project.subtitle || 'Brand system';

        const title = document.createElement('h3');
        title.textContent = project.title;

        text.appendChild(eyebrow);
        text.appendChild(title);

        const arrow = document.createElement('span');
        arrow.className = 'project-arrow';
        arrow.textContent = '↗';

        bottom.appendChild(text);
        bottom.appendChild(arrow);

        overlay.appendChild(top);
        overlay.appendChild(bottom);

        link.appendChild(media);
        link.appendChild(overlay);
        article.appendChild(link);
        projectGrid.appendChild(article);
    });
}

function renderJournal(items = []) {
    if (!journalTrack) return;

    journalTrack.innerHTML = '';

    items.forEach((item, index) => {
        const article = document.createElement('article');
        article.className = index % 3 === 0 ? 'journal-card journal-red' : 'journal-card journal-image';

        if (item.image && index % 3 !== 0) {
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title;
            img.loading = 'lazy';
            article.appendChild(img);
        }

        const wrap = document.createElement('div');

        const label = document.createElement('span');
        label.textContent = item.label || 'Featured Project';

        const title = document.createElement('h3');
        title.textContent = item.title;

        const desc = document.createElement('p');
        desc.textContent = item.description || 'Selected work';

        wrap.appendChild(label);
        wrap.appendChild(title);
        wrap.appendChild(desc);

        article.appendChild(wrap);
        journalTrack.appendChild(article);
    });
}

function setupFilters() {
    const filters = Array.from(document.querySelectorAll('.filter'));
    const cards = Array.from(document.querySelectorAll('.project-card'));

    filters.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filters.forEach(item => item.classList.remove('active'));
            button.classList.add('active');

            cards.forEach(card => {
                const categories = card.dataset.cat || '';
                const shouldShow = filter === 'all' || categories.includes(filter);
                card.classList.toggle('is-hidden', !shouldShow);
            });
        });
    });
}

function setupReveal() {
    const revealItems = document.querySelectorAll('.section-head, .intro-grid, .project-card, .service-item, .journal-card, .career-card, .contact-box');

    if (!('IntersectionObserver' in window) || prefersReducedMotion) return;

    revealItems.forEach(item => item.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => revealObserver.observe(item));
}

function applyHeroImages(images = []) {
    document.querySelectorAll('[data-hero-img]').forEach(img => {
        const index = Number(img.dataset.heroImg);
        if (images[index]) {
            img.src = images[index];
        }
    });
}

async function loadContent() {
    try {
        const response = await fetch('data/content.json', { cache: 'no-store' });
        if (!response.ok) throw new Error('content.json not found');

        const data = await response.json();

        if (data.site) {
            setText('navLogo', data.site.logoHTML || data.site.name, Boolean(data.site.logoHTML));
        }

        if (data.hero) {
            setText('heroEyebrow', data.hero.eyebrow);
            setText('heroHeadline', data.hero.headline, true);
            setText('heroMetaOne', data.hero.metaOne);
            setText('heroMetaTwo', data.hero.metaTwo);
            setText('heroMetaThree', data.hero.metaThree);
            applyHeroImages(data.hero.images);
        }

        if (data.studio) {
            setText('studioText', data.studio.text);
        }

        if (data.contact) {
            setHref('footerEmail', `mailto:${data.contact.email}`, data.contact.email);
            setHref('footerPhone', data.contact.whatsappLink, `WhatsApp: ${data.contact.whatsapp}`);
            setHref('footerInstagram', data.contact.instagramLink, data.contact.instagram);
        }

        renderProjects(data.projects || []);
        renderJournal(data.journal || []);
        setupFilters();
        setupReveal();

        if (window.bindCursorHover) {
            window.bindCursorHover();
        }
    } catch (error) {
        console.warn('Content loading error:', error);
        setupFilters();
        setupReveal();
    }
}

loadContent();
