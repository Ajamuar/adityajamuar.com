export function initHeroAnimation() {
  const figure = document.querySelector<HTMLElement>("[data-hero-film]");
  const light = figure?.querySelector<HTMLVideoElement>('[data-film-theme="light"]');
  const dark = figure?.querySelector<HTMLVideoElement>('[data-film-theme="dark"]');
  const control = figure?.querySelector<HTMLButtonElement>("[data-film-control]");
  const label = control?.querySelector<HTMLElement>("[data-film-label]");
  if (!figure || !light || !dark || !control || !label) return;

  const root = document.documentElement;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const films = { light, dark };
  const failed = new WeakSet<HTMLVideoElement>();
  let video = root.dataset.theme === "light" ? light : dark;
  let wantsPlayback = !motion.matches && !connection?.saveData;
  let inView = false;
  let started = false;
  let completed = false;
  let position = 0;
  let pendingPosition: number | null = null;

  function state(value: "idle" | "playing" | "paused" | "ended") {
    if (!control || !label) return;
    control.dataset.state = value;
    label.textContent = value === "playing"
      ? control.dataset.pauseLabel ?? ""
      : value === "ended"
        ? control.dataset.replayLabel ?? ""
        : control.dataset.playLabel ?? "";
  }

  function load() {
    if (!video.hasAttribute("src")) {
      // A paused theme switch also needs metadata and a decoded frame to seek to.
      video.preload = "auto";
      video.src = video.dataset.src ?? "";
    }
  }

  function showPoster() {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }

  async function play() {
    if (failed.has(video)) return;
    const target = video;
    load();
    target.muted = true;
    try {
      await target.play();
    } catch {
      if (target === video && pendingPosition === null) {
        state(completed ? "ended" : started ? "paused" : "idle");
      }
    }
  }

  function reconcile() {
    if (pendingPosition !== null) return;
    if (wantsPlayback && inView && !document.hidden) void play();
    else video.pause();
  }

  function restorePosition() {
    if (pendingPosition === null || video.readyState < 1) return;
    video.currentTime = Math.min(pendingPosition, Math.max(0, video.duration - 0.01));
    pendingPosition = null;
    reconcile();
  }

  function selectTheme() {
    const next = root.dataset.theme === "light" ? films.light : films.dark;
    if (next === video) return;
    if (pendingPosition === null && video.readyState >= 1) position = video.currentTime;
    const previous = video;
    video = next;
    previous.pause();
    pendingPosition = null;
    control!.setAttribute("aria-controls", video.id);
    control!.hidden = failed.has(video);

    // An unplayed or completed animation uses its theme's poster without a download.
    if (!started || completed || failed.has(video)) {
      showPoster();
      state(completed ? "ended" : "idle");
      reconcile();
      return;
    }

    pendingPosition = position;
    load();
    restorePosition();
  }

  control.hidden = false;
  control.setAttribute("aria-controls", video.id);
  control.addEventListener("click", () => {
    wantsPlayback = control.dataset.state !== "playing";
    if (wantsPlayback && completed) {
      completed = false;
      position = 0;
      if (video.readyState >= 1) video.currentTime = 0;
    }
    state(wantsPlayback ? "playing" : started ? "paused" : "idle");
    reconcile();
  });

  for (const film of [light, dark]) {
    film.addEventListener("loadedmetadata", () => {
      if (film === video) restorePosition();
    });
    film.addEventListener("playing", () => {
      if (film !== video || !wantsPlayback || !inView || document.hidden) {
        film.pause();
        return;
      }
      started = true;
      state("playing");
    });
    film.addEventListener("pause", () => {
      if (film === video && pendingPosition === null) {
        state(completed || film.ended ? "ended" : started ? "paused" : "idle");
      }
    });
    film.addEventListener("ended", () => {
      if (film !== video) return;
      completed = true;
      wantsPlayback = false;
      state("ended");
    });
    film.addEventListener("error", () => {
      failed.add(film);
      film.removeAttribute("src");
      film.load();
      if (film === video) {
        pendingPosition = null;
        control.hidden = true;
      }
    });
  }

  motion.addEventListener("change", () => {
    if (!motion.matches) return;
    wantsPlayback = false;
    started = false;
    completed = false;
    position = 0;
    pendingPosition = null;
    showPoster();
    state("idle");
  });
  document.addEventListener("visibilitychange", reconcile);
  new MutationObserver(selectTheme).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    reconcile();
  }, { threshold: 0.15 }).observe(figure);
}
