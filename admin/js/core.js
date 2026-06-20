const db = window.MEFLAY_SUPABASE;
const ADMIN_PATH = '/admin/';

window.MeflayAdmin = {
  user: null,
  profile: null,
  ready: false,

  async init(activePage = '') {
    this.markActive(activePage);
    this.mountToastWrap();

    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      window.location.href = `${ADMIN_PATH}login.html`;
      return;
    }

    this.user = session.user;

    const { data, error } = await db
      .from('admin_profiles')
      .select('*')
      .eq('id', session.user.id)
      .eq('is_active', true)
      .maybeSingle();

    if (error || !data) {
      await db.auth.signOut();
      window.location.href = `${ADMIN_PATH}login.html?error=not-admin`;
      return;
    }

    this.profile = data;
    this.ready = true;
    this.renderUserPill();
    this.bindLogout();
  },

  markActive(page) {
    document.querySelectorAll('[data-nav]').forEach(item => {
      item.classList.toggle('active', item.dataset.nav === page);
    });
  },

  renderUserPill() {
    document.querySelectorAll('[data-user-pill]').forEach(node => {
      node.innerHTML = `<span>${this.profile.email}</span><b>·</b><b>${this.profile.role}</b>`;
    });
  },

  bindLogout() {
    document.querySelectorAll('[data-logout]').forEach(button => {
      button.addEventListener('click', async () => {
        await db.auth.signOut();
        window.location.href = `${ADMIN_PATH}login.html`;
      });
    });
  },

  mountToastWrap() {
    if (!document.querySelector('.toast-wrap')) {
      const wrap = document.createElement('div');
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
    }
  },

  toast(message, type = 'success') {
    const wrap = document.querySelector('.toast-wrap');
    const item = document.createElement('div');
    item.className = `toast ${type}`;
    item.textContent = message;
    wrap.appendChild(item);
    setTimeout(() => item.remove(), 4200);
  },

  error(message) {
    this.toast(message || 'Something went wrong', 'error');
  },

  setLoading(element, state = true) {
    if (!element) return;
    element.classList.toggle('loading', state);
    if ('disabled' in element) element.disabled = state;
  },

  slugify(value = '') {
    return value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'untitled';
  },

  parseList(value = '') {
    if (Array.isArray(value)) return value;
    return value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  },

  formatDate(value) {
    if (!value) return '—';
    return new Date(value).toLocaleString();
  },

  normalizeStatus(status) {
    return status || 'draft';
  },

  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('open');
  },

  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('open');
  },

  bindModalClose() {
    document.querySelectorAll('[data-close-modal]').forEach(button => {
      button.addEventListener('click', () => {
        this.closeModal(button.dataset.closeModal);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', event => {
        if (event.target === backdrop) backdrop.classList.remove('open');
      });
    });
  },

  bindTabs(scope = document) {
    scope.querySelectorAll('[data-tab-target]').forEach(button => {
      button.addEventListener('click', () => {
        const group = button.closest('[data-tabs]') || scope;
        const target = button.dataset.tabTarget;
        group.querySelectorAll('[data-tab-target]').forEach(tab => tab.classList.remove('active'));
        group.querySelectorAll('[data-tab-panel]').forEach(panel => panel.classList.remove('active'));
        button.classList.add('active');
        const panel = group.querySelector(`[data-tab-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  },

  async log(action, entity_type = null, entity_id = null, details = {}) {
    try {
      await db.from('activity_logs').insert({
        actor_id: this.user?.id || null,
        action,
        entity_type,
        entity_id,
        details
      });
    } catch (_) {}
  }
};

function shell(activePage, title, subtitle = '') {
  return `
    <aside class="sidebar">
      <a class="logo" href="/admin/index.html">meflay<span>.</span></a>
      <nav class="nav">
        <a href="/admin/index.html" data-nav="dashboard"><span class="dot"></span>Dashboard</a>
        <a href="/admin/projects.html" data-nav="projects"><span class="dot"></span>Projects</a>
        <a href="/admin/pages.html" data-nav="pages"><span class="dot"></span>Pages</a>
        <a href="/admin/media.html" data-nav="media"><span class="dot"></span>Media</a>
        <a href="/admin/admins.html" data-nav="admins"><span class="dot"></span>Admins</a>
        <a href="/admin/settings.html" data-nav="settings"><span class="dot"></span>Settings</a>
      </nav>
      <div class="sidebar-bottom">
        <a class="btn" href="/" target="_blank">Open website ↗</a>
        <button class="btn" type="button" data-logout>Logout</button>
      </div>
    </aside>
    <main class="main">
      <div class="topbar">
        <div>
          <p class="eyebrow">Meflay Studio CMS</p>
          <h1 class="page-title">${title}</h1>
          ${subtitle ? `<p class="card desc" style="display:inline-block;margin-top:18px;padding:12px 16px;border-radius:999px;">${subtitle}</p>` : ''}
        </div>
        <div class="user-pill" data-user-pill>Loading...</div>
      </div>
      <div id="pageContent"></div>
    </main>
  `;
}

function mountShell(activePage, title, subtitle = '') {
  document.body.innerHTML = `<div class="admin-shell">${shell(activePage, title, subtitle)}</div>`;
}
