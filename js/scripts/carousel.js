// Preload images
const preloadImages = () => {
  const images = [
    "./assets/img/estadistica.jpg",
    "./assets/img/ajedrez.jpg",
    "./assets/img/oficina.jpg",
    "./assets/img/desarrollo.jpg",
  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

preloadImages();

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("services");
  if (!el || el.classList.contains("is-initialized")) return;

  new Splide(el, {
    type: "loop",
    perPage: 1,
    perMove: 1,
    gap: 80, // px, no rem
    pagination: true,
    drag: true,
    pauseOnHover: true,
    flickVelocity: 0.8,
    flickPower: 100,
    breakpoints: {
      768: {
        focus: "center",
      },
    },
  }).mount();

  const el2 = document.getElementById("how-works-carousel");
  if (el2) {
    new Splide(el2, {
      type: "loop",
      perPage: 1,
      gap: 0, // "Completamente pegados"
      speed: 100, // Faster transition
      flickPower: 500, // Faster flick
      padding: "20%", // Peek effect
      focus: "center",
      pagination: true,
      drag: true,
      breakpoints: {
        768: {
          padding: "10%",
        },
      },
    }).mount();
  }
});
