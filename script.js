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
