// 1. Kursor ketidan yuradigan neon nur effekti yaratish
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});

// 2. Rasmlarga bosilganda neon uchqunlar (particles) sochish
const pics = document.querySelectorAll('.pic');

pics.forEach(pic => {
    pic.addEventListener('click', (e) => {
        createParticles(e.clientX, e.clientY, 30);
    });
});

function createParticles(x, y, count = 20) {
    const colors = ['#38bdf8', '#ff007f', '#ffffff', '#e2e8f0'];
    
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

        const destinationX = x + (Math.random() - 0.5) * 250;
        const destinationY = y + (Math.random() - 0.5) * 250;

        const animation = particle.animate([
            { transform: `translate(0, 0) scale(1)`, opacity: 1 },
            { transform: `translate(${destinationX - x}px, ${destinationY - y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });

        animation.onfinish = () => particle.remove();
    }
}

// 3. Asosiy blok (Wrapper) uchun 3D Tilt interaktiv effekti
const wrapper = document.querySelector('.wrapper');

if (wrapper) {
    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 35;
        const rotateY = (centerX - x) / 35;
        
        wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    wrapper.addEventListener('mouseleave', () => {
        wrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
}