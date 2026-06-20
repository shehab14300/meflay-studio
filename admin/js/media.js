const mediaState = { items: [] };

async function initMedia() {
  mountShell('media', 'Media', 'Upload files, save external URLs and reuse assets across projects and pages.');
  await MeflayAdmin.init('media');
  renderMediaPage();
  MeflayAdmin.bindModalClose();
  await loadMedia();
}

function renderMediaPage() {
  document.getElementById('pageContent').innerHTML = `
    <section class="card glow">
      <div class="card-title-row">
        <div><h2>Media Library</h2><p class="desc">Use URL saving now, or upload directly to Supabase Storage bucket <span class="kbd">cms-media</span>.</p></div>
        <div class="actions"><button class="btn blue" id="uploadMedia">Upload file</button><button class="btn primary" id="addMediaUrl">Add media URL</button></div>
      </div>
      <div class="toolbar"><div class="searchbar"><input class="input" id="mediaSearch" placeholder="Search media name, used in, alt..." /></div></div>
      <div class="media-grid" id="mediaGrid"></div>
    </section>

    <div class="modal-backdrop" id="mediaModal">
      <div class="modal">
        <div class="modal-head"><h2 id="mediaModalTitle">Media item</h2><button class="btn icon" data-close-modal="mediaModal">×</button></div>
        <form id="mediaForm">
          <div class="modal-body">
            <div class="form-grid">
              <label class="full" id="fileUploadLabel" style="display:none">Upload file<input class="input" type="file" name="file" accept="image/*,video/*" /></label>
              <label class="full" id="urlLabel">File URL<input class="input" name="file_url" /></label>
              <label>File name<input class="input" name="file_name" /></label>
              <label>Type<select class="select" name="file_type"><option value="image">Image</option><option value="video">Video</option><option value="document">Document</option></select></label>
              <label>Alt text<input class="input" name="alt" /></label>
              <label>Used in<input class="input" name="used_in" placeholder="Home hero, Sayah project..." /></label>
            </div>
            <p class="help" style="margin-top:16px">Direct upload needs the upgrade SQL file to create the public bucket and storage policies.</p>
          </div>
          <div class="modal-foot"><button class="btn" type="button" data-close-modal="mediaModal">Cancel</button><button class="btn primary" type="submit">Save media</button></div>
        </form>
      </div>
    </div>
  `;
  document.getElementById('addMediaUrl').addEventListener('click', () => openMediaModal('url'));
  document.getElementById('uploadMedia').addEventListener('click', () => openMediaModal('upload'));
  document.getElementById('mediaForm').addEventListener('submit', saveMedia);
  document.getElementById('mediaSearch').addEventListener('input', renderMediaGrid);
  MeflayAdmin.bindModalClose();
}

async function loadMedia() {
  const { data, error } = await db.from('media_library').select('*').order('created_at', { ascending: false });
  if (error) return MeflayAdmin.error(error.message);
  mediaState.items = data || [];
  renderMediaGrid();
}

function renderMediaGrid() {
  const grid = document.getElementById('mediaGrid');
  const q = document.getElementById('mediaSearch')?.value?.toLowerCase() || '';
  const items = mediaState.items.filter(item => `${item.file_name || ''} ${item.file_url || ''} ${item.alt || ''} ${item.used_in || ''}`.toLowerCase().includes(q));
  if (!items.length) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1">No media yet.</div>`;
    return;
  }
  grid.innerHTML = items.map(item => `
    <article class="media-card">
      <div class="media-preview">${item.file_type === 'video' ? `<video src="${item.file_url}" muted></video>` : `<img src="${item.file_url}" alt="${item.alt || ''}" loading="lazy">`}</div>
      <div class="media-info">
        <b>${item.file_name || 'Untitled media'}</b>
        <p>${item.used_in || 'Not assigned'}</p>
        <div class="actions"><button class="btn small" data-copy="${item.file_url}">Copy URL</button><a class="btn small blue" href="${item.file_url}" target="_blank">Open</a></div>
      </div>
    </article>
  `).join('');
  grid.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    await navigator.clipboard.writeText(btn.dataset.copy);
    MeflayAdmin.toast('URL copied');
  }));
}

function openMediaModal(mode = 'url') {
  const form = document.getElementById('mediaForm');
  form.reset();
  form.dataset.mode = mode;
  document.getElementById('mediaModalTitle').textContent = mode === 'upload' ? 'Upload media' : 'Add media URL';
  document.getElementById('fileUploadLabel').style.display = mode === 'upload' ? 'grid' : 'none';
  document.getElementById('urlLabel').style.display = mode === 'upload' ? 'none' : 'grid';
  MeflayAdmin.openModal('mediaModal');
}

async function saveMedia(event) {
  event.preventDefault();
  const form = event.target;
  const button = form.querySelector('[type="submit"]');
  MeflayAdmin.setLoading(button, true);
  let fileUrl = form.file_url.value.trim();
  let fileName = form.file_name.value.trim();
  let fileType = form.file_type.value;

  if (form.dataset.mode === 'upload') {
    const file = form.file.files[0];
    if (!file) { MeflayAdmin.setLoading(button, false); return MeflayAdmin.error('Choose a file first'); }
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${MeflayAdmin.slugify(file.name.replace(`.${ext}`, ''))}.${ext}`;
    const { error: uploadError } = await db.storage.from('cms-media').upload(path, file, { upsert: false, cacheControl: '3600' });
    if (uploadError) { MeflayAdmin.setLoading(button, false); return MeflayAdmin.error(uploadError.message); }
    const { data } = db.storage.from('cms-media').getPublicUrl(path);
    fileUrl = data.publicUrl;
    fileName = fileName || file.name;
    fileType = file.type.startsWith('video') ? 'video' : 'image';
  }

  const payload = {
    file_url: fileUrl,
    file_name: fileName || fileUrl.split('/').pop(),
    file_type: fileType,
    alt: form.alt.value.trim(),
    used_in: form.used_in.value.trim(),
    uploaded_by: MeflayAdmin.user.id
  };

  const { error } = await db.from('media_library').insert(payload);
  if (error) { MeflayAdmin.setLoading(button, false); return MeflayAdmin.error(error.message); }
  await MeflayAdmin.log('save_media', 'media_library', null, { file_name: payload.file_name });
  MeflayAdmin.toast('Media saved');
  MeflayAdmin.closeModal('mediaModal');
  MeflayAdmin.setLoading(button, false);
  await loadMedia();
}

document.addEventListener('DOMContentLoaded', initMedia);
