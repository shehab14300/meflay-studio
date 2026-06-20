
const db = window.meflaySupabase;
const $ = (s, scope=document) => scope.querySelector(s);
const $$ = (s, scope=document) => Array.from(scope.querySelectorAll(s));
function toast(message){const el=$('#toast'); if(!el) return; el.textContent=message; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),2600)}
function escapeHtml(str=''){return String(str).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[m]))}
function slugify(str=''){return String(str).toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
function csvToArray(str=''){return String(str).split(',').map(x=>x.trim()).filter(Boolean)}
function linesToArray(str=''){return String(str).split('\n').map(x=>x.trim()).filter(Boolean)}
function formatDate(d){return d?new Date(d).toLocaleString():''}
function openModal(id){$(id).classList.add('open');$(id).setAttribute('aria-hidden','false')}
function closeModals(){$$('.modal').forEach(m=>{m.classList.remove('open');m.setAttribute('aria-hidden','true')})}
document.addEventListener('click',e=>{if(e.target.matches('[data-close-modal]')||e.target.classList.contains('modal')) closeModals()})
async function requireAuth(){const {data:{session}}=await db.auth.getSession(); if(!session){location.href='/admin/login.html';return null} const {data:profile,error}=await db.from('admin_profiles').select('*').eq('id',session.user.id).single(); if(error||!profile||!profile.is_active){await db.auth.signOut(); location.href='/admin/login.html'; return null} const u=$('#adminUser'); if(u) u.textContent=`${profile.email} · ${profile.role}`; return {session,profile}}
document.addEventListener('click',async e=>{if(e.target.matches('[data-logout]')){await db.auth.signOut();location.href='/admin/login.html'}})
requireAuth();
