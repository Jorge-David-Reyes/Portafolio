export function initTabs(onChange?: (panelId: string) => void) {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  if (tabs.length === 0) return;

  const select = (tab: HTMLButtonElement) => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls')!);
      if (panel) panel.hidden = !active;
    });
    onChange?.(tab.getAttribute('aria-controls')!);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const step = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(i + step + tabs.length) % tabs.length];
      next.focus();
      select(next);
    });
  });
}
