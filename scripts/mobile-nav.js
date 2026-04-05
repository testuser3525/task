import { isMobile } from "./viewport.js";

export function setupMobileNav() {
  if (!isMobile) return;
  const productActions = document.querySelector(".product-actions");
  const mobileBar = document.querySelector('[data-insert-subject="mobile-bar"]');

  if (productActions && mobileBar) {
    mobileBar.appendChild(productActions);
  }
}
