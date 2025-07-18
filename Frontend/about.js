// Reveal story section when in view
document.addEventListener("DOMContentLoaded", () => {
  const story = document.querySelector(".story-wrapper");

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        story.classList.add("animate");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  revealObserver.observe(story);
});


  function toggleMenu() {
    const menu = document.getElementById("fullscreenMenu");
    menu.classList.toggle("active");
  }