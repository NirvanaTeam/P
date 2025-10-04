
// Minimal (no canvas), reveal animations remain
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Build SVG rings
function buildRing(el, percent) {
  const size = 120, stroke = 10, r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

  const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  track.setAttribute('cx', size/2); track.setAttribute('cy', size/2); track.setAttribute('r', r);
  track.setAttribute('fill', 'none'); track.setAttribute('stroke-width', stroke);
  track.setAttribute('class', 'track');

  const prog = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  prog.setAttribute('cx', size/2); prog.setAttribute('cy', size/2); prog.setAttribute('r', r);
  prog.setAttribute('fill', 'none'); prog.setAttribute('stroke-width', stroke);
  prog.setAttribute('stroke-linecap', 'round');
  prog.setAttribute('class', 'progress');
  prog.style.transform = 'rotate(-90deg)';
  prog.style.transformOrigin = '50% 50%';
  prog.setAttribute('stroke-dasharray', c);
  prog.setAttribute('stroke-dashoffset', c);

  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = '0%';

  svg.appendChild(track);
  svg.appendChild(prog);
  el.innerHTML = '';
  el.appendChild(svg);
  el.appendChild(label);

  // Animate
  let cur = 0;
  const target = Math.max(0, Math.min(100, percent|0));
  function step() {
    cur += Math.max(1, Math.round((target - cur)/6));
    if (cur > target) cur = target;
    label.textContent = cur + '%';
    const off = c * (1 - cur/100);
    prog.setAttribute('stroke-dashoffset', off);
    if (cur < target) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initRings() {
  document.querySelectorAll('.skill').forEach(skill => {
    const p = parseInt(skill.dataset.percent || '0', 10);
    const ring = skill.querySelector('.ring');
    if (ring) buildRing(ring, p);
  });
}

let inited = false;
const skillsSec = document.getElementById('skills');
const io2 = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting && !inited){ inited = true; initRings(); }});
},{threshold:0.25});
if (skillsSec) io2.observe(skillsSec);
