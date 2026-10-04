type Theme = "light" | "dark";

const root = document.documentElement;
const media = window.matchMedia("(prefers-color-scheme: light)");

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem("theme");
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function store(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

function current(): Theme {
  return root.dataset.theme === "light" ? "light" : "dark";
}

function label(button: HTMLButtonElement) {
  button.setAttribute("aria-label", current() === "dark" ? "Switch to light theme" : "Switch to dark theme");
}

export function initThemeToggle() {
  const button = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  if (!button) return;

  label(button);
  requestAnimationFrame(() => document.body.classList.add("theme-ready"));

  button.addEventListener("click", () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    store(next);
    label(button);
  });

  media.addEventListener("change", (event) => {
    if (readStored()) return;
    root.dataset.theme = event.matches ? "light" : "dark";
    label(button);
  });
}
