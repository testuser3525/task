export function setupGallerySwipe() {
  if (window.innerWidth >= 768) return;

  const mainImg = document.getElementById("gallery-main-img");
  const dotsList = document.querySelector(".product-gallery__dots");
  const stage = document.querySelector(".product-gallery__stage");

  if (!mainImg || !dotsList || !stage) return;

  const images = [...document.querySelectorAll(".product-gallery__thumb img")].map(
    (img) => img.src,
  );
  if (!images.length) return;

  let current = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  dotsList.innerHTML = images
    .map((_, i) => `<li class="product-gallery__dot${i === 0 ? " active" : ""}"></li>`)
    .join("");

  function goTo(index) {
    current = (index + images.length) % images.length;
    mainImg.src = images[current];
    dotsList
      .querySelectorAll(".product-gallery__dot")
      .forEach((dot, i) => dot.classList.toggle("active", i === current));
  }

  stage.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dy) > Math.abs(dx) || Math.abs(dx) < 40) return;
      dx < 0 ? goTo(current + 1) : goTo(current - 1);
    },
    { passive: true },
  );
}
