const db = window.MEFLAY_SUPABASE;

async function initLogin() {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('loginMessage');

  const { data: { session } } = await db.auth.getSession();
  if (session) {
    window.location.href = '/admin/index.html';
    return;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('error') === 'not-admin') {
    message.textContent = 'This account is not an active admin.';
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    message.textContent = 'Signing in...';

    const email = form.email.value.trim();
    const password = form.password.value;

    const { error } = await db.auth.signInWithPassword({ email, password });

    if (error) {
      message.textContent = error.message;
      return;
    }

    window.location.href = '/admin/index.html';
  });
}

document.addEventListener('DOMContentLoaded', initLogin);
