// ================= MOBILE MENU TOGGLE =================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// ================= LIGHTBOX GALLERY =================
let activeCategory = 'all';
let visibleImages = [];
let currentLightboxIndex = 0;

// Filter cards by category
function filterGallery(category, buttonElement) {
    activeCategory = category;

    // Update active filter button styling
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    filterBtns.forEach(btn => {
        btn.className = "gallery-filter-btn bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm transition duration-300";
    });
    buttonElement.className = "gallery-filter-btn active bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-md transition duration-300";

    // Show/Hide cards
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    // Update list of visible images for lightbox
    updateVisibleImagesList();
}

// Update internal list of images currently visible on screen
function updateVisibleImagesList() {
    const visibleCards = document.querySelectorAll('.gallery-card:not(.hidden)');
    visibleImages = Array.from(visibleCards).map(card => card.querySelector('.gallery-img'));
}

// Open Lightbox synced to current category
function openLightbox(cardElement) {
    updateVisibleImagesList();
    const cardImg = cardElement.querySelector('.gallery-img');
    currentLightboxIndex = visibleImages.indexOf(cardImg);

    if (currentLightboxIndex !== -1) {
        updateLightboxContent();
        document.getElementById('lightbox').classList.remove('hidden');
    }
}

// Update image and counter inside lightbox
function updateLightboxContent() {
    if (visibleImages.length === 0) return;
    const img = visibleImages[currentLightboxIndex];
    document.getElementById('lightboxImg').src = img.src;
    document.getElementById('lightboxImg').alt = img.alt || "Προβολή φωτογραφίας";
    document.getElementById('lightboxCounter').textContent = `${currentLightboxIndex + 1} / ${visibleImages.length}`;
}

function prevLightboxImage() {
    if (visibleImages.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + visibleImages.length) % visibleImages.length;
    updateLightboxContent();
}

function nextLightboxImage() {
    if (visibleImages.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % visibleImages.length;
    updateLightboxContent();
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}

// Keyboard support (Escape to close, Arrows to navigate)
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('hidden')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightboxImage();
    if (e.key === 'ArrowRight') nextLightboxImage();
});

// Initialize list on load
document.addEventListener('DOMContentLoaded', updateVisibleImagesList);