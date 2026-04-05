import { LOCAL_STORAGE_KEYS } from "./static-data.js";

function updateWishlistUI(isActive) {
  document.querySelectorAll('[data-count="wishlist"]').forEach((el) => {
    el.textContent = isActive ? 1 : 0;
  });
}

export function setupWishlist() {
  const wishlistBtn = document.querySelector(".product-actions__wishlist");
  if (!wishlistBtn) return;

  const savedState = localStorage.getItem(LOCAL_STORAGE_KEYS.wishlist) === "true";

  wishlistBtn.classList.toggle("product-actions__wishlist--active", savedState);
  wishlistBtn.setAttribute("aria-pressed", String(savedState));
  updateWishlistUI(savedState);

  wishlistBtn.addEventListener("click", () => {
    const isActive = wishlistBtn.classList.toggle("product-actions__wishlist--active");
    wishlistBtn.setAttribute("aria-pressed", String(isActive));
    localStorage.setItem(LOCAL_STORAGE_KEYS.wishlist, isActive);
    updateWishlistUI(isActive);
  });
}
