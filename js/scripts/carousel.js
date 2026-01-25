document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('services');
  if (!el || el.classList.contains('is-initialized')) return;

  new Splide(el, {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: 80,              // px, no rem
    pagination: true,
    drag: true,
    pauseOnHover: true,
    flickVelocity: 0.8,
    flickPower: 100,
    breakpoints: {
      768: {
        focus: 'center',
      },
    },
  }).mount();
});