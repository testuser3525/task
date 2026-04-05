export function setupAccordion() {
  document.querySelectorAll(".product-accordion__item").forEach((item) => {
    const trigger = item.querySelector(".product-accordion__trigger");
    const panel = item.querySelector(".product-accordion__panel");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
    });
  });
}
