const SUPABASE_URL='https://huwmbgkxetltiwrsbqiw.supabase.co';
const SUPABASE_KEY='sb_publishable_vovJIq15lx62crTt9WuCNw_yzy0N7Y1';
const headers={apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,'Content-Type':'application/json',Prefer:'return=representation'};
const list=document.querySelector('.js-admin-list');
function esc(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
async function load(){
  list.innerHTML='<p>Загрузка...</p>';
  const r=await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=*&order=created_at.desc`,{headers});
  const data=await r.json();
  if(!data.length){list.innerHTML='<p>Пока нет отзывов.</p>';return;}
  list.innerHTML=data.map(x=>`<article class="admin-card"><strong>${esc(x.name)} • ${esc(x.location||'')}</strong><p>${esc(x.message)}</p><p>approved: <b>${x.approved?'true':'false'}</b></p><div class="admin-actions"><button class="small-btn ok" onclick="approve(${x.id})">Одобрить</button><button class="small-btn del" onclick="removeReview(${x.id})">Удалить</button></div></article>`).join('');
}
async function approve(id){await fetch(`${SUPABASE_URL}/rest/v1/reviews?id=eq.${id}`,{method:'PATCH',headers,body:JSON.stringify({approved:true})});load();}
async function removeReview(id){if(!confirm('Удалить отзыв?'))return;await fetch(`${SUPABASE_URL}/rest/v1/reviews?id=eq.${id}`,{method:'DELETE',headers});load();}
load();
