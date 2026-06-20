
const db = window.meflaySupabase;
const $ = (s)=>document.querySelector(s);
function show(msg){const m=$('#loginMessage'); if(m) m.textContent=msg}
(async()=>{const {data:{session}}=await db.auth.getSession(); if(session) location.href='/admin/'})();
$('#loginForm').addEventListener('submit', async (e)=>{e.preventDefault(); show('Signing in...'); const email=$('#email').value.trim(); const password=$('#password').value; const {data,error}=await db.auth.signInWithPassword({email,password}); if(error){show(error.message); return} const {data:profile,error:profileError}=await db.from('admin_profiles').select('*').eq('id',data.user.id).single(); if(profileError||!profile||!profile.is_active){await db.auth.signOut(); show('This user is not an active admin.'); return} location.href='/admin/';});
