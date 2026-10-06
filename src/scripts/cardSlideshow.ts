const INTERVAL_MS = 4500;
// Desfase entre tarjetas para que no cambien todas al mismo tiempo
const STAGGER_MS = 1500;

let timers: number[] = [];
let swapBound = false;

function stopAll() {
  timers.forEach((id) => window.clearInterval(id));
  timers = [];
}

/** Rota con fade las imágenes de las tarjetas [data-card-slideshow]. */
export function initCardSlideshows() {
  stopAll();

  // Con View Transitions la página no se recarga: se detiene al salir de ella
  if (!swapBound) {
    swapBound = true;
    document.addEventListener('astro:before-swap', stopAll);
  }

  // Con "reducir movimiento" se queda la primera imagen fija
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-card-slideshow]').forEach((slideshow, index) => {
    const slides = Array.from(slideshow.querySelectorAll<HTMLElement>('[data-slide]'));
    if (slides.length < 2) return;

    let current = 0;
    let paused = false;

    // Se pausa mientras el cursor o el foco están sobre la tarjeta
    const card = slideshow.closest('article') ?? slideshow;
    card.addEventListener('mouseenter', () => { paused = true; });
    card.addEventListener('mouseleave', () => { paused = false; });
    card.addEventListener('focusin', () => { paused = true; });
    card.addEventListener('focusout', () => { paused = false; });

    const next = () => {
      if (paused || document.hidden) return;
      slides[current].classList.replace('opacity-100', 'opacity-0');
      current = (current + 1) % slides.length;
      slides[current].classList.replace('opacity-0', 'opacity-100');
    };

    const start = window.setTimeout(() => {
      timers.push(window.setInterval(next, INTERVAL_MS));
    }, index * STAGGER_MS);
    timers.push(start);
  });
}
