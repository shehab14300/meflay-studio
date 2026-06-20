const pagesState = { pages: [], editing: null, sections: [] };

async function initPages() {
  mountShell('pages', 'Pages', 'Create pages visually, arrange sections and publish content.');
  await MeflayAdmin.init('pages');
  renderPagesPage();
  MeflayAdmin.bindModalClose();
  await loadPages();
}

function renderPagesPage() {
  document.getElementById('pageContent').innerHTML = `
    <section class="card glow">
      <div class="card-title-row">
        <div><h2>Pages Builder</h2><p class="desc">No raw JSON needed. Add sections, order them and publish.</p></div>
        <button class="btn primary" id="newPage">New page</button>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Order</th><th>Page</th><th>Status</th><th>Sections</th><th>Updated</th><th></th></tr></thead><tbody id="pagesTable"></tbody></table></div>
    </section>

    <div class="modal-backdrop" id="pageModal">
      <div class="modal wide">
        <div class="modal-head"><h2 id="pageModalTitle">New page</h2><button class="btn icon" data-close-modal="pageModal">×</button></div>
        <form id="pageForm">
          <div class="modal-body">
            <div class="form-grid">
              <label>Title<input class="input" name="title" required /></label>
              <label>Slug<input class="input" name="slug" required /></label>
              <label>Status<select class="select" name="status"><option value="draft">Draft</option><option value="published">Published</option><option value="hidden">Hidden</option></select></label>
              <label>Sort order<input class="input" type="number" name="sort_order" value="0" /></label>
              <label>SEO Title<input class="input" name="seo_title" /></label>
              <label>SEO Description<input class="input" name="seo_description" /></label>
            </div>
            <hr style="border:0;border-top:1px solid var(--line);margin:26px 0">
            <div class="card-title-row"><div><h3>Sections</h3><p class="desc">Every card becomes a section on this page.</p></div><button type="button" class="btn blue" id="addSection">Add section</button></div>
            <div class="section-builder" id="sectionBuilder"></div>
          </div>
          <div class="modal-foot"><button class="btn" type="button" data-close-modal="pageModal">Cancel</button><button class="btn primary" type="submit">Save page</button></div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('newPage').addEventListener('click', () => openPageModal());
  document.getElementById('pageForm').addEventListener('submit', savePage);
  document.getElementById('addSection').addEventListener('click', () => addSectionCard());
  document.querySelector('[name="title"]').addEventListener('input', event => {
    const slug = document.querySelector('[name="slug"]');
    if (!pagesState.editing && !slug.value) slug.value = MeflayAdmin.slugify(event.target.value);
  });
  MeflayAdmin.bindModalClose();
}

async function loadPages() {
  const { data, error } = await db.from('pages').select('*, page_sections(*)').order('sort_order', { ascending: true });
  if (error) return MeflayAdmin.error(error.message);
  pagesState.pages = data || [];
  renderPagesTable();
}

function renderPagesTable() {
  const tbody = document.getElementById('pagesTable');
  if (!pagesState.pages.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty">No pages yet.</div></td></tr>`;
    return;
  }
  tbody.innerHTML = pagesState.pages.map(page => `
    <tr>
      <td>${page.sort_order || 0}</td>
      <td><div class="project-name">${page.title}</div><div class="project-slug">/${page.slug}</div></td>
      <td><span class="badge ${page.status}">${page.status}</span></td>
      <td>${(page.page_sections || []).length}</td>
      <td>${MeflayAdmin.formatDate(page.updated_at)}</td>
      <td><div class="actions"><button class="btn small" data-edit-page="${page.id}">Edit</button><button class="btn small red" data-toggle-page="${page.id}">${page.status === 'hidden' ? 'Publish' : 'Hide'}</button></div></td>
    </tr>
  `).join('');
  tbody.querySelectorAll('[data-edit-page]').forEach(btn => btn.addEventListener('click', () => openPageModal(btn.dataset.editPage)));
  tbody.querySelectorAll('[data-toggle-page]').forEach(btn => btn.addEventListener('click', () => togglePage(btn.dataset.togglePage)));
}

function sectionTemplate(section = {}) {
  const id = `section_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const content = section.content || {};
  return `
    <div class="section-card" data-section-card>
      <div class="section-card-head">
        <strong>Section</strong>
        <div class="actions"><button type="button" class="btn small" data-section-up>↑</button><button type="button" class="btn small" data-section-down>↓</button><button type="button" class="btn small red" data-section-remove>Remove</button></div>
      </div>
      <div class="form-grid">
        <label>Type<select class="select" name="section_type"><option value="hero">Hero</option><option value="text">Text</option><option value="work">Work Grid</option><option value="services">Services</option><option value="cta">CTA</option><option value="custom">Custom</option></select></label>
        <label>Sort<input class="input" type="number" name="sort_order" value="${section.sort_order || 1}" /></label>
        <label>Title<input class="input" name="title" value="${escapeHtml(section.title || '')}" /></label>
        <label>Subtitle<input class="input" name="subtitle" value="${escapeHtml(section.subtitle || '')}" /></label>
        <label class="full">Body<textarea class="textarea" name="body">${escapeHtml(content.body || '')}</textarea></label>
        <label>Image URL<input class="input" name="image_url" value="${escapeHtml(content.image_url || '')}" /></label>
        <label>Button label<input class="input" name="button_label" value="${escapeHtml(content.button_label || '')}" /></label>
        <label>Button URL<input class="input" name="button_url" value="${escapeHtml(content.button_url || '')}" /></label>
        <label>Items comma separated<input class="input" name="items" value="${escapeHtml((content.items || []).join ? content.items.join(', ') : '')}" /></label>
        <label><span class="inline-row"><input type="checkbox" name="is_visible" ${section.is_visible !== false ? 'checked' : ''}> Visible</span></label>
      </div>
    </div>
  `;
}

function addSectionCard(section = null) {
  const wrap = document.getElementById('sectionBuilder');
  wrap.insertAdjacentHTML('beforeend', sectionTemplate(section || { section_type: 'text', title: 'New section', is_visible: true, sort_order: wrap.children.length + 1, content: {} }));
  const card = wrap.lastElementChild;
  if (section?.section_type) card.querySelector('[name="section_type"]').value = section.section_type;
  bindSectionCard(card);
}

function bindSectionCard(card) {
  card.querySelector('[data-section-remove]').addEventListener('click', () => card.remove());
  card.querySelector('[data-section-up]').addEventListener('click', () => card.previousElementSibling && card.parentNode.insertBefore(card, card.previousElementSibling));
  card.querySelector('[data-section-down]').addEventListener('click', () => card.nextElementSibling && card.parentNode.insertBefore(card.nextElementSibling, card));
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, match => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[match]));
}

function collectSections() {
  return Array.from(document.querySelectorAll('[data-section-card]')).map((card, index) => ({
    section_type: card.querySelector('[name="section_type"]').value,
    title: card.querySelector('[name="title"]').value.trim(),
    subtitle: card.querySelector('[name="subtitle"]').value.trim(),
    sort_order: Number(card.querySelector('[name="sort_order"]').value || index + 1),
    is_visible: card.querySelector('[name="is_visible"]').checked,
    content: {
      body: card.querySelector('[name="body"]').value.trim(),
      image_url: card.querySelector('[name="image_url"]').value.trim(),
      button_label: card.querySelector('[name="button_label"]').value.trim(),
      button_url: card.querySelector('[name="button_url"]').value.trim(),
      items: MeflayAdmin.parseList(card.querySelector('[name="items"]').value)
    }
  }));
}

function openPageModal(id = null) {
  pagesState.editing = id ? pagesState.pages.find(p => p.id === id) : null;
  const form = document.getElementById('pageForm');
  form.reset();
  document.getElementById('pageModalTitle').textContent = pagesState.editing ? 'Edit page' : 'New page';
  document.getElementById('sectionBuilder').innerHTML = '';
  const page = pagesState.editing;
  if (page) {
    ['title','slug','status','sort_order','seo_title','seo_description'].forEach(name => { if (form[name]) form[name].value = page[name] || ''; });
    (page.page_sections || []).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0)).forEach(addSectionCard);
  } else {
    form.status.value = 'draft';
    form.sort_order.value = pagesState.pages.length + 1;
    addSectionCard({ section_type: 'hero', title: 'Hero Title', subtitle: 'Subtitle', is_visible: true, sort_order: 1, content: { body: '', button_label: 'Contact', button_url: '#contact' } });
  }
  MeflayAdmin.openModal('pageModal');
}

async function savePage(event) {
  event.preventDefault();
  const form = event.target;
  const button = form.querySelector('[type="submit"]');
  MeflayAdmin.setLoading(button, true);
  const payload = {
    title: form.title.value.trim(),
    slug: MeflayAdmin.slugify(form.slug.value || form.title.value),
    status: form.status.value,
    sort_order: Number(form.sort_order.value || 0),
    seo_title: form.seo_title.value.trim(),
    seo_description: form.seo_description.value.trim(),
    updated_by: MeflayAdmin.user.id
  };
  let result;
  if (pagesState.editing) result = await db.from('pages').update(payload).eq('id', pagesState.editing.id).select().single();
  else result = await db.from('pages').insert({ ...payload, created_by: MeflayAdmin.user.id }).select().single();
  if (result.error) { MeflayAdmin.setLoading(button, false); return MeflayAdmin.error(result.error.message); }

  const pageId = result.data.id;
  await db.from('page_sections').delete().eq('page_id', pageId);
  const sections = collectSections().map(section => ({ ...section, page_id: pageId }));
  if (sections.length) {
    const { error } = await db.from('page_sections').insert(sections);
    if (error) MeflayAdmin.error(error.message);
  }
  await MeflayAdmin.log(pagesState.editing ? 'update_page' : 'create_page', 'pages', pageId, { slug: payload.slug });
  MeflayAdmin.toast('Page saved');
  MeflayAdmin.closeModal('pageModal');
  MeflayAdmin.setLoading(button, false);
  await loadPages();
}

async function togglePage(id) {
  const page = pagesState.pages.find(p => p.id === id);
  const status = page.status === 'hidden' ? 'published' : 'hidden';
  const { error } = await db.from('pages').update({ status }).eq('id', id);
  if (error) return MeflayAdmin.error(error.message);
  MeflayAdmin.toast('Page updated');
  await loadPages();
}

document.addEventListener('DOMContentLoaded', initPages);
