  const navbar = document.getElementById('navbar');
  const navLogo = document.getElementById('navLogo');

  window.addEventListener('load', () => {
    navbar.style.top = '0';
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('active');
    } else {
      navbar.classList.remove('active');
    }
  });