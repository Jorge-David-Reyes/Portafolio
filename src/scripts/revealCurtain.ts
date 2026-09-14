let initialized = false;

interface Point {
  x: number;
  y: number;
  age: number;
}

export function initRevealCurtain(canvasId: string) {
  if (initialized) return;
  initialized = true;

  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const darkColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-main')
    .trim() || '#061620';

  let points: Point[] = [];

  function resize() {
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function addPoint(x: number, y: number) {
    points.push({ x, y, age: 0 });
  }

  window.addEventListener('pointermove', (e) => addPoint(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (t) addPoint(t.clientX, t.clientY);
  }, { passive: true });

  function draw() {
    ctx!.globalCompositeOperation = 'source-over';
    ctx!.fillStyle = darkColor;
    ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

    ctx!.globalCompositeOperation = 'destination-out';
    points.forEach((p) => {
      p.age += 1;
      const life = 1 - p.age / 45;
      if (life <= 0) return;

      const radius = 10 * life + 10;
      const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
      gradient.addColorStop(0, `rgba(0,0,0,${0.9 * life})`);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx!.fillStyle = gradient;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx!.fill();
    });

    points = points.filter((p) => p.age < 45);
    requestAnimationFrame(draw);
  }
  draw();
}