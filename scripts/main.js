import { setupGallerySwipe } from "./gallery-swiper.js";
import { setupWishlist } from "./wishlist.js";
import { setupCart } from "./cart.js";
import { setupRelatedProducts } from "./related-products.js";
import { setupProductOptions } from "./product-options.js";
import { setupAccordion } from "./accordion.js";
import { setupGalleryModal } from "./gallery-modal.js";
import { setupMobileNav } from "./mobile-nav.js";
import { setupDrawer } from "./drawer.js";

document.addEventListener("DOMContentLoaded", () => {
  setupProductOptions();
  setupAccordion();
  setupGalleryModal();
  setupGallerySwipe();
  setupWishlist();
  setupCart();
  setupRelatedProducts();
  setupMobileNav();
  setupDrawer();
});
