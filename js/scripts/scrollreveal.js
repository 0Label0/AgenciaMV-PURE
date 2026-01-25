const sr = ScrollReveal({
  reset: false,
  cleanup: true,
});

sr.reveal(".reveal-left", {
  origin: "left",
  distance: "60px",
  duration: 400,
  interval: 100,
  opacity: 0,
  easing: "ease-out",
});

sr.reveal(".reveal-right", {
  origin: "right",
  distance: "60px",
  duration: 400,
  interval: 100,
  opacity: 0,
});

sr.reveal(".reveal-bottom", {
  origin: "bottom",
  distance: "60px",
  duration: 400,
  interval: 100,
  opacity: 0,
});

sr.reveal(".reveal-top", {
  origin: "top",
  distance: "60px",
  duration: 400,
  interval: 100,
  opacity: 0,
});
