const adminsState = { admins: [] };

async function initAdmins() {
  mountShell('admins', 'Admins', 'Invite existing Supabase Auth users and control dashboard roles.');
  await MeflayAdmin.init('admins');
  renderAdminsPage();
  await loadAdmins();
}

function renderAdminsPage() {
  document.getElementById('pageContent').innerHTML = `
    <section class="card glow">
      <div class="card-title-row"><div><h2>Role Manager</h2><p class="desc">Create the user first in Supabase Auth → Users, then assign role here.</p></div></div>
      <form class="form-grid" id="adminRoleForm" style="align-items:end">
        <label class="full">Email<input class="input" name="email" placeholder="admin@email.com" required /></label>
        <label>Role<select class="select" name="role"><option value="editor">Editor</option><option value="admin">Admin</option><option value="super_admin">Super Admin</option></select></label>
        <label><span class="inline-row"><input type="checkbox" name="is_active" checked /> Active</span></label>
        <button class="btn primary" type="submit">Save role</button>
      </form>
      <div class="notice" style="margin:22px 0">Only <b>super_admin</b> can assign roles. This uses the SQL function <span class="kbd">set_admin_role</span>.</div>
      <div class="table-wrap"><table><thead><tr><th>Email</th><th>Name</th><th>Role</th><th>Active</th><th>Created</th></tr></thead><tbody id="adminsTable"></tbody></table></div>
    </section>
  `;
  document.getElementById('adminRoleForm').addEventListener('submit', saveAdminRole);
}

async function loadAdmins() {
  const { data, error } = await db.from('admin_profiles').select('*').order('created_at', { ascending: false });
  if (error) return MeflayAdmin.error(error.message);
  adminsState.admins = data || [];
  renderAdminsTable();
}

function renderAdminsTable() {
  const tbody = document.getElementById('adminsTable');
  if (!adminsState.admins.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty">No admins yet.</div></td></tr>`;
    return;
  }
  tbody.innerHTML = adminsState.admins.map(admin => `
    <tr>
      <td>${admin.email}</td>
      <td>${admin.full_name || '—'}</td>
      <td><span class="badge ${admin.role === 'super_admin' ? 'published' : ''}">${admin.role}</span></td>
      <td>${admin.is_active ? 'Yes' : 'No'}</td>
      <td>${MeflayAdmin.formatDate(admin.created_at)}</td>
    </tr>
  `).join('');
}

async function saveAdminRole(event) {
  event.preventDefault();
  const form = event.target;
  const button = form.querySelector('[type="submit"]');
  MeflayAdmin.setLoading(button, true);
  const { error } = await db.rpc('set_admin_role', {
    target_email: form.email.value.trim(),
    target_role: form.role.value,
    target_active: form.is_active.checked
  });
  if (error) { MeflayAdmin.setLoading(button, false); return MeflayAdmin.error(error.message); }
  await MeflayAdmin.log('set_admin_role', 'admin_profiles', null, { email: form.email.value.trim(), role: form.role.value });
  MeflayAdmin.toast('Admin role saved');
  form.reset();
  form.is_active.checked = true;
  MeflayAdmin.setLoading(button, false);
  await loadAdmins();
}

document.addEventListener('DOMContentLoaded', initAdmins);
