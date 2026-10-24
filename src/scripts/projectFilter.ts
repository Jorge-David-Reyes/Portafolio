export function initProjectFilter() {
  const bar = document.querySelector<HTMLElement>('[data-filter-bar]');
  if (!bar) return;

  const chips = Array.from(bar.querySelectorAll<HTMLButtonElement>('[data-filter-chip]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-project-card]'));
  const count = bar.querySelector<HTMLElement>('[data-filter-count]');
  const clear = bar.querySelector<HTMLButtonElement>('[data-filter-clear]');
  const empty = document.querySelector<HTMLElement>('[data-filter-empty]');

  const apply = (tag: string) => {
    let visible = 0;
    cards.forEach((card) => {
      const tags = (card.dataset.tags ?? '').split('|');
      const match = !tag || tags.includes(tag);
      card.hidden = !match;
      if (match) visible++;
    });

    chips.forEach((chip) => {
      chip.setAttribute('aria-pressed', String((chip.dataset.filterChip ?? '') === tag));
    });

    if (count) count.textContent = `${visible} de ${cards.length} proyectos`;
    if (clear) clear.hidden = !tag;
    if (empty) empty.hidden = visible > 0;
  };

  chips.forEach((chip) => chip.addEventListener('click', () => apply(chip.dataset.filterChip ?? '')));
  clear?.addEventListener('click', () => apply(''));
  apply('');
}
