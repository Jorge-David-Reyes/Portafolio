const MAX_TILT = 14;

let cleanup: (() => void) | null = null;

export function initTilt() {
  cleanup?.();
  cleanup = null;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canHover || reduceMotion) return;

  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'));
  const listeners: [HTMLElement, string, EventListener][] = [];

  elements.forEach((el) => {
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        el.style.setProperty('--tilt-x', `${((0.5 - py) * 2 * MAX_TILT).toFixed(2)}deg`);
        el.style.setProperty('--tilt-y', `${((px - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
        el.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`);
        el.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`);
      });
    };
    const onEnter = () => el.classList.add('is-tilting');
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.classList.remove('is-tilting');
      el.style.removeProperty('--tilt-x');
      el.style.removeProperty('--tilt-y');
    };

    for (const [type, fn] of [['pointermove', onMove], ['pointerenter', onEnter], ['pointerleave', onLeave]] as const) {
      el.addEventListener(type, fn as EventListener);
      listeners.push([el, type, fn as EventListener]);
    }
  });

  cleanup = () => listeners.forEach(([el, type, fn]) => el.removeEventListener(type, fn));
}
