// ===== Мобильное меню =====
const toggle = document.getElementById('mobileToggle');
const nav = document.getElementById('mainNav');
toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
});
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});

// ===== Анимация при скролле =====
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });
fadeElements.forEach(el => observer.observe(el));

// ===== Счётчики =====
const statNumbers = document.querySelectorAll('.stat-item .number');
function animateNumbers() {
    statNumbers.forEach(el => {
        const target = parseFloat(el.getAttribute('data-target'));
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            if (Number.isInteger(target)) {
                el.textContent = Math.floor(current);
            } else {
                el.textContent = current.toFixed(1);
            }
        }, 30);
    });
}
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
aboutObserver.observe(aboutSection);

// ===== Форма =====
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
        formMessage.textContent = 'Заполните все поля.';
        formMessage.style.color = '#f0a0a0';
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        formMessage.textContent = 'Введите корректный email.';
        formMessage.style.color = '#f0a0a0';
        return;
    }
    formMessage.textContent = 'Спасибо! Сообщение отправлено.';
    formMessage.style.color = '#ECCACB';
    form.reset();
    setTimeout(() => {
        formMessage.textContent = '';
    }, 5000);
});

// ===== Плавная прокрутка =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Анимированное сердце =====
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
const W = 400, H = 400;
let time = 0;

function drawHeart(t) {
    ctx.clearRect(0, 0, W, H);

    const beat = Math.sin(t * 2.8) * 0.5 + 0.5;
    const scale = 0.9 + beat * 0.2;
    const glow = 0.3 + beat * 0.4;

    const cx = W/2, cy = H/2 - 10;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    ctx.shadowColor = `rgba(255, 80, 80, ${glow * 0.5})`;
    ctx.shadowBlur = 40;

    ctx.beginPath();
    ctx.moveTo(0, 40);
    ctx.bezierCurveTo(-80, -20, -120, 40, 0, 110);
    ctx.bezierCurveTo(120, 40, 80, -20, 0, 40);
    ctx.closePath();

    const grad = ctx.createRadialGradient(-20, -10, 10, 0, 0, 100);
    grad.addColorStop(0, '#ff4d4d');
    grad.addColorStop(0.6, '#cc0000');
    grad.addColorStop(1, '#880000');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#660000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(-25, -15, 20, 30, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fill();

    ctx.restore();

    // ЭКГ-линия
    ctx.save();
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 12;

    const ecgY = H - 30;
    const ecgW = W - 40;
    const startX = 20;

    ctx.beginPath();
    for (let i = 0; i <= ecgW; i += 2) {
        const x = startX + i;
        let y = 0;
        const phase = (i / ecgW) * 20 + t * 3;
        if (i < ecgW * 0.2) y = 0;
        else if (i < ecgW * 0.25) y = -15 * Math.sin((i - ecgW * 0.2) / (ecgW * 0.05) * Math.PI);
        else if (i < ecgW * 0.35) y = 5;
        else if (i < ecgW * 0.4) y = -35 * Math.sin((i - ecgW * 0.35) / (ecgW * 0.05) * Math.PI);
        else if (i < ecgW * 0.45) y = 5;
        else if (i < ecgW * 0.55) y = 0;
        else if (i < ecgW * 0.65) y = -10 * Math.sin((i - ecgW * 0.55) / (ecgW * 0.1) * Math.PI);
        else if (i < ecgW * 0.75) y = 5;
        else if (i < ecgW * 0.85) y = 15 * Math.sin((i - ecgW * 0.75) / (ecgW * 0.1) * Math.PI);
        else y = 0;

        const offset = (i + t * 80) % ecgW;
        if (i < offset) continue;

        if (i === 0 || i === offset) ctx.moveTo(x, ecgY + y);
        else ctx.lineTo(x, ecgY + y);
    }
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.fillText('BEAT', W/2, H - 10);
}

function animate() {
    time += 0.016;
    drawHeart(time);
    requestAnimationFrame(animate);
}
animate();
