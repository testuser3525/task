export function setupGalleryModal() {
  const modal = document.querySelector(".gallery-modal");
  const backdrop = document.querySelector(".gallery-modal__backdrop");
  const closeBtn = document.querySelector(".gallery-modal__close");
  const modalImg = document.querySelector(".gallery-modal__img");
  const modalThumbs = [...document.querySelectorAll(".gallery-modal__thumb")];
  const openTrigger = document.querySelector("[data-gallery-open]");

  if (!modal || !openTrigger) return;

  let currentIndex = 0;
  let focusableEls = [];

  function openModal(startIndex = 0) {
    currentIndex = startIndex;
    modal.classList.add("is-open");
    backdrop.classList.add("is-open");
    modal.removeAttribute("aria-hidden");
    document.body.style.overflow = "hidden";
    setActiveThumb(currentIndex);
    focusableEls = [
      ...modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((el) => !el.hasAttribute("disabled"));
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    openTrigger.focus();
  }

  function setActiveThumb(index) {
    modalThumbs.forEach((thumb, i) => {
      const isActive = i === index;
      thumb.setAttribute("aria-selected", String(isActive));
      thumb.classList.toggle("gallery-modal__thumb--active", isActive);
      if (isActive) {
        const src = thumb.querySelector("img")?.src;
        if (src) modalImg.src = src;
      }
    });
  }

  openTrigger.addEventListener("click", () => {
    const active = document.querySelector('.product-gallery__thumb[aria-selected="true"]');
    openModal(active ? parseInt(active.dataset.index ?? "0", 10) : 0);
  });

  document.querySelectorAll(".product-gallery__thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      openModal(parseInt(thumb.dataset.index ?? "0", 10));
    });
  });

  modalThumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      currentIndex = i;
      setActiveThumb(i);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
      return;
    }
    if (!modal.classList.contains("is-open")) return;

    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % modalThumbs.length;
      setActiveThumb(currentIndex);
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + modalThumbs.length) % modalThumbs.length;
      setActiveThumb(currentIndex);
    }
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !focusableEls.length) return;
    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}
