// ================= MOBILE MENU TOGGLE =================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// ================= LIGHTBOX GALLERY =================
// Automatically extract image sources from all grid card images (.gallery-img)
const galleryImgElements = document.querySelectorAll(".gallery-img");
const galleryImages = Array.from(galleryImgElements).map(img => img.getAttribute("src"));

let currentImageIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCounter = document.getElementById("lightboxCounter");

function updateLightbox() {
    if (!lightboxImg || galleryImages.length === 0) return;

    // 1. Update modal image source
    lightboxImg.src = galleryImages[currentImageIndex];

    // 2. Update counter text (e.g., 1 / 6)
    if (lightboxCounter) {
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }
}

function openLightbox(index) {
    if (!lightbox) return;
    currentImageIndex = index;
    updateLightbox();
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Lock page scrolling while open
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add("hidden");
    document.body.style.overflow = ""; // Restore page scrolling
}

function prevLightboxImage() {
    if (galleryImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
}

function nextLightboxImage() {
    if (galleryImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightbox();
}

// Close Lightbox when clicking backdrop outside the image container
if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard Navigation (Escape to exit, Left/Right arrows to cycle)
document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.classList.contains("hidden")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevLightboxImage();
    if (e.key === "ArrowRight") nextLightboxImage();
});