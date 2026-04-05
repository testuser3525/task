import {
  COLORS,
  LOCAL_STORAGE_KEYS,
  SIZES,
  VISIBLE_COLORS,
  VISIBLE_SIZES,
  VISIBLE_WAIST,
  WAIST_SIZES,
} from "./static-data.js";

function initExpandToggle(expandBtn, container, visibleCount, itemSelector) {
  expandBtn.addEventListener("click", () => {
    const allItems = [...container.querySelectorAll(itemSelector)];
    const isExpanded = expandBtn.getAttribute("aria-expanded") === "true";
    const extraCount = allItems.length - visibleCount;

    if (!isExpanded) {
      allItems.forEach((item) => item.removeAttribute("data-hidden"));
      expandBtn.setAttribute("aria-expanded", "true");
      expandBtn.textContent = `−${extraCount}`;
      expandBtn.setAttribute("aria-label", "Show fewer");
    } else {
      allItems.forEach((item, i) => {
        if (i >= visibleCount) item.setAttribute("data-hidden", "");
      });
      expandBtn.setAttribute("aria-expanded", "false");
      expandBtn.textContent = `+${extraCount}`;
      expandBtn.setAttribute("aria-label", `Show ${extraCount} more`);
    }
  });
}

function renderOptionGroup({
  items,
  containerNode,
  labelNode,
  appendExpandBtn,
  visibleCount,
  localStorageKey,
  renderItem,
  itemSelector,
  getDefaultValue,
  onSelect,
}) {
  if (!containerNode) return null;

  const selectedValue =
    localStorage.getItem(localStorageKey) || getDefaultValue(items[0]);

  const itemsHTML = items.map((item, i) => renderItem(item, i, selectedValue)).join("");

  const hasOverflow = items.length > visibleCount;
  const expandBtnHTML =
    appendExpandBtn && hasOverflow
      ? `<button
          class="product-options__expand text-black-secondary font-medium font-helvetica-neue"
          type="button"
          aria-expanded="false"
        >+${items.length - visibleCount}</button>`
      : "";

  containerNode.insertAdjacentHTML("beforeend", itemsHTML + expandBtnHTML);

  if (appendExpandBtn && hasOverflow) {
    const expandBtn = containerNode.querySelector(".product-options__expand");
    initExpandToggle(expandBtn, containerNode, visibleCount, itemSelector);
  }

  if (labelNode) labelNode.textContent = selectedValue;

  containerNode.addEventListener("click", (e) => {
    const btn = e.target.closest(itemSelector);
    if (!btn) return;
    onSelect(btn);
  });

  return selectedValue;
}

export function renderColors({
  colors,
  visibleCount,
  containerNode,
  labelNode = null,
  appendExpandBtn = false,
  localStorageKey = "",
}) {
  const mainImg = document.getElementById("gallery-main-img");

  const selectedColor = renderOptionGroup({
    items: colors,
    containerNode,
    labelNode,
    appendExpandBtn,
    visibleCount,
    localStorageKey,
    itemSelector: ".product-options__swatch",
    getDefaultValue: (color) => color.name,
    renderItem: (color, i, selectedValue) => `
      <button
        class="product-options__swatch"
        type="button"
        role="radio"
        aria-checked="${color.name === selectedValue ? "true" : "false"}"
        data-color="${color.name}"
        data-img-src="${color.image}"
        ${i >= visibleCount ? "data-hidden" : ""}
      >
        <img src="${color.swatch}" alt="${color.name}" loading="lazy" />
      </button>
    `,
    onSelect: (btn) => {
      containerNode
        .querySelectorAll(".product-options__swatch")
        .forEach((s) => s.setAttribute("aria-checked", "false"));
      btn.setAttribute("aria-checked", "true");
      if (labelNode) labelNode.textContent = btn.dataset.color;
      if (mainImg) mainImg.src = btn.dataset.imgSrc;
      if (localStorageKey) localStorage.setItem(localStorageKey, btn.dataset.color);
    },
  });

  const match = colors.find((c) => c.name === selectedColor);
  if (mainImg && match?.image) mainImg.src = match.image;
}

export function renderSizes({
  sizes,
  visibleCount,
  containerNode,
  labelNode = null,
  appendExpandBtn = false,
  localStorageKey = "",
}) {
  renderOptionGroup({
    items: sizes,
    containerNode,
    labelNode,
    appendExpandBtn,
    visibleCount,
    localStorageKey,
    itemSelector: ".product-options__size",
    getDefaultValue: (size) => size,
    renderItem: (size, i, selectedValue) => `
      <button
        class="product-options__size bg-frost-white-lighter"
        type="button"
        role="radio"
        aria-checked="${size === selectedValue ? "true" : "false"}"
        data-size="${size}"
        ${i >= visibleCount ? "data-hidden" : ""}
      >${size}</button>
    `,
    onSelect: (btn) => {
      containerNode.querySelectorAll(".product-options__size").forEach((s) => {
        s.classList.remove("product-options__size--selected");
        s.setAttribute("aria-checked", "false");
      });
      btn.classList.add("product-options__size--selected");
      btn.setAttribute("aria-checked", "true");
      if (labelNode) labelNode.textContent = btn.dataset.size;
      if (localStorageKey) localStorage.setItem(localStorageKey, btn.dataset.size);
    },
  });
}

export function setupProductOptions() {
  const sizesDesktop = document.querySelector(
    '[data-insert-subject="size-list-desktop"]',
  );
  const waistsDesktop = document.querySelector(
    '[data-insert-subject="waists-list-desktop"]',
  );
  const sizeLabel = document.querySelector(
    '[data-option="size"] .product-options__label--bold',
  );
  const waistLabel = document.querySelector(
    '[data-option="waist"] .product-options__label--bold',
  );
  const colorDesktop = document.querySelector(
    '[data-insert-subject="color-list-desktop"]',
  );
  const colorLabel = document.querySelector(
    '[data-option="color"] .product-options__label--bold',
  );

  renderSizes({
    containerNode: sizesDesktop,
    sizes: SIZES,
    visibleCount: VISIBLE_SIZES,
    appendExpandBtn: true,
    labelNode: sizeLabel,
    localStorageKey: LOCAL_STORAGE_KEYS.size,
  });

  renderSizes({
    containerNode: waistsDesktop,
    sizes: WAIST_SIZES,
    visibleCount: VISIBLE_WAIST,
    appendExpandBtn: true,
    labelNode: waistLabel,
    localStorageKey: LOCAL_STORAGE_KEYS.waist,
  });

  renderColors({
    containerNode: colorDesktop,
    colors: COLORS,
    visibleCount: VISIBLE_COLORS,
    appendExpandBtn: true,
    labelNode: colorLabel,
    localStorageKey: LOCAL_STORAGE_KEYS.color,
  });

  const mobileValueEl = document.querySelector(".product-option-value");
  if (mobileValueEl) {
    mobileValueEl.textContent =
      localStorage.getItem(LOCAL_STORAGE_KEYS.size) || SIZES[0];
  }
}
