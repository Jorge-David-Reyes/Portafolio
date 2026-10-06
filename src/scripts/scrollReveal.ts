let observer: IntersectionObserver | null = null;

export function initScrollReveal() {
  observer?.disconnect();
  observer = null;

  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (elements.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => {
    const delay = el.dataset.revealDelay;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    observer!.observe(el);
  });
}
