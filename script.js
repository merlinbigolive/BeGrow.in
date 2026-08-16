const WHATSAPP = '918178949463';
const MAX_VIDEO_SECONDS = 24;

const salaryData = [
  ['5K Beans','₹3,600','40 hours','15 days',false],['10K Beans','₹7,600','40 hours','15 days',false],
  ['20K Beans','₹14,400','40 hours','15 days',false],['50K Beans','₹37,000','60 hours','20 days',true],
  ['100K Beans','₹76,000','80 hours','22 days',true],['150K Beans','₹115,000','100 hours','22 days',true],
  ['200K Beans','₹158,000','150 hours','22 days',true],['400K Beans','₹320,000','150 hours','22 days',true],
  ['700K Beans','₹546,000','150 hours','22 days',true],['1M Beans','₹760,000','150 hours','22 days',true],
  ['2M Beans','₹1,520,000','150 hours','22 days',true]
];

const grid = document.getElementById('salaryGrid');
grid.innerHTML = salaryData.map((row, i) => `
  <article class="salary-card reveal" style="transition-delay:${Math.min(i * 35, 250)}ms">
    <div class="target">${row[0]}</div>
    <div class="amount" data-count="${row[1].replace(/[^0-9]/g,'')}">${row[1]}</div>
    <div class="meta"><span>${row[2]}</span><span>${row[3]}</span></div>
    ${row[4] ? '<div class="bonus">INCLUDING BONUS</div>' : '<div class="bonus">HOST SALARY / COMMISSION</div>'}
  </article>`).join('');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const featured = document.getElementById('featuredVideo');
if (featured) {
  featured.addEventListener('timeupdate', () => {
    if (featured.currentTime >= MAX_VIDEO_SECONDS) {
      featured.pause();
      featured.currentTime = 0;
    }
  });
}

// Portfolio cards gently autoplay only when visible, keeping the page light.
const portfolioVideos = document.querySelectorAll('.portfolio-card video');
const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(({target, isIntersecting}) => {
    if (isIntersecting) target.play().catch(() => {});
    else target.pause();
  });
}, {threshold:.35});
portfolioVideos.forEach(v => videoObserver.observe(v));

// Form -> WhatsApp with all application details. BIGO ID is intentionally optional.
document.getElementById('applyForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const value = name => (data.get(name) || '').toString().trim();
  const text = [
    '✨ MERLIN AGENCY — BIGO LIVE APPLICATION',
    '',
    `Name: ${value('name')}`,
    `WhatsApp: ${value('phone')}`,
    `BIGO ID: ${value('bigoId') || 'Optional / Not provided'}`,
    `City / State: ${value('location')}`,
    `Experience: ${value('experience')}`,
    `Preferred Target: ${value('target')}`,
    `Best Time to Contact: ${value('contactTime') || 'Not specified'}`,
    `Message: ${value('message') || 'None'}`,
    '',
    'Sent from the Merlin Agency website.'
  ].join('\n');
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
}, {passive:true});
