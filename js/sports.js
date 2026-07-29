const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

let currentSlide = 0;
const slides = document.querySelectorAll('#hero-slider .slide');
const dots = document.querySelectorAll('#hero-slider .dot');
const totalSlides = slides.length;
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('opacity-0', 'z-0');
            slide.classList.add('opacity-100', 'z-10');
        } else {
            slide.classList.remove('opacity-100', 'z-10');
            slide.classList.add('opacity-0', 'z-0');
        }
    });

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.remove('bg-white/40');
            dot.classList.add('bg-white', 'w-5');
        } else {
            dot.classList.remove('bg-white', 'w-5');
            dot.classList.add('bg-white/40');
        }
    });

    currentSlide = index;
}

function nextSlide() {
    let next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

function goToSlide(index) {
    showSlide(index);
    resetTimer();
}

function startTimer() {
    slideInterval = setInterval(nextSlide, 5000); // Change image every 5 seconds
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

// Initialize
showSlide(0);
startTimer();