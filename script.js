const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }));
const slides = ['The hook', 'Mapping the seafloor', 'What we have seen', 'Why cameras matter', 'The takeaway'];
const descriptions = ['Beyond the blue: ocean exploration carousel cover', 'Mapped is not explored: 28.7 percent of global seafloor mapped at modern high resolution as of April 2026', 'Less than 0.001 percent of the deep seafloor has been directly observed', 'A map is only the start: sonar reveals terrain, cameras reveal life', 'The next discovery is below: save this field guide'];
let slide = 0;
function showSlide(next) { slide = (next + slides.length) % slides.length; const file = `carousel-${String(slide + 1).padStart(2, '0')}`; document.querySelector('#carousel-image').src = file + '.webp'; document.querySelector('#carousel-image').alt = descriptions[slide]; document.querySelector('#carousel-art').href = file + '.png'; document.querySelectorAll('[data-slide]').forEach((button,i) => { if(i === slide) button.setAttribute('aria-current', 'true'); else button.removeAttribute('aria-current'); }); }
document.querySelector('#prev-slide').addEventListener('click', () => showSlide(slide - 1));
document.querySelector('#next-slide').addEventListener('click', () => showSlide(slide + 1));
document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => showSlide(Number(button.dataset.slide))));
document.querySelector('.carousel-controls').addEventListener('keydown', event => { if(event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); showSlide(slide + (event.key === 'ArrowRight' ? 1 : -1)); } });
const dialog = document.querySelector('#lightbox');
const enlarged = document.querySelector('#lightbox-image');
document.querySelectorAll('[data-lightbox]').forEach(link => link.addEventListener('click', event => { if(!dialog.showModal) return; event.preventDefault(); enlarged.src = link.href; enlarged.alt = link.querySelector('img')?.alt || 'Full-size design'; dialog.showModal(); document.body.classList.add('modal-open'); }));
document.querySelector('#close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); enlarged.removeAttribute('src'); });
document.querySelector('#copy-discord').addEventListener('click', async () => { const status = document.querySelector('#copy-status'); const label = document.querySelector('#discord-label'); const username = 'christianalmeida0053'; try { await navigator.clipboard.writeText(username); label.textContent = 'Copied!'; status.textContent = 'Discord username copied.'; } catch { const field = document.createElement('textarea'); field.value = username; field.style.position = 'fixed'; field.style.opacity = '0'; document.body.append(field); field.select(); const copied = document.execCommand('copy'); field.remove(); label.textContent = copied ? 'Copied!' : 'Try copying again'; status.textContent = copied ? 'Discord username copied.' : 'Unable to copy. Please try again.'; } });

// Each entry owns both images; one control selects the entire comparison.
const thumbnailStudies = [
  ['Digital choices','Digital choices: fictional presenter with cyan and red lighting, icon cards and a dashed connection'],
  ['The $100M goal','Fictional presenter, oversized $100M headline and a green progress bar'],
  ['Monthly revenue','Fictional presenter with open arms, red and blue studio lighting and $20,000/mo headline'],
  ['Pricing strategy','Fictional presenter with blue and red numbered circles, $10 and $10K pricing'],
  ['From $1K to $1M','Fictional presenter counting on his fingers, income labels and a rising dashed arrow'],
  ['Watch time','Split-color fictional presenter with illustrative 6.3 and 4.8K watch-time cards']
].map(([title,alt],i)=>{const stem='thumb-study-'+String(i+1).padStart(2,'0');return {title,after:stem+'-after.webp',before:stem+'-before.webp',afterFull:stem+'-after.png',beforeFull:stem+'-before.png',alt,beforeAlt:'Hypothetical source portrait of the same fictional model on white'};});
thumbnailStudies.push(
  {title:'We moved an asteroid',after:'thumbnail-01.webp',before:'source-dimorphos.webp',afterFull:'thumbnail-01.png',beforeFull:'source-dimorphos.webp',alt:'YouTube thumbnail: We moved an asteroid, 33 minutes shorter, with Dimorphos',beforeAlt:'Original NASA DART close-up of asteroid Dimorphos before impact',note:'Design study. Before: NASA / Johns Hopkins APL source image.'},
  {title:'Hubble meets Webb',after:'thumbnail-02.webp',before:'source-pillars-comparison.webp',afterFull:'thumbnail-02.png',beforeFull:'source-pillars-comparison.webp',alt:'YouTube thumbnail contrasting Hubble and Webb views of the Pillars of Creation',beforeAlt:'Original NASA comparison: Hubble visible light and Webb near-infrared Pillars of Creation',note:'Design study. Before: NASA, ESA, CSA and STScI source images.'}
);
let thumbnailIndex=0, thumbnailRequest=0;
const thumbnailStatus=document.querySelector('#thumbnail-status');
const preloadThumbnail=src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=src;});
async function showThumbnail(next){
  thumbnailIndex=(next+thumbnailStudies.length)%thumbnailStudies.length;
  const selected=thumbnailIndex, version=++thumbnailRequest, item=thumbnailStudies[selected];
  thumbnailStatus.textContent='Loading thumbnail '+(selected+1)+'.';
  try{await Promise.all([preloadThumbnail(item.after),preloadThumbnail(item.before)]);}catch{if(version===thumbnailRequest)thumbnailStatus.textContent='The images could not load. Please try this thumbnail again.';return;}
  if(version!==thumbnailRequest)return;
  const after=document.querySelector('#thumbnail-after'),before=document.querySelector('#thumbnail-before');
  after.src=item.after;after.alt=item.alt;before.src=item.before;before.alt=item.beforeAlt;
  document.querySelector('#thumbnail-after-art').href=item.afterFull;
  document.querySelector('#thumbnail-before-art').href=item.beforeFull;
  document.querySelector('#thumbnail-before-art').classList.toggle('source',selected>=6);
  document.querySelector('#thumbnail-comparison').setAttribute('aria-label','Thumbnail '+(selected+1)+': '+item.title+', after and before');
  document.querySelectorAll('[data-thumbnail]').forEach((button,i)=>{if(i===selected)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');});
  thumbnailStatus.textContent='Thumbnail '+(selected+1)+' of 8: '+item.title+'. Both before and after are displayed.';
}
document.querySelectorAll('[data-thumbnail]').forEach(button=>button.addEventListener('click',()=>showThumbnail(Number(button.dataset.thumbnail))));
document.querySelector('#prev-thumbnail').addEventListener('click',()=>showThumbnail(thumbnailIndex-1));
document.querySelector('#next-thumbnail').addEventListener('click',()=>showThumbnail(thumbnailIndex+1));
document.querySelector('.thumbnail-controls').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();showThumbnail(thumbnailIndex+(event.key==='ArrowRight'?1:-1));}});

// Category controls expose one portfolio section at a time.
const categoryButtons=[...document.querySelectorAll('[data-category]')];
const categoryNames=categoryButtons.map(button=>button.dataset.category);
function showCategory(id,focus=false){
  if(!categoryNames.includes(id))return;
  categoryButtons.forEach(button=>{const active=button.dataset.category===id;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;if(active&&focus)button.focus();});
  categoryNames.forEach(name=>{document.getElementById(name).hidden=name!==id;});
}
categoryButtons.forEach(button=>button.addEventListener('click',()=>{showCategory(button.dataset.category);history.replaceState(null,'','#'+button.dataset.category);}));
document.querySelector('.portfolio-tabs').addEventListener('keydown',event=>{
  const current=categoryButtons.indexOf(document.activeElement);if(current<0)return;
  let next=current;
  if(event.key==='ArrowRight')next=(current+1)%categoryNames.length;
  else if(event.key==='ArrowLeft')next=(current+categoryNames.length-1)%categoryNames.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=categoryNames.length-1;
  else return;
  event.preventDefault();showCategory(categoryNames[next],true);history.replaceState(null,'','#'+categoryNames[next]);
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',event=>{
  const id=link.hash.slice(1);if(!categoryNames.includes(id))return;
  event.preventDefault();showCategory(id);history.pushState(null,'','#'+id);document.getElementById('work').scrollIntoView({block:'start'});
}));
function categoryFromHash(){const id=location.hash.slice(1);if(categoryNames.includes(id))showCategory(id);}
window.addEventListener('hashchange',categoryFromHash);categoryFromHash();
let postIndex=0;
const postPairs=[...document.querySelectorAll('[data-post-pair]')];
function showPost(next){
  postIndex=(next+postPairs.length)%postPairs.length;
  postPairs.forEach((pair,i)=>{pair.hidden=i!==postIndex;});
  document.querySelectorAll('[data-post]').forEach((button,i)=>{if(i===postIndex)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');});
  document.querySelector('#post-status').textContent='Post '+(postIndex+1)+' of '+postPairs.length+'. Both before and after are displayed.';
}
document.querySelectorAll('[data-post]').forEach(button=>button.addEventListener('click',()=>showPost(Number(button.dataset.post))));
document.querySelector('#prev-post').addEventListener('click',()=>showPost(postIndex-1));
document.querySelector('#next-post').addEventListener('click',()=>showPost(postIndex+1));
document.querySelector('.post-controls').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();showPost(postIndex+(event.key==='ArrowRight'?1:-1));}});
