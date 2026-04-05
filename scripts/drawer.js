import { renderColors, renderSizes } from "./product-options.js";
import {
  COLORS,
  LOCAL_STORAGE_KEYS,
  SIZES,
  VISIBLE_COLORS,
} from "./static-data.js";
import { isMobile } from "./viewport.js";

let drawerEl = null;
let originalDrawerContent = null;
let activeTarget = null;

const selectors = {
  getSize: () => localStorage.getItem(LOCAL_STORAGE_KEYS.size) || SIZES[0],
  getColor: () =>
    localStorage.getItem(LOCAL_STORAGE_KEYS.color) || COLORS[0].name,
};

function setDrawerTitle(type, value) {
  const keyEl = drawerEl.querySelector(".drawer-title .key");
  const valueEl = drawerEl.querySelector(".drawer-title .value");

  if (keyEl) keyEl.textContent = `${type}:`;
  if (valueEl) valueEl.textContent = value;
}

function renderContent(target) {
  const drawerContent = drawerEl.querySelector(".drawer-content");
  drawerContent.innerHTML = originalDrawerContent;

  if (target === "size-selector") {
    renderSizes({
      containerNode: drawerContent.querySelector(
        '[data-insert-subject="size-list-mobile"]',
      ),
      sizes: SIZES,
      visibleCount: SIZES.length,
      labelNode: document.querySelector(
        '[data-option="size"] .product-options__label--bold',
      ),
      localStorageKey: LOCAL_STORAGE_KEYS.size,
    });
    setDrawerTitle("Size", selectors.getSize());
  } else if (target === "color-selector") {
    renderColors({
      containerNode: drawerContent.querySelector(
        '[data-insert-subject="color-list-mobile"]',
      ),
      colors: COLORS,
      visibleCount: VISIBLE_COLORS,
      appendExpandBtn: true,
      labelNode: document.querySelector(
        '[data-option="color"] .product-options__label--bold',
      ),
      localStorageKey: LOCAL_STORAGE_KEYS.color,
    });
    setDrawerTitle("Color", selectors.getColor());
  }
}

function openDrawer(target) {
  activeTarget = target;
  renderContent(target);

  drawerEl.classList.add("is-open");
  drawerEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  drawerEl.classList.remove("is-open");
  drawerEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

export function setupDrawer() {
  if (!isMobile) return;

  drawerEl = document.getElementById("drawer");
  if (!drawerEl) return;

  const drawerContent = drawerEl.querySelector(".drawer-content");
  originalDrawerContent = drawerContent.innerHTML;

  const mobileValueEl = document.querySelector(".product-option-value");

  if (mobileValueEl) {
    drawerContent.addEventListener("click", (e) => {
      if (activeTarget === "color-selector") {
        setDrawerTitle("Color", selectors.getColor());
      } else if (activeTarget === "size-selector") {
        setDrawerTitle("Size", selectors.getSize());
      }

      const btn = e.target.closest(".product-options__size");
      if (btn) mobileValueEl.textContent = btn.dataset.size;
    });
  }

  document.querySelectorAll("[data-drawer-target]").forEach((el) => {
    el.addEventListener("click", () => openDrawer(el.dataset.drawerTarget));
  });

  drawerEl.addEventListener("click", (e) => {
    if (
      e.target.matches(".drawer-wrapper") ||
      e.target.closest(".drawer-close")
    ) {
      closeDrawer();
    }
  });
}
