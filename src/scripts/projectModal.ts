let initialized = false;

const CONTAINER_CLOSED = ['opacity-0', 'invisible', 'pointer-events-none'];
const PANEL_CLOSED = ['opacity-0', 'scale-95'];
const PANEL_OPEN = ['opacity-100', 'scale-100'];

export function initProjectModals() {
  if (initialized) return;
  initialized = true;

  const modals = Array.from(document.querySelectorAll<HTMLElement>('[data-project-modal]'));

  document.querySelectorAll<HTMLElement>('[data-project-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const id = trigger.dataset.projectModalOpen;
      if (!id) return;
      const modal = document.getElementById(id);
      if (modal) openModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((btn) => {
      btn.addEventListener('click', () => closeModal(modal));
    });
    initGallery(modal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    modals.forEach((modal) => {
      if (modal.getAttribute('aria-hidden') === 'false') closeModal(modal);
    });
  });
}

function openModal(modal: HTMLElement) {
  const panel = modal.querySelector<HTMLElement>('[data-modal-panel]');

  modal.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.remove(...CONTAINER_CLOSED);
      panel?.classList.remove(...PANEL_CLOSED);
      panel?.classList.add(...PANEL_OPEN);
    });
  });

  const focusTarget = modal.querySelector<HTMLElement>('[data-modal-close]');
  focusTarget?.focus();
}

function closeModal(modal: HTMLElement) {
  const panel = modal.querySelector<HTMLElement>('[data-modal-panel]');

  modal.classList.add(...CONTAINER_CLOSED);
  panel?.classList.remove(...PANEL_OPEN);
  panel?.classList.add(...PANEL_CLOSED);
  modal.setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = '';
}

function initGallery(modal: HTMLElement) {
  const gallery = modal.querySelector<HTMLElement>('[data-gallery]');
  if (!gallery) return;

  const track = gallery.querySelector<HTMLElement>('[data-gallery-track]');
  const prev = gallery.querySelector<HTMLElement>('[data-gallery-prev]');
  const next = gallery.querySelector<HTMLElement>('[data-gallery-next]');
  const counter = gallery.querySelector<HTMLElement>('[data-gallery-counter]');
  if (!track) return;

  const slides = Array.from(track.children) as HTMLElement[];
  if (slides.length < 2) return;

  let index = 0;
  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
  };

  prev?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  next?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });

  update();
}