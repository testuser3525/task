import { LOCAL_STORAGE_KEYS } from "./static-data.js";

function getCount() {
  return parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.cart) ?? "0", 10);
}

function updateCartUI(count) {
  document.querySelectorAll('[data-count="cart"]').forEach((el) => {
    el.textContent = count;
    el.setAttribute("aria-label", `${count} item${count !== 1 ? "s" : ""} in cart`);
  });
}

export function setupCart() {
  updateCartUI(getCount());

  const addToCartBtn = document.querySelector(".product-actions__add-to-cart");
  if (!addToCartBtn) return;

  addToCartBtn.addEventListener("click", () => {
    const newCount = getCount() + 1;
    localStorage.setItem(LOCAL_STORAGE_KEYS.cart, newCount);
    updateCartUI(newCount);
  });
}
