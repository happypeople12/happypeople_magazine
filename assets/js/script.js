const SUPABASE_URL = 'https://huwmbgkxetltiwrsbqiw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vovJIq15lx62crTt9WuCNw_yzy0N7Y1';

const dict={
 ru:{navInside:'Внутри',navMission:'Миссия',navDownload:'Скачать',moreInfo:'More information about Happy People',issue:'Выпуск 01 • Июль 2026',heroTitle1:'Из невидимого',heroTitle2:'в видимое',heroLead:'Журнал о <strong>вере</strong>, <strong>призвании</strong>, стиле и жизни с миссией.',readOnline:'Читать онлайн',downloadPdf:'Скачать PDF',readersLabel:'Читателей этого выпуска:',downloadsLabel:'Загрузок PDF:',scripture:'Мы верим, что у каждого человека есть конкретная миссия от Бога.',insideEyebrow:'Что внутри выпуска',insideTitle:'6 разделов, которые вдохновляют идти вперёд',card1Title:'Слово редактора',card1Text:'Письмо от сердца о миссии журнала и теме первого выпуска.',card2Title:'Christian Fashion',card2Text:'Стиль, который отражает веру и внутреннюю красоту.',card3Title:'Style With Purpose',card3Text:'Образы с характером, смыслом и миссией.',card4Title:'Практика месяца',card4Text:'5 шагов от идеи к реальности.',card5Title:'Молитва',card5Text:'Молитва и провозглашение веры на месяц.',card6Title:'10 мест из Библии',card6Text:'Стихи, которые укрепляют и направляют.',missionEyebrow:'Миссия HAPPYPEOPLE',missionTitle:'Ты создан не случайно. Ты создан для миссии.',missionText:'Мы верим, что у каждого человека есть <strong>конкретная миссия</strong> в жизни от Бога, и лишь исполняя её, человек становится по-настоящему счастливым.',downloadEyebrow:'Первый выпуск уже доступен',downloadTitle:'Скачай журнал или читай онлайн',downloadText:'Открой выпуск прямо в браузере или сохрани PDF на устройство, чтобы вернуться к нему позже.',nextEyebrow:'Следующий выпуск • Август 2026',nextTitle:'А что, если ты рождён не просто жить?',nextText:'В следующем выпуске мы поговорим о предназначении, миссии и причине, по которой Бог привёл тебя в этот мир.'},
 en:{navInside:'Inside',navMission:'Mission',navDownload:'Download',moreInfo:'More information about Happy People',issue:'Issue 01 • July 2026',heroTitle1:'From invisible',heroTitle2:'to visible',heroLead:'A bilingual website for the first HAPPYPEOPLE issue. The magazine itself is available as the original Russian PDF about <strong>faith</strong>, <strong>calling</strong>, style and life with mission.',readOnline:'Read online',downloadPdf:'Download PDF',readersLabel:'Readers of this issue:',downloadsLabel:'PDF downloads:',scripture:'We believe every person has a specific mission from God.',insideEyebrow:'Inside this issue',insideTitle:'6 sections that inspire you to move forward',card1Title:'Editor’s Letter',card1Text:'A heartfelt letter about the mission of the magazine and the first issue theme.',card2Title:'Christian Fashion',card2Text:'Style that reflects faith and inner beauty.',card3Title:'Style With Purpose',card3Text:'Looks with character, meaning and mission.',card4Title:'Monthly Practice',card4Text:'5 steps from idea to reality.',card5Title:'Prayer',card5Text:'A prayer and faith declaration for the month.',card6Title:'10 Bible Verses',card6Text:'Scriptures that strengthen and guide.',missionEyebrow:'HAPPYPEOPLE Mission',missionTitle:'You were not created by accident. You were created for mission.',missionText:'We believe every person has a <strong>specific mission</strong> from God, and only by fulfilling it does a person become truly happy.',downloadEyebrow:'The first issue is available now',downloadTitle:'Download the magazine or read online',downloadText:'The website is available in English, and the magazine opens as the original Russian PDF. Read it online or save it to your device.',nextEyebrow:'Next issue • August 2026',nextTitle:'What if you were born not just to live?',nextText:'In the next issue, we will talk about purpose, mission, and the reason God brought you into this world.'}
};

const btn=document.querySelector('.lang-switch');
let lang=localStorage.getItem('hpLang')||'ru';
function applyLang(next){
  lang=next;
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(dict[lang][key]) el.innerHTML=dict[lang][key];});
  btn.querySelectorAll('span').forEach(s=>s.classList.toggle('active',s.textContent.toLowerCase()===lang));
  localStorage.setItem('hpLang',lang)
}
btn.addEventListener('click',()=>applyLang(lang==='ru'?'en':'ru'));
applyLang(lang);

const readCountEls=[...document.querySelectorAll('.js-read-count')];
const downloadCountEls=[...document.querySelectorAll('.js-download-count')];
const apiHeaders={
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type':'application/json',
  Prefer:'return=representation'
};
let currentStats={reads:0,downloads:0};
function renderStats(stats){
  currentStats={reads:Number(stats.reads)||0,downloads:Number(stats.downloads)||0};
  readCountEls.forEach(el=>el.textContent=currentStats.reads.toLocaleString());
  downloadCountEls.forEach(el=>el.textContent=currentStats.downloads.toLocaleString());
}
async function loadStats(){
  try{
    const res=await fetch(`${SUPABASE_URL}/rest/v1/stats?id=eq.1&select=reads,downloads`,{headers:apiHeaders});
    if(!res.ok) throw new Error(await res.text());
    const data=await res.json();
    if(Array.isArray(data)&&data[0]) renderStats(data[0]);
  }catch(e){console.warn('Stats load error',e)}
}
async function incrementStat(field){
  const optimistic={...currentStats,[field]:(Number(currentStats[field])||0)+1};
  renderStats(optimistic);
  try{
    const res=await fetch(`${SUPABASE_URL}/rest/v1/stats?id=eq.1`,{
      method:'PATCH',
      headers:apiHeaders,
      body:JSON.stringify({[field]:optimistic[field]})
    });
    if(!res.ok) throw new Error(await res.text());
    const data=await res.json();
    if(Array.isArray(data)&&data[0]) renderStats(data[0]);
  }catch(e){console.warn('Stats update error',e)}
}
document.querySelectorAll('.js-read-btn').forEach(el=>el.addEventListener('click',()=>incrementStat('reads')));
document.querySelectorAll('.js-download-btn').forEach(el=>el.addEventListener('click',()=>incrementStat('downloads')));
loadStats();
