const SUPABASE_URL = 'https://huwmbgkxetltiwrsbqiw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vovJIq15lx62crTt9WuCNw_yzy0N7Y1';
const PDF_URL = 'assets/pdf/happypeople-magazine-july-2026.pdf';

const dict = {
  ru: {
    navInside:'Внутри', navMission:'Миссия', navDownload:'Скачать', navReviews:'Отзывы', moreInfo:'More information about Happy People',
    issue:'Выпуск 01 • Июль 2026', heroTitle:'Из невидимого<br>в видимое', heroLead:'Цифровое издание о <strong>вере</strong>, <strong>призвании</strong>, стиле и жизни с миссией.',
    readOnline:'Читать онлайн', downloadPdf:'Скачать PDF', readersLabel:'Читателей этого выпуска:', downloadsLabel:'Загрузок PDF:', scripture:'Мы верим, что у каждого человека есть конкретная миссия от Бога.',
    insideEyebrow:'Что внутри выпуска', insideTitle:'Идеи, которые помогают сделать следующий шаг', card1Title:'Слово редактора', card1Text:'Письмо от сердца о пути от мечты к реальности.', card2Title:'Christian Fashion', card2Text:'Стиль, который говорит о вере и ценностях.', card3Title:'Style With Purpose', card3Text:'Мужской и женский образ с миссией.', card4Title:'Практика месяца', card4Text:'5 шагов от идеи к реальности.', card5Title:'Молитва', card5Text:'Молитва и провозглашение веры.', card6Title:'10 мест из Библии', card6Text:'Стихи, которые укрепляют веру.',
    missionEyebrow:'Миссия HAPPYPEOPLE', missionTitle:'Ты создан не случайно. Ты создан для миссии.', missionText:'Мы верим, что у каждого человека есть <strong>конкретная миссия</strong> в жизни от Бога, и лишь исполняя её, человек становится по-настоящему счастливым.',
    downloadEyebrow:'Первый выпуск уже доступен', downloadTitle:'Открой выпуск онлайн или скачай PDF', downloadText:'Сайт доступен на русском и английском, а сам выпуск открывается как оригинальный русский PDF.',
    reviewsEyebrow:'Отзывы читателей', reviewsTitle:'Что говорят люди', reviewsText:'Оставь свой отзыв. Он появится на сайте после проверки.', noReviewsYet:'Здесь скоро появятся первые отзывы читателей.', leaveReviewEyebrow:'Оставить отзыв', leaveReviewTitle:'Поделись, как этот выпуск вдохновил тебя', reviewName:'Имя', reviewLocation:'Город / страна', reviewMessage:'Ваш отзыв', sendReview:'Отправить отзыв', reviewNote:'Отзывы публикуются после проверки.', reviewSuccess:'Спасибо! Твой отзыв отправлен и появится после проверки.', reviewError:'Не получилось отправить отзыв. Попробуй ещё раз.', sending:'Отправляем отзыв...',
    nextEyebrow:'Следующий выпуск • Август 2026', nextTitle:'А что, если ты рождён не просто жить?', nextText:'В следующем выпуске мы поговорим о предназначении, миссии и причине, по которой Бог привёл тебя в этот мир.'
  },
  en: {
    navInside:'Inside', navMission:'Mission', navDownload:'Download', navReviews:'Reviews', moreInfo:'More information about Happy People',
    issue:'Issue 01 • July 2026', heroTitle:'From invisible<br>to visible', heroLead:'A digital edition about <strong>faith</strong>, <strong>calling</strong>, style and life with mission.',
    readOnline:'Read online', downloadPdf:'Download PDF', readersLabel:'Readers of this issue:', downloadsLabel:'PDF downloads:', scripture:'We believe every person has a specific mission from God.',
    insideEyebrow:'Inside this issue', insideTitle:'Ideas that help you take the next step', card1Title:'Editor’s Letter', card1Text:'A heartfelt letter about the journey from dream to reality.', card2Title:'Christian Fashion', card2Text:'Style that speaks about faith and values.', card3Title:'Style With Purpose', card3Text:'Men’s and women’s looks with mission.', card4Title:'Monthly Practice', card4Text:'5 steps from idea to reality.', card5Title:'Prayer', card5Text:'Prayer and declaration of faith.', card6Title:'10 Bible Verses', card6Text:'Scriptures that strengthen faith.',
    missionEyebrow:'HAPPYPEOPLE Mission', missionTitle:'You were not created by accident. You were created for mission.', missionText:'We believe every person has a <strong>specific mission</strong> from God, and only by fulfilling it does a person become truly happy.',
    downloadEyebrow:'The first issue is available now', downloadTitle:'Open the issue online or download PDF', downloadText:'The website is bilingual, and the issue opens as the original Russian PDF.',
    reviewsEyebrow:'Reader reviews', reviewsTitle:'What people say', reviewsText:'Leave your review. It will appear on the site after approval.', noReviewsYet:'The first reader reviews will appear here soon.', leaveReviewEyebrow:'Leave a review', leaveReviewTitle:'Share how this issue inspired you', reviewName:'Name', reviewLocation:'City / country', reviewMessage:'Your review', sendReview:'Send review', reviewNote:'Reviews are published after approval.', reviewSuccess:'Thank you! Your review has been sent and will appear after approval.', reviewError:'Could not send the review. Please try again.', sending:'Sending review...',
    nextEyebrow:'Next issue • August 2026', nextTitle:'What if you were born not just to live?', nextText:'In the next issue, we will talk about purpose, mission, and the reason God brought you into this world.'
  }
};

let lang = localStorage.getItem('hpLang') || 'ru';
const langBtn = document.querySelector('.lang-switch');
function applyLang(next){
  lang = next;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[lang][key]) el.innerHTML = dict[lang][key];
  });
  if (langBtn) langBtn.querySelectorAll('span').forEach(s => s.classList.toggle('active', s.textContent.toLowerCase() === lang));
  document.querySelectorAll('[data-placeholder-ru]').forEach(el => { el.placeholder = el.getAttribute(lang === 'ru' ? 'data-placeholder-ru' : 'data-placeholder-en') || el.placeholder; });
  localStorage.setItem('hpLang', lang);
}
if (langBtn) langBtn.addEventListener('click', () => applyLang(lang === 'ru' ? 'en' : 'ru'));
applyLang(lang);

document.querySelectorAll('.js-read-btn,.js-download-btn').forEach(a => a.href = PDF_URL);

const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type':'application/json', Prefer:'return=representation' };
const readEls = [...document.querySelectorAll('.js-read-count')];
const downEls = [...document.querySelectorAll('.js-download-count')];
let stats = { reads: 0, downloads: 0 };
function showStats(s){
  stats = { reads: Number(s.reads)||0, downloads: Number(s.downloads)||0 };
  readEls.forEach(el => el.textContent = stats.reads.toLocaleString());
  downEls.forEach(el => el.textContent = stats.downloads.toLocaleString());
}
async function loadStats(){
  try{
    const r = await fetch(`${SUPABASE_URL}/rest/v1/stats?id=eq.1&select=reads,downloads`, { headers });
    if(!r.ok) throw new Error(await r.text());
    const d = await r.json();
    if(d && d[0]) showStats(d[0]);
  }catch(e){ console.warn('stats load', e); }
}
async function inc(field){
  const next = { ...stats, [field]: (Number(stats[field])||0) + 1 };
  showStats(next);
  try{
    const r = await fetch(`${SUPABASE_URL}/rest/v1/stats?id=eq.1`, { method:'PATCH', headers, body: JSON.stringify({ [field]: next[field] }) });
    if(!r.ok) throw new Error(await r.text());
    const d = await r.json();
    if(d && d[0]) showStats(d[0]);
  }catch(e){ console.warn('stats update', e); }
}
document.querySelectorAll('.js-read-btn').forEach(a => a.addEventListener('click', () => inc('reads')));
document.querySelectorAll('.js-download-btn').forEach(a => a.addEventListener('click', () => inc('downloads')));
loadStats();

const reviewsList = document.querySelector('.js-reviews-list');
const reviewForm = document.querySelector('.js-review-form');
const reviewStatus = document.querySelector('.js-review-status');
function esc(v){ return String(v||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
function renderReviews(items){
  if(!reviewsList) return;
  if(!items || !items.length){
    reviewsList.innerHTML = `<article class="review-card"><div class="stars">★★★★★</div><p>${dict[lang].noReviewsYet}</p><span>HAPPYPEOPLE</span></article>`;
    return;
  }
  reviewsList.innerHTML = items.map(item => `<article class="review-card"><div class="stars">★★★★★</div><p>“${esc(item.message)}”</p><span>${esc(item.name)}${item.location ? ' • ' + esc(item.location) : ''}</span></article>`).join('');
}
async function loadReviews(){
  if(!reviewsList) return;
  try{
    const r = await fetch(`${SUPABASE_URL}/rest/v1/reviews?approved=eq.true&select=id,name,location,message,created_at&order=created_at.desc&limit=6`, { headers });
    if(!r.ok) throw new Error(await r.text());
    renderReviews(await r.json());
  }catch(e){ console.warn('reviews load', e); }
}
if(reviewForm){
  reviewForm.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(reviewForm);
    const payload = { name:String(fd.get('name')||'').trim(), location:String(fd.get('location')||'').trim(), message:String(fd.get('message')||'').trim(), approved:false };
    if(!payload.name || !payload.location || !payload.message) return;
    reviewStatus.className = 'form-note';
    reviewStatus.textContent = dict[lang].sending;
    try{
      const r = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, { method:'POST', headers:{...headers, Prefer:'return=minimal'}, body: JSON.stringify(payload) });
      if(!r.ok) throw new Error(await r.text());
      reviewForm.reset();
      reviewStatus.className = 'form-note success';
      reviewStatus.textContent = dict[lang].reviewSuccess;
    }catch(err){
      console.warn('review submit', err);
      reviewStatus.className = 'form-note error';
      reviewStatus.textContent = dict[lang].reviewError;
    }
  });
}
loadReviews();
