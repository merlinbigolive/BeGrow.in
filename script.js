const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});

document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counters=document.querySelectorAll('[data-count]');
const countObserver=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   const el=entry.target, target=Number(el.dataset.count), start=performance.now();
   function tick(now){
     const p=Math.min((now-start)/1000,1), eased=1-Math.pow(1-p,3);
     el.textContent=Math.round(target*eased);
     if(p<1)requestAnimationFrame(tick);
   }
   requestAnimationFrame(tick);
   countObserver.unobserve(el);
 });
},{threshold:.8});
counters.forEach(el=>countObserver.observe(el));
