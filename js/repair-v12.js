document.addEventListener("DOMContentLoaded", () => {

  const hero = document.querySelector(".v12-hero-scene");
  const image = document.querySelector(".v12-hero-image");

  if (hero && image && window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("mousemove", e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      image.style.transform =
        `translate3d(${x * 10}px, ${y * 7}px, 0) scale(1.012)`;
    });

    hero.addEventListener("mouseleave", () => {
      image.style.transform = "";
    });
  }

  const revealTargets = document.querySelectorAll(
    ".v12-token-project, .v12-project-case, .v10-solution-chapters article, .v12-type-item"
  );

  revealTargets.forEach(el => el.classList.add("v12-reveal"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("v12-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
});
