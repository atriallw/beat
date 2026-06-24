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
