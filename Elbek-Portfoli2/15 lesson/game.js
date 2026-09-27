// 1. Kursor orqasidan yuruvchi neon nur yaratish
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

window.addEventListener('mousemove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// 2. Kartochkalarga bosilganda rangli uchqunlar sochish effekti
const cards = document.querySelectorAll('.container');

cards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Kartochka ichidagi rang rangini aniqlash
    let color = '#38bdf8';
    if (card.querySelector('.pink-bg')) color = '#ff2a75';
    if (card.querySelector('.orange-bg')) color = '#ff6600';
    if (card.querySelector('.green-bg')) color = '#00e676';

    createParticles(e.clientX, e.clientY, color);
  });
});

function createParticles(x, y, mainColor) {
  const colors = [mainColor, '#ffffff', '#38bdf8'];

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    document.body.appendChild(particle);

    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 10px ${color};
    `;

    const destX = x + (Math.random() - 0.5) * 220;
    const destY = y + (Math.random() - 0.5) * 220;

    const anim = particle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${destX - x}px, ${destY - y}px) scale(0)`, opacity: 0 }
    ], {
      duration: 600 + Math.random() * 300,
      easing: 'cubic-bezier(0, .9, .57, 1)'
    });

    anim.onfinish = () => particle.remove();
  }
}