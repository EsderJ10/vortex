// ============================================================
// CUSTOM CURSOR - With Accessibility Toggle
// ============================================================
const cursorDot = document.getElementById('cursorDot');
const cursorToggleBtn = document.getElementById('cursorToggle');
let customCursorEnabled = false;
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// Toggle custom cursor
cursorToggleBtn.addEventListener('click', () => {
    customCursorEnabled = !customCursorEnabled;
    document.body.classList.toggle('custom-cursor-enabled');
    cursorDot.style.display = customCursorEnabled ? 'block' : 'none';
    cursorToggleBtn.textContent = customCursorEnabled ? 'Disable Cursor' : 'Toggle Cursor';
});

// Optimized cursor movement with requestAnimationFrame
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursorPosition() {
    if (customCursorEnabled) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    }
    requestAnimationFrame(updateCursorPosition);
}
updateCursorPosition();

// Interactive element hover effects
document.querySelectorAll('a, button, .bento-item, .carousel-btn, .nav-links a').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (customCursorEnabled) {
            cursorDot.style.transform = 'scale(1.5)';
            cursorDot.style.borderColor = '#ff00ff';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (customCursorEnabled) {
            cursorDot.style.transform = 'scale(1)';
            cursorDot.style.borderColor = '#00ff88';
        }
    });
});

// ============================================================
// LOADER
// ============================================================
const loader = document.getElementById('loader');
let contentLoaded = false;

// Fade out loader when content is actually loaded
function hideLoader() {
    if (contentLoaded) return;
    contentLoaded = true;

    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
}

// Use load event instead of arbitrary timeout
window.addEventListener('load', () => {
    setTimeout(hideLoader, 1200);
});

// Fallback timeout
setTimeout(() => {
    if (!contentLoaded) hideLoader();
}, 3000);

// ============================================================
// HERO PARALLAX
// ============================================================
const heroLeft = document.getElementById('heroLeft');
const heroRight = document.getElementById('heroRight');

document.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

    heroLeft.style.transform = `translate(${-xPos}px, ${-yPos}px)`;
    heroRight.style.transform = `translate(${xPos}px, ${yPos}px)`;
});

// ============================================================
// 3D CAROUSEL
// ============================================================
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Calculate rotation dynamically
const slides = document.querySelectorAll('.carousel-slide');
const slideCount = slides.length;
const rotationAngle = 360 / slideCount;

let currentRotation = 0;
let autoRotateInterval;

function rotateCarousel(direction) {
    currentRotation += direction * rotationAngle;
    carouselTrack.style.transform = `rotateY(${currentRotation}deg)`;
}

nextBtn.addEventListener('click', () => {
    rotateCarousel(-1);
    resetAutoRotate();
});

prevBtn.addEventListener('click', () => {
    rotateCarousel(1);
    resetAutoRotate();
});

// Keyboard support for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        rotateCarousel(-1);
        resetAutoRotate();
    } else if (e.key === 'ArrowLeft') {
        rotateCarousel(1);
        resetAutoRotate();
    }
});

function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        rotateCarousel(-1);
    }, 5000);
}

function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    startAutoRotate();
}

startAutoRotate();

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class and observe
document.querySelectorAll('.bento-item, .floating-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================
// BENTO ITEM KEYBOARD SUPPORT
// ============================================================
document.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});