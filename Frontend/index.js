window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".hero-navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Optional: animate when visible
window.addEventListener('scroll', () => {
  const aboutSection = document.querySelector('.about-content');
  const sectionTop = aboutSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight * 0.8) {
    aboutSection.style.opacity = 1;
  }
});

document.querySelectorAll("a, .cta-btn, button").forEach(el => {
  el.addEventListener("mouseenter", () => cursor.classList.add("expand"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("expand"));
});

