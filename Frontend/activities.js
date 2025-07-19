// Navbar scroll behavior
const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo-img");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
});

const textElement = document.getElementById("typed-text");

const steps = [
  { text: "Naturr fueled thrrill", action: "type" },
  { action: "deleteAll" },
  { text: "Nature Fuuled Th", action: "type" },
  { text: "Nature Fu", action: "deleteTo" },
  { text: "Nature Fueled Thrillsss", action: "type" },
  { action: "scaleUp" }
];

let stepIndex = 0;
let charIndex = 0;

function typeSequence() {
  const currentStep = steps[stepIndex];

  // Typing logic
  if (currentStep.action === "type") {
    const fullText = currentStep.text;
    textElement.textContent = fullText.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === fullText.length) {
      stepIndex++;
      charIndex = 0;
      setTimeout(typeSequence, 900); // Pause before next step
    } else {
      setTimeout(typeSequence, 80);
    }
  }

  // Delete everything
  else if (currentStep.action === "deleteAll") {
    const currentText = textElement.textContent;
    textElement.textContent = currentText.slice(0, -1);

    if (textElement.textContent.length === 0) {
      stepIndex++;
      charIndex = 0;
      setTimeout(typeSequence, 500);
    } else {
      setTimeout(typeSequence, 40);
    }
  }

  // Delete to a specific point
  else if (currentStep.action === "deleteTo") {
    const target = currentStep.text;
    const currentText = textElement.textContent;

    if (currentText !== target) {
      textElement.textContent = currentText.slice(0, -1);
      setTimeout(typeSequence, 40);
    } else {
      stepIndex++;
      charIndex = target.length;
      setTimeout(typeSequence, 500);
    }
  }

else if (currentStep.action === "scaleUp") {
  textElement.classList.add("scale-up");

  // After 1.5s, remove the typing cursor (border-right)
  setTimeout(() => {
    textElement.classList.remove("with-cursor");
  }, 1500);
}

}

typeSequence();



// Animate underline on scroll into view
const heading = document.querySelector('.animated-heading');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heading.classList.add('underline-animate');
      }
    });
  },
  {
    threshold: 0.5, // 50% of the heading in view
  }
);

observer.observe(heading);


  function toggleMenu() {
    const menu = document.getElementById("fullscreenMenu");
    menu.classList.toggle("active");
  }