// 1. Sichqoncha orqasidan yuruvchi sariq (Yellow Kitchen) neon nur effekti
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

// Glow uchun CSS stili dinamik qo'shiladi
const style = document.createElement('style');
style.innerHTML = `
  .cursor-glow {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 230, 0, 0.2) 0%, rgba(0, 0, 0, 0) 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
    transition: transform 0.05s linear;
  }
`;
document.head.appendChild(style);

window.addEventListener('mousemove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// 2. Tugmalar va bannerlarga bosilganda sariq zarrachalar sochilish effekti
const interactiveElements = document.querySelectorAll('.btn, .full-banner, .search-box button, .cart-btn');

interactiveElements.forEach(element => {
  element.addEventListener('click', (e) => {
    createParticles(e.clientX, e.clientY);
  });
});

function createParticles(x, y, count = 20) {
  const colors = ['#ffe600', '#ffd600', '#ff9900', '#ffffff'];

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