
let settings=[];
async function loadSettings(){await requireAuth(); const {data,error}=await db.from('site_settings').select('*').order('setting_key'); if(error){toast(error.message);return} settings=data||[]; renderSettings()}
function renderSettings(){const wrap=$('#settingsForms'); wrap.innerHTML=settings.map(s=>`<article class="setting-card"><h3>${escapeHtml(s.setting_key)}</h3><textarea data-key="${escapeHtml(s.setting_key)}" rows="12">${escapeHtml(JSON.stringify(s.setting_value,null,2))}</textarea></article>`).join('')}
$('#saveSettingsBtn').addEventListener('click',async()=>{const areas=$$('#settingsForms textarea'); for(const area of areas){let value; try{value=JSON.parse(area.value)}catch(e){toast(`Invalid JSON in ${area.dataset.key}`);return} const {error}=await db.from('site_settings').update({setting_value:value}).eq('setting_key',area.dataset.key); if(error){toast(error.message);return}} toast('Settings saved')})
loadSettings();
