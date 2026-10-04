export function initChangelogFilter() {
  const group = document.querySelector<HTMLElement>("[data-filters]");
  const count = document.querySelector<HTMLElement>("[data-count]");
  const releases = Array.from(document.querySelectorAll<HTMLElement>("[data-cats]"));
  if (!group || !count) return;

  const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>("[data-filter]"));
  group.hidden = false;

  const apply = (filter: string) => {
    let shown = 0;
    for (const release of releases) {
      const match = filter === "all" || (release.dataset.cats ?? "").split(" ").includes(filter);
      release.hidden = !match;
      if (match) shown += 1;
    }
    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    }
    count.textContent = `Showing ${shown} of ${releases.length} releases`;
  };

  for (const button of buttons) {
    button.addEventListener("click", () => apply(button.dataset.filter ?? "all"));
  }
}
