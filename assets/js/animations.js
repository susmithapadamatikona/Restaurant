/* ==========================================================================
   Motion engine
   --------------------------------------------------------------------------
   Drives everything declared in assets/css/motion.css:

     - scroll reveals   : tags elements with data-anim and flips them on as
                          they enter the viewport, with per-row stagger
     - hover physics    : cursor-tracked card tilt and spotlight, magnetic
                          buttons, click ripples
     - carousels        : promotes long card grids to Swiper sliders once the
                          Swiper bundle (loaded by main.js) is available
     - falling flecks   : the ambient gold ember layer

   Load order matters. This file is included BEFORE main.js so that
   window.StacklyMotion exists by the time main.js runs - main.js checks for it
   and skips its own simpler reveal pass rather than fighting over opacity and
   transform on the same elements. Init itself is deferred by one frame past
   DOMContentLoaded so pages that build their markup in JS (menu, dashboards)
   are finished rendering first, and a MutationObserver picks up anything that
   arrives later, such as a re-rendered menu page.

   Every effect is a no-op under prefers-reduced-motion.
   ========================================================================== */

const MOTION = {
  // Reveal
  threshold: 0.12,
  rootMargin: "0px 0px -6% 0px",
  stagger: 0.09,                 // seconds between siblings
  staggerCap: 0.63,              // never delay a card more than this
  // Hover
  tiltMax: 6,                    // degrees
  magnetMax: 6,                  // pixels
  // Carousels
  swiperMinCards: 6,             // grids smaller than this stay plain grids
  swiperWaitMs: 8000,            // give up waiting on the CDN bundle after this
  // Ambience
  flakes: 20,
  flakesMobile: 9
};

/* Which selector gets which entrance. Order matters: the first rule that
   claims an element wins, so the specific rows come before `.grid > *`. */
const MOTION_RULES = [
  { sel: ".page-hero .container", anim: "fade-up" },
  { sel: ".section-head", anim: "fade-up" },
  { sel: ".split > *:first-child", anim: "swipe-right" },
  { sel: ".split > *:last-child", anim: "swipe-left" },
  { sel: ".stat-row > *", anim: "fall", stagger: true },
  { sel: ".widget-grid > *, .chart-grid > *", anim: "fall", stagger: true },
  { sel: ".grid > *", anim: "fall", stagger: true },
  { sel: ".gallery-item", anim: "fall-spin", stagger: true },
  { sel: ".media-stack img", anim: "zoom-in", stagger: true },
  { sel: ".table-wrap", anim: "blur-in" },
  { sel: ".m-swiper-shell", anim: "fade-up" },
  { sel: ".form, .surface-pad", anim: "fade-up" },
  { sel: ".footer-cta, .footer-grid > *", anim: "fade-up", stagger: true }
];

/* Chrome that must never be hidden or animated: the splash, overlays, and the
   hero panel, which GSAP already animates in main.js. */
const MOTION_SKIP = ".loader, .modal, .modal-backdrop, .toast-wrap, .lightbox, .hero-panel, .swiper, .site-header, .progress";

const motionReduced = window.matchMedia
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const motionFinePointer = window.matchMedia
  && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

let motionObserver = null;
let motionMutating = false;      // guards the MutationObserver against our own edits

/**
 * Tag one element with an entrance, unless it is already tagged or sits inside
 * chrome that should stay put.
 * @param {Element} el
 * @param {string} anim   variant name, matching a [data-anim=""] rule in motion.css
 * @param {number} [delay] stagger delay in seconds
 */
function motionTag(el, anim, delay) {
  // No observer means no way to reveal it again, and [data-anim] starts hidden -
  // so without one, tagging would leave the page blank. Leave it visible.
  if (!motionObserver) return;
  if (!el || el.hasAttribute("data-anim") || el.closest(MOTION_SKIP)) return;
  el.setAttribute("data-anim", anim);
  if (delay) el.style.setProperty("--m-delay", `${delay.toFixed(2)}s`);
  motionObserver?.observe(el);
}

/**
 * Undo motionTag: the element goes back to being plain, always-visible markup.
 * @param {Element} el
 */
function motionUntag(el) {
  motionObserver?.unobserve(el);
  el.removeAttribute("data-anim");
  el.classList.remove("m-in", "m-done");
  el.style.removeProperty("--m-delay");
}

/**
 * Walk the rule table over a subtree and tag everything it matches.
 * Safe to call repeatedly - already-tagged elements are left alone.
 * @param {ParentNode} [root=document]
 */
function motionAssign(root = document) {
  MOTION_RULES.forEach(rule => {
    const seen = new Map();      // parent -> running index, for stagger
    root.querySelectorAll(rule.sel).forEach(el => {
      let delay = 0;
      if (rule.stagger) {
        const i = seen.get(el.parentElement) || 0;
        seen.set(el.parentElement, i + 1);
        delay = Math.min(i * MOTION.stagger, MOTION.staggerCap);
      }
      motionTag(el, rule.anim, delay);
    });
  });
}

/**
 * Reveal elements once, on first intersection. Staying revealed avoids the
 * flicker of re-animating a card every time it scrolls past.
 */
function motionInitReveals() {
  if (motionReduced || typeof IntersectionObserver !== "function") return;
  motionObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("m-in");
      obs.unobserve(el);
      // Drop the promoted layer once the entrance has finished playing.
      el.addEventListener("animationend", () => el.classList.add("m-done"), { once: true });
    });
  }, { threshold: MOTION.threshold, rootMargin: MOTION.rootMargin });
  motionAssign();
}

/**
 * Cursor-tracked tilt and spotlight on cards. Touch devices get neither: the
 * effect needs a hovering pointer, and the extra listeners would only cost.
 */
function motionInitTilt() {
  if (motionReduced || !motionFinePointer) return;
  document.addEventListener("pointermove", e => {
    const card = e.target.closest?.(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    if (!r.width || !r.height) return;                 // collapsed or hidden
    const px = (e.clientX - r.left) / r.width;         // 0 -> 1 across the card
    const py = (e.clientY - r.top) / r.height;
    card.style.setProperty("--m-mx", `${(px * 100).toFixed(1)}%`);
    card.style.setProperty("--m-my", `${(py * 100).toFixed(1)}%`);
    card.style.setProperty("--m-ry", `${((px - .5) * 2 * MOTION.tiltMax).toFixed(2)}deg`);
    card.style.setProperty("--m-rx", `${((.5 - py) * 2 * MOTION.tiltMax).toFixed(2)}deg`);
    card.classList.add("m-tilt");
  }, { passive: true });

  document.addEventListener("pointerout", e => {
    const card = e.target.closest?.(".card");
    // Ignore moves between children of the same card.
    if (!card || card.contains(e.relatedTarget)) return;
    card.classList.remove("m-tilt");
    card.style.removeProperty("--m-rx");
    card.style.removeProperty("--m-ry");
  }, { passive: true });
}

/** Buttons lean a few pixels toward the cursor while it is over them. */
function motionInitMagnetic() {
  if (motionReduced || !motionFinePointer) return;
  document.addEventListener("pointermove", e => {
    const btn = e.target.closest?.(".btn");
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    if (!r.width || !r.height) return;                 // e.g. a collapsed mobile menu
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    btn.style.setProperty("--m-tx", `${(dx * MOTION.magnetMax).toFixed(1)}px`);
    btn.style.setProperty("--m-ty", `${(dy * MOTION.magnetMax).toFixed(1)}px`);
  }, { passive: true });

  document.addEventListener("pointerout", e => {
    const btn = e.target.closest?.(".btn");
    if (!btn || btn.contains(e.relatedTarget)) return;
    btn.style.removeProperty("--m-tx");
    btn.style.removeProperty("--m-ty");
  }, { passive: true });
}

/** Material-style ripple from the click point on buttons and chips. */
function motionInitRipple() {
  if (motionReduced) return;
  document.addEventListener("pointerdown", e => {
    const target = e.target.closest?.(".btn, .chip, .icon-btn, .swiper-nav");
    if (!target) return;
    const r = target.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const ripple = document.createElement("span");
    ripple.className = "m-ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - r.left - size / 2}px`;
    ripple.style.top = `${e.clientY - r.top - size / 2}px`;
    // .chip and .icon-btn are not positioned by default; the ripple needs it.
    if (getComputedStyle(target).position === "static") target.style.position = "relative";
    target.style.overflow = "hidden";
    target.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  }, { passive: true });
}

/**
 * Build the ambient layer of falling gold flecks. Each fleck gets its own
 * size, speed, drift, and a negative delay so the screen is already full of
 * them on the first frame instead of filling from the top.
 */
function motionInitFalling() {
  if (motionReduced || document.querySelector(".m-fall-layer")) return;
  const count = innerWidth < 760 ? MOTION.flakesMobile : MOTION.flakes;
  const layer = document.createElement("div");
  layer.className = "m-fall-layer";
  layer.setAttribute("aria-hidden", "true");
  for (let i = 0; i < count; i++) {
    const flake = document.createElement("span");
    const fall = 13 + Math.random() * 14;             // 13s - 27s top to bottom
    flake.className = "m-flake";
    flake.style.setProperty("--m-x", `${(Math.random() * 100).toFixed(2)}%`);
    flake.style.setProperty("--m-size", `${(3 + Math.random() * 5).toFixed(1)}px`);
    flake.style.setProperty("--m-op", (0.35 + Math.random() * 0.45).toFixed(2));
    flake.style.setProperty("--m-dur-fall", `${fall.toFixed(1)}s`);
    flake.style.setProperty("--m-delay-fall", `-${(Math.random() * fall).toFixed(1)}s`);
    flake.style.setProperty("--m-sway", `${(3 + Math.random() * 4).toFixed(1)}s`);
    flake.appendChild(document.createElement("i"));
    layer.appendChild(flake);
  }
  document.body.appendChild(layer);
}

/**
 * Turn a long card grid into a Swiper carousel in place. The grid element
 * itself is kept (it carries `.container`, so the width stays aligned with the
 * sections around it) and only loses its grid classes.
 * @param {HTMLElement} grid
 */
function motionBuildSwiper(grid) {
  const cards = Array.from(grid.children);
  const perView = grid.classList.contains("grid-2") ? 2
    : grid.classList.contains("grid-4") ? 4 : 3;

  grid.classList.remove("grid", "grid-2", "grid-3", "grid-4");
  grid.classList.add("m-swiper-shell");
  grid.dataset.mSwiper = "on";

  const swiper = document.createElement("div");
  swiper.className = "swiper";
  const wrapper = document.createElement("div");
  wrapper.className = "swiper-wrapper";
  cards.forEach(card => {
    // A card parked off to the right of a carousel never intersects the
    // viewport, so a scroll reveal on it would never fire and it would sit
    // there invisible. The carousel's own entrance covers the whole row.
    motionUntag(card);
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.appendChild(card);                 // moving a node keeps its listeners
    wrapper.appendChild(slide);
  });
  swiper.appendChild(wrapper);

  // Arrows and bullets share one row under the slides. Floating the arrows over
  // the slides themselves put them straight through the dish titles.
  const pagination = document.createElement("div");
  pagination.className = "swiper-pagination";
  const prev = document.createElement("button");
  prev.className = "swiper-nav prev";
  prev.type = "button";
  prev.title = "Previous";
  prev.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
  const next = document.createElement("button");
  next.className = "swiper-nav next";
  next.type = "button";
  next.title = "Next";
  next.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
  const controls = document.createElement("div");
  controls.className = "swiper-controls";
  controls.append(prev, pagination, next);
  grid.append(swiper, controls);

  new Swiper(swiper, {
    slidesPerView: 1,
    spaceBetween: 22,
    // rewind rather than loop: loop mode clones slides, and a cloned card
    // loses the favourite/detail listeners main.js bound to the original.
    rewind: true,
    speed: 700,
    grabCursor: true,
    watchSlidesProgress: true,               // drives .swiper-slide-visible
    keyboard: { enabled: true, onlyInViewport: true },
    autoplay: motionReduced ? false : { delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true },
    pagination: { el: pagination, clickable: true },
    navigation: { prevEl: prev, nextEl: next },
    breakpoints: {
      700: { slidesPerView: Math.min(2, perView) },
      1024: { slidesPerView: perView }
    }
  });
}

/**
 * Promote every eligible grid on the page. "Eligible" is deliberately narrow:
 * long, static card rows only. Grids that JS re-renders (the menu grid), any
 * grid with an id, form grids, and the gallery masonry are all left alone.
 */
function motionInitSwipers() {
  const page = document.body.dataset.page || "";
  if (page.includes("dashboard") || page === "auth") return;

  const grids = Array.from(document.querySelectorAll("main .grid-2, main .grid-3, main .grid-4"))
    .filter(g => !g.id
      && !g.dataset.mSwiper
      && g.children.length >= MOTION.swiperMinCards
      && Array.from(g.children).every(c => c.classList.contains("card")));
  if (!grids.length) return;

  motionWhenSwiperReady(() => {
    motionMutating = true;
    grids.forEach(motionBuildSwiper);
    motionMutating = false;
    motionAssign();                          // tag the new shells and slides' cards
  });
}

/**
 * main.js appends the Swiper bundle with `defer`, so it may not be parsed yet.
 * Poll briefly, then give up and leave the grids as grids.
 * @param {() => void} cb
 */
function motionWhenSwiperReady(cb) {
  if (window.Swiper) return cb();
  const started = Date.now();
  const timer = setInterval(() => {
    if (window.Swiper) { clearInterval(timer); cb(); }
    else if (Date.now() - started > MOTION.swiperWaitMs) clearInterval(timer);
  }, 120);
}

/**
 * Pages that render their own markup after load (menu filtering, dashboard
 * views) replace whole grids. Re-run the tagging pass for anything new, on the
 * next frame so a burst of insertions costs one pass rather than dozens.
 */
function motionWatchContent() {
  if (motionReduced || typeof MutationObserver !== "function") return;
  let queued = false;
  new MutationObserver(records => {
    if (motionMutating || queued) return;
    // Our own click ripples land here too; re-scanning the page for every
    // button press would be pure waste.
    const added = records.some(r => Array.from(r.addedNodes).some(n =>
      n.nodeType === 1 && !n.classList.contains("m-ripple")));
    if (!added) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; motionAssign(); });
  }).observe(document.body, { childList: true, subtree: true });
}

/** Boot every effect. Safe to call more than once. */
function motionInit() {
  motionInitSwipers();       // waits on the Swiper bundle, then rebuilds in place
  motionInitReveals();
  motionInitTilt();
  motionInitMagnetic();
  motionInitRipple();
  motionInitFalling();
  motionWatchContent();
}

/* Published synchronously, before main.js is parsed: main.js tests for it and
   stands down its own reveal pass when it is present. */
window.StacklyMotion = { init: motionInit, refresh: motionAssign, config: MOTION };

document.addEventListener("DOMContentLoaded", () => {
  // One frame after main.js has built the page, so nothing is tagged too early.
  requestAnimationFrame(motionInit);
});
