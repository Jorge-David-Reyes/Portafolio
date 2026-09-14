export function initScrollHint(scrollId: string, hintId: string) {
  const scrollEl = document.getElementById(scrollId);
  const hint = document.getElementById(hintId);
  if (!scrollEl || !hint) return;

  const updateHint = () => {
    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    const nearEnd = scrollEl.scrollLeft >= maxScroll - 8;
    hint.style.opacity = nearEnd ? '0' : '1';
  };

  scrollEl.addEventListener('scroll', updateHint, { passive: true });
  updateHint();
}