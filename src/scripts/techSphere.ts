export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/** Reparte n puntos de forma uniforme sobre una esfera de radio 1 (espiral de Fibonacci). */
export function spherePoints(n: number): Point3D[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });
}

/** Estilo de un punto proyectado: los de atrás (z negativo) se ven más pequeños y tenues. */
export function projectStyle({ x, y, z }: Point3D) {
  const depth = (z + 1) / 2; // 0 = atrás, 1 = al frente
  const scale = 0.55 + 0.45 * depth;
  return {
    transform: `translate3d(calc(var(--r) * ${x.toFixed(4)}), calc(var(--r) * ${y.toFixed(4)}), 0) scale(${scale.toFixed(3)})`,
    opacity: (0.3 + 0.7 * depth).toFixed(3),
    zIndex: String(Math.round(depth * 100)),
  };
}

function rotate(p: Point3D, ax: number, ay: number): Point3D {
  // Rotación sobre Y y luego sobre X
  const cosY = Math.cos(ay), sinY = Math.sin(ay);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;
  const cosX = Math.cos(ax), sinX = Math.sin(ax);
  return { x: x1, y: p.y * cosX - z1 * sinX, z: p.y * sinX + z1 * cosX };
}

const BASE_SPEED = { x: 0.0012, y: 0.004 }; // rad por frame (~60 fps)
const DRAG_FACTOR = 0.006;
const FRICTION = 0.94;

let cleanup: (() => void) | null = null;

export function initTechSphere() {
  cleanup?.();
  cleanup = null;

  const root = document.querySelector<HTMLElement>('[data-tech-sphere]');
  if (!root) return;
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-sphere-item]'));
  if (items.length === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const base = reduceMotion ? { x: 0, y: 0 } : BASE_SPEED;

  let points = spherePoints(items.length);
  let velocity = { ...base };
  let dragging = false;
  let last = { x: 0, y: 0 };
  let visible = true;
  let frame = 0;
  let lastTime = performance.now();

  const render = () => {
    points.forEach((p, i) => {
      const style = projectStyle(p);
      const el = items[i];
      el.style.transform = style.transform;
      el.style.opacity = style.opacity;
      el.style.zIndex = style.zIndex;
    });
  };

  const step = (ax: number, ay: number) => {
    points = points.map((p) => rotate(p, ax, ay));
    render();
  };

  const tick = (now: number) => {
    const dt = Math.min((now - lastTime) / 16.67, 3);
    lastTime = now;

    if (!dragging) {
      // La inercia del arrastre se disipa y vuelve al giro automático
      velocity.x = base.x + (velocity.x - base.x) * FRICTION ** dt;
      velocity.y = base.y + (velocity.y - base.y) * FRICTION ** dt;
    }
    if (velocity.x !== 0 || velocity.y !== 0) step(velocity.x * dt, velocity.y * dt);

    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frame || reduceMotion) return;
    lastTime = performance.now();
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const onPointerDown = (e: PointerEvent) => {
    dragging = true;
    last = { x: e.clientX, y: e.clientY };
    root.setPointerCapture(e.pointerId);
    root.classList.add('is-dragging');
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    last = { x: e.clientX, y: e.clientY };
    velocity = { x: -dy * DRAG_FACTOR, y: dx * DRAG_FACTOR };
    if (reduceMotion) step(velocity.x, velocity.y);
  };
  const onPointerUp = () => {
    dragging = false;
    root.classList.remove('is-dragging');
  };

  root.addEventListener('pointerdown', onPointerDown);
  root.addEventListener('pointermove', onPointerMove);
  root.addEventListener('pointerup', onPointerUp);
  root.addEventListener('pointercancel', onPointerUp);

  // Solo anima mientras la esfera está en pantalla
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  });
  observer.observe(root);

  render();
  if (visible) start();

  cleanup = () => {
    stop();
    observer.disconnect();
    root.removeEventListener('pointerdown', onPointerDown);
    root.removeEventListener('pointermove', onPointerMove);
    root.removeEventListener('pointerup', onPointerUp);
    root.removeEventListener('pointercancel', onPointerUp);
  };
}

export function destroyTechSphere() {
  cleanup?.();
  cleanup = null;
}
