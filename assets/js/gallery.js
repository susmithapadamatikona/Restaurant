function initGallery() {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;
  document.querySelectorAll(".gallery-item img, .thumbs img").forEach(img => img.addEventListener("click", () => {
    lightbox.querySelector("img").src = img.src;
    lightbox.classList.add("active");
  }));
  lightbox.addEventListener("click", () => lightbox.classList.remove("active"));
  const main = document.querySelector(".dish-gallery-main");
  document.querySelectorAll(".thumbs img").forEach(img => img.addEventListener("click", e => { e.stopPropagation(); main.src = img.src; }));
}
