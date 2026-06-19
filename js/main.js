const heroOverlay = document.getElementById('heroOverlay');
const hero = document.getElementById('hero');
let heroRaf;
hero.addEventListener('mousemove', (e) => {
    cancelAnimationFrame(heroRaf);
    heroRaf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(window.innerWidth, window.innerHeight) * 0.25;
        heroOverlay.style.maskImage = "radial-gradient(circle " + size + "px at " + x + "px " + y + "px, transparent 0%, transparent 70%, black 100%)";
        heroOverlay.style.webkitMaskImage = "radial-gradient(circle " + size + "px at " + x + "px " + y + "px, transparent 0%, transparent 70%, black 100%)";
    });
});
hero.addEventListener('mouseleave', () => {
    heroOverlay.style.maskImage = 'radial-gradient(circle 0px at 50% 50%, transparent 0%, black 100%)';
    heroOverlay.style.webkitMaskImage = 'radial-gradient(circle 0px at 50% 50%, transparent 0%, black 100%)';
});

const studioText = document.querySelector('.studio-text');
const studioSection = document.getElementById('studio');
function updateStudioGradient() {
    if (!studioText) return;
    const rect = studioSection.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - vh)));
    studioText.style.backgroundPosition = (45 + progress * 50) + "% 0";
}

const workCards = document.querySelectorAll('.work-card');
function updateStack() {
    workCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.classList.toggle('active', rect.top < 80);
    });
}

document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        workCards.forEach(card => {
            card.style.display = (f === 'all' || (card.dataset.cat || '').includes(f)) ? '' : 'none';
        });
    });
});

const wordsCanvas = document.getElementById('wordsCanvas');
const wordsList = ['Branding','Identity','Typography','Packaging','Motion','Strategy','Craft','Detail','Vision','Culture','System','Print','Digital','Logo','Colour','Grid','Space','Rhythm','Contrast','Hierarchy'];
const wordEls = [];
wordsList.forEach((word) => {
    const el = document.createElement('span');
    el.className = 'floating-word';
    el.textContent = word;
    el.style.left = (5 + Math.random() * 80) + '%';
    el.style.top = (5 + Math.random() * 85) + '%';
    el.style.fontSize = (0.8 + Math.random() * 1.8) + 'rem';
    el.style.setProperty('--speed', (0.02 + Math.random() * 0.04).toFixed(3));
    wordsCanvas.appendChild(el);
    wordEls.push({ el, ox: parseFloat(el.style.left), oy: parseFloat(el.style.top) });
});

const wordsSection = document.getElementById('wordsSection');
let wordsMouse = { x: 0.5, y: 0.5 };
wordsSection.addEventListener('mousemove', (e) => {
    const rect = wordsSection.getBoundingClientRect();
    wordsMouse.x = (e.clientX - rect.left) / rect.width;
    wordsMouse.y = (e.clientY - rect.top) / rect.height;
});

function animateWords() {
    wordEls.forEach(w => {
        const dx = wordsMouse.x - (w.ox / 100);
        const dy = wordsMouse.y - (w.oy / 100);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = parseFloat(w.el.style.getPropertyValue('--speed'));
        w.el.style.transform = "translate(" + (dx * speed * 100) + "px, " + (dy * speed * 100) + "px)";
        w.el.classList.toggle('visible', dist < 0.45);
    });
    requestAnimationFrame(animateWords);
}
animateWords();

let isDark = false;
function checkDark() {
    if (!wordsSection) return;
    const shouldDark = wordsSection.getBoundingClientRect().top < window.innerHeight * 0.3;
    if (shouldDark !== isDark) { isDark = shouldDark; document.body.classList.toggle('dark', isDark); }
}

let scrollRaf;
window.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollRaf);
    scrollRaf = requestAnimationFrame(() => {
        updateStudioGradient(); updateStack(); checkDark();
        document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
    });
}, { passive: true });

function updateClock() {
    const el = document.getElementById('liveClock');
    if (el) {
        const now = new Date();
        el.textContent = 'Cairo ' + now.toLocaleString('en-GB', { weekday:'long', year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false, timeZoneName:'short' });
    }
}
setInterval(updateClock, 1000); updateClock();

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

async function loadContent() {
    try {
        const res = await fetch('data/content.json');
        if (!res.ok) return;
        const data = await res.json();
        if (data.hero) {
            if (data.hero.eyebrow) document.getElementById('heroEyebrow').textContent = data.hero.eyebrow;
            if (data.hero.headline) document.getElementById('heroHeadline').innerHTML = data.hero.headline;
            if (data.hero.sub) document.getElementById('heroSub').textContent = data.hero.sub;
        }
        if (data.contact) {
            if (data.contact.email) { document.getElementById('footerEmail').textContent = data.contact.email; document.querySelector('.cta-contact-info p').textContent = data.contact.email; }
            if (data.contact.phone) document.getElementById('footerPhone').textContent = data.contact.phone;
            if (data.contact.address) document.getElementById('footerAddress').textContent = data.contact.address;
        }
    } catch(e) {}
}
loadContent();
updateStudioGradient(); updateStack(); checkDark();
