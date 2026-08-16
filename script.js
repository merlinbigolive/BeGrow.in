const WHATSAPP='918178949463';
const salaryData=[['5K Beans','₹3,600','40 hours','15 days',false],['10K Beans','₹7,600','40 hours','15 days',false],['20K Beans','₹14,400','40 hours','15 days',false],['50K Beans','₹37,000','60 hours','20 days',true],['100K Beans','₹76,000','80 hours','22 days',true],['150K Beans','₹115,000','100 hours','22 days',true],['200K Beans','₹158,000','150 hours','22 days',true],['400K Beans','₹320,000','150 hours','22 days',true],['700K Beans','₹546,000','150 hours','22 days',true],['1M Beans','₹760,000','150 hours','22 days',true],['2M Beans','₹1,520,000','150 hours','22 days',true]];
const grid=document.getElementById('salaryGrid');
if(grid) grid.innerHTML=salaryData.map((r,i)=>`<article class="salary-card reveal" style="transition-delay:${Math.min(i*35,250)}ms"><small>${r[0]}</small><strong>${r[1]}</strong><div><span>${r[2]}</span><span>${r[3]}</span></div><em>${r[4]?'INCLUDING BONUS':'HOST SALARY / COMMISSION'}</em></article>`).join('');

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));

// Main portrait video carousel: one video loads/plays at a time to avoid page freezing.
const carousel=document.getElementById('videoCarousel');
if(carousel){
 const slides=[...carousel.querySelectorAll('.video-slide')], track=carousel.querySelector('.video-track'), dots=carousel.querySelector('.dots'); let index=0,timer;
 slides.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Go to video '+(i+1));b.addEventListener('click',()=>go(i,true));dots.appendChild(b)});
 const setActive=()=>{slides.forEach((s,i)=>s.classList.toggle('active',i===index));track.style.transform=`translateX(-${index*100}%)`;[...dots.children].forEach((d,i)=>d.classList.toggle('on',i===index));slides.forEach((s,i)=>{const v=s.querySelector('video');if(i===index){v.load();v.muted=true;const p=v.play();if(p)p.catch(()=>{});}else{v.pause();v.currentTime=0;}})};
 const go=(i,manual=false)=>{index=(i+slides.length)%slides.length;setActive();clearTimeout(timer);timer=setTimeout(()=>go(index+1),7000);};
 carousel.querySelector('.next').addEventListener('click',()=>go(index+1,true));carousel.querySelector('.prev').addEventListener('click',()=>go(index-1,true));
 setActive();
}

// Portfolio cards open a real player instead of loading three heavy videos at once.
const modal=document.getElementById('videoModal'), modalVideo=document.getElementById('modalVideo');
if(modal){document.querySelectorAll('.portfolio-card').forEach(card=>card.addEventListener('click',()=>{modalVideo.src=card.dataset.video;modalVideo.poster=card.dataset.poster;modal.classList.add('open');modal.setAttribute('aria-hidden','false');modalVideo.muted=false;modalVideo.play().catch(()=>{});}));const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');modalVideo.pause();modalVideo.removeAttribute('src');modalVideo.load();};modal.querySelector('.modal-close').addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close();});document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}

// Apply page -> WhatsApp with complete details. BIGO ID is optional.
const form=document.getElementById('applyForm');
if(form) form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form),v=k=>(d.get(k)||'').toString().trim();const text=['✨ MERLIN AGENCY — BIGO LIVE APPLICATION','',`Name: ${v('name')}`,`Applicant WhatsApp: ${v('phone')}`,`BIGO ID: ${v('bigoId')||'Optional / Not provided'}`,`City / State: ${v('location')}`,`Experience: ${v('experience')}`,`Preferred Target: ${v('target')}`,`Best Time to Contact: ${v('contactTime')||'Not specified'}`,`Message: ${v('message')||'None'}`,'','Sent from JoinMerlin website.'].join('\n');window.location.href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;});
