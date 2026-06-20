
let media=[];
async function loadMedia(){await requireAuth(); const {data,error}=await db.from('media_library').select('*').order('created_at',{ascending:false}); if(error){toast(error.message);return} media=data||[]; renderMedia()}
function renderMedia(){const grid=$('#mediaGrid'); grid.innerHTML=media.map(m=>`<article class="media-card"><div class="media-preview">${m.file_type==='image'?`<img src="${escapeHtml(m.file_url)}" alt="">`:'<span>File</span>'}</div><div class="media-info"><h3>${escapeHtml(m.file_name||m.file_type)}</h3><p>${escapeHtml(m.file_url)}</p><div class="row-actions" style="margin-top:10px"><button class="ghost-btn" onclick="editMedia('${m.id}')">Edit</button></div></div></article>`).join('')||'<p>No media yet.</p>'}
function fillMedia(m={}){$('#mediaId').value=m.id||'';$('#mediaUrl').value=m.file_url||'';$('#mediaName').value=m.file_name||'';$('#mediaType').value=m.file_type||'image';$('#mediaAlt').value=m.alt||'';$('#mediaUsedIn').value=m.used_in||''}
window.editMedia=id=>{fillMedia(media.find(x=>x.id===id)); openModal('#mediaModal')}
$('#newMediaBtn').addEventListener('click',()=>{fillMedia({}); openModal('#mediaModal')})
$('#mediaForm').addEventListener('submit',async e=>{e.preventDefault(); const id=$('#mediaId').value; const payload={file_url:$('#mediaUrl').value.trim(),file_name:$('#mediaName').value.trim(),file_type:$('#mediaType').value,alt:$('#mediaAlt').value.trim(),used_in:$('#mediaUsedIn').value.trim()}; const result=id?await db.from('media_library').update(payload).eq('id',id):await db.from('media_library').insert(payload); if(result.error){toast(result.error.message);return} closeModals(); toast('Media saved'); loadMedia()})
loadMedia();
