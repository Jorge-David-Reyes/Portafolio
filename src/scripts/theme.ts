export type Theme = 'dark' | 'light';

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;

  // Transición suave de colores solo durante el cambio
  root.classList.add('theme-transition');
  root.dataset.theme = theme;
  window.setTimeout(() => root.classList.remove('theme-transition'), 300);

  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Sin almacenamiento (modo privado, etc.): el cambio aplica solo a esta visita
  }
}

/** Conecta los botones [data-theme-toggle] (el header se re-renderiza en cada navegación). */
export function initThemeToggle() {
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    const sync = () => {
      const isLight = getTheme() === 'light';
      button.setAttribute('aria-pressed', String(isLight));
      button.setAttribute('aria-label', isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
    };
    sync();
    button.addEventListener('click', () => {
      setTheme(getTheme() === 'light' ? 'dark' : 'light');
      sync();
    });
  });
}
