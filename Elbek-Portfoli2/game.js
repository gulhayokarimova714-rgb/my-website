const TELEGRAM_ACCOUNT = "https://t.me/+998933435889";

// 1. Kursor ketidan yumshoq va silliq ergashuvchi Neon Nur
const glow = document.getElementById('cursor-glow');

if (glow) {
    window.addEventListener('pointermove', (e) => {
        glow.animate(
            { left: `${e.clientX}px`, top: `${e.clientY}px` },
            { duration: 500, fill: 'forwards', easing: 'ease-out' }
        );
    });
}

// 2. Kross-brauzer va uzluksiz ishlaydigan Typewriter (Yozilish) effekti
const words = [
    "bo'lajak kuchli Frontend dasturchiman!", 
    "FC Mobile va Brawl Stars o'yinchisiman!", 
    "kreativ veb-dizaynerman!"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function playTypewriter() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2200; // Matn to'liq yozilgach to'xtab turish vaqti
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(playTypewriter, speed);
}

// Sahifa yuklanishi bilan ishga tushirish
document.addEventListener('DOMContentLoaded', playTypewriter);

// 3. 360-darajali Aylana bo'ylab Zarrachalar (Particles) portlashi
function createExplosion(x, y, count = 30) {
    const colors = ['#00dfd8', '#ff007f', '#0088cc', '#ffffff', '#ffcc00'];

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'custom-particle';
        document.body.appendChild(particle);

        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 120 + 30;

        const destX = Math.cos(angle) * distance;
        const destY = Math.sin(angle) * distance;

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
            box-shadow: 0 0 12px ${color};
            transform: translate(-50%, -50%);
        `;

        const anim = particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`, opacity: 0 }
        ], {
            duration: 600 + Math.random() * 400,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });

        anim.onfinish = () => particle.remove();
    }
}

// Avatarga va tugmalarga bosganda portlash effekti
const avatar = document.getElementById('hero-avatar');
if (avatar) {
    avatar.addEventListener('click', (e) => {
        createExplosion(e.clientX, e.clientY, 40);
    });
}

// 4. Kartochkalar uchun Mukammal 3D Parallax & Tilt Effekti
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        card.style.transition = 'transform 0.08s ease-out';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });

    card.addEventListener('click', (e) => {
        createExplosion(e.clientX, e.clientY, 25);
    });
});

// 5. Telegram Forma Yuborish (Interaktiv Tugma Bilan)
const tgForm = document.getElementById('tg-form');

if (tgForm) {
    tgForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('user-name');
        const name = nameInput && nameInput.value.trim() !== '' ? nameInput.value : "Do'stim";

        const submitBtn = tgForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            const rect = submitBtn.getBoundingClientRect();
            createExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
        }

        setTimeout(() => {
            alert(`Rahmat, ${name}! Xabaringiz qabul qilindi. Hozir sizni Telegram profilga o'tkazamiz!`);
            window.open(TELEGRAM_ACCOUNT, '_blank');
            tgForm.reset();
        }, 300);
    });
}