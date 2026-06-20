const settingsState = { settings: {} };

async function initSettings() {
  mountShell('settings', 'Settings', 'Edit global website identity, navigation and footer without raw code.');
  await MeflayAdmin.init('settings');
  renderSettingsPage();
  await loadSettings();
}

function renderSettingsPage() {
  document.getElementById('pageContent').innerHTML = `
    <form class="grid" id="settingsForm">
      <section class="card glow">
        <div class="card-title-row"><div><h2>General</h2><p class="desc">Brand basics and contact details.</p></div></div>
        <div class="form-grid">
          <label>Site name<input class="input" name="site_name" /></label>
          <label>Tagline<input class="input" name="tagline" /></label>
          <label>Email<input class="input" name="email" /></label>
          <label>Phone<input class="input" name="phone" /></label>
          <label class="full">Location<input class="input" name="location" /></label>
        </div>
      </section>

      <section class="card">
        <div class="card-title-row"><div><h2>Navigation</h2><p class="desc">Reorder or update header links.</p></div><button class="btn blue" type="button" id="addNavItem">Add item</button></div>
        <div class="section-builder" id="navBuilder"></div>
      </section>

      <section class="card">
        <div class="card-title-row"><div><h2>Footer</h2><p class="desc">Focus lines and copyright.</p></div></div>
        <div class="form-grid">
          <label class="full">Focus items comma separated<input class="input" name="footer_focus" /></label>
          <label class="full">Copyright<input class="input" name="footer_copyright" /></label>
        </div>
      </section>

      <div class="actions" style="justify-content:flex-end"><button class="btn primary" type="submit">Save all settings</button></div>
    </form>
  `;
  document.getElementById('settingsForm').addEventListener('submit', saveSettings);
  document.getElementById('addNavItem').addEventListener('click', () => addNavItem({ label: 'New.', url: '/', visible: true }));
}

async function loadSettings() {
  const { data, error } = await db.from('site_settings').select('*');
  if (error) return MeflayAdmin.error(error.message);
  settingsState.settings = Object.fromEntries((data || []).map(row => [row.setting_key, row.setting_value]));
  fillSettings();
}

function fillSettings() {
  const form = document.getElementById('settingsForm');
  const general = settingsState.settings.general || {};
  form.site_name.value = general.site_name || '';
  form.tagline.value = general.tagline || '';
  form.email.value = general.email || '';
  form.phone.value = general.phone || '';
  form.location.value = general.location || '';

  const footer = settingsState.settings.footer || {};
  form.footer_focus.value = (footer.focus || []).join(', ');
  form.footer_copyright.value = footer.copyright || '';

  const nav = settingsState.settings.navigation?.items || [];
  document.getElementById('navBuilder').innerHTML = '';
  nav.forEach(addNavItem);
}

function addNavItem(item = {}) {
  const wrap = document.getElementById('navBuilder');
  wrap.insertAdjacentHTML('beforeend', `
    <div class="section-card" data-nav-card>
      <div class="section-card-head"><strong>Navigation item</strong><button class="btn small red" type="button" data-remove-nav>Remove</button></div>
      <div class="form-grid">
        <label>Label<input class="input" name="nav_label" value="${escapeHtml(item.label || '')}" /></label>
        <label>URL<input class="input" name="nav_url" value="${escapeHtml(item.url || '')}" /></label>
        <label><span class="inline-row"><input type="checkbox" name="nav_visible" ${item.visible !== false ? 'checked' : ''}> Visible</span></label>
      </div>
    </div>
  `);
  wrap.lastElementChild.querySelector('[data-remove-nav]').addEventListener('click', event => event.target.closest('[data-nav-card]').remove());
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, match => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[match]));
}

function collectNav() {
  return Array.from(document.querySelectorAll('[data-nav-card]')).map(card => ({
    label: card.querySelector('[name="nav_label"]').value.trim(),
    url: card.querySelector('[name="nav_url"]').value.trim(),
    visible: card.querySelector('[name="nav_visible"]').checked
  })).filter(item => item.label && item.url);
}

async function upsertSetting(key, value) {
  return db.from('site_settings').upsert({ setting_key: key, setting_value: value }, { onConflict: 'setting_key' });
}

async function saveSettings(event) {
  event.preventDefault();
  const form = event.target;
  const button = form.querySelector('[type="submit"]');
  MeflayAdmin.setLoading(button, true);

  const general = {
    site_name: form.site_name.value.trim(),
    tagline: form.tagline.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    location: form.location.value.trim()
  };
  const navigation = { items: collectNav() };
  const footer = {
    focus: MeflayAdmin.parseList(form.footer_focus.value),
    copyright: form.footer_copyright.value.trim()
  };

  const results = await Promise.all([upsertSetting('general', general), upsertSetting('navigation', navigation), upsertSetting('footer', footer)]);
  const error = results.find(r => r.error)?.error;
  if (error) { MeflayAdmin.setLoading(button, false); return MeflayAdmin.error(error.message); }
  await MeflayAdmin.log('update_settings', 'site_settings', null, {});
  MeflayAdmin.toast('Settings saved');
  MeflayAdmin.setLoading(button, false);
  await loadSettings();
}

document.addEventListener('DOMContentLoaded', initSettings);
