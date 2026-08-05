function animateCounters() {
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = Number(el.dataset.count);
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 50));
    const timer = setInterval(() => {
      n += step;
      if (n >= target) { n = target; clearInterval(timer); }
      el.textContent = n;
    }, 24);
  });
}
