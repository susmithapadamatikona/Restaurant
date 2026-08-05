/* ==========================================================================
   Hero background slider
   --------------------------------------------------------------------------
   Cross-fades a set of full-bleed background layers on a fixed interval.

   Design notes:
   - Every slide is rendered up front and stacked; only `opacity` and
     `transform` change, so the browser composites on the GPU and holds
     60fps without repainting or reflowing anything.
   - Outgoing and incoming layers transition simultaneously, which gives a
     true cross-fade. The layer underneath is never exposed, so there is no
     flash or blink between images.
   - All images are preloaded before the timer starts, so the first loop is
     never waiting on the network.
   - Food and menu grids elsewhere on the site stay plain CSS grids with JS
     pagination; this file only owns the hero.
   ========================================================================== */

const HERO_SLIDER = {
  // Fallback only; the markup sets data-interval. Keep the CSS fade shorter
  // than this or a new transition starts before the last one finishes.
  interval: 800,                // ms each image holds before advancing
  selector: "[data-hero-slider]",
  slide: ".hero-slide",
  activeClass: "is-active"
};

/**
 * Preload every slide image. Resolves once all have either loaded or failed,
 * so a single broken URL can never stall the slideshow.
 * @param {string[]} urls
 * @returns {Promise<void>}
 */
function preloadImages(urls) {
  return Promise.all(urls.map(src => new Promise(resolve => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;      // failure must not block the rest
    img.src = src;
  }))).then(() => undefined);
}

/**
 * Boot the hero slider if this page has one. Safe to call on every page.
 */
function initHeroSlider() {
  const slider = document.querySelector(HERO_SLIDER.selector);
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(HERO_SLIDER.slide));
  if (slides.length < 2) return;                    // nothing to cycle

  const hero = slider.closest(".hero") || slider;
  const interval = Number(slider.dataset.interval) || HERO_SLIDER.interval;
  const reduceMotion = window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = slides.findIndex(s => s.classList.contains(HERO_SLIDER.activeClass));
  if (index < 0) index = 0;
  let timer = null;
  let hovering = false;
  let onScreen = true;          // flipped by the IntersectionObserver below

  /** Activate the given slide and release the current one. */
  const show = next => {
    slides[index].classList.remove(HERO_SLIDER.activeClass);
    index = (next + slides.length) % slides.length;  // wraps 3 -> 0, forever
    slides[index].classList.add(HERO_SLIDER.activeClass);
  };

  const start = () => {
    // Never stack timers, and stay stopped while paused, scrolled past,
    // or backgrounded.
    if (timer || hovering || !onScreen || reduceMotion || document.hidden) return;
    timer = setInterval(() => show(index + 1), interval);
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  // Pause on hover, resume on leave. Touch devices never fire these events,
  // so the slideshow simply keeps running there.
  hero.addEventListener("mouseenter", () => { hovering = true; stop(); });
  hero.addEventListener("mouseleave", () => { hovering = false; start(); });

  // Swipe to steer the hero by hand. Pointer events cover mouse drag and touch
  // in one path; the gesture is read on release so a plain tap on the hero
  // buttons still behaves like a click and nothing is preventDefault-ed.
  const SWIPE_MIN = 45;                 // px of travel before it counts as a swipe
  let swipeFrom = null;
  hero.addEventListener("pointerdown", e => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    swipeFrom = { x: e.clientX, y: e.clientY };
  });
  const endSwipe = e => {
    if (!swipeFrom) return;
    const dx = e.clientX - swipeFrom.x;
    const dy = e.clientY - swipeFrom.y;
    swipeFrom = null;
    // Ignore anything that is mostly a vertical scroll.
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy)) return;
    show(dx < 0 ? index + 1 : index - 1);
    // Restart the timer from the slide the guest chose, not mid-interval.
    stop();
    start();
  };
  hero.addEventListener("pointerup", endSwipe);
  hero.addEventListener("pointercancel", () => { swipeFrom = null; });

  // A hidden tab gets no animation frames; stop rather than queue up work.
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());

  // Browsers throttle transitions on off-screen elements, so a slider left
  // running while scrolled past piles up work and lurches on the way back.
  // Stop it once the hero leaves the viewport and pick up again on return.
  if (typeof IntersectionObserver === "function") {
    new IntersectionObserver(entries => {
      onScreen = entries[0].isIntersecting;
      onScreen ? start() : stop();
    }, { threshold: 0 }).observe(hero);
  }

  // Show the first frame immediately, then wait for the full set before cycling.
  slides[index].classList.add(HERO_SLIDER.activeClass);
  preloadImages(slides.map(s => s.dataset.bg).filter(Boolean)).then(start);
}
