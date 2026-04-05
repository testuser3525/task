import { RELATED_PRODUCTS } from "./static-data.js";

function formatPrice(price) {
  if (price == null || isNaN(price)) return "";
  return price.toFixed(2).replace(".", ",") + " ₾";
}

export function setupRelatedProducts() {
  const list = document.querySelector('[data-insert-subject="related-products-list"]');
  if (!list) return;

  const fragment = document.createDocumentFragment();

  RELATED_PRODUCTS.forEach((product) => {
    const li = document.createElement("li");
    li.className = "related-products__item";
    li.innerHTML = `
      <a class="product-card" href="${product.href}">
        <div class="product-card__image-wrap">
          <img
            class="product-card__image"
            src="${product.image}"
            alt="${product.alt}"
            loading="lazy"
          />
        </div>
        <div class="product-card__body">
          <span class="product-card__category desktop-only text-black-secondary">${product.category}</span>
          <span class="product-card__brand font-monserat text-black-secondary">${product.brand}</span>
          <p class="product-card__name font-medium font-monserat">${product.name}</p>
          <span class="product-card__price font-semibold font-monserat">${formatPrice(product.price)}</span>
        </div>
      </a>
    `;
    fragment.appendChild(li);
  });

  list.appendChild(fragment);
}
