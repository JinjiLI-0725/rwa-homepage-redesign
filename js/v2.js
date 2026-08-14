document.addEventListener("DOMContentLoaded", () => {

  const video = document.querySelector(".v10-hero-video");
  const fallback = document.querySelector(".v10-hero-fallback");

  if (video && fallback) {

    video.addEventListener("loadeddata", () => {
      fallback.style.opacity = "0";
    });

    video.addEventListener("error", () => {
      video.style.display = "none";
      fallback.style.opacity = "1";
    });

  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const target = document.querySelector(link.getAttribute("href"));

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});
