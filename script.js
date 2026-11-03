const starsContainer = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 2 + 2) + 's';
    starsContainer.appendChild(star);
}
const canvas = document.getElementById('sakura');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const petalColors = ['#ffb3d1', '#ff77a9', '#ffd1e8', '#ffc2dd', '#ffa3c4'];
const petals = [];

class Petal {
    constructor(reset = false) { this.reset(reset); }
    reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -20;
        this.size = Math.random() * 8 + 6;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.speedY = Math.random() * 1.5 + 0.8;
        this.speedX = Math.random() * 1.2 - 0.6;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.05;
        this.sway = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.opacity = Math.random() * 0.5 + 0.5;
    }
    update() {
        this.y += this.speedY;
        this.sway += this.swaySpeed;
        this.x += this.speedX + Math.sin(this.sway) * 0.8;
        this.rotation += this.rotSpeed;
        if (this.y > canvas.height + 20) this.reset();
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.x < -20) this.x = canvas.width + 20;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size * 0.5, -this.size * 0.5, this.size, -this.size * 0.2, this.size * 0.6, this.size * 0.4);
        ctx.bezierCurveTo(this.size * 0.4, this.size * 0.7, this.size * 0.1, this.size * 0.5, 0, 0);
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < 60; i++) petals.push(new Petal(true));

function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animatePetals);
}
animatePetals();
const photos = [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg',
    'photo5.jpg',
    'photo6.jpg'
];

const gallery = document.getElementById('gallery');

photos.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.animationDelay = (index * 0.12) + 's';

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Фото ' + (index + 1);
    img.onerror = function() {
        this.src = `https://via.placeholder.com/300/ff77a9/ffffff?text=Фото+${index + 1}`;
    };
    img.addEventListener('click', () => openLightbox(src, index));

    item.appendChild(img);
    gallery.appendChild(item);

    setTimeout(() => item.classList.add('appear'), 100);
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src, index) {
    lightboxImg.src = photos[index] || src;
    lightboxImg.onerror = function() {
        this.src = `https://via.placeholder.com/800/ff77a9/ffffff?text=Фото+${index + 1}`;
    };
    lightbox.classList.add('active');
    if (navigator.vibrate) navigator.vibrate(30);
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

function celebrate() {
    for (let i = 0; i < 50; i++) {
        const p = new Petal();
        p.y = canvas.height / 2 + (Math.random() - 0.5) * 200;
        p.x = canvas.width / 2 + (Math.random() - 0.5) * 200;
        p.speedY = Math.random() * 4 - 2;
        p.speedX = Math.random() * 6 - 3;
        petals.push(p);
    }

    if (navigator.vibrate) navigator.vibrate(150);

    const messages = [
        '🌸  おめでとう! 🌸 ',
        '✨  Счастья тебе! ✨ ',
        '💖  Ты — герой своей истории! 💖 ',
        '🌟  Пусть мечты сбудутся! 🌟 ',
        '🎌  頑張って! Удачи! 🎌 '
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];

    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-family: 'M PLUS Rounded 1c', sans-serif;
        font-size: 2.5rem;
        font-weight: 900;
        color: #fff;
        text-shadow: 0 0 20px #ff77a9, 0 0 40px #ff77a9;
        z-index: 100;
        pointer-events: none;
        transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        text-align: center;
        padding: 20px;
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.style.transform = 'translate(-50%, -50%) scale(1)', 10);
    setTimeout(() => {
        toast.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => toast.remove(), 500);
    }, 2200);
}