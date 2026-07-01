const SUPABASE_URL = 'https://huwmbgkxetltiwrsbqiw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vovJIq15lx62crTt9WuCNw_yzy0N7Y1';
const apiHeaders={apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,'Content-Type':'application/json',Prefer:'return=representation'};
const list=document.querySelector('.js-admin-list');
function escapeHtml(value){return String(value||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));}
function render(items){
  if(!items.length){list.innerHTML='<div class="admin-card"><p>Отзывов пока нет.</p></div>';return;}
  list.innerHTML=items.map(item=>`<article class="admin-card">
    <p><strong>${escapeHtml(item.name)}</strong>${item.location?' • '+escapeHtml(item.location):''}</p>
    <p>${escapeHtml(item.message)}</p>
    <p>Статус: <strong>${item.approved?'одобрен':'ждёт проверки'}</strong></p>
    <div class="admin-actions">
      ${!item.approved?`<button type="button" data-action="approve" data-id="${item.id}">✅ Одобрить</button>`:''}
      <button type="button" data-action="delete" data-id="${item.id}">🗑 Удалить</button>
    </div>
  </article>`).join('');
}
async function loadReviews(){
  list.innerHTML='<div class="admin-card"><p>Загружаю...</p></div>';
  try{
    const res=await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=id,name,location,message,approved,created_at&order=created_at.desc`,{headers:apiHeaders});
    if(!res.ok) throw new Error(await res.text());
    render(await res.json());
  }catch(e){list.innerHTML='<div class="admin-card"><p>Ошибка загрузки. Проверь RLS/policies в Supabase.</p></div>';console.warn(e)}
}
async function approve(id){
  const res=await fetch(`${SUPABASE_URL}/rest/v1/reviews?id=eq.${id}`,{method:'PATCH',headers:apiHeaders,body:JSON.stringify({approved:true})});
  if(!res.ok) alert('Не получилось одобрить отзыв');
  loadReviews();
}
async function removeReview(id){
  if(!confirm('Удалить отзыв?')) return;
  const res=await fetch(`${SUPABASE_URL}/rest/v1/reviews?id=eq.${id}`,{method:'DELETE',headers:apiHeaders});
  if(!res.ok) alert('Не получилось удалить отзыв');
  loadReviews();
}
list.addEventListener('click',e=>{
  const btn=e.target.closest('button[data-action]');
  if(!btn) return;
  if(btn.dataset.action==='approve') approve(btn.dataset.id);
  if(btn.dataset.action==='delete') removeReview(btn.dataset.id);
});
document.querySelector('.js-load-admin').addEventListener('click',loadReviews);
loadReviews();
