async function initDashboard() {
  mountShell('dashboard', 'Dashboard', 'Live CMS overview for projects, pages, media and admins.');
  await MeflayAdmin.init('dashboard');
  renderDashboardSkeleton();
  await loadDashboardData();
}

function renderDashboardSkeleton() {
  document.getElementById('pageContent').innerHTML = `
    <section class="grid four" id="metricsGrid">
      <article class="card metric glow"><span class="metric-label">Published Projects</span><strong class="metric-value" id="mPublished">—</strong><small>Visible on the website after data binding</small></article>
      <article class="card metric"><span class="metric-label">Draft Projects</span><strong class="metric-value" id="mDraft">—</strong><small>Saved but not public</small></article>
      <article class="card metric"><span class="metric-label">Pages</span><strong class="metric-value" id="mPages">—</strong><small>System and custom pages</small></article>
      <article class="card metric"><span class="metric-label">Media Items</span><strong class="metric-value" id="mMedia">—</strong><small>Library URLs and uploads</small></article>
    </section>

    <section class="grid two" style="margin-top:22px">
      <article class="card">
        <div class="card-title-row"><div><h2>Quick Actions</h2><p class="desc">Most used content operations.</p></div></div>
        <div class="quick-actions">
          <a class="btn primary" href="/admin/projects.html">Add or edit projects</a>
          <a class="btn" href="/admin/pages.html">Build page sections</a>
          <a class="btn" href="/admin/media.html">Upload / save media</a>
          <a class="btn" href="/admin/settings.html">Update site settings</a>
        </div>
      </article>
      <article class="card">
        <div class="card-title-row"><div><h2>Content Health</h2><p class="desc">Quick editorial checks.</p></div></div>
        <div class="grid two" id="healthGrid"></div>
      </article>
    </section>

    <section class="grid two" style="margin-top:22px">
      <article class="card">
        <div class="card-title-row"><div><h2>Recent Projects</h2><p class="desc">Latest edited portfolio entries.</p></div><a class="btn small" href="/admin/projects.html">Manage</a></div>
        <div id="recentProjects"></div>
      </article>
      <article class="card">
        <div class="card-title-row"><div><h2>Recent Activity</h2><p class="desc">Changes made by admins.</p></div></div>
        <div id="recentActivity"></div>
      </article>
    </section>
  `;
}

async function loadDashboardData() {
  const [{ data: projects }, { data: pages }, { data: media }, { data: logs }] = await Promise.all([
    db.from('projects').select('*').order('updated_at', { ascending: false }),
    db.from('pages').select('*'),
    db.from('media_library').select('*'),
    db.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(6)
  ]);

  const projectRows = projects || [];
  document.getElementById('mPublished').textContent = projectRows.filter(p => p.status === 'published').length;
  document.getElementById('mDraft').textContent = projectRows.filter(p => p.status === 'draft').length;
  document.getElementById('mPages').textContent = (pages || []).length;
  document.getElementById('mMedia').textContent = (media || []).length;

  const missingCover = projectRows.filter(p => !p.cover_url).length;
  const missingOverview = projectRows.filter(p => !p.overview).length;
  document.getElementById('healthGrid').innerHTML = `
    <div class="mini-card" style="padding:18px"><span class="metric-label">Missing covers</span><div class="metric-value" style="font-size:48px">${missingCover}</div></div>
    <div class="mini-card" style="padding:18px"><span class="metric-label">Missing overview</span><div class="metric-value" style="font-size:48px">${missingOverview}</div></div>
    <div class="mini-card" style="padding:18px"><span class="metric-label">Featured home</span><div class="metric-value" style="font-size:48px">${projectRows.filter(p => p.is_featured).length}</div></div>
    <div class="mini-card" style="padding:18px"><span class="metric-label">Hidden</span><div class="metric-value" style="font-size:48px">${projectRows.filter(p => p.status === 'hidden').length}</div></div>
  `;

  document.getElementById('recentProjects').innerHTML = projectRows.slice(0, 6).map(p => `
    <div class="project-cell" style="padding:12px 0;border-bottom:1px solid var(--line)">
      <div class="thumb">${p.cover_url ? `<img src="${p.cover_url}" alt="">` : ''}</div>
      <div><div class="project-name">${p.title}</div><div class="project-slug">${p.status} · ${MeflayAdmin.formatDate(p.updated_at)}</div></div>
    </div>
  `).join('') || `<div class="empty">No projects yet.</div>`;

  document.getElementById('recentActivity').innerHTML = (logs || []).map(log => `
    <div style="padding:12px 0;border-bottom:1px solid var(--line)">
      <div class="project-name">${log.action}</div>
      <div class="project-slug">${log.entity_type || 'system'} · ${MeflayAdmin.formatDate(log.created_at)}</div>
    </div>
  `).join('') || `<div class="empty">No activity yet.</div>`;
}

document.addEventListener('DOMContentLoaded', initDashboard);
