// navbar.js — sticky scroll + mobile toggle + active link tracking

const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const allLinks  = document.querySelectorAll('.nav-link');

// Scroll: add .scrolled class
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  highlightActiveSection();
});

// Mobile toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click (mobile)
allLinks.forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active section highlight
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  allLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
