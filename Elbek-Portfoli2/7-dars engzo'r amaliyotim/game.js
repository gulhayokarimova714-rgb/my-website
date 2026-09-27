// 1. Sichqoncha orqasidan yuruvchi neon nur
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

window.addEventListener('mousemove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// 2. Kartochkalarga bosganda zarrachalar (particles) sochilish effekti
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', (e) => {
    createParticles(e.clientX, e.clientY);
  });
});

function createParticles(x, y, count = 25) {
  const colors = ['#00dfd8', '#ff007f', '#ffffff', '#38bdf8'];

  for (let i = 0; i < count; i++) {
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

    const destX = x + (Math.random() - 0.5) * 200;
    const destY = y + (Math.random() - 0.5) * 200;

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