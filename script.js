// ========== Мобильное меню ==========
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

// ========== Анимация при скролле ==========
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });
fadeElements.forEach(el => observer.observe(el));

// ========== Счётчики ==========
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

// ========== Форма ==========
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

// ========== Плавная прокрутка ==========
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

// ============================================================
// ========== МАСКОТ (Canvas анимация) =========================
// ============================================================

const canvas = document.getElementById('mascotCanvas');
const ctx = canvas.getContext('2d');

// Размеры канваса (соответствуют атрибутам width/height)
const W = 400, H = 500;
let time = 0;

function drawMascot(t) {
    ctx.clearRect(0, 0, W, H);

    // ----- Параметры анимации -----
    const bounceY = Math.sin(t * 0.8) * 4;          // подпрыгивание
    const sway = Math.sin(t * 0.5) * 0.03;           // покачивание (в радианах)
    const hairWave = Math.sin(t * 1.2) * 0.1;        // для волос
    const armSwing = Math.sin(t * 1.0) * 0.15;       // для рук
    const mouthOpen = 0.5 + 0.5 * Math.sin(t * 2.5); // открытие рта (0..1)

    // ----- Сохраняем и трансформируем всё целиком -----
    ctx.save();
    ctx.translate(W/2, H/2 + bounceY);   // центр + подпрыгивание
    ctx.rotate(sway);                   // покачивание

    // ============================================================
    // 1. ТЕЛО (одежда)
    // ============================================================
    ctx.save();
    // Плащ/пальто – овал сужающийся книзу
    ctx.beginPath();
    ctx.moveTo(-45, 20);
    ctx.quadraticCurveTo(-55, 50, -40, 90);
    ctx.quadraticCurveTo(-20, 110, 0, 110);
    ctx.quadraticCurveTo(20, 110, 40, 90);
    ctx.quadraticCurveTo(55, 50, 45, 20);
    ctx.closePath();
    ctx.fillStyle = '#2a3b4c';
    ctx.fill();
    ctx.strokeStyle = '#1a2a3a';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Воротник-стоечка
    ctx.beginPath();
    ctx.ellipse(0, 15, 30, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#3a4b5c';
    ctx.fill();
    ctx.stroke();

    // Две вертикальные полосы-лоскута (расстёгнутый плащ)
    ctx.beginPath();
    ctx.moveTo(-15, 20);
    ctx.lineTo(-15, 90);
    ctx.strokeStyle = '#5a6b7c';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(15, 20);
    ctx.lineTo(15, 90);
    ctx.stroke();

    // Ремешок на груди
    ctx.beginPath();
    ctx.moveTo(-35, 30);
    ctx.lineTo(-5, 50);
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Кармашек
    ctx.fillStyle = '#4a5b6c';
    ctx.fillRect(-25, 45, 18, 15);
    ctx.strokeRect(-25, 45, 18, 15);
    ctx.beginPath();
    ctx.moveTo(-25, 45);
    ctx.lineTo(-16, 38);
    ctx.lineTo(-7, 45);
    ctx.stroke();

    // ============================================================
    // 2. РУКИ
    // ============================================================
    ctx.save();
    // Левая рука (свисает)
    ctx.translate(-48, 30);
    ctx.rotate(0.2 + armSwing * 0.5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-10, 30, -5, 60);
    ctx.strokeStyle = '#e0b0a0';
    ctx.lineWidth = 10;
    ctx.stroke();
    // Рукав
    ctx.beginPath();
    ctx.ellipse(-2, 10, 12, 8, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#2a3b4c';
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Правая рука (держит планшет)
    ctx.save();
    ctx.translate(48, 30);
    ctx.rotate(-0.3 + armSwing * 0.7);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(15, 25, 5, 45);
    ctx.strokeStyle = '#e0b0a0';
    ctx.lineWidth = 10;
    ctx.stroke();
    // Рукав
    ctx.beginPath();
    ctx.ellipse(2, 10, 12, 8, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#2a3b4c';
    ctx.fill();
    ctx.stroke();
    // Планшет
    ctx.save();
    ctx.translate(5, 45);
    ctx.rotate(-0.2);
    ctx.fillStyle = '#333';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.fillRect(-15, -10, 30, 20);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#5af';
    ctx.fillRect(-10, -6, 20, 12);
    ctx.fillStyle = '#fff';
    ctx.font = '10px sans-serif';
    ctx.fillText('BEAT', -6, 3);
    ctx.restore();
    ctx.restore();

    // ============================================================
    // 3. НОГИ
    // ============================================================
    ctx.save();
    // Левая нога
    ctx.translate(-18, 110);
    ctx.rotate(0.1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-4, 25);
    ctx.strokeStyle = '#2a3b4c';
    ctx.lineWidth = 14;
    ctx.stroke();
    // Обувь
    ctx.beginPath();
    ctx.ellipse(-4, 25, 10, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1a2a3a';
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    // Правая нога
    ctx.translate(18, 110);
    ctx.rotate(-0.1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(4, 25);
    ctx.strokeStyle = '#2a3b4c';
    ctx.lineWidth = 14;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(4, 25, 10, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1a2a3a';
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // ============================================================
    // 4. ГОЛОВА
    // ============================================================
    ctx.save();
    ctx.translate(0, -20);

    // Основа головы – овал
    ctx.beginPath();
    ctx.ellipse(0, 0, 60, 70, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fce4d6';
    ctx.fill();
    ctx.strokeStyle = '#1a2a3a';
    ctx.lineWidth = 2;
    ctx.stroke();

    // ============================================================
    // 5. ВОЛОСЫ
    // ============================================================
    ctx.save();
    ctx.strokeStyle = '#8B5A2B';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Задняя часть волос (большая дуга сверху)
    ctx.beginPath();
    ctx.arc(0, -10, 65, -Math.PI, 0);
    ctx.stroke();

    // Торчащие пряди на макушке
    const spikes = [
        [-30, -65], [-15, -75], [0, -80], [15, -75], [30, -65]
    ];
    spikes.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.moveTo(x, y - 5);
        ctx.quadraticCurveTo(x + 8, y - 25, x + 15, y - 10);
        ctx.stroke();
    });

    // Хвостик справа (с крестиком)
    ctx.beginPath();
    ctx.moveTo(55, -20);
    ctx.quadraticCurveTo(80, -30, 85, -10 + hairWave * 15);
    ctx.quadraticCurveTo(75, 5, 55, 0);
    ctx.stroke();
    // Крестик на хвостике
    ctx.strokeStyle = '#2a1a0a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(78, -20 + hairWave * 8);
    ctx.lineTo(88, -10 + hairWave * 8);
    ctx.moveTo(88, -20 + hairWave * 8);
    ctx.lineTo(78, -10 + hairWave * 8);
    ctx.stroke();

    // Чёлка – две пряди в виде сердечка
    ctx.strokeStyle = '#8B5A2B';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-20, -40);
    ctx.quadraticCurveTo(-10, -60, 0, -50);
    ctx.quadraticCurveTo(10, -60, 20, -40);
    ctx.stroke();

    // Длинная прядь слева
    ctx.beginPath();
    ctx.moveTo(-35, -30);
    ctx.quadraticCurveTo(-60, -10, -55, 30 + hairWave * 10);
    ctx.stroke();

    ctx.restore(); // волосы

    // ============================================================
    // 6. ЛИЦО
    // ============================================================
    // Глаза (большие овалы)
    const eyeY = -10;
    const eyeSpacing = 30;
    // Моргание: каждые ~3 секунды
    const blinkCycle = t % 3.5;
    const blinkFactor = (blinkCycle > 3.0 && blinkCycle < 3.3) ? 0.1 : 1.0;

    // Глазные яблоки
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(-eyeSpacing, eyeY, 18, 22 * blinkFactor, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(eyeSpacing, eyeY, 18, 22 * blinkFactor, 0, 0, Math.PI * 2);
    ctx.fill();

    // Зрачки
    ctx.fillStyle = '#3a5a9a';
    ctx.beginPath();
    ctx.ellipse(-eyeSpacing, eyeY, 10, 16 * blinkFactor, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(eyeSpacing, eyeY, 10, 16 * blinkFactor, 0, 0, Math.PI * 2);
    ctx.fill();

    // Блики
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-eyeSpacing - 5, eyeY - 5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(eyeSpacing - 5, eyeY - 5, 4, 0, Math.PI * 2);
    ctx.fill();

    // Румяна
    ctx.fillStyle = 'rgba(255, 150, 150, 0.4)';
    ctx.beginPath();
    ctx.ellipse(-42, 20, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(42, 20, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Рот (разговаривает)
    const mouthHeight = 8 + mouthOpen * 10;
    ctx.fillStyle = '#c0392b';
    ctx.beginPath();
    ctx.ellipse(0, 35, 12, mouthHeight, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1a2a3a';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore(); // голова

    // ============================================================
    // 7. БЭЙДЖ BEAT на груди
    // ============================================================
    ctx.save();
    ctx.translate(0, 70);
    ctx.fillStyle = '#f0a0a0';
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BEAT', 0, 0);
    ctx.restore();

    ctx.restore(); // общая трансформация
}

// ========== Запуск анимации ==========
function animate() {
    time += 0.016; // примерно 60 FPS
    drawMascot(time);
    requestAnimationFrame(animate);
}

animate();
