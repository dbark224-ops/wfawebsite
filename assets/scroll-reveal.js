const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function revealImmediately(elements) {
  elements.forEach((element) => {
    element.classList.add('is-revealed');
  });
}

function initScrollReveal() {
  const elements = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!elements.length) return;

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealImmediately(elements);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const delay = element.dataset.revealDelay;

        if (delay) {
          element.style.setProperty('--reveal-delay', `${delay}ms`);
        }

        element.classList.add('is-revealed');
        observer.unobserve(element);
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  elements.forEach((element) => observer.observe(element));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal, { once: true });
} else {
  initScrollReveal();
}
